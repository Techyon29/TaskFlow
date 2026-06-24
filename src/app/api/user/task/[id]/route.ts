import { NextRequest,NextResponse } from "next/server";
import dbConnect from "@/src/utils/dbConnect";
import Task from "@/src/models/Task";
import mongoose from "mongoose";
import z from "zod";



export async function DELETE(req : NextRequest,{params}:{params : Promise<{id : string}>}){
    try {
        const { id } = await params;
        const userid = req.headers.get("x-user-id")
        if(!userid){
            return NextResponse.json({success:false,message:"Unauthorized"},{status:401})
        }
        if(!mongoose.Types.ObjectId.isValid(userid)){
            return NextResponse.json({success:false,message:"Invalid User ID"},{status:400})
        }
    if(!id){
        return NextResponse.json({success:false,message:"Id is required"},{status:400})
    }
        if(!mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({success:false,message:"Invalid Task ID"},{status:400})
        }
    await dbConnect()
    const task = await Task.findOneAndDelete({_id:id,userId:userid})
    if(!task){
        return NextResponse.json({success:false,message:"Task Not Found"},{status:404})
    }
    return NextResponse.json({success:true,message:"Task Delete"},{status:200})
    } catch (error ) {
         
        return NextResponse.json({success:false,message:error instanceof Error ? error.message:"Internal Server Error"},{status:500})
    }
}

const updateTaskValidate = z.object({
    title:z.string().trim().min(1,"Title should be greater than 1").optional(),
    description:z.string().trim().optional(),
    due_date:z.coerce.date().optional(),
    status:z.enum(['incomplete','complete']).optional(),
})

export async function PUT(req : NextRequest , {params}:{params : Promise<{id : string}>}){
    try {
        const  { id }= (await params);
        const userId = req.headers.get('x-user-id')

        if(!userId){
            return NextResponse.json({success:false,message:"Unauthorized"},{status:401})
        }

        if(!mongoose.Types.ObjectId.isValid(userId)){
            return NextResponse.json({success:false,message:"Invalid User ID"},{status:400})
        }
    if(!id){
        return NextResponse.json({success:false,message:"Id is required"},{status:400})
    }
        if(!mongoose.Types.ObjectId.isValid(id)){
            return NextResponse.json({success:false,message:"Invalid Task ID"},{status:400})
        }
        const body = await req.json();
        const validate = updateTaskValidate.safeParse(body)
        if(!validate.success){
            return NextResponse.json({success:false,message:validate.error.issues.map(e=>e.message).join(",")},{status:400})
        }
        const {title,description,due_date,status} = validate.data;
    await dbConnect()
    const update_task = await Task.findOneAndUpdate({_id:id,userId:userId},{title,description,due_date,status},{
        new:true,
        runValidators:true,
    });
    if(!update_task){
        return NextResponse.json({success:false,message:"No Task Found"},{status:404});
    }

    return NextResponse.json({success:true,message:"Task Updated",task:update_task},{status:200})
    } catch (error) {
        return NextResponse.json({success:false,message:error instanceof Error ? error.message:"Internal Server Error"},{status:500})
    }
}