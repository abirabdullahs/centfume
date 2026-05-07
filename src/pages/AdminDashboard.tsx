import { 
  TrendingUp, 
  Users, 
  ShoppingBag, 
  DollarSign, 
  Package,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  MoreVertical
} from "lucide-react";
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

const data = [
  { name: "Mon", sales: 4000, revenue: 2400 },
  { name: "Tue", sales: 3000, revenue: 1398 },
  { name: "Wed", sales: 2000, revenue: 9800 },
  { name: "Thu", sales: 2780, revenue: 3908 },
  { name: "Fri", sales: 1890, revenue: 4800 },
  { name: "Sat", sales: 2390, revenue: 3800 },
  { name: "Sun", sales: 3490, revenue: 4300 },
];

const categoryData = [
  { name: "Floral", value: 400 },
  { name: "Woody", value: 300 },
  { name: "Fresh", value: 300 },
  { name: "Oriental", value: 200 },
];

const COLORS = ["#FFFFFF", "#94a3b8", "#475569", "#1e293b"];

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <span className="text-slate-500 uppercase tracking-[0.4em] text-[10px] font-bold">Pulse</span>
          <h1 className="text-4xl font-serif">Executive <span className="italic text-slate-400">Overview</span></h1>
        </div>
        <div className="flex items-center gap-4 text-[10px] uppercase tracking-widest font-bold text-slate-500">
          <Clock className="w-4 h-4" />
          Last updated: Today, 12:45 PM
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { label: "Total Revenue", value: "৳4.2M", trend: "+12.5%", icon: DollarSign, positive: true },
          { label: "Total Orders", value: "1,248", trend: "+8.2%", icon: ShoppingBag, positive: true },
          { label: "Active Customers", value: "892", trend: "-2.4%", icon: Users, positive: false },
          { label: "Products Sold", value: "3,412", trend: "+15.1%", icon: Package, positive: true },
        ].map((stat, i) => (
          <div key={i} className="p-8 bg-zinc-950 border border-white/5 space-y-6 hover:border-white/10 transition-all group">
            <div className="flex justify-between items-start">
              <div className="p-3 bg-white/5 border border-white/5 group-hover:bg-white group-hover:text-black transition-all">
                <stat.icon className="w-5 h-5" />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-bold ${stat.positive ? "text-emerald-400" : "text-rose-400"}`}>
                {stat.positive ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                {stat.trend}
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-bold">{stat.label}</p>
              <h3 className="text-3xl font-serif">{stat.value}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-8 bg-zinc-950 border border-white/5 space-y-8">
          <div className="flex justify-between items-center">
            <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">Revenue Growth</h3>
            <select className="bg-transparent border-none text-[10px] uppercase tracking-widest font-bold text-slate-500 focus:ring-0 cursor-pointer">
              <option>Last 7 Days</option>
              <option>Last 30 Days</option>
            </select>
          </div>
          <div className="h-[350px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#FFFFFF" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#FFFFFF" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#27272a" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#52525b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                />
                <YAxis 
                  stroke="#52525b" 
                  fontSize={10} 
                  tickLine={false} 
                  axisLine={false} 
                  tickFormatter={(value) => `৳${value/1000}k`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#09090b", border: "1px solid rgba(255,255,255,0.05)", fontSize: "10px" }}
                  itemStyle={{ textTransform: "uppercase", letterSpacing: "1px" }}
                />
                <Area type="monotone" dataKey="revenue" stroke="#FFFFFF" fillOpacity={1} fill="url(#colorRev)" strokeWidth={2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="p-8 bg-zinc-950 border border-white/5 space-y-8">
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">Category Distribution</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: "#09090b", border: "1px solid rgba(255,255,255,0.05)", fontSize: "10px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {categoryData.map((entry, index) => (
              <div key={entry.name} className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: COLORS[index] }} />
                <span className="text-[10px] uppercase tracking-widest text-slate-400">{entry.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="p-8 bg-zinc-950 border border-white/5 space-y-8">
        <div className="flex justify-between items-center">
          <h3 className="text-[10px] uppercase tracking-[0.3em] font-bold">Recent Transactions</h3>
          <button className="text-[10px] uppercase tracking-widest font-bold text-slate-500 hover:text-white transition-colors">View All Archive</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-white/5 text-slate-500 text-[10px] uppercase tracking-[0.2em] font-bold">
                <th className="pb-6 px-4">Order ID</th>
                <th className="pb-6 px-4">Customer</th>
                <th className="pb-6 px-4">Date</th>
                <th className="pb-6 px-4">Status</th>
                <th className="pb-6 px-4">Amount</th>
                <th className="pb-6 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {[
                { id: "#ORD-9012", customer: "Sophia Reynolds", date: "Oct 24, 2023", status: "Delivered", amount: "৳12,400" },
                { id: "#ORD-9011", customer: "James Lawson", date: "Oct 24, 2023", status: "Processing", amount: "৳8,200" },
                { id: "#ORD-9010", customer: "Elena Vance", date: "Oct 23, 2023", status: "Shipped", amount: "৳4,500" },
                { id: "#ORD-9009", customer: "Marcus Thorne", date: "Oct 23, 2023", status: "Cancelled", amount: "৳2,100" },
                { id: "#ORD-9008", customer: "Isabella Gray", date: "Oct 22, 2023", status: "Delivered", amount: "৳15,600" },
              ].map((order, i) => (
                <tr key={i} className="group hover:bg-white/5 transition-colors">
                  <td className="py-6 px-4 font-mono text-[10px]">{order.id}</td>
                  <td className="py-6 px-4">
                    <p className="text-[11px] font-bold uppercase tracking-widest">{order.customer}</p>
                  </td>
                  <td className="py-6 px-4 text-[10px] text-slate-500">{order.date}</td>
                  <td className="py-6 px-4">
                    <span className={`text-[9px] uppercase tracking-widest font-bold px-2 py-1 border ${
                      order.status === 'Delivered' ? 'border-emerald-400/20 text-emerald-400 bg-emerald-400/5' :
                      order.status === 'Processing' ? 'border-brand-gold/20 text-brand-gold bg-brand-gold/5' :
                      order.status === 'Shipped' ? 'border-blue-400/20 text-blue-400 bg-blue-400/5' :
                      'border-rose-400/20 text-rose-400 bg-rose-400/5'
                    }`}>
                      {order.status}
                    </span>
                  </td>
                  <td className="py-6 px-4 font-mono text-[11px] font-bold">{order.amount}</td>
                  <td className="py-6 px-4 text-right">
                    <button className="p-2 text-slate-500 hover:text-white transition-colors">
                      <MoreVertical className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
