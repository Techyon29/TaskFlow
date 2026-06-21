import mongoose, {Schema, Model, Document} from "mongoose";

interface IUser extends Document{
    name:string,
    email:string,
    password:string,
    role: 'user' | 'admin',
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
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{
    collection:"Users",
    timestamps:true
})

const User : Model<IUser> = mongoose.models.User || mongoose.model<IUser>("User",userSchema);

export default User;