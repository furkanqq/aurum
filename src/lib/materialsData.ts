export type MaterialCabinetSection = {
  id: string;
  eyebrow: string;
  title: string;
  note: string;
  accent: string;
  items: {
    label: string;
    detail: string;
    swatch?: string;
  }[];
};

export type SignatureHotspotId = "case" | "dial" | "hands" | "back";

export type SignatureHotspotBlueprint = {
  id: SignatureHotspotId;
  label: string;
  x: number;
  y: number;
};

export type SignatureProfile = {
  overview: string;
  palette: string[];
  specs: {
    label: string;
    value: string;
  }[];
  hotspots: Record<
    SignatureHotspotId,
    {
      title: string;
      kicker: string;
      body: string;
      bullets: string[];
    }
  >;
};

export const materialCabinet: MaterialCabinetSection[] = [
  {
    id: "metals",
    eyebrow: "Cabinet I",
    title: "Case Metals",
    note: "Each commission begins with the warmth, weight, and behavior of its metal.",
    accent: "#c2a46f",
    items: [
      {
        label: "Rose Gold",
        detail: "Soft ceremonial warmth for dress-led commissions.",
        swatch: "#9d6f60",
      },
      {
        label: "Frosted White Gold",
        detail: "Low-gloss brilliance with restrained flash on the wrist.",
        swatch: "#d8d8d4",
      },
      {
        label: "Platinum",
        detail: "Dense, quiet, and chosen when permanence matters more than shine.",
        swatch: "#b7bbc3",
      },
      {
        label: "Tempered Titanium",
        detail: "A lighter proposition for travel or sport-biased builds.",
        swatch: "#7f8e99",
      },
    ],
  },
  {
    id: "dials",
    eyebrow: "Cabinet II",
    title: "Dial Treatments",
    note: "Depth is built through surface, not color alone.",
    accent: "#d1b178",
    items: [
      {
        label: "Fired Enamel",
        detail: "Glass-like depth with a slightly ceremonial glow.",
      },
      {
        label: "Hand Guilloche",
        detail: "Engine-turned light play for the most classical references.",
      },
      {
        label: "Obsidian Lacquer",
        detail: "Dark polished fields that behave like stone at night.",
      },
      {
        label: "Radial Brushing",
        detail: "Controlled movement for sport and contemporary silhouettes.",
      },
    ],
  },
  {
    id: "straps",
    eyebrow: "Cabinet III",
    title: "Strap Atelier",
    note: "The watch meets the owner through leather, lining, and buckle language.",
    accent: "#b8896d",
    items: [
      {
        label: "Barenia Calf",
        detail: "Buttery, formal, and ideal for warm metal pairings.",
      },
      {
        label: "Shell Cordovan",
        detail: "Dense surface sheen with a long, beautiful aging curve.",
      },
      {
        label: "Nubuck Calf",
        detail: "Powdered softness for understated daily wear.",
      },
      {
        label: "Alligator Gloss",
        detail: "Reserved for ceremonial or heirloom-oriented commissions.",
      },
    ],
  },
  {
    id: "signatures",
    eyebrow: "Cabinet IV",
    title: "Personal Signatures",
    note: "Small authored details turn a model family into a singular object.",
    accent: "#b9bec7",
    items: [
      {
        label: "Monogram Ring",
        detail: "Discrete initials engraved into the inner chapter ring.",
      },
      {
        label: "Heraldic Crest",
        detail: "A personal or family device translated for the caseback.",
      },
      {
        label: "Commission Motto",
        detail: "Text hidden under the lugs or around the movement cover.",
      },
      {
        label: "Bespoke Typography",
        detail: "Custom numerals and date wheels drawn for one client only.",
      },
    ],
  },
];

export const signatureHotspotBlueprints: SignatureHotspotBlueprint[] = [
  { id: "case", label: "Case", x: 80, y: 48 },
  { id: "dial", label: "Dial", x: 35, y: 33 },
  { id: "hands", label: "Hands", x: 54, y: 45 },
  { id: "back", label: "Caseback", x: 31, y: 71 },
];

