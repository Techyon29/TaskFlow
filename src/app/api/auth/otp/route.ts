import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/user";
import OTP from "@/src/models/otp";
import z from "zod";
import dbConnect from "@/src/utils/dbConnect";
import { randomInt } from "crypto";
import { Resend } from "resend";
import argon2 from 'argon2'
import EmailTemplates from '@/src/components/ui/EmailTemplates'
import { jsx } from "react/jsx-runtime";

const otpInputEmail = z.object({
    email:z.string().email("Invalid Email")
})
if(!process.env.RESEND_API_KEY){
    throw new Error("Resend api key not found");
}
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req : NextRequest){
    try {
        const body = await req.json();
        const validate = otpInputEmail.safeParse(body)
        if(!validate.success){
            return NextResponse.json({success:false,message:validate.error.flatten()},{status:400})
        }
        const {email} = validate.data;
        await dbConnect()
        const existUser = await User.findOne({email})
        if(!existUser){
            return NextResponse.json({success:false,message:"User Not Found"},{status:404})
        }

        const existOtp = await OTP.findOne({email});
        if(existOtp && existOtp.requestCount >= 3 && existOtp.expiredAt > new Date()){
            return NextResponse.json({success:false,message:"Maximum OTP requests reached. Try again later."},{status:429})
        }

        const otp = randomInt(100000,999999).toString();
        const hashOtp = await argon2.hash(otp);
        const expiredAt = new Date(Date.now() + 15*1000*60);
        const { error } = await resend.emails.send({
            from: process.env.RESEND_FROM!,
            to: email,
            replyTo: 'you@example.com',
            subject: 'Password Reset OTP',
            react: jsx(EmailTemplates,{firstName:existUser.name,otp:otp}),
        });

        if (error) {
            return NextResponse.json({ success: false, message: error.message || "Failed to send email" }, { status: 500 });
        }

        if(existOtp){
            existOtp.requestCount = existOtp.expiredAt < new Date() ? 1 : existOtp.requestCount  + 1;
            existOtp.hashOtp = hashOtp;
            existOtp.expiredAt = expiredAt;
            existOtp.failCount = 0;

            await existOtp.save()
        }else{
            await OTP.create({email,hashOtp,expiredAt})
        }

        return NextResponse.json({success:true,message:"OTP send successfully"},{status:201})

    } catch (error) {
        return NextResponse.json({success:false,message:error instanceof Error?error.message:"Internal Server Error"},{status:500})
    }
}