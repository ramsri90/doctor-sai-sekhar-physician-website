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
      <p>Diabetes Type 1, also called <strong>Type 1 Diabetes Mellitus (T1DM)</strong>, is a chronic autoimmune disease where the immune system mistakenly attacks and destroys the insulin-producing beta cells in the pancreas. This results in little to no insulin production, leading to high blood sugar levels (hyperglycemia).</p>

      <h3>Causes & Risk Factors</h3>
      <ul>
        <li><strong>Autoimmune Reaction:</strong> The body's immune system mistakenly attacks and destroys its own pancreatic beta cells.</li>
        <li><strong>Genetic Predisposition:</strong> Family history of Type 1 Diabetes or autoimmune conditions increases risk.</li>
        <li><strong>Environmental Factors:</strong> Viral infections, dietary triggers, or environmental exposures may initiate the autoimmune cascade.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li><strong>Excessive Thirst (Polydipsia):</strong> Constant unquenchable thirst despite high fluid intake.</li>
        <li><strong>Frequent Urination (Polyuria):</strong> Increased volume and frequency of urination, including night-time waking.</li>
        <li><strong>Extreme Hunger (Polyphagia):</strong> Persistent hunger as body cells cannot utilize glucose without insulin.</li>
        <li><strong>Unintentional Weight Loss:</strong> Rapid weight loss due to muscle and fat breakdown for energy.</li>
        <li><strong>Fatigue and Weakness:</strong> Feeling constantly exhausted and physically weak.</li>
        <li><strong>Blurred Vision:</strong> Fluid shifts in eye lenses caused by elevated blood glucose.</li>
        <li><strong>Slow Healing of Wounds:</strong> Delayed wound healing and increased susceptibility to skin infections.</li>
        <li><strong>Ketoacidosis (Severe Cases):</strong> Nausea, vomiting, abdominal pain, fruity-smelling breath, rapid breathing, and confusion.</li>
      </ul>

      <h3>Diagnosis & Clinical Thresholds</h3>
      <ul>
        <li><strong>Fasting Blood Sugar:</strong> &ge; 126 mg/dL (7.0 mmol/L)</li>
        <li><strong>Random Blood Sugar:</strong> &ge; 200 mg/dL (11.1 mmol/L) accompanied by classic symptoms</li>
        <li><strong>HbA1c Test:</strong> &ge; 6.5% glycated hemoglobin</li>
        <li><strong>C-Peptide Test:</strong> Low or undetectable levels indicate little to no endogenous insulin production.</li>
        <li><strong>Autoantibody Tests:</strong> Detects autoimmune markers such as GAD (Glutamic Acid Decarboxylase) antibodies, IA-2, and ZnT8 antibodies.</li>
      </ul>

      <h3>Treatment & Lifelong Management</h3>
      <ul>
        <li><strong>Lifelong Insulin Therapy:</strong> Basal (long-acting) and bolus (rapid-acting) insulin administered via daily injections or continuous insulin pumps.</li>
        <li><strong>Blood Sugar Monitoring:</strong> Continuous Glucose Monitoring (CGM) or frequent daily fingerstick blood glucose tests.</li>
        <li><strong>Healthy Diet:</strong> Carbohydrate counting, structured balanced meal plans, and low-glycemic index foods.</li>
        <li><strong>Regular Physical Activity:</strong> Exercise helps manage blood sugar, but insulin dosing must be adjusted to prevent hypoglycemia.</li>
        <li><strong>Lifestyle Management:</strong> Avoid smoking, manage psychological stress, and maintain a healthy weight.</li>
      </ul>

      <h3>Complications (If Unmanaged)</h3>
      <ul>
        <li><strong>Short-Term:</strong> Diabetic Ketoacidosis (DKA) – a life-threatening medical emergency requiring immediate ICU care.</li>
        <li><strong>Long-Term:</strong> Peripheral neuropathy, diabetic retinopathy (vision loss), nephropathy (kidney disease), and accelerated cardiovascular disease.</li>
      </ul>
      <p><em>Type 1 diabetes requires lifelong management, but with proper care and medical guidance, individuals can live active, healthy lives.</em></p>
    `
  },

  "type-ii-dm": {
    name: "Type 2 Diabetes Mellitus (T2DM)",
    content: `
      <p><strong>Type 2 Diabetes Mellitus (T2DM)</strong> is a chronic metabolic disorder characterized by insulin resistance and relative insulin deficiency, leading to high blood sugar levels (hyperglycemia). Unlike Type 1 Diabetes, the pancreas still produces insulin, but the body's cells do not respond effectively to it.</p>

      <h3>Causes & Risk Factors</h3>
      <ul>
        <li><strong>Insulin Resistance:</strong> Body cells (muscle, fat, liver) do not respond effectively to insulin.</li>
        <li><strong>Genetics & Family History:</strong> Strong genetic component; family history significantly elevates risk.</li>
        <li><strong>Obesity & Sedentary Lifestyle:</strong> Excess body fat (especially visceral belly fat) and lack of physical activity.</li>
        <li><strong>Unhealthy Diet:</strong> Diets high in refined carbohydrates, sugary beverages, and processed foods.</li>
        <li><strong>Age:</strong> More common in individuals over 45, though increasingly diagnosed in younger adults and teenagers.</li>
        <li><strong>Hypertension & High Cholesterol:</strong> High blood pressure and abnormal lipid profiles increase metabolic risk.</li>
        <li><strong>Gestational Diabetes History:</strong> Prior history of elevated blood sugar during pregnancy.</li>
        <li><strong>Polycystic Ovary Syndrome (PCOS):</strong> Hormonal imbalance associated with elevated insulin resistance.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>Increased thirst (polydipsia) & frequent urination (polyuria)</li>
        <li>Increased hunger (polyphagia) & chronic fatigue</li>
        <li>Blurred vision & slow-healing cuts or sores</li>
        <li>Numbness or tingling in hands and feet (peripheral nerve involvement)</li>
        <li>Frequent infections (e.g., skin, gum, or urinary tract infections)</li>
      </ul>

      <h3>Diagnostic Criteria</h3>
      <ul>
        <li><strong>Fasting Blood Sugar:</strong> &ge; 126 mg/dL (7.0 mmol/L)</li>
        <li><strong>Random Blood Sugar:</strong> &ge; 200 mg/dL (11.1 mmol/L)</li>
        <li><strong>HbA1c (Glycated Hemoglobin):</strong> &ge; 6.5%</li>
        <li><strong>Oral Glucose Tolerance Test (OGTT):</strong> &ge; 200 mg/dL after 2 hours</li>
      </ul>

      <h3>Treatment & Management Protocol</h3>
      <h4>1. Lifestyle Changes (First-Line Treatment)</h4>
      <ul>
        <li><strong>Healthy Diet:</strong> Low-carb, high-fiber diet rich in vegetables, legumes, and lean proteins.</li>
        <li><strong>Regular Exercise:</strong> At least 150 minutes per week of moderate aerobic exercise (brisk walking, cycling) and strength training.</li>
        <li><strong>Weight Loss:</strong> Losing even 5–10% of body weight significantly improves insulin sensitivity and blood sugar control.</li>
        <li><strong>Smoking Cessation & Alcohol Limitation:</strong> Protects cardiovascular and microvascular health.</li>
      </ul>

      <h4>2. Medications (When Lifestyle Modifications Are Insufficient)</h4>
      <ul>
        <li><strong>Metformin:</strong> First-line oral drug; decreases hepatic glucose production and improves insulin sensitivity.</li>
        <li><strong>SGLT2 Inhibitors (e.g., Empagliflozin):</strong> Promotes urinary excretion of excess glucose and provides renal/cardiac protection.</li>
        <li><strong>GLP-1 Agonists (e.g., Liraglutide):</strong> Slows gastric emptying, enhances insulin secretion, and aids weight loss.</li>
        <li><strong>Sulfonylureas (e.g., Glimepiride):</strong> Stimulates pancreatic beta cells to produce more insulin.</li>
        <li><strong>Insulin Therapy:</strong> Indicated for severe or advanced disease progression.</li>
      </ul>

      <h3>Complications (If Unmanaged)</h3>
      <ul>
        <li><strong>Cardiovascular Disease:</strong> Elevated risk of heart attacks, stroke, and peripheral artery disease.</li>
        <li><strong>Diabetic Neuropathy:</strong> Nerve damage causing numbness, tingling, and chronic limb pain.</li>
        <li><strong>Diabetic Retinopathy:</strong> Microvascular eye damage, potential vision loss and blindness.</li>
        <li><strong>Diabetic Nephropathy:</strong> Progressive renal microvascular damage leading to kidney failure.</li>
        <li><strong>Diabetic Foot Ulcers:</strong> Impaired healing and circulation leading to non-healing wounds and amputation risk.</li>
        <li><strong>Cognitive Decline:</strong> Increased risk of dementia and Alzheimer's disease.</li>
      </ul>

      <h3>Prevention & Reversal</h3>
      <p>Healthy diet, portion control, regular exercise, and maintaining an optimal BMI are key. Early intervention in prediabetes can reverse blood sugar elevation and prevent conversion to full T2DM!</p>
    `
  },

  "diabetic-neuropathy": {
    name: "Diabetic Neuropathy",
    content: `
      <p><strong>Diabetic Neuropathy</strong> is a form of nerve damage caused by prolonged high blood sugar levels (hyperglycemia) in individuals with diabetes (both Type 1 and Type 2). It most commonly damages nerves in the legs and feet, but can affect autonomic, proximal, and cranial nerves.</p>

      <h3>Types of Diabetic Neuropathy</h3>
      <ul>
        <li><strong>1. Peripheral Neuropathy (Most Common):</strong> Affects nerves in hands, legs, and feet.<br />
            <em>Symptoms:</em> Tingling, burning sensations, numbness, sharp pains or cramps, loss of temperature/pain sensation (risk of unnoticed injury), hypersensitivity to light touch, and muscle weakness.
        </li>
        <li><strong>2. Autonomic Neuropathy:</strong> Affects the autonomic nervous system controlling involuntary internal organs.<br />
            <em>Symptoms:</em> Postural dizziness or fainting (orthostatic hypotension), gastroparesis (slow stomach emptying, bloating, nausea), bladder dysfunction (urinary retention or incontinence), erectile dysfunction in men, vaginal dryness in women, and abnormal sweating.
        </li>
        <li><strong>3. Proximal Neuropathy (Diabetic Amyotrophy):</strong> Affects nerves in hips, thighs, buttocks, and legs.<br />
            <em>Symptoms:</em> Severe unilateral pain in hips/thighs, leg muscle weakness (difficulty standing up from a chair), and progressive muscle atrophy.
        </li>
        <li><strong>4. Focal Neuropathy (Mononeuropathy):</strong> Affects a specific single nerve, often in the head, torso, or leg.<br />
            <em>Symptoms:</em> Sudden localized pain/weakness, double vision or eye pain (cranial nerve III/VI involvement), carpal tunnel syndrome (median nerve compression in hand).
        </li>
      </ul>

      <h3>Causes & Risk Factors</h3>
      <ul>
        <li><strong>High Blood Sugar (Hyperglycemia):</strong> Chronically elevated glucose damages microvascular capillaries supplying nerves.</li>
        <li><strong>High Blood Pressure & High Cholesterol:</strong> Reduces nerve blood flow and accelerates microvascular injury.</li>
        <li><strong>Smoking & Alcohol Abuse:</strong> Impairs arterial circulation and exerts direct neurotoxic effects.</li>
        <li><strong>Obesity & Inactivity:</strong> Increases inflammatory markers and metabolic stress.</li>
      </ul>

      <h3>Diagnostic Evaluation</h3>
      <ul>
        <li><strong>Physical Examination:</strong> Assessing tendon reflexes, muscle strength, and vibration sensitivity (tuning fork).</li>
        <li><strong>10-gram Monofilament Test:</strong> Evaluates protective touch sensation in feet to identify foot ulcer risk.</li>
        <li><strong>Nerve Conduction Studies (NCS):</strong> Measures the speed and strength of electrical signals passing through nerves.</li>
        <li><strong>Electromyography (EMG):</strong> Evaluates electrical discharge in muscles to pinpoint nerve root damage.</li>
        <li><strong>Autonomic Testing:</strong> Heart rate variability (HRV) analysis, tilt-table test, and sweat response evaluation.</li>
      </ul>

      <h3>Treatment & Clinical Management</h3>
      <ul>
        <li><strong>Glycemic Control:</strong> Maintaining strict, consistent blood sugar levels to prevent further nerve destruction.</li>
        <li><strong>Nerve Pain Relief Medications:</strong>
          <ul>
            <li><em>Pregabalin (Lyrica) & Gabapentin (Neurontin):</em> Neuropathic calcium channel alpha-2-delta ligands for pain relief.</li>
            <li><em>Duloxetine (Cymbalta):</em> Serotonin-norepinephrine reuptake inhibitor (SNRI) effective for neuropathic pain.</li>
            <li><em>Topical Capsaicin Cream & Lidocaine Patches:</em> Localized cutaneous pain relief.</li>
          </ul>
        </li>
        <li><strong>Physical Therapy:</strong> Balance training, physical exercises, and muscle strengthening to reduce fall risks.</li>
        <li><strong>Diabetic Foot Care:</strong> Daily visual inspection, wearing protective footwear, and routine podiatric check-ups.</li>
      </ul>

      <h3>Complications (If Untreated)</h3>
      <ul>
        <li><strong>Foot Ulcers & Infections:</strong> Unnoticed cuts leading to severe infection, gangrene, and lower limb amputation.</li>
        <li><strong>Loss of Balance & Falls:</strong> Impaired proprioception causing gait instability.</li>
        <li><strong>Silent Heart Attacks:</strong> Damaged cardiac autonomic nerves masking ischemic chest pain.</li>
        <li><strong>Severe Gastrointestinal Dysfunction:</strong> Gastroparesis causing persistent vomiting and severe malnutrition.</li>
      </ul>

      <h3>Prevention Checklist</h3>
      <p>Strict blood sugar control, regular physical exercise, tobacco/alcohol avoidance, B-vitamin rich diet, and daily foot inspections are vital for neurological preservation.</p>
    `
  },

  "diabetic-nephropathy": {
    name: "Diabetic Nephropathy",
    content: `
      <p><strong>Diabetic Nephropathy (Diabetic Kidney Disease)</strong> is a progressive microvascular kidney complication caused by long-standing high blood sugar levels in diabetes. It damages the tiny filtering units of the kidneys (glomeruli), leading to protein leaking into urine (proteinuria/albuminuria) and gradual kidney failure.</p>

      <h3>Causes & Risk Factors</h3>
      <ul>
        <li><strong>Chronic Hyperglycemia:</strong> High blood sugar damages renal blood vessels and glomerular filtration barriers.</li>
        <li><strong>Uncontrolled Hypertension:</strong> Elevated systemic blood pressure increases intra-glomerular pressure and strain.</li>
        <li><strong>Dyslipidemia:</strong> Elevated cholesterol accelerates vascular sclerosis in renal tissue.</li>
        <li><strong>Genetics & Family History:</strong> Family history of kidney disease or hypertension.</li>
        <li><strong>Smoking & Excessive Alcohol:</strong> Accelerates renal function decline.</li>
        <li><strong>Obesity & Sedentary Lifestyle:</strong> Increases metabolic hyperfiltration load on kidneys.</li>
      </ul>

      <h3>Symptoms Across Stages</h3>
      <ul>
        <li><strong>Early Stages:</strong> Usually asymptomatic ("silent progression"). Microalbuminuria detectable only via lab tests.</li>
        <li><strong>Later Stages:</strong> Foamy or frothy urine (due to heavy protein leakage), swelling (edema) in feet, ankles, hands, and eyes; frequent nighttime urination (nocturia), persistent fatigue, nausea/vomiting, loss of appetite, shortness of breath (fluid in lungs), and worsening hypertension.</li>
      </ul>

      <h3>Stages of Diabetic Nephropathy</h3>
      <div style="overflow-x: auto; margin: 16px 0;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem;">
          <thead>
            <tr style="background-color: var(--primary-light, #f0fdf4); border-bottom: 2px solid var(--primary);">
              <th style="padding: 10px; border: 1px solid #e2e8f0;">Stage</th>
              <th style="padding: 10px; border: 1px solid #e2e8f0;">eGFR (Kidney Function)</th>
              <th style="padding: 10px; border: 1px solid #e2e8f0;">Clinical Symptoms & Characteristics</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Stage 1</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">&gt; 90 mL/min</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Normal or high eGFR, hyperfiltration, microalbuminuria may begin.</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Stage 2</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">60–89 mL/min</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Mild kidney damage, persistent protein in urine, asymptomatic.</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Stage 3</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">30–59 mL/min</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Moderate kidney damage, mild swelling, rising BP, fatigue.</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Stage 4</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">15–29 mL/min</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Severe kidney damage, pronounced edema, anemia, nausea.</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Stage 5</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">&lt; 15 mL/min</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">End-Stage Kidney Disease (ESKD); dialysis or transplant required.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Diagnostic Workup</h3>
      <ul>
        <li><strong>Urine Albumin-to-Creatinine Ratio (UACR):</strong> Detects microalbuminuria (&gt; 30 mg/g).</li>
        <li><strong>Serum Creatinine & eGFR Blood Test:</strong> Calculates precise filtration capacity.</li>
        <li><strong>Blood Pressure Monitoring:</strong> High BP accelerates glomerulosclerosis.</li>
        <li><strong>Renal Ultrasound / Biopsy:</strong> Rules out non-diabetic kidney pathologies if atypical presentation occurs.</li>
      </ul>

      <h3>Treatment & Prevention Strategy</h3>
      <ul>
        <li><strong>Glycemic Control:</strong> Maintain target HbA1c &lt; 7.0%.</li>
        <li><strong>Renoprotective Blood Pressure Medications:</strong> ACE Inhibitors (e.g., Lisinopril) or ARBs (e.g., Losartan) reduce intra-glomerular pressure and reduce proteinuria.</li>
        <li><strong>SGLT2 Inhibitor Therapy:</strong> Significantly slows CKD progression in diabetic patients.</li>
        <li><strong>Dietary Adjustments:</strong> Low-protein diet (reduces renal workload), low-sodium intake (&lt; 2g/day) to control edema and BP.</li>
        <li><strong>Avoid Nephrotoxic Drugs:</strong> Avoid NSAIDs (such as Ibuprofen, Naproxen) and iodinated radiocontrast agents.</li>
        <li><strong>Statin Lipid Control & Smoking Cessation:</strong> Protects systemic vascular health.</li>
      </ul>
    `
  },

  "hypothyroidism": {
    name: "Hypothyroidism (Underactive Thyroid)",
    content: `
      <p><strong>Hypothyroidism</strong> is a medical condition in which the thyroid gland produces insufficient quantities of essential thyroid hormones—Triiodothyronine (T3) and Thyroxine (T4)—leading to a generalized slowing of body metabolism. It is more common in women and can range from mild subclinical cases to severe myxedema.</p>

      <h3>Causes of Hypothyroidism</h3>
      <ul>
        <li><strong>Hashimoto’s Thyroiditis (Autoimmune Disease):</strong> Most common cause; the body's immune system produces autoantibodies (anti-TPO) that destroy thyroid tissue.</li>
        <li><strong>Iodine Deficiency:</strong> Dietary lack of iodine, which is essential for thyroid hormone synthesis.</li>
        <li><strong>Post-Thyroid Surgery or Radiation Therapy:</strong> Partial/total thyroidectomy or radioactive iodine treatment for hyperthyroidism/thyroid cancer.</li>
        <li><strong>Congenital Hypothyroidism:</strong> Infants born with an underdeveloped or absent thyroid gland.</li>
        <li><strong>Pituitary Gland Dysfunction:</strong> Secondary hypothyroidism caused by inadequate TSH secretion from the pituitary gland.</li>
        <li><strong>Medication-Induced:</strong> Drugs such as Lithium, Amiodarone, and interferon-alpha interfering with thyroid function.</li>
      </ul>

      <h3>Symptoms of Hypothyroidism</h3>
      <ul>
        <li><strong>General Physical Symptoms:</strong> Chronic fatigue, muscle weakness, unexplained weight gain (despite normal eating), cold intolerance (feeling cold when others are comfortable), dry rough skin, brittle hair & nails, puffy face, swollen hands/feet (myxedema).</li>
        <li><strong>Mental & Cognitive Symptoms:</strong> Depression, mood swings, difficulty concentrating ("brain fog"), memory impairment, slow speech.</li>
        <li><strong>Metabolic & Digestive Symptoms:</strong> Constipation, slow heart rate (bradycardia), hoarse voice, high cholesterol.</li>
        <li><strong>Reproductive Symptoms:</strong> Irregular or heavy menstrual bleeding (menorrhagia), infertility, increased miscarriage risk.</li>
        <li><strong>Severe Cases (Myxedema Crisis – Life-Threatening):</strong> Extreme hypothermia, severe bradycardia, hypoventilation, confusion, or myxedema coma (requires immediate emergency ICU care).</li>
      </ul>

      <h3>Diagnostic Evaluation</h3>
      <ul>
        <li><strong>Serum TSH (Thyroid-Stimulating Hormone):</strong> Elevated TSH is the primary sensitive marker for primary hypothyroidism.</li>
        <li><strong>Free T4 (Thyroxine):</strong> Low Free T4 levels confirm overt hypothyroidism.</li>
        <li><strong>Thyroid Autoantibodies (Anti-TPO, TgAb):</strong> High titers confirm Hashimoto's Thyroiditis.</li>
        <li><strong>Thyroid Ultrasound:</strong> Evaluates goiter, thyroid nodules, or parenchymal echotexture.</li>
      </ul>

      <h3>Treatment & Management Protocol</h3>
      <h4>1. Daily Hormone Replacement Therapy</h4>
      <ul>
        <li><strong>Levothyroxine (Synthroid, Eltroxin):</strong> Synthetic T4 hormone taken daily on an empty stomach with water (30–60 minutes before breakfast).</li>
        <li><strong>Dose Titration:</strong> Blood TSH levels rechecked every 6–8 weeks until optimal dosage is established.</li>
      </ul>

      <h4>2. Dietary & Lifestyle Guidance</h4>
      <ul>
        <li><strong>Nutritional Support:</strong> Ensure adequate iodine, selenium, and zinc intake (nuts, seeds, seafood, eggs).</li>
        <li><strong>Avoid Absorption Interferences:</strong> Do not take calcium, iron supplements, antacids, or soy products within 4 hours of levothyroxine. Avoid excessive raw goitrogenic vegetables (raw cabbage, broccoli).</li>
        <li><strong>Regular Exercise:</strong> Helps combat weight gain, constipation, and muscle lethargy.</li>
      </ul>

      <h3>Complications (If Untreated)</h3>
      <ul>
        <li><strong>Goiter:</strong> Thyroid enlargement causing swallowing or breathing discomfort.</li>
        <li><strong>Cardiovascular Disease:</strong> Elevated LDL cholesterol, pericardial effusion, and heart failure.</li>
        <li><strong>Infertility & Developmental Delay:</strong> Maternal hypothyroidism can cause congenital birth defects or cognitive impairments in infants.</li>
        <li><strong>Myxedema Coma:</strong> Fatal end-stage hypothyroid emergency.</li>
      </ul>
    `
  },

  "hyperthyroidism": {
    name: "Hyperthyroidism (Overactive Thyroid)",
    content: `
      <p><strong>Hyperthyroidism</strong> is a condition in which the thyroid gland produces an excess of thyroid hormones (T3 and T4), leading to a hypermetabolic state. It causes rapid weight loss, elevated heart rate, anxiety, tremors, and heat intolerance.</p>

      <h3>Causes of Hyperthyroidism</h3>
      <ul>
        <li><strong>Graves' Disease (Most Common):</strong> Autoimmune disorder where Thyroid-Stimulating Immunoglobulins (TSI) bind to and overstimulate TSH receptors.</li>
        <li><strong>Toxic Multinodular Goiter (Plummer’s Disease):</strong> Thyroid nodules independently hypersecreting T3/T4.</li>
        <li><strong>Thyroiditis (Thyroid Inflammation):</strong> Viral infection or postpartum inflammation releasing stored thyroid hormones into blood.</li>
        <li><strong>Excessive Iodine Intake:</strong> High iodine exposure from amiodarone, contrast agents, or kelp supplements (Jod-Basedow phenomenon).</li>
        <li><strong>Levothyroxine Overdose:</strong> Excessive exogenous thyroid hormone replacement therapy.</li>
      </ul>

      <h3>Symptoms of Hyperthyroidism</h3>
      <ul>
        <li><strong>Metabolic Symptoms:</strong> Unintentional rapid weight loss despite increased appetite, excessive sweating, heat intolerance, warm moist skin.</li>
        <li><strong>Cardiovascular & Nervous Symptoms:</strong> Tachycardia (fast heart rate &gt; 100 bpm), palpitations, atrial fibrillation, tremors (fine hand shaking), anxiety, irritability, severe insomnia.</li>
        <li><strong>Digestive Symptoms:</strong> Frequent bowel movements or persistent diarrhea.</li>
        <li><strong>Eye & Skin Symptoms (Graves' Specific):</strong> Exophthalmos (bulging eyes), eye grittiness, double vision, pretibial myxedema (swollen red shins).</li>
        <li><strong>Reproductive Symptoms:</strong> Light or irregular menstrual cycles, reduced fertility in women, gynecomastia in men.</li>
        <li><strong>Severe Complication (Thyroid Storm):</strong> Life-threatening crisis marked by high fever (&gt; 104°F), severe tachycardia, agitation, delirium, and heart failure.</li>
      </ul>

      <h3>Diagnostic Workup</h3>
      <ul>
        <li><strong>Serum TSH Test:</strong> Suppressed/low TSH (&lt; 0.1 mIU/L).</li>
        <li><strong>Free T4 & Free T3 Blood Tests:</strong> Significantly elevated hormone levels.</li>
        <li><strong>Thyroid Autoantibody Tests:</strong> TSH Receptor Antibodies (TRAb) / TSI positive in Graves' disease.</li>
        <li><strong>Radioactive Iodine Uptake (RAIU) Test:</strong> Differentiates Graves' (diffuse high uptake) from thyroiditis (low uptake) or toxic nodules (nodular uptake).</li>
        <li><strong>Thyroid Ultrasound:</strong> Visualizes nodules, goiter vascularity, and tissue architecture.</li>
      </ul>

      <h3>Treatment Modalities</h3>
      <ul>
        <li><strong>1. Antithyroid Medications:</strong> Methimazole (MMI) or Propylthiouracil (PTU) block thyroid hormone synthesis.</li>
        <li><strong>2. Beta-Blockers (e.g., Propranolol, Atenolol):</strong> Rapidly alleviates heart palpitations, tremors, hypertension, and anxiety.</li>
        <li><strong>3. Radioactive Iodine (RAI-131) Therapy:</strong> Ablative treatment destroying hyperactive thyroid follicular cells.</li>
        <li><strong>4. Surgical Thyroidectomy:</strong> Partial or total thyroidectomy indicated for large goiters, malignancy, or medication intolerance.</li>
      </ul>

      <h3>Complications & Prevention</h3>
      <p>Untreated hyperthyroidism causes cardiac arrhythmias, heart failure, osteoporosis (rapid bone loss), and thyroid storm. Regular monitoring, stress control, and avoiding excess iodine supplements are critical.</p>
    `
  },

  "dengue-fever": {
    name: "Dengue Fever Management",
    content: `
      <p><strong>Dengue Fever</strong> is an acute mosquito-borne viral infection caused by the dengue virus (DENV, serotypes DENV-1, DENV-2, DENV-3, and DENV-4). It is transmitted to humans through the bite of infected female <em>Aedes aegypti</em> and <em>Aedes albopictus</em> mosquitoes.</p>

      <h3>Symptoms of Dengue Fever (Appear 4–10 Days Post-Bite)</h3>
      <ul>
        <li><strong>High Sudden Fever:</strong> High fever spiking up to 104°F (40°C).</li>
        <li><strong>Retro-Orbital Pain:</strong> Severe aching pain behind the eyes.</li>
        <li><strong>Breakbone Body Aches:</strong> Intense muscle, joint, and bone pain.</li>
        <li><strong>Headache & Fatigue:</strong> Severe frontal headache and prostration.</li>
        <li><strong>Gastrointestinal Symptoms:</strong> Persistent nausea, vomiting, loss of appetite.</li>
        <li><strong>Dengue Rash:</strong> Measles-like maculopapular rash appearing 2–5 days after fever onset.</li>
        <li><strong>Mild Bleeding Manifestations:</strong> Epistaxis (nosebleeds), bleeding gums, or petechial skin spots.</li>
      </ul>

      <h3>Severe Dengue (DHF / DSS – Life-Threatening Warning Signs)</h3>
      <p>Severe Dengue (Dengue Hemorrhagic Fever / Dengue Shock Syndrome) occurs when fever drops (critical phase, days 3–7). Immediate emergency hospitalization is mandatory if any warning sign appears:</p>
      <ul>
        <li>Severe, unremitting abdominal pain</li>
        <li>Persistent, intractable vomiting</li>
        <li>Mucosal bleeding (spontaneous bleeding from nose/gums/gastrointestinal tract)</li>
        <li>Rapid breathing (tachypnea) & fluid accumulation (pleural effusion/ascites)</li>
        <li>Severe fatigue, restlessness, or altered mental state</li>
        <li>Rapid drop in blood platelet count (&lt; 50,000/µL) with rising hematocrit (plasma leakage).</li>
      </ul>

      <h3>Diagnostic Evaluation</h3>
      <ul>
        <li><strong>NS1 Antigen Test:</strong> Positive during early acute fever phase (days 1–5).</li>
        <li><strong>Dengue IgM & IgG Antibody Test:</strong> Detects seroconversion in later acute/convalescent phase.</li>
        <li><strong>Complete Blood Count (CBC):</strong> Daily monitoring of platelet count, white blood cells, and hematocrit levels.</li>
      </ul>

      <h3>Treatment & Management Protocol</h3>
      <ul>
        <li><strong>Hydration Therapy:</strong> Aggressive oral fluid intake (ORS, coconut water, fresh juices) or intravenous isotonic fluids for plasma leakage.</li>
        <li><strong>Fever & Pain Management:</strong> Paracetamol (Acetaminophen) for fever relief.<br />
            <strong style="color: #dc2626;">⚠️ CRITICAL CONTRAINDICATION: Avoid NSAIDs (Ibuprofen, Aspirin, Naproxen) as they worsen bleeding and precipitate severe hemorrhage!</strong>
        </li>
        <li><strong>Hospitalization & Platelet Monitoring:</strong> Inpatient monitoring for severe thrombocytopenia or hemodynamic instability.</li>
      </ul>

      <h3>Prevention</h3>
      <p>Eliminate stagnant water breeding sites around homes, wear long clothing, apply mosquito repellents (DEET), and use mosquito nets. Dengvaxia vaccine is available for individuals with confirmed previous dengue infection.</p>
    `
  },

  "malaria": {
    name: "Malaria Diagnosis & Treatment",
    content: `
      <p><strong>Malaria</strong> is a life-threatening protozoal vector-borne infection caused by <em>Plasmodium</em> parasites. It is transmitted to humans through the bites of infected female <em>Anopheles</em> mosquitoes. Once injected, parasites infect liver cells and red blood cells (erythrocytes).</p>

      <h3>Plasmodium Parasite Species</h3>
      <ul>
        <li><strong>Plasmodium falciparum:</strong> The most dangerous species; responsible for severe, fatal complications, cerebral malaria, and organ failure.</li>
        <li><strong>Plasmodium vivax:</strong> Common cause of malaria; forms dormant liver hypnozoites causing recurrent relapses.</li>
        <li><strong>Plasmodium ovale:</strong> Causes relapsing tertian malaria via liver hypnozoites.</li>
        <li><strong>Plasmodium malariae:</strong> Causes quartan fever cycles and chronic low-grade nephrotic syndrome.</li>
        <li><strong>Plasmodium knowlesi:</strong> Zoonotic primate malaria found in Southeast Asia, causing severe rapid parasitemia.</li>
      </ul>

      <h3>Symptoms (Appears 10–15 Days Post-Bite)</h3>
      <ul>
        <li><strong>Paroxysmal Cyclical Fevers:</strong> High fevers occurring every 48 hours (vivax/falciparum) or 72 hours (malariae).</li>
        <li><strong>Rigors & Sweating:</strong> Severe cold shivering chills followed by high fever spikes and drenching sweats.</li>
        <li><strong>Systemic Symptoms:</strong> Intense headache, muscle (myalgia) & joint pain, persistent nausea, vomiting, fatigue, and jaundice (yellow skin/eyes from hemolysis).</li>
      </ul>

      <h3>Severe Malaria Complications (Medical Emergency)</h3>
      <ul>
        <li><strong>Cerebral Malaria:</strong> Parasitized RBC sequestration in brain capillaries causing altered consciousness, seizures, and coma.</li>
        <li><strong>Severe Anemia:</strong> Massive erythrocyte destruction by parasites.</li>
        <li><strong>Acute Kidney Injury & Blackwater Fever:</strong> Hemoglobinuria (dark red urine) and renal failure.</li>
        <li><strong>Acute Respiratory Distress Syndrome (ARDS):</strong> Fluid accumulation in lungs.</li>
        <li><strong>Septic Shock & Multiorgan Failure:</strong> Profound hypotension and lactic acidosis.</li>
      </ul>

      <h3>Diagnostic Testing</h3>
      <ul>
        <li><strong>Giemsa-Stained Peripheral Blood Smear Microscopy:</strong> Gold standard; thick smear for parasite detection, thin smear for species identification.</li>
        <li><strong>Rapid Diagnostic Tests (RDTs):</strong> Antigen-based tests detecting PfHRP2 or Plasmodium LDH.</li>
        <li><strong>Polymerase Chain Reaction (PCR):</strong> Highly sensitive molecular confirmation for low parasitemia.</li>
      </ul>

      <h3>Treatment Guidelines</h3>
      <ul>
        <li><strong>Uncomplicated Malaria:</strong> Artemisinin-based Combination Therapies (ACTs such as Artemether-Lumefantrine or Artesunate-Amodiaquine). Chloroquine for sensitive <em>P. vivax/ovale</em> plus Primaquine/Tafenoquine for liver hypnozoite radical cure.</li>
        <li><strong>Severe Malaria:</strong> Immediate IV Artesunate (or IV Quinine) administered in ICU, followed by full oral ACT course and supportive blood transfusions/dialysis.</li>
      </ul>

      <h3>Prevention Strategies</h3>
      <ul>
        <li><strong>Mosquito Control:</strong> Insecticide-Treated Nets (ITNs), indoor residual spraying, and eliminating stagnant water breeding sites.</li>
        <li><strong>Chemoprophylaxis for Travelers:</strong> Doxycycline, Mefloquine, or Atovaquone-Proguanil taken before entering endemic areas.</li>
        <li><strong>Malaria Vaccines:</strong> RTS,S/AS01 (Mosquirix) and R21/Matrix-M vaccines approved for pediatric prevention in endemic zones.</li>
      </ul>
    `
  },

  "urinary-tract-infection-uti": {
    name: "Urinary Tract Infection (UTI)",
    content: `
      <p>A <strong>Urinary Tract Infection (UTI)</strong> is an infection affecting any portion of the urinary tract system, including the urethra (urethritis), bladder (cystitis), or kidneys (pyelonephritis). UTIs are most commonly caused by uropathogenic <em>Escherichia coli (E. coli)</em> bacteria entering the urethra.</p>

      <h3>Common Symptoms</h3>
      <ul>
        <li><strong>Dysuria:</strong> Painful, sharp burning sensation during urination.</li>
        <li><strong>Pollakiuria & Urgency:</strong> Frequent, sudden, uncontrollable urge to urinate, often producing small amounts.</li>
        <li><strong>Cloudy & Malodorous Urine:</strong> Turbid, cloudy, or foul-smelling urine; may contain visible blood (hematuria).</li>
        <li><strong>Suprapubic & Pelvic Pain:</strong> Pressure or dull aching in lower abdomen and pelvis.</li>
        <li><strong>Upper UTI / Pyelonephritis Signs:</strong> High fever, shaking chills, flank/back pain, nausea, and vomiting (indicates kidney involvement requiring prompt medical care).</li>
      </ul>

      <h3>Causes & Risk Factors</h3>
      <ul>
        <li>Bacterial ascension into urethra (predominantly <em>E. coli</em> from intestinal tract).</li>
        <li>Female anatomy (shorter urethral length).</li>
        <li>Poor hygiene practices or improper wiping.</li>
        <li>Voluntary urinary retention ("holding urine" for long periods).</li>
        <li>Inadequate fluid intake and dehydration.</li>
        <li>Sexual activity or use of diaphragms/spermicides.</li>
        <li>Urinary tract obstructions (kidney stones, enlarged prostate).</li>
      </ul>

      <h3>Diagnosis & Clinical Evaluation</h3>
      <ul>
        <li><strong>Urinalysis (Dipstick & Microscopy):</strong> Checks for leukocyte esterase, nitrites, WBCs, and RBCs.</li>
        <li><strong>Urine Culture & Sensitivity (C&S):</strong> Identifies exact bacterial strain and antibiotic susceptibility.</li>
        <li><strong>Renal Ultrasound or CT scan:</strong> Performed for recurrent UTIs or suspected pyelonephritis/stones.</li>
      </ul>

      <h3>Treatment & Prevention Protocol</h3>
      <ul>
        <li><strong>Targeted Prescription Antibiotics:</strong> Nitrofurantoin, Trimethoprim-Sulfamethoxazole, or Fosfomycin for lower UTIs; Fluoroquinolones or Ceftriaxone for pyelonephritis.</li>
        <li><strong>High Fluid Hydration:</strong> Drinking 2.5–3 liters of water daily to flush bacteria from the urinary tract.</li>
        <li><strong>Urinary Analgesics:</strong> Phenazopyridine for rapid symptomatic relief of severe burning.</li>
        <li><strong>Preventative Habits:</strong> Urinate immediately after intercourse, wipe from front to back, avoid holding urine, limit caffeine and alcohol bladder irritants, and consider cranberry extract supplements.</li>
      </ul>
    `
  },

  "viral-bacterial-infection": {
    name: "Viral vs. Bacterial Infections",
    content: `
      <p>Both <strong>viral and bacterial infections</strong> cause acute infectious illnesses with overlapping clinical features like fever and fatigue. However, viruses and bacteria are fundamentally different microorganisms requiring completely different medical treatments.</p>

      <h3>Comparative Overview</h3>
      <div style="overflow-x: auto; margin: 16px 0;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem;">
          <thead>
            <tr style="background-color: var(--primary-light, #f0fdf4); border-bottom: 2px solid var(--primary);">
              <th style="padding: 10px; border: 1px solid #e2e8f0;">Clinical Feature</th>
              <th style="padding: 10px; border: 1px solid #e2e8f0;">Viral Infection 🦠</th>
              <th style="padding: 10px; border: 1px solid #e2e8f0;">Bacterial Infection 🧫</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Causative Agent</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Submicroscopic genetic code (DNA/RNA) requiring host cells to replicate.</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Single-celled independent living prokaryotic organisms.</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Common Examples</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Common Cold, Influenza (Flu), COVID-19, Measles, Chickenpox, Viral Gastroenteritis.</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Strep Throat, Urinary Tract Infection (UTI), Bacterial Pneumonia, Tuberculosis.</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Onset & Duration</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Gradual onset, widespread systemic symptoms lasting 5–10 days.</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Sudden onset, localized intense pain/swelling, progressive without treatment.</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Fever Response</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Low-grade to moderate fever, clear nasal discharge.</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">High spike fever with severe chills and purulent yellow/green mucus.</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Do Antibiotics Work?</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong style="color: #dc2626;">❌ NO</strong> (Ineffective against viruses)</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong style="color: #16a34a;">✅ YES</strong> (Kills or inhibits bacteria)</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Medical Treatment</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Rest, oral rehydration, symptom relief, specific antivirals if indicated.</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Targeted doctor-prescribed antibiotic regimen.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Clinical Symptoms Breakdown</h3>
      <ul>
        <li><strong>Viral Infection Symptoms:</strong> Clear runny nose, mild sore throat, dry cough, low-grade fever, diffuse body aches, watery diarrhea, fatigue.</li>
        <li><strong>Bacterial Infection Symptoms:</strong> High fever with rigors, localized intense pain/redness/swelling, thick purulent yellow/green exudate, pus formation on tonsils, symptoms worsening after temporary improvement.</li>
      </ul>

      <h3>When to Seek Medical Evaluation</h3>
      <ul>
        <li>Symptoms lasting more than 7–10 days or rapidly worsening.</li>
        <li>High fever (&gt; 102°F / 39°C) unresponsive to paracetamol.</li>
        <li>Shortness of breath, chest pain, or severe difficulty swallowing.</li>
        <li>Stiff neck, severe headache, confusion, or lethargy.</li>
      </ul>
      <p><em>⚠️ Critical Medical Note: Taking antibiotics for viral infections does not cure the illness and promotes dangerous antimicrobial resistance! Always consult Dr. Sai Sekhar P for accurate diagnostic evaluation.</em></p>
    `
  },

  "acute-gastroenteritis": {
    name: "Acute Gastroenteritis",
    content: `
      <p><strong>Acute Gastroenteritis</strong> ("stomach flu") is a sudden inflammation of the mucosal lining of the stomach and intestines. It leads to rapid onset diarrhea, vomiting, abdominal cramping, and dehydration.</p>

      <h3>Causes of Acute Gastroenteritis</h3>
      <ul>
        <li><strong>Viral Infections (Most Common):</strong> Norovirus (leading cause in adults), Rotavirus (common in children), Adenovirus, Astrovirus.</li>
        <li><strong>Bacterial Infections (Food Poisoning):</strong> <em>Salmonella, Escherichia coli (E. coli), Campylobacter jejuni, Shigella, Staphylococcus aureus</em> enterotoxins.</li>
        <li><strong>Parasitic Infections:</strong> <em>Giardia lamblia, Cryptosporidium</em>.</li>
        <li><strong>Transmission:</strong> Contaminated food or water, unhygienic food handling, or direct contact with infected individuals.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>Sudden watery, loose diarrhea (multiple episodes daily)</li>
        <li>Persistent nausea and forceful vomiting</li>
        <li>Diffused abdominal cramps and colicky pain</li>
        <li>Low-grade fever, chills, and headache</li>
        <li>Dehydration signs: dry mouth, sunken eyes, extreme thirst, dizziness, little or dark urine.</li>
      </ul>

      <h3>Treatment & Clinical Management</h3>
      <ul>
        <li><strong>1. Aggressive Hydration (First Priority):</strong> Oral Rehydration Salts (ORS) solution, electrolyte drinks, clear broths. Avoid alcohol, caffeine, and sugary sodas.</li>
        <li><strong>2. Dietary Protocol (BRAT Diet):</strong> Transition to bland food—Bananas, Rice, Applesauce, Toast. Avoid dairy, high-fat, fried, and heavily spiced foods.</li>
        <li><strong>3. Pharmacotherapy:</strong>
          <ul>
            <li><em>Antidiarrheal Agents (Loperamide / Imodium):</em> Controls frequency; avoid in invasive bacterial gastroenteritis with high fever/bloody stool.</li>
            <li><em>Targeted Antibiotics:</em> Prescribed only for confirmed bacterial or parasitic enteritis.</li>
            <li><em>Probiotics (Lactobacillus / Saccharomyces boulardii):</em> Helps restore healthy gut microbiome flora.</li>
          </ul>
        </li>
      </ul>

      <h3>Red Flag Symptoms (Seek Emergency Care)</h3>
      <p>Seek immediate medical assistance if diarrhea/vomiting persists &gt; 3 days, high fever (&gt; 102°F), signs of severe dehydration, or visible blood/mucus in stool or vomit.</p>
    `
  },

  "tension-headache": {
    name: "Tension Headache",
    content: `
      <p>A <strong>Tension Headache</strong> is the most common type of primary headache disorder. It is characterized by a dull, aching pressure or tight band-like sensation around the forehead, temples, or back of the head and neck, primarily caused by muscle contraction and psychological stress.</p>

      <h3>Symptoms of Tension Headache</h3>
      <ul>
        <li>Dull, pressing, or squeezing pain (often described as a tight vise around the head).</li>
        <li>Bilateral distribution (affects both sides of the head equally).</li>
        <li>Mild to moderate intensity that does not worsen with routine physical activity.</li>
        <li>Tenderness in pericranial muscles (scalp, neck, and shoulder muscles).</li>
        <li>Absence of severe nausea, vomiting, or focal neurological deficits.</li>
        <li>Occasional mild sensitivity to either light OR sound (rarely both).</li>
        <li>Duration ranging from 30 minutes to several days.</li>
      </ul>

      <h3>Triggers & Underlying Causes</h3>
      <ul>
        <li>Emotional stress, anxiety, and depression.</li>
        <li>Cervical muscle strain and poor posture (e.g., hunched over computers or smartphone screens).</li>
        <li>Eye strain from uncorrected vision or excessive digital screen time.</li>
        <li>Dehydration and skipping meals (hypoglycemia).</li>
        <li>Sleep deprivation or irregular sleep schedules.</li>
      </ul>

      <h3>Treatment & Relief Strategies</h3>
      <h4>1. Pharmacological Therapy</h4>
      <ul>
        <li><strong>OTC Pain Relievers:</strong> Ibuprofen (Advil), Acetaminophen (Tylenol), or Aspirin taken early during mild pain.</li>
        <li><strong>Combination Analgesics:</strong> Acetaminophen + Caffeine for enhanced pain relief.</li>
        <li><strong>Muscle Relaxants:</strong> Prescribed by a physician for acute cervical muscle spasm.</li>
      </ul>

      <h4>2. Non-Pharmacological & Home Remedies</h4>
      <ul>
        <li><strong>Hot or Cold Therapy:</strong> Warm heating pad or ice pack applied to the neck and shoulders.</li>
        <li><strong>Massage & Physical Therapy:</strong> Scalp, temple, and neck muscle massage to release trigger points.</li>
        <li><strong>Ergonomics & Posture Correction:</strong> Maintain upright spine posture and follow the 20-20-20 screen rule (every 20 mins, look 20 feet away for 20 secs).</li>
        <li><strong>Stress Management:</strong> Deep breathing exercises, yoga, and adequate hydration (2–3L water/day).</li>
      </ul>

      <h3>When to Consult a Physician</h3>
      <p>Consult Dr. Sai Sekhar P if headaches occur &gt; 15 days per month (chronic tension headache), if pain is sudden and severe ("thunderclap headache"), or if accompanied by fever, stiff neck, visual loss, or numbness.</p>
    `
  },

  "migraine": {
    name: "Migraine Management",
    content: `
      <p>A <strong>Migraine</strong> is a complex neurological disorder characterized by recurrent episodes of severe, throbbing, or pulsating headache, typically affecting one side of the head. Migraine attacks can last from 4 to 72 hours and are accompanied by sensory disturbances, nausea, and extreme light sensitivity.</p>

      <h3>Types of Migraine</h3>
      <ul>
        <li><strong>1. Migraine with Aura (Classic Migraine):</strong> Accompanied by transient neurological warning signs (auras) 10–60 minutes before headache onset.<br />
            <em>Aura Symptoms:</em> Visual flashing lights, blind spots, zigzag lines (scintillating scotoma), tingling in face/hand, or speech difficulty.
        </li>
        <li><strong>2. Migraine without Aura (Common Migraine):</strong> Sudden severe throbbing headache occurring without premonitory aura signs.</li>
        <li><strong>3. Chronic Migraine:</strong> Experiencing headache episodes &gt; 15 days per month for at least 3 consecutive months, with &ge; 8 days meeting migraine criteria.</li>
        <li><strong>4. Hemiplegic Migraine (Rare):</strong> Rare subtype causing temporary motor weakness or paralysis on one side of the body, mimicking a stroke.</li>
      </ul>

      <h3>Symptoms During an Attack</h3>
      <ul>
        <li>Severe, throbbing, or pulsating headache pain (usually unilateral).</li>
        <li>Extreme sensitivity to light (photophobia), sound (phonophobia), and odors (osmophobia).</li>
        <li>Persistent nausea and vomiting.</li>
        <li>Blurry vision, dizziness, or lightheadedness.</li>
        <li>Pain worsening with routine physical movement (stair climbing, walking).</li>
      </ul>

      <h3>Common Migraine Triggers</h3>
      <ul>
        <li>Psychological stress and anxiety release.</li>
        <li>Sleep disturbances (insomnia or oversleeping).</li>
        <li>Hormonal fluctuations (menstrual cycle, pregnancy, oral contraceptives).</li>
        <li>Dietary triggers: Aged cheese, chocolate, caffeine withdrawal, processed meats (nitrates), MSG, or alcohol (red wine).</li>
        <li>Environmental factors: Bright flickering lights, loud noises, strong perfumes, weather/barometric pressure shifts.</li>
        <li>Dehydration or skipping meals.</li>
      </ul>

      <h3>Treatment Protocols</h3>
      <h4>1. Acute Rescue Medications</h4>
      <ul>
        <li><strong>Triptans (e.g., Sumatriptan, Rizatriptan):</strong> Serotonin 5-HT1B/1D receptor agonists that constrict cranial blood vessels and block neuro-inflammation.</li>
        <li><strong>Analgesics & NSAIDs:</strong> High-dose Ibuprofen, Naproxen, or combination pain relievers.</li>
        <li><strong>Anti-Emetic Drugs:</strong> Metoclopramide or Ondansetron to control severe nausea and enhance drug absorption.</li>
      </ul>

      <h4>2. Prophylactic Preventative Therapy</h4>
      <p>Indicated for frequent attacks (&gt; 4/month): Beta-blockers (Propranolol), Anticonvulsants (Topiramate), Calcium channel blockers, or CGRP monoclonal antibodies.</p>

      <h4>3. Home Care Interventions</h4>
      <p>Rest in a dark, quiet, soundproof room; apply cold compress to forehead/neck; drink plenty of water; and maintain a consistent sleep routine.</p>
    `
  },

  "rheumatoid-arthritis": {
    name: "Rheumatoid Arthritis",
    content: `
      <p><strong>Rheumatoid Arthritis (RA)</strong> is a chronic, systemic autoimmune disease characterized by persistent synovial inflammation of joints. Unlike osteoarthritis (caused by mechanical wear and tear), RA occurs when the body's immune system mistakenly attacks the synovial lining, leading to joint erosion, bone destruction, and articular deformity.</p>

      <h3>Symptoms of Rheumatoid Arthritis</h3>
      <ul>
        <li><strong>Symmetrical Joint Pain & Swelling:</strong> Tender, warm, swollen joints symmetrically affecting both sides of the body (e.g., both wrists or hands).</li>
        <li><strong>Small Joint Predilection:</strong> Early involvement of Metacarpophalangeal (MCP) and Proximal Interphalangeal (PIP) joints of fingers and feet.</li>
        <li><strong>Prolonged Morning Stiffness:</strong> Joint stiffness lasting longer than 30–60 minutes after waking up or prolonged inactivity.</li>
        <li><strong>Systemic Symptoms:</strong> Chronic fatigue, low-grade fever, weight loss, and general malaise.</li>
        <li><strong>Late Joint Deformities:</strong> Ulnar deviation of fingers, Swan-neck deformity, Boutonnière deformity, and rheumatoid nodules under skin.</li>
      </ul>

      <h3>Causes & Risk Factors</h3>
      <ul>
        <li><strong>Autoimmune Pathogenesis:</strong> Immune system produces autoantibodies (RF & anti-CCP) attacking joint tissue.</li>
        <li><strong>Genetic Susceptibility:</strong> Strong association with HLA-DR4 gene alleles.</li>
        <li><strong>Gender:</strong> 2 to 3 times more prevalent in women.</li>
        <li><strong>Tobacco Smoking:</strong> Major environmental risk factor elevating disease severity and anti-CCP positivity.</li>
        <li><strong>Obesity & Chronic Infections:</strong> Contributes to systemic pro-inflammatory cytokine burden.</li>
      </ul>

      <h3>Diagnostic Evaluation</h3>
      <ul>
        <li><strong>Rheumatoid Factor (RF) Blood Test:</strong> Positive in ~70–80% of RA patients.</li>
        <li><strong>Anti-Cyclic Citrullinated Peptide (Anti-CCP):</strong> Highly specific blood biomarker (&gt; 95% specificity) for early RA.</li>
        <li><strong>Inflammatory Markers (ESR & CRP):</strong> Measures systemic inflammatory activity.</li>
        <li><strong>Imaging (X-ray, Ultrasound, MRI):</strong> Identifies early synovial thickening, joint space narrowing, and marginal bone erosions.</li>
      </ul>

      <h3>Treatment & Clinical Management</h3>
      <ul>
        <li><strong>1. Disease-Modifying Antirheumatic Drugs (DMARDs):</strong>
          <ul>
            <li><em>Methotrexate:</em> First-line anchor DMARD to slow progressive joint destruction.</li>
            <li><em>Leflunomide, Sulfasalazine, Hydroxychloroquine:</em> Alternative or combination synthetic DMARDs.</li>
          </ul>
        </li>
        <li><strong>2. Biologic & Targeted Synthetic Therapies:</strong> TNF-alpha inhibitors (Adalimumab, Etanercept), IL-6 inhibitors, or JAK inhibitors (Tofacitinib) for refractory RA.</li>
        <li><strong>3. Symptom Relief:</strong> NSAIDs (Ibuprofen, Naproxen) and low-dose Corticosteroids (Prednisone) for acute flare control.</li>
        <li><strong>4. Physical Therapy & Lifestyle:</strong> Low-impact exercises (swimming, cycling), anti-inflammatory omega-3 diet, joint splinting, and joint replacement surgery for end-stage destruction.</li>
      </ul>
    `
  },

  "cervical-spondylosis": {
    name: "Cervical Spondylosis",
    content: `
      <p><strong>Cervical Spondylosis</strong> (cervical osteoarthritis / neck degenerative disc disease) is an age-related wear-and-tear condition affecting the cervical spine (neck region). It involves disc dehydration, loss of intervertebral height, osteophyte (bone spur) formation, and potential compression of cervical nerve roots or spinal cord.</p>

      <h3>Causes & Risk Factors</h3>
      <ul>
        <li><strong>Aging:</strong> Natural drying, flattening, and loss of elasticity in cervical intervertebral discs over time.</li>
        <li><strong>Bone Spurs (Osteophytes):</strong> Extra bone overgrowth reacting to disc degeneration, narrowing neural foramina.</li>
        <li><strong>Herniated or Bulging Discs:</strong> Cracks in outer disc annulus letting gel center protrude and press on spinal nerves.</li>
        <li><strong>Poor Posture:</strong> Forward head posture ("tech neck") from prolonged computer or smartphone usage.</li>
        <li><strong>Neck Injuries:</strong> Past trauma or whiplash accelerating spinal wear.</li>
        <li><strong>Occupational Strain & Smoking:</strong> Heavy lifting, repetitive neck motion, and nicotine reducing disc vascular supply.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>Neck pain, stiffness, and restricted range of neck movement (worse in morning or after sustained posture).</li>
        <li>Cervicogenic headaches originating from skull base radiating forward to forehead.</li>
        <li>Cervical Radiculopathy: Numbness, tingling ("pins and needles"), or burning pain radiating down shoulders, arms, and fingers.</li>
        <li>Muscle weakness in hands or arms (difficulty gripping objects or buttoning shirts).</li>
        <li>Neck crepitus (grinding or popping sensation during neck rotation).</li>
        <li>Severe Complication (Cervical Myelopathy): Unsteadiness, difficulty walking, balance loss, or bowel/bladder dysfunction due to spinal cord compression.</li>
      </ul>

      <h3>Diagnostic Evaluation</h3>
      <ul>
        <li><strong>Clinical Neurological Exam:</strong> Testing arm reflexes, cutaneous sensation, motor strength, and Spurling's maneuver.</li>
        <li><strong>Cervical Spine X-Ray:</strong> Visualizes disc space narrowing, loss of cervical lordosis, and bone spurs.</li>
        <li><strong>MRI or CT Scan:</strong> Provides detailed cross-sectional views of herniated discs, nerve root foraminal stenosis, and spinal cord compression.</li>
        <li><strong>Electromyography (EMG):</strong> Measures electrical conduction to differentiate nerve root compression from peripheral neuropathy.</li>
      </ul>

      <h3>Treatment Modalities</h3>
      <ul>
        <li><strong>1. Medications:</strong> Analgesics (Ibuprofen, Paracetamol), Muscle Relaxants (Cyclobenzaprine), Neuropathic Pain Meds (Pregabalin, Gabapentin), short-course oral Steroids or epidural injections.</li>
        <li><strong>2. Physical Therapy & Exercises:</strong> Isometric neck strengthening, gentle cervical traction, posture re-education, and ergonomics.</li>
        <li><strong>3. Lifestyle & Home Remedies:</strong> Cervical contour pillow, hot/cold therapy, avoiding prolonged neck flexion.</li>
        <li><strong>4. Surgical Intervention:</strong> Anterior Cervical Discectomy and Fusion (ACDF) or Laminectomy indicated for persistent weakness or spinal cord compression.</li>
      </ul>
    `
  },

  "lumbar-spondylosis": {
    name: "Lumbar Spondylosis",
    content: `
      <p><strong>Lumbar Spondylosis</strong> (lower back degenerative arthritis) is an age-related degenerative condition affecting the lumbar spine. It is characterized by intervertebral disc degeneration, facet joint osteoarthritis, and osteophyte growth, causing chronic lower back pain, stiffness, and sciatica.</p>

      <h3>Causes & Risk Factors</h3>
      <ul>
        <li><strong>Age-Related Disc Degeneration:</strong> Lumbar discs lose water content, shrink, and lose shock-absorption capacity.</li>
        <li><strong>Osteophyte (Bone Spur) Overgrowth:</strong> Bony spurs encroaching on spinal canal or neural exit foramina.</li>
        <li><strong>Facet Joint Osteoarthritis:</strong> Wear of cartilage lining facet joints in the back of the spine.</li>
        <li><strong>Repetitive Strain & Heavy Lifting:</strong> Occupations requiring heavy manual labor or prolonged sitting.</li>
        <li><strong>Obesity & Inactivity:</strong> Increased mechanical load on lumbar vertebrae paired with weak core stabilizing muscles.</li>
        <li><strong>Genetics & Previous Spinal Trauma:</strong> Inherited susceptibility or past lumbar injuries.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>Chronic lower back pain and stiffness (worse after waking up, prolonged sitting, or bending forward).</li>
        <li><strong>Sciatica (Lumbar Radiculopathy):</strong> Sharp, shooting, or burning pain radiating from lower back through buttocks down back of leg into foot.</li>
        <li>Paresthesias: Numbness, tingling, or "pins and needles" in leg or foot.</li>
        <li>Leg muscle weakness or feeling of legs giving out.</li>
        <li>Difficulty standing upright or walking long distances.</li>
        <li>Grinding or cracking sensation (crepitus) in lower back during movement.</li>
      </ul>

      <h3>Diagnostic Workup</h3>
      <ul>
        <li><strong>Physical & Neurological Exam:</strong> Straight Leg Raise (SLR) test, checking knee/ankle reflexes, and dermatome sensation.</li>
        <li><strong>Lumbar Spine X-Ray:</strong> Detects narrowing of intervertebral disc spaces, vertebral alignment, and bone spurs.</li>
        <li><strong>Lumbar MRI / CT Scan:</strong> Evaluates spinal canal stenosis, herniated discs, and nerve root compression.</li>
        <li><strong>Electromyography (EMG):</strong> Assesses nerve root damage severity.</li>
      </ul>

      <h3>Treatment & Management Protocols</h3>
      <ul>
        <li><strong>1. Medications:</strong> NSAIDs (Ibuprofen, Naproxen), Acetaminophen, Muscle Relaxants, Epidural Steroid Injections, and Neuropathic medications (Pregabalin / Gabapentin) for radicular pain.</li>
        <li><strong>2. Physical Therapy & Core Rehabilitation:</strong> Core stabilization exercises (planks, pelvic tilts), hamstrings stretching, back extension exercises, and posture re-training.</li>
        <li><strong>3. Lifestyle Modifications:</strong> Weight loss to reduce lumbar load, ergonomic chair lumbar support, proper lifting technique (bending knees), heat/ice therapy.</li>
        <li><strong>4. Surgical Options:</strong> Decompressive Laminectomy or Spinal Fusion reserved for progressive neurological deficit or intractable pain.</li>
      </ul>
    `
  },

  "acute-gastritis": {
    name: "Acute Gastritis",
    content: `
      <p><strong>Acute Gastritis</strong> is a sudden, acute inflammation of the stomach lining (gastric mucosa). It produces upper abdominal burning pain, nausea, indigestion, and mucosal erosions.</p>

      <h3>Causes of Acute Gastritis</h3>
      <ul>
        <li><strong>Helicobacter pylori (H. pylori) Bacterial Infection:</strong> Bacteria damaging the protective gastric mucosal barrier.</li>
        <li><strong>NSAID Medication Overuse:</strong> Long-term or high-dose use of NSAIDs (Ibuprofen, Naproxen, Aspirin) inhibiting protective prostaglandins.</li>
        <li><strong>Excessive Alcohol & Tobacco:</strong> Direct chemical irritation and breakdown of stomach lining.</li>
        <li><strong>Spicy, Acidic, or Fried Foods:</strong> Aggravates existing gastric mucosal inflammation.</li>
        <li><strong>Bile Reflux:</strong> Backflow of bile from duodenum into stomach.</li>
        <li><strong>Stress-Induced Gastritis:</strong> Physiological stress from severe illness, surgery, severe burns, or major trauma.</li>
        <li><strong>Autoimmune Gastritis:</strong> Autoantibodies attacking parietal cells producing stomach acid and intrinsic factor.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>Burning or gnawing pain/discomfort in upper abdomen (epigastrium).</li>
        <li>Nausea and vomiting (may be clear, green/yellow bile, or bloody in severe erosions).</li>
        <li>Indigestion, abdominal bloating, and feeling overly full after small meals.</li>
        <li>Loss of appetite and frequent belching/hiccups.</li>
        <li>Dark tarry stools (melena) or coffee-ground vomit in cases of acute mucosal bleeding.</li>
      </ul>

      <h3>Diagnostic Evaluation</h3>
      <ul>
        <li><strong>Physical Examination:</strong> Epigastric tenderness on palpation.</li>
        <li><strong>Upper Gastrointestinal Endoscopy:</strong> Direct visual examination of stomach mucosa showing redness, edema, or hemorrhages.</li>
        <li><strong>H. pylori Diagnostic Testing:</strong> Urea Breath Test (UBT), Stool Antigen Test, or endoscopic biopsy.</li>
        <li><strong>Blood Tests & Stool Occult Blood:</strong> Evaluates anemia and hidden GI bleeding.</li>
      </ul>

      <h3>Treatment & Recovery Plan</h3>
      <ul>
        <li><strong>1. Acid Suppressive Medications:</strong>
          <ul>
            <li><em>Proton Pump Inhibitors (PPIs):</em> Omeprazole, Pantoprazole, Rabeprazole to suppress gastric acid secretion.</li>
            <li><em>H2 Receptor Blockers:</em> Famotidine to reduce stomach acid production.</li>
            <li><em>Antacids:</em> Liquid aluminum/magnesium hydroxide for fast acid neutralization.</li>
            <li><em>Mucosal Coating Agents:</em> Sucralfate to coat and protect stomach lining ulcers.</li>
          </ul>
        </li>
        <li><strong>2. H. pylori Eradication Therapy:</strong> Triple/Quadruple therapy combining PPI + Antibiotics (Amoxicillin + Clarithromycin + Metronidazole).</li>
        <li><strong>3. Dietary Modifications:</strong> Small frequent bland meals, avoiding spicy/acidic/fried foods, eliminating alcohol, caffeine, and smoking.</li>
      </ul>
    `
  },

  "acute-and-chronic-diarrhea": {
    name: "Acute and Chronic Diarrhea",
    content: `
      <p><strong>Diarrhea</strong> is characterized by loose, watery bowel movements occurring more frequently than normal (&ge; 3 times daily). Depending on duration, it is clinically categorized as Acute (lasting &lt; 2 weeks) or Chronic (persisting &gt; 4 weeks).</p>

      <h3>Comparative Breakdown</h3>
      <div style="overflow-x: auto; margin: 16px 0;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem;">
          <thead>
            <tr style="background-color: var(--primary-light, #f0fdf4); border-bottom: 2px solid var(--primary);">
              <th style="padding: 10px; border: 1px solid #e2e8f0;">Clinical Feature</th>
              <th style="padding: 10px; border: 1px solid #e2e8f0;">Acute Diarrhea</th>
              <th style="padding: 10px; border: 1px solid #e2e8f0;">Chronic Diarrhea</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Duration</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Lasts less than 14 days.</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Persists for more than 4 weeks (&gt; 28 days).</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Common Causes</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Viral/bacterial/parasitic gastroenteritis, food poisoning, traveler's diarrhea, acute medication reaction.</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Irritable Bowel Syndrome (IBS-D), Inflammatory Bowel Disease (Crohn's, Ulcerative Colitis), Celiac disease, Malabsorption, Thyroid disorders.</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Primary Symptoms</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Sudden onset watery stools, abdominal cramps, nausea, mild fever.</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Recurrent loose stools, progressive weight loss, nutritional deficiencies, blood/mucus in stool.</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Treatment Approach</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Self-limiting; hydration (ORS), BRAT diet, short-term antidiarrheals/probiotics.</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Diagnostic workup (colonoscopy, blood tests), treating underlying systemic cause.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Detailed Causes</h3>
      <ul>
        <li><strong>Causes of Acute Diarrhea:</strong> Viral infections (Norovirus, Rotavirus), Bacterial food poisoning (Salmonella, E. coli, Campylobacter), Traveler's diarrhea, Medications (Antibiotics, laxatives, antacids with magnesium), Acute stress.</li>
        <li><strong>Causes of Chronic Diarrhea:</strong> Irritable Bowel Syndrome (IBS), Inflammatory Bowel Disease (Crohn's disease, Ulcerative Colitis), Chronic infections (Giardia, C. difficile), Malabsorption (Celiac disease, Lactose intolerance, Pancreatic insufficiency), Endocrine disorders (Hyperthyroidism, Diabetic enteropathy).</li>
      </ul>

      <h3>Symptoms & Warning Red Flags</h3>
      <ul>
        <li>Loose, watery stools, abdominal colicky cramps, nausea, bloating.</li>
        <li><strong style="color: #dc2626;">Red Flags (Seek Immediate Medical Care):</strong> Dehydration (dizziness, dark urine, confusion), visible blood or pus in stool, persistent high fever (&gt; 102°F), severe abdominal pain, unexplained weight loss.</li>
      </ul>

      <h3>Treatment Protocols</h3>
      <ul>
        <li><strong>Hydration (Essential):</strong> Oral Rehydration Salts (ORS), electrolyte fluids, broths.</li>
        <li><strong>Bland Diet:</strong> BRAT diet (Bananas, Rice, Applesauce, Toast). Avoid dairy, high-fat, caffeine, alcohol.</li>
        <li><strong>Medications:</strong> Loperamide (for non-invasive acute cases), Probiotics, targeted antibiotics for bacterial infections, anti-inflammatory drugs (Mesalamine/steroids) for IBD, or gluten-free diet for Celiac disease.</li>
      </ul>
    `
  },

  "constipation": {
    name: "Constipation Care",
    content: `
      <p><strong>Constipation</strong> is a digestive condition defined by infrequent bowel movements (typically fewer than 3 per week), difficulty or straining during defecation, and passing hard, dry stools, often accompanied by abdominal discomfort and bloating.</p>

      <h3>Causes of Constipation</h3>
      <ul>
        <li><strong>Low-Fiber Diet:</strong> Insufficient dietary fiber intake from fruits, vegetables, and whole grains.</li>
        <li><strong>Dehydration:</strong> Inadequate daily water consumption causing excessive water reabsorption in colon.</li>
        <li><strong>Physical Inactivity:</strong> Sedentary lifestyle slowing intestinal peristalsis.</li>
        <li><strong>Ignoring Defecation Urges:</strong> Repeatedly holding in bowel movements causing hardened fecal matter.</li>
        <li><strong>Medication Side Effects:</strong> Opioid pain relievers, iron supplements, antacids containing calcium/aluminum, antidepressants, and antihistamines.</li>
        <li><strong>Chronic Medical Conditions:</strong> Irritable Bowel Syndrome (IBS-C), Hypothyroidism (slow metabolism), Diabetes (autonomic neuropathy), Parkinson's disease, pregnancy.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>Fewer than 3 bowel movements per week</li>
        <li>Hard, lumpy, dry, or painful stools</li>
        <li>Excessive straining during bowel movements</li>
        <li>Sensation of incomplete bowel evacuation or anorectal blockage</li>
        <li>Abdominal bloating, cramping, and fullness</li>
        <li>Loss of appetite or mild nausea</li>
      </ul>

      <h3>Treatment & Relief Protocol</h3>
      <h4>1. Dietary & Lifestyle Changes (First Line)</h4>
      <ul>
        <li><strong>Increase Fiber Intake:</strong> Aim for 25–30 grams of fiber daily (oatmeal, beans, prunes, apples, leafy greens).</li>
        <li><strong>Hydration:</strong> Drink 2 to 3 liters of water throughout the day.</li>
        <li><strong>Daily Physical Activity:</strong> 30 minutes of daily walking, swimming, or yoga to stimulate gut movement.</li>
        <li><strong>Bowel Habits:</strong> Never ignore the urge; establish a regular post-meal bathroom routine.</li>
      </ul>

      <h4>2. Home & Natural Remedies</h4>
      <ul>
        <li>Warm lemon water in the morning to stimulate peristalsis.</li>
        <li>Flaxseeds, chia seeds, or dried prunes (natural sorbitol laxatives).</li>
        <li>1 tablespoon of olive oil on empty stomach.</li>
      </ul>

      <h4>3. Medical Treatments (Laxatives)</h4>
      <ul>
        <li><strong>Stool Softeners:</strong> Docusate sodium (Colace) to hydrate stool.</li>
        <li><strong>Bulk-Forming Fiber Supplements:</strong> Psyllium husk (Metamucil), Methylcellulose (Citrucel).</li>
        <li><strong>Osmotic Laxatives:</strong> Polyethylene Glycol 3350 (MiraLAX), Lactulose, Milk of Magnesia.</li>
        <li><strong>Stimulant Laxatives:</strong> Senna, Bisacodyl (Dulcolax) reserved for short-term occasional use.</li>
      </ul>
      <p><em>Seek medical checkup if constipation persists &gt; 3 weeks, or is accompanied by blood in stool, severe pain, or unexplained weight loss.</em></p>
    `
  },

  "jaundice-liver-problems": {
    name: "Jaundice & Liver Care",
    content: `
      <p><strong>Jaundice</strong> is a clinical condition characterized by yellow pigmentation of the skin, sclera (whites of the eyes), and mucous membranes caused by hyperbilirubinemia (excessive accumulation of bilirubin in blood). It is a major clinical sign of underlying liver, gallbladder, or hematological dysfunction.</p>

      <h3>Causes of Jaundice & Liver Disease</h3>
      <h4>1. Hepatic (Liver-Related) Causes</h4>
      <ul>
        <li><strong>Viral Hepatitis (A, B, C, D, E):</strong> Viral infections causing acute/chronic hepatic inflammation.</li>
        <li><strong>Alcoholic & Non-Alcoholic Fatty Liver Disease (AFLD / NAFLD):</strong> Excess fat accumulation leading to steatohepatitis.</li>
        <li><strong>Liver Cirrhosis:</strong> End-stage chronic liver scarring from prolonged inflammation.</li>
        <li><strong>Toxic / Drug-Induced Liver Injury:</strong> Paracetamol overdose, herbal toxins, or hepatotoxic medications.</li>
        <li><strong>Liver Cancer:</strong> Hepatocellular carcinoma or metastatic liver tumors.</li>
      </ul>

      <h4>2. Extra-Hepatic & Hemolytic Causes</h4>
      <ul>
        <li><strong>Gallbladder & Biliary Obstruction:</strong> Gallstones (cholelithiasis), bile duct strictures, or pancreatic head tumors blocking bile flow.</li>
        <li><strong>Hemolysis:</strong> Rapid breakdown of red blood cells producing excess unconjugated bilirubin.</li>
        <li><strong>Genetic Disorders:</strong> Gilbert’s syndrome or Crigler-Najjar syndrome affecting bilirubin conjugation.</li>
      </ul>

      <h3>Symptoms</h3>
      <ul>
        <li>Yellowing of skin, sclera, and oral mucosa</li>
        <li>Dark tea-colored or cola-colored urine</li>
        <li>Pale, light, or clay-colored stools</li>
        <li>Chronic fatigue, generalized weakness, and loss of appetite</li>
        <li>Nausea, vomiting, and upper right quadrant abdominal pain</li>
        <li>Abdominal swelling (Ascites) and leg edema</li>
        <li>Severe cutaneous itching (Pruritus) due to bile salt deposition</li>
      </ul>

      <h3>Diagnostic Evaluation</h3>
      <ul>
        <li><strong>Liver Function Tests (LFTs):</strong> Serum Total & Direct Bilirubin, ALT, AST, Alkaline Phosphatase (ALP), Gamma-GT, Serum Albumin.</li>
        <li><strong>Complete Blood Count (CBC) & Coagulation Profile:</strong> Evaluates anemia, hemolysis, and PT/INR clotting function.</li>
        <li><strong>Viral Hepatitis Serology Panel:</strong> Anti-HAV, HBsAg, Anti-HCV tests.</li>
        <li><strong>Diagnostic Imaging:</strong> Abdominal Ultrasound, CT Scan, MRCP (Magnetic Resonance Cholangiopancreatography).</li>
        <li><strong>Liver Biopsy:</strong> Assesses liver fibrosis, inflammation, or malignancy.</li>
      </ul>

      <h3>Treatment & Liver Care Protocol</h3>
      <ul>
        <li><strong>Supportive Care:</strong> High fluid hydration, complete alcohol & smoking cessation, liver-friendly low-fat diet.</li>
        <li><strong>Medical Therapy:</strong> Direct-acting antivirals for Hepatitis B/C; Spironolactone/Furosemide diuretics for ascites; Cholestyramine for pruritus.</li>
        <li><strong>Surgical Interventions:</strong> Laparoscopic Cholecystectomy for gallstone obstruction; ERCP for stent placement; Liver Transplantation for end-stage cirrhosis.</li>
      </ul>
    `
  },

  "acute-renal-failure": {
    name: "Acute Renal Failure (AKI)",
    content: `
      <p><strong>Acute Renal Failure (Acute Kidney Injury - AKI)</strong> is a sudden, rapid decline in renal filtering function occurring within hours to days. It leads to nitrogenous waste accumulation (uremia), fluid overload, and dangerous electrolyte disturbances.</p>

      <h3>Clinical Classification of Causes</h3>
      <ul>
        <li><strong>1. Pre-Renal AKI (Reduced Blood Flow to Kidneys):</strong>
          <ul>
            <li>Severe dehydration, hypovolemic shock, or massive blood loss.</li>
            <li>Congestive heart failure (decreased cardiac output).</li>
            <li>Sepsis / Septic shock causing systemic vasodilation.</li>
            <li>Hepatorenal syndrome in advanced liver failure.</li>
          </ul>
        </li>
        <li><strong>2. Intrinsic AKI (Direct Kidney Parenchymal Damage):</strong>
          <ul>
            <li>Acute Tubular Necrosis (ATN) from severe ischemia or nephrotoxins.</li>
            <li>Nephrotoxic drugs: NSAIDs, Aminoglycoside antibiotics, Radiocontrast dyes.</li>
            <li>Glomerulonephritis, Acute Interstitial Nephritis (AIN).</li>
            <li>Autoimmune diseases (Systemic Lupus Erythematosus, Vasculitis).</li>
          </ul>
        </li>
        <li><strong>3. Post-Renal AKI (Urine Outflow Blockage):</strong>
          <ul>
            <li>Bilateral kidney stones or ureteral calculi.</li>
            <li>Benign Prostatic Hyperplasia (BPH) or prostate cancer in men.</li>
            <li>Bladder, cervical, or pelvic retroperitoneal tumors.</li>
          </ul>
        </li>
      </ul>

      <h3>Symptoms of Acute Renal Failure</h3>
      <ul>
        <li>Oliguria (significantly reduced urine output &lt; 400 mL/day) or Anuria (no urine output).</li>
        <li>Fluid retention causing swelling (edema) in legs, feet, ankles, face, or abdomen.</li>
        <li>Severe fatigue, weakness, and nausea/vomiting due to uremic toxin buildup.</li>
        <li>Shortness of breath (dyspnea) from pulmonary fluid accumulation.</li>
        <li>Confusion, drowsiness, or seizures due to uremic encephalopathy or hyponatremia.</li>
        <li>Cardiac arrhythmias (irregular heartbeat) caused by severe hyperkalemia (high potassium).</li>
      </ul>

      <h3>🚨 Emergency Red Flag Warning Signs</h3>
      <p style="color: #dc2626; font-weight: bold;">Seek emergency ICU care immediately if experiencing: No urine output for 12+ hours, severe chest pain/shortness of breath, severe confusion, or seizures.</p>

      <h3>Treatment & Immediate Protocol</h3>
      <ul>
        <li>Emergency hospitalization and vital organ monitoring.</li>
        <li>Hemodynamic fluid resuscitation for pre-renal hypovolemia OR strict fluid restriction if fluid overloaded.</li>
        <li>Immediate discontinuation of all nephrotoxic medications.</li>
        <li>Correction of hyperkalemia (calcium gluconate, insulin + dextrose, sodium polystyrene).</li>
        <li>Surgical or endoscopic relief of urinary tract obstruction (Foley catheter, ureteral stent).</li>
        <li>Emergency Hemodialysis for severe refractory hyperkalemia, fluid overload, or uremia.</li>
      </ul>
    `
  },

  "chronic-renal-failure": {
    name: "Chronic Renal Failure (CKD)",
    content: `
      <p><strong>Chronic Renal Failure (Chronic Kidney Disease - CKD)</strong> is the gradual, progressive, and irreversible loss of renal filtering capacity over months or years. As nephrons degrade, kidneys lose the ability to filter waste products, balance electrolytes, and regulate body fluid levels.</p>

      <h3>Causes & Primary Risk Factors</h3>
      <ul>
        <li><strong>Diabetic Nephropathy:</strong> Uncontrolled diabetes mellitus is the leading cause worldwide.</li>
        <li><strong>Hypertension (High Blood Pressure):</strong> Chronically elevated pressure damaging renal arterioles.</li>
        <li><strong>Chronic Glomerulonephritis:</strong> Autoimmune inflammation of kidney filtering units.</li>
        <li><strong>Polycystic Kidney Disease (PKD):</strong> Genetic condition causing multiple fluid-filled cysts in kidneys.</li>
        <li><strong>Recurrent Pyelonephritis & Urinary Obstruction:</strong> Repeated kidney infections or long-standing stones.</li>
        <li><strong>Smoking, Obesity, & High Cholesterol:</strong> Accelerates renal microvascular damage.</li>
      </ul>

      <h3>Stages of Chronic Kidney Disease (CKD)</h3>
      <div style="overflow-x: auto; margin: 16px 0;">
        <table style="width: 100%; border-collapse: collapse; text-align: left; font-size: 0.95rem;">
          <thead>
            <tr style="background-color: var(--primary-light, #f0fdf4); border-bottom: 2px solid var(--primary);">
              <th style="padding: 10px; border: 1px solid #e2e8f0;">Stage</th>
              <th style="padding: 10px; border: 1px solid #e2e8f0;">eGFR (mL/min/1.73m²)</th>
              <th style="padding: 10px; border: 1px solid #e2e8f0;">Kidney Status & Symptoms</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Stage 1</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">&ge; 90</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Normal function with early kidney damage (proteinuria/microalbuminuria).</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Stage 2</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">60–89</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Mild reduction in filtration; usually asymptomatic.</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Stage 3</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">30–59</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Moderate reduction; swelling, rising blood pressure, early anemia.</td>
            </tr>
            <tr style="background-color: #f8fafc;">
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Stage 4</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">15–29</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">Severe reduction; pronounced edema, fatigue, nausea, metabolic acidosis.</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #e2e8f0;"><strong>Stage 5</strong></td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">&lt; 15</td>
              <td style="padding: 10px; border: 1px solid #e2e8f0;">End-Stage Renal Disease (ESRD); kidney failure requiring dialysis or transplant.</td>
            </tr>
          </tbody>
        </table>
      </div>

      <h3>Symptoms</h3>
      <ul>
        <li>Early stages: Asymptomatic.</li>
        <li>Later stages: Progressive fatigue, persistent edema (swelling of legs, ankles, face), foamy urine, nocturia, nausea, loss of appetite, metallic taste in mouth (uremic fetor), dry itchy skin (pruritus), muscle cramps, anemia, and difficult-to-control hypertension.</li>
      </ul>

      <h3>Management & Progression Delay Protocol</h3>
      <ul>
        <li><strong>Strict Blood Pressure & Glycemic Target:</strong> BP &lt; 130/80 mmHg, HbA1c &lt; 7.0%.</li>
        <li><strong>Renoprotective Medications:</strong> ACE Inhibitors (Lisinopril) or ARBs (Losartan), and SGLT2 Inhibitors to reduce intra-glomerular pressure and delay ESRD.</li>
        <li><strong>Renal Nutritional Therapy:</strong> Low-protein, low-sodium (&lt; 2g/day), low-potassium, and low-phosphorus diet under nephrology guidance.</li>
        <li><strong>Anemia & Bone Disease Management:</strong> Erythropoietin-stimulating agents (ESA), iron supplementation, and phosphate binders.</li>
        <li><strong>Renal Replacement Therapy (Stage 5):</strong> Maintenance Hemodialysis, Peritoneal Dialysis, or Kidney Transplantation.</li>
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
