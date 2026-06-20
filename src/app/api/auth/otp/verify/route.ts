import { NextRequest, NextResponse } from "next/server";
import OTP from "@/src/models/otp";
import z from 'zod'
import dbConnect from "@/src/utils/dbConnect";
import argon2 from 'argon2'

const otpVerificationSchema = z.object({
    email:z.string().email("Invalid Email"),
    otp:z.string().trim().length(6,"Otp must be 6 character"),
})

export async function POST(req : NextRequest){
    try {
        const body = await req.json();
        const validate = otpVerificationSchema.safeParse(body)
        if(!validate.success){
            return NextResponse.json({success:false,message:validate.error.issues.map((e)=>e.message).join(",")},{status:400})
        }
        const { email , otp } = validate.data;

        await dbConnect();

        const existOtp = await OTP.findOne({email})
        if(!existOtp){
            return NextResponse.json({success:false,message:"Email Not Found"},{status:409})
        }
        if(existOtp.expiredAt < new Date()){
            return NextResponse.json({success:false,message:"OTP session expire"},{status:400})
        }
        if(existOtp.failCount > 3){
            return NextResponse.json({success:false,message:"To many fail attempt. Apply for new otp after 15 min"},{status:400})
        }

        const isMatch = await argon2.verify(existOtp.hashOtp,otp);
        if(!isMatch){
            existOtp.failCount = existOtp.failCount +1;
            await existOtp.save()
            return NextResponse.json({success:false,message:"Wrong OTP"},{status:400})
        }

        existOtp.verifiedAt = new Date(Date.now() + 15*60*1000)
        await existOtp.save();

        return NextResponse.json({success:true,message:"OTP verified. Now you can reset password for 15min session"},{status:200})

    } catch (error) {
        return NextResponse.json({success:false,message:error instanceof Error ? error.message:"Internal Server Error"
        },{status:500})
    }
}

