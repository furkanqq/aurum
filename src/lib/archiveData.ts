import { watchFamilies } from "@/lib/watchData";

export type ArchiveFilter = "All" | "Gallery Frames" | "Model Studies";

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

const galleryEntries: ArchiveEntry[] = [
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
];

const modelEntries: ArchiveEntry[] = watchFamilies.map((watch, index) => ({
  id: `model-${watch.id}`,
  title: `${watch.name} Study`,
  eyebrow: `Model ${watch.id}`,
  family: watch.name,
  image: watch.modelImage,
  source: "Model Studies",
  focus: watch.line,
  note:
    index % 2 === 0
      ? `A clean silhouette plate for the ${watch.name} family, used to show proportion, metal tone, and the overall attitude of the commission.`
      : `A model sheet view of ${watch.name}, intended to make the family legible before the brief turns into specific finishing and signature choices.`,
  fit: "contain",
  accent: watch.highlight,
}));

export const archiveEntries: ArchiveEntry[] = [...galleryEntries, ...modelEntries];

export const archiveFilters: ArchiveFilter[] = [
  "All",
  "Gallery Frames",
  "Model Studies",
];

export const homeArchiveEntries = archiveEntries.slice(0, 6);
