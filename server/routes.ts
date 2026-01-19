import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

const MOCK_AI_RESPONSES = [
  "That sounds like normal behavior, but keep an eye on it.",
  "Please make sure your pet has plenty of fresh water.",
  "If symptoms persist for more than 24 hours, please consult a real veterinarian.",
  "Regular exercise is key to a happy pet!",
  "A balanced diet will help with that issue.",
  "I'm just a demo AI, but I think your pet is adorable!",
  "Make sure to keep vaccinations up to date."
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  app.post(api.chat.send.path, async (req, res) => {
    try {
      // Validate input
      const { message } = api.chat.send.input.parse(req.body);
      
      // Simulate "thinking" delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Pick a random response
      const randomResponse = MOCK_AI_RESPONSES[Math.floor(Math.random() * MOCK_AI_RESPONSES.length)];
      
      res.json({ response: randomResponse });
    } catch (err) {
      if (err instanceof z.ZodError) {
        res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      } else {
        res.status(500).json({ message: "Internal server error" });
      }
    }
  });

  return httpServer;
}
