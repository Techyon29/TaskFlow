import { NextRequest,NextResponse } from "next/server";
import dbConnect from "@/src/utils/dbConnect";
import Task from "@/src/models/Task";


export async function DELETE(req : NextRequest,{params}:{params : Promise<{id : string}>}){
    try {
        const { id } = await params;
    if(!id){
        return NextResponse.json({success:false,message:"Id is required"},{status:400})
    }
    await dbConnect()
    const task = await Task.findByIdAndDelete(id)
    return NextResponse.json({success:true,message:"Task Delete"},{status:200})
    } catch (error : any) {
         console.error(error.message)
        return NextResponse.json({success:false,message:"Error"},{status:500})
    }
}

export async function PUT(req : NextRequest , {params}:{params : Promise<{id : string}>}){
    try {
        const  { id }= (await params);
    if(!id){
        return NextResponse.json({success:false,message:"Id is required"},{status:400})
    }
    const {title,description,due_date,status} = await req.json();
    await dbConnect()
    const update_task = await Task.findByIdAndUpdate(id,{title,description,due_date,status},{
        new:true,
        runValidators:true,
    });
    if(!update_task){
        return NextResponse.json({success:false,message:"No Task Found"},{status:404});
    }

    return NextResponse.json({success:true,message:"Task Updated",task:update_task},{status:200})
    } catch (error : any) {
        console.error(error.message)
        return NextResponse.json({success:false,message:"Error"},{status:500})
    }
}