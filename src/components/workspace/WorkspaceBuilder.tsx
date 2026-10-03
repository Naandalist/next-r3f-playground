"use client";

import dynamic from "next/dynamic";
import { useMemo, useState, type ReactNode } from "react";
import {
  AREAS,
  DEFAULT_SELECTION,
  SLOTS,
  TENURES,
  formatIdr,
  itemById,
  itemsForSlot,
  rateFor,
  type SlotId,
  type TenureId,
} from "@/lib/workspace/catalog";

const WorkspaceScene = dynamic(
  () => import("@/components/workspace/WorkspaceScene").then((mod) => mod.WorkspaceScene),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-full items-center justify-center text-sm text-stone-500">
        Loading workspace…
      </div>
    ),
  },
);

type Lead = { name: string; contact: string; area: string; start: string };

const EMPTY_LEAD: Lead = { name: "", contact: "", area: "", start: "" };

export function WorkspaceBuilder() {
  const [selection, setSelection] = useState(DEFAULT_SELECTION);
  const [activeSlot, setActiveSlot] = useState<SlotId | null>(null);
  const [tenure, setTenure] = useState<TenureId>("month");
  const [review, setReview] = useState(false);
  const [lead, setLead] = useState<Lead>(EMPTY_LEAD);
  const [submitted, setSubmitted] = useState(false);
  const [resetKey, setResetKey] = useState(0);

  const chosen = useMemo(
    () =>
      SLOTS.flatMap((slot) => {
        const item = itemById(selection[slot.id]);
        return item ? [{ slot, item }] : [];
      }),
    [selection],
  );
  const monthly = chosen.reduce((sum, entry) => sum + entry.item.priceMonthly, 0);
  const rate = rateFor(monthly, tenure);
  const tenureMeta = TENURES.find((entry) => entry.id === tenure) ?? TENURES[1];

  return (
    <div className="relative h-screen w-full overflow-hidden bg-[#f3efe6] text-stone-900">
      <WorkspaceScene
        selection={selection}
        activeSlot={activeSlot}
        onSelectSlot={setActiveSlot}
        resetKey={resetKey}
      />

      <header className="pointer-events-none absolute left-5 top-4">
        <p className="text-sm font-semibold">3D workspace builder</p>
        <p className="text-xs text-stone-500">Build your Bali workspace</p>
      </header>
      <button
        type="button"
        onClick={() => setResetKey((value) => value + 1)}
        className="absolute right-4 top-4 rounded-full border border-stone-200 bg-white px-4 py-2 text-sm shadow-sm"
      >
        Reset view
      </button>

      <div className="absolute bottom-5 left-1/2 flex w-[min(720px,calc(100%-2rem))] -translate-x-1/2 items-center gap-3 rounded-full border border-stone-200 bg-white px-4 py-2 shadow-lg">
        <div className="min-w-0">
          <p className="text-[11px] text-stone-500">{chosen.length} items</p>
          <p className="text-sm font-semibold">
            {formatIdr(rate)}
            <span className="ml-1 text-xs font-normal text-stone-500">
              /{tenureMeta.weekly ? "week" : "month"}
            </span>
          </p>
        </div>
        <div className="flex flex-1 flex-wrap justify-center gap-1">
          {TENURES.map((option) => (
            <button
              key={option.id}
              type="button"
              onClick={() => setTenure(option.id)}
              className={`rounded-full px-3 py-1 text-xs ${
                tenure === option.id ? "bg-stone-900 text-white" : "text-stone-600 hover:bg-stone-100"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={() => {
            setReview(true);
            setActiveSlot(null);
          }}
          className="rounded-full bg-stone-900 px-4 py-2 text-sm text-white"
        >
          Review & rent
        </button>
      </div>

      {activeSlot && (
        <Picker
          slot={activeSlot}
          selectedId={selection[activeSlot]}
          onClose={() => setActiveSlot(null)}
          onChoose={(itemId) => setSelection((current) => ({ ...current, [activeSlot]: itemId }))}
        />
      )}

      {review && (
        <Review
          chosen={chosen}
          rate={rate}
          monthly={monthly}
          tenureLabel={tenureMeta.weekly ? "1 week" : tenureMeta.label}
          lead={lead}
          submitted={submitted}
          onLead={setLead}
          onClose={() => {
            setReview(false);
            setSubmitted(false);
          }}
          onSubmit={() => setSubmitted(true)}
        />
      )}
    </div>
  );
}

function Picker({
  slot,
  selectedId,
  onClose,
  onChoose,
}: {
  slot: SlotId;
  selectedId: string | null;
  onClose: () => void;
  onChoose: (itemId: string | null) => void;
}) {
  const meta = SLOTS.find((entry) => entry.id === slot);
  const options = itemsForSlot(slot);

  return (
    <aside className="absolute right-4 top-16 w-[min(420px,calc(100%-2rem))] rounded-2xl border border-stone-200 bg-white p-4 shadow-xl">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="text-xs uppercase tracking-wide text-stone-500">Add item</p>
          <h2 className="text-lg font-semibold">{meta?.label}</h2>
        </div>
        <button type="button" onClick={onClose} className="text-stone-400" aria-label="Close">
          ×
        </button>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {options.map((item) => {
          const selected = item.id === selectedId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => onChoose(item.id)}
              className={`rounded-xl border p-3 text-left ${
                selected ? "border-teal-600 ring-2 ring-teal-100" : "border-stone-200"
              }`}
            >
              <span className="block text-sm font-medium">{item.name}</span>
              <span className="text-xs text-stone-500">{item.variant}</span>
              <span className="mt-2 block text-sm">{formatIdr(item.priceMonthly)} /mo</span>
              <span className="mt-2 inline-block text-xs text-teal-700">
                {selected ? "In your setup" : "Select"}
              </span>
            </button>
          );
        })}
      </div>
      {selectedId && (
        <button type="button" onClick={() => onChoose(null)} className="mt-3 text-sm text-stone-500 underline">
          Remove from workspace
        </button>
      )}
    </aside>
  );
}

function Review({
  chosen,
  rate,
  monthly,
  tenureLabel,
  lead,
  submitted,
  onLead,
  onClose,
  onSubmit,
}: {
  chosen: { slot: (typeof SLOTS)[number]; item: NonNullable<ReturnType<typeof itemById>> }[];
  rate: number;
  monthly: number;
  tenureLabel: string;
  lead: Lead;
  submitted: boolean;
  onLead: (lead: Lead) => void;
  onClose: () => void;
  onSubmit: () => void;
}) {
  return (
    <div className="absolute inset-0 z-10 overflow-auto bg-[#f7f5f2]">
      <div className="mx-auto grid max-w-5xl gap-8 px-6 py-8 md:grid-cols-[1.1fr_0.9fr]">
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm text-stone-500">3D workspace builder</p>
              <h2 className="text-2xl font-semibold">Review and rent</h2>
            </div>
            <button type="button" onClick={onClose} className="rounded-full border px-4 py-2 text-sm">
              Edit setup
            </button>
          </div>
          <div className="rounded-2xl bg-white p-4 shadow-sm">
            <p className="mb-3 text-sm font-medium">Your setup · {chosen.length} items</p>
            <ul className="divide-y divide-stone-100">
              {chosen.map(({ slot, item }) => (
                <li key={slot.id} className="flex items-center justify-between py-3 text-sm">
                  <span>
                    <span className="block font-medium">{item.name}</span>
                    <span className="text-stone-500">{item.variant} · {slot.label}</span>
                  </span>
                  <span>{formatIdr(item.priceMonthly)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <form
          className="space-y-4 rounded-2xl bg-white p-5 shadow-sm"
          onSubmit={(event) => {
            event.preventDefault();
            onSubmit();
          }}
        >
          <div className="flex items-end justify-between border-b pb-3">
            <div>
              <p className="text-xs text-stone-500">Price · {tenureLabel}</p>
              <p className="text-sm">Items per month {formatIdr(monthly)}</p>
            </div>
            <p className="text-lg font-semibold">{formatIdr(rate)}</p>
          </div>
          {submitted ? (
            <p className="rounded-xl bg-teal-50 px-4 py-3 text-sm text-teal-800">
              Request saved. No payment now. We confirm availability before delivery.
            </p>
          ) : (
            <>
              <Field label="Full name">
                <input
                  value={lead.name}
                  onChange={(event) => onLead({ ...lead, name: event.target.value })}
                  className="w-full rounded-lg border px-3 py-2"
                  required
                />
              </Field>
              <Field label="WhatsApp number or email">
                <input
                  value={lead.contact}
                  onChange={(event) => onLead({ ...lead, contact: event.target.value })}
                  className="w-full rounded-lg border px-3 py-2"
                  placeholder="+62"
                  required
                />
              </Field>
              <div className="grid grid-cols-2 gap-3">
                <Field label="Delivery area">
                  <select
                    value={lead.area}
                    onChange={(event) => onLead({ ...lead, area: event.target.value })}
                    className="w-full rounded-lg border px-3 py-2"
                    required
                  >
                    <option value="">Choose an area</option>
                    {AREAS.map((area) => (
                      <option key={area}>{area}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Start date">
                  <input
                    type="date"
                    value={lead.start}
                    onChange={(event) => onLead({ ...lead, start: event.target.value })}
                    className="w-full rounded-lg border px-3 py-2"
                    required
                  />
                </Field>
              </div>
              <button type="submit" className="w-full rounded-full bg-stone-900 py-3 text-sm text-white">
                Rent this setup
              </button>
              <p className="text-center text-xs text-stone-500">
                No payment now. We confirm availability before delivery.
              </p>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <label className="block space-y-1 text-sm">
      <span className="text-stone-500">{label}</span>
      {children}
    </label>
  );
}
