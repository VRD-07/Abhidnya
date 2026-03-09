import { useState, useEffect } from "react";
import { projects } from "@/data/projects";
import { Eye, AlertTriangle, CheckCircle } from "lucide-react";
import { toast } from "sonner";

const MapView = () => {
  const [selectedProject, setSelectedProject] = useState(projects[0].id);
  const [simulated, setSimulated] = useState(false);
  const [reportMode, setReportMode] = useState(false);
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [confirmSubmitted, setConfirmSubmitted] = useState(false);
  const [hoveredMarker, setHoveredMarker] = useState<number | null>(null);

  const selected = projects.find((p) => p.id === selectedProject)!;
  const isHospital = selected.id === 2;

  const handleSimulate = () => {
    setSimulated(true);
    setReportMode(false);
    setReportSubmitted(false);
    setConfirmSubmitted(false);
  };

  const handleReport = () => {
    setReportMode(true);
  };

  const handleSubmitReport = () => {
    setReportSubmitted(true);
    setReportMode(false);
    const current = parseInt(localStorage.getItem("abhidnya_complaints") || "3");
    localStorage.setItem("abhidnya_complaints", String(current + 1));
    toast.error(
      `Admin Dashboard updated — Open Complaints: ${current + 1} ↑`,
      { duration: 4000 }
    );
  };

  const handleConfirm = () => {
    setConfirmSubmitted(true);
    toast.success("Verification recorded — Verification Rate updated", {
      duration: 3000,
    });
  };

  useEffect(() => {
    setSimulated(false);
    setReportMode(false);
    setReportSubmitted(false);
    setConfirmSubmitted(false);
  }, [selectedProject]);

  const markerPositions = [
    { id: 1, x: 25, y: 55 },
    { id: 2, x: 40, y: 35 },
    { id: 3, x: 60, y: 25 },
    { id: 4, x: 55, y: 50 },
    { id: 5, x: 35, y: 70 },
  ];

  const getMarkerColor = (coverage: number) => {
    if (coverage >= 80) return "#2ECC71";
    if (coverage >= 40) return "#E47F42";
    return "#E74C3C";
  };

  return (
    <div className="min-h-screen pt-16">
      {/* Map Section */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
        {/* Sidebar */}
        <div className="w-full lg:w-[30%] bg-card border-r border-border overflow-y-auto p-4">
          <h2 className="text-lg font-bold mb-4">Active Projects — Delhi</h2>
          <div className="space-y-3">
            {projects.map((p) => (
              <div
                key={p.id}
                className="bg-secondary rounded-lg p-4 card-lift border border-border cursor-pointer"
                onClick={() => setSelectedProject(p.id)}
              >
                <h3 className="font-semibold text-sm">
                  {p.name} — {p.ward}
                </h3>
                <p className="text-muted text-xs mt-1">Scheme: {p.scheme}</p>
                <p className="text-muted text-xs">Cost: {p.cost}</p>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-success/20 text-success font-medium">
                    {p.status}
                  </span>
                  <button className="text-xs text-primary flex items-center gap-1 hover:underline">
                    <Eye size={12} /> View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative bg-background">
          <div className="w-full h-full relative overflow-hidden">
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=76.8%2C28.4%2C77.4%2C28.8&layer=mapnik"
              className="w-full h-full border-0 opacity-30"
              title="Delhi Map"
            />
            {/* Overlay markers */}
            <div className="absolute inset-0 pointer-events-none">
              {markerPositions.map((m) => {
                const proj = projects.find((p) => p.id === m.id)!;
                return (
                  <div
                    key={m.id}
                    className="absolute pointer-events-auto cursor-pointer"
                    style={{ left: `${m.x}%`, top: `${m.y}%`, transform: "translate(-50%, -50%)" }}
                    onMouseEnter={() => setHoveredMarker(m.id)}
                    onMouseLeave={() => setHoveredMarker(null)}
                  >
                    <div
                      className="w-10 h-10 rounded-full opacity-60 animate-pulse"
                      style={{ backgroundColor: getMarkerColor(proj.coverage) }}
                    />
                    {hoveredMarker === m.id && proj.coverage < 40 && (
                      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-64 bg-card border border-border rounded-lg p-3 shadow-xl z-10">
                        <p className="text-xs font-semibold flex items-center gap-1 text-destructive">
                          <AlertTriangle size={14} /> Low Coverage Zone
                        </p>
                        <p className="text-xs text-muted mt-1">
                          Work completed here but only {proj.coverage}% of nearby citizens were notified. Consider SMS outreach.
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Legend */}
          <div className="absolute bottom-4 left-4 bg-card/90 backdrop-blur border border-border rounded-lg p-3 flex gap-4 text-xs">
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-success inline-block" /> High (80%+)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-primary inline-block" /> Medium (40–80%)</span>
            <span className="flex items-center gap-1"><span className="w-3 h-3 rounded-full bg-destructive inline-block" /> Low (&lt;40%)</span>
          </div>
        </div>
      </div>

      {/* Notification Simulator */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl font-bold mb-8">Citizen Notification Simulator</h2>

          <div className="bg-card rounded-xl p-6 border border-border mb-8">
            <label className="block text-sm text-muted mb-2 text-left">Simulate citizen walking near:</label>
            <select
              value={selectedProject}
              onChange={(e) => setSelectedProject(Number(e.target.value))}
              className="w-full bg-secondary text-foreground rounded-lg px-4 py-3 text-sm border border-border mb-4"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.ward}
                </option>
              ))}
            </select>
            <button
              onClick={handleSimulate}
              className="w-full bg-primary text-primary-foreground font-semibold py-3 rounded-lg card-lift hover:brightness-110 transition-all"
            >
              Simulate Walking Near This Project
            </button>
          </div>

          {/* Phone Mockup */}
          <div className="mx-auto w-72">
            <div className="bg-secondary rounded-[2rem] p-3 border-2 border-border shadow-2xl">
              {/* Phone notch */}
              <div className="w-20 h-1.5 bg-border rounded-full mx-auto mb-3" />

              <div className="bg-background rounded-2xl min-h-[480px] p-4 flex flex-col">
                {!simulated ? (
                  <div className="flex-1 flex items-center justify-center">
                    <p className="text-muted text-sm">Select a project and click simulate</p>
                  </div>
                ) : (
                  <div className="flex-1 flex flex-col slide-down">
                    {/* Notification */}
                    <div
                      className={`rounded-lg p-3 mb-4 border ${
                        isHospital
                          ? "bg-accent/10 border-accent"
                          : "bg-primary/10 border-primary"
                      }`}
                    >
                      <p className="text-xs font-semibold mb-1">
                        {isHospital ? "🏥" : "🔔"} Abhidnya Alert
                      </p>
                      <p className="text-xs text-muted leading-relaxed">
                        {isHospital
                          ? `A government hospital opened 400m from your location. As an Ayushman Bharat beneficiary, you are entitled to free OPD and emergency care here. Tap to see services →`
                          : `A ${selected.name.toLowerCase()} was completed 200m from your location. ${selected.scheme} · ${selected.cost} · March 2026. Tap to view proof →`}
                      </p>
                    </div>

                    {!reportMode && !reportSubmitted && !confirmSubmitted && (
                      <>
                        {/* Before/After */}
                        <div className="flex gap-2 mb-4">
                          <div className="flex-1 bg-secondary rounded-lg h-24 flex items-center justify-center border border-border opacity-60">
                            <span className="text-xs text-muted font-medium">BEFORE</span>
                          </div>
                          <div className="w-px bg-border" />
                          <div className="flex-1 bg-secondary rounded-lg h-24 flex items-center justify-center border border-border opacity-80">
                            <span className="text-xs text-muted font-medium">AFTER</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2">
                          <button
                            onClick={handleConfirm}
                            className="flex-1 bg-success/20 text-success text-xs font-semibold py-2.5 rounded-lg hover:bg-success/30 transition-colors"
                          >
                            ✓ Confirm — Work is Done
                          </button>
                          <button
                            onClick={handleReport}
                            className="flex-1 bg-destructive/20 text-destructive text-xs font-semibold py-2.5 rounded-lg hover:bg-destructive/30 transition-colors"
                          >
                            ⚠ Report Issue
                          </button>
                        </div>
                      </>
                    )}

                    {reportMode && (
                      <div className="fade-in space-y-3">
                        <textarea
                          placeholder="Describe the issue (e.g. work incomplete, already broken)..."
                          className="w-full bg-secondary text-foreground text-xs rounded-lg p-3 border border-border resize-none"
                          rows={3}
                        />
                        <button className="w-full bg-secondary text-muted text-xs py-2 rounded-lg border border-border">
                          📷 Upload Photo
                        </button>
                        <button
                          onClick={handleSubmitReport}
                          className="w-full bg-destructive text-destructive-foreground text-xs font-semibold py-2.5 rounded-lg"
                        >
                          Submit Report
                        </button>
                      </div>
                    )}

                    {reportSubmitted && (
                      <div className="fade-in flex items-center gap-2 bg-success/10 rounded-lg p-3 mt-2">
                        <CheckCircle size={16} className="text-success" />
                        <p className="text-xs text-success">Your report has been logged. MCD will respond within 48 hours.</p>
                      </div>
                    )}

                    {confirmSubmitted && (
                      <div className="fade-in flex items-center gap-2 bg-success/10 rounded-lg p-3 mt-2">
                        <CheckCircle size={16} className="text-success" />
                        <p className="text-xs text-success">Thank you! Your verification has been recorded.</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>

            {/* Label below phone */}
            {simulated && (
              <div className="mt-4 fade-in">
                {isHospital ? (
                  <p className="text-xs text-accent font-medium">✦ Personalized because: Ayushman Bharat beneficiary detected</p>
                ) : (
                  <p className="text-xs text-muted">Standard citizen notification</p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default MapView;
