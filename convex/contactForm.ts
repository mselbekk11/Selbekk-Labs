import { mutation } from "./_generated/server";
import { v } from "convex/values";

export const submit = mutation({
  args: {
    name: v.string(),
    email: v.string(),
    project: v.string(),
    services: v.array(v.string()),
    budget: v.string(),
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("contactForm", {
      name: args.name,
      email: args.email,
      project: args.project,
      services: args.services,
      budget: args.budget,
      createdAt: Date.now(),
    });
    return id;
  },
});
