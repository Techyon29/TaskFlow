import { NextRequest,NextResponse } from "next/server";
import dbConnect from "@/src/utils/dbConnect";
import Task from "@/src/models/Task";


export async function GET(){
    try{
        await dbConnect();
        const task = await Task.find();
        return NextResponse.json({success:true,message:"Task retrieve success",task},{status:200})
    }catch(e : any){
         console.error(e.message)
        return NextResponse.json({success:false,message:"Error"})
    }
}

export async function POST(req : NextRequest){
    try {
        const {title,description,due_date,status} = await req.json();
        if(!title || !status){
            return NextResponse.json({success:false,message:"Title and status is required"},{status:400})
        }
        const sanitizeTitle = title.trim();
        if(sanitizeTitle.length == 0){
            return NextResponse.json({success:false,message:"Enter valid title"},{status:400})
        }
        const newTask  = await Task.create({
            title,
            description,
            due_date,
            status
        })
        return NextResponse.json({success:true,message:"Task Created",task:newTask},{status:201})

    } catch (error : any) {
         console.error(error.message)
        return NextResponse.json({success:false,message:"Error"},{status:500})
    }
}