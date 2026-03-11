import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const descriptionsBySlug = {
  "retatrutide": "Retatrutide is a multi-receptor research peptide frequently studied in metabolic signaling models. This catalog entry is prepared for controlled laboratory workflows that require consistent vial labeling and straightforward handling documentation.",
  "melanotan-ii": "Melanotan II is commonly explored in receptor-binding and pigmentation pathway research. This listing is intended for in-vitro and preclinical lab use where clearly identified concentration and batch traceability are required.",
  "ipamorelin": "Ipamorelin is widely referenced in growth-hormone secretagogue pathway studies. This product page presents a clean, research-focused profile designed for organized lab inventory and reproducible protocol preparation.",
  "cjc-1295": "CJC-1295 is frequently used in peptide signaling research involving endocrine response timing. This laboratory listing emphasizes practical product clarity for teams documenting dosage format, vial count, and controlled handling notes.",
  "ghk-cu": "GHK-Cu is often investigated in regenerative and cellular response models. This product record is structured for research labs that need clear naming, concentration context, and easy order reference.",
  "glp-3": "GLP-3 related compounds are studied in peptide-driven metabolic pathway research. This listing supports laboratory procurement with consistent formatting to simplify comparison across peptide categories.",
  "bpc-157": "BPC-157 is commonly discussed in tissue-response and repair-mechanism research contexts. This product entry is tailored for laboratory organizations that need concise documentation for inventory and planning.",
  "bac-water": "Bacteriostatic water is provided as a research supply component for laboratory peptide preparation workflows. This listing highlights practical ordering details so teams can pair supply items with peptide studies efficiently."
};

for (const [slug, description] of Object.entries(descriptionsBySlug)) {
  const { error } = await supabase.from("products").update({ description }).eq("slug", slug);
  if (error) {
    console.error(`Failed to update ${slug}:`, error.message);
  } else {
    console.log(`Updated description for ${slug}`);
  }
}
