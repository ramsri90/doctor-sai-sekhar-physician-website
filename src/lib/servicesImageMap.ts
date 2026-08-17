const slugToImageMap: Record<string, string> = {
  "type-1-dm": "/images/services/diabetes type 1 DM.webp",
  "type-ii-dm": "/images/services/Type 2 diebetes.webp",
  "diabetic-neuropathy": "/images/services/Diabetic Neuropathy.webp",
  "diabetic-nephropathy": "/images/services/Diabetic Nephropathy.webp",
  "hypothyroidism": "/images/services/hypo.webp",
  "hyperthyroidism": "/images/services/hyper.webp",
  "dengue-fever": "/images/services/fever.webp",
  "malaria": "/images/services/maleriya3.webp",
  "urinary-tract-infection-uti": "/images/services/urinary .webp",
  "viral-bacterial-infection": "/images/services/viral bacterial infection.webp",
  "acute-gastroenteritis": "/images/services/Acute Gastroenteritis.webp",
  "tension-headache": "/images/services/Headache.webp",
  "migraine": "/images/services/Migraine.webp",
  "osteoarthritis": "/images/services/Osteoarthritis.webp",
  "rheumatoid-arthritis": "/images/services/Rheumatoid Arthritis.webp",
  "cervical-spondylosis": "/images/services/Cervical Spondylosis.webp",
  "lumbar-spondylosis": "/images/services/Lumbar Spondylosis.webp",
  "acute-gastritis": "/images/services/Acute Gastritis.webp",
  "acute-and-chronic-diarrhea": "/images/services/Acute and Chronic Diarrhea.webp",
  "constipation": "/images/services/Constipation.webp",
  "jaundice-liver-problems": "/images/services/Jaundice & Liver Problems.webp",
  "acute-renal-failure": "/images/services/Acute Renal Failure.webp",
  "chronic-renal-failure": "/images/services/Chronic Renal Failure.webp",
  "kidney-stones": "/images/services/kidney stones.webp",
  "ischemic-heart-disease": "/images/services/Ischemic heart disease.webp",
  "heart-failure": "/images/services/Heart Failure.webp",
  "asthma": "/images/services/Asthma.webp",
  "pneumonia": "/images/services/Pneumonia.webp",
  "copd-chronic-obstructive-pulmonary-disease": "/images/services/COPD (Chronic Obstructive Pulmonary Disease)..webp",
  "allergies": "/images/services/Allergies.webp",
  "substance-abuse": "/images/services/Substance abuse.webp",
  "insomnia": "/images/services/Insomnia.webp",
  "adult-vaccination": "/images/services/Adult Vaccination.webp",
  "connective-tissue-diseases": "/images/services/Connective Tissue Diseases.webp",
  "cancer-surgery": "/images/services/Cancer Surgery.webp",
  "routine-health-checkups": "/images/services/Routine Health Checkups.webp",
  "vitamin-deficiency": "/images/services/Vitamin Deficiency.webp",
  "diet-lifestyle-modifications": "/images/services/Diet & Lifestyle Modifications.webp",
  "hypertension-htn": "/images/services/Hypertension (HTN).webp",
  "dyslipidemia": "/images/services/Dyslipidemia.webp",
  "septic-syndrome": "/images/services/Septic Syndrome.webp",
  "geriatric-care": "/images/services/geriatric care.webp",
};

