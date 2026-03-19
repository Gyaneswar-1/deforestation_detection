import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import { ArrowRight, Satellite, Globe, TreePine, AlertTriangle, TrendingDown, Shield } from "lucide-react";
import { Button } from "../components/ui/button";
import heroForest from "../assets/hero-forest.png";
import EarthGlobe from "../components/EarthGlobe";

const features = [
  {
    icon: Satellite,
    title: "Real-Time Satellite Monitoring",
    desc: "Track deforestation as it happens with high-resolution satellite imagery updated daily.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: TrendingDown,
    title: "NDVI Vegetation Analysis",
    desc: "Quantify forest health changes over time with Normalized Difference Vegetation Index tracking.",
    color: "text-ice",
    bg: "bg-ice/10",
  },
  {
    icon: Globe,
    title: "Global & Local Views",
    desc: "Zoom from world-level trends down to individual clearings with side-by-side year comparisons.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: AlertTriangle,
    title: "Incident Alerts",
    desc: "Instant notifications when new deforestation events are detected in your watched regions.",
    color: "text-danger",
    bg: "bg-danger/10",
  },
  {
    icon: Shield,
    title: "False Positive Flagging",
    desc: "Human-in-the-loop review system to maintain data accuracy and reduce alert fatigue.",
    color: "text-forest",
    bg: "bg-forest/10",
  },
  {
    icon: TreePine,
    title: "CO₂ Impact Estimation",
    desc: "Automatically calculate estimated carbon emissions from detected deforestation events.",
    color: "text-orange-400",
    bg: "bg-orange-400/10",
  },
];

const stats = [
  { value: "4.2M", label: "Hectares Lost in 2024" },
  { value: "150+", label: "Countries Monitored" },
  { value: "Daily", label: "Satellite Updates" },
  { value: "2,400+", label: "Active Incidents" },
];

export default function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Banner */}
      <section className="relative h-screen overflow-hidden">
        {/* Background image */}
        <img
          src={heroForest}
          alt="Aerial view of deforestation in the Amazon"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />

        {/* Gradient blend — image fades INTO the background at the bottom */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, hsl(210 20% 7% / 0.3) 0%, hsl(210 20% 7% / 0.5) 40%, hsl(210 20% 7%) 100%)",
          }}
        />

        {/* Hero content */}
        <div className="relative z-10 flex h-full flex-col lg:flex-row items-center justify-center container mx-auto px-4 pt-8 lg:pt-16 pb-24 lg:pb-0 gap-8 overflow-y-auto">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex-1 w-full text-center lg:text-left z-20 order-2 lg:order-1 flex flex-col items-center lg:items-start pt-8 lg:pt-0"
          >
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-2 text-sm font-medium text-primary backdrop-blur-sm">
              <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
              Live Environmental Monitoring Platform
            </div>

            <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-[5.5rem] mb-6 max-w-5xl leading-[1.1]">
              The Earth Is
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, hsl(142 60% 38%), hsl(130 45% 60%))",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Watching Back
              </span>
            </h1>

            <p className="max-w-xl text-lg text-muted-foreground mb-8 sm:text-lg">
              EcoWatch delivers real-time satellite intelligence on deforestation, global warming, and
              environmental change — empowering action before it's too late.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 align-start">
              <NavLink to="/dashboard">
                <Button size="lg" className="bg-gradient-green border-0 shadow-glow font-display text-base px-8 h-12">
                  <Satellite className="mr-2 h-5 w-5" />
                  Open Dashboard
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </NavLink>
              <a href="#features">
                <Button size="lg" variant="outline" className="border-border/60 font-display text-base px-8 h-12 bg-background/20 backdrop-blur-md">
                  Learn More
                </Button>
              </a>
            </div>
          </motion.div>

          {/* 3D Globe Section */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
            className="flex-1 w-full max-w-[300px] sm:max-w-md lg:max-w-2xl aspect-square lg:h-[700px] relative z-10 order-1 lg:order-2"
          >
            <EarthGlobe />
          </motion.div>
        </div>

        {/* Stats bar at bottom of hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-wrap items-center justify-center gap-8 px-4"
        >
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="font-display text-2xl font-bold text-primary">{stat.value}</p>
              <p className="text-xs text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* Features section */}
      <section id="features" className="py-24 px-4">
        <div className="container mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Platform Features</p>
            <h2 className="font-display text-4xl font-bold sm:text-5xl mb-4">
              Every Forest, Every Change,
              <br />
              <span className="text-forest">Every Day</span>
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              From pixel-level satellite analysis to global trend visualization — EcoWatch gives you the complete picture.
            </p>
          </motion.div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="rounded-2xl border border-border bg-card p-6 shadow-card hover:border-primary/40 transition-colors"
              >
                <div className={`mb-4 inline-flex rounded-xl p-3 ${f.bg}`}>
                  <f.icon className={`h-5 w-5 ${f.color}`} />
                </div>
                <h3 className="font-display font-semibold text-lg mb-2">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="container mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl border border-primary/20 bg-gradient-to-br from-card to-primary/5 p-12 text-center shadow-card"
          >
            <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-green shadow-glow">
              <TreePine className="h-8 w-8 text-primary-foreground" />
            </div>
            <h2 className="font-display text-4xl font-bold mb-4">
              Start Monitoring Now
            </h2>
            <p className="text-muted-foreground mb-8 max-w-lg mx-auto">
              Access the live dashboard to explore deforestation incidents, compare historical satellite imagery,
              and track global environmental indicators.
            </p>
            <NavLink to="/dashboard">
              <Button size="lg" className="bg-gradient-green border-0 shadow-glow font-display text-base px-10">
                <Globe className="mr-2 h-5 w-5" />
                Open Live Dashboard
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </NavLink>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8 px-4 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <TreePine className="h-4 w-4 text-primary" />
          <span className="font-display font-bold text-sm">EcoWatch</span>
        </div>
        <p className="text-xs text-muted-foreground">
          Environmental monitoring data for a sustainable planet. Data sourced from public satellite repositories.
        </p>
      </footer>
    </div>
  );
}
