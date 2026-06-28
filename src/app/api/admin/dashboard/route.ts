import { NextRequest,NextResponse } from "next/server";
import User from "@/src/models/user";
import Task from "@/src/models/Task";
import dbConnect from "@/src/utils/dbConnect";


export async function GET(){
    try {
        await dbConnect()
        const date = new Date()
        const start = new Date(date.getFullYear(),date.getMonth(),1)
        const totalUser = await User.countDocuments();
        const totalTask = await Task.countDocuments();
        const newUserCount = await User.find({role:"user",createdAt:{$gt:start}}).countDocuments();
        const user = await User.find({role:"user"}).select("-password").sort({createdAt:-1}).limit(5)

        return NextResponse.json({success:true,message:"Dashboard Data retrieve",data:{ totalUser, totalTask,newUserCount,user}},{status:200})
    } catch (error) {
        return NextResponse.json({success:false,message:error instanceof Error?error.message:"Internal Server Error"},{status:500})
    }
}