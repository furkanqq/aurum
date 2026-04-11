export type CommissionBrief = {
  name: string;
  email: string;
  location: string;
  wearer: string;
  model: string;
  wrist: string;
  timeline: string;
  occasion: string;
  metal: string;
  dialMood: string;
  strap: string;
  references: string;
  engraving: string;
  notes: string;
  complications: string[];
};

export const commissionPdfSections: {
  title: string;
  rows: { label: string; key: keyof CommissionBrief }[];
}[] = [
  {
    title: "Patron Profile",
    rows: [
      { label: "Full Name", key: "name" },
      { label: "Email Address", key: "email" },
      { label: "City / Country", key: "location" },
      { label: "Who Is It For", key: "wearer" },
    ],
  },
  {
    title: "Silhouette",
    rows: [
      { label: "Model Family", key: "model" },
      { label: "Wrist Size", key: "wrist" },
      { label: "Desired Timeline", key: "timeline" },
      { label: "Occasion", key: "occasion" },
    ],
  },
  {
    title: "Materiality",
    rows: [
      { label: "Case Material", key: "metal" },
      { label: "Dial Mood", key: "dialMood" },
      { label: "Strap / Bracelet", key: "strap" },
    ],
  },
  {
    title: "Mechanical Intent",
    rows: [{ label: "Desired Functions", key: "complications" }],
  },
  {
    title: "Signature Notes",
    rows: [
      { label: "References, Atmosphere, Story", key: "references" },
      { label: "Engraving / Symbols", key: "engraving" },
      { label: "Additional Notes", key: "notes" },
    ],
  },
];
