import clientPromise from "../mongodb";
import { Collection, ObjectId } from "mongodb";

export interface Lead {
  name: string;
  email: string;
  phone: string;
  message?: string;
  createdAt: Date;
  status: "new" | "contacted" | "processed";
}

export class LeadModel {
  static async getCollection(): Promise<Collection<Lead>> {
    const client = await clientPromise;
    const db = client.db("lead_stats");
    return db.collection<Lead>("leads");
  }

  static async create(data: Omit<Lead, "createdAt" | "status">) {
    const collection = await this.getCollection();
    return collection.insertOne({
      ...data,
      createdAt: new Date(),
      status: "new",
    });
  }

  static async getAll() {
    const collection = await this.getCollection();
    return collection.find().sort({createdAt: -1}).toArray();
  }

  static async updateStatus(id: string, status: Lead["status"]) {
    const collection = await this.getCollection();
    return collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );
  }
}