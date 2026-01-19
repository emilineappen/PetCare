import { db } from "./db";
// We aren't using real DB storage for the demo features as requested (localStorage used instead),
// but we keep the structure ready.
export interface IStorage {
  // Add backend storage methods here if needed later
}

export class DatabaseStorage implements IStorage {
  // implementation
}

export const storage = new DatabaseStorage();
