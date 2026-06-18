import mongoose, {Schema, Model, Document} from "mongoose";

interface IUser extends Document{
    name:string
    email:string
    password:string
    createdAt:Date,
    updatedAt:Date,
}

const userSchema = new Schema<IUser>({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    }
},{
    collection:"Users",
    timestamps:true
})

const User : Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User",userSchema);

export default User;