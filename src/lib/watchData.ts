export type WatchFamily = {
  id: string;
  name: string;
  line: string;
  commission: string;
  desc: string;
  accent: string;
  highlight: string;
  modelImage: string;
  features: string[];
};

export const watchFamilies: WatchFamily[] = [
  {
    id: "01",
    name: "Nocturne",
    line: "Dress Signature",
    commission: "Private Commission",
    desc: "A slim formal watch tailored around your preferred metal, dial tone, and personal engraving language.",
    accent: "#11131a",
    highlight: "#c2a46f",
    modelImage: "/models/Nocturne.png",
    features: ["Dial Palette", "Case Metal", "Personal Engraving"],
  },
  {
    id: "02",
    name: "Solstice",
    line: "Classic Calendar",
    commission: "Calendar Brief",
    desc: "Warm guilloche surfaces and calendar details composed to feel either restrained and formal or richly ceremonial.",
    accent: "#1a1410",
    highlight: "#d5b07b",
    modelImage: "/models/Solstice.png",
    features: ["Guilloche Pattern", "Applied Numerals", "Calendar Layout"],
  },
  {
    id: "03",
    name: "Meridian",
    line: "Sport Tailoring",
    commission: "Wrist-Fit Build",
    desc: "A sport silhouette commissioned around wrist size, bezel language, and water-ready finishing without losing refinement.",
    accent: "#0f1718",
    highlight: "#97b0ab",
    modelImage: "/models/Meridian.png",
    features: ["Case Diameter", "Bezel Finish", "Strap System"],
  },
  {
    id: "04",
    name: "Aeternum",
    line: "Open Balance",
    commission: "Complication Brief",
    desc: "An architectural dial with visible mechanics, specified around your appetite for drama, symmetry, and precious metals.",
    accent: "#15110f",
    highlight: "#dec07d",
    modelImage: "/models/Aeternum.png",
    features: ["Openworked Dial", "Bridge Finish", "Precious Metal Case"],
  },
  {
    id: "05",
    name: "Vesper",
    line: "Rose Gold Signature",
    commission: "Personal Palette",
    desc: "Soft rose tones, satin shadows, and restrained detailing shaped to the client's wardrobe and heirloom references.",
    accent: "#1b1012",
    highlight: "#c48b7a",
    modelImage: "/models/Vesper.png",
    features: ["Rose Tone Selection", "Surface Finish", "Heirloom Motifs"],
  },
  {
    id: "06",
    name: "Monarch",
    line: "Grand Atelier",
    commission: "Heirloom Spec",
    desc: "Our most ceremonial family, conceived for private clients wanting bespoke typography, heraldry, and authored dial architecture.",
    accent: "#121419",
    highlight: "#bfc4ce",
    modelImage: "/models/Monarch.png",
    features: ["Custom Crest", "Dial Typography", "Caseback Inscription"],
  },
];

export const watchCountLabel = String(watchFamilies.length).padStart(2, "0");
