import Database from 'better-sqlite3';
import path from 'path';

const db = new Database('furniture.db');

// Initialize database schema
export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      image TEXT
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      description TEXT,
      price REAL NOT NULL,
      old_price REAL,
      image TEXT,
      category_id INTEGER,
      material TEXT,
      color TEXT,
      stock INTEGER DEFAULT 0,
      is_featured INTEGER DEFAULT 0,
      FOREIGN KEY (category_id) REFERENCES categories (id)
    );

    CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      customer_name TEXT NOT NULL,
      customer_email TEXT NOT NULL,
      total_amount REAL NOT NULL,
      status TEXT DEFAULT 'pending',
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS order_items (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      order_id INTEGER,
      product_id INTEGER,
      quantity INTEGER,
      price REAL,
      FOREIGN KEY (order_id) REFERENCES orders (id),
      FOREIGN KEY (product_id) REFERENCES products (id)
    );
  `);

  // Seed initial data if empty
  const categoryCount = db.prepare('SELECT COUNT(*) as count FROM categories').get() as { count: number };
  if (categoryCount.count === 0) {
    const insertCat = db.prepare('INSERT INTO categories (name, slug, image) VALUES (?, ?, ?)');
    insertCat.run('Phòng khách', 'phong-khach', 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800');
    insertCat.run('Phòng ngủ', 'phong-ngu', 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=800');
    insertCat.run('Phòng bếp', 'phong-bep', 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=800');

    const insertProd = db.prepare('INSERT INTO products (name, slug, description, price, old_price, image, category_id, material, color, stock, is_featured) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)');
    insertProd.run('Sofa Scandinavia Cao Cấp', 'sofa-scandinavia', 'Sofa phong cách Bắc Âu sang trọng', 12500000, 15000000, 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800', 1, 'Vải Nỉ', 'Xám', 10, 1);
    insertProd.run('Giường Ngủ Minimalist', 'giuong-minimalist', 'Giường ngủ tối giản hiện đại', 8900000, null, 'https://images.unsplash.com/photo-1505691938895-1758d7eaa511?w=800', 2, 'Gỗ Sồi', 'Gỗ', 5, 1);
    insertProd.run('Bàn Ăn Marble Tròn', 'ban-an-marble', 'Bàn ăn mặt đá sang trọng', 15200000, 18000000, 'https://images.unsplash.com/photo-1530018607912-eff2df114f11?w=800', 3, 'Đá Marble', 'Trắng', 3, 1);
    insertProd.run('Ghế Armchair Nổi Bật', 'ghe-armchair', 'Ghế thư giãn thiết kế độc đáo', 4500000, null, 'https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?w=800', 1, 'Da', 'Vàng', 8, 1);
  }
}

export default db;
