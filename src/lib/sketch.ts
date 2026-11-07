import type { Locale } from "@/i18n/routing";

export const ROOM_TYPES = [
  "bedroom",
  "lounge",
  "drawing",
  "kitchen",
  "bath",
  "store",
  "porch",
  "courtyard",
] as const;

export type RoomType = (typeof ROOM_TYPES)[number];

export const PLOT_IDS = [
  "5m-25x45",
  "5m-25x50",
  "10m-35x65",
  "10m-35x70",
  "1k-50x90",
] as const;

export type PlotId = (typeof PLOT_IDS)[number];
export type PlotFamily = "5marla" | "10marla" | "1kanal";

export type PlotTemplate = {
  id: PlotId;
  family: PlotFamily;
  widthFt: number;
  depthFt: number;
  areaSqFt: number;
  /** Front is the short side on the 25 ft plots. */
  front: "short" | "width";
  setback: { front: number; rear: number; side: number };
};

export type SketchRoom = {
  id: string;
  type: RoomType;
  x: number;
  y: number;
  w: number;
  h: number;
};

export type SketchState = {
  v: 1;
  id: string;
  plotId: PlotId;
  society: string;
  rooms: SketchRoom[];
};

export type SimilarSketchProject = {
  src: string;
  caption: string;
  width: number;
  height: number;
};

export type SketchPdfCopy = {
  studio: string;
  packTitle: string;
  dateLabel: string;
  sketchIdLabel: string;
  societyLabel: string;
  frontLabel: string;
  disclaimer: string;
  scheduleTitle: string;
  colRoom: string;
  colSize: string;
  colArea: string;
  plotArea: string;
  roomsArea: string;
  covered: string;
  coveredNote: string;
  storey: string;
  education5: string;
  similarTitle: string;
  nextTitle: string;
  nextBody: string;
  approvalsLine: string;
  whatsappLine: string;
};

export const PLOT_TEMPLATES: Record<PlotId, PlotTemplate> = {
  "5m-25x45": {
    id: "5m-25x45",
    family: "5marla",
    widthFt: 25,
    depthFt: 45,
    areaSqFt: 1125,
    front: "short",
    setback: { front: 5, rear: 5, side: 0 },
  },
  "5m-25x50": {
    id: "5m-25x50",
    family: "5marla",
    widthFt: 25,
    depthFt: 50,
    areaSqFt: 1250,
    front: "short",
    setback: { front: 5, rear: 5, side: 0 },
  },
  "10m-35x65": {
    id: "10m-35x65",
    family: "10marla",
    widthFt: 35,
    depthFt: 65,
    areaSqFt: 2275,
    front: "width",
    setback: { front: 10, rear: 7, side: 5 },
  },
  "10m-35x70": {
    id: "10m-35x70",
    family: "10marla",
    widthFt: 35,
    depthFt: 70,
    areaSqFt: 2450,
    front: "width",
    setback: { front: 10, rear: 7, side: 5 },
  },
  "1k-50x90": {
    id: "1k-50x90",
    family: "1kanal",
    widthFt: 50,
    depthFt: 90,
    areaSqFt: 4500,
    front: "width",
    setback: { front: 15, rear: 8, side: 5 },
  },
};

export const PLOT_ORDER: PlotId[] = [...PLOT_IDS];

export const DEFAULT_PLOT_ID: PlotId = "10m-35x70";

export const ROOM_DEFAULTS: Record<RoomType, { w: number; h: number }> = {
  bedroom: { w: 12, h: 12 },
  lounge: { w: 12, h: 14 },
  drawing: { w: 12, h: 14 },
  kitchen: { w: 8, h: 10 },
  bath: { w: 6, h: 8 },
  store: { w: 6, h: 6 },
  porch: { w: 12, h: 16 },
  courtyard: { w: 10, h: 12 },
};

export const ROOM_FILL: Record<RoomType, string> = {
  bedroom: "#5d6d80",
  lounge: "#6a7b8e",
  drawing: "#4f5e70",
  kitchen: "#738396",
  bath: "#445261",
  store: "#3d4a56",
  porch: "#5d6d80",
  courtyard: "#2b3642",
};

const STORAGE_KEY = "flux-sketch-v1";
const ID_ALPHABET = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

export function isPlotId(value: string): value is PlotId {
  return (PLOT_IDS as readonly string[]).includes(value);
}

export function isRoomType(value: string): value is RoomType {
  return (ROOM_TYPES as readonly string[]).includes(value);
}

export function generateSketchId(): string {
  let suffix = "";
  for (let i = 0; i < 4; i += 1) {
    suffix += ID_ALPHABET[Math.floor(Math.random() * ID_ALPHABET.length)];
  }
  return `FX-${suffix}`;
}

