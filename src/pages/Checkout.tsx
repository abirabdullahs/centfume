import React, { useState } from "react";
import { useCartStore } from "@/src/store/useCartStore";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "motion/react";
import { ChevronRight, ChevronLeft, Check, Truck, CreditCard, ShoppingBag, Package } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/src/lib/supabase";

export default function Checkout() {
  const { items, clearCart } = useCartStore();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    address: "",
    city: "Dhaka",
    district: "",
    postalCode: "",
  });

  const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const total = subtotal + (subtotal * 0.15) + (subtotal > 10000 ? 0 : 200);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePlaceOrder = async () => {
    if (!user) {
      toast.error("Please sign in to place an order");
      return;
    }

    setLoading(true);
    try {
      const orderData = {
        user_id: user.id,
        total_price: total,
        status: "pending",
        shipping_address: `${formData.firstName} ${formData.lastName}, ${formData.address}, ${formData.city}, ${formData.district} ${formData.postalCode}`,
        phone: formData.phone,
        payment_method: "cash_on_delivery"
      };

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert(orderData)
        .select()
        .single();

      if (orderError) throw orderError;

      // Add order items
      const orderItems = items.map(item => ({
        order_id: order.id,
        product_id: item.id,
        quantity: item.quantity,
        price: item.price
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      toast.success("Order placed successfully!");
      setStep(4); // Confirmation step
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  if (items.length === 0 && step !== 4) {
    return (
      <div className="pt-40 text-center space-y-8 min-h-screen">
        <h2 className="text-4xl font-serif italic">Your bag is empty</h2>
        <Link to="/shop">
          <Button variant="outline" className="border-white/10 rounded-none uppercase text-[10px] tracking-widest">
            Back to Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1200px] mx-auto min-h-screen">
      {/* Step Indicator */}
      <div className="flex justify-between items-center mb-20 max-w-3xl mx-auto overflow-x-auto pb-4 sm:pb-0">
        {[
          { icon: Truck, label: "Shipping" },
          { icon: ShoppingBag, label: "Review" },
          { icon: CreditCard, label: "Payment" },
          { icon: Check, label: "Finished" }
        ].map((s, idx) => {
          const current = idx + 1;
          const isActive = step >= current;
          const isCurrent = step === current;
          return (
            <div key={idx} className="flex items-center gap-4 group shrink-0">
              <div className={`w-10 h-10 border transition-all flex items-center justify-center ${
                isActive ? "border-white bg-white text-black" : "border-white/10 text-slate-500"
              } ${isCurrent ? "scale-125 shadow-[0_0_20px_rgba(255,255,255,0.2)]" : ""}`}>
                <s.icon className="w-4 h-4" />
              </div>
              <span className={`text-[10px] uppercase tracking-widest font-bold hidden sm:block ${
                isActive ? "text-white" : "text-slate-600"
              }`}>{s.label}</span>
              {idx < 3 && <div className="w-12 h-[1px] bg-white/5 mx-2" />}
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-12 gap-24">
        {/* Main Form Area */}
        <div className="lg:col-span-12">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div 
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-3xl mx-auto space-y-12"
              >
                <div className="space-y-4">
                  <h2 className="text-4xl font-serif">Delivery <span className="italic">Details</span></h2>
                  <p className="text-slate-400 font-light text-sm">Where should we deliver your fragrance?</p>
                </div>

                <div className="grid sm:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">First Name</label>
                    <Input name="firstName" value={formData.firstName} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-none h-14" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Last Name</label>
                    <Input name="lastName" value={formData.lastName} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-none h-14" required />
                  </div>
                  <div className="space-y-2 sm:col-span-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Delivery Address</label>
                    <Input name="address" value={formData.address} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-none h-14" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">Phone Number</label>
                    <Input name="phone" value={formData.phone} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-none h-14" placeholder="+880" required />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] uppercase tracking-widest text-slate-500 font-bold ml-1">City</label>
                    <Input name="city" value={formData.city} onChange={handleInputChange} className="bg-white/5 border-white/10 rounded-none h-14" required />
                  </div>
                </div>

                <div className="pt-12 flex justify-between">
                   <Link to="/cart">
                      <Button variant="ghost" className="text-slate-500 uppercase text-[10px] tracking-widest font-bold">
                        Back to Bag
                      </Button>
                   </Link>
                  <Button 
                    onClick={() => setStep(2)}
                    className="h-14 px-12 bg-white text-black hover:bg-slate-200 rounded-none uppercase text-[10px] tracking-[0.3em] font-bold"
                  >
                    Continue to Review <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div 
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-3xl mx-auto space-y-12"
              >
                <div className="space-y-4">
                  <h2 className="text-4xl font-serif italic">Order Review</h2>
                  <p className="text-slate-400 font-light text-sm">Please verify your selection and details.</p>
                </div>

                <div className="space-y-6">
                   {items.map(item => (
                     <div key={item.id} className="flex justify-between items-center py-6 border-b border-white/5">
                        <div className="flex gap-6 items-center">
                           <div className="w-16 h-20 bg-zinc-900 border border-white/5">
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                           </div>
                           <div>
                              <p className="font-serif text-lg">{item.name}</p>
                              <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold">Qty: {item.quantity}</p>
                           </div>
                        </div>
                        <p className="text-lg font-light">৳{(item.price * item.quantity).toLocaleString()}</p>
                     </div>
                   ))}
                </div>

                <div className="bg-white/5 p-8 rounded-none space-y-4">
                    <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Shipping To:</p>
                    <p className="text-slate-300 font-light">{formData.address}, {formData.city}</p>
                    <p className="text-slate-300 font-light">Phone: {formData.phone}</p>
                </div>

                <div className="pt-12 flex justify-between">
                  <Button variant="ghost" onClick={() => setStep(1)} className="text-slate-500 uppercase text-[10px] tracking-widest font-bold">
                    Edit Shipping
                  </Button>
                  <Button 
                    onClick={() => setStep(3)}
                    className="h-14 px-12 bg-white text-black hover:bg-slate-200 rounded-none uppercase text-[10px] tracking-[0.3em] font-bold"
                  >
                    Select Payment <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </motion.div>
            )}

             {step === 3 && (
              <motion.div 
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="max-w-3xl mx-auto space-y-12"
              >
                <div className="space-y-4">
                  <h2 className="text-4xl font-serif">Payment <span className="italic">Method</span></h2>
                  <p className="text-slate-400 font-light text-sm">We currently only support secure Cash on Delivery.</p>
                </div>

                <div className="border border-white p-8 bg-white/5 flex items-center justify-between group cursor-pointer">
                   <div className="flex items-center gap-6">
                      <div className="w-12 h-12 bg-white text-black flex items-center justify-center rounded-none">
                         <CreditCard className="w-6 h-6" />
                      </div>
                      <div>
                         <p className="font-serif text-xl">Cash on Delivery</p>
                         <p className="text-[9px] uppercase tracking-widest text-slate-500 font-bold mt-1">Pay when your fragrance arrives</p>
                      </div>
                   </div>
                   <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center p-1">
                      <div className="w-full h-full bg-white rounded-full" />
                   </div>
                </div>

                <div className="bg-zinc-950 p-10 space-y-6">
                   <div className="flex justify-between text-slate-400 text-sm">
                      <span>Order Total</span>
                      <span>৳{total.toLocaleString()}</span>
                   </div>
                   <p className="text-[9px] uppercase tracking-widest text-slate-600 border-t border-white/5 pt-6 leading-relaxed">
                      By placing your order, you agree to Centfume's Terms of Service and Privacy Policy. All our fragrances are shipped with tamper-evident seals.
                   </p>
                </div>

                <div className="pt-12 flex justify-between gap-4">
                  <Button variant="ghost" onClick={() => setStep(2)} className="text-slate-500 uppercase text-[10px] tracking-widest font-bold">
                    Previous Step
                  </Button>
                  <Button 
                    onClick={handlePlaceOrder}
                    disabled={loading}
                    className="h-16 flex-1 bg-white text-black hover:bg-slate-200 rounded-none uppercase text-[11px] tracking-[0.4em] font-bold"
                  >
                    {loading ? "Confirming..." : "Confirm & Place Order"}
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 4 && (
               <motion.div 
               key="step4"
               initial={{ opacity: 0, scale: 0.95 }}
               animate={{ opacity: 1, scale: 1 }}
               className="max-w-2xl mx-auto text-center space-y-12 py-20"
             >
               <div className="w-24 h-24 bg-white text-black rounded-full flex items-center justify-center mx-auto mb-10 shadow-[0_0_50px_rgba(255,255,255,0.3)]">
                 <Package className="w-10 h-10" />
               </div>
               <div className="space-y-6">
                  <span className="text-[10px] uppercase tracking-[0.4em] text-brand-gold font-bold">Gratitude</span>
                  <h2 className="text-6xl font-serif font-light">Order <br /><span className="italic">Confirmed</span></h2>
                  <p className="text-slate-400 font-light text-lg max-w-sm mx-auto leading-relaxed">
                    Thank you for choosing Centfume. Your signature essence is being prepared for its journey.
                  </p>
               </div>

               <div className="space-y-6 pt-12">
                  <Link to="/orders">
                    <Button className="w-full h-16 bg-white text-black hover:bg-slate-200 rounded-none uppercase text-[11px] tracking-[0.3em] font-bold">
                      Track Order
                    </Button>
                  </Link>
                   <Link to="/shop">
                    <Button variant="ghost" className="w-full text-slate-500 uppercase text-[10px] tracking-widest font-bold mt-4">
                      Continue Shopping
                    </Button>
                  </Link>
               </div>
             </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
