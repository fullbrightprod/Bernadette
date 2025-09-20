// Centralisation des suggestions (≈15 par champ clé)
export const SUGGESTIONS = {
  jobTitle: [
    "Responsable marketing","Gérant(e) de boutique","Fondateur(trice) start-up","Artisan / Commerçant",
    "Directeur(trice) commercial(e)","Community manager","Chef(fe) de projet digital","Responsable communication",
    "Consultant(e) indépendant(e)","Dirigeant(e) TPE","Responsable e-commerce","Office manager",
    "Chargé(e) d'acquisition","Responsable événementiel","Freelance multi-casquette",
  ],
  sector: [
    "Restauration / Food","Tourisme / Hôtellerie","Artisanat / Local","Commerce de détail","Immobilier",
    "Éducation / Formation","SaaS / Tech","Industrie légère","Services B2B","Santé / Bien-être",
    "Sport / Loisirs","Culture / Événementiel","Mode / Beauté","Automobile","Collectivités / Associations",
  ],
  companySize: [
    "Solo / Auto-entrepreneur","2–5 employés","6–10 employés","11–20 employés","21–50 employés",
    "51–100 employés","100–250 employés",">250 employés","Réseau de franchisés","Entreprise familiale",
    "Startup en croissance","TPE de quartier","PME régionale","Établissement public","Association loi 1901",
  ],
  goals: [
    "Augmenter la notoriété locale","Générer plus de leads","Remplir l'agenda de réservations","Lancer un nouveau produit",
    "Améliorer le taux de conversion","Augmenter le panier moyen","Fidéliser la clientèle","Développer la marque employeur",
    "Accélérer la vente en ligne","Optimiser le ROI publicitaire","Clarifier le positionnement","Accroître l'engagement social",
    "Automatiser le marketing","Raccourcir le cycle de vente","Devenir leader sur une niche",
  ],
  challenges: [
    "Manque de temps","Pas de stratégie claire","Budget marketing limité","Difficulté à produire du contenu",
    "Peu de compétences techniques","Concurrence forte","Audience peu engagée","Processus de vente long",
    "Données clients éparses","Outils fragmentés","Peu de différenciation","Objections sur les prix",
    "Difficulté à mesurer l'impact","Manque de preuves sociales","Frictions internes (alignement)",
  ],
  frustrations: [
    "Manque de visibilité locale","Peu de trafic en magasin","Contenu irrégulier","Peu de retours clients",
    "Campagnes peu rentables","Outils trop complexes","Manque d'idées","Saisonnalité forte",
    "Dépendance à une plateforme","Algorithmes imprévisibles","Peu d'avis clients","Site lent ou daté",
    "Photos/vidéos amateurs","Process trop manuels","Métriques floues",
  ],
  fears: [
    "Investir pour rien","Bad buzz","Perdre en authenticité","Être dépassé par la tech","Ne pas tenir la cadence",
    "Être copié","Se tromper de cible","Dépendance à un prestataire","Erreurs RGPD","Perdre des clients historiques",
    "Trop de complexité","Dérapage budget","Changement d'algorithme","Crise économique","Recrutement raté",
  ],
  objections: [
    "C'est trop cher","Pas sûr que ça marche chez nous","On n'a pas le temps","On a déjà un prestataire",
    "On préfère essayer en interne","Peu de contrôle sur la création","Crainte d'un engagement long",
    "Manque de visibilité sur le ROI","Peurs liées à l'image de marque","Scepticisme sur l'IA",
    "Doutes sur la qualité des contenus","Complexité perçue","Inquiétude sur la confidentialité",
    "Risque de dépendance au prestataire","Processus trop lourd pour l'équipe",
  ],
  decisionCriteria: [
    "Prix total","Rapidité de mise en œuvre","Qualité créative","Références / cas clients","Simplicité d'usage",
    "Accompagnement humain","Intégration aux outils existants","Flexibilité des offres","Mesure et reporting",
    "Automatisation disponible","Support réactif","Sécurité / RGPD","Garantie / essai","Scalabilité","Impact à court terme",
  ],
  infoSources: [
    "Google / SEO","YouTube","LinkedIn","Instagram","TikTok","Facebook","Podcasts marketing","Newsletters sectorielles",
    "Communautés Slack / Discord","Forums spécialisés","Presse pro locale","Salons / événements","Clubs d'entrepreneurs",
    "Avis / comparateurs","Bouche-à-oreille",
  ],
  contentTypes: [
    "Vidéos courtes (Reels)","Vidéos longues (YouTube)","Articles de blog","Carrousels LinkedIn/IG","Infographies",
    "Études de cas","Guides PDF","Webinaires","Podcasts","Emailings / Newsletters","Checklists","Templates",
    "Landing pages","FAQ interactives","Démos produits",
  ],
  buyingProcess: [
    "Prise de conscience","Recherche d'infos","Short-list prestataires","Démos / essais","Comparaison offres",
    "Validation interne","Négociation","Signature","Onboarding","Évaluation du ROI","Renouvellement","Upsell",
    "Recommandation","RFP / AO","POC",
  ],
  alternatives: [
    "Concurrent A","Concurrent B","Internaliser","Freelance local","Agence spécialisée","Outil no-code",
    "Solution gratuite","Ne rien faire","Marketplace","Plateforme self-serve","Prestataire historique",
    "Nouvelle agence","Solution sur-mesure","SaaS prêt à l'emploi","Offre packagée",
  ],
  refusalReasons: [
    "Pas le budget","Priorités internes","Contexte économique","Doute ROI","Mauvais timing","Équipe non prête",
    "Process trop lourd","Change management nécessaire","Pas d'adhésion Direction","Solution jugée risquée",
    "Manque de preuves","Contrainte juridique","Incompatibilité technique","Dépendance fournisseur","Contrat jugé rigide",
  ],
  socialNetworks: [
    "Instagram","Facebook","LinkedIn","TikTok","YouTube","Pinterest","X (Twitter)","Snapchat","WhatsApp Business",
    "Telegram","Twitch","Reddit","TripAdvisor","Booking","Google Business",
  ],
  channels: [
    "Email","Téléphone","WhatsApp","LinkedIn DM","Instagram DM","Facebook Messenger","Formulaire site","Chat en ligne",
    "SMS","Slack / Teams","Rendez-vous visio","Rendez-vous physique","Webinaire live","Groupe privé","Commentaires réseaux",
  ],
  traits: [
    "Pragmatique","Curieux(se)","Orienté résultats","Créatif(ve)","Sensible au détail","Aversion au risque","Leader",
    "Collaboratif(ve)","Introverti(e)","Extraverti(e)","Data-driven","Impulsif(ve)","Patient(e)","Perfectionniste","Économe",
  ],
  ambitions: [
    "Ouvrir un 2e point de vente","Se développer à l'international","Lancer un e-commerce","Automatiser le marketing",
    "Recruter une équipe","Lever des fonds","Se positionner premium","Diversifier l'offre","Augmenter la marge",
    "Réduire la dépendance aux plateformes","Construire une communauté","Standardiser les process","Obtenir des certifications",
    "Améliorer l'expérience client","Élargir la gamme",
  ],
  heardAboutUs: [
    "Bouche-à-oreille","Réseaux sociaux","Google / SEO","Publicité","Salon pro","Partenaire","Influenceur","Presse locale",
    "Annuaire pro","Référencement map","Contenu viral","Webinaire","Newsletter","Cold email","Cold call",
  ],
  reasonsToChooseUs: [
    "Rapidité","Qualité visuelle","Expertise TPE/PME","Offre claire","Accompagnement humain","Automatisation intelligente",
    "Tarifs accessibles","Références locales","Impact mesurable","Pack tout-en-un","Vision créative","Support réactif",
    "Simplicité d'usage","Approche pédagogique","Transparence",
  ],
  differentiators: [
    "Guidage pas-à-pas","Modèles prêts à l'emploi","Captation simplifiée","Montage auto","Scénarios assistés IA",
    "Templates multi-formats","Mesures intégrées","SEO-friendly","Brand kit","Intégration réseaux","Bibliothèque d'idées",
    "Fiches de tournage","Réseau vidéastes","Qualité storytelling","Design moderne",
  ],
  prePurchaseConcerns: [
    "Manque de contrôle","Peu de temps à y consacrer","Crainte d'un résultat moyen","Complexité supposée","Données non sécurisées",
    "Manque de support","Coûts cachés","Courbe d'apprentissage","Incompatibilité outils","Peu d'autonomie","Obligation long terme",
    "Résultat peu authentique","Risque d'échec","Qualité variable","Pas adapté à mon secteur",
  ],
};
export type SuggestionKeys = keyof typeof SUGGESTIONS;
