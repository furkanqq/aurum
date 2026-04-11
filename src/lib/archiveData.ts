export type ArchiveFilter = "All" | "Gallery Frames";

export type ArchiveEntry = {
  id: string;
  title: string;
  eyebrow: string;
  family: string;
  image: string;
  source: Exclude<ArchiveFilter, "All">;
  focus: string;
  note: string;
  fit: "cover" | "contain";
  accent: string;
};

export const archiveEntries: ArchiveEntry[] = [
  {
    id: "archive-01",
    title: "Open Balance Study",
    eyebrow: "Frame 01",
    family: "Aeternum",
    image: "/gallery/watch1.png",
    source: "Gallery Frames",
    focus: "Visible regulator architecture",
    note:
      "A smoked green dial opening onto the balance and gear train. Used here as a portrait of mechanical depth rather than a catalog image.",
    fit: "cover",
    accent: "#c2a46f",
  },
  {
    id: "archive-02",
    title: "Workshop Noir Portrait",
    eyebrow: "Frame 02",
    family: "Nocturne",
    image: "/gallery/watch2.png",
    source: "Gallery Frames",
    focus: "Black dial restraint",
    note:
      "A dark dial study photographed against bench tools, showing how a formal watch can still feel technical and workshop-born.",
    fit: "cover",
    accent: "#bfc4ce",
  },
  {
    id: "archive-03",
    title: "Rose Signature Portrait",
    eyebrow: "Frame 03",
    family: "Vesper",
    image: "/gallery/watch3.png",
    source: "Gallery Frames",
    focus: "Warm metal + burgundy strap",
    note:
      "A softer heirloom-led composition that frames rose metal, date window placement, and a more intimate leather pairing.",
    fit: "cover",
    accent: "#c48b7a",
  },
  {
    id: "archive-04",
    title: "Heirloom Wrist Study",
    eyebrow: "Frame 04",
    family: "Monarch",
    image: "/gallery/watch4.png",
    source: "Gallery Frames",
    focus: "Heraldic case engraving",
    note:
      "A ceremonial wrist shot focused on crest work, engraved surfaces, and the more authored tone of the grand atelier line.",
    fit: "cover",
    accent: "#d5b07b",
  },
  {
    id: "archive-05",
    title: "Champagne Bench Portrait",
    eyebrow: "Frame 05",
    family: "Solstice",
    image: "/gallery/watch5.png",
    source: "Gallery Frames",
    focus: "Gold dial texture",
    note:
      "A clean bench composition centered on light, dial grain, and the contrast between pale metal and worn brown leather.",
    fit: "cover",
    accent: "#dec07d",
  },
  {
    id: "archive-06",
    title: "Regulator Light Study",
    eyebrow: "Frame 06",
    family: "Meridian",
    image: "/gallery/watch6.png",
    source: "Gallery Frames",
    focus: "Technical surfaces under warm light",
    note:
      "A close editorial frame used to show how brushed metal, crystal reflection, and dial depth behave away from flat catalog lighting.",
    fit: "cover",
    accent: "#aeb8c4",
  },
  {
    id: "archive-07",
    title: "Private Desk Composition",
    eyebrow: "Frame 07",
    family: "Nocturne",
    image: "/gallery/watch7.png",
    source: "Gallery Frames",
    focus: "Commission atmosphere",
    note:
      "A quieter desk composition that makes the watch feel personal before it feels commercial, useful for tone-setting a private brief.",
    fit: "cover",
    accent: "#b39b72",
  },
  {
    id: "archive-08",
    title: "Casework Reflection",
    eyebrow: "Frame 08",
    family: "Aurum Atelier",
    image: "/gallery/watch8.png",
    source: "Gallery Frames",
    focus: "Case geometry and finishing",
    note:
      "A finishing-led frame focused on silhouette, reflection, and the small shifts in metal tone that separate a commission from a render.",
    fit: "cover",
    accent: "#d4b37a",
  },
];

export const archiveFilters: ArchiveFilter[] = ["All", "Gallery Frames"];

export const homeArchiveEntries = archiveEntries;
