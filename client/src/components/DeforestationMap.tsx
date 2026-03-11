import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface DeforestationZone {
  id: string;
  name: string;
  location: string;
  coords: [number, number][];
  severity: "low" | "medium" | "high" | "critical";
  area: number;
  date: string;
  centerCoords: [number, number];
}

const DEFORESTATION_ZONES: DeforestationZone[] = [
  {
    id: "amz-1",
    name: "Para State Clearing",
    location: "Amazon, Brazil",
    coords: [[-3.5, -52.8], [-3.5, -52.2], [-4.1, -52.2], [-4.1, -52.8]],
    severity: "critical",
    area: 12400,
    date: "Oct 2024",
    centerCoords: [-3.8, -52.5],
  },
  {
    id: "amz-2",
    name: "Rondônia Fires",
    location: "Amazon, Brazil",
    coords: [[-10.5, -63.8], [-10.5, -63.1], [-11.2, -63.1], [-11.2, -63.8]],
    severity: "high",
    area: 8700,
    date: "Sep 2024",
    centerCoords: [-10.85, -63.45],
  },
  {
    id: "sea-1",
    name: "Borneo Palm Oil Expansion",
    location: "Kalimantan, Indonesia",
    coords: [[1.2, 110.5], [1.2, 111.5], [0.4, 111.5], [0.4, 110.5]],
    severity: "high",
    area: 5200,
    date: "Aug 2024",
    centerCoords: [0.8, 111.0],
  },
  {
    id: "afr-1",
    name: "Congo Basin Logging",
    location: "DRC, Africa",
    coords: [[1.5, 23.5], [1.5, 24.5], [0.8, 24.5], [0.8, 23.5]],
    severity: "medium",
    area: 3100,
    date: "Nov 2024",
    centerCoords: [1.15, 24.0],
  },
  {
    id: "ind-1",
    name: "Cerrado Soy Expansion",
    location: "Mato Grosso, Brazil",
    coords: [[-13.5, -54.5], [-13.5, -53.5], [-14.5, -53.5], [-14.5, -54.5]],
    severity: "medium",
    area: 4600,
    date: "Oct 2024",
    centerCoords: [-14.0, -54.0],
  },
];

const severityColors: Record<string, string> = {
  low: "#4ade80",
  medium: "#fbbf24",
  high: "#f97316",
  critical: "#ef4444",
};

interface DeforestationMapProps {
  center?: [number, number];
  zoom?: number;
  onIncidentClick?: (zone: DeforestationZone) => void;
  year?: number;
  title?: string;
}

export function DeforestationMap({
  center = [0, 0],
  zoom = 2,
  onIncidentClick,
  year = 2024,
  title,
}: DeforestationMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<L.Map | null>(null);
  const layersRef = useRef<L.Layer[]>([]);

  // Initialise map once
  useEffect(() => {
    if (!containerRef.current || mapRef.current) return;

    const map = L.map(containerRef.current, {
      center,
      zoom,
      zoomControl: false,
      attributionControl: false,
    });

    L.tileLayer("https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png", {
      attribution: "© OpenStreetMap contributors © CARTO",
    }).addTo(map);

    mapRef.current = map;

    return () => {
      map.remove();
      mapRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Update view when center/zoom changes
  useEffect(() => {
    mapRef.current?.setView(center, zoom, { animate: true });
  }, [center, zoom]);

  // Update polygons when year changes
  useEffect(() => {
    const map = mapRef.current;
    if (!map) return;

    // Remove old layers
    layersRef.current.forEach((l) => map.removeLayer(l));
    layersRef.current = [];

    // Filter by year
    const visibleZones = DEFORESTATION_ZONES.filter((_, i) => {
      if (year <= 2020) return i < 2;
      if (year <= 2022) return i < 3;
      return true;
    });

    visibleZones.forEach((zone) => {
      const color = severityColors[zone.severity];
      const poly = L.polygon(zone.coords as L.LatLngExpression[], {
        color,
        fillColor: color,
        fillOpacity: 0.35,
        weight: 2,
      }).addTo(map);

      poly.bindPopup(`
        <div style="font-family:'Space Grotesk',sans-serif;min-width:160px;color:#e2e8f0;background:#111;padding:4px">
          <strong style="color:#fff">${zone.name}</strong><br/>
          <span style="font-size:11px;color:#888">${zone.location}</span><br/>
          <span style="font-size:12px;color:${color};font-weight:600">
            ${zone.severity.toUpperCase()} · ${zone.area.toLocaleString()} ha
          </span><br/>
          <span style="font-size:11px;color:#aaa">${zone.date}</span>
        </div>
      `);

      poly.on("click", () => {
        onIncidentClick?.(zone);
      });

      layersRef.current.push(poly);
    });
  }, [year, onIncidentClick]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden border border-border">
      {title && (
        <div className="absolute top-3 left-3 z-[400] rounded-lg border border-border/60 bg-card/90 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold pointer-events-none">
          {title}
        </div>
      )}
      <div ref={containerRef} style={{ height: "100%", width: "100%" }} />
    </div>
  );
}

export type { DeforestationZone };
