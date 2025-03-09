import { action } from "./_generated/server";

export const seed = action({
  handler: async (ctx) => {
    const { scheduler } = ctx;
    
    // Schedule adding sample tasks
    await scheduler.runAfter(0, "seed:seedTasks");
    
    // Schedule adding sample messages
    await scheduler.runAfter(0, "seed:seedMessages");
    
    return "Seeding started...";
  },
});

export const seedTasks = action({
  handler: async (ctx) => {
    const { runMutation } = ctx;
    
    // Sample tasks data
    const tasks = [
      {
        title: "Update the website design",
        description: "Implement the new color scheme and typography",
        dueDate: Date.now() + 7 * 24 * 60 * 60 * 1000, // a week from now
        assignedTo: "Sarah",
        priority: "High",
      },
      {
        title: "Review analytics dashboard",
        description: "Check conversion rates and user engagement metrics",
        dueDate: Date.now() + 2 * 24 * 60 * 60 * 1000, // 2 days from now
        assignedTo: "Michael",
        priority: "Medium",
      },
      {
        title: "Prepare quarterly report",
        description: "Compile data and create presentation slides",
        dueDate: Date.now() + 14 * 24 * 60 * 60 * 1000, // 2 weeks from now
        assignedTo: "Jessica",
        priority: "High",
      },
      {
        title: "Respond to customer inquiries",
        description: "Answer emails and support tickets",
        dueDate: Date.now() + 1 * 24 * 60 * 60 * 1000, // tomorrow
        assignedTo: "David",
        priority: "Medium",
      },
      {
        title: "Schedule social media posts",
        description: "Create and schedule content for next month",
        dueDate: Date.now() + 5 * 24 * 60 * 60 * 1000, // 5 days from now
        assignedTo: "Sarah",
        priority: "Low",
      },
    ];
    
    // Add tasks to the database
    for (const task of tasks) {
      await runMutation("tasks:addTask", task);
    }
    
    return "Added sample tasks!";
  },
});

export const seedMessages = action({
  handler: async (ctx) => {
    const { runMutation } = ctx;
    
    // Sample messages
    const messages = [
      {
        text: "Hey team, I've just pushed the latest changes to the repo.",
        author: "David",
      },
      {
        text: "Great! I'll review your PR this afternoon.",
        author: "Sarah",
      },
      {
        text: "Don't forget about our meeting at 3pm today.",
        author: "Michael",
      },
      {
        text: "I've updated the design specs in Figma. Let me know what you think!",
        author: "Jessica",
      },
      {
        text: "Has anyone seen the issue with the login form? It seems to be resolved now.",
        author: "David",
      },
    ];
    
    // Add messages to the database
    for (const message of messages) {
      await runMutation("messages:addMessage", message);
    }
    
    return "Added sample messages!";
  },
});