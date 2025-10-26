import mongoose from "mongoose";

const uri =
  "mongodb+srv://sbanderas:sebas1234@cluster0.yknpkr2.mongodb.net/desarrollo_web?retryWrites=true&w=majority";

export const connectDB = async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ Conexión exitosa a MongoDB Atlas");
  } catch (error) {
    console.error("❌ Error al conectar:", error.message);
  }
};
