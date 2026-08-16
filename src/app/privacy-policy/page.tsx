import type { Metadata } from "next";

export const dynamic = "force-static";
export const revalidate = 3600; // Revalidate every hour

export const metadata: Metadata = {
  title: "Privacy Policy | Dr. Sai Sekhar P Clinic Visakhapatnam",
  description: "Read the Privacy Policy of Dr. Sai Sekhar P's Clinic to understand how we collect, protect, and handle your personal and medical information.",
};

async function getPrivacyPolicyContent() {
  try {
    const res = await fetch("https://admin.drsaisekharphysician.com/api/client/get-dynamic-page-list", { next: { revalidate: 3600 }, signal: AbortSignal.timeout(1200) });
    if (!res.ok) throw new Error("Failed to fetch");
    const json = await res.json();
    const page = json.data.find((p: { slug: string, content: string }) => p.slug === "privacy-policy");
    let content = page ? page.content : "";
    content = content.replace(/<h2>.*?<\/h2>/i, "");
    return content;
  } catch (err) {
    console.error("Error fetching privacy-policy content:", err);
    return `
      <h2>Privacy Policy</h2>
      <p>At <strong>Dr. Sai Sekhar P's Clinic</strong>, we prioritize your privacy and ensure the protection of your personal and medical information.</p>
      <h3>1. Information We Collect</h3>
      <p>We may collect your <strong>name, contact details, medical history, and appointment details</strong> to provide you with the best possible healthcare services.</p>
      <h3>2. How We Use Your Information</h3>
      <ul>
        <li>To schedule and manage appointments</li>
        <li>To maintain medical records</li>
        <li>To send appointment reminders and health-related updates</li>
        <li>To ensure compliance with medical laws and ethics</li>
      </ul>
      <h3>3. Data Security</h3>
      <p>We implement strict security measures to safeguard your personal and medical data. Your information will never be shared with third parties without your consent.</p>
    `;
  }
}

export default async function PrivacyPolicyPage() {
  const content = await getPrivacyPolicyContent();

  return (
    <div className="policy-page-wrapper">
      {/* Header Banner */}
      <div className="page-header bg-gradient-mesh">
        <div className="container">
          <span className="badge">Legal</span>
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-subtitle">How we manage, store, and secure your personal and clinical healthcare records.</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container">
        <div className="card policy-card">
          <div 
            className="rich-text-content"
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </div>
      </div>

      
    </div>
  );
}
