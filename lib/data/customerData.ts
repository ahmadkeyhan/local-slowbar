"use server";

import connectToDatabase from "../mongodb";
import { Customer, ICustomer } from "../../models/Customer";
import mongoose from "mongoose";

export async function getCustomers(page = 1, limit = 10) {
  try {
    await connectToDatabase();
    const skip = (page - 1) * limit;
    
    const [customers, total] = await Promise.all([
      Customer.find().sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Customer.countDocuments()
    ]);
    return {
      customers: JSON.parse(JSON.stringify(customers)),
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  } catch (error) {
    console.error("Error fetching customers:", error);
    throw new Error("Failed to fetch customers");
  }
}

export async function createCustomer(customerData: ICustomer) {
  try {
    await connectToDatabase();
    
    const newCustomer = new Customer({
      ...customerData,
      _id: new mongoose.Types.ObjectId(),
    });
    await newCustomer.save();
    return JSON.parse(JSON.stringify(newCustomer));
  } catch (error) {
    console.error("Error creating customer:", error);
    throw new Error("Failed to create customer");
  }
}
