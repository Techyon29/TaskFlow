import { NextRequest,NextResponse } from "next/server";
import dbConnect from "@/src/utils/dbConnect";
import Task from "@/src/models/Task";
import z, { success } from "zod";
import mongoose from "mongoose";


export async function GET(req : NextRequest){
    try{
        const id = req.headers.get('x-user-id');
        if(!id){
            return NextResponse.json({success:false,message:"Unauthorized"},{status:401})
        }

        await dbConnect();
        const task = await Task.find({userId:id}).sort({createdAt:-1});
        return NextResponse.json({success:true,message:"Task retrieve success",task},{status:200})
    }catch(error ){
        return NextResponse.json({success:false,message:error instanceof Error ? error.message:"Internal Server Error"},{status:500})
    }
}

const taskValidation = z.object({
    title:z.string().trim().min(1,"Title should be greater than 1"),
    description:z.string().trim().optional(),
    due_date:z.coerce.date().optional(),
    status:z.enum(['incomplete','complete']),
})
export async function POST(req : NextRequest){
    try {
        const body = await req.json()
        const validate = taskValidation.safeParse(body);
        const id = req.headers.get('x-user-id');
        if(!id){
            return NextResponse.json({success:false,message:"Unauthorized"},{status:401})
        }
        if(!mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({success:false,message:"Invalid ID"},{status:404})
        }
        if(!validate.success){
            return NextResponse.json({success:false,message:validate.error.issues.map(e=>e.message).join(",")},{status:400})
        }
        const {title,description,due_date,status} = validate.data;
        await dbConnect()
        const newTask  = await Task.create({
            title,
            description,
            due_date,
            status,
            userId:id
        })
        return NextResponse.json({success:true,message:"Task Created",task:newTask},{status:201})

    } catch (error) {
        return NextResponse.json({success:false,message:error instanceof Error ? error.message:"Internal Server Error"},{status:500})
    }
}