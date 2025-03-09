import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

// Get all messages, sorted by timestamp
export const getMessages = query({
  handler: async (ctx) => {
    return await ctx.db.query("messages")
      .order("timestamp", "desc")
      .collect();
  },
});

// Add a new message
export const addMessage = mutation({
  args: {
    text: v.string(),
    author: v.string(),
  },
  handler: async (ctx, args) => {
    const { text, author } = args;
    const timestamp = Date.now();
    
    const messageId = await ctx.db.insert("messages", {
      text,
      author,
      timestamp,
    });
    
    return messageId;
  },
});