"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { startTransition, useState, useEffect } from "react";
import type { CommissionBrief } from "@/lib/commission";

// ─── DATA ────────────────────────────────────────────────────────────────────

const steps = [
  {
    id: "patron",
    number: "01",
    title: "Patron Profile",
    subtitle: "The person behind the piece",
    desc: "Start with who this watch is for. Tone, context, and intent — the atelier reads between the lines.",
  },
  {
    id: "silhouette",
    number: "02",
    title: "Silhouette",
    subtitle: "Shape and wrist presence",
    desc: "Choose the model family and how the watch should live on the wrist before we move into material.",
  },
  {
    id: "materiality",
    number: "03",
    title: "Materiality",
    subtitle: "Metal, dial, and strap",
    desc: "Define the atmosphere through case metal, dial language, and strap direction.",
  },
  {
    id: "mechanics",
    number: "04",
    title: "Mechanical Intent",
    subtitle: "Movement and function",
    desc: "Choose only what belongs emotionally and functionally. Leave it open if you want the atelier to recommend.",
  },
  {
    id: "signature",
    number: "05",
    title: "Signature Notes",
    subtitle: "Personal details and final word",
    desc: "References, engravings, occasion, and the emotional reason for making it.",
  },
] as const;

const modelFamilies = [
  {
    name: "No preference",
    tag: "Open",
    note: "Atelier suggests the strongest family.",
  },
  {
    name: "Nocturne",
    tag: "Dress Signature",
    note: "Quiet, formal, shadow-led.",
  },
  {
    name: "Solstice",
    tag: "Classic Calendar",
    note: "Warm guilloche and ceremonial balance.",
  },
  {
    name: "Meridian",
    tag: "Sport Tailoring",
    note: "Taut, technical, still refined.",
  },
  {
    name: "Aeternum",
    tag: "Open Balance",
    note: "Architectural exposure and drama.",
  },
  {
    name: "Vesper",
    tag: "Rose Signature",
    note: "Soft rose metal and satin restraint.",
  },
  {
    name: "Monarch",
    tag: "Grand Atelier",
    note: "Ceremonial, heraldic, authored.",
  },
] as const;

const metalOptions = [
  {
    label: "White Gold",
    note: "Cool brightness with formal restraint.",
    swatch: "linear-gradient(135deg,#e0e4ea,#8f97a6)",
  },
  {
    label: "Rose Gold",
    note: "Soft warmth and evening presence.",
    swatch: "linear-gradient(135deg,#f1c2ad,#8e5c55)",
  },
  {
    label: "Yellow Gold",
    note: "Ceremonial, rich, and classical.",
    swatch: "linear-gradient(135deg,#f4d37f,#8c6420)",
  },
  {
    label: "Titanium",
    note: "Quietly technical, lighter on wrist.",
    swatch: "linear-gradient(135deg,#a6b2bb,#41505d)",
  },
  {
    label: "Platinum",
    note: "Dense, discreet, and sovereign.",
    swatch: "linear-gradient(135deg,#e7e9ec,#7d828a)",
  },
  {
    label: "Undecided",
    note: "Let the atelier set the tone.",
    swatch: "linear-gradient(135deg,#2a2830,#0d0d0d)",
  },
] as const;

const dialMoods = [
  { label: "Restrained", note: "Quiet surfaces, disciplined typography." },
  { label: "Architectural", note: "Defined edges and strong geometry." },
  { label: "Shadowed", note: "Depth, smoke tones, lower-key presence." },
  { label: "Ceremonial", note: "More radiance, flourish, visual theatre." },
  {
    label: "Vintage-leaning",
    note: "Softer cues, patina memory, historic proportion.",
  },
] as const;

const strapOptions = [
  { label: "Alligator Strap", note: "Formal and sharply tailored." },
  { label: "Calf Strap", note: "Soft, versatile, understated luxury." },
  { label: "Integrated Bracelet", note: "Sculptural and contemporary." },
] as const;

const complicationOptions = [
  {
    code: "T-01",
    label: "Time Only",
    note: "The most distilled expression of proportion.",
  },
  { code: "D-14", label: "Date", note: "Useful without adding visual noise." },
  {
    code: "M-29",
    label: "Moon Phase",
    note: "Poetic and ceremonial by nature.",
  },
  {
    code: "P-72",
    label: "Power Reserve",
    note: "Mechanical character shown openly.",
  },
  {
    code: "O-06",
    label: "Open Balance",
    note: "Visible heartbeat and stronger drama.",
  },
  {
    code: "S-09",
    label: "Small Seconds",
    note: "Classical rhythm with subtle separation.",
  },
] as const;

