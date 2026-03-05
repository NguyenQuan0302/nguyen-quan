import React, { useState, useEffect } from 'react';
import { ShoppingCart, Search, Armchair, Heart, Trash2, Plus, Minus, ArrowRight, LayoutDashboard, Package, ShoppingBag, PlusCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product, Category, CartItem } from './types';

// --- Components ---

const Navbar = ({ cartCount, onNavigate, activePage }: { cartCount: number, onNavigate: (page: string) => void, activePage: string }) => (
  <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800">
    <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-8">
      <div className="flex items-center gap-8 shrink-0">
        <div className="flex items-center gap-3 text-blue-600 cursor-pointer" onClick={() => onNavigate('home')}>
          <Armchair size={32} />
          <h1 className="text-xl font-extrabold tracking-tight text-slate-900 dark:text-white uppercase">ModernHome</h1>
        </div>
      </div>
      
      <nav className="hidden lg:flex items-center gap-8">
        {['home', 'shop', 'about', 'contact'].map((page) => (
          <button 
            key={page}
            onClick={() => onNavigate(page)}
            className={`text-sm font-semibold capitalize transition-colors ${activePage === page ? 'text-blue-600' : 'text-slate-600 dark:text-slate-300 hover:text-blue-600'}`}
          >
            {page === 'home' ? 'Trang chủ' : page === 'shop' ? 'Cửa hàng' : page === 'about' ? 'Giới thiệu' : 'Liên hệ'}
          </button>
        ))}
      </nav>

      <div className="flex items-center gap-4">
        <div className="relative hidden md:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm..." 
            className="pl-10 pr-4 py-2 bg-slate-100 dark:bg-slate-800 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button onClick={() => onNavigate('cart')} className="relative p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
          <ShoppingCart size={24} />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-[10px] text-white font-bold">
              {cartCount}
            </span>
          )}
        </button>
        <button onClick={() => onNavigate('admin')} className="p-2 text-slate-600 dark:text-slate-300 hover:text-blue-600 transition-colors">
          <LayoutDashboard size={24} />
        </button>
      </div>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-slate-900 text-white py-16">
    <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12">
      <div className="col-span-1 md:col-span-1">
        <div className="flex items-center gap-3 text-blue-500 mb-6">
          <Armchair size={32} />
          <h2 className="text-xl font-extrabold tracking-tight uppercase">ModernHome</h2>
        </div>
        <p className="text-slate-400 text-sm leading-relaxed">
          Kiến tạo không gian sống hiện đại và sang trọng với những mẫu nội thất tinh tế nhất.
        </p>
      </div>
      <div>
        <h4 className="font-bold mb-6">Khám phá</h4>
        <ul className="space-y-4 text-sm text-slate-400">
          <li><a href="#" className="hover:text-blue-500 transition-colors">Phòng khách</a></li>
          <li><a href="#" className="hover:text-blue-500 transition-colors">Phòng ngủ</a></li>
          <li><a href="#" className="hover:text-blue-500 transition-colors">Phòng bếp</a></li>
          <li><a href="#" className="hover:text-blue-500 transition-colors">Trang trí</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6">Hỗ trợ</h4>
        <ul className="space-y-4 text-sm text-slate-400">
          <li><a href="#" className="hover:text-blue-500 transition-colors">Chính sách bảo hành</a></li>
          <li><a href="#" className="hover:text-blue-500 transition-colors">Vận chuyển</a></li>
          <li><a href="#" className="hover:text-blue-500 transition-colors">Đổi trả hàng</a></li>
          <li><a href="#" className="hover:text-blue-500 transition-colors">Liên hệ</a></li>
        </ul>
      </div>
      <div>
        <h4 className="font-bold mb-6">Đăng ký nhận tin</h4>
        <p className="text-sm text-slate-400 mb-4">Nhận cập nhật về các bộ sưu tập mới nhất.</p>
        <div className="flex gap-2">
          <input type="email" placeholder="Email của bạn" className="flex-1 px-4 py-2 rounded-lg bg-slate-800 border-none text-sm focus:ring-1 focus:ring-blue-500" />
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold">Gửi</button>
        </div>
      </div>
    </div>
    <div className="max-w-7xl mx-auto px-4 mt-16 pt-8 border-t border-slate-800 text-center text-slate-500 text-xs">
      © 2024 ModernHome Furniture. All rights reserved.
    </div>
  </footer>
);

