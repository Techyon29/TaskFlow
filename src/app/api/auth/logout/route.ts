import { NextRequest, NextResponse } from "next/server";


export async function POST(){
    try {
        const response = NextResponse.json({success:true,message:"LogOut Successfully"})
        response.cookies.delete("token")
        return response
    } catch (error) {
        return NextResponse.json({success:false , message:error instanceof Error ? error.message : "Something went wrong"},{status:500})
    }
}