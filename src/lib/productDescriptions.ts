export type ProductDescription = {
  shortDescription: string;
  overview: string;
  researchBackground: string;
  areasOfInterest: string[];
  specifications: {
    purity: string;
    quantity: string;
    appearance: string;
    sequence: string;
    storage: string;
    shipping: string;
  };
  storageInstructions: string;
  disclaimer: string;
};

const DISCLAIMER =
  "All products are offered solely for research and development purposes and are not for human or animal consumption, medical, or therapeutic use. Products are not intended to diagnose, treat, cure, or prevent any disease, and statements on this site have not been evaluated by the U.S. Food and Drug Administration.";

export const productDescriptions: Record<string, ProductDescription> = {
  retatrutide: {
    shortDescription:
      "Triple agonist peptide targeting GIP, GLP-1, and glucagon receptors — of significant interest in metabolic and energy homeostasis research.",
    overview:
      "Retatrutide (LY3437943) is a synthetic peptide and triple incretin receptor agonist that simultaneously targets the glucose-dependent insulinotropic polypeptide (GIP), glucagon-like peptide-1 (GLP-1), and glucagon receptors. Developed to investigate the intersecting roles of these three receptor pathways, Retatrutide has drawn considerable attention from the metabolic research community for its distinct pharmacological profile and receptor binding characteristics.",
    researchBackground:
      "Incretin-based signaling pathways have been a focal point of metabolic science for decades. While single and dual agonists have been widely studied, the simultaneous modulation of three receptor systems — GIP, GLP-1, and glucagon — represents an emerging frontier. Early-phase research has explored Retatrutide's pharmacokinetic behavior and receptor binding affinity profiles, with investigators examining how the coordination of these pathways may influence energy balance signaling, lipid metabolism, and insulin-independent glucose regulation in preclinical models.",
    areasOfInterest: [
      "Triple incretin receptor agonism and downstream signaling cascades",
      "Energy homeostasis and metabolic rate regulation in in vitro and in vivo models",
      "Lipid metabolism and adipogenesis pathway studies",
      "Comparative receptor binding affinity profiling (GIP vs. GLP-1 vs. glucagon)",
      "Dose-response modeling in non-clinical metabolic research frameworks",
    ],
    specifications: {
      purity: "≥98% (HPLC verified)",
      quantity: "5mg / 10mg",
      appearance: "Lyophilized white powder",
      sequence: "GIP/GLP-1/glucagon triple agonist — LY3437943 sequence",
      storage: "-20°C recommended; avoid repeated freeze-thaw cycles",
      shipping: "Cold-packed when necessary",
    },
    storageInstructions:
      "Store lyophilized peptide at -20°C in a sealed, moisture-protected container. Once reconstituted, maintain at 4°C and use within 5–7 days. Avoid exposure to direct light, heat, or repeated freeze-thaw cycles, which may reduce structural integrity.",
    disclaimer: DISCLAIMER,
  },

  "melanotan-ii": {
    shortDescription:
      "Cyclic lactam analogue of α-MSH studied for its interactions with melanocortin receptor subtypes in pigmentation and CNS pathway research.",
    overview:
      "Melanotan II (MT-II) is a synthetic cyclic heptapeptide analogue of alpha-melanocyte-stimulating hormone (α-MSH). It exhibits potent, non-selective agonism across multiple melanocortin receptor (MCR) subtypes, particularly MC1R, MC3R, MC4R, and MC5R. This broad receptor activity profile makes Melanotan II a widely referenced tool compound in receptor pharmacology and neuroendocrine research settings.",
    researchBackground:
      "The melanocortin system plays diverse roles across mammalian biology, including pigmentation regulation, energy balance, reproductive behavior, and immune modulation. As a structural analogue of α-MSH with enhanced stability due to its cyclic lactam bridge, MT-II has been employed in preclinical models to probe MCR-mediated signaling. Research has characterized its receptor binding kinetics, G-protein coupling efficiency, and downstream cAMP activation in multiple tissue and cell line contexts.",
    areasOfInterest: [
      "Melanocortin receptor subtype binding and selectivity studies (MC1R–MC5R)",
      "Pigmentation pathway signaling and eumelanin synthesis research",
      "Central nervous system melanocortin circuit mapping",
      "Neuroendocrine and autonomic signaling model development",
      "Comparative pharmacology of α-MSH analogues in receptor assay panels",
    ],
    specifications: {
      purity: "≥98% (HPLC verified)",
      quantity: "10mg",
      appearance: "Lyophilized white powder",
      sequence: "Ac-Nle-cyclo[Asp-His-D-Phe-Arg-Trp-Lys]-NH₂",
      storage: "-20°C recommended; protect from moisture and light",
      shipping: "Cold-packed when necessary",
    },
    storageInstructions:
      "Store lyophilized MT-II at -20°C in airtight, desiccated conditions. Reconstitute using sterile water or appropriate buffer. Once in solution, store at 4°C and use within 5–7 days. Minimize exposure to light and do not subject to repeated freeze-thaw cycles.",
    disclaimer: DISCLAIMER,
  },

  ipamorelin: {
    shortDescription:
      "Selective growth hormone secretagogue pentapeptide used to study pituitary GH release pathways with a favorable receptor selectivity profile.",
    overview:
      "Ipamorelin is a synthetic pentapeptide and selective growth hormone secretagogue receptor (GHSR-1a) agonist. Distinguished by its high receptor selectivity, Ipamorelin stimulates growth hormone release from pituitary somatotrophs with minimal documented cross-reactivity toward cortisol, prolactin, or ACTH secretion at standard research concentrations. This selectivity has made it a preferred tool compound in growth hormone axis research.",
    researchBackground:
      "The growth hormone secretagogue receptor (GHSR-1a) pathway is central to the pulsatile regulation of somatotropic function. Ipamorelin's pentapeptide structure and clean binding profile have made it a valuable reference compound for researchers mapping GH release dynamics in preclinical models. Studies have characterized its dose-response kinetics, half-life behavior, and synergistic potential when combined with GHRH analogues such as CJC-1295 in in vitro and animal model contexts.",
    areasOfInterest: [
      "GHSR-1a receptor binding, selectivity, and activation kinetics",
      "Pituitary somatotroph secretory dynamics and GH pulse modeling",
      "IGF-1 axis regulation and downstream anabolic signaling pathways",
      "Combination secretagogue studies with GHRH analogues",
      "Receptor occupancy and dose-response modeling in preclinical assays",
    ],
    specifications: {
      purity: "≥98% (HPLC verified)",
      quantity: "5mg / 10mg",
      appearance: "Lyophilized white powder",
      sequence: "Aib-His-D-2-Nal-D-Phe-Lys-NH₂",
      storage: "-20°C recommended; avoid freeze-thaw cycling",
      shipping: "Cold-packed when necessary",
    },
    storageInstructions:
      "Store lyophilized Ipamorelin at -20°C, sealed against moisture. Reconstitute in sterile water or a compatible aqueous buffer. Use within 5–7 days of reconstitution when stored at 4°C. Avoid light exposure and multiple freeze-thaw cycles to preserve peptide integrity.",
    disclaimer: DISCLAIMER,
  },

  "cjc-1295": {
    shortDescription:
      "Long-acting GHRH analogue with DAC modification, used to study sustained somatotropic axis activation in preclinical research models.",
    overview:
      "CJC-1295 is a synthetic 30-amino acid peptide analogue of growth hormone-releasing hormone (GHRH) modified with a drug affinity complex (DAC) technology. This modification enables covalent binding to circulating albumin, significantly extending its plasma half-life compared to native GHRH. CJC-1295 is widely used as a tool compound for investigating prolonged GHRH receptor stimulation and its downstream effects on somatotropic signaling.",
    researchBackground:
      "Native GHRH has a very short half-life due to rapid enzymatic cleavage by dipeptidyl peptidase IV (DPP-IV). CJC-1295's DAC modification addresses this limitation, making it a durable GHRH receptor agonist suitable for sustained stimulation protocols in research settings. Studies have utilized CJC-1295 to examine extended GH secretion dynamics, pulsatile release patterns, and the IGF-1 axis response to prolonged receptor activation in animal models and cell-based assay systems.",
    areasOfInterest: [
      "Prolonged GHRH receptor activation and downstream somatotropic signaling",
      "Albumin-binding technology and extended peptide half-life modeling",
      "GH pulse dynamics and IGF-1 axis response in preclinical models",
      "DPP-IV cleavage resistance mechanisms in peptide drug design research",
      "Synergistic protocols combining GHRH analogues with GH secretagogues",
    ],
    specifications: {
      purity: "≥98% (HPLC verified)",
      quantity: "5mg / 10mg",
      appearance: "Lyophilized white powder",
      sequence: "GHRH(1-29) analogue with DAC modification",
      storage: "-20°C recommended; protect from humidity",
      shipping: "Cold-packed when necessary",
    },
    storageInstructions:
      "Store lyophilized CJC-1295 at -20°C in a tightly sealed, desiccated container. Reconstitute with sterile bacteriostatic water. Once in solution, store at 4°C and use within 7–10 days. Avoid repeated freeze-thaw cycles and direct light exposure to maintain structural fidelity.",
    disclaimer: DISCLAIMER,
  },

  "ghk-cu": {
    shortDescription:
      "Copper-binding tripeptide naturally occurring in human plasma, studied for cellular signaling, extracellular matrix remodeling, and regenerative biology research.",
    overview:
      "GHK-Cu (Glycine-Histidine-Lysine : Copper) is a naturally occurring copper-binding tripeptide first isolated from human plasma. It demonstrates a strong affinity for copper(II) ions, forming a stable complex that participates in a range of cellular processes. GHK-Cu has been identified in plasma, saliva, and urine, and is a broadly studied research compound in the fields of cell biology, wound healing science, and extracellular matrix biology.",
    researchBackground:
      "GHK-Cu has attracted sustained scientific interest due to its pleiotropic biological activity profile. Research has documented its influence on fibroblast proliferation, collagen and glycosaminoglycan synthesis, matrix metalloproteinase regulation, and antioxidant enzyme expression. Gene expression analyses suggest GHK-Cu may interact with pathways involving hundreds of genes associated with cellular maintenance, anti-inflammatory signaling, and regenerative processes. Its copper-chelating properties are also studied in the context of oxidative stress biology.",
    areasOfInterest: [
      "Extracellular matrix remodeling and collagen synthesis pathway research",
      "Fibroblast activation, proliferation, and wound healing models",
      "Copper(II) chelation and metallopeptide biochemistry studies",
      "Antioxidant and anti-inflammatory signaling pathway analysis",
      "Gene expression modulation profiling in cell culture systems",
    ],
    specifications: {
      purity: "≥98% (HPLC verified)",
      quantity: "50mg / 100mg",
      appearance: "Lyophilized blue-green powder (copper complex)",
      sequence: "Gly-His-Lys : Cu²⁺",
      storage: "-20°C recommended; protect from light and oxidation",
      shipping: "Cold-packed when necessary",
    },
    storageInstructions:
      "Store lyophilized GHK-Cu at -20°C in an airtight container away from light. The copper complex is sensitive to oxidation; minimize exposure to air during handling. Once reconstituted, store at 4°C and use within 5–7 days. Do not subject to repeated freeze-thaw cycles.",
    disclaimer: DISCLAIMER,
  },

  "bpc-157": {
    shortDescription:
      "Stable gastric pentadecapeptide fragment studied for its roles in angiogenesis, nitric oxide pathway modulation, and tissue response research.",
    overview:
      "BPC-157 (Body Protection Compound-157) is a synthetic pentadecapeptide consisting of 15 amino acids, derived from a partial sequence of human gastric juice protein BPC. It is notable for its high stability in aqueous environments, including human gastric juice, which distinguishes it from many other research peptides. BPC-157 has been the subject of extensive preclinical investigation due to its consistent activity across a variety of tissue and organ system models.",
    researchBackground:
      "BPC-157 has been investigated in a broad range of preclinical models involving gastrointestinal, musculoskeletal, and vascular tissues. Research has characterized its apparent influence on nitric oxide (NO) synthesis pathways, angiogenesis induction via VEGF signaling, and modulation of growth factor expression including EGF and FGF receptors. Studies have also explored its interactions with the dopaminergic and serotonergic systems in CNS research contexts. Its aqueous stability makes it particularly well-suited for in vivo preclinical study designs.",
    areasOfInterest: [
      "Nitric oxide pathway modulation and eNOS activation research",
      "Angiogenesis and VEGF-driven vascular remodeling studies",
      "Gastrointestinal tissue cytoprotection pathway analysis",
      "Tendon, ligament, and connective tissue repair modeling",
      "Neurotrophic and neurochemical modulation in CNS preclinical frameworks",
    ],
    specifications: {
      purity: "≥98% (HPLC verified)",
      quantity: "5mg / 10mg",
      appearance: "Lyophilized white powder",
      sequence: "Gly-Glu-Pro-Pro-Pro-Gly-Lys-Pro-Ala-Asp-Asp-Ala-Gly-Leu-Val",
      storage: "-20°C recommended; stable at room temperature short-term",
      shipping: "Cold-packed when necessary",
    },
    storageInstructions:
      "Store lyophilized BPC-157 at -20°C for long-term stability. Unlike many peptides, BPC-157 demonstrates relative stability in aqueous solution, though refrigeration at 4°C is recommended post-reconstitution. Use reconstituted solution within 7 days. Avoid exposure to direct light and heat.",
    disclaimer: DISCLAIMER,
  },

  "bac-water": {
    shortDescription:
      "Pharmaceutical-grade bacteriostatic water with 0.9% benzyl alcohol — the standard laboratory solvent for reconstituting lyophilized research peptides.",
    overview:
      "Bacteriostatic Water for Injection (Bac Water) is sterile water containing 0.9% (9mg/mL) benzyl alcohol as a bacteriostatic preservative. It is the standard laboratory solvent used to reconstitute lyophilized peptides and protein compounds for research use. The benzyl alcohol additive inhibits microbial growth, allowing the reconstituted solution to remain viable for multiple uses over an extended period compared to single-use sterile water.",
    researchBackground:
      "Proper reconstitution of lyophilized research peptides is essential for maintaining compound integrity and experimental reproducibility. Bacteriostatic water has been the established standard for this purpose due to its compatibility with a wide range of peptide sequences, its antimicrobial properties, and its well-characterized behavior in laboratory settings. Its benzyl alcohol concentration is calibrated to preserve peptide stability while preventing contamination in multi-use vial protocols.",
    areasOfInterest: [
      "Standard reconstitution vehicle for lyophilized research peptides",
      "Multi-use vial compatibility and contamination prevention in lab workflows",
      "Peptide solubility and stability testing in aqueous environments",
      "Comparative solvent evaluation in peptide formulation research",
      "General laboratory preparation of research-grade solutions",
    ],
    specifications: {
      purity: "USP-grade, sterile filtered",
      quantity: "30mL vial",
      appearance: "Clear, colorless aqueous solution",
      sequence: "Sterile Water for Injection + 0.9% Benzyl Alcohol (USP)",
      storage: "Room temperature (15–30°C); protect from freezing",
      shipping: "Standard shipping; no cold-pack required",
    },
    storageInstructions:
      "Store at controlled room temperature between 15–30°C. Do not freeze. Keep out of direct sunlight. Once opened, the bacteriostatic preservative maintains solution integrity for up to 28 days under proper storage conditions. Discard if the solution appears discolored or particulate matter is visible.",
    disclaimer: DISCLAIMER,
  },

  "glp-3": {
    shortDescription:
      "GLP-3 related peptide for metabolic research workflows.",
    overview: "GLP-3 related peptide for metabolic research workflows.",
    researchBackground: "",
    areasOfInterest: [],
    specifications: {
      purity: "≥98%",
      quantity: "5mg",
      appearance: "Lyophilized white powder",
      sequence: "N/A",
      storage: "-20°C recommended",
      shipping: "Cold-packed when necessary",
    },
    storageInstructions: "",
    disclaimer: DISCLAIMER,
  },
};

export function getProductDescription(slug: string, dbDescription?: string | null): string {
  if (dbDescription && dbDescription.trim().length > 0) {
    return dbDescription;
  }
  return productDescriptions[slug]?.shortDescription ?? "Research-use product for controlled laboratory workflows.";
}

export function getFullProductDescription(slug: string): ProductDescription | null {
  return productDescriptions[slug] ?? null;
}
