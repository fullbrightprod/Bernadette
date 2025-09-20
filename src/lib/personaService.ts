import { createClient } from "@supabase/supabase-js";
import { Persona, PersonaRow } from "@/types/persona";

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

const TABLE = "personas";

function toRow(p: Persona): Omit<PersonaRow, "id" | "user_id" | "created_at" | "updated_at"> {
  return {
    name: p.name,
    age: p.age ?? null,
    gender: p.gender ?? null,
    family: p.family ?? null,
    location: p.location ?? null,
    income_level: p.incomeLevel ?? null,
    education: p.education ?? null,
    traits: p.traits ?? [],
    hobbies: p.hobbies ?? [],
    job_title: p.jobTitle ?? null,
    sector: p.sector ?? null,
    company_size: p.companySize ?? null,
    experience_years: p.experienceYears ?? null,
    responsibilities: p.responsibilities ?? [],
    team_structure: p.teamStructure ?? null,
    goals: p.goals ?? [],
    success_definition: p.successDefinition ?? null,
    ambitions: p.ambitions ?? [],
    top_goal: p.topGoal ?? null,
    challenges: p.challenges ?? [],
    frustrations: p.frustrations ?? [],
    fears: p.fears ?? [],
    top_frustration: p.topFrustration ?? null,
    decision_role: p.decisionRole ?? null,
    buying_process: p.buyingProcess ?? [],
    decision_criteria: p.decisionCriteria ?? [],
    alternatives: p.alternatives ?? [],
    objections: p.objections ?? [],
    refusal_reasons: p.refusalReasons ?? [],
    social_networks: p.socialNetworks ?? [],
    info_sources: p.infoSources ?? [],
    content_types: p.contentTypes ?? [],
    preferred_channels: p.preferredChannels ?? [],
    heard_about_us: p.heardAboutUs ?? [],
    reasons_to_choose_us: p.reasonsToChooseUs ?? [],
    differentiators_appreciated: p.differentiatorsAppreciated ?? [],
    pre_purchase_concerns: p.prePurchaseConcerns ?? [],
    memorable_experience: p.memorableExperience ?? null,
    referral_pitch: p.referralPitch ?? null,
    short_bio: p.shortBio ?? null,
    quote: p.quote ?? null,
  };
}

function fromRow(r: PersonaRow): Persona {
  return {
    id: r.id,
    name: r.name,
    age: r.age,
    gender: r.gender,
    family: r.family,
    location: r.location,
    incomeLevel: r.income_level,
    education: r.education,
    traits: r.traits ?? [],
    hobbies: r.hobbies ?? [],
    jobTitle: r.job_title,
    sector: r.sector,
    companySize: r.company_size,
    experienceYears: r.experience_years,
    responsibilities: r.responsibilities ?? [],
    teamStructure: r.team_structure,
    goals: r.goals ?? [],
    successDefinition: r.success_definition,
    ambitions: r.ambitions ?? [],
    topGoal: r.top_goal,
    challenges: r.challenges ?? [],
    frustrations: r.frustrations ?? [],
    fears: r.fears ?? [],
    topFrustration: r.top_frustration,
    decisionRole: r.decision_role,
    buyingProcess: r.buying_process ?? [],
    decisionCriteria: r.decision_criteria ?? [],
    alternatives: r.alternatives ?? [],
    objections: r.objections ?? [],
    refusalReasons: r.refusal_reasons ?? [],
    socialNetworks: r.social_networks ?? [],
    infoSources: r.info_sources ?? [],
    contentTypes: r.content_types ?? [],
    preferredChannels: r.preferred_channels ?? [],
    heardAboutUs: r.heard_about_us ?? [],
    reasonsToChooseUs: r.reasons_to_choose_us ?? [],
    differentiatorsAppreciated: r.differentiators_appreciated ?? [],
    prePurchaseConcerns: r.pre_purchase_concerns ?? [],
    memorableExperience: r.memorable_experience,
    referralPitch: r.referral_pitch,
    shortBio: r.short_bio,
    quote: r.quote,
    created_at: r.created_at,
    updated_at: r.updated_at,
  };
}

export async function fetchPersonas(): Promise<Persona[]> {
  const { data, error } = await supabase.from(TABLE).select("*").order("created_at", { ascending: false });
  if (error) throw error;
  return (data as PersonaRow[]).map(fromRow);
}

export async function createPersona(values: Persona): Promise<Persona> {
  const { data: userData, error: userError } = await supabase.auth.getUser();
  if (userError || !userData?.user) throw new Error("Utilisateur non connecté");

  const payload = toRow(values);

  // 🚀 Log complet du payload
  console.log(
    "🚀 Payload envoyé à Supabase:",
    JSON.stringify({ ...payload, user_id: userData.user.id }, null, 2)
  );

  const { data: inserted, error } = await supabase
    .from(TABLE)
    .insert([{ ...payload, user_id: userData.user.id }])
    .select()
    .single();

  if (error) throw error;
  return fromRow(inserted as PersonaRow);
}

export async function updatePersona(id: string, values: Persona): Promise<Persona> {
  const payload = toRow(values);
  const { data: updated, error } = await supabase.from(TABLE).update(payload).eq("id", id).select().single();
  if (error) throw error;
  return fromRow(updated as PersonaRow);
}

export async function deletePersona(id: string): Promise<void> {
  const { error } = await supabase.from(TABLE).delete().eq("id", id);
  if (error) throw error;
}
