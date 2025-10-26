import mongoose from "mongoose";

const { Schema, model } = mongoose;

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      requiered: true,
      unique: true,
    },
    price: {
      type: Number,
      requiered: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  { timestamp: true }
);

export default model("Product", ProductSchema);
