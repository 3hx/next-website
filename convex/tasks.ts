import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all tasks sorted by completion status and due date
export const getTasks = query({
  handler: async (ctx) => {
    return await ctx.db.query("tasks")
      .order("isCompleted")
      .order("dueDate", "asc")
      .collect();
  },
});

// Add a new task
export const addTask = mutation({
  args: {
    title: v.string(),
    description: v.string(),
    dueDate: v.optional(v.number()),
    assignedTo: v.optional(v.string()),
    priority: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { title, description, dueDate, assignedTo, priority } = args;
    
    const taskId = await ctx.db.insert("tasks", {
      title,
      description,
      isCompleted: false,
      dueDate,
      assignedTo,
      priority,
    });
    
    return taskId;
  },
});

// Toggle a task's completion status
export const toggleTaskStatus = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    const task = await ctx.db.get(args.id);
    if (!task) {
      throw new Error("Task not found");
    }
    
    await ctx.db.patch(args.id, {
      isCompleted: !task.isCompleted,
    });
    
    return !task.isCompleted;
  },
});

// Delete a task
export const deleteTask = mutation({
  args: { id: v.id("tasks") },
  handler: async (ctx, args) => {
    await ctx.db.delete(args.id);
  },
});