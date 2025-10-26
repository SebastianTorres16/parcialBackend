import app from "./app.js";
import { connectDB } from "./bd.js";

connectDB();
if (process.env.NODE_ENV !== "production") {
  app.listen(3000, () =>
    console.log("Server running on http://localhost:3000")
  );
}
