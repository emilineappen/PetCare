import { pgTable, text, serial, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// We define a schema for messages to keep types consistent, 
// even though we aren't storing them in a real DB for this demo.
export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  content: text("content").notNull(),
  isBot: boolean("is_bot").notNull().default(false),
});

export const insertMessageSchema = createInsertSchema(messages).pick({
  content: true,
  isBot: true,
});

export type Message = typeof messages.$inferSelect;
export type InsertMessage = z.infer<typeof insertMessageSchema>;

// Request/Response types for the mock AI chat
export type ChatRequest = { message: string };
export type ChatResponse = { response: string };
