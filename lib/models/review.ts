import clientPromise from "../mongodb";
import { Collection, ObjectId } from "mongodb";

export interface Review {
  name: string;
  rating: number;
  text: string;
  createdAt: Date;
  status: "pending" | "approved";
}

export class ReviewModel {
  static async getCollection(): Promise<Collection<Review>> {
    const client = await clientPromise;
    const db = client.db("lead_stats");
    return db.collection<Review>("reviews");
  }

  static async create(data: Omit<Review, "status" | "createdAt">) {
    const collection = await this.getCollection();
    return collection.insertOne({
      ...data,
      status: "pending",
      createdAt: new Date(),
    });
  }

  static async getAll() {
     const collection = await this.getCollection();
    return collection.find().sort({ createdAt: -1 }).toArray();
  }

  static async getApproved() {
    const collection = await this.getCollection();
    return collection.find({ status: 'approved' }).sort({ createdAt: -1 }).toArray();
  }

  static async getPending() {
    const collection = await this.getCollection();
    return collection.find({status: "pending"}).sort({ createdAt: -1 }).toArray();
  }

  static async approve(id: string) {
    const collection = await this.getCollection();
    return collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "approved" } }
    );
  }
  static async reject(id: string) {
    const collection = await this.getCollection();
    return collection.deleteOne({ _id: new ObjectId(id) });
  }
}