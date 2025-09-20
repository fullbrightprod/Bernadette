import fetch from "node-fetch";
import "dotenv/config";

const url = "https://syrswgioypqqdqllnlra.supabase.co"
const key = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN5cnN3Z2lveXBxcWRxbGxubHJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTgyMDc1ODksImV4cCI6MjA3Mzc4MzU4OX0.o_yOEyU3cTvNQhz3g7CEUHLUoZeQFXZHczdhwC1Mvew"




if (!url || !key) {
  console.error("❌ Variables NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY manquantes.");
  process.exit(1);
}

const headers = {
  apikey: key,
  Authorization: `Bearer ${key}`,
  Prefer: "count=exact",
};

async function main() {
  console.log("🔎 Debug Supabase REST");
  console.log("URL:", url);

  // 1) Lister colonnes depuis information_schema
  console.log("\n[1] Lecture des colonnes via information_schema.columns…");
  try {
    const colsRes = await fetch(
      `${url}/rest/v1/information_schema.columns?table_name=eq.personas&select=column_name,data_type,ordinal_position&order=ordinal_position.asc`,
      { headers }
    );
    console.log("HTTP status:", colsRes.status);
    const txt = await colsRes.text();
    console.log("Réponse brute:", txt);
    let cols: any;
    try {
      cols = JSON.parse(txt);
      console.log("Colonnes reconnues:", cols.map((c: any) => c.column_name).join(", "));
    } catch {
      console.error("⚠️ Impossible de parser en JSON");
    }
  } catch (e) {
    console.error("Erreur lors du fetch des colonnes:", e);
  }

  // 2) Tester la colonne top_frustration
  console.log("\n[2] Test SELECT top_frustration");
  try {
    const testRes = await fetch(`${url}/rest/v1/personas?select=top_frustration&limit=1`, { headers });
    console.log("HTTP status:", testRes.status);
    const body = await testRes.text();
    console.log("Réponse brute:", body);
  } catch (e) {
    console.error("Erreur lors du fetch top_frustration:", e);
  }

  // 3) SELECT * pour voir les colonnes renvoyées
  console.log("\n[3] Test SELECT *");
  try {
    const allRes = await fetch(`${url}/rest/v1/personas?select=*&limit=1`, { headers });
    console.log("HTTP status:", allRes.status);
    const body = await allRes.text();
    console.log("Réponse brute:", body);
    try {
      const data = JSON.parse(body);
      if (Array.isArray(data) && data.length > 0) {
        console.log("Clés dans le premier enregistrement:", Object.keys(data[0]));
      } else {
        console.log("⚠️ Table vide, pas d’exemple de clés.");
      }
    } catch {
      console.error("⚠️ Impossible de parser la réponse en JSON");
    }
  } catch (e) {
    console.error("Erreur lors du fetch *:", e);
  }
}

main().catch((e) => {
  console.error("Erreur inattendue:", e);
});
