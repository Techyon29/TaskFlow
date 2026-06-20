import { NextResponse, NextRequest } from "next/server";
import OTP from "@/src/models/otp";
import User from "@/src/models/user";
import z from "zod";
import argon2 from 'argon2'
import dbConnect from "@/src/utils/dbConnect";

const resetPasswordValidator = z.object({
    email:z.string().email(),
    newPassword: z.string().min(4,"Password is to short")
})
export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const validate = resetPasswordValidator.safeParse(body)
        if(!validate.success){
            return NextResponse.json({success:false,message:validate.error.issues.map((e)=>e.message).join(",")},{status:400})
        }
        const { email , newPassword} = validate.data;

        await dbConnect()

        const otpSession = await OTP.findOne({email})
        if(!otpSession){
            return NextResponse.json({success:false,message:"No valid password reset session"},{status:400})
        }
        if(!otpSession.verifiedAt || otpSession.verifiedAt < new Date()){
            return NextResponse.json({success:false,message:"Password reset session has expired or is invalid"},{status:400})
        }
        const hashPassword = await argon2.hash(newPassword)
        const existUser = await User.findOneAndUpdate({email},{$set:{password:hashPassword}}).select("-password")

        await OTP.findOneAndDelete({email})
        
        return  NextResponse.json({success:true,message:"Password Reset Successfully"},{status:201})
        
    } catch (error) {
        return NextResponse.json({success:false,message:error instanceof Error ? error.message : "Internal Server Error"},{status:500})
    }
}