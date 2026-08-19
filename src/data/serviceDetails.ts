export interface ServiceDetail {
  name: string;
  content: string;
  image?: string;
}

/**
 * Sanitizes and cleans raw HTML content for service detail pages.
 * Strips duplicate main title headers while preserving 100% of rich medical text.
 */
export function cleanServiceContent(html: string, serviceTitle?: string): string {
  if (!html) return "";
  let cleaned = html.trim();

  // Remove duplicate title header if present at beginning
  if (serviceTitle) {
    const escaped = serviceTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const titleRegex = new RegExp(`<h[12][^>]*>\\s*(?:<strong[^>]*>)?\\s*` + escaped + `\\s*(?:<\\/strong>)?\\s*<\\/h[12]>`, 'gi');
    cleaned = cleaned.replace(titleRegex, "");
  }

  return cleaned.trim();
}

export const serviceFallbackMap: Record<string, ServiceDetail> = {
  "type-1-dm": {
    name: "Type 1 Diabetes Mellitus (T1DM)",
    content: `
      <p>Diabetes Type 1, also called Type 1 Diabetes Mellitus (T1DM), is a chronic autoimmune disease where the immune system mistakenly attacks and destroys the insulin-producing beta cells in the pancreas. This results in little to no insulin production, leading to high blood sugar levels.</p>

      <h3>Causes</h3>
      <ul>
        <li><strong>Autoimmune reaction:</strong> The body's immune system mistakenly attacks its own insulin-producing pancreatic cells.</li>
        <li><strong>Genetic predisposition:</strong> Family history of autoimmune disorders or T1DM increases risk.</li>
        <li><strong>Environmental triggers:</strong> Viruses or dietary factors may trigger the autoimmune cascade.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>Excessive thirst (Polydipsia)</li>
        <li>Frequent urination (Polyuria)</li>
        <li>Extreme hunger (Polyphagia)</li>
        <li>Unintentional weight loss</li>
        <li>Fatigue and general physical weakness</li>
        <li>Blurred vision</li>
        <li>Slow healing of cuts and wounds</li>
        <li><strong>Ketoacidosis (severe cases):</strong> Nausea, vomiting, abdominal pain, fruity-smelling breath, and confusion.</li>
      </ul>

      <h3>Diagnosis</h3>
      <ul>
        <li><strong>Fasting Blood Sugar:</strong> ≥ 126 mg/dL (7.0 mmol/L)</li>
        <li><strong>Random Blood Sugar:</strong> ≥ 200 mg/dL (11.1 mmol/L) with symptoms</li>
        <li><strong>HbA1c Test:</strong> ≥ 6.5%</li>
        <li><strong>C-Peptide Test:</strong> Low levels indicate minimal or absence of endogenous insulin production.</li>
        <li><strong>Autoantibody Tests:</strong> Detect autoimmune markers such as GAD antibodies.</li>
      </ul>

      <h3>Treatment & Management</h3>
      <ul>
        <li><strong>Lifelong Insulin Therapy:</strong> Basal (long-acting) and bolus (rapid-acting) insulin regimens via injections or insulin pumps.</li>
        <li><strong>Blood Sugar Monitoring:</strong> Continuous Glucose Monitoring (CGM) or frequent fingerstick tests.</li>
        <li><strong>Healthy Diet:</strong> Carbohydrate counting, balanced glycemic index meals, and structured eating schedules.</li>
        <li><strong>Exercise & Physical Activity:</strong> Helps regulate blood sugar with tailored insulin adjustments.</li>
        <li><strong>Lifestyle Management:</strong> Smoking cessation, stress control, and routine diabetic check-ups.</li>
      </ul>

      <h3>Complications (if unmanaged)</h3>
      <ul>
        <li><strong>Short-term:</strong> Diabetic Ketoacidosis (DKA) and severe hypoglycemia.</li>
        <li><strong>Long-term:</strong> Peripheral neuropathy, diabetic retinopathy, nephropathy (kidney disease), and cardiovascular disease.</li>
      </ul>
    `
  },

  "type-ii-dm": {
    name: "Type II Diabetes Mellitus (T2DM)",
    content: `
      <p>Type 2 Diabetes Mellitus (T2DM) is a chronic metabolic disorder characterized by insulin resistance and relative insulin deficiency, leading to high blood sugar levels (hyperglycemia). Unlike Type 1 Diabetes, the pancreas still produces insulin, but the body's cells do not respond effectively to it.</p>

      <h3>Causes & Risk Factors</h3>
      <ul>
        <li><strong>Insulin Resistance:</strong> Target tissue cells fail to respond effectively to circulating insulin.</li>
        <li><strong>Genetics:</strong> Family history of diabetes increases risk.</li>
        <li><strong>Obesity & Sedentary Lifestyle:</strong> High BMI and lack of physical activity.</li>
        <li><strong>Unhealthy Diet:</strong> High in refined sugars and processed foods.</li>
        <li><strong>Age & Metabolic Factors:</strong> Age over 45, hypertension, and high cholesterol.</li>
        <li><strong>Gestational Diabetes & PCOS:</strong> History of gestational diabetes or polycystic ovary syndrome.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>Increased thirst (polydipsia) & frequent urination (polyuria)</li>
        <li>Increased hunger (polyphagia) & fatigue</li>
        <li>Blurred vision & slow-healing wounds</li>
        <li>Numbness/tingling in hands and feet</li>
        <li>Frequent skin, gum, or urinary tract infections</li>
      </ul>

      <h3>Diagnosis</h3>
      <ul>
        <li><strong>Fasting Blood Sugar:</strong> ≥ 126 mg/dL (7.0 mmol/L)</li>
        <li><strong>Random Blood Sugar:</strong> ≥ 200 mg/dL (11.1 mmol/L)</li>
        <li><strong>HbA1c (Glycated Hemoglobin):</strong> ≥ 6.5%</li>
        <li><strong>Oral Glucose Tolerance Test (OGTT):</strong> ≥ 200 mg/dL after 2 hours</li>
      </ul>

      <h3>Treatment & Management</h3>
      <ul>
        <li><strong>Lifestyle Modifications (First-Line):</strong> Low-carb high-fiber diet, 150 min/week regular exercise, 5-10% weight loss.</li>
        <li><strong>Medications:</strong> Metformin, SGLT2 Inhibitors (Empagliflozin), GLP-1 Agonists (Liraglutide), Sulfonylureas, and Insulin Therapy for advanced cases.</li>
      </ul>

      <h3>Complications (if unmanaged)</h3>
      <ul>
        <li>Cardiovascular Disease (heart attacks, strokes)</li>
        <li>Neuropathy (nerve damage, limb tingling/numbness)</li>
        <li>Retinopathy (eye damage, risk of blindness)</li>
        <li>Nephropathy (kidney failure)</li>
        <li>Diabetic Foot Ulcers</li>
      </ul>
    `
  },

  "diabetic-neuropathy": {
    name: "Diabetic Neuropathy",
    content: `
      <p>Diabetic neuropathy is a type of nerve damage caused by prolonged high blood sugar levels in people with diabetes (both Type 1 and Type 2). It most commonly affects the legs and feet, but can also impact other parts of the body.</p>

      <h3>Types of Diabetic Neuropathy</h3>
      <ul>
        <li><strong>Peripheral Neuropathy:</strong> Affects hands, legs, and feet causing tingling, burning, numbness, or sharp cramps.</li>
        <li><strong>Autonomic Neuropathy:</strong> Affects involuntary functions causing dizziness, low BP, gastroparesis, or bladder issues.</li>
        <li><strong>Proximal Neuropathy (Diabetic Amyotrophy):</strong> Severe pain in hips, thighs, buttocks, and leg muscle weakness.</li>
        <li><strong>Focal Neuropathy (Mononeuropathy):</strong> Sudden damage to a single nerve (e.g. carpal tunnel syndrome).</li>
      </ul>

      <h3>Causes & Risk Factors</h3>
      <ul>
        <li>High Blood Sugar (Hyperglycemia) damaging nerve blood vessels.</li>
        <li>Hypertension, high cholesterol, smoking, and alcohol use.</li>
      </ul>

      <h3>Diagnosis & Treatment</h3>
      <ul>
        <li><strong>Diagnosis:</strong> Physical exam, Monofilament foot test, Nerve Conduction Studies, EMG.</li>
        <li><strong>Treatment:</strong> Strict blood sugar control, nerve pain medications (Pregabalin, Gabapentin, Duloxetine), physical therapy, and routine foot care.</li>
      </ul>
    `
  },

  "diabetic-nephropathy": {
    name: "Diabetic Nephropathy",
    content: `
      <p>Diabetic Nephropathy (Diabetic Kidney Disease) is a progressive kidney disease caused by long-term high blood sugar levels in diabetes. It damages the kidney's filtering units (glomeruli), leading to protein loss in urine and potential kidney failure.</p>

      <h3>Causes & Risk Factors</h3>
      <ul>
        <li>Hyperglycemia damaging renal blood vessels.</li>
        <li>High blood pressure (hypertension), elevated cholesterol, smoking, and genetics.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li><strong>Early Stage:</strong> No noticeable symptoms (silent progression).</li>
        <li><strong>Later Stages:</strong> Foamy urine (proteinuria), swelling (edema) in feet/ankles/face, frequent nighttime urination, fatigue, high blood pressure.</li>
      </ul>

      <h3>Treatment & Management</h3>
      <ul>
        <li><strong>Blood Sugar Control:</strong> Maintain HbA1c &lt; 7%.</li>
        <li><strong>Blood Pressure Control:</strong> ACE Inhibitors (Lisinopril) or ARBs (Losartan) for renal protection.</li>
        <li><strong>Diet & Lifestyle:</strong> Low-protein, low-salt diet, statin lipid control, avoiding NSAIDs (Ibuprofen).</li>
      </ul>
    `
  },

  "hypothyroidism": {
    name: "Hypothyroidism (Underactive Thyroid)",
    content: `
      <p>Hypothyroidism is a condition where the thyroid gland does not produce enough thyroid hormones (T3 & T4), leading to a slow metabolism and widespread body function disturbances.</p>

      <h3>Causes</h3>
      <ul>
        <li><strong>Hashimoto’s Thyroiditis:</strong> Autoimmune disease where the immune system attacks the thyroid.</li>
        <li>Iodine deficiency, post-thyroid surgery or radiation, or pituitary gland dysfunction.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>Fatigue, weakness, unexplained weight gain, cold intolerance.</li>
        <li>Dry skin, brittle hair, puffy face, swollen hands/feet (myxedema).</li>
        <li>Depression, brain fog, slow thinking, constipation, hoarseness, irregular or heavy periods.</li>
      </ul>

      <h3>Diagnosis & Treatment</h3>
      <ul>
        <li><strong>Diagnosis:</strong> Elevated serum TSH with low Free T4.</li>
        <li><strong>Treatment:</strong> Daily synthetic Levothyroxine (Synthroid, Eltroxin) replacement taken on an empty stomach.</li>
      </ul>
    `
  },

  "hyperthyroidism": {
    name: "Hyperthyroidism (Overactive Thyroid)",
    content: `
      <p>Hyperthyroidism is a condition where the thyroid gland produces too much thyroid hormone (T3 & T4), leading to an increased metabolism, rapid weight loss, heart palpitations, and heat intolerance.</p>

      <h3>Causes</h3>
      <ul>
        <li><strong>Graves' Disease:</strong> Autoimmune disorder where immune system overstimulates the thyroid.</li>
        <li>Toxic multinodular goiter, thyroiditis, or excess iodine intake.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>Unintentional weight loss despite normal/increased appetite, excessive sweating, heat intolerance.</li>
        <li>Rapid or irregular heartbeat (palpitations), tremors, anxiety, insomnia, frequent bowel movements, bulging eyes (Graves' ophthalmopathy).</li>
      </ul>

      <h3>Treatment Options</h3>
      <ul>
        <li>Antithyroid medications (Methimazole, PTU), Beta-blockers (Propranolol) for heart rate control.</li>
        <li>Radioactive Iodine Therapy (RAI) or surgical Thyroidectomy.</li>
      </ul>
    `
  },

  "dengue-fever": {
    name: "Dengue Fever Management",
    content: `
      <p>Dengue fever is a mosquito-borne viral infection caused by the dengue virus (DENV 1-4) transmitted by <em>Aedes aegypti</em> mosquitoes.</p>

      <h3>Symptoms & Care</h3>
      <ul>
        <li>High fever (up to 104°F/40°C), retro-orbital pain behind eyes, severe muscle & joint aches ("breakbone fever"), headache, skin rash.</li>
        <li><strong>Severe Dengue Warning Signs:</strong> Severe abdominal pain, persistent vomiting, mucosal bleeding, rapid drop in platelet count.</li>
        <li><strong>Treatment:</strong> Oral hydration, serial platelet monitoring, Paracetamol (avoid NSAIDs/aspirin).</li>
      </ul>
    `
  },

  "malaria": {
    name: "Malaria Diagnosis & Treatment",
    content: `
      <p>Malaria is a life-threatening disease caused by <em>Plasmodium</em> parasites transmitted through the bite of infected female <em>Anopheles</em> mosquitoes.</p>

      <h3>Symptoms & Complications</h3>
      <ul>
        <li>High cyclical fevers, chills, drenching sweats, severe headache, joint pain, jaundice.</li>
        <li><strong>Severe Malaria:</strong> Cerebral malaria, severe anemia, kidney failure, fluid in lungs, organ failure.</li>
      </ul>

      <h3>Diagnosis & Treatment</h3>
      <ul>
        <li><strong>Diagnosis:</strong> Blood smear microscopy, Rapid Diagnostic Tests (RDTs), PCR.</li>
        <li><strong>Treatment:</strong> Artemisinin-based Combination Therapy (ACTs) or IV Artesunate for severe cases.</li>
      </ul>
    `
  },

  "urinary-tract-infection-uti": {
    name: "Urinary Tract Infection (UTI)",
    content: `
      <p>A Urinary Tract Infection (UTI) is an infection involving the urethra, bladder, or kidneys, most commonly caused by <em>E. coli</em> bacteria entering the urinary tract.</p>

      <h3>Symptoms</h3>
      <ul>
        <li>Dysuria (burning during urination), frequent urination, urinary urgency, pelvic pain.</li>
        <li>Cloudy or strong-smelling urine, fever/chills if spreading to kidneys (pyelonephritis).</li>
      </ul>

      <h3>Treatment</h3>
      <ul>
        <li>Doctor-prescribed targeted antibiotic therapy.</li>
        <li>Drinking plenty of water to flush out bacteria.</li>
      </ul>
    `
  },

  "viral-bacterial-infection": {
    name: "Viral vs. Bacterial Infections",
    content: `
      <p>Both viral and bacterial infections cause illness, but they are caused by distinct microorganisms requiring different clinical treatments.</p>

      <h3>Key Differences & Treatment</h3>
      <ul>
        <li><strong>Viral Infections:</strong> Caused by viruses (cold, flu, COVID-19). Low-grade fever, gradual onset. Antibiotics DO NOT work. Treated with rest, fluids, and antivirals.</li>
        <li><strong>Bacterial Infections:</strong> Caused by bacteria (strep throat, UTIs, bacterial pneumonia). High fever, chills, purulent mucus. Treated with targeted antibiotics.</li>
      </ul>
    `
  },

  "acute-gastroenteritis": {
    name: "Acute Gastroenteritis",
    content: `
      <p>Acute Gastroenteritis (stomach flu) is an inflammation of the stomach and intestines caused by viruses (Norovirus, Rotavirus), bacteria (Salmonella, E. coli), or parasites.</p>

      <h3>Symptoms & Treatment</h3>
      <ul>
        <li>Watery diarrhea, vomiting, abdominal cramps, fever, dehydration.</li>
        <li><strong>Treatment:</strong> Oral Rehydration Solution (ORS), BRAT diet (Bananas, Rice, Applesauce, Toast), antibiotics if bacterial.</li>
      </ul>
    `
  },

  "tension-headache": {
    name: "Tension Headache",
    content: `
      <p>A Tension Headache is the most common type of headache, characterized by a dull, aching pressure or tightness around the forehead or back of the head and neck triggered by stress and muscle tension.</p>

      <h3>Symptoms & Treatment</h3>
      <ul>
        <li>Mild to moderate bilateral pressure without throbbing, nausea, or light sensitivity.</li>
        <li>Analgesic pain relievers (Ibuprofen, Acetaminophen), relaxation techniques, hydration, posture correction.</li>
      </ul>
    `
  },

  "migraine": {
    name: "Migraine Management",
    content: `
      <p>A Migraine is a severe, throbbing neurological headache that can last for hours or days, often accompanied by nausea and extreme sensitivity to light and sound.</p>

      <h3>Symptoms & Care</h3>
      <ul>
        <li>Severe throbbing pain (usually on one side), photophobia, phonophobia, nausea, visual aura (flashing lights, blind spots).</li>
        <li><strong>Treatment:</strong> Triptans (Sumatriptan), analgesics, anti-nausea meds, resting in a dark quiet room, cold compress.</li>
      </ul>
    `
  },

  "rheumatoid-arthritis": {
    name: "Rheumatoid Arthritis",
    content: `
      <p>Rheumatoid Arthritis (RA) is a chronic autoimmune disease where the immune system attacks the synovium lining of joints, causing symmetrical swelling, pain, and joint erosion.</p>

      <h3>Symptoms & Treatment</h3>
      <ul>
        <li>Joint pain, swelling, morning stiffness lasting > 30 minutes, fatigue.</li>
        <li><strong>Treatment:</strong> DMARDs (Methotrexate), Biologics, NSAIDs, physical therapy.</li>
      </ul>
    `
  },

  "cervical-spondylosis": {
    name: "Cervical Spondylosis",
    content: `
      <p>Cervical Spondylosis is age-related wear and tear of the cervical spine (neck region), leading to stiffness, pain, bone spurs, and nerve compression.</p>

      <h3>Symptoms & Treatment</h3>
      <ul>
        <li>Neck pain and stiffness, headaches at base of skull, tingling or numbness in arms/fingers.</li>
        <li>Analgesics, muscle relaxants, neck strengthening exercises, posture correction, physical therapy.</li>
      </ul>
    `
  },

  "lumbar-spondylosis": {
    name: "Lumbar Spondylosis",
    content: `
      <p>Lumbar Spondylosis is degenerative arthritis of the lower back spine caused by disc dehydration, osteophytes, and joint degeneration.</p>

      <h3>Symptoms & Treatment</h3>
      <ul>
        <li>Lower back pain & stiffness, pain radiating down legs (sciatica), numbness/tingling in feet.</li>
        <li>Core strengthening, lumbar support, NSAIDs, nerve pain medications (Pregabalin), physical therapy.</li>
      </ul>
    `
  },

  "acute-gastritis": {
    name: "Acute Gastritis",
    content: `
      <p>Acute Gastritis is the sudden inflammation of the stomach lining causing epigastric burning pain, nausea, and indigestion.</p>

      <h3>Causes & Treatment</h3>
      <ul>
        <li><em>H. pylori</em> infection, NSAID overuse, excessive alcohol, stress.</li>
        <li>Antacids, Proton Pump Inhibitors (Omeprazole, Pantoprazole), H2 blockers, bland diet.</li>
      </ul>
    `
  },

  "acute-and-chronic-diarrhea": {
    name: "Acute and Chronic Diarrhea",
    content: `
      <p>Diarrhea is characterized by frequent loose, watery stools. Acute diarrhea lasts less than 2 weeks, while chronic diarrhea persists for more than 4 weeks.</p>

      <h3>Causes & Care</h3>
      <ul>
        <li><strong>Acute:</strong> Infections, food poisoning. Managed with ORS rehydration, zinc, BRAT diet, probiotics.</li>
        <li><strong>Chronic:</strong> IBS, IBD (Crohn's, Ulcerative Colitis), celiac disease, thyroid disorders. Requires targeted diagnostic evaluation.</li>
      </ul>
    `
  },

  "constipation": {
    name: "Constipation Care",
    content: `
      <p>Constipation occurs when bowel movements become infrequent (fewer than 3 per week), difficult, or painful, accompanied by hard stools and bloating.</p>

      <h3>Treatment</h3>
      <ul>
        <li>High-fiber diet (25-30g/day), 2-3L daily hydration, regular physical activity.</li>
        <li>Stool softeners, osmotic laxatives (MiraLAX), natural fiber supplements (Psyllium husk).</li>
      </ul>
    `
  },

  "jaundice-liver-problems": {
    name: "Jaundice & Liver Care",
    content: `
      <p>Jaundice is the yellowing of skin and eyes due to excess bilirubin build-up, indicating underlying liver, gallbladder, or blood cell breakdown disorders.</p>

      <h3>Causes & Care</h3>
      <ul>
        <li>Hepatitis (A, B, C), Fatty Liver Disease (NAFLD), Cirrhosis, Gallstones.</li>
        <li>Serum bilirubin & LFT blood panels, liver ultrasound, antiviral therapy, alcohol cessation, liver-protective diet.</li>
      </ul>
    `
  },

  "acute-renal-failure": {
    name: "Acute Renal Failure (AKI)",
    content: `
      <p>Acute Renal Failure (Acute Kidney Injury - AKI) is a sudden loss of kidney function occurring within hours to days, leading to waste buildup and fluid imbalance.</p>

      <h3>Causes & Protocol</h3>
      <ul>
        <li><strong>Pre-renal:</strong> Dehydration, severe blood loss, shock.</li>
        <li><strong>Intrinsic:</strong> Nephrotoxic drugs, glomerulonephritis, acute tubular necrosis.</li>
        <li><strong>Post-renal:</strong> Kidney stones, urinary obstruction.</li>
        <li>Urgent medical fluid management, electrolyte correction, and resolving underlying obstruction.</li>
      </ul>
    `
  },

  "chronic-renal-failure": {
    name: "Chronic Renal Failure (CKD)",
    content: `
      <p>Chronic Renal Failure (Chronic Kidney Disease - CKD) is the gradual, progressive loss of kidney filtering capacity over months or years.</p>

      <h3>Care Protocol</h3>
      <ul>
        <li>Proteinuria screening, eGFR monitoring, strict blood pressure control with ACEi/ARBs, renal diet, dialysis or transplant in end stages.</li>
      </ul>
    `
  },

  "ischemic-heart-disease": {
    name: "Ischemic Heart Disease (CAD)",
    content: `
      <p>Ischemic Heart Disease, also known as Coronary Artery Disease (CAD), occurs when reduced blood flow to the heart muscle causes chest pain, angina, and increased risk of myocardial infarction.</p>
      <h3>Causes & Risk Factors</h3>
      <ul>
        <li><strong>Atherosclerosis:</strong> Plaque accumulation in coronary arteries.</li>
        <li><strong>Uncontrolled Hypertension & Diabetes:</strong> Accelerates arterial stiffness and vascular damage.</li>
        <li><strong>Dyslipidemia & Smoking:</strong> High LDL cholesterol levels and tobacco use severely elevate CAD risks.</li>
      </ul>
      <h3>Symptoms</h3>
      <ul>
        <li>Angina or pressure-like chest tightness radiating to left arm or jaw.</li>
        <li>Shortness of breath during mild exertion.</li>
        <li>Unexplained fatigue and dizziness.</li>
      </ul>
      <h3>Clinical Management</h3>
      <ul>
        <li><strong>Diagnostic Screening:</strong> ECG, ECHO, Treadmill Test (TMT), and Cardiac Biomarkers.</li>
        <li><strong>Medical Therapy:</strong> Antiplatelets, Statins, Beta-blockers, and ACE inhibitors.</li>
        <li><strong>Lifestyle Modification:</strong> Low-sodium heart-healthy diet, structured cardiac rehabilitation, and weight management.</li>
      </ul>
    `
  },

  "heart-failure": {
    name: "Heart Failure Management",
    content: `
      <p>Heart Failure is a chronic progressive condition in which the heart muscle is unable to pump sufficient blood to meet the body's metabolic demands.</p>
      <h3>Causes & Risk Factors</h3>
      <ul>
        <li>Long-standing hypertension and ischemic heart disease.</li>
        <li>Valvular heart disorders, cardiomyopathy, and uncontrolled diabetes.</li>
      </ul>
      <h3>Symptoms</h3>
      <ul>
        <li>Shortness of breath (dyspnea) when lying flat or during physical activity.</li>
        <li>Swelling (edema) in legs, feet, ankles, and abdomen.</li>
        <li>Persistent cough, rapid weight gain from fluid retention, and severe weakness.</li>
      </ul>
      <h3>Treatment Protocol</h3>
      <ul>
        <li><strong>Pharmacotherapy:</strong> Diuretics, ARNI/ACEi, Beta-blockers, and SGLT2 inhibitors.</li>
        <li><strong>Fluid & Sodium Restriction:</strong> Daily weight monitoring and salt intake restriction.</li>
        <li><strong>Routine Monitoring:</strong> Regular echocardiograms and kidney function monitoring.</li>
      </ul>
    `
  },

  "allergies": {
    name: "Allergies & Immunological Care",
    content: `
      <p>Allergies are hypersensitive immune responses to environmental substances, food, or medications, triggering inflammatory reactions across respiratory, skin, and mucosal tissues.</p>
      <h3>Common Triggers & Types</h3>
      <ul>
        <li><strong>Allergic Rhinitis:</strong> Pollen, dust mites, mold spores, and animal dander.</li>
        <li><strong>Food & Drug Allergens:</strong> Peanuts, seafood, antibiotics, or NSAIDs.</li>
        <li><strong>Skin Allergies:</strong> Urticaria (hives), contact dermatitis, and eczema.</li>
      </ul>
      <h3>Symptoms</h3>
      <ul>
        <li>Sneezing, runny nose, nasal congestion, and watery eyes.</li>
        <li>Itchy skin rashes, hives, coughing, or wheezing.</li>
      </ul>
      <h3>Treatment Protocol</h3>
      <ul>
        <li><strong>Antihistamine Therapy:</strong> Second-generation non-drowsy H1 blockers and nasal sprays.</li>
        <li><strong>Trigger Identification:</strong> Allergy testing and environmental elimination.</li>
        <li><strong>Emergency Management:</strong> Anaphylaxis prevention counseling and prompt acute care.</li>
      </ul>
    `
  },

  "substance-abuse": {
    name: "Substance Abuse & Addiction Recovery",
    content: `
      <p>Substance Abuse management involves medical detox, psychological support, and lifestyle modification to overcome harmful dependencies on alcohol, tobacco, prescription drugs, or chemical substances.</p>
      <h3>Clinical Symptoms & Risks</h3>
      <ul>
        <li>Physical dependence, tremors, cravings, and withdrawal symptoms.</li>
        <li>Organ impairment including hepatic dysfunction, gastrointestinal damage, and cardiovascular strain.</li>
      </ul>
      <h3>Comprehensive Care Protocol</h3>
      <ul>
        <li><strong>Medical Detoxification:</strong> Safe supervised tapering and symptom management.</li>
        <li><strong>Organ Function Screening:</strong> Liver function tests, renal panels, and cardiac evaluation.</li>
        <li><strong>Relapse Prevention:</strong> Behavioral counseling, lifestyle restructuring, and support therapy.</li>
      </ul>
    `
  },

  "insomnia": {
    name: "Insomnia & Sleep Disorders",
    content: `
      <p>Insomnia is a prevalent sleep disorder characterized by persistent difficulty falling asleep, staying asleep, or experiencing non-restorative sleep, leading to daytime impairment.</p>
      <h3>Causes & Contributing Factors</h3>
      <ul>
        <li>High anxiety, chronic stress, or underlying depressive disorders.</li>
        <li>Poor sleep hygiene, irregular work schedules, and excessive screen time.</li>
        <li>Chronic medical conditions, pain, or sleep apnea.</li>
      </ul>
      <h3>Treatment & Management</h3>
      <ul>
        <li><strong>Cognitive Behavioral Therapy for Insomnia (CBT-I):</strong> First-line non-pharmacological treatment.</li>
        <li><strong>Sleep Hygiene Protocols:</strong> Structured sleep-wake cycles, dark quiet environment, and stimulus control.</li>
        <li><strong>Short-Term Pharmacotherapy:</strong> Judicious short-term medical management when indicated.</li>
      </ul>
    `
  },

  "adult-vaccination": {
    name: "Adult Immunization & Vaccines",
    content: `
      <p>Adult Vaccination is essential for maintaining lifelong immunity against preventable infectious diseases, particularly for elderly individuals and patients with chronic health conditions.</p>
      <h3>Key Recommended Adult Vaccines</h3>
      <ul>
        <li><strong>Influenza Vaccine:</strong> Annual flu shot for respiratory infection prevention.</li>
        <li><strong>Pneumococcal Vaccine:</strong> Protects against severe pneumonia and invasive pneumococcal disease.</li>
        <li><strong>Hepatitis B & Tdap:</strong> Immunization against Hepatitis B, Tetanus, Diphtheria, and Pertussis.</li>
        <li><strong>Shingles (Herpes Zoster) Vaccine:</strong> Prevents painful shingles outbreaks in adults aged 50+.</li>
      </ul>
      <h3>Clinical Benefits</h3>
      <ul>
        <li>Reduces hospitalization rates in diabetic, cardiac, and senior patients.</li>
        <li>Provides community immunity and prevents severe complications.</li>
      </ul>
    `
  },

  "connective-tissue-diseases": {
    name: "Connective Tissue Diseases",
    content: `
      <p>Connective Tissue Diseases encompass autoimmune inflammatory disorders affecting collagen and tissue structures throughout joints, skin, blood vessels, and internal organs.</p>
      <h3>Key Conditions Covered</h3>
      <ul>
        <li>Systemic Lupus Erythematosus (SLE)</li>
        <li>Systemic Sclerosis (Scleroderma)</li>
        <li>Mixed Connective Tissue Disease (MCTD) and Sjögren's Syndrome</li>
      </ul>
      <h3>Symptoms & Evaluation</h3>
      <ul>
        <li>Joint pain, Raynaud's phenomenon, skin rashes, and chronic fatigue.</li>
        <li>Autoantibody panels (ANA, anti-dsDNA, ENA), ESR, and CRP biomarkers.</li>
      </ul>
      <h3>Management</h3>
      <ul>
        <li>Disease-Modifying Antirheumatic Drugs (DMARDs) and targeted immunosuppressive regimens.</li>
        <li>Multisystem organ screening and protective lifestyle counseling.</li>
      </ul>
    `
  },

  "cancer-surgery": {
    name: "Cancer Surgery Pre & Post Care",
    content: `
      <p>Comprehensive perioperative medical management, pre-surgical fitness optimization, and post-surgical recovery care for oncology patients undergoing tumor resection.</p>
      <h3>Care Protocols</h3>
      <ul>
        <li><strong>Pre-Operative Clearance:</strong> Cardiopulmonary evaluation, nutritional optimization, and metabolic stabilization.</li>
        <li><strong>Post-Operative Recovery:</strong> Wound monitoring, pain management, infection control, and venous thromboembolism (VTE) prophylaxis.</li>
        <li><strong>Oncology Support:</strong> Multidisciplinary coordination with surgical and medical oncologists.</li>
      </ul>
    `
  },

  "routine-health-checkups": {
    name: "Routine Executive Health Checkups",
    content: `
      <p>Comprehensive preventative health screenings designed to detect early asymptomatic medical conditions including hypertension, pre-diabetes, dyslipidemia, and organ dysfunction.</p>
      <h3>Screening Package Includes</h3>
      <ul>
        <li><strong>Comprehensive Lab Panel:</strong> Complete Blood Count (CBC), Fasting Blood Glucose, HbA1c, Lipid Profile, Liver & Kidney function tests.</li>
        <li><strong>Diagnostic Imaging & Screening:</strong> ECG, Chest X-ray, and Abdominal Ultrasound if indicated.</li>
        <li><strong>Physician Consultation:</strong> Detailed clinical assessment, risk stratifying, and personalized preventative care roadmap.</li>
      </ul>
    `
  },

  "vitamin-deficiency": {
    name: "Vitamin & Mineral Deficiency Management",
    content: `
      <p>Clinical evaluation and therapeutic supplementation for essential micronutrient deficiencies affecting bone health, nerve function, immunity, and energy levels.</p>
      <h3>Common Deficiencies Treated</h3>
      <ul>
        <li><strong>Vitamin D3 Deficiency:</strong> Causes bone pain, muscle weakness, osteopenia, and fatigue.</li>
        <li><strong>Vitamin B12 Deficiency:</strong> Leads to megaloblastic anemia, peripheral neuropathy, memory loss, and tingling sensations.</li>
        <li><strong>Iron & Calcium Deficiencies:</strong> Causes fatigue, anemia, brittle nails, and diminished bone density.</li>
      </ul>
      <h3>Treatment Protocol</h3>
      <ul>
        <li>Serum biomarker testing (25-OH Vitamin D, B12, Serum Ferritin).</li>
        <li>Therapeutic oral or parenteral supplementation and dietary modification plans.</li>
      </ul>
    `
  },

  "diet-lifestyle-modifications": {
    name: "Diet & Lifestyle Modifications",
    content: `
      <p>Evidence-based nutritional counseling, medical weight management, and therapeutic lifestyle changes tailored to manage metabolic diseases, diabetes, hypertension, and fatty liver.</p>
      <h3>Key Clinical Focus Areas</h3>
      <ul>
        <li><strong>Glycemic Control Diet:</strong> Low glycemic index meal plans for optimal HbA1c regulation.</li>
        <li><strong>DASH & Heart-Healthy Diet:</strong> Low-sodium, high-potassium nutrition for blood pressure optimization.</li>
        <li><strong>Weight & Exercise Management:</strong> Safe aerobic and resistance exercise schedules for metabolic health.</li>
      </ul>
    `
  },

  "dyslipidemia": {
    name: "Dyslipidemia & Lipid Management",
    content: `
      <p>Dyslipidemia is an abnormal elevation of serum cholesterol, triglycerides, or low-density lipoproteins (LDL) that significantly increases arterial plaque formation and stroke risk.</p>
      <h3>Clinical Diagnostic Targets</h3>
      <ul>
        <li>Fasting Lipid Panel: Total Cholesterol, LDL-C, HDL-C, Triglycerides, and Non-HDL Cholesterol.</li>
        <li>Atherosclerotic Cardiovascular Disease (ASCVD) Risk Assessment.</li>
      </ul>
      <h3>Management Strategy</h3>
      <ul>
        <li><strong>Statin & Lipid-Lowering Therapy:</strong> High-intensity or moderate-intensity statins tailored to patient risk.</li>
        <li><strong>Dietary Interventions:</strong> Reduction of saturated fats, elimination of trans-fats, and increase in soluble fiber.</li>
      </ul>
    `
  },

  "septic-syndrome": {
    name: "Septic Syndrome & Severe Infection Care",
    content: `
      <p>Septic Syndrome (Sepsis) is a life-threatening organ dysfunction caused by a dysregulated host response to severe bacterial, viral, or fungal infections.</p>
      <h3>Early Warning Signs</h3>
      <ul>
        <li>High fever or hypothermia with severe chills/shivering.</li>
        <li>Rapid heart rate (tachycardia), rapid breathing (tachypnea), and altered mental state.</li>
        <li>Low blood pressure (hypotension) and reduced urine output.</li>
      </ul>
      <h3>Emergency Protocol</h3>
      <ul>
        <li>Immediate broad-spectrum intravenous antimicrobial therapy.</li>
        <li>Hemodynamic stabilization with IV fluids and vasopressors if required.</li>
        <li>Source control and intensive hemodynamic monitoring.</li>
      </ul>
    `
  },

  "geriatric-care": {
    name: "Geriatric Medicine & Elderly Care",
    content: `
      <p>Specialized comprehensive healthcare tailored for senior citizens, addressing multiple co-morbidities, polypharmacy management, cognitive wellness, and mobility maintenance.</p>
      <h3>Core Geriatric Focus Areas</h3>
      <ul>
        <li><strong>Polypharmacy Optimization:</strong> Medication review to eliminate drug interactions and unnecessary prescriptions.</li>
        <li><strong>Chronic Disease Co-Management:</strong> Coordinated care for hypertension, diabetes, arthritis, and heart disease.</li>
        <li><strong>Fall Prevention & Frailty:</strong> Bone density optimization, joint stabilization, and mobility support.</li>
      </ul>
    `
  }
};
