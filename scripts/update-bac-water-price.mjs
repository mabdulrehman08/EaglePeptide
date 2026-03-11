import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  throw new Error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY.");
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

const { data, error } = await supabase
  .from("products")
  .update({ price: 10 })
  .eq("slug", "bac-water")
  .select("id, slug, name, price")
  .maybeSingle();

if (error) {
  throw new Error(`Failed to update BAC water price: ${error.message}`);
}

if (!data) {
  throw new Error("No product found with slug 'bac-water'.");
}

console.log(`Updated ${data.name} (${data.slug}) price to $${Number(data.price).toFixed(2)}`);