export const signatureProfiles: Record<string, SignatureProfile> = {
  "01": {
    overview:
      "Nocturne is the quiet dress proposition: thin case, darker dial field, and personal engraving hidden in the details.",
    palette: ["#c2a46f", "#11131a", "#2a2220"],
    specs: [
      { label: "Diameter", value: "38.5 mm" },
      { label: "Profile", value: "8.9 mm" },
      { label: "Signature", value: "Inner-ring monogram" },
    ],
    hotspots: {
      case: {
        title: "Hand-filed dress case",
        kicker: "Warm gold or frosted platinum",
        body:
          "The Nocturne case is pared back until the lugs almost disappear into the profile. Small metal changes completely shift its tone.",
        bullets: [
          "Slim stepped bezel proportions",
          "Hand-softened lug shoulders",
          "Low-polish sidewall for quieter reflection",
        ],
      },
      dial: {
        title: "Low-light dial architecture",
        kicker: "Lacquer, enamel, or smoked brushing",
        body:
          "Clients usually define Nocturne through darkness rather than complication. The dial finish decides whether it reads formal, romantic, or severe.",
        bullets: [
          "Deep black lacquer for tuxedo restraint",
          "Warm charcoal enamel for softer light",
          "Subtle minute track engraving",
        ],
      },
      hands: {
        title: "Needle hands with authored contrast",
        kicker: "Precise enough for black tie, distinct enough for memory",
        body:
          "The hands are tuned to the dial finish and the owner's eyesight. Length, polish, and lume discretion are chosen together.",
        bullets: [
          "Heat-blued or rhodium-finished options",
          "Long minute reach for crisp reading",
          "Optional ember seconds accent",
        ],
      },
      back: {
        title: "Private caseback inscription",
        kicker: "The most personal layer stays out of sight",
        body:
          "Nocturne commissions often hide the authored element on the reverse: dates, mottos, initials, or a short line of handwriting translated into engraving.",
        bullets: [
          "Circular brushed caseback field",
          "Hand-engraved monogram placement",
          "Optional presentation box plaque match",
        ],
      },
    },
  },
  "02": {
    overview:
      "Solstice leans classical: guilloche light play, calendar presence, and more ceremony around the dial furniture.",
    palette: ["#d5b07b", "#1a1410", "#70563e"],
    specs: [
      { label: "Diameter", value: "39.5 mm" },
      { label: "Complication", value: "Calendar display" },
      { label: "Signature", value: "Hand guilloche dial" },
    ],
    hotspots: {
      case: {
        title: "Ceremonial calendar case",
        kicker: "A little broader, never heavy",
        body:
          "Solstice needs enough wall height to frame calendar apertures without becoming bulky. The bezel ratio is tuned around that balance.",
        bullets: [
          "Broader polished bezel ring",
          "Curved lugs for dress cuffs",
          "Rose or yellow-toned metals suit it best",
        ],
      },
      dial: {
        title: "Engine-turned central field",
        kicker: "The dial is the commission",
        body:
          "Most Solstice clients start by selecting the guilloche rhythm. The rest of the watch follows that choice.",
        bullets: [
          "Basket, sunburst, or wave cuts",
          "Applied numerals or printed cartouches",
          "Calendar framing in matching tone",
        ],
      },
      hands: {
        title: "Leaf or lancette hands",
        kicker: "Chosen to complement the calendar architecture",
        body:
          "The hands can disappear elegantly or offer more period character. Solstice rewards slightly more ornament than the other families.",
        bullets: [
          "Leaf hands for softer romance",
          "Lancette for cleaner formalism",
          "Calendar pointer can carry a contrasting tip",
        ],
      },
      back: {
        title: "Signed movement cover",
        kicker: "A back plate made to echo the dial",
        body:
          "On Solstice, the caseback often repeats the front through guilloche, engraved typography, or a small crest cartouche.",
        bullets: [
          "Pattern continuation from dial to back",
          "Calendar date or dedication engraving",
          "Exhibition or solid back options",
        ],
      },
    },
  },
  "03": {
    overview:
      "Meridian is the sport-tailored family: more water confidence, sharper minute legibility, and a lighter feel on the wrist.",
    palette: ["#97b0ab", "#0f1718", "#5d7b78"],
    specs: [
      { label: "Diameter", value: "40.5 mm" },
      { label: "Bias", value: "Sport tailoring" },
      { label: "Signature", value: "Radial dial + bezel edge" },
    ],
    hotspots: {
      case: {
        title: "Travel-ready case profile",
        kicker: "Balanced for strength, not aggression",
        body:
          "Meridian allows stronger shoulders and a more pronounced crown guard while keeping proportions refined enough for tailoring.",
        bullets: [
          "Tempered titanium or white gold",
          "Sharpened bezel knurl option",
          "Integrated strap balance at the lugs",
        ],
      },
      dial: {
        title: "Legibility-first dial",
        kicker: "Texture used for speed of reading",
        body:
          "The Meridian dial is built around contrast and minute clarity. Surfaces are selected to stay articulate in daylight and movement.",
        bullets: [
          "Radial brushing for shifting light",
          "High-contrast chapter ring",
          "Restrained lume for night travel",
        ],
      },
      hands: {
        title: "Extended sport hands",
        kicker: "Longer reach, stronger edge",
        body:
          "These hands run closer to the track and can take on lume or brighter polishing without feeling theatrical.",
        bullets: [
          "Skeletonized hour option",
          "Bright polished minute hand",
          "Seconds hand balanced for sweep clarity",
        ],
      },
      back: {
        title: "Tool-watch rear signature",
        kicker: "Personal but still disciplined",
        body:
          "The back is where Meridian owners usually specify travel codes, co-ordinates, or a pared-back family mark.",
        bullets: [
          "Deep relief engraving handles wear well",
          "Optional world-city inner ring",
          "Serial plate matched to travel case",
        ],
      },
    },
  },
  "04": {
    overview:
      "Aeternum exposes more of the mechanics. It is selected by clients who want the movement to become part of the visual language.",
    palette: ["#dec07d", "#15110f", "#7c6543"],
    specs: [
      { label: "Diameter", value: "41 mm" },
      { label: "Bias", value: "Open balance" },
      { label: "Signature", value: "Visible regulator architecture" },
    ],
    hotspots: {
      case: {
        title: "Architectural complication case",
        kicker: "Built to frame negative space",
        body:
          "Aeternum cases are slightly more assertive so the open balance never feels squeezed. The metal finish is what keeps the result elegant.",
        bullets: [
          "Broader chapter opening",
          "Satin caseband to calm the complexity",
          "Yellow gold and platinum both read well",
        ],
      },
      dial: {
        title: "Openworked dial bridges",
        kicker: "Mechanics treated as ornament",
        body:
          "Instead of stacking more display information, Aeternum opens the dial and lets the bridge finishing do the talking.",
        bullets: [
          "Partial or full aperture options",
          "Bridge striping or frosting",
          "Contrasting chapter ring keeps balance",
        ],
      },
      hands: {
        title: "Minimal hands, maximum contrast",
        kicker: "They must read above mechanical theatre",
        body:
          "With more movement visible below, the hands are pared back and lengthened to hold authority over the composition.",
        bullets: [
          "Thin profile to avoid blocking the bridge",
          "High-polish chamfer for light pickup",
          "Seconds kept discreet or omitted entirely",
        ],
      },
      back: {
        title: "Movement portrait on the reverse",
        kicker: "Clients often spend most time here",
        body:
          "The reverse of Aeternum becomes a study in finishing: bevels, screws, engraved plates, and hidden messages around the edge.",
        bullets: [
          "Hand-applied anglage highlight",
          "Dedicated bridge inscription zone",
          "Sapphire back with halo engraving",
        ],
      },
    },
  },
  "05": {
    overview:
      "Vesper is the warmest family in the cabinet: satin rose tones, softened light, and restrained heirloom references.",
    palette: ["#c48b7a", "#1b1012", "#7f5a4c"],
    specs: [
      { label: "Diameter", value: "37.8 mm" },
      { label: "Bias", value: "Rose gold signature" },
      { label: "Signature", value: "Soft satin finish" },
    ],
    hotspots: {
      case: {
        title: "Soft-edge rose case",
        kicker: "Designed to glow instead of flash",
        body:
          "Vesper uses softened corners, satin shoulders, and rose-toned metals to create a more intimate, heirloom-led presence.",
        bullets: [
          "Rose gold is the house default",
          "Satin top with polished bevel pairing",
          "Shorter lug span for compact wrists",
        ],
      },
      dial: {
        title: "Powdered warmth on the dial",
        kicker: "Texture chosen around wardrobe and skin tone",
        body:
          "Vesper commissions often start with color families and textile references. The dial is used like fabric, not just machinery.",
        bullets: [
          "Champagne, blush, or smoked taupe tones",
          "Fine-grain brushed surfaces",
          "Minimal text for calmer balance",
        ],
      },
      hands: {
        title: "Jewelled proportioning",
        kicker: "Delicacy without fragility",
        body:
          "The hand set is slightly shorter and more tapered, giving Vesper a gentler read without losing the technical rigor of the other families.",
        bullets: [
          "Tapered leaf profiles",
          "Optional stone-set counterweight",
          "Rose or champagne finishing",
        ],
      },
      back: {
        title: "Heirloom story plate",
        kicker: "Where family references usually land",
        body:
          "Vesper is where clients most often request lineage details: initials, dates, or symbols that link the watch to a gift or inheritance.",
        bullets: [
          "Handwritten inscription translation",
          "Crest softened into ornamental linework",
          "Presentation date hidden under the strap",
        ],
      },
    },
  },
  "06": {
    overview:
      "Monarch is the grand atelier family: custom typography, crest work, and the strongest sense of authorship across the watch.",
    palette: ["#bfc4ce", "#121419", "#7a838f"],
    specs: [
      { label: "Diameter", value: "41.5 mm" },
      { label: "Bias", value: "Grand atelier" },
      { label: "Signature", value: "Bespoke crest and type" },
    ],
    hotspots: {
      case: {
        title: "Ceremonial grand case",
        kicker: "The most formal metal architecture in the house",
        body:
          "Monarch carries the broadest stance in the collection. It is built for private clients who want heraldic cues and more visual authority.",
        bullets: [
          "Platinum or white gold preferred",
          "Tall polished bezel ring",
          "Optional engraved lug underside",
        ],
      },
      dial: {
        title: "Authored dial typography",
        kicker: "Letters and numerals drawn for one watch",
        body:
          "Monarch commissions often move beyond choosing a font. We redraw the dial language so the watch cannot be mistaken for another reference.",
        bullets: [
          "Custom numeral family",
          "Bespoke wordmark or cartouche",
          "Heraldic chapter ring markers",
        ],
      },
      hands: {
        title: "Formal hand-set tuning",
        kicker: "Precision balanced against grandeur",
        body:
          "The hands stay disciplined so the custom typography remains the headline. Their role is to punctuate, not dominate.",
        bullets: [
          "Long sword-hand variants",
          "Dark rhodium for contrast on pale dials",
          "Counterweighted seconds for courtly symmetry",
        ],
      },
      back: {
        title: "Full crest caseback",
        kicker: "A watch signed like a seal",
        body:
          "The reverse of Monarch is usually where the heraldic story lands in full: crest, motto, serial text, and a date worth keeping.",
        bullets: [
          "Relief-engraved crest plate",
          "Motto ring in bespoke typography",
          "Movement bridge initials if desired",
        ],
      },
    },
  },
};

export const commissionVocabulary = [
  {
    id: "structure",
    eyebrow: "Layer 01",
    title: "Structure",
    text: "Diameter, profile, lug stance, crown feel, and water-readiness are set before surface detail is discussed.",
  },
  {
    id: "tone",
    eyebrow: "Layer 02",
    title: "Tone",
    text: "Metal warmth, dial treatment, numeral language, and strap finish establish the emotional character of the piece.",
  },
  {
    id: "signature",
    eyebrow: "Layer 03",
    title: "Signature",
    text: "Monograms, caseback inscriptions, heraldry, or bespoke typography transform the watch from model family to authored object.",
  },
];

export const atelierAssurances = [
  "Every brief is reviewed privately before an estimate is discussed.",
  "Material and engraving decisions are translated into a formal proposal dossier.",
  "Long-term servicing and documentation remain part of the commission, not an afterthought.",
];
