import { NextRequest,NextResponse } from "next/server";
import User from "@/src/models/user";
import argon2 from 'argon2'
import { SignJWT } from "jose";
import z from 'zod'
import dbConnect from "@/src/utils/dbConnect";


const secret = new TextEncoder().encode(process.env.SECRET || "1010101010101")
const loginValidator = z.object({
    email:z.string().email("Invalid Email"),
    password:z.string().trim().min(4,"Password is too Short")
})
export async function POST(req : NextRequest){
    try {
        const body = await req.json();
        const validator = loginValidator.safeParse(body);
        if(!validator.success){
            return NextResponse.json({success:false,message:validator.error.issues.map(e=>e.message).join(",")},{status:400})
        }
        const {email, password} = validator.data;

        await dbConnect()
        const existUser = await User.findOne({email})

        if(!existUser){
            return NextResponse.json({success:false,message:"User Not Found"},{status:404})
        }

        const isMatch = await argon2.verify(existUser.password,password);
        if(!isMatch){
            return NextResponse.json({success:false,message:"Wrong Password"},{status:400})
        }
        const token = await new SignJWT({id:existUser._id.toString()}).setExpirationTime('7d').setProtectedHeader({alg:'HS256'}).sign(secret);

        const response = NextResponse.json({success:true,message:"User Login Successfully"},{status:200})

        response.cookies.set('token',token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production' ? true:false,
            sameSite:process.env.NODE_ENV === 'production' ? 'strict':'lax',
            path:'/',
            maxAge:60*60*24*7,
        })
        return response;
    } catch (error) {
        return NextResponse.json({success:false,message:error instanceof Error ? error.message : "Internal Server Error"},{status:500})
    }
}