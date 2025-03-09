import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  messages: defineTable({
    text: v.string(),
    author: v.string(),
    timestamp: v.number(),
  }),
  tasks: defineTable({
    title: v.string(),
    description: v.string(),
    isCompleted: v.boolean(),
    dueDate: v.optional(v.number()),
    assignedTo: v.optional(v.string()),
    priority: v.optional(v.string()),
  }),
});