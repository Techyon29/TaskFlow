import mongoose, {Schema, Model, Document} from "mongoose";


interface Itask{
  title:string,
  description?:string | null,
  due_date?: Date | null,
  status: 'active' | 'complete',
  createdAt:Date,
  updateAt:Date,
}


const taskSchema = new Schema<Itask>({
  title:{
    type:String,
    required:true,
  },
  description:{
    type:String,
    default:null,
  },
  due_date:{
    type:Date,
    default:null,
  },
  status:{
    type:String,
    enum:['active','complete'],
    default:'active'
  }
},{
  collection:"task",
  timestamps:true,
})

const Task : Model<Itask> = mongoose.models.Task || mongoose.model<Itask>("task",taskSchema);

export default Task;