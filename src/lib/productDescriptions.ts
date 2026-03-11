export const productDescriptionsBySlug: Record<string, string> = {
  "retatrutide": "Retatrutide is a multi-receptor research peptide frequently studied in metabolic signaling models. This catalog entry is prepared for controlled laboratory workflows that require consistent vial labeling and straightforward handling documentation.",
  "melanotan-ii": "Melanotan II is commonly explored in receptor-binding and pigmentation pathway research. This listing is intended for in-vitro and preclinical lab use where clearly identified concentration and batch traceability are required.",
  "ipamorelin": "Ipamorelin is widely referenced in growth-hormone secretagogue pathway studies. This product page presents a clean, research-focused profile designed for organized lab inventory and reproducible protocol preparation.",
  "cjc-1295": "CJC-1295 is frequently used in peptide signaling research involving endocrine response timing. This laboratory listing emphasizes practical product clarity for teams documenting dosage format, vial count, and controlled handling notes.",
  "ghk-cu": "GHK-Cu is often investigated in regenerative and cellular response models. This product record is structured for research labs that need clear naming, concentration context, and easy order reference.",
  "glp-3": "GLP-3 related compounds are studied in peptide-driven metabolic pathway research. This listing supports laboratory procurement with consistent formatting to simplify comparison across peptide categories.",
  "bpc-157": "BPC-157 is commonly discussed in tissue-response and repair-mechanism research contexts. This product entry is tailored for laboratory organizations that need concise documentation for inventory and planning.",
  "bac-water": "Bacteriostatic water is provided as a research supply component for laboratory peptide preparation workflows. This listing highlights practical ordering details so teams can pair supply items with peptide studies efficiently."
};

export function getProductDescription(slug: string, dbDescription?: string | null): string {
  if (dbDescription && dbDescription.trim().length > 0) {
    return dbDescription;
  }
  return productDescriptionsBySlug[slug] || "Research-use product prepared for professional laboratory workflows.";
}
