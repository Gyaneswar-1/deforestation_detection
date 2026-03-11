import { useState } from "react";
import { motion } from "framer-motion";
import { MapPin, ChevronDown, Layers, Globe, SlidersHorizontal, RefreshCw } from "lucide-react";
import { EnvironmentalStats } from "../components/EnvironmentalStats";
import { DeforestationMap, type DeforestationZone } from "../components/DeforestationMap";
import { IncidentModal } from "../components/IncidentModal";
import heroForest from "../assets/hero-forest.png";

const REGIONS = [
  { label: "Amazon Basin", center: [-5.0, -60.0] as [number, number], zoom: 4 },
  { label: "Congo Basin", center: [0.5, 24.0] as [number, number], zoom: 4 },
  { label: "SE Asia / Borneo", center: [1.0, 113.0] as [number, number], zoom: 4 },
  { label: "Global View", center: [0, 0] as [number, number], zoom: 2 },
];

const YEARS = [2020, 2021, 2022, 2023, 2024];

export default function Dashboard() {
  const [selectedRegion, setSelectedRegion] = useState(REGIONS[0]);
  const [leftYear, setLeftYear] = useState(2020);
  const [rightYear, setRightYear] = useState(2024);
  const [selectedIncident, setSelectedIncident] = useState<any>(null);
  const [regionDropdown, setRegionDropdown] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* ── Hero banner with gradient blend ── */}
      <div className="relative overflow-hidden" style={{ height: 260 }}>
        {/* Background image */}
        <img
          src={heroForest}
          alt="Deforestation aerial view"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay + bottom gradient fade into background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(210 20% 7% / 0.45) 0%, hsl(210 20% 7% / 0.6) 40%, hsl(210 20% 7%) 100%)",
          }}
        />
        {/* Header content sitting on top of the image */}
        <div className="relative z-10 flex h-full flex-col justify-end pb-6 pt-20 px-4">
          <div className="container mx-auto flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                <span className="text-xs font-medium text-primary uppercase tracking-widest">Live Monitoring</span>
              </div>
              <h1 className="font-display text-3xl font-extrabold sm:text-4xl">Environmental Dashboard</h1>
              <p className="text-sm text-muted-foreground mt-1">Real-time deforestation &amp; climate monitoring</p>
            </motion.div>

            {/* Region selector */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-wrap items-center gap-3"
            >
              <div className="relative">
                <button
                  onClick={() => setRegionDropdown(!regionDropdown)}
                  className="flex items-center gap-2 rounded-lg border border-border/60 bg-card/70 backdrop-blur-sm px-3 py-2 text-sm hover:bg-card/90 transition-colors"
                >
                  <MapPin className="h-4 w-4 text-primary" />
                  {selectedRegion.label}
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                </button>
                {regionDropdown && (
                  <div className="absolute right-0 top-full mt-1 z-50 w-48 rounded-lg border border-border bg-card shadow-card">
                    {REGIONS.map((r) => (
                      <button
                        key={r.label}
                        onClick={() => { setSelectedRegion(r); setRegionDropdown(false); }}
                        className={`w-full text-left px-3 py-2 text-sm hover:bg-muted/50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                          selectedRegion.label === r.label ? "text-primary font-medium" : "text-foreground"
                        }`}
                      >
                        {r.label}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <button
                onClick={() => setRefreshKey((k) => k + 1)}
                className="rounded-lg border border-border/60 bg-card/70 backdrop-blur-sm p-2 hover:bg-card/90 transition-colors text-muted-foreground"
                title="Refresh"
              >
                <RefreshCw className="h-4 w-4" />
              </button>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Environmental Stats */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <Globe className="h-4 w-4 text-primary" />
            <h2 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Global Environmental Status
            </h2>
          </div>
          <EnvironmentalStats />
        </section>

        {/* Dual Map Comparison */}
        <section id="compare">
          <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4 text-primary" />
              <h2 className="font-display font-semibold text-sm uppercase tracking-wider text-muted-foreground">
                Side-by-Side Year Comparison
              </h2>
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="h-3.5 w-3.5" />
              Click a deforestation zone to inspect incident details
            </div>
          </div>

          {/* Year controls */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            {/* Left year */}
            <div className="rounded-xl border border-border bg-card p-3">
              <p className="text-xs text-muted-foreground mb-2 font-medium">LEFT MAP — Reference Year</p>
              <div className="flex gap-2 flex-wrap">
                {YEARS.map((y) => (
                  <button
                    key={y}
                    onClick={() => setLeftYear(y)}
                    className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                      leftYear === y
                        ? "bg-primary text-primary-foreground shadow-glow"
                        : "bg-muted/40 text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
            {/* Right year */}
            <div className="rounded-xl border border-danger/30 bg-danger/5 p-3">
              <p className="text-xs text-muted-foreground mb-2 font-medium">RIGHT MAP — Comparison Year</p>
              <div className="flex gap-2 flex-wrap">
                {YEARS.map((y) => (
                  <button
                    key={y}
                    onClick={() => setRightYear(y)}
                    className={`rounded-lg px-3 py-1 text-sm font-medium transition-colors ${
                      rightYear === y
                        ? "bg-danger text-primary-foreground shadow-danger"
                        : "bg-muted/40 text-muted-foreground hover:bg-muted/80"
                    }`}
                  >
                    {y}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Maps side by side */}
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <motion.div
              key={`left-${refreshKey}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-[420px] rounded-xl overflow-hidden"
            >
              <DeforestationMap
                center={selectedRegion.center}
                zoom={selectedRegion.zoom}
                year={leftYear}
                onIncidentClick={(zone) => setSelectedIncident(zone)}
                title={`📅 ${leftYear} — Reference`}
              />
            </motion.div>
            <motion.div
              key={`right-${refreshKey}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="h-[420px] rounded-xl overflow-hidden"
            >
              <DeforestationMap
                center={selectedRegion.center}
                zoom={selectedRegion.zoom}
                year={rightYear}
                onIncidentClick={(zone) => setSelectedIncident(zone)}
                title={`🔴 ${rightYear} — Comparison`}
              />
            </motion.div>
          </div>

          {/* Legend */}
          <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="font-medium">Severity:</span>
            {[
              { label: "Critical", color: "#ef4444" },
              { label: "High", color: "#f97316" },
              { label: "Medium", color: "#fbbf24" },
              { label: "Low", color: "#4ade80" },
            ].map((s) => (
              <div key={s.label} className="flex items-center gap-1.5">
                <span className="h-3 w-3 rounded-sm" style={{ background: s.color }} />
                {s.label}
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* Incident Modal */}
      <IncidentModal
        incident={selectedIncident}
        onClose={() => setSelectedIncident(null)}
      />
    </div>
  );
}
