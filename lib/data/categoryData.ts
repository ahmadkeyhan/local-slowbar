"use server";

import connectToDatabase from "../mongodb";
import { Category, ICategory } from "../../models/Category";
import { MenuItem } from "../../models/MenuItem";
import mongoose from "mongoose";

// Category CRUD operations
export async function getCategories() {
  try {
    await connectToDatabase();
    const categories = await Category.find();
    return JSON.parse(JSON.stringify(categories));
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
}



// New function to get items grouped by categories
export async function getItemsGroupedByCategories() {
  try {
    await connectToDatabase()
    const categories = await Category.find();
    const items = await MenuItem.find({ available: true }).populate("categoryIds", "name")

    const grouped: { [categoryId: string]: any[] } = {}

    categories.forEach((category) => {
      grouped[category._id.toString()] = items.filter((item) =>
        item.categoryIds.some((catId: any) => catId._id.toString() === category._id.toString()),
      )
    })

    return {
      categories: JSON.parse(JSON.stringify(categories)),
      grouped: JSON.parse(JSON.stringify(grouped)),
    }
  } catch (error) {
    console.error("Error fetching grouped items:", error)
    throw new Error("Failed to fetch grouped items")
  }
}