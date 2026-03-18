export const productDescriptionsBySlug: Record<string, string> = {
  "retatrutide": "Retatrutide is supplied for controlled laboratory studies on multi-receptor metabolic signaling and appetite-regulation pathways.",
  "melanotan-ii": "Melanotan II is provided for receptor-binding and pigmentation-pathway investigations in structured laboratory models.",
  "ipamorelin": "Ipamorelin is used in growth-hormone secretagogue pathway research requiring consistent labeling and reproducible material handling.",
  "cjc-1295": "CJC-1295 is supplied for endocrine timing and peptide signaling studies where repeatable lot consistency is required.",
  "ghk-cu": "GHK-Cu is offered for regenerative and cellular response research in non-clinical laboratory environments.",
  "bpc-157": "BPC-157 is prepared for tissue-response and repair-mechanism research workflows under controlled in-vitro conditions.",
  "bac-water": "Bacteriostatic water is supplied as a research preparation component for peptide reconstitution in laboratory protocols."
};

export function getProductDescription(slug: string, dbDescription?: string | null): string {
  if (dbDescription && dbDescription.trim().length > 0) {
    return dbDescription;
  }
  return productDescriptionsBySlug[slug] || "Research-use product for controlled laboratory workflows.";
}
