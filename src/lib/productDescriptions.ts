export const productDescriptionsBySlug: Record<string, string> = {
  "retatrutide": "Retatrutide for metabolism and appetite pathway research.",
  "melanotan-ii": "Melanotan II for receptor and pigmentation pathway studies.",
  "ipamorelin": "Ipamorelin for growth hormone signaling research.",
  "cjc-1295": "CJC-1295 for endocrine timing and peptide signaling research.",
  "ghk-cu": "GHK-Cu for cellular recovery and regeneration models.",
  "glp-3": "GLP-3 related peptide for metabolic research workflows.",
  "bpc-157": "BPC-157 for tissue response and repair pathway research.",
  "bac-water": "Bacteriostatic water used to prepare peptide research solutions."
};

export function getProductDescription(slug: string, dbDescription?: string | null): string {
  if (dbDescription && dbDescription.trim().length > 0) {
    return dbDescription;
  }
  return productDescriptionsBySlug[slug] || "Research-use product for controlled laboratory workflows.";
}
