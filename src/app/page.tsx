'use client'
import React, { useState } from 'react'
import { 
  Plus, 
  Trash2, 
  Edit2, 
  X, 
  Calendar, 
  Clock, 
  CheckCircle2, 
  Circle, 
  Search, 
  ListTodo, 
  AlertCircle,
  PlayCircle
} from 'lucide-react'
import { cn } from '../lib/utils'

interface Task {
  id: number;
  title: string;
  description: string;
  dueDate: string | null;
  status: string;
}

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Complete Studio Graphene Assessment",
    description: "Finish the full-stack task manager project and prepare README",
    dueDate: "2026-06-05T18:30:00.000Z",
    status: "New"
  },
  {
    id: 2,
    title: "Buy groceries",
    description: "Milk, eggs, bread, vegetables, and chicken",
    dueDate: "2026-06-03T12:00:00.000Z",
    status: "Active"
  },
  {
    id: 3,
    title: "Schedule dentist appointment",
    description: "Routine cleaning and checkup appointment",
    dueDate: "2026-06-10T10:00:00.000Z",
    status: "Complete"
  },
  {
    id: 4,
    title: "Finish React documentation",
    description: "Read about Server Actions and new caching strategies",
    dueDate: "2026-06-02T23:59:00.000Z",
    status: "New"
  },
  {
    id: 5,
    title: "Pay electricity bill",
    description: "Due this week to avoid late payment charges",
    dueDate: "2026-06-01T18:30:00.000Z",
    status: "New"
  },
  {
    id: 6,
    title: "Prepare for technical interview",
    description: "Revise Node.js, Express, MongoDB, and system design basics",
    dueDate: null,
    status: "New"
  },
  {
    id: 7,
    title: "Morning workout",
    description: "30 minutes cardio + strength training",
    dueDate: "2026-06-03T06:00:00.000Z",
    status: "New"
  }
];

