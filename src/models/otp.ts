import mongoose, {Schema, Model, Document} from "mongoose";


interface IOtp extends Document{
    email:string,
    requestCount:number,
    hashOtp:string,
    expiredAt:Date,
    failCount:number,
    verifiedAt?:Date,
    createdAt:Date,
    updatedAt:Date,
}

const otpSchema = new Schema<IOtp>({
    email:{ type:String,required:true,unique:true},
    requestCount:{type:Number,default:1},
    hashOtp:{type:String,required:true},
    expiredAt:{type:Date,required:true},
    failCount:{type:Number,default:0},
    verifiedAt:{type:Date},
},{
    collection:"otps",
    timestamps:true
})

const OTP : Model<IOtp> = mongoose.models.otp || mongoose.model<IOtp>('otp',otpSchema);

export default OTP;