"use client";

import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function TaskList() {
  // Get tasks from Convex
  const tasks = useQuery(api.tasks.getTasks);
  
  // Set up mutations
  const addTask = useMutation(api.tasks.addTask);
  const toggleTaskStatus = useMutation(api.tasks.toggleTaskStatus);
  const deleteTask = useMutation(api.tasks.deleteTask);
  
  // State for new task
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskDescription, setNewTaskDescription] = useState("");
  const [newTaskDueDate, setNewTaskDueDate] = useState("");
  const [newTaskAssignee, setNewTaskAssignee] = useState("");
  const [newTaskPriority, setNewTaskPriority] = useState("Medium");
  
  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTaskTitle || !newTaskDescription) return;
    
    await addTask({
      title: newTaskTitle,
      description: newTaskDescription,
      dueDate: newTaskDueDate ? new Date(newTaskDueDate).getTime() : undefined,
      assignedTo: newTaskAssignee || undefined,
      priority: newTaskPriority,
    });
    
    // Reset form
    setNewTaskTitle("");
    setNewTaskDescription("");
    setNewTaskDueDate("");
    setNewTaskAssignee("");
    setNewTaskPriority("Medium");
  };
  
  // Function to format date
  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString();
  };
  
  // Define priority colors
  const priorityColors = {
    High: "bg-rose-100 text-rose-800",
    Medium: "bg-amber-100 text-amber-800",
    Low: "bg-emerald-100 text-emerald-800",
  };
  
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-slate-950 mb-6">Task Management</h2>
      
      {/* Task Form */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6 mb-8">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Add New Task</h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Title
              </label>
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                required
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Due Date
              </label>
              <input
                type="date"
                value={newTaskDueDate}
                onChange={(e) => setNewTaskDueDate(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-900 mb-1">
              Description
            </label>
            <textarea
              value={newTaskDescription}
              onChange={(e) => setNewTaskDescription(e.target.value)}
              required
              rows={2}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
            />
          </div>
          
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Assignee
              </label>
              <input
                type="text"
                value={newTaskAssignee}
                onChange={(e) => setNewTaskAssignee(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-slate-900 mb-1">
                Priority
              </label>
              <select
                value={newTaskPriority}
                onChange={(e) => setNewTaskPriority(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-slate-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>
          
          <Button
            type="submit"
            className="bg-slate-950 hover:bg-slate-900 text-white py-2 px-6 rounded-lg transition-colors"
          >
            Add Task
          </Button>
        </form>
      </div>
      
      {/* Tasks List */}
      <div className="bg-white rounded-xl shadow-md border border-slate-200 p-6">
        <h3 className="text-lg font-semibold text-slate-900 mb-4">Tasks</h3>
        
        {tasks === undefined ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-800"></div>
            <p className="mt-2 text-slate-600">Loading tasks...</p>
          </div>
        ) : tasks.length === 0 ? (
          <p className="text-slate-600 text-center py-8">No tasks yet. Add your first task above!</p>
        ) : (
          <div className="space-y-4">
            {tasks.map((task) => (
              <div 
                key={task._id} 
                className={`border rounded-lg p-4 transition-all ${
                  task.isCompleted ? "bg-slate-50 border-slate-200" : "bg-white border-slate-300"
                }`}
              >
                <div className="flex justify-between items-start">
                  <div className="flex items-start gap-3">
                    <input
                      type="checkbox"
                      checked={task.isCompleted}
                      onChange={() => toggleTaskStatus({ id: task._id })}
                      className="mt-1 h-5 w-5 rounded-md border-slate-300 text-slate-950 focus:ring-slate-500"
                    />
                    <div>
                      <h4 className={`font-medium ${task.isCompleted ? "text-slate-500 line-through" : "text-slate-900"}`}>
                        {task.title}
                      </h4>
                      <p className={`text-sm ${task.isCompleted ? "text-slate-400" : "text-slate-600"}`}>
                        {task.description}
                      </p>
                      
                      <div className="mt-2 flex flex-wrap gap-2">
                        {task.dueDate && (
                          <span className="inline-flex items-center text-xs bg-slate-100 text-slate-800 px-2 py-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {formatDate(task.dueDate)}
                          </span>
                        )}
                        
                        {task.assignedTo && (
                          <span className="inline-flex items-center text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            {task.assignedTo}
                          </span>
                        )}
                        
                        {task.priority && (
                          <span className={`inline-flex items-center text-xs px-2 py-1 rounded ${
                            priorityColors[task.priority as keyof typeof priorityColors] || 'bg-slate-100 text-slate-800'
                          }`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                            </svg>
                            {task.priority}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => deleteTask({ id: task._id })}
                    className="text-slate-400 hover:text-red-500 transition-colors"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}