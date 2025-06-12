/**
 * Suggestions de questions pour chaque type de document
 */
const SUGGESTIONS_QUESTIONS = {
    // Assurance PNO
    "Assurance PNO": [
        { question: "Quelles sont les garanties incluses dans cette assurance ?" },
        { question: "Quelle est la période de couverture de cette assurance ?" },
        { question: "Qui est l'assureur et quel est le numéro de contrat ?" },
        { question: "Cette assurance couvre-t-elle bien le bien concerné ?" },
        { question: "Que signifie PNO et pourquoi est-ce obligatoire ?" },
    ],

    // Diagnostics
    Diagnostics: [
        { question: "Y a-t-il des anomalies détectées dans ces diagnostics ?" },
        { question: "Quelle est la surface Carrez mentionnée ?" },
        { question: "Quel est le classement énergétique (DPE) du bien ?" },
        { question: "Les diagnostics sont-ils tous à jour et valides ?" },
        { question: "Que signifient les différents diagnostics obligatoires ?" },
        { question: "Y a-t-il présence d'amiante ou de plomb ?" },
    ],

    // Pièce d'identité
    "Pièce d'identité": [
        { question: "Quels sont les nom et prénom du propriétaire ?" },
        { question: "Quelle est la date d'expiration de cette pièce d'identité ?" },
        { question: "Cette pièce d'identité est-elle encore valide ?" },
        { question: "Quel type de document d'identité est-ce ?" },
        { question: "Les informations sont-elles lisibles et complètes ?" },
    ],

    // Plan(s)
    "Plan(s)": [
        { question: "Quelle est la superficie totale indiquée sur le plan ?" },
        { question: "Combien de pièces compte ce logement ?" },
        { question: "Y a-t-il des espaces extérieurs (balcon, terrasse) ?" },
        { question: "Le plan correspond-il à la description du bien ?" },
        { question: "Quelles sont les dimensions des principales pièces ?" },
    ],

    // Règlement de copropriété
    "Règlement de copropriété": [
        { question: "Quelles sont les règles principales de cette copropriété ?" },
        { question: "Y a-t-il des restrictions particulières (animaux, travaux) ?" },
        { question: "Quelle est la quote-part de ce lot ?" },
        { question: "Quels sont les espaces communs de l'immeuble ?" },
        { question: "Y a-t-il des clauses importantes à retenir ?" },
    ],

    // Relevé annuel de charges
    "Relevé annuel de charges": [
        { question: "Quel est le montant total des charges annuelles ?" },
        { question: "Comment se répartissent les différents postes de charges ?" },
        { question: "Y a-t-il eu des travaux exceptionnels cette année ?" },
        { question: "Qui est le syndic de cette copropriété ?" },
        { question: "Les charges ont-elles augmenté par rapport à l'année précédente ?" },
    ],

    // Taxe foncière
    "Taxe foncière": [
        { question: "Quel est le montant de la taxe foncière ?" },
        { question: "Y a-t-il une TEOM (taxe ordures ménagères) incluse ?" },
        { question: "Quelle est la référence cadastrale du bien ?" },
        { question: "Cette taxe est-elle dans la moyenne pour ce type de bien ?" },
        { question: "Qui est le propriétaire mentionné sur l'avis ?" },
    ],

    // Titre de propriété
    "Titre de propriété": [
        { question: "Qui sont les acquéreurs mentionnés dans l'acte ?" },
        { question: "Quelle est la description exacte du bien ?" },
        { question: "Quelle est la date d'acquisition ?" },
        { question: "Qui était le notaire en charge de la vente ?" },
        { question: "Y a-t-il des servitudes ou restrictions mentionnées ?" },
        { question: "Quelle était l'origine de propriété du vendeur ?" },
    ],

    // Bail
    Bail: [
        { question: "Quel est le montant du loyer hors charges ?" },
        { question: "Quelle est la durée du bail ?" },
        { question: "Quel est le montant du dépôt de garantie ?" },
        { question: "Y a-t-il des clauses particulières importantes ?" },
        { question: "Comment se répartissent les charges entre bailleur et locataire ?" },
    ],

    // 3 dernières quittances de loyer
    "3 dernières quittances de loyer": [
        { question: "Quel est le montant du loyer mensuel ?" },
        { question: "Les loyers ont-ils été payés régulièrement ?" },
        { question: "Quel est le montant des charges locatives ?" },
        { question: "Y a-t-il eu des retards de paiement ?" },
        { question: "Qui est le bailleur de ce logement ?" },
    ],

    // 3 derniers PV d'AG
    "3 derniers PV d'AG": [
        { question: "Quels travaux ont été votés lors des dernières AG ?" },
        { question: "Y a-t-il eu des changements de syndic ?" },
        { question: "Quels sont les appels de fonds prévus ?" },
        { question: "Y a-t-il des procédures en cours ?" },
        { question: "Des copropriétaires sont-ils en impayés ?" },
    ],

    // Permis de construire
    "Permis de construire": [
        { question: "Quel est le numéro et la date du permis ?" },
        { question: "Quels travaux sont autorisés par ce permis ?" },
        { question: "Quelle est la surface autorisée à construire ?" },
        { question: "Le permis est-il encore valide ?" },
        { question: "Qui était le titulaire du permis ?" },
    ],

    // Devis
    Devis: [
        { question: "Quel est le montant total HT et TTC du devis ?" },
        { question: "Quelles sont les prestations détaillées ?" },
        { question: "Quelle est la durée de validité du devis ?" },
        { question: "Qui est l'entreprise qui a établi ce devis ?" },
        { question: "Y a-t-il des options ou variantes proposées ?" },
    ],

    // Contrat d'entretien chaudière
    "Contrat d'entretien chaudière": [
        { question: "Quelle entreprise assure l'entretien ?" },
        { question: "Quelle est la fréquence des visites d'entretien ?" },
        { question: "Quand a eu lieu la dernière visite ?" },
        { question: "Le contrat est-il encore valide ?" },
        { question: "Quel type d'équipement est concerné ?" },
    ],

    // Attestation d'assurance multirisque habitation (MRH)
    "Attestation d'assurance multirisque habitation (MRH)": [
        { question: "Quelles garanties sont incluses dans cette assurance ?" },
        { question: "Quelle est la durée de couverture ?" },
        { question: "Qui est le bénéficiaire de cette assurance ?" },
        { question: "L'assurance couvre-t-elle bien l'adresse concernée ?" },
        { question: "Quel est le nom de l'assureur ?" },
    ],

    // Default pour les documents non spécifiés
    default: [
        { question: "Peux-tu résumer le contenu principal de ce document ?" },
        { question: "Quelles sont les informations importantes à retenir ?" },
        { question: "Y a-t-il des dates importantes mentionnées ?" },
        { question: "Ce document est-il complet et valide ?" },
        { question: "Peux-tu m'expliquer l'utilité de ce document ?" },
    ],
};

/**
 * Obtient les suggestions pour un type de document donné
 */
export const getSuggestions = (documentType) => {
    const normalizedType = documentType.trim();

    if (SUGGESTIONS_QUESTIONS[normalizedType]) {
        return SUGGESTIONS_QUESTIONS[normalizedType];
    }

    const partialMatch = Object.keys(SUGGESTIONS_QUESTIONS).find(
        (key) => key.toLowerCase().includes(normalizedType.toLowerCase()) || normalizedType.toLowerCase().includes(key.toLowerCase())
    );

    if (partialMatch && SUGGESTIONS_QUESTIONS[partialMatch]) {
        return SUGGESTIONS_QUESTIONS[partialMatch];
    }

    return SUGGESTIONS_QUESTIONS.default;
};