// ─── TYPES ───────────────────────────────────────────────────────────────────

type FormState = CommissionBrief;

// ─── PRIMITIVES ──────────────────────────────────────────────────────────────

function FieldShell({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative border border-white/[0.07] bg-white/[0.018] px-5 py-4 transition-all duration-300 focus-within:border-[#C9A96E]/35 focus-within:bg-[#C9A96E]/[0.028] focus-within:shadow-[0_0_0_1px_rgba(201,169,110,0.08)]">
      <label className="mb-2 block font-[Cinzel,serif] text-[7.5px] uppercase tracking-[0.35em] text-[#C9A96E]/55">
        {label}
      </label>
      {children}
      {hint && (
        <p className="mt-1.5 font-[Cormorant_Garamond,serif] text-[11px] italic text-[#4A4840]">
          {hint}
        </p>
      )}
    </div>
  );
}

const inputCls =
  "w-full bg-transparent font-[Cormorant_Garamond,serif] text-[17px] italic text-[#F0ECE3] outline-none placeholder:text-[#3A3830]/70 caret-[#C9A96E]";

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 font-[Cinzel,serif] text-[8.5px] uppercase tracking-[0.35em] text-[#C9A96E]/55">
      {children}
    </p>
  );
}

function InfoBox({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative border border-[#C9A96E] bg-gradient-to-br from-[#C9A96E]/[0.06] to-white/[0.01] p-5 overflow-hidden">
      <span className="pointer-events-none absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#C9A96E]/40 to-transparent" />
      <p className="mb-3 font-[Cinzel,serif] text-[8px] uppercase tracking-[0.35em] text-[#C9A96E]/60">
        {title}
      </p>
      <div className="space-y-2.5 font-[Cormorant_Garamond,serif] text-[14px] italic leading-[1.8] text-[#8A877E]">
        {children}
      </div>
    </div>
  );
}

function ReadbackPanel({
  title,
  rows,
}: {
  title: string;
  rows: { k: string; v: string }[];
}) {
  return (
    <div className="border border-[#C9A96E] bg-gradient-to-br from-[#C9A96E]/[0.05] to-white/[0.01] p-5">
      <p className="mb-4 font-[Cinzel,serif] text-[8px] uppercase tracking-[0.38em] text-[#C9A96E]/60">
        {title}
      </p>
      <div className="space-y-3">
        {rows.map((r) => (
          <div
            key={r.k}
            className="border-b border-white/[0.04] pb-3 last:border-0 last:pb-0"
          >
            <div className="mb-0.5 font-[Cinzel,serif] text-[7.5px] uppercase tracking-[0.22em] text-[#4A4840]">
              {r.k}
            </div>
            <div className="font-[Cormorant_Garamond,serif] text-[15px] italic text-[#F0ECE3]/85">
              {r.v}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModelTile({
  model,
  active,
  onClick,
}: {
  model: (typeof modelFamilies)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden border p-4 text-left transition-all duration-350 ${
        active
          ? "border-[#C9A96E]/35 bg-[#C9A96E]/[0.07] shadow-[0_0_24px_rgba(201,169,110,0.06)]"
          : "border-white/[0.07] bg-white/[0.015] hover:border-[#C9A96E]/20 hover:bg-white/[0.03]"
      }`}
    >
      <span
        className={`absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-[#C9A96E] to-[#C9A96E]/50 transition-all duration-500 ${active ? "w-full" : "w-0 group-hover:w-1/3"}`}
      />
      {model.tag !== "Open" && (
        <div className="mb-1.5 font-[Cinzel,serif] text-[7px] uppercase tracking-[0.2em] text-[#C9A96E]/50">
          {model.tag}
        </div>
      )}
      <div
        className={`mb-1 font-[Cormorant_Garamond,serif] text-[20px] font-light leading-tight transition-colors duration-300 ${active ? "text-[#F0ECE3]" : "text-[#C8C0B0]"}`}
      >
        {model.name === "No preference" ? "Open Brief" : model.name}
      </div>
      <div className="font-[Cormorant_Garamond,serif] text-[11px] italic leading-[1.45] text-[#4A4840]">
        {model.note}
      </div>
      {active && (
        <motion.span
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute right-3 top-3 flex h-4 w-4 items-center justify-center rounded-full bg-[#C9A96E]/20"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-[#C9A96E]" />
        </motion.span>
      )}
    </button>
  );
}

function Strip({
  label,
  note,
  swatch,
  active,
  onClick,
}: {
  label: string;
  note: string;
  swatch?: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex w-full items-center gap-3.5 border px-4 py-3 text-left transition-all duration-300 ${
        active
          ? "border-[#C9A96E]/25 bg-[#C9A96E]/[0.04] shadow-[0_0_20px_rgba(201,169,110,0.04)]"
          : "border-white/[0.06] bg-white/[0.012] hover:border-[#C9A96E]/18 hover:bg-white/[0.025]"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#C9A96E] to-[#C9A96E]/40 transition-transform duration-400 origin-top ${active ? "scale-y-100" : "scale-y-0"}`}
      />
      {swatch && (
        <span
          className={`h-8 w-8 shrink-0 rounded-full border transition-all duration-300 ${active ? "scale-110 border-[#C9A96E]/40 shadow-[0_0_12px_rgba(201,169,110,0.25)]" : "border-white/[0.1]"}`}
          style={{ background: swatch }}
        />
      )}
      <span className="flex-1 min-w-0">
        <span
          className={`block font-[Cormorant_Garamond,serif] text-[16px] font-light leading-tight transition-colors duration-300 ${active ? "text-[#F0ECE3]" : "text-[#C8C0B0]"}`}
        >
          {label}
        </span>
        <span className="font-[Cormorant_Garamond,serif] text-[11px] italic text-[#4A4840]">
          {note}
        </span>
      </span>
      <motion.span
        animate={{ opacity: active ? 0.7 : 0, x: active ? 0 : 6 }}
        transition={{ duration: 0.2 }}
        className="font-[Cinzel,serif] text-[7.5px] uppercase tracking-[0.2em] text-[#C9A96E] shrink-0"
      >
        Selected
      </motion.span>
    </button>
  );
}

function Capsule({
  code,
  label,
  note,
  active,
  onClick,
}: {
  code: string;
  label: string;
  note: string;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative overflow-hidden border p-4 text-left transition-all duration-300 ${
        active
          ? "border-[#C9A96E]/35 bg-[#C9A96E]/[0.06] shadow-[0_0_28px_rgba(201,169,110,0.07)]"
          : "border-white/[0.07] bg-white/[0.012] hover:border-[#C9A96E]/20 hover:bg-white/[0.025]"
      }`}
    >
      <span
        className={`absolute right-0 top-0 transition-all duration-300`}
        style={{
          borderWidth: "0 20px 20px 0",
          borderStyle: "solid",
          borderColor: active
            ? `transparent #C9A96E transparent transparent`
            : `transparent transparent transparent transparent`,
        }}
      />
      <AnimatePresence>
        {active && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute right-[11px] top-[11px] h-[9px] w-[9px] rounded-full bg-[#07060A]"
          />
        )}
      </AnimatePresence>
      <div className="mb-2 font-[Cinzel,serif] text-[7.5px] uppercase tracking-[0.3em] text-[#C9A96E]/50">
        {code}
      </div>
      <div
        className={`mb-1 font-[Cormorant_Garamond,serif] text-[18px] font-light transition-colors duration-300 ${active ? "text-[#F0ECE3]" : "text-[#C8C0B0]"}`}
      >
        {label}
      </div>
      <div className="font-[Cormorant_Garamond,serif] text-[11px] italic leading-[1.5] text-[#4A4840]">
        {note}
      </div>
    </button>
  );
}

function Ornament() {
  return (
    <div className="flex items-center gap-3 py-5">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A96E]/12" />
      <span className="h-[4px] w-[4px] rotate-45 bg-[#C9A96E] opacity-35" />
      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A96E]/12" />
    </div>
  );
}

// ── Sidebar NavItem ──────────────────────────────────────────────────────────
function NavItem({
  step,
  active,
  done,
  onClick,
}: {
  step: (typeof steps)[number];
  active: boolean;
  done: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group relative flex w-full items-center gap-4 px-7 py-3.5 text-left transition-all duration-300 ${
        active
          ? "bg-gradient-to-r from-[#C9A96E]/[0.08] to-transparent"
          : "hover:bg-white/[0.018]"
      }`}
    >
      <span
        className={`absolute left-0 top-0 h-full w-[2px] bg-gradient-to-b from-[#C9A96E] to-[#C9A96E]/50 transition-transform duration-500 origin-top ${active ? "scale-y-100" : "scale-y-0"}`}
      />

      {/* number bubble */}
      <span
        className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border font-[Cinzel,serif] text-[8px] tracking-[0.08em] transition-all duration-300 ${
          active
            ? "border-[#C9A96E]/50 bg-[#C9A96E]/12 text-[#C9A96E] shadow-[0_0_14px_rgba(201,169,110,0.22)]"
            : done
              ? "border-[#A0822A]/35 text-[#A0822A]/70"
              : "border-white/[0.09] text-[#3A3830]"
        }`}
      >
        {done && !active ? "✓" : step.number}
      </span>

      <div className="min-w-0">
        <span
          className={`block font-[Cormorant_Garamond,serif] text-[14px] italic transition-colors duration-300 ${
            active
              ? "text-[#F0ECE3]"
              : done
                ? "text-[#8A877E]"
                : "text-[#4A4840]"
          }`}
        >
          {step.title}
        </span>
        <span className="block font-[Cinzel,serif] text-[7px] uppercase tracking-[0.2em] text-[#555247] transition-colors">
          {step.subtitle}
        </span>
      </div>
    </button>
  );
}

// ─── MAIN COMPONENT ──────────────────────────────────────────────────────────

export default function CommissionForm({
  initialModel,
}: {
  initialModel: string;
}) {
  const resolvedModel = modelFamilies.some((m) => m.name === initialModel)
    ? initialModel
    : "No preference";

  const [step, setStep] = useState(0);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [visitedSteps, setVisitedSteps] = useState<Set<number>>(new Set([0]));
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    location: "",
    wearer: "",
    model: resolvedModel,
    wrist: "",
    timeline: "Flexible",
    occasion: "",
    metal: "Undecided",
    dialMood: "",
    strap: "",
    references: "",
    engraving: "",
    notes: "",
    complications: [],
  });

  const set = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setSubmitError("");
    setForm((f) => ({ ...f, [k]: v }));
  };

  const toggleComp = (val: string) => {
    setSubmitError("");
    setForm((f) => ({
      ...f,
      complications: f.complications.includes(val)
        ? f.complications.filter((c) => c !== val)
        : [...f.complications, val],
    }));
  };

  const completion = [
    Boolean(form.name && form.email),
    Boolean(form.model !== "No preference" || form.wrist || form.occasion),
    Boolean(form.metal !== "Undecided" || form.dialMood || form.strap),
    Boolean(form.complications.length > 0),
    Boolean(form.references || form.engraving || form.notes),
  ];

  const progressPct = ((step + 1) / steps.length) * 100;
  const current = steps[step];

  const goToStep = (i: number) => {
    startTransition(() => {
      setStep(i);
      setVisitedSteps((s) => new Set([...Array.from(s), i]));
    });
  };

  const handleSubmit = async () => {
    const hasValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(
      form.email.trim(),
    );

    if (!form.name.trim() || !hasValidEmail) {
      setSubmitError("Please add a valid name and email before sending.");
      goToStep(0);
      return;
    }

    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/commission", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const payload = (await response.json().catch(() => null)) as
        | { message?: string }
        | null;

      if (!response.ok) {
        throw new Error(
          payload?.message ||
            "The commission brief could not be sent. Please try again.",
        );
      }

      startTransition(() => setSubmitted(true));
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "The commission brief could not be sent. Please try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // ── SUBMITTED ──────────────────────────────────────────────────────────────
  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="relative overflow-hidden border border-[#C9A96E] bg-gradient-to-br from-[#C9A96E]/[0.08] to-[#06050A]/95 p-10 md:p-16"
      >
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_65%_55%_at_0%_0%,rgba(201,169,110,0.1),transparent_55%),radial-gradient(ellipse_40%_60%_at_100%_100%,rgba(201,169,110,0.05),transparent_50%)]" />
        <span className="pointer-events-none absolute left-0 top-0 h-24 w-24 border-l border-t border-[#C9A96E]" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-24 w-24 border-b border-r border-[#C9A96E]" />

        <div className="relative">
          <div className="mb-6 flex items-center gap-3">
            <span className="h-px w-10 bg-[#C9A96E]/60" />
            <p className="font-[Cinzel,serif] text-[9px] uppercase tracking-[0.45em] text-[#C9A96E]/70">
              Brief Received
            </p>
          </div>

          <h2 className="mb-6 font-[Cormorant_Garamond,serif] text-[52px] font-light leading-[0.95] text-[#F0ECE3] md:text-[68px]">
            The dossier is
            <br />
            now in
            <br />
            <em className="italic text-[#C9A96E]">the atelier.</em>
          </h2>

          <div className="mb-2 h-px w-16 bg-gradient-to-r from-[#C9A96E]/50 to-transparent" />

          <p className="mb-10 max-w-lg font-[Cormorant_Garamond,serif] text-[16px] italic leading-[1.85] text-[#8A877E]">
            The full brief has been translated into a private PDF dossier and
            sent to the atelier desk. A human review would follow with model
            guidance, design notes, and a consultation proposal within 48 hours.
          </p>

          <div className="mb-10 grid grid-cols-3 gap-px bg-white/[0.06]">
            {[
              { k: "Model Family", v: form.model || "Open brief" },
              { k: "Material", v: form.metal || "Undecided" },
              {
                k: "Functions",
                v: form.complications.length
                  ? `${form.complications.length} selected`
                  : "Atelier guidance",
              },
            ].map((item) => (
              <div key={item.k} className="bg-[#06050A] px-5 py-4">
                <div className="mb-1 font-[Cormorant_Garamond,serif] text-[22px] font-light text-[#F0ECE3]">
                  {item.v}
                </div>
                <div className="font-[Cinzel,serif] text-[7.5px] uppercase tracking-[0.25em] text-[#4A4840]">
                  {item.k}
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[#C9A96E] px-8 py-3.5 font-[Cinzel,serif] text-[8px] uppercase tracking-[0.3em] text-[#06050A] transition-all duration-300 hover:bg-[#E8D4A0]"
            >
              Return Home
            </Link>
            <button
              type="button"
              onClick={() =>
                startTransition(() => {
                  setSubmitted(false);
                  setStep(0);
                })
              }
              className="inline-flex items-center justify-center border border-white/[0.08] px-8 py-3.5 font-[Cinzel,serif] text-[8px] uppercase tracking-[0.3em] text-[#8A877E] transition-all duration-300 hover:border-[#C9A96E]/30 hover:text-[#C9A96E]"
            >
              Begin Another Brief
            </button>
          </div>
        </div>
      </motion.div>
    );
  }

  // ── FORM ───────────────────────────────────────────────────────────────────
  return (
    <div className="grid gap-0 xl:grid-cols-[280px_1fr]">
      {/* ── SIDEBAR ── */}
      <aside className="relative border border-white/[0.06] border-r-[#C9A96E]/14 bg-[#06050A]/70 xl:sticky xl:top-28 xl:self-start xl:max-h-[calc(100vh-7rem)] xl:overflow-y-auto xl:border-r">
        <span className="pointer-events-none absolute right-0 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-[#C9A96E]/15 to-transparent" />

        {/* brand */}
        <div className="border-b border-white/[0.05] px-7 py-7">
          <div className="mb-1 font-[Cinzel,serif] text-[22px] font-medium tracking-[0.18em] text-[#C9A96E] leading-none">
            AURUM
          </div>
          <div className="font-[Cinzel,serif] text-[7.5px] uppercase tracking-[0.55em] text-[#555247]">
            Private Commission
          </div>
        </div>

        {/* progress bar */}
        <div className="px-7 pt-5 pb-2">
          <div className="mb-2 flex items-center justify-between">
            <span className="font-[Cinzel,serif] text-[7.5px] uppercase tracking-[0.3em] text-[#4A4840]">
              Progress
            </span>
            <span className="font-[Cinzel,serif] text-[9px] tracking-[0.2em] text-[#C9A96E]/70">
              {current.number} / 05
            </span>
          </div>
          <div className="h-px w-full bg-white/[0.05]">
            <motion.div
              className="h-full bg-gradient-to-r from-[#C9A96E] to-[#C9A96E]/70"
              animate={{ width: `${progressPct}%` }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            />
          </div>
        </div>

        {/* nav */}
        <nav className="py-3">
          {steps.map((s, i) => (
            <NavItem
              key={s.id}
              step={s}
              active={i === step}
              done={completion[i]}
              onClick={() => goToStep(i)}
            />
          ))}
        </nav>

        <Ornament />

        {/* live dossier */}
        <div className="mx-5 mb-6 border border-[#C9A96E]/10 bg-gradient-to-br from-[#C9A96E]/[0.04] to-transparent p-4">
          <p className="mb-3.5 font-[Cinzel,serif] text-[7.5px] uppercase tracking-[0.38em] text-[#C9A96E]/55">
            Live Dossier
          </p>
          {[
            {
              k: "Model",
              v:
                form.model === "No preference"
                  ? "Open brief"
                  : form.model || "Open brief",
            },
            {
              k: "Material",
              v: form.metal === "Undecided" ? "—" : form.metal || "—",
            },
            {
              k: "Functions",
              v: form.complications.length
                ? form.complications.slice(0, 2).join(", ") +
                  (form.complications.length > 2
                    ? ` +${form.complications.length - 2}`
                    : "")
                : "—",
            },
          ].map((row) => (
            <div key={row.k} className="mb-3 last:mb-0">
              <div className="mb-0.5 font-[Cinzel,serif] text-[7px] uppercase tracking-[0.25em] text-[#3A3830]">
                {row.k}
              </div>
              <div className="font-[Cormorant_Garamond,serif] text-[14px] italic leading-tight text-[#F0ECE3]/75">
                {row.v}
              </div>
            </div>
          ))}
        </div>
      </aside>

      {/* ── MAIN PANEL ── */}
      <div className="relative flex flex-col border border-white/[0.06] bg-gradient-to-b from-white/[0.025] to-white/[0.01]">
        <span className="pointer-events-none absolute left-0 top-0 h-16 w-16 border-l border-t border-[#C9A96E]" />
        <span className="pointer-events-none absolute bottom-0 right-0 h-16 w-16 border-b border-r border-[#C9A96E]" />

        {/* chapter header */}
        <div className="relative border-b border-white/[0.05] px-8 py-9 md:px-12 lg:px-14">
          <p className="mb-3 font-[Cinzel,serif] text-[8px] uppercase tracking-[0.5em] text-[#C9A96E]/60">
            Chapter {current.number} / 05 — {current.subtitle}
          </p>
          <h2 className="mb-3 font-[Cormorant_Garamond,serif] text-[42px] font-light leading-[0.92] text-[#F0ECE3] md:text-[54px]">
            {current.title}
          </h2>
          <p className="max-w-[500px] font-[Cormorant_Garamond,serif] text-[15px] italic leading-[1.7] text-[#8A877E]">
            {current.desc}
          </p>
          <span className="absolute bottom-0 left-0 h-px w-full bg-white/[0.04]" />
          <motion.span
            className="absolute bottom-0 left-0 h-px bg-gradient-to-r from-transparent via-[#C9A96E]/70 to-transparent"
            animate={{ width: `${progressPct}%` }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          />
        </div>

        {/* chapter body */}
        <div className="flex-1 px-8 py-9 md:px-12 md:py-11 lg:px-14 lg:py-13">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* ── 01 PATRON ── */}
              {current.id === "patron" && (
                <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <FieldShell label="Full Name">
                        <input
                          value={form.name}
                          onChange={(e) => set("name", e.target.value)}
                          placeholder="Your name"
                          className={inputCls}
                        />
                      </FieldShell>
                      <FieldShell label="Email Address">
                        <input
                          type="email"
                          value={form.email}
                          onChange={(e) => set("email", e.target.value)}
                          placeholder="name@example.com"
                          className={inputCls}
                        />
                      </FieldShell>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <FieldShell label="City / Country">
                        <input
                          value={form.location}
                          onChange={(e) => set("location", e.target.value)}
                          placeholder="Istanbul, Türkiye"
                          className={inputCls}
                        />
                      </FieldShell>
                      <FieldShell
                        label="Who Is It For?"
                        hint="Self, partner, heirloom, gift..."
                      >
                        <input
                          value={form.wearer}
                          onChange={(e) => set("wearer", e.target.value)}
                          placeholder="Myself"
                          className={inputCls}
                        />
                      </FieldShell>
                    </div>
                  </div>
                  <InfoBox title="Why This Matters">
                    <p>
                      A watch for a collector reads differently from one
                      intended as a family marker or private celebration.
                    </p>
                    <p>
                      This chapter helps the atelier interpret how personal the
                      final object should feel — and who it should ultimately
                      belong to.
                    </p>
                  </InfoBox>
                </div>
              )}

              {/* ── 02 SILHOUETTE ── */}
              {current.id === "silhouette" && (
                <div className="space-y-0">
                  <SectionLabel>Model Family</SectionLabel>
                  <div className="grid grid-cols-2 gap-2 md:grid-cols-4 mb-0">
                    {modelFamilies.map((m) => (
                      <ModelTile
                        key={m.name}
                        model={m}
                        active={form.model === m.name}
                        onClick={() => set("model", m.name)}
                      />
                    ))}
                  </div>
                  <Ornament />
                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                    <FieldShell label="Wrist Size" hint="Measure snugly in cm">
                      <input
                        value={form.wrist}
                        onChange={(e) => set("wrist", e.target.value)}
                        placeholder="16.5 cm"
                        className={inputCls}
                      />
                    </FieldShell>
                    <FieldShell label="Desired Timeline">
                      <select
                        value={form.timeline}
                        onChange={(e) => set("timeline", e.target.value)}
                        className={inputCls}
                      >
                        {[
                          "Flexible",
                          "Within 3 months",
                          "Within 6 months",
                          "Heirloom pace",
                        ].map((o) => (
                          <option key={o} value={o} className="bg-[#0F0E12]">
                            {o}
                          </option>
                        ))}
                      </select>
                    </FieldShell>
                    <FieldShell label="Occasion">
                      <input
                        value={form.occasion}
                        onChange={(e) => set("occasion", e.target.value)}
                        placeholder="Daily, wedding, milestone..."
                        className={inputCls}
                      />
                    </FieldShell>
                  </div>
                </div>
              )}

              {/* ── 03 MATERIALITY ── */}
              {current.id === "materiality" && (
                <div className="grid gap-7 lg:grid-cols-2">
                  <div>
                    <SectionLabel>Case Material</SectionLabel>
                    <div className="space-y-1.5">
                      {metalOptions.map((m) => (
                        <Strip
                          key={m.label}
                          label={m.label}
                          note={m.note}
                          swatch={m.swatch}
                          active={form.metal === m.label}
                          onClick={() => set("metal", m.label)}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div>
                      <SectionLabel>Dial Mood</SectionLabel>
                      <div className="space-y-1.5">
                        {dialMoods.map((d) => (
                          <Strip
                            key={d.label}
                            label={d.label}
                            note={d.note}
                            active={form.dialMood === d.label}
                            onClick={() => set("dialMood", d.label)}
                          />
                        ))}
                      </div>
                    </div>
                    <div>
                      <SectionLabel>Strap / Bracelet</SectionLabel>
                      <div className="space-y-1.5">
                        {strapOptions.map((s) => (
                          <Strip
                            key={s.label}
                            label={s.label}
                            note={s.note}
                            active={form.strap === s.label}
                            onClick={() => set("strap", s.label)}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* ── 04 MECHANICS ── */}
              {current.id === "mechanics" && (
                <div className="grid gap-7 lg:grid-cols-[0.9fr_1.1fr]">
                  <div className="space-y-4">
                    <InfoBox title="Selection Note">
                      <p>
                        This is not a specification sheet. Choose only what
                        belongs emotionally and functionally to the wearer.
                      </p>
                      <p>
                        Leaving categories open lets the atelier recommend the
                        cleanest movement architecture for the commission.
                      </p>
                    </InfoBox>
                    <ReadbackPanel
                      title="Mechanical Read"
                      rows={[
                        {
                          k: "Selected functions",
                          v: form.complications.length
                            ? form.complications.join(", ")
                            : "No functions selected yet.",
                        },
                      ]}
                    />
                  </div>
                  <div>
                    <SectionLabel>Desired Functions</SectionLabel>
                    <div className="grid grid-cols-2 gap-2.5">
                      {complicationOptions.map((c) => (
                        <Capsule
                          key={c.code}
                          code={c.code}
                          label={c.label}
                          note={c.note}
                          active={form.complications.includes(c.label)}
                          onClick={() => toggleComp(c.label)}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* ── 05 SIGNATURE ── */}
              {current.id === "signature" && (
                <div className="grid gap-7 lg:grid-cols-[1.1fr_0.9fr]">
                  <div className="space-y-3">
                    <FieldShell label="References, Atmosphere, Story">
                      <textarea
                        rows={5}
                        value={form.references}
                        onChange={(e) => set("references", e.target.value)}
                        placeholder="Describe the mood, architecture, wardrobe, artworks, heirlooms, or watches that should inform the commission."
                        className={inputCls}
                      />
                    </FieldShell>
                    <FieldShell label="Engraving / Symbols">
                      <textarea
                        rows={3}
                        value={form.engraving}
                        onChange={(e) => set("engraving", e.target.value)}
                        placeholder="Initials, crest, dates, inscriptions, family marks..."
                        className={inputCls}
                      />
                    </FieldShell>
                    <FieldShell label="Anything Else The Atelier Should Know">
                      <textarea
                        rows={3}
                        value={form.notes}
                        onChange={(e) => set("notes", e.target.value)}
                        placeholder="Service expectations, gift notes, delivery context..."
                        className={inputCls}
                      />
                    </FieldShell>
                  </div>
                  <ReadbackPanel
                    title="Final Dossier"
                    rows={[
                      {
                        k: "Model family",
                        v:
                          form.model === "No preference"
                            ? "Open brief"
                            : form.model || "Open brief",
                      },
                      {
                        k: "Material",
                        v:
                          form.metal === "Undecided"
                            ? "Open to guidance"
                            : form.metal || "Open to guidance",
                      },
                      {
                        k: "Dial mood",
                        v: form.dialMood || "Open to guidance",
                      },
                      { k: "Strap", v: form.strap || "Open to guidance" },
                      {
                        k: "Functions",
                        v: form.complications.length
                          ? form.complications.join(", ")
                          : "Atelier to guide",
                      },
                    ]}
                  />
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── FOOTER NAV ── */}
        <div className="border-t border-white/[0.05] px-8 py-5 md:px-12 lg:px-14">
          {submitError && (
            <p className="mb-4 border border-[#C9A96E]/20 bg-[#C9A96E]/[0.055] px-4 py-3 font-[Cormorant_Garamond,serif] text-[14px] italic text-[#E3C789]">
              {submitError}
            </p>
          )}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            {/* step dots */}
            <div className="flex items-center gap-2">
              {steps.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => goToStep(i)}
                  className={`transition-all duration-300 ${
                    i === step
                      ? "h-[3px] w-5 bg-[#C9A96E]"
                      : completion[i]
                        ? "h-[3px] w-3 bg-[#C9A96E]/35"
                        : "h-[3px] w-3 bg-white/[0.08]"
                  }`}
                />
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                type="button"
                disabled={step === 0}
                onClick={() => goToStep(Math.max(step - 1, 0))}
                className="border border-white/[0.07] px-5 py-2.5 font-[Cinzel,serif] text-[8px] uppercase tracking-[0.28em] text-[#8A877E] transition-all duration-300 hover:border-[#C9A96E]/25 hover:text-[#C9A96E] disabled:pointer-events-none disabled:opacity-15"
              >
                Previous
              </button>

              {step === steps.length - 1 ? (
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative overflow-hidden bg-[#C9A96E] px-8 py-2.5 font-[Cinzel,serif] text-[8px] uppercase tracking-[0.28em] text-[#06050A] transition-colors duration-300 hover:bg-[#E8D4A0] disabled:pointer-events-none disabled:opacity-55"
                >
                  {isSubmitting ? "Sending Dossier..." : "Send Commission Brief"}
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={() => goToStep(Math.min(step + 1, steps.length - 1))}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-[#C9A96E] px-8 py-2.5 font-[Cinzel,serif] text-[8px] uppercase tracking-[0.28em] text-[#06050A] transition-colors duration-300 hover:bg-[#E8D4A0]"
                >
                  Continue
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
