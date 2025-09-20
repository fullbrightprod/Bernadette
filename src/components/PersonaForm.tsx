"use client";

import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Persona } from "@/types/persona";
import { SUGGESTIONS as S } from "@/lib/personaSuggestions";

// Front-only helper (id nanoid ignoré côté DB pour create)
export const emptyPersona = (): Persona => ({ id: nanoid(), name: "" });

// ————— UI réutilisable —————
function HelpButton({ suggestions, onPick }: { suggestions: string[]; onPick: (v: string) => void }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="relative">
      <button type="button" onClick={() => setOpen((s) => !s)} className="rounded-full border px-2 py-1 text-xs">
        Aide ▾
      </button>
      {open && (
        <div className="absolute right-0 z-20 mt-2 max-h-64 w-80 overflow-auto rounded-xl border bg-white p-2 shadow-lg">
          <p className="px-2 pb-2 text-[11px] text-muted-foreground">Suggestions — cliquez pour remplir</p>
          <ul className="grid gap-1">
            {suggestions.map((s) => (
              <li key={s}>
                <button
                  type="button"
                  onClick={() => {
                    onPick(s);
                    setOpen(false);
                  }}
                  className="w-full rounded-md px-2 py-1 text-left text-sm hover:bg-gray-50"
                >
                  {s}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function ChipInput({
  label,
  values,
  onChange,
  suggestions,
}: {
  label: string;
  values?: string[] | null;
  onChange: (v: string[]) => void;
  suggestions?: string[];
}) {
  const [text, setText] = useState("");
  const list = values ?? [];
  function add(v: string) {
    const val = v.trim();
    if (!val || list.includes(val)) return;
    onChange([...list, val]);
  }
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        {!!suggestions?.length && <HelpButton suggestions={suggestions} onPick={add} />}
      </div>
      <div className="flex flex-wrap gap-2 rounded-xl border p-2">
        {list.map((v) => (
          <span key={v} className="flex items-center gap-1 rounded-full bg-gray-100 px-2 py-1 text-xs">
            {v}
            <button onClick={() => onChange(list.filter((x) => x !== v))} className="opacity-60 hover:opacity-100">✕</button>
          </span>
        ))}
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === ",") {
              e.preventDefault();
              add(text);
              setText("");
            }
          }}
          placeholder="Tapez et Entrée pour ajouter"
          className="min-w-[180px] flex-1 p-1 outline-none"
        />
      </div>
    </div>
  );
}

function TextInput({
  id,
  label,
  value,
  onChange,
  placeholder,
  suggestions,
  help,
}: {
  id: string;
  label: string;
  value?: string | null;
  onChange: (v: string) => void;
  placeholder?: string;
  suggestions?: string[];
  help?: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">{label}</label>
        {!!suggestions?.length && <HelpButton suggestions={suggestions} onPick={(s) => onChange(s)} />}
      </div>
      <input
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-xl border px-3 py-2"
      />
      {help && <p className="mt-1 text-xs text-muted-foreground">{help}</p>}
    </div>
  );
}

function TextArea({
  id,
  label,
  value,
  onChange,
  rows = 3,
  suggestions,
  help,
}: {
  id: string;
  label: string;
  value?: string | null;
  onChange: (v: string) => void;
  rows?: number;
  suggestions?: string[];
  help?: string;
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label htmlFor={id} className="text-sm font-medium">{label}</label>
        {!!suggestions?.length && <HelpButton suggestions={suggestions} onPick={(s) => onChange(s)} />}
      </div>
      <textarea
        id={id}
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        className="w-full resize-y rounded-xl border px-3 py-2"
      />
      {help && <p className="mt-1 text-xs text-muted-foreground">{help}</p>}
    </div>
  );
}

function SelectInput({
  label,
  value,
  onChange,
  options,
  suggestions,
}: {
  label: string;
  value?: string | null;
  onChange: (v: string) => void;
  options: string[];
  suggestions?: string[];
}) {
  return (
    <div>
      <div className="mb-1 flex items-center justify-between">
        <label className="text-sm font-medium">{label}</label>
        {!!suggestions?.length && <HelpButton suggestions={suggestions} onPick={onChange} />}
      </div>
      <select
        value={value ?? ""}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-xl border px-3 py-2"
      >
        <option value="">— Sélectionner —</option>
        {options.map((op) => (
          <option key={op} value={op}>{op}</option>
        ))}
      </select>
    </div>
  );
}

// ————— Wizard —————
const steps = [
  { id: "A", title: "Général" },
  { id: "B", title: "Contexte pro" },
  { id: "C", title: "Objectifs" },
  { id: "D", title: "Challenges" },
  { id: "E", title: "Achat" },
  { id: "F", title: "Médias & Com" },
  { id: "G", title: "Relation marque" },
  { id: "H", title: "Résumé" },
];

export default function PersonaForm({
  initialData,
  onSubmit,
  onCancel,
}: {
  initialData: Persona;
  onSubmit: (p: Persona) => void;
  onCancel: () => void;
}) {
  const [data, setData] = useState<Persona>(initialData);
  const [step, setStep] = useState(0);

  useEffect(() => setData(initialData), [initialData]);

  function update<K extends keyof Persona>(key: K, value: Persona[K]) {
    setData((d) => ({ ...d, [key]: value }));
  }

  function submit() {
    const enriched: Persona = {
      ...data,
      topGoal: (data.goals?.[0] ?? data.successDefinition) ?? null,
      topFrustration: data.frustrations?.[0] ?? data.challenges?.[0] ?? null,
    };
    onSubmit(enriched);
  }

  const progress = Math.round(((step + 1) / steps.length) * 100);

  return (
    <form
      className="mt-4 space-y-6"
      onSubmit={(e) => {
        e.preventDefault();
        submit();
      }}
    >
      {/* Stepper */}
      <div>
        <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
          <span>Étape {step + 1}/{steps.length} — {steps[step].title}</span>
          <span>{progress}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div className="h-full bg-black" style={{ width: `${progress}%` }} />
        </div>
      </div>

      {/* Panels */}
      {step === 0 && (
        <section className="grid gap-4 md:grid-cols-2">
          <TextInput id="name" label="Nom du persona" value={data.name} onChange={(v) => update("name", v)} help="Ex: Juliette la commerçante" />
          <TextInput id="age" label="Âge" value={data.age ?? ""} onChange={(v) => update("age", v)} suggestions={["18-24","25-34","35-44","45-54","55-64","65+"]} />
          <TextInput id="gender" label="Genre" value={data.gender ?? ""} onChange={(v) => update("gender", v)} suggestions={["Femme","Homme","Non-binaire","Préférez ne pas dire"]} />
          <TextInput id="family" label="Situation familiale" value={data.family ?? ""} onChange={(v) => update("family", v)} suggestions={["Célibataire","En couple","Marié(e)","Avec enfants","Sans enfants","Parent solo","Aidant familial","Colocation","Veuf(ve)","PACs","Union libre","Famille recomposée","Étudiant(e)","Jeune actif(ve)","Retraité(e)"]} />
          <TextInput id="location" label="Localisation" value={data.location ?? ""} onChange={(v) => update("location", v)} help="Ville, zone (urbaine / rurale), type d'habitat." suggestions={["Centre-ville","Périurbain","Rural","Petite ville","Grande métropole","Frontaliers","Télétravail nomade","Banlieue résidentielle","Zone industrielle","Centre historique","Station touristique","Montagne","Littoral","Outre-mer","Transfrontalier"]} />
          <TextInput id="income" label="Niveau de revenus" value={data.incomeLevel ?? ""} onChange={(v) => update("incomeLevel", v)} suggestions={["Faible","Moyen","Confortable","Élevé","Très élevé","Variable (saisonnier)","En croissance","Stable","En baisse","Revenu principal","Revenu complémentaire","Investisseur","Salarié","Indépendant","Chef d'entreprise"]} />
          <TextInput id="education" label="Études / Formation" value={data.education ?? ""} onChange={(v) => update("education", v)} suggestions={["CAP / BEP","Bac","Bac+2","Licence","Master","Doctorat","Autodidacte","MOOC / Bootcamp","Formation continue","VAE","École de commerce","École d'ingénieur","Arts / Design","Marketing digital","Management"]} />
          <ChipInput label="Traits de caractère" values={data.traits ?? []} onChange={(v) => update("traits", v)} suggestions={S.traits} />
          <ChipInput label="Passions / Loisirs" values={data.hobbies ?? []} onChange={(v) => update("hobbies", v)} suggestions={["Sport","Lecture","Cuisine","Voyage","Nature","Cinéma","Musique","Bricolage","Jeux vidéo","Photo / Vidéo","Écriture","Jardinage","Bien-être","Bénévolat","Animaux"]} />
        </section>
      )}

      {step === 1 && (
        <section className="grid gap-4 md:grid-cols-2">
          <TextInput id="job" label="Métier / Poste" value={data.jobTitle ?? ""} onChange={(v) => update("jobTitle", v)} suggestions={S.jobTitle} />
          <TextInput id="sector" label="Secteur" value={data.sector ?? ""} onChange={(v) => update("sector", v)} suggestions={S.sector} />
          <SelectInput label="Taille d'entreprise" value={data.companySize ?? ""} onChange={(v) => update("companySize", v)} options={S.companySize} suggestions={S.companySize} />
          <TextInput id="exp" label="Ancienneté / Expérience (années)" value={data.experienceYears ?? ""} onChange={(v) => update("experienceYears", v)} suggestions={["<1","1-2","3-5","6-10","11-15","16-20",">20","Reconversion","Alternance","Stagiaire","Junior","Intermédiaire","Senior","Expert","Direction"]} />
          <ChipInput label="Responsabilités principales" values={data.responsibilities ?? []} onChange={(v) => update("responsibilities", v)} suggestions={["Stratégie","Budgets","Management","Production contenu","Vente / closing","Relation client","Partenariats","Reporting","Événementiel","E-commerce","Service après-vente","Prospection","Onboarding","Formation","Conformité"]} />
          <TextArea id="team" label="Équipe / hiérarchie (N+1, collaborateurs)" value={data.teamStructure ?? ""} onChange={(v) => update("teamStructure", v)} rows={3} help="Décrivez brièvement l'organisation autour du persona" />
        </section>
      )}

      {step === 2 && (
        <section className="grid gap-4 md:grid-cols-2">
          <ChipInput label="Objectifs clés" values={data.goals ?? []} onChange={(v) => update("goals", v)} suggestions={S.goals} />
          <TextArea id="success" label="Définition du succès" value={data.successDefinition ?? ""} onChange={(v) => update("successDefinition", v)} rows={3} help="Ex: atteindre X réservations/mois, +Y% de CA, Z leads qualifiés/sem." />
          <ChipInput label="Ambitions (moyen/long terme)" values={data.ambitions ?? []} onChange={(v) => update("ambitions", v)} suggestions={S.ambitions} />
        </section>
      )}

      {step === 3 && (
        <section className="grid gap-4 md:grid-cols-2">
          <ChipInput label="Challenges" values={data.challenges ?? []} onChange={(v) => update("challenges", v)} suggestions={S.challenges} />
          <ChipInput label="Frustrations" values={data.frustrations ?? []} onChange={(v) => update("frustrations", v)} suggestions={S.frustrations} />
          <ChipInput label="Peurs" values={data.fears ?? []} onChange={(v) => update("fears", v)} suggestions={S.fears} />
        </section>
      )}

      {step === 4 && (
        <section className="grid gap-4 md:grid-cols-2">
          <SelectInput label="Rôle dans la décision" value={data.decisionRole ?? ""} onChange={(v) => update("decisionRole", v)} options={["Décisionnaire","Influenceur","Utilisateur","Prescripteur","Achats / DAF"]} suggestions={["Décisionnaire","Influenceur","Utilisateur","Prescripteur","Achats / DAF"]} />
          <ChipInput label="Processus d'achat (étapes)" values={data.buyingProcess ?? []} onChange={(v) => update("buyingProcess", v)} suggestions={S.buyingProcess} />
          <ChipInput label="Critères de décision" values={data.decisionCriteria ?? []} onChange={(v) => update("decisionCriteria", v)} suggestions={S.decisionCriteria} />
          <ChipInput label="Alternatives envisagées" values={data.alternatives ?? []} onChange={(v) => update("alternatives", v)} suggestions={S.alternatives} />
          <ChipInput label="Objections" values={data.objections ?? []} onChange={(v) => update("objections", v)} suggestions={S.objections} />
          <ChipInput label="Raisons de refus" values={data.refusalReasons ?? []} onChange={(v) => update("refusalReasons", v)} suggestions={S.refusalReasons} />
        </section>
      )}

      {step === 5 && (
        <section className="grid gap-4 md:grid-cols-2">
          <ChipInput label="Réseaux sociaux utilisés" values={data.socialNetworks ?? []} onChange={(v) => update("socialNetworks", v)} suggestions={S.socialNetworks} />
          <ChipInput label="Sources d'information" values={data.infoSources ?? []} onChange={(v) => update("infoSources", v)} suggestions={S.infoSources} />
          <ChipInput label="Types de contenus préférés" values={data.contentTypes ?? []} onChange={(v) => update("contentTypes", v)} suggestions={S.contentTypes} />
          <ChipInput label="Canaux de communication préférés" values={data.preferredChannels ?? []} onChange={(v) => update("preferredChannels", v)} suggestions={S.channels} />
        </section>
      )}

      {step === 6 && (
        <section className="grid gap-4 md:grid-cols-2">
          <ChipInput label="Comment nous a-t-il connu ?" values={data.heardAboutUs ?? []} onChange={(v) => update("heardAboutUs", v)} suggestions={S.heardAboutUs} />
          <ChipInput label="Raisons de nous choisir" values={data.reasonsToChooseUs ?? []} onChange={(v) => update("reasonsToChooseUs", v)} suggestions={S.reasonsToChooseUs} />
          <ChipInput label="Différenciateurs appréciés" values={data.differentiatorsAppreciated ?? []} onChange={(v) => update("differentiatorsAppreciated", v)} suggestions={S.differentiators} />
          <ChipInput label="Craintes avant achat" values={data.prePurchaseConcerns ?? []} onChange={(v) => update("prePurchaseConcerns", v)} suggestions={S.prePurchaseConcerns} />
          <TextArea id="memexp" label="Expérience marquante" value={data.memorableExperience ?? ""} onChange={(v) => update("memorableExperience", v)} rows={3} />
          <TextArea id="refpitch" label="Pitch de recommandation (ce qu'il dirait)" value={data.referralPitch ?? ""} onChange={(v) => update("referralPitch", v)} rows={3} />
        </section>
      )}

      {step === 7 && (
        <section className="grid gap-4">
          <TextArea id="bio" label="Bio courte (3-5 phrases)" value={data.shortBio ?? ""} onChange={(v) => update("shortBio", v)} rows={4} help="Résumé de la journée type, manière de travailler, points de friction, définition du succès." />
          <TextInput id="quote" label="Citation / Verbatim" value={data.quote ?? ""} onChange={(v) => update("quote", v)} help={`Ex: "J'ai besoin d'une méthode simple pour publier chaque semaine."`} />
        </section>
      )}

      <footer className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <button type="button" disabled={step === 0} onClick={() => setStep((s) => Math.max(0, s - 1))} className="rounded-xl border px-3 py-2 disabled:opacity-40">← Précédent</button>
          <button type="button" disabled={step === steps.length - 1} onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))} className="rounded-xl border px-3 py-2 disabled:opacity-40">Suivant →</button>
        </div>
        <div className="flex gap-2">
          <button type="button" onClick={onCancel} className="rounded-xl border px-4 py-2">Annuler</button>
          <button type="submit" className="rounded-2xl bg-black px-4 py-2 font-medium text-white shadow hover:opacity-90">Enregistrer le persona</button>
        </div>
      </footer>
    </form>
  );
}
