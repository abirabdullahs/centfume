/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import Orders from "./pages/Orders";
import { Toaster } from "@/components/ui/sonner";

// Admin Pages
import AdminLayout from "./components/AdminLayout";
import AdminDashboard from "./pages/AdminDashboard";
import AdminProducts from "./pages/AdminProducts";
import AdminOrders from "./pages/AdminOrders";
import AdminCategories from "./pages/AdminCategories";
import AdminCustomers from "./pages/AdminCustomers";
import AdminSettings from "./pages/AdminSettings";
import AdminProductForm from "./pages/AdminProductForm";
import AdminOrderDetail from "./pages/AdminOrderDetail";
import AdminLogin from "./pages/AdminLogin";
import AdminGuard from "./components/AdminGuard";

export default function App() {
  return (
    <Router>
      <div className="bg-brand-black min-h-screen text-white overflow-x-hidden flex flex-col">
        <Routes>
          {/* Main Site Routes */}
          <Route path="/*" element={
            <>
              <Navbar />
              <main className="flex-1">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/shop" element={<Shop />} />
                  <Route path="/product/:id" element={<ProductDetail />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/profile" element={<Profile />} />
                  <Route path="/orders" element={<Orders />} />
                </Routes>
              </main>
              <Footer />
            </>
          } />

          {/* Admin Login - Unprotected */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* Admin Routes - Protected */}
          <Route path="/admin/*" element={
            <AdminGuard>
              <AdminLayout>
                <Routes>
                  <Route path="/dashboard" element={<AdminDashboard />} />
                  <Route path="/products" element={<AdminProducts />} />
                  <Route path="/products/add" element={<AdminProductForm />} />
                  <Route path="/products/edit/:id" element={<AdminProductForm />} />
                  <Route path="/orders" element={<AdminOrders />} />
                  <Route path="/orders/:id" element={<AdminOrderDetail />} />
                  <Route path="/categories" element={<AdminCategories />} />
                  <Route path="/customers" element={<AdminCustomers />} />
                  <Route path="/settings" element={<AdminSettings />} />
                </Routes>
              </AdminLayout>
            </AdminGuard>
          } />
        </Routes>
        <Toaster theme="dark" position="bottom-right" />
      </div>
    </Router>
  );
}
