import { useState } from "react";
import { projects } from "@/data/projects";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from "recharts";
import {
  LayoutDashboard, PlusCircle, List, CircleDot,
  Building2, Users, CheckCircle, AlertTriangle, Pencil, Trash2,
} from "lucide-react";
import { toast } from "sonner";

const wardData = [
  { name: "Dwarka", value: 85 },
  { name: "Janakpuri", value: 60 },
  { name: "Rohini", value: 22 },
  { name: "Karol Bagh", value: 80 },
  { name: "Saket", value: 55 },
  { name: "Lajpat Nagar", value: 48 },
];

const pieData = [
  { name: "High Coverage", value: 45, color: "#2ECC71" },
  { name: "Medium Coverage", value: 35, color: "#E47F42" },
  { name: "Low Coverage", value: 20, color: "#E74C3C" },
];

const schemeData = [
  { name: "Smart Cities Mission", value: 78 },
  { name: "PMGSY", value: 45 },
  { name: "MGNREGA", value: 23 },
  { name: "MCD Budget", value: 61 },
  { name: "PM Awas Yojana", value: 19 },
];

const officers = [
  { name: "Raj Kumar", ward: "Dwarka 12", projects: 4, rate: 82, status: "On Track", color: "green" },
  { name: "Priya Sharma", ward: "Janakpuri 9", projects: 2, rate: 91, status: "On Track", color: "green" },
  { name: "Anil Verma", ward: "Rohini 7", projects: 1, rate: 34, status: "Needs Review", color: "red" },
  { name: "Suneel Das", ward: "Karol Bagh 5", projects: 3, rate: 67, status: "Average", color: "yellow" },
];

const wards = ["Dwarka Ward 12", "Janakpuri Sector 9", "Rohini Gali 7", "Karol Bagh Ward 5", "Saket Ward 3", "Lajpat Nagar Ward 8"];
const schemes = ["Smart Cities Mission", "PMGSY", "MGNREGA", "MCD Budget", "PM Awas Yojana"];

