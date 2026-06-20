import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/user";
import z from "zod";
import argon2 from 'argon2'
import dbConnect from "@/src/utils/dbConnect";


const registrationSchema = z.object({
    name:z.string().trim().min(2,"Name must be greater than 2 character"),
    email:z.string().email("Invalid Email"),
    password:z.string().trim().min(4,'Password is too short')
})

export async function POST(req: NextRequest){
    try {
        const body = await req.json();
        const validator = registrationSchema.safeParse(body)
        if(!validator.success){
            return NextResponse.json({success:false,message:validator.error.issues.map((e)=>e.message).join(',')},{status:400})
        }
        const {name , email, password} = validator.data;
        await dbConnect()

        const existUser = await User.findOne({email})
        if(existUser){
            return NextResponse.json({success:false,message:"Email Exist"},{status:409})
        }

        const hashPassword = await argon2.hash(password);
        const user = (await User.create({email,name,password:hashPassword}));

        return NextResponse.json({success:true,message:"User Created Successfully"},{status:201})
    } catch (error) {
        return NextResponse.json({success:false,message:error instanceof Error?error.message : "Internal Server Error"},{status:500})
    }
}