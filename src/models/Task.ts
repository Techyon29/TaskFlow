import mongoose, {Schema, Model, Document} from "mongoose";


interface Itask{
  title:string,
  description?:string | null,
  due_date?: Date | null,
  status: 'incomplete' | 'complete' | 'Incomplete' | 'Complete' | 'new' | 'New',
  createdAt:Date,
  updatedAt:Date,
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
    enum:['incomplete','complete','Incomplete','Complete','new','New'],
    default:'incomplete'
  }
},{
  collection:"task",
  timestamps:true,
})

const Task : Model<Itask> = mongoose.models.task || mongoose.model<Itask>("task",taskSchema);

export default Task;