const nameToImageMap: Record<string, string> = {
  "type 1 dm": "/images/services/diabetes type 1 DM.webp",
  "type ii dm": "/images/services/Type 2 diebetes.webp",
  "diabetic neuropathy": "/images/services/Diabetic Neuropathy.webp",
  "diabetic nephropathy": "/images/services/Diabetic Nephropathy.webp",
  "hypothyroidism": "/images/services/hypo.webp",
  "hyperthyroidism": "/images/services/hyper.webp",
  "dengue fever": "/images/services/fever.webp",
  "malaria": "/images/services/maleriya3.webp",
  "urinary tract infection (uti)": "/images/services/urinary .webp",
  "uti": "/images/services/urinary .webp",
  "viral bacterial infection": "/images/services/viral bacterial infection.webp",
  "acute gastroenteritis": "/images/services/Acute Gastroenteritis.webp",
  "tension headache": "/images/services/Headache.webp",
  "migraine": "/images/services/Migraine.webp",
  "osteoarthritis": "/images/services/Osteoarthritis.webp",
  "rheumatoid arthritis": "/images/services/Rheumatoid Arthritis.webp",
  "cervical spondylosis": "/images/services/Cervical Spondylosis.webp",
  "lumbar spondylosis": "/images/services/Lumbar Spondylosis.webp",
  "acute gastritis": "/images/services/Acute Gastritis.webp",
  "acute and chronic diarrhea": "/images/services/Acute and Chronic Diarrhea.webp",
  "diarrhea": "/images/services/Acute and Chronic Diarrhea.webp",
  "constipation": "/images/services/Constipation.webp",
  "jaundice & liver problems": "/images/services/Jaundice & Liver Problems.webp",
  "acute renal failure": "/images/services/Acute Renal Failure.webp",
  "chronic renal failure": "/images/services/Chronic Renal Failure.webp",
  "kidney stones": "/images/services/kidney stones.webp",
  "ischemic heart disease": "/images/services/Ischemic heart disease.webp",
  "heart failure": "/images/services/Heart Failure.webp",
  "asthma": "/images/services/Asthma.webp",
  "pneumonia": "/images/services/Pneumonia.webp",
  "copd (chronic obstructive pulmonary disease).": "/images/services/COPD (Chronic Obstructive Pulmonary Disease)..webp",
  "copd": "/images/services/COPD (Chronic Obstructive Pulmonary Disease)..webp",
  "allergies": "/images/services/Allergies.webp",
  "substance abuse": "/images/services/Substance abuse.webp",
  "insomnia": "/images/services/Insomnia.webp",
  "adult vaccination": "/images/services/Adult Vaccination.webp",
  "connective tissue diseases": "/images/services/Connective Tissue Diseases.webp",
  "cancer surgery": "/images/services/Cancer Surgery.webp",
  "routine health checkups": "/images/services/Routine Health Checkups.webp",
  "vitamin deficiency": "/images/services/Vitamin Deficiency.webp",
  "diet & lifestyle modifications": "/images/services/Diet & Lifestyle Modifications.webp",
  "hypertension (htn)": "/images/services/Hypertension (HTN).webp",
  "dyslipidemia": "/images/services/Dyslipidemia.webp",
  "septic syndrome": "/images/services/Septic Syndrome.webp",
  "geriatric care": "/images/services/geriatric care.webp",
};

/**
 * Returns the best image URL for a service.
 * Prefers the dedicated WebP image from /images/services/ over generic API images or placeholders.
 */
export function getServiceImage(slug?: string, serviceName?: string, rawApiImage?: string): string {
  // 1. Try slug lookup
  if (slug && slugToImageMap[slug.toLowerCase()]) {
    return slugToImageMap[slug.toLowerCase()];
  }

  // 2. Try service name lookup
  if (serviceName) {
    const normalizedName = serviceName.trim().toLowerCase();
    if (nameToImageMap[normalizedName]) {
      return nameToImageMap[normalizedName];
    }
  }

  // 3. Check if raw API image is valid and specific (not a generic logo or placeholder)
  if (
    rawApiImage &&
    !rawApiImage.includes("localhost") &&
    !rawApiImage.includes("main-logo") &&
    !rawApiImage.includes("fav.jpg") &&
    !rawApiImage.includes("about_us.jpg") &&
    !rawApiImage.includes("one.webp")
  ) {
    return rawApiImage;
  }

  // 4. Default fallback
  return "/images/one.webp";
}
