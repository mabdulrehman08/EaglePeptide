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
  "retatrutide": "Retatrutide for metabolism and appetite pathway research.",
  "melanotan-ii": "Melanotan II for receptor and pigmentation pathway studies.",
  "ipamorelin": "Ipamorelin for growth hormone signaling research.",
  "cjc-1295": "CJC-1295 for endocrine timing and peptide signaling research.",
  "ghk-cu": "GHK-Cu for cellular recovery and regeneration models.",
  "glp-3": "GLP-3 related peptide for metabolic research workflows.",
  "bpc-157": "BPC-157 for tissue response and repair pathway research.",
  "bac-water": "Bacteriostatic water used to prepare peptide research solutions."
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
