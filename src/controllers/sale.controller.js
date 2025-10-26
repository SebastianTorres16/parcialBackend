import Sale from "../models/sale.models.js";
import Product from "../models/products.models.js";

export const getSales = async (req, res) => {
  try {
    // Buscar ventas (ya no necesitamos poblar products.product)
    const sales = await Sale.find().populate("user", "username role");

    res.json(sales);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las ventas" });
  }
};

// 🧾 Crear venta y actualizar stock de productos
export const createSale = async (req, res) => {
  try {
    const user = req.body.user;

    // Crear nueva venta con snapshots
    const saleProducts = [];
    for (const item of req.body.products) {
      const productFound = await Product.findById(item.product);
      if (!productFound) continue;

      // Guardar snapshot
      saleProducts.push({
        product: productFound._id,
        productName: productFound.name,
        productPrice: productFound.price,
        quantity: item.quantity,
        total: productFound.price * item.quantity,
      });

      //validamos que la cantidad a vender no sea mayor que el stock del producto
      if (productFound.stock > item.quantity) {
        // Descontar stock
        productFound.stock -= item.quantity;
      } else {
        return res
          .status(400)
          .json({ message: `Stock insuficiente para ${productFound.name}` });
      }
      await productFound.save();
    }

    const total = saleProducts.reduce((sum, p) => sum + p.total, 0);

    const newSale = new Sale({
      user: user,
      products: saleProducts,
      total,
    });

    const saleSaved = await newSale.save();

    // Solo populamos usuario, no productos
    await saleSaved.populate("user", "username role");

    res.json(saleSaved);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear la venta" });
  }
};

// 🔍 Obtener venta por ID
export const getSale = async (req, res) => {
  try {
    const sale = await Sale.findById(req.params.id).populate(
      "user",
      "username role"
    );

    if (!sale) {
      return res.status(404).json({ message: "Venta no encontrada" });
    }

    res.json(sale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la venta" });
  }
};
