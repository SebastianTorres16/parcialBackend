import Product from "../models/products.models.js";

export const createProduct = async (req, res) => {
  const { name, price, stock } = req.body;
  const newProduct = new Product({ name, price, stock });
  const productSave = await newProduct.save();
  res.status(200).json(productSave);
  try {
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(400).json({ message: ["Producto no encontrado"] });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const productUpdate = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!productUpdate)
      return res.status(404).json({ message: "Producto no encontrado" });
    res.status(200).json(productUpdate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const deleteProduct = await Product.findByIdAndDelete(req.params.id);
    if (!deleteProduct) {
      return res
        .status(400)
        .json({ message: ["Producto no encontrado para eliminar"] });
    }
    res.json({ message: ["Producto eliminado existosamente"] });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
