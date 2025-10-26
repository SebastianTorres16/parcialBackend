import express from "express";
import cors from "cors";
import morgan from "morgan";

import productRoutes from "./src/routes/products.routes.js";
import saleRoutes from "./src/routes/sale.routes.js";
import userRoutes from "./src/routes/user.routes.js";

const app = express();

app.use(morgan("dev"));
app.use(express.json());
app.use(cors());

//rutas del backend

app.use("/backend/products", productRoutes);
app.use("/backend/users", userRoutes);
app.use("/backend/sales", saleRoutes);

export default app;
