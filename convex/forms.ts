import { mutation } from "./_generated/server";
import { v } from "convex/values";

// Submit a form
export const submitForm = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    message: v.string(),
  },
  handler: async (ctx, args) => {
    const { name, email, message } = args;

    const formId = await ctx.db.insert("forms", {
      name,
      email,
      message,
      timestamp: Date.now(),
    });

    return formId;
  },
});