export function newRoomId(): string {
  return `r${Math.random().toString(36).slice(2, 8)}`;
}

export function emptySketch(plotId: PlotId = DEFAULT_PLOT_ID): SketchState {
  return {
    v: 1,
    id: generateSketchId(),
    plotId,
    society: "",
    rooms: [],
  };
}

export function snapFt(n: number): number {
  if (!Number.isFinite(n)) return 0;
  return Math.round(n);
}

export function clampRoom(
  room: SketchRoom,
  plot: PlotTemplate
): SketchRoom {
  const w = Math.min(plot.widthFt, Math.max(4, snapFt(room.w)));
  const h = Math.min(plot.depthFt, Math.max(4, snapFt(room.h)));
  const x = Math.min(plot.widthFt - w, Math.max(0, snapFt(room.x)));
  const y = Math.min(plot.depthFt - h, Math.max(0, snapFt(room.y)));
  return { ...room, x, y, w, h };
}

export function placeRoom(
  type: RoomType,
  rooms: SketchRoom[],
  plot: PlotTemplate
): SketchRoom {
  const size = ROOM_DEFAULTS[type];
  const w = Math.min(size.w, plot.widthFt);
  const h = Math.min(size.h, plot.depthFt);
  let x = 1;
  let y = 1;

  if (type === "porch") {
    x = Math.max(0, Math.round((plot.widthFt - w) / 2));
    y = Math.max(0, plot.depthFt - h);
  } else {
    const col = rooms.length % 3;
    const row = Math.floor(rooms.length / 3);
    x = Math.min(plot.widthFt - w, col * 8);
    y = Math.min(plot.depthFt - h, row * 8);
  }

  return clampRoom(
    { id: newRoomId(), type, x, y, w, h },
    plot
  );
}

export function rotateRoom(room: SketchRoom, plot: PlotTemplate): SketchRoom {
  const cx = room.x + room.w / 2;
  const cy = room.y + room.h / 2;
  const w = room.h;
  const h = room.w;
  return clampRoom(
    { ...room, w, h, x: cx - w / 2, y: cy - h / 2 },
    plot
  );
}

export function roomsArea(rooms: SketchRoom[]): number {
  return rooms.reduce((sum, room) => sum + room.w * room.h, 0);
}

/** Crude covered-area hint — rooms plus a wall factor, not a bylaw number. */
export function indicativeCovered(rooms: SketchRoom[]): number {
  return Math.round(roomsArea(rooms) * 1.12);
}

export function plotFamilyLabel(plot: PlotTemplate, locale: Locale): string {
  if (plot.family === "5marla") return locale === "ur" ? "5 مرلہ" : "5 marla";
  if (plot.family === "10marla") return locale === "ur" ? "10 مرلہ" : "10 marla";
  return locale === "ur" ? "1 کنال" : "1 kanal";
}

export function plotFeetLabel(plot: PlotTemplate): string {
  return `${plot.widthFt}×${plot.depthFt}`;
}

export function plotLabel(plot: PlotTemplate, locale: Locale): string {
  return `${plotFamilyLabel(plot, locale)} · ${plotFeetLabel(plot)}`;
}

export function roomLabel(type: RoomType, locale: Locale): string {
  const en: Record<RoomType, string> = {
    bedroom: "Bedroom",
    lounge: "TV lounge",
    drawing: "Drawing",
    kitchen: "Kitchen",
    bath: "Bath",
    store: "Store",
    porch: "Car porch",
    courtyard: "Courtyard",
  };
  const ur: Record<RoomType, string> = {
    bedroom: "کمرہ",
    lounge: "ٹی وی لاؤنج",
    drawing: "ڈرائنگ روم",
    kitchen: "کچن",
    bath: "باتھ",
    store: "سٹور",
    porch: "کار پورچ",
    courtyard: "صحن",
  };
  return locale === "ur" ? ur[type] : en[type];
}

export function ftLabel(n: number): string {
  return `${n}'`;
}

export function roomSizeLabel(room: Pick<SketchRoom, "w" | "h">): string {
  return `${room.w}' × ${room.h}'`;
}

export function sanitizeSociety(value: string): string {
  return value
    .trim()
    .replace(/[^\p{L}\p{N}\s._-]+/gu, "")
    .slice(0, 80);
}

export function pdfFileName(state: SketchState): string {
  const plot = PLOT_TEMPLATES[state.plotId];
  const size =
    plot.family === "5marla"
      ? "5-marla"
      : plot.family === "10marla"
        ? "10-marla"
        : "1-kanal";
  const society = sanitizeSociety(state.society).replace(/\s+/g, "-");
  const parts = ["FluX", size];
  if (society) parts.push(society);
  parts.push(state.id);
  return `${parts.join("-")}.pdf`;
}

