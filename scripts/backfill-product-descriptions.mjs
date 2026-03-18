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
  "retatrutide": "Retatrutide is supplied for controlled laboratory studies on multi-receptor metabolic signaling and appetite-regulation pathways.",
  "melanotan-ii": "Melanotan II is provided for receptor-binding and pigmentation-pathway investigations in structured laboratory models.",
  "ipamorelin": "Ipamorelin is used in growth-hormone secretagogue pathway research requiring consistent labeling and reproducible material handling.",
  "cjc-1295": "CJC-1295 is supplied for endocrine timing and peptide signaling studies where repeatable lot consistency is required.",
  "ghk-cu": "GHK-Cu is offered for regenerative and cellular response research in non-clinical laboratory environments.",
  "bpc-157": "BPC-157 is prepared for tissue-response and repair-mechanism research workflows under controlled in-vitro conditions.",
  "bac-water": "Bacteriostatic water is supplied as a research preparation component for peptide reconstitution in laboratory protocols."
};

for (const [slug, description] of Object.entries(descriptionsBySlug)) {
  const { error } = await supabase.from("products").update({ description }).eq("slug", slug);
  if (error) {
    console.error(`Failed to update ${slug}:`, error.message);
  } else {
    console.log(`Updated description for ${slug}`);
  }
}

const { error: removeError } = await supabase.from("products").delete().eq("slug", "glp-3");
if (removeError) {
  console.error("Failed to remove glp-3:", removeError.message);
} else {
  console.log("Removed product with slug glp-3");
}