const Page = () => {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [filter, setFilter] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const filterCategories = ['All', 'New', 'Active', 'Complete']

  const [addTaskModel, setAddTaskModel] = useState(false)
  const [editTaskModel, setEditTaskModel] = useState(false)
  
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [dueDate, setDueDate] = useState('')
  const [status, setStatus] = useState('Active')

  const formatTaskDate = (dateString: string | null) => {
    if (!dateString) return 'No due date';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'No due date';
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    } catch (e) {
      return 'No due date';
    }
  };

  const getDueDateStatus = (dateString: string | null, taskStatus: string) => {
    if (!dateString || taskStatus === 'Complete') return 'normal';
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return 'normal';
      const now = new Date();
      date.setHours(0, 0, 0, 0);
      now.setHours(0, 0, 0, 0);
      
      if (date.getTime() < now.getTime()) {
        return 'overdue';
      } else if (date.getTime() === now.getTime()) {
        return 'today';
      }
    } catch (e) {}
    return 'normal';
  };

  const handleEditClick = (task: Task) => {
    setEditingTask(task);
    setTitle(task.title);
    setDesc(task.description);
    setDueDate(task.dueDate ? task.dueDate.split('T')[0] : '');
    setStatus(task.status);
    setEditTaskModel(true);
  };

  const handleCloseModal = () => {
    setAddTaskModel(false);
    setEditTaskModel(false);
    setEditingTask(null);
    setTitle('');
    setDesc('');
    setDueDate('');
    setStatus('Active');
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const formattedDueDate = dueDate ? new Date(dueDate).toISOString() : null;

    if (addTaskModel) {
      const newTask: Task = {
        id: Date.now(),
        title,
        description: desc,
        dueDate: formattedDueDate,
        status
      };
      setTasks(prev => [newTask, ...prev]);
    } else if (editTaskModel && editingTask) {
      setTasks(prev => prev.map(t => 
        t.id === editingTask.id 
          ? { ...t, title, description: desc, dueDate: formattedDueDate, status } 
          : t
      ));
    }
    handleCloseModal();
  };

  const toggleTaskStatus = (task: Task) => {
    const nextStatus = task.status === 'Complete' ? 'Active' : 'Complete';
    setTasks(prev => prev.map(t => t.id === task.id ? { ...t, status: nextStatus } : t));
  };

  const handleDeleteTask = (taskId: number) => {
    setTasks(prev => prev.filter(t => t.id !== taskId));
  };

  const totalCount = tasks.length;
  const newCount = tasks.filter(t => t.status === 'New').length;
  const activeCount = tasks.filter(t => t.status === 'Active').length;
  const completeCount = tasks.filter(t => t.status === 'Complete').length;

  const filteredTasks = tasks.filter((task) => {
    const matchesFilter = filter === 'All' ? true : task.status === filter;
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          task.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12 min-h-screen">
      
      <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        
        <div className="relative group overflow-hidden rounded-2xl glass-panel p-5 transition-all duration-300 hover:border-neutral-700">
          <div className="absolute top-0 right-0 p-3 text-neutral-800 opacity-20 group-hover:scale-110 transition-transform duration-300">
            <ListTodo className="w-16 h-16" />
          </div>
          <p className="text-xs md:text-sm font-semibold text-neutral-400">Total Tasks</p>
          <p className="text-2xl md:text-4xl font-bold text-white mt-2 tracking-tight">{totalCount}</p>
          <div className="h-1 w-12 bg-neutral-600 rounded-full mt-4 group-hover:w-20 transition-all duration-300"></div>
        </div>

        <div className="relative group overflow-hidden rounded-2xl glass-panel p-5 transition-all duration-300 hover:border-amber-500/30">
          <div className="absolute top-0 right-0 p-3 text-amber-500/10 opacity-30 group-hover:scale-110 transition-transform duration-300">
            <AlertCircle className="w-16 h-16" />
          </div>
          <p className="text-xs md:text-sm font-semibold text-neutral-400">New Tasks</p>
          <p className="text-2xl md:text-4xl font-bold text-amber-400 mt-2 tracking-tight">{newCount}</p>
          <div className="h-1 w-12 bg-amber-500/50 rounded-full mt-4 group-hover:w-20 transition-all duration-300"></div>
        </div>

        <div className="relative group overflow-hidden rounded-2xl glass-panel p-5 transition-all duration-300 hover:border-indigo-500/30">
          <div className="absolute top-0 right-0 p-3 text-indigo-500/10 opacity-30 group-hover:scale-110 transition-transform duration-300">
            <PlayCircle className="w-16 h-16" />
          </div>
          <p className="text-xs md:text-sm font-semibold text-neutral-400">Active Tasks</p>
          <p className="text-2xl md:text-4xl font-bold text-indigo-400 mt-2 tracking-tight">{activeCount}</p>
          <div className="h-1 w-12 bg-indigo-500/50 rounded-full mt-4 group-hover:w-20 transition-all duration-300"></div>
        </div>

        <div className="relative group overflow-hidden rounded-2xl glass-panel p-5 transition-all duration-300 hover:border-emerald-500/30">
          <div className="absolute top-0 right-0 p-3 text-emerald-500/10 opacity-30 group-hover:scale-110 transition-transform duration-300">
            <CheckCircle2 className="w-16 h-16" />
          </div>
          <p className="text-xs md:text-sm font-semibold text-neutral-400">Completed Tasks</p>
          <p className="text-2xl md:text-4xl font-bold text-emerald-400 mt-2 tracking-tight">{completeCount}</p>
          <div className="h-1 w-12 bg-emerald-500/50 rounded-full mt-4 group-hover:w-20 transition-all duration-300"></div>
        </div>

      </section>

      <section className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between mb-8 pb-6 border-b border-neutral-900">
        
        <div className="flex items-center gap-1.5 p-1 bg-neutral-950 border border-neutral-800 rounded-full overflow-x-auto max-w-full">
          {filterCategories.map((cat) => {
            const isActive = filter === cat;
            const count = 
              cat === 'All' ? totalCount :
              cat === 'New' ? newCount :
              cat === 'Active' ? activeCount :
              completeCount;

            return (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs md:text-sm font-medium transition-all duration-200 cursor-pointer whitespace-nowrap",
                  isActive 
                    ? "bg-neutral-800 text-white shadow-md" 
                    : "text-neutral-400 hover:text-neutral-200"
                )}
              >
                {cat}
                <span className={cn(
                  "px-1.5 py-0.5 text-[10px] rounded-full",
                  isActive 
                    ? "bg-indigo-500 text-white" 
                    : "bg-neutral-900 text-neutral-500 border border-neutral-800"
                )}>
                  {count}
                </span>
              </button>
            )
          })}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative flex-1 md:flex-initial">
            <span className="absolute inset-y-0 left-3 flex items-center text-neutral-500">
              <Search className="w-4 h-4" />
            </span>
            <input 
              type="text" 
              placeholder="Search tasks..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full md:w-60 pl-9 pr-4 py-2 text-sm text-white placeholder:text-neutral-500 rounded-full bg-neutral-950 border border-neutral-800 focus:outline-none focus:border-neutral-700 transition-all"
            />
          </div>

          <button 
            onClick={() => {
              handleCloseModal();
              setStatus('New');
              setAddTaskModel(true);
            }}
            className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium px-4 py-2 rounded-full cursor-pointer transition-all hover:shadow-lg hover:shadow-indigo-500/20 active:scale-95"
          >
            <Plus className="w-4 h-4" />
            Add Task
          </button>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTasks.length > 0 ? (
          filteredTasks.map((task) => {
            const isCompleted = task.status === 'Complete';
            const dateStatus = getDueDateStatus(task.dueDate, task.status);

            return (
              <div 
                key={task.id} 
                className={cn(
                  "group relative flex flex-col justify-between p-6 rounded-2xl glass-panel glass-panel-hover transition-all duration-300",
                  isCompleted && "border-emerald-500/10 opacity-75 hover:border-emerald-500/30"
                )}
              >
                <div>
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2.5">
                      <button 
                        onClick={() => toggleTaskStatus(task)}
                        className="mt-1 text-neutral-500 hover:text-indigo-400 transition-colors cursor-pointer"
                      >
                        {isCompleted ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        ) : (
                          <Circle className="w-5 h-5 text-neutral-600 hover:border-indigo-400" />
                        )}
                      </button>
                      <h3 className={cn(
                        "text-lg font-bold text-neutral-100 leading-snug group-hover:text-white transition-colors",
                        isCompleted && "line-through text-neutral-500 group-hover:text-neutral-500"
                      )}>
                        {task.title}
                      </h3>
                    </div>

                    <span className={cn(
                      "px-2 py-0.5 rounded-md text-[10px] font-semibold uppercase tracking-wider",
                      task.status === 'New' && "bg-amber-500/10 text-amber-400 border border-amber-500/20",
                      task.status === 'Active' && "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
                      task.status === 'Complete' && "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                    )}>
                      {task.status}
                    </span>
                  </div>

                  <p className={cn(
                    "text-sm text-neutral-400 mt-3 line-clamp-3 leading-relaxed",
                    isCompleted && "text-neutral-500"
                  )}>
                    {task.description || <span className="italic text-neutral-600">No description provided.</span>}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-neutral-900 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-xs text-neutral-500">
                    <Calendar className="w-3.5 h-3.5" />
                    <span className={cn(
                      dateStatus === 'overdue' && "text-rose-500 font-semibold flex items-center gap-1",
                      dateStatus === 'today' && "text-amber-500 font-semibold"
                    )}>
                      {dateStatus === 'overdue' && <AlertCircle className="w-3 h-3" />}
                      {dateStatus === 'overdue' ? 'Overdue - ' : dateStatus === 'today' ? 'Due Today - ' : ''}
                      {formatTaskDate(task.dueDate)}
                    </span>
                  </div>

                  <div className="flex items-center gap-1">
                    <button 
                      onClick={() => handleEditClick(task)}
                      className="p-2 rounded-lg text-neutral-500 hover:text-indigo-400 hover:bg-neutral-900 transition-all cursor-pointer"
                      title="Edit Task"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button 
                      onClick={() => handleDeleteTask(task.id)}
                      className="p-2 rounded-lg text-neutral-500 hover:text-rose-400 hover:bg-neutral-900 transition-all cursor-pointer"
                      title="Delete Task"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            )
          })
        ) : (
          <div className="col-span-1 md:col-span-2 lg:col-span-3 py-16 flex flex-col items-center justify-center text-center">
            <div className="p-4 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-600 mb-4 animate-pulse">
              <ListTodo className="w-10 h-10" />
            </div>
            <h3 className="text-xl font-bold text-neutral-300">No tasks found</h3>
            <p className="text-sm text-neutral-500 max-w-xs mt-1">
              Try adjustments to your filters or search query, or create a new task.
            </p>
          </div>
        )}
      </section>

      {(addTaskModel || editTaskModel) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in">
          
          <form 
            onSubmit={handleSave}
            className="relative w-full max-w-md glass-modal p-6 md:p-8 rounded-2xl shadow-2xl animate-scale-up"
          >
            
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                <ListTodo className="w-5 h-5 text-indigo-400" />
                {addTaskModel ? 'Create New Task' : 'Edit Task'}
              </h2>
              <button 
                type="button"
                onClick={handleCloseModal}
                className="p-1.5 rounded-full hover:bg-neutral-800 text-neutral-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex flex-col gap-5 mb-6">
              
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="text-neutral-300 font-semibold text-xs uppercase tracking-wider">Title *</label>
                <input 
                  type="text" 
                  id="title" 
                  required
                  placeholder="e.g. Finish assessment submission" 
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm" 
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="text-neutral-300 font-semibold text-xs uppercase tracking-wider">Description</label>
                <textarea 
                  id="description" 
                  rows={3}
                  placeholder="Provide details about the task..." 
                  value={desc}
                  onChange={(e) => setDesc(e.target.value)}
                  className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white placeholder:text-neutral-600 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="due_date" className="text-neutral-300 font-semibold text-xs uppercase tracking-wider">Due Date</label>
                  <input 
                    type="date" 
                    id="due_date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm" 
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="status" className="text-neutral-300 font-semibold text-xs uppercase tracking-wider">Status</label>
                  <select 
                    id="status" 
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                    className="w-full p-3 rounded-xl bg-neutral-950 border border-neutral-800 text-white focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all text-sm"
                  >
                    <option value="New">New</option>
                    <option value="Active">Active</option>
                    <option value="Complete">Complete</option>
                  </select>
                </div>

              </div>

            </div>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-neutral-900">
              <button 
                type="button"
                onClick={handleCloseModal}
                className="px-4 py-2 text-sm font-medium text-neutral-400 hover:text-white rounded-full transition-all cursor-pointer"
              >
                Cancel
              </button>
              <button 
                type="submit"
                className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-500 rounded-full transition-all cursor-pointer hover:shadow-lg hover:shadow-indigo-500/20"
              >
                Save Changes
              </button>
            </div>

          </form>

        </div>
      )}

    </div>
  )
}

export default Page