import mongoose from "mongoose";

const uri =
  "mongodb+srv://sbanderas:sebas1234@cluster0.yknpkr2.mongodb.net/desarrollo_web?retryWrites=true&w=majority";

(async () => {
  try {
    await mongoose.connect(uri);
    console.log("✅ Conectado");

    const indexes = await mongoose.connection.collection("users").getIndexes();
    console.log("📋 Índices actuales:", indexes);

    if (indexes.email_1 || indexes.some((i) => i.name === "email_1")) {
      await mongoose.connection.collection("users").dropIndex("email_1");
      console.log("🗑️  Índice 'email_1' eliminado");
    } else {
      console.log("✅ No existe el índice 'email_1'");
    }

    await mongoose.disconnect();
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
})();
