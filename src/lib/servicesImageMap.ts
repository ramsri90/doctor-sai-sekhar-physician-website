const slugToImageMap: Record<string, string> = {
  "type-1-dm": "/images/services/diabetes-type-1-dm.webp",
  "type-ii-dm": "/images/services/type-2-diabetes.webp",
  "diabetic-neuropathy": "/images/services/diabetic-neuropathy.webp",
  "diabetic-nephropathy": "/images/services/diabetic-nephropathy.webp",
  "hypothyroidism": "/images/services/hypo.webp",
  "hyperthyroidism": "/images/services/hyper.webp",
  "dengue-fever": "/images/services/fever.webp",
  "malaria": "/images/services/malaria.webp",
  "urinary-tract-infection-uti": "/images/services/urinary.webp",
  "viral-bacterial-infection": "/images/services/viral-bacterial-infection.webp",
  "acute-gastroenteritis": "/images/services/acute-gastroenteritis.webp",
  "tension-headache": "/images/services/headache.webp",
  "migraine": "/images/services/migraine.webp",
  "osteoarthritis": "/images/services/osteoarthritis.webp",
  "rheumatoid-arthritis": "/images/services/rheumatoid-arthritis.webp",
  "cervical-spondylosis": "/images/services/cervical-spondylosis.webp",
  "lumbar-spondylosis": "/images/services/lumbar-spondylosis.webp",
  "acute-gastritis": "/images/services/acute-gastritis.webp",
  "acute-and-chronic-diarrhea": "/images/services/acute-chronic-diarrhea.webp",
  "constipation": "/images/services/constipation.webp",
  "jaundice-liver-problems": "/images/services/jaundice-liver.webp",
  "acute-renal-failure": "/images/services/acute-renal-failure.webp",
  "chronic-renal-failure": "/images/services/chronic-renal-failure.webp",
  "kidney-stones": "/images/services/kidney-stones.webp",
  "ischemic-heart-disease": "/images/services/ischemic-heart-disease.webp",
  "heart-failure": "/images/services/heart-failure.webp",
  "asthma": "/images/services/asthma.webp",
  "pneumonia": "/images/services/pneumonia.webp",
  "copd-chronic-obstructive-pulmonary-disease": "/images/services/copd.webp",
  "allergies": "/images/services/allergies.webp",
  "substance-abuse": "/images/services/substance-abuse.webp",
  "insomnia": "/images/services/insomnia.webp",
  "adult-vaccination": "/images/services/adult-vaccination.webp",
  "connective-tissue-diseases": "/images/services/connective-tissue-diseases.webp",
  "cancer-surgery": "/images/services/cancer-surgery.webp",
  "routine-health-checkups": "/images/services/routine-health-checkups.webp",
  "vitamin-deficiency": "/images/services/vitamin-deficiency.webp",
  "diet-lifestyle-modifications": "/images/services/diet-lifestyle.webp",
  "hypertension-htn": "/images/services/hypertension.webp",
  "dyslipidemia": "/images/services/dyslipidemia.webp",
  "septic-syndrome": "/images/services/septic-syndrome.webp",
  "geriatric-care": "/images/services/geriatric-care.webp",
};

const nameToImageMap: Record<string, string> = {
  "type 1 dm": "/images/services/diabetes-type-1-dm.webp",
  "type ii dm": "/images/services/type-2-diabetes.webp",
  "diabetic neuropathy": "/images/services/diabetic-neuropathy.webp",
  "diabetic nephropathy": "/images/services/diabetic-nephropathy.webp",
  "hypothyroidism": "/images/services/hypo.webp",
  "hyperthyroidism": "/images/services/hyper.webp",
  "dengue fever": "/images/services/fever.webp",
  "malaria": "/images/services/malaria.webp",
  "urinary tract infection (uti)": "/images/services/urinary.webp",
  "uti": "/images/services/urinary.webp",
  "viral bacterial infection": "/images/services/viral-bacterial-infection.webp",
  "acute gastroenteritis": "/images/services/acute-gastroenteritis.webp",
  "tension headache": "/images/services/headache.webp",
  "migraine": "/images/services/migraine.webp",
  "osteoarthritis": "/images/services/osteoarthritis.webp",
  "rheumatoid arthritis": "/images/services/rheumatoid-arthritis.webp",
  "cervical spondylosis": "/images/services/cervical-spondylosis.webp",
  "lumbar spondylosis": "/images/services/lumbar-spondylosis.webp",
  "acute gastritis": "/images/services/acute-gastritis.webp",
  "acute and chronic diarrhea": "/images/services/acute-chronic-diarrhea.webp",
  "diarrhea": "/images/services/acute-chronic-diarrhea.webp",
  "constipation": "/images/services/constipation.webp",
  "jaundice & liver problems": "/images/services/jaundice-liver.webp",
  "acute renal failure": "/images/services/acute-renal-failure.webp",
  "chronic renal failure": "/images/services/chronic-renal-failure.webp",
  "kidney stones": "/images/services/kidney-stones.webp",
  "ischemic heart disease": "/images/services/ischemic-heart-disease.webp",
  "heart failure": "/images/services/heart-failure.webp",
  "asthma": "/images/services/asthma.webp",
  "pneumonia": "/images/services/pneumonia.webp",
  "copd (chronic obstructive pulmonary disease).": "/images/services/copd.webp",
  "copd": "/images/services/copd.webp",
  "allergies": "/images/services/allergies.webp",
  "substance abuse": "/images/services/substance-abuse.webp",
  "insomnia": "/images/services/insomnia.webp",
  "adult vaccination": "/images/services/adult-vaccination.webp",
  "connective tissue diseases": "/images/services/connective-tissue-diseases.webp",
  "cancer surgery": "/images/services/cancer-surgery.webp",
  "routine health checkups": "/images/services/routine-health-checkups.webp",
  "vitamin deficiency": "/images/services/vitamin-deficiency.webp",
  "diet & lifestyle modifications": "/images/services/diet-lifestyle.webp",
  "hypertension (htn)": "/images/services/hypertension.webp",
  "dyslipidemia": "/images/services/dyslipidemia.webp",
  "septic syndrome": "/images/services/septic-syndrome.webp",
  "geriatric care": "/images/services/geriatric-care.webp",
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
