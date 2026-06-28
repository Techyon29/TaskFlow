import { NextRequest, NextResponse } from "next/server";
import User from "@/src/models/user";
import dbConnect from "@/src/utils/dbConnect";


export async function GET(req : NextRequest){
    try {
        const searchParams = req.nextUrl.searchParams;
        const page = parseInt(searchParams.get("page") || "1")
        const limit = parseInt(searchParams.get("limit") || "10")
        const skip = (page-1)*limit
        await dbConnect()

        const user = await User.find({role:"user"}).select("-password").sort({createdAt:-1}).skip(skip).limit(limit)

        return NextResponse.json({success:true,message:"User Data Retrieve",data:user},{status:200})
        
    } catch (error) {
        return NextResponse.json({success:false,message:error instanceof Error ? error.message :"Internal Server Error"},{status:500})
    }
}