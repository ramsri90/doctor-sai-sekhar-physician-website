export interface ServiceDetail {
  name: string;
  content: string;
  image?: string;
}

/**
 * Sanitizes and cleans raw HTML content for service detail pages.
 * Strips duplicate titles, emojis, excessive inline bold tags, and normalizes headings.
 */
export function cleanServiceContent(html: string, serviceTitle?: string): string {
  if (!html) return "";

  let cleaned = html;

  // 1. Remove duplicate main H1/H2 header matching service title
  if (serviceTitle) {
    const escaped = serviceTitle.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const titleRegex = new RegExp(`<h[12][^>]*>\\s*(?:<strong[^>]*>)?\\s*` + escaped + `\\s*(?:<\\/strong>)?\\s*<\\/h[12]>`, 'gi');
    cleaned = cleaned.replace(titleRegex, "");
  }

  // 2. Strip emojis and unicode symbols
  cleaned = cleaned.replace(/[\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}\u{1F600}-\u{1F64F}\u{1F900}-\u{1F9FF}\u{1F680}-\u{1F6FF}\u{2300}-\u{23FF}\u{2B50}\u{2B55}\u{3297}\u{3299}🔹✅❌🛑💊💉🩺🩸⚡🌀🏃🥗🏃🚫😷🦠✔️]/gu, "");

  // 3. Remove horizontal rules
  cleaned = cleaned.replace(/<hr\s*\/?>/gi, "");

  // 4. Convert H1 and H2 inside content to H3 subheadings
  cleaned = cleaned.replace(/<h[12]([^>]*)>/gi, '<h3$1>');
  cleaned = cleaned.replace(/<\/h[12]>/gi, '</h3>');

  // 5. Flatten <p> inside <li> tags (<li><p>text</p></li> -> <li>text</li>)
  cleaned = cleaned.replace(/<li([^>]*)>\s*<p[^>]*>([\s\S]*?)<\/p>\s*<\/li>/gi, '<li$1>$2</li>');

  // 6. Remove messy inline bold tags inside normal paragraph body
  cleaned = cleaned.replace(/<p([^>]*)>([\s\S]*?)<\/p>/gi, (match, attrs, pInner) => {
    // If paragraph has multiple strong tags wrapping arbitrary words in normal text
    const strongMatches = pInner.match(/<strong[^>]*>/gi);
    if (strongMatches && strongMatches.length >= 2 && pInner.length > 70 && !pInner.includes(":")) {
      const cleanInner = pInner.replace(/<\/?strong[^>]*>/gi, "");
      return `<p${attrs}>${cleanInner}</p>`;
    }
    return match;
  });

  // 7. Convert pseudo-lists ONLY if lines actually start with dash/bullet/ndash/mdash
  cleaned = cleaned.replace(/<p([^>]*)>([\s\S]*?)<\/p>/gi, (match, attrs, pInner) => {
    if (pInner.includes("<br") || pInner.includes("\n")) {
      const lines = pInner.split(/<br\s*\/?>|\n+/);
      const isBulletList = lines.some((item: string) => /^\s*[\-\•\*\&ndash;\&mdash;]/.test(item.trim()));
      if (isBulletList) {
        const listItems = lines
          .map((item: string) => item.replace(/^[\s\-•\*\&ndash;\&mdash;]+/, "").trim())
          .filter((item: string) => item.length > 0)
          .map((item: string) => `<li>${item}</li>`)
          .join("");
        if (listItems.length > 0) {
          return `<ul>${listItems}</ul>`;
        }
      }
    }
    return match;
  });

  // 8. Strip conversational chatbot questions and closing sentences
  cleaned = cleaned.replace(/<p[^>]*>\s*(?:Would you like|Let me know|Feel free|Hope this|Do you need|If you need|Reach out if)[^<]*<\/p>/gi, "");
  cleaned = cleaned.replace(/(?:Would you like|Let me know|Feel free|Hope this|Do you need|If you need)\s+[^\n.<>]*[\.!\?]/gi, "");

  // 9. Strip any empty <li> tags
  cleaned = cleaned.replace(/<li[^>]*>\s*(?:<br\s*\/?>)?\s*<\/li>/gi, "");

  // 10. Clean up empty <p> or <ul> tags
  cleaned = cleaned.replace(/<(p|ul)[^>]*>\s*<\/\1>/gi, "");

  // 11. Normalize em-dashes and en-dashes to a single dash (-)
  cleaned = cleaned.replace(/&mdash;|&ndash;|—|–/g, "-");

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
        <li><strong>Environmental triggers:</strong> Viruses or dietary factors may trigger the autoimmune cascade in genetically susceptible individuals.</li>
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
        <li><strong>Autoantibody Tests:</strong> Detect autoimmune markers such as GAD (Glutamic Acid Decarboxylase) antibodies.</li>
      </ul>

      <h3>Treatment & Management</h3>
      <ul>
        <li><strong>Lifelong Insulin Therapy:</strong> Basal (long-acting) and bolus (rapid-acting) insulin regimens via injections or insulin pumps.</li>
        <li><strong>Blood Sugar Monitoring:</strong> Continuous Glucose Monitoring (CGM) or frequent fingerstick tests.</li>
        <li><strong>Healthy Diet:</strong> Carbohydrate counting, balanced glycemic index meals, and structured eating schedules.</li>
        <li><strong>Exercise & Physical Activity:</strong> Helps regulate blood sugar, requiring tailored insulin adjustments.</li>
        <li><strong>Lifestyle Management:</strong> Smoking cessation, stress control, and routine diabetic check-ups.</li>
      </ul>

      <h3>Complications (if unmanaged)</h3>
      <ul>
        <li><strong>Short-term:</strong> Diabetic Ketoacidosis (DKA) and severe hypoglycemia.</li>
        <li><strong>Long-term:</strong> Peripheral neuropathy, diabetic retinopathy, nephropathy (kidney disease), and cardiovascular diseases.</li>
      </ul>
    `
  },

  "type-ii-dm": {
    name: "Type II Diabetes Mellitus (T2DM)",
    content: `
      <p>Type 2 Diabetes Mellitus (T2DM) is a chronic metabolic disorder characterized by insulin resistance and relative insulin deficiency, leading to hyperglycemia (high blood sugar levels). Unlike Type 1 Diabetes, the pancreas still produces insulin, but body tissues fail to respond effectively to it.</p>

      <h3>Causes & Risk Factors</h3>
      <ul>
        <li><strong>Insulin Resistance:</strong> Target tissue cells fail to respond effectively to circulating insulin.</li>
        <li><strong>Genetics:</strong> Family history of diabetes significantly increases susceptibility.</li>
        <li><strong>Obesity & Sedentary Lifestyle:</strong> Excess body fat, especially visceral abdominal fat, worsens insulin resistance.</li>
        <li><strong>Unhealthy Diet:</strong> Diets high in processed carbohydrates, refined sugars, and unhealthy fats.</li>
        <li><strong>Age & Metabolic Health:</strong> Increased risk over 45 years, though rising in younger age groups due to lifestyle factors.</li>
        <li><strong>Hypertension & Dyslipidemia:</strong> High blood pressure and abnormal lipid profiles exacerbate metabolic risk.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>Increased thirst (Polydipsia) and frequent urination (Polyuria)</li>
        <li>Increased hunger (Polyphagia) and persistent fatigue</li>
        <li>Blurred vision and slow-healing skin wounds</li>
        <li>Numbness or tingling sensation in hands and feet</li>
        <li>Frequent recurrent infections (skin, gum, or urinary tract)</li>
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
        <li><strong>First-Line Lifestyle Changes:</strong> Low-carb high-fiber diet, 150+ minutes of weekly exercise, 5-10% weight loss target, smoking cessation.</li>
        <li><strong>Oral & Injectable Medications:</strong> Metformin, SGLT2 Inhibitors (e.g., Empagliflozin), GLP-1 Agonists (e.g., Liraglutide, Semaglutide), Sulfonylureas, and Insulin Therapy when clinically indicated.</li>
      </ul>

      <h3>Complications (if unmanaged)</h3>
      <ul>
        <li><strong>Cardiovascular Disease:</strong> Accelerated atherosclerosis, coronary artery disease, heart attacks, and strokes.</li>
        <li><strong>Microvascular Damage:</strong> Diabetic neuropathy, retinopathy (eye damage), and nephropathy (kidney failure).</li>
        <li><strong>Diabetic Foot Complications:</strong> Non-healing foot ulcers risking amputation.</li>
      </ul>
    `
  },

  "pneumonia": {
    name: "Pneumonia Diagnosis & Care",
    content: `
      <p>Pneumonia is an inflammatory infection of the lung parenchyma causing fluid or purulent exudate buildup in the alveoli (air sacs), compromising normal gas exchange.</p>

      <h3>Types of Pneumonia</h3>
      <ul>
        <li><strong>Bacterial Pneumonia:</strong> Caused by bacterial pathogens such as <em>Streptococcus pneumoniae</em>, <em>Haemophilus influenzae</em>, or <em>Mycoplasma pneumoniae</em>.</li>
        <li><strong>Viral Pneumonia:</strong> Caused by respiratory viruses including Influenza, Respiratory Syncytial Virus (RSV), or SARS-CoV-2.</li>
        <li><strong>Fungal Pneumonia:</strong> Occurs in immunocompromised patients (e.g., <em>Histoplasma</em>, <em>Aspergillus</em>).</li>
        <li><strong>Aspiration Pneumonia:</strong> Inhalation of food, liquid, vomit, or saliva into the lower respiratory tract.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>High fever, chills, rigors, and profuse sweating</li>
        <li>Productive cough with yellow, green, or rusty sputum</li>
        <li>Pleuritic chest pain (sharp pain worsened by deep breathing or coughing)</li>
        <li>Shortness of breath (Dyspnea), rapid breathing (Tachypnea), and low oxygen saturation</li>
        <li>Fatigue, confusion (especially in elderly patients), and loss of appetite</li>
      </ul>

      <h3>Diagnosis & Treatment</h3>
      <ul>
        <li><strong>Chest X-ray & CT Scan:</strong> Reveals focal lobar consolidation or diffuse pulmonary infiltrates.</li>
        <li><strong>Laboratory Workup:</strong> Complete Blood Count (leukocytosis), Sputum culture, and Blood cultures.</li>
        <li><strong>Targeted Anti-Microbial Therapy:</strong> Empiric or culture-guided antibiotics, antivirals, or antifungals.</li>
        <li><strong>Supportive Care:</strong> Oxygen supplementation, bronchodilators, hydration, and chest physiotherapy.</li>
      </ul>
    `
  },

  "asthma": {
    name: "Asthma Diagnosis & Management",
    content: `
      <p>Asthma is a chronic inflammatory disorder of the airways characterized by hyper-responsiveness, bronchospasm, mucosal edema, and variable airflow obstruction.</p>

      <h3>Triggers</h3>
      <ul>
        <li>Environmental allergens (pollen, dust mites, pet dander, mold)</li>
        <li>Respiratory viral infections, cold air, and weather shifts</li>
        <li>Air pollution, tobacco smoke, and strong chemical odors</li>
        <li>Physical exercise (Exercise-Induced Bronchospasm) and emotional stress</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>Episodic wheezing (high-pitched whistling sound during expiration)</li>
        <li>Shortness of breath and tightness in the chest</li>
        <li>Chronic dry or productive cough, especially at night or early morning</li>
      </ul>

      <h3>Treatment Strategy</h3>
      <ul>
        <li><strong>Inhaled Corticosteroids (ICS):</strong> Primary controller therapy to suppress airway inflammation.</li>
        <li><strong>Short-Acting Beta-Agonists (SABA):</strong> Quick-relief rescue inhalers (e.g., Salbutamol) for acute bronchospasm.</li>
        <li><strong>Long-Acting Bronchodilators (LABA/LAMA):</strong> Combination inhaler therapy for persistent asthma.</li>
        <li><strong>Spirometry & Peak Flow Monitoring:</strong> Objective monitoring of pulmonary function.</li>
      </ul>
    `
  },

  "copd-chronic-obstructive-pulmonary-disease": {
    name: "COPD Management",
    content: `
      <p>Chronic Obstructive Pulmonary Disease (COPD) is a progressive lung disease comprising chronic bronchitis and emphysema, leading to persistent airflow limitation.</p>

      <h3>Causes & Risk Factors</h3>
      <ul>
        <li>Long-term tobacco smoking (primary cause)</li>
        <li>Occupational dust, chemical fume exposure, and indoor biomass fuel smoke</li>
        <li>Alpha-1 Antitrypsin Deficiency (genetic risk factor)</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>Progressive exertional shortness of breath (dyspnea)</li>
        <li>Chronic productive cough with sputum production</li>
        <li>Wheezing, chest tightness, and frequent respiratory infections</li>
      </ul>

      <h3>Treatment & Rehabilitation</h3>
      <ul>
        <li>Bronchodilator inhalers (LAMA / LABA combination therapy)</li>
        <li>Smoking cessation counseling and pulmonary rehabilitation</li>
        <li>Long-term oxygen therapy for chronic hypoxemia</li>
        <li>Annual Influenza and Pneumococcal vaccinations</li>
      </ul>
    `
  },

  "kidney-stones": {
    name: "Kidney Stones (Urolithiasis)",
    content: `
      <p>Kidney stones (Renal Calculi) are hard mineral deposits formed in the renal pelvis or urinary tract from concentrated urinary solutes.</p>

      <h3>Types of Stones</h3>
      <ul>
        <li><strong>Calcium Oxalate / Phosphate:</strong> Most common type linked to hypercalciuria and dietary oxalates.</li>
        <li><strong>Uric Acid Stones:</strong> Formed in acidic urine associated with gout or high-purine diets.</li>
        <li><strong>Struvite Stones:</strong> Associated with chronic urinary tract infections.</li>
        <li><strong>Cystine Stones:</strong> Rare genetic metabolic disorder.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>Severe, sharp flank pain radiating to the lower abdomen and groin (Renal Colic)</li>
        <li>Hematuria (pink, red, or brown urine)</li>
        <li>Painful urination, urgency, nausea, and vomiting</li>
      </ul>

      <h3>Management</h3>
      <ul>
        <li>Hydration therapy (2.5-3L water daily) and Medical Expulsive Therapy (alpha-blockers)</li>
        <li>Pain relief with physician-prescribed analgesics</li>
        <li>Urological interventions (ESWL, Ureteroscopy) for large or obstructing stones</li>
      </ul>
    `
  },

  "hypertension-htn": {
    name: "Hypertension (High Blood Pressure)",
    content: `
      <p>Hypertension is a chronic elevation of systemic arterial blood pressure (≥ 140/90 mmHg) that increases the risk of stroke, myocardial infarction, and kidney failure.</p>

      <h3>Symptoms & Risk Factors</h3>
      <ul>
        <li>Often asymptomatic ("Silent Killer") until severe organ stress occurs</li>
        <li>Occipital headaches, dizziness, visual disturbances, and chest discomfort in severe spikes</li>
        <li>Risk factors include high sodium intake, obesity, sedentary lifestyle, stress, and family history</li>
      </ul>

      <h3>Management Program</h3>
      <ul>
        <li>Antihypertensive pharmacotherapy (ACE inhibitors, ARBs, CCBs, Diuretics)</li>
        <li>DASH diet (low sodium, high potassium), weight reduction, and routine blood pressure monitoring</li>
      </ul>
    `
  },

  "diabetic-neuropathy": {
    name: "Diabetic Neuropathy",
    content: `
      <p>Diabetic Neuropathy is progressive nerve damage caused by chronic high blood sugar in patients with diabetes, affecting peripheral and autonomic nerve fibers.</p>

      <h3>Types & Symptoms</h3>
      <ul>
        <li><strong>Peripheral Neuropathy:</strong> Tingling, burning sensation, numbness, and pain in feet and hands.</li>
        <li><strong>Autonomic Neuropathy:</strong> Gastroparesis, postural dizziness, neurogenic bladder, and altered sweating.</li>
      </ul>

      <h3>Treatment</h3>
      <ul>
        <li>Strict glycemic regulation to prevent nerve fiber damage</li>
        <li>Neuropathic pain relief with Pregabalin, Gabapentin, or Duloxetine</li>
        <li>Preventative diabetic foot examination and orthotic support</li>
      </ul>
    `
  },

  "diabetic-nephropathy": {
    name: "Diabetic Nephropathy",
    content: `
      <p>Diabetic Nephropathy is chronic kidney disease caused by long-standing diabetes, damaging renal glomeruli and leading to protein leakage in urine.</p>

      <h3>Diagnosis & Care</h3>
      <ul>
        <li>Microalbuminuria urine screening and eGFR monitoring</li>
        <li>Blood pressure control with ACE inhibitors / ARBs and SGLT2 inhibitors</li>
        <li>Renal-protective dietary modifications</li>
      </ul>
    `
  },

  "hypothyroidism": {
    name: "Hypothyroidism (Underactive Thyroid)",
    content: `
      <p>Hypothyroidism is a metabolic condition where the thyroid gland produces insufficient thyroid hormones (T3 and T4), leading to a slowed metabolic rate.</p>

      <h3>Symptoms & Care</h3>
      <ul>
        <li>Fatigue, cold intolerance, unexplained weight gain, dry skin, and constipation</li>
        <li>Elevated serum TSH with low Free T4</li>
        <li>Daily synthetic Levothyroxine replacement therapy with periodic TSH checks</li>
      </ul>
    `
  },

  "hyperthyroidism": {
    name: "Hyperthyroidism (Overactive Thyroid)",
    content: `
      <p>Hyperthyroidism occurs when the thyroid gland produces excess thyroid hormones, accelerating systemic metabolism.</p>

      <h3>Symptoms & Treatment</h3>
      <ul>
        <li>Rapid heartbeat (tachycardia), weight loss, hand tremors, anxiety, and heat intolerance</li>
        <li>Antithyroid medications (Methimazole), beta-blockers, or radioactive iodine therapy</li>
      </ul>
    `
  },

  "dengue-fever": {
    name: "Dengue Fever Management",
    content: `
      <p>Dengue Fever is a mosquito-borne viral infection caused by Dengue virus (DENV 1-4) transmitted by <em>Aedes aegypti</em> mosquitoes.</p>

      <h3>Symptoms & Protocol</h3>
      <ul>
        <li>High fever, severe headache, retro-orbital pain, and joint aches ("breakbone fever")</li>
        <li>Serial platelet and hematocrit monitoring to prevent Dengue Hemorrhagic Risk</li>
        <li>Isotonic fluid therapy and fever management with Paracetamol</li>
      </ul>
    `
  },

  "malaria": {
    name: "Malaria Diagnosis & Treatment",
    content: `
      <p>Malaria is a parasite infection caused by <em>Plasmodium</em> species transmitted via infected female <em>Anopheles</em> mosquitoes.</p>

      <h3>Care Protocol</h3>
      <ul>
        <li>Cyclical fevers, rigors, drenching sweats, and headache</li>
        <li>Rapid Diagnostic Testing (RDT) and microscopic blood smear verification</li>
        <li>Targeted Artemisinin-based Combination Therapy (ACT)</li>
      </ul>
    `
  },

  "urinary-tract-infection-uti": {
    name: "Urinary Tract Infection (UTI)",
    content: `
      <p>A UTI is an infection involving the urethra, bladder, or kidneys, most commonly caused by <em>E. coli</em> bacteria.</p>

      <h3>Symptoms & Management</h3>
      <ul>
        <li>Dysuria (burning during urination), urgency, frequency, and cloudy urine</li>
        <li>Urinalysis, urine culture, targeted antibiotic therapy, and hydration</li>
      </ul>
    `
  },

  "viral-bacterial-infection": {
    name: "Viral vs. Bacterial Infections",
    content: `
      <p>Distinguishing viral from bacterial infections ensures appropriate antibiotic stewardship and targeted medical treatment.</p>

      <h3>Clinical Differentiation</h3>
      <ul>
        <li><strong>Viral:</strong> Diffuse body aches, low-grade fever, self-limiting course, treated with rest and fluids.</li>
        <li><strong>Bacterial:</strong> Sudden high fever, localized severe pain, purulent discharge, requiring targeted antibiotics.</li>
      </ul>
    `
  },

  "acute-gastroenteritis": {
    name: "Acute Gastroenteritis",
    content: `
      <p>Acute Gastroenteritis is an inflammation of the stomach and intestines caused by viruses, bacteria, or parasites.</p>

      <h3>Treatment</h3>
      <ul>
        <li>Watery diarrhea, vomiting, abdominal cramps, and dehydration</li>
        <li>Oral Rehydration Therapy (ORS), bland diet, and targeted anti-microbials when indicated</li>
      </ul>
    `
  },

  "tension-headache": {
    name: "Tension Headache",
    content: `
      <p>Tension-Type Headache is characterized by a dull, band-like pressure around the forehead and neck triggered by stress or posture.</p>

      <h3>Care</h3>
      <ul>
        <li>Non-throbbing bilateral pressure without severe nausea</li>
        <li>Analgesic management, posture correction, and hydration</li>
      </ul>
    `
  },

  "migraine": {
    name: "Migraine Management",
    content: `
      <p>Migraine is a neurological disorder presenting with severe, throbbing unilateral headaches accompanied by light/sound sensitivity and nausea.</p>

      <h3>Treatment</h3>
      <ul>
        <li>Acute abortive therapy (Triptans, analgesics) and daily preventive therapy for frequent attacks</li>
        <li>Identification and avoidance of personal triggers</li>
      </ul>
    `
  },

  "rheumatoid-arthritis": {
    name: "Rheumatoid Arthritis",
    content: `
      <p>Rheumatoid Arthritis is an autoimmune inflammatory joint disease causing symmetrical swelling, morning stiffness, and joint erosion.</p>

      <h3>Management</h3>
      <ul>
        <li>DMARD therapy (Methotrexate), biologic agents, and physical rehabilitation</li>
      </ul>
    `
  },

  "cervical-spondylosis": {
    name: "Cervical Spondylosis",
    content: `
      <p>Cervical Spondylosis is age-related wear of cervical spine discs and vertebrae causing neck pain, stiffness, and nerve compression.</p>

      <h3>Management</h3>
      <ul>
        <li>Anti-inflammatory pharmacotherapy, neck strengthening exercises, and posture correction</li>
      </ul>
    `
  },

  "lumbar-spondylosis": {
    name: "Lumbar Spondylosis",
    content: `
      <p>Lumbar Spondylosis involves degenerative disc and joint changes in the lower back causing localized pain and sciatica.</p>

      <h3>Management</h3>
      <ul>
        <li>Core strengthening, physiotherapy, analgesics, and ergonomic support</li>
      </ul>
    `
  },

  "acute-gastritis": {
    name: "Acute Gastritis",
    content: `
      <p>Acute Gastritis is sudden inflammation of the stomach lining causing epigastric pain, nausea, and indigestion.</p>

      <h3>Treatment</h3>
      <ul>
        <li>Acid suppression with PPIs, H. pylori eradication therapy, and dietary adjustments</li>
      </ul>
    `
  },

  "acute-and-chronic-diarrhea": {
    name: "Acute and Chronic Diarrhea",
    content: `
      <p>Clinical evaluation and targeted treatment for short-term infectious diarrhea or chronic underlying gut conditions.</p>

      <h3>Management</h3>
      <ul>
        <li>ORS rehydration, diagnostic stool panel, and etiology-specific therapy</li>
      </ul>
    `
  },

  "constipation": {
    name: "Constipation Care",
    content: `
      <p>Management of infrequent bowel movements, hard stools, and abdominal discomfort through diet, hydration, and targeted softeners.</p>
    `
  },

  "jaundice-liver-problems": {
    name: "Jaundice & Liver Care",
    content: `
      <p>Clinical evaluation of elevated serum bilirubin, yellowing of skin/eyes, and liver enzyme abnormalities caused by hepatitis, fatty liver, or gallstones.</p>
    `
  },

  "acute-renal-failure": {
    name: "Acute Renal Failure (AKI)",
    content: `
      <p>Sudden decline in kidney function causing waste buildup, fluid retention, and electrolyte imbalance requiring urgent medical intervention.</p>
    `
  },

  "chronic-renal-failure": {
    name: "Chronic Renal Failure (CKD)",
    content: `
      <p>Progressive loss of kidney function over time managed with blood pressure control, renal diet, and disease-modifying therapies.</p>
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

/**
 * Extracts a concise 1-sentence medical summary for a service card.
 */
export function getServiceSummary(slug?: string, fallbackName?: string): string {
  const name = fallbackName || "this medical condition";
  if (!slug) {
    return `Comprehensive clinical consultation, evaluation, and evidence-based management for ${name} by Dr. Sai Sekhar Pyla.`;
  }

  const detail = serviceFallbackMap[slug.toLowerCase()];
  if (detail && detail.content) {
    const match = detail.content.match(/<p[^>]*>([\s\S]*?)<\/p>/i);
    if (match && match[1]) {
      const cleanText = match[1].replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
      if (cleanText.length > 15) {
        return cleanText.length > 130 ? cleanText.substring(0, 127) + "..." : cleanText;
      }
    }
  }

  return `Comprehensive clinical consultation, evaluation, and evidence-based management for ${name} by Dr. Sai Sekhar Pyla.`;
}