const AdminPanel = () => {
  const [tab, setTab] = useState<"dashboard" | "add" | "list">("dashboard");
  const [geoRadius, setGeoRadius] = useState(300);

  const complaints = parseInt(localStorage.getItem("abhidnya_complaints") || "3");

  const stats = [
    { label: "Total Projects", value: "5", icon: Building2, accent: false },
    { label: "Citizens Notified", value: "1,240", icon: Users, accent: false },
    { label: "Verification Rate", value: "78%", icon: CheckCircle, accent: false },
    { label: "Open Complaints", value: String(complaints), icon: AlertTriangle, accent: true },
  ];

  const tabs = [
    { key: "dashboard" as const, label: "Dashboard", icon: LayoutDashboard },
    { key: "add" as const, label: "Add Project", icon: PlusCircle },
    { key: "list" as const, label: "Projects List", icon: List },
  ];

  const handleSubmitProject = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`✓ Project published. Geo-fence activated at ${geoRadius}m radius. Citizens in range will be notified automatically.`);
    (e.target as HTMLFormElement).reset();
    setGeoRadius(300);
  };

  const barColor = (val: number) => (val < 40 ? "#E74C3C" : "#E47F42");
  const schemeBarColor = (val: number) => (val < 25 ? "#E74C3C" : "#E47F42");

  return (
    <div className="min-h-screen pt-16 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-[20%] min-w-[200px] bg-card border-r border-border flex-col p-4">
        <div className="flex items-center gap-1 text-lg font-bold mb-8">
          <span className="text-primary">●</span> Abhidnya
        </div>
        <nav className="flex-1 space-y-1">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`w-full flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                tab === t.key ? "bg-primary/20 text-primary" : "text-muted hover:text-foreground hover:bg-secondary"
              }`}
            >
              <t.icon size={16} /> {t.label}
            </button>
          ))}
        </nav>
        <div className="flex items-center gap-2 text-xs text-muted pt-4 border-t border-border">
          <CircleDot size={10} className="text-success" /> Field Officer
        </div>
      </aside>

      {/* Mobile tabs */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border flex">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex-1 py-3 text-xs font-medium ${tab === t.key ? "text-primary" : "text-muted"}`}
          >
            <t.icon size={16} className="mx-auto mb-1" />
            {t.label}
          </button>
        ))}
      </div>

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto pb-20 lg:pb-8">
        {tab === "dashboard" && (
          <div className="space-y-8 fade-in">
            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className={`rounded-xl p-5 border border-border card-lift ${
                    s.accent ? "bg-destructive/10" : "bg-card"
                  }`}
                >
                  <div className="flex items-center gap-2 text-muted text-xs mb-2">
                    <s.icon size={14} /> {s.label}
                  </div>
                  <p className="text-2xl font-bold">{s.value}</p>
                </div>
              ))}
            </div>

            {/* Charts Row 1 */}
            <div className="grid lg:grid-cols-2 gap-6">
              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold mb-4">Ward-wise Notification Coverage</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={wardData}>
                    <XAxis dataKey="name" tick={{ fill: "#A0B4C8", fontSize: 11 }} />
                    <YAxis tick={{ fill: "#A0B4C8", fontSize: 11 }} />
                    <Tooltip contentStyle={{ background: "#1A2F45", border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                    <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                      {wardData.map((entry, i) => (
                        <Cell key={i} fill={barColor(entry.value)} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-card rounded-xl p-6 border border-border">
                <h3 className="text-sm font-semibold mb-4">Overall Coverage Status — 272 Wards</h3>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie data={pieData} cx="50%" cy="50%" innerRadius={60} outerRadius={90} dataKey="value" paddingAngle={3}>
                      {pieData.map((entry, i) => (
                        <Cell key={i} fill={entry.color} />
                      ))}
                    </Pie>
                    <Legend
                      formatter={(value) => <span style={{ color: "#A0B4C8", fontSize: 12 }}>{value}</span>}
                    />
                    <Tooltip contentStyle={{ background: "#1A2F45", border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Scheme Chart */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="text-sm font-semibold mb-4">Scheme-wise Citizen Awareness Rate</h3>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={schemeData} layout="vertical">
                  <XAxis type="number" tick={{ fill: "#A0B4C8", fontSize: 11 }} />
                  <YAxis type="category" dataKey="name" width={150} tick={{ fill: "#A0B4C8", fontSize: 11 }} />
                  <Tooltip contentStyle={{ background: "#1A2F45", border: "none", borderRadius: 8, color: "#fff", fontSize: 12 }} />
                  <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                    {schemeData.map((entry, i) => (
                      <Cell key={i} fill={schemeBarColor(entry.value)} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Officer Table */}
            <div className="bg-card rounded-xl p-6 border border-border overflow-x-auto">
              <h3 className="text-sm font-semibold mb-4">Officer Performance — This Month</h3>
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-muted text-xs border-b border-border">
                    <th className="text-left py-3">Officer Name</th>
                    <th className="text-left py-3">Ward</th>
                    <th className="text-left py-3">Projects</th>
                    <th className="text-left py-3">Avg. Verification</th>
                    <th className="text-left py-3">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {officers.map((o) => (
                    <tr
                      key={o.name}
                      className={`border-b border-border ${o.color === "red" ? "bg-destructive/5" : ""}`}
                    >
                      <td className="py-3 font-medium">{o.name}</td>
                      <td className="py-3 text-muted">{o.ward}</td>
                      <td className="py-3">{o.projects}</td>
                      <td className="py-3">{o.rate}%</td>
                      <td className="py-3">
                        <span className={`text-xs font-medium ${
                          o.color === "green" ? "text-success" : o.color === "red" ? "text-destructive" : "text-primary"
                        }`}>
                          {o.color === "green" ? "🟢" : o.color === "red" ? "🔴" : "🟡"} {o.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Recent Projects */}
            <div className="bg-card rounded-xl p-6 border border-border overflow-x-auto">
              <h3 className="text-sm font-semibold mb-4">Recent Projects</h3>
              <ProjectsTable />
            </div>
          </div>
        )}

        {tab === "add" && (
          <div className="max-w-2xl fade-in">
            <h2 className="text-xl font-bold mb-6">Add New Project</h2>
            <form onSubmit={handleSubmitProject} className="space-y-5">
              <div>
                <label className="text-sm text-muted block mb-1">Project Name</label>
                <input required className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm border border-border" placeholder="Enter project name" />
              </div>
              <div>
                <label className="text-sm text-muted block mb-1">Ward / Location</label>
                <select required className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm border border-border">
                  <option value="">Select ward</option>
                  {wards.map((w) => <option key={w} value={w}>{w}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-muted block mb-1">Government Scheme</label>
                <select required className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm border border-border">
                  <option value="">Select scheme</option>
                  {schemes.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div>
                <label className="text-sm text-muted block mb-1">Total Cost</label>
                <div className="flex items-center gap-2">
                  <span className="text-muted text-sm">₹</span>
                  <input required type="number" className="flex-1 bg-secondary text-foreground rounded-lg px-4 py-3 text-sm border border-border" placeholder="Amount" />
                  <span className="text-muted text-sm">Lakhs</span>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted block mb-1">Geo-fence Radius: {geoRadius}m</label>
                <input
                  type="range"
                  min={100}
                  max={1000}
                  value={geoRadius}
                  onChange={(e) => setGeoRadius(Number(e.target.value))}
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-muted">
                  <span>100m</span>
                  <span>1000m</span>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-muted block mb-1">Before Photo</label>
                  <input type="file" accept="image/*" className="w-full text-xs text-muted" />
                  <div className="mt-2 bg-secondary rounded-lg h-24 flex items-center justify-center border border-border text-xs text-muted">BEFORE</div>
                </div>
                <div>
                  <label className="text-sm text-muted block mb-1">After Photo</label>
                  <input type="file" accept="image/*" className="w-full text-xs text-muted" />
                  <div className="mt-2 bg-secondary rounded-lg h-24 flex items-center justify-center border border-border text-xs text-muted">AFTER</div>
                </div>
              </div>
              <div>
                <label className="text-sm text-muted block mb-1">Description</label>
                <textarea rows={3} className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm border border-border resize-none" placeholder="Project description..." />
              </div>
              <button type="submit" className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg card-lift hover:brightness-110 transition-all">
                Publish Project & Activate Geo-fence
              </button>
            </form>
          </div>
        )}

        {tab === "list" && (
          <div className="fade-in">
            <h2 className="text-xl font-bold mb-6">All Projects</h2>
            <div className="bg-card rounded-xl p-6 border border-border overflow-x-auto">
              <ProjectsTable showActions />
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

const ProjectsTable = ({ showActions = false }: { showActions?: boolean }) => (
  <table className="w-full text-sm">
    <thead>
      <tr className="text-muted text-xs border-b border-border">
        <th className="text-left py-3">Project Name</th>
        <th className="text-left py-3">Ward</th>
        <th className="text-left py-3">Scheme</th>
        <th className="text-left py-3">Cost</th>
        <th className="text-left py-3">Status</th>
        {showActions && <th className="text-left py-3">Actions</th>}
      </tr>
    </thead>
    <tbody>
      {projects.map((p) => (
        <tr key={p.id} className="border-b border-border">
          <td className="py-3 font-medium">{p.name}</td>
          <td className="py-3 text-muted">{p.ward}</td>
          <td className="py-3 text-muted">{p.scheme}</td>
          <td className="py-3">{p.cost}</td>
          <td className="py-3">
            <span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success font-medium">{p.status}</span>
          </td>
          {showActions && (
            <td className="py-3 flex gap-2">
              <button className="text-xs text-primary hover:underline flex items-center gap-1"><Pencil size={12} /> Edit</button>
              <button className="text-xs text-destructive hover:underline flex items-center gap-1"><Trash2 size={12} /> Delete</button>
            </td>
          )}
        </tr>
      ))}
    </tbody>
  </table>
);

export default AdminPanel;