type CompactSketch = {
  v: 1;
  id: string;
  p: PlotId;
  s?: string;
  r: Array<[string, RoomType, number, number, number, number]>;
};

export function compactSketch(state: SketchState): CompactSketch {
  return {
    v: 1,
    id: state.id,
    p: state.plotId,
    s: state.society.trim() ? state.society.trim() : undefined,
    r: state.rooms.map((room) => [
      room.id,
      room.type,
      room.x,
      room.y,
      room.w,
      room.h,
    ]),
  };
}

export function expandSketch(raw: unknown): SketchState | null {
  if (!raw || typeof raw !== "object") return null;
  const data = raw as Partial<CompactSketch> & Partial<SketchState>;
  const plotId = data.p ?? data.plotId;
  if (data.v !== 1 || !plotId || !isPlotId(plotId)) return null;
  const plot = PLOT_TEMPLATES[plotId];
  const id =
    typeof data.id === "string" && /^FX-[A-Z0-9]{4}$/.test(data.id)
      ? data.id
      : generateSketchId();
  const society =
    typeof data.s === "string"
      ? data.s
      : typeof data.society === "string"
        ? data.society
        : "";
  const compactRooms = Array.isArray(data.r) ? data.r : null;
  const fullRooms = Array.isArray(data.rooms) ? data.rooms : null;
  const rooms: SketchRoom[] = [];

  if (compactRooms) {
    for (const row of compactRooms.slice(0, 40)) {
      if (!Array.isArray(row) || row.length < 6) continue;
      const [roomId, type, x, y, w, h] = row;
      if (typeof roomId !== "string" || !isRoomType(type)) continue;
      if (![x, y, w, h].every((n) => typeof n === "number")) continue;
      rooms.push(
        clampRoom(
          { id: roomId.slice(0, 12), type, x, y, w, h },
          plot
        )
      );
    }
  } else if (fullRooms) {
    for (const room of fullRooms.slice(0, 40)) {
      if (!room || typeof room !== "object") continue;
      if (typeof room.id !== "string" || !isRoomType(room.type)) continue;
      rooms.push(clampRoom(room, plot));
    }
  }

  return { v: 1, id, plotId, society, rooms };
}

export function encodeSketch(state: SketchState): string {
  const json = JSON.stringify(compactSketch(state));
  const bytes = new TextEncoder().encode(json);
  let binary = "";
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export function decodeSketch(value: string): SketchState | null {
  try {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/");
    const pad = padded.length % 4 === 0 ? "" : "=".repeat(4 - (padded.length % 4));
    const binary = atob(padded + pad);
    const bytes = Uint8Array.from(binary, (ch) => ch.charCodeAt(0));
    const json = new TextDecoder().decode(bytes);
    return expandSketch(JSON.parse(json));
  } catch {
    return null;
  }
}

export function saveSketch(state: SketchState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(compactSketch(state)));
  } catch {
    // Private mode / quota — sketch still works in memory.
  }
}

export function loadSketch(): SketchState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return expandSketch(JSON.parse(raw));
  } catch {
    return null;
  }
}

export function sharePath(locale: Locale, encoded: string): string {
  const prefix = locale === "ur" ? "/ur/sketch" : "/sketch";
  return `${prefix}?s=${encoded}`;
}

export function sketchWhatsAppText(
  locale: Locale,
  state: SketchState
): string {
  const plot = PLOT_TEMPLATES[state.plotId];
  const rooms = state.rooms
    .map(
      (room) =>
        `${roomLabel(room.type, locale)} ${roomSizeLabel(room)}`
    )
    .join(locale === "ur" ? "، " : ", ");
  const society = state.society.trim() || (locale === "ur" ? "(سوسائٹی)" : "(society)");

  if (locale === "ur") {
    return `السلام علیکم، میں نے FluX پر گھر کا خاکہ بنایا ہے۔ خاکہ ${state.id}۔ پلاٹ: ${plotLabel(plot, "ur")}۔ سوسائٹی: ${society}۔ کمرے: ${rooms || "—"}۔ Ar. Adnan / Ar. Umair کے لیے پہلی بریف ہے۔`;
  }

  return `Salaam, I sketched a house on FluX. Sketch ${state.id}. Plot: ${plotLabel(plot, "en")}. Society: ${society}. Rooms: ${rooms || "—"}. This is a first brief for Ar. Adnan / Ar. Umair.`;
}
