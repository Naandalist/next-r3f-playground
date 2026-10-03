export type SlotId =
  | "desk"
  | "chair"
  | "monitorLeft"
  | "monitorRight"
  | "keyboard"
  | "plantLeft"
  | "plantRight"
  | "lamp";

export type Category = "desk" | "chair" | "monitor" | "keyboard" | "plant" | "lamp";

export type TenureId = "week" | "month" | "quarter" | "half";

export type CatalogItem = {
  id: string;
  category: Category;
  name: string;
  variant: string;
  priceMonthly: number;
  src: string;
  scale: number;
};

export type SlotDef = {
  id: SlotId;
  category: Category;
  label: string;
  position: [number, number, number];
  hotspot: [number, number, number];
};

export const SLOTS: SlotDef[] = [
  { id: "desk", category: "desk", label: "Desk", position: [0.15, 0, -1.15], hotspot: [0.7, 0.95, -1.05] },
  { id: "chair", category: "chair", label: "Chair", position: [0.15, 0, -0.35], hotspot: [0.15, 1.05, -0.15] },
  { id: "monitorLeft", category: "monitor", label: "Left monitor", position: [-0.28, 0.78, -1.35], hotspot: [-0.28, 1.25, -1.35] },
  { id: "monitorRight", category: "monitor", label: "Right monitor", position: [0.42, 0.78, -1.35], hotspot: [0.42, 1.25, -1.35] },
  { id: "keyboard", category: "keyboard", label: "Keyboard", position: [0.12, 0.8, -1.02], hotspot: [0.12, 0.98, -0.9] },
  { id: "plantLeft", category: "plant", label: "Left plant", position: [-1.45, 0, -0.9], hotspot: [-1.45, 0.85, -0.9] },
  { id: "plantRight", category: "plant", label: "Right plant", position: [1.55, 0, -0.7], hotspot: [1.55, 0.85, -0.7] },
  { id: "lamp", category: "lamp", label: "Lamp", position: [-2.15, 0, 0.15], hotspot: [-2.15, 1.35, 0.15] },
];

export const ITEMS: CatalogItem[] = [
  { id: "desk-nusa", category: "desk", name: "Nusa Standing Desk", variant: "Oak", priceMonthly: 450_000, src: "/models/workspace/desk-nusa.glb", scale: 1.15 },
  { id: "desk-compact", category: "desk", name: "Compact Desk", variant: "White", priceMonthly: 320_000, src: "/models/workspace/desk-compact.glb", scale: 1.05 },
  { id: "chair-ergo", category: "chair", name: "Ergo Mesh Chair", variant: "Black", priceMonthly: 300_000, src: "/models/workspace/chair-ergo.glb", scale: 1.15 },
  { id: "chair-task", category: "chair", name: "Task Chair", variant: "Grey", priceMonthly: 180_000, src: "/models/workspace/chair-task.glb", scale: 1.15 },
  { id: "mon-24", category: "monitor", name: '24" Full HD Monitor', variant: "Black", priceMonthly: 250_000, src: "/models/workspace/mon-24.glb", scale: 1.2 },
  { id: "mon-27", category: "monitor", name: '27" Display', variant: "Silver", priceMonthly: 400_000, src: "/models/workspace/mon-27.glb", scale: 1.15 },
  { id: "kb-low", category: "keyboard", name: "Low-profile Keyboard", variant: "Silver", priceMonthly: 50_000, src: "/models/workspace/kb-low.glb", scale: 1.2 },
  { id: "kb-laptop", category: "keyboard", name: "Laptop", variant: "Silver", priceMonthly: 80_000, src: "/models/workspace/kb-laptop.glb", scale: 1.15 },
  { id: "plant-syngonium", category: "plant", name: "Syngonium in Clay Pot", variant: "Clay", priceMonthly: 55_000, src: "/models/workspace/plant-syngonium.glb", scale: 1.3 },
  { id: "plant-ficus", category: "plant", name: "Ficus in Terracotta Bowl", variant: "Terracotta", priceMonthly: 70_000, src: "/models/workspace/plant-ficus.glb", scale: 1.3 },
  { id: "lamp-tripod", category: "lamp", name: "Tripod Floor Lamp", variant: "Oak", priceMonthly: 90_000, src: "/models/workspace/lamp-tripod.glb", scale: 1.25 },
  { id: "lamp-arc", category: "lamp", name: "Square Floor Lamp", variant: "Black", priceMonthly: 110_000, src: "/models/workspace/lamp-arc.glb", scale: 1.25 },
];

export const DEFAULT_SELECTION: Record<SlotId, string | null> = {
  desk: "desk-nusa",
  chair: "chair-ergo",
  monitorLeft: "mon-24",
  monitorRight: null,
  keyboard: null,
  plantLeft: null,
  plantRight: null,
  lamp: null,
};

export const TENURES: { id: TenureId; label: string; discount: number; weekly: boolean }[] = [
  { id: "week", label: "1 wk", discount: 0, weekly: true },
  { id: "month", label: "1 mo", discount: 0, weekly: false },
  { id: "quarter", label: "3 mo · 10%", discount: 0.1, weekly: false },
  { id: "half", label: "6 mo · 20%", discount: 0.2, weekly: false },
];

export const AREAS = ["Canggu", "Seminyak", "Ubud", "Sanur", "Kuta", "Uluwatu"];

export function itemById(id: string | null) {
  if (!id) return null;
  return ITEMS.find((item) => item.id === id) ?? null;
}

export function itemsForSlot(slotId: SlotId) {
  const slot = SLOTS.find((entry) => entry.id === slotId);
  if (!slot) return [];
  return ITEMS.filter((item) => item.category === slot.category);
}

export function formatIdr(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function rateFor(monthly: number, tenureId: TenureId) {
  const tenure = TENURES.find((entry) => entry.id === tenureId) ?? TENURES[1];
  const discounted = monthly * (1 - tenure.discount);
  return tenure.weekly ? discounted / 4 : discounted;
}
