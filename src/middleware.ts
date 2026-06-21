import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";


export async function middleware(req : NextRequest){
    try {
        const token = req.cookies.get('token')?.value;
        if(!token){
            return NextResponse.json({success:false,message:"Token Not Found"},{status:401})
        }
        const secret = new TextEncoder().encode(process.env.SECRET );
        const { payload } = await jwtVerify(token,secret)
        const id = payload.id as string;
        const role = payload.id as string;
        const pathname = req.nextUrl.pathname;

        if(pathname.startsWith("/admin") || pathname.startsWith("/api/admin") && role !== "admin"){
            return NextResponse.redirect(new URL("/auth/login"))
        }

        if(pathname.startsWith("/user") || pathname.startsWith("/api/user") && role !== "user" && role !== "admin"){
            return NextResponse.redirect(new URL("/auth/login"))
        }

        const reqHeader = new Headers(req.headers)
        reqHeader.set("x-user-id",id);
        reqHeader.set("x-user-role",role);

        return NextResponse.next({ request : {
            headers:reqHeader
        }})
    } catch (error) {
       return NextResponse.redirect(new URL('/auth/login',req.url))
    }
}

export const config = {
    matcher:['/api/user/:path*','/api/user/:path*','/user']
}