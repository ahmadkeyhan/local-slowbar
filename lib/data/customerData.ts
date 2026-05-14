"use server";

import connectToDatabase from "../mongodb";
import { Customer, ICustomer } from "../../models/Customer";
import mongoose from "mongoose";



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
