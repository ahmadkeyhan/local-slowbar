// import type mongoose from "mongoose"
import { Schema, model } from "mongoose"
import mongoose from "mongoose"

export interface ICustomer {
  _id?: mongoose.Types.ObjectId | string
  name?: string
  phone: string
  createdAt?: Date
  updatedAt?: Date
}

const customerSchema = new Schema<ICustomer>(
  {
    name: { type: String },
    phone: { type: String, required: true }
  },
  {
    timestamps: true,
    // toJSON: {
    //   virtuals: true,
    //   transform: (doc, ret) => {
    //     ret.id = ret._id
    //     delete ret._id
    //     delete ret.__v
    //     return ret
    //   },
    // },
  },
)

export const Customer = mongoose.models?.Customer || model<ICustomer>("Customer", customerSchema)

