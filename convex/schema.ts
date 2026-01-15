import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  users: defineTable({
    tokenIdentifier: v.string(),
    name: v.string(),
    email: v.string(),
  }).index("by_token", ["tokenIdentifier"]),

  contactForm: defineTable({
    name: v.string(),
    email: v.string(),
    project: v.string(),
    services: v.array(v.string()),
    budget: v.string(),
    createdAt: v.number(),
  }).index("by_email", ["email"]),
});