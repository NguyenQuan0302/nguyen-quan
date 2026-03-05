import express from "express";
import { createServer as createViteServer } from "vite";
import db, { initDb } from "./src/db/schema.ts";

async function startServer() {
  initDb();
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Routes
  app.get("/api/products", (req, res) => {
    const products = db.prepare('SELECT p.*, c.name as category_name FROM products p LEFT JOIN categories c ON p.category_id = c.id').all();
    res.json(products);
  });

  app.get("/api/categories", (req, res) => {
    const categories = db.prepare('SELECT * FROM categories').all();
    res.json(categories);
  });

  app.post("/api/orders", (req, res) => {
    const { customer_name, customer_email, items, total_amount } = req.body;
    
    const info = db.prepare('INSERT INTO orders (customer_name, customer_email, total_amount) VALUES (?, ?, ?)').run(customer_name, customer_email, total_amount);
    const orderId = info.lastInsertRowid;

    const insertItem = db.prepare('INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)');
    for (const item of items) {
      insertItem.run(orderId, item.id, item.quantity, item.price);
    }

    res.json({ success: true, orderId });
  });

  app.get("/api/admin/stats", (req, res) => {
    const totalSales = db.prepare('SELECT SUM(total_amount) as total FROM orders').get() as { total: number };
    const orderCount = db.prepare('SELECT COUNT(*) as count FROM orders').get() as { count: number };
    const productCount = db.prepare('SELECT COUNT(*) as count FROM products').get() as { count: number };
    
    res.json({
      totalSales: totalSales.total || 0,
      orderCount: orderCount.count,
      productCount: productCount.count
    });
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static("dist"));
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