// --- Pages ---

const HomePage = ({ onAddToCart, onNavigate }: { onAddToCart: (p: Product) => void, onNavigate: (page: string) => void }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
    fetch('/api/categories').then(res => res.json()).then(setCategories);
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center overflow-hidden rounded-3xl mx-4 mt-4">
        <img 
          src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=1600" 
          alt="Hero" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-7xl mx-auto px-8 w-full">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-2xl text-white space-y-6"
          >
            <h1 className="text-6xl font-black leading-tight">Nội Thất Hiện Đại Cho Ngôi Nhà Của Bạn</h1>
            <p className="text-xl text-slate-200">Khám phá bộ sưu tập tối giản, sang trọng giúp nâng tầm không gian sống.</p>
            <button 
              onClick={() => onNavigate('shop')}
              className="px-10 py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30"
            >
              Mua Ngay
            </button>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-10">Danh Mục Sản Phẩm</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((cat) => (
            <div key={cat.id} className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer">
              <img src={cat.image} alt={cat.name} className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-2xl font-bold">{cat.name}</h3>
                <p className="text-slate-300 text-sm">Khám phá ngay</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-10">
          <h2 className="text-3xl font-bold">Sản phẩm nổi bật</h2>
          <button onClick={() => onNavigate('shop')} className="text-blue-600 font-bold flex items-center gap-2 hover:underline">
            Xem tất cả <ArrowRight size={20} />
          </button>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.filter(p => p.is_featured).map((product) => (
            <motion.div 
              key={product.id}
              whileHover={{ y: -10 }}
              className="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm hover:shadow-xl transition-all"
            >
              <div className="relative aspect-square overflow-hidden bg-slate-100 dark:bg-slate-900">
                <img src={product.image} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <button className="absolute top-4 right-4 p-2 bg-white/80 dark:bg-slate-800/80 rounded-full text-slate-400 hover:text-red-500 transition-colors">
                  <Heart size={20} />
                </button>
              </div>
              <div className="p-6">
                <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-1">{product.category_name}</p>
                <h3 className="font-bold text-lg mb-2 truncate">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-black text-xl">{product.price.toLocaleString()}đ</span>
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="p-2 bg-slate-900 dark:bg-blue-600 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

const ShopPage = ({ onAddToCart }: { onAddToCart: (p: Product) => void }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filter, setFilter] = useState({ category: 'all', price: 'all' });

  useEffect(() => {
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  const filteredProducts = products.filter(p => {
    if (filter.category !== 'all' && p.category_name !== filter.category) return false;
    if (filter.price === 'low' && p.price > 5000000) return false;
    if (filter.price === 'mid' && (p.price < 5000000 || p.price > 15000000)) return false;
    if (filter.price === 'high' && p.price < 15000000) return false;
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 flex gap-10">
      <aside className="w-64 shrink-0 space-y-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Danh mục</h3>
          <div className="space-y-2">
            {['all', 'Phòng khách', 'Phòng ngủ', 'Phòng bếp'].map(cat => (
              <label key={cat} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="category" 
                  checked={filter.category === cat}
                  onChange={() => setFilter({ ...filter, category: cat })}
                  className="text-blue-600 focus:ring-blue-500" 
                />
                <span className="text-slate-600 dark:text-slate-400 group-hover:text-blue-600 transition-colors capitalize">{cat === 'all' ? 'Tất cả' : cat}</span>
              </label>
            ))}
          </div>
        </div>
        <div>
          <h3 className="font-bold text-lg mb-4">Khoảng giá</h3>
          <div className="space-y-2">
            {[
              { id: 'all', label: 'Tất cả' },
              { id: 'low', label: 'Dưới 5tr' },
              { id: 'mid', label: '5tr - 15tr' },
              { id: 'high', label: 'Trên 15tr' }
            ].map(p => (
              <label key={p.id} className="flex items-center gap-3 cursor-pointer group">
                <input 
                  type="radio" 
                  name="price" 
                  checked={filter.price === p.id}
                  onChange={() => setFilter({ ...filter, price: p.id })}
                  className="text-blue-600 focus:ring-blue-500" 
                />
                <span className="text-slate-600 dark:text-slate-400 group-hover:text-blue-600 transition-colors">{p.label}</span>
              </label>
            ))}
          </div>
        </div>
      </aside>

      <div className="flex-1">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-200 dark:border-slate-700 shadow-sm">
              <img src={product.image} alt={product.name} className="w-full aspect-square object-cover" />
              <div className="p-6">
                <h3 className="font-bold text-lg mb-2">{product.name}</h3>
                <div className="flex items-center justify-between">
                  <span className="text-blue-600 font-black text-xl">{product.price.toLocaleString()}đ</span>
                  <button 
                    onClick={() => onAddToCart(product)}
                    className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    <Plus size={20} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const CartPage = ({ cart, onUpdateQuantity, onRemove, onCheckout }: { cart: CartItem[], onUpdateQuantity: (id: number, q: number) => void, onRemove: (id: number) => void, onCheckout: () => void }) => {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? 250000 : 0;
  const total = subtotal + shipping;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h2 className="text-3xl font-bold mb-10">Giỏ hàng của bạn</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          {cart.length === 0 ? (
            <div className="text-center py-20 bg-white dark:bg-slate-800 rounded-2xl border border-dashed border-slate-300">
              <ShoppingBag size={64} className="mx-auto text-slate-300 mb-4" />
              <p className="text-slate-500">Giỏ hàng của bạn đang trống.</p>
            </div>
          ) : (
            cart.map((item) => (
              <div key={item.id} className="flex items-center gap-6 p-6 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700">
                <img src={item.image} alt={item.name} className="w-24 h-24 rounded-xl object-cover" />
                <div className="flex-1">
                  <h3 className="font-bold text-lg">{item.name}</h3>
                  <p className="text-blue-600 font-bold">{item.price.toLocaleString()}đ</p>
                </div>
                <div className="flex items-center border border-slate-200 dark:border-slate-700 rounded-lg">
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity - 1)} className="p-2 hover:text-blue-600"><Minus size={16} /></button>
                  <span className="w-10 text-center font-bold">{item.quantity}</span>
                  <button onClick={() => onUpdateQuantity(item.id, item.quantity + 1)} className="p-2 hover:text-blue-600"><Plus size={16} /></button>
                </div>
                <button onClick={() => onRemove(item.id)} className="text-slate-400 hover:text-red-500"><Trash2 size={24} /></button>
              </div>
            ))
          )}
        </div>
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 h-fit space-y-6">
          <h3 className="text-xl font-bold">Tóm tắt đơn hàng</h3>
          <div className="space-y-4 text-slate-600 dark:text-slate-400">
            <div className="flex justify-between"><span>Tạm tính</span><span className="font-bold text-slate-900 dark:text-white">{subtotal.toLocaleString()}đ</span></div>
            <div className="flex justify-between"><span>Phí vận chuyển</span><span className="font-bold text-slate-900 dark:text-white">{shipping.toLocaleString()}đ</span></div>
            <div className="border-t border-slate-200 dark:border-slate-700 pt-4 flex justify-between">
              <span className="text-lg font-bold text-slate-900 dark:text-white">Tổng cộng</span>
              <span className="text-2xl font-black text-blue-600">{total.toLocaleString()}đ</span>
            </div>
          </div>
          <button 
            disabled={cart.length === 0}
            onClick={onCheckout}
            className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 disabled:opacity-50"
          >
            Thanh Toán Ngay
          </button>
        </div>
      </div>
    </div>
  );
};

const AdminPage = () => {
  const [stats, setStats] = useState({ totalSales: 0, orderCount: 0, productCount: 0 });
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('/api/admin/stats').then(res => res.json()).then(setStats);
    fetch('/api/products').then(res => res.json()).then(setProducts);
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-10">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-black tracking-tight">Bảng điều khiển quản trị</h2>
          <p className="text-slate-500 mt-1">Chào mừng quay trở lại. Đây là những gì đang xảy ra hôm nay.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { label: 'Tổng doanh thu', value: `${stats.totalSales.toLocaleString()}đ`, icon: ShoppingBag, color: 'text-blue-600', bg: 'bg-blue-50' },
          { label: 'Đơn hàng mới', value: stats.orderCount, icon: Package, color: 'text-green-600', bg: 'bg-green-50' },
          { label: 'Sản phẩm', value: stats.productCount, icon: Armchair, color: 'text-purple-600', bg: 'bg-purple-50' }
        ].map((s, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm flex items-center gap-6">
            <div className={`p-4 rounded-xl ${s.bg} ${s.color}`}><s.icon size={32} /></div>
            <div>
              <p className="text-slate-500 text-sm font-bold uppercase tracking-widest">{s.label}</p>
              <p className="text-3xl font-black">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="px-8 py-6 border-b border-slate-200 dark:border-slate-700 flex justify-between items-center">
          <h3 className="font-bold text-xl">Danh sách sản phẩm</h3>
          <button className="px-4 py-2 bg-blue-600 text-white rounded-lg font-bold text-sm flex items-center gap-2">
            <PlusCircle size={18} /> Thêm mới
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 text-xs font-bold uppercase tracking-widest">
              <tr>
                <th className="px-8 py-4">Sản phẩm</th>
                <th className="px-8 py-4">Danh mục</th>
                <th className="px-8 py-4">Giá bán</th>
                <th className="px-8 py-4">Tồn kho</th>
                <th className="px-8 py-4 text-right">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {products.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                  <td className="px-8 py-4">
                    <div className="flex items-center gap-4">
                      <img src={p.image} alt={p.name} className="w-10 h-10 rounded-lg object-cover" />
                      <span className="font-bold">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-4 text-sm">{p.category_name}</td>
                  <td className="px-8 py-4 font-bold">{p.price.toLocaleString()}đ</td>
                  <td className="px-8 py-4">{p.stock}</td>
                  <td className="px-8 py-4 text-right">
                    <button className="text-blue-600 hover:underline mr-4">Sửa</button>
                    <button className="text-red-500 hover:underline">Xóa</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---

export default function App() {
  const [activePage, setActivePage] = useState('home');
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    alert('Đã thêm vào giỏ hàng!');
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    setCart(prev => prev.map(item => item.id === id ? { ...item, quantity } : item));
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const handleCheckout = async () => {
    const name = prompt('Nhập tên của bạn:');
    const email = prompt('Nhập email của bạn:');
    if (!name || !email) return;

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0) + 250000;

    const res = await fetch('/api/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customer_name: name,
        customer_email: email,
        items: cart,
        total_amount: total
      })
    });

    if (res.ok) {
      alert('Đặt hàng thành công!');
      setCart([]);
      setActivePage('home');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100">
      <Navbar 
        cartCount={cart.reduce((acc, item) => acc + item.quantity, 0)} 
        onNavigate={setActivePage} 
        activePage={activePage}
      />
      
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            {activePage === 'home' && <HomePage onAddToCart={addToCart} onNavigate={setActivePage} />}
            {activePage === 'shop' && <ShopPage onAddToCart={addToCart} />}
            {activePage === 'cart' && <CartPage cart={cart} onUpdateQuantity={updateQuantity} onRemove={removeFromCart} onCheckout={handleCheckout} />}
            {activePage === 'admin' && <AdminPage />}
            {['about', 'contact'].includes(activePage) && (
              <div className="max-w-7xl mx-auto px-4 py-20 text-center">
                <h2 className="text-4xl font-black mb-4 capitalize">{activePage === 'about' ? 'Về chúng tôi' : 'Liên hệ'}</h2>
                <p className="text-slate-500">Trang này đang được cập nhật...</p>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}
