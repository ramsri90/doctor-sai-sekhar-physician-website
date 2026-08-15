"use client";

import NextLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { icon: "fab fa-facebook-f", url: "https://www.facebook.com/profile.php?id=61572975916654", label: "Facebook" },
    { icon: "fab fa-instagram", url: "https://www.instagram.com/dr.saisekhar?igsh=bXBnbWswOGozcmd0", label: "Instagram" },
    { icon: "fab fa-youtube", url: "https://www.youtube.com/channel/UCUmW050qLRLdfBOns1eDMzw", label: "YouTube" },
    { icon: "fab fa-linkedin-in", url: "https://linkdein.com", label: "LinkedIn" }
  ];

  return (
    <footer className="footer-section">
      {/* FontAwesome style injection for social icons */}
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
      
      <div className="container footer-grid">
        {/* Info Column */}
        <div className="footer-col info-col">
          <NextLink 
            href="/" 
            className="footer-logo" 
            style={{ textDecoration: "none" }}
            onClick={() => {
              if (pathname === "/") {
                window.scrollTo({ top: 0, behavior: "smooth" });
              }
            }}
          >
            <Image
              src="/images/logo.png"
              alt="Dr. Sai Sekhar Clinic Logo"
              width={45}
              height={45}
              className="logo-img"
            />
            <div className="logo-text">
              <span className="logo-title"><span className="doctor-name-highlight">Dr. Sai Sekhar P</span></span>
              <span className="logo-subtitle">Internal Medicine Consultant</span>
            </div>
          </NextLink>
          <p className="footer-bio">
            Renowned Consultant Physician in Visakhapatnam. Providing dedicated and comprehensive medical care in lifestyle diseases, diabetes management, critical care, and infectious diseases.
          </p>
          <div className="social-icons">
            {socialLinks.map((s, idx) => (
              <a
                key={idx}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="social-icon-link"
              >
                <i className={s.icon}></i>
              </a>
            ))}
          </div>
        </div>

        {/* Timings Column */}
        <div className="footer-col">
          <h3 className="footer-title">Consultation Timings</h3>
          <div className="timings-block">
            <div className="timing-item">
              <span className="timing-location"><i className="fas fa-clinic-medical"></i> Trinetra Medicals (Muralinagar)</span>
              <span className="timing-hours">6:00 PM – 9:00 PM</span>
              <span className="timing-days">Monday – Saturday</span>
            </div>
            <div className="timing-item">
              <span className="timing-location"><i className="fas fa-certificate"></i> Practitioner Profile</span>
              <span className="timing-hours">MD General Medicine</span>
              <span className="timing-days">12 Years of Experience</span>
            </div>
          </div>
        </div>

        {/* Contacts Column */}
        <div className="footer-col">
          <h3 className="footer-title">Contact Details</h3>
          {/* NAP wrapped in <address> for local SEO signal */}
          <address itemScope itemType="https://schema.org/MedicalClinic" style={{ fontStyle: "normal" }}>
            <span itemProp="name" style={{ display: "none" }}>Trinetra Medicals – Dr. Sai Sekhar P</span>
            <ul className="footer-contacts">
              <li>
                <a href="tel:+916300793688" className="contact-link" itemProp="telephone">
                  <i className="fas fa-phone-alt"></i> +91 63007 93688
                </a>
              </li>
              <li>
                <a href="https://wa.me/916300793688" target="_blank" rel="noopener noreferrer" className="contact-link">
                  <i className="fab fa-whatsapp"></i> +91 63007 93688 (WhatsApp)
                </a>
              </li>
              <li>
                <a href="mailto:info@drsaisekharphysician.com" className="contact-link" itemProp="email">
                  <i className="fas fa-envelope"></i> info@drsaisekharphysician.com
                </a>
              </li>
              <li className="address-li">
                <a 
                  href="https://maps.app.goo.gl/RwBcYF5CqF1yoigb9" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="contact-link"
                >
                  <i className="fas fa-map-marker-alt"></i> 
                  <span itemProp="address" itemScope itemType="https://schema.org/PostalAddress">
                    <span itemProp="streetAddress">Ramalayam Street, Muralinagar</span>,{" "}
                    <span itemProp="addressLocality">Visakhapatnam</span>,{" "}
                    <span itemProp="postalCode">530007</span>
                  </span>
                </a>
              </li>
            </ul>
          </address>
        </div>

        {/* Links Column */}
        <div className="footer-col">
          <h3 className="footer-title">Quick Links</h3>
          <ul className="footer-links">
            <li><NextLink href="/">Home</NextLink></li>
            <li><NextLink href="/about-us">About Us</NextLink></li>
            <li><NextLink href="/about-doctor">About Doctor</NextLink></li>
            <li><NextLink href="/about-clinic">About Clinic</NextLink></li>
            <li><NextLink href="/services">Our Services</NextLink></li>
            <li><NextLink href="/contact">Contact Us</NextLink></li>
            <li><NextLink href="/privacy-policy">Privacy Policy</NextLink></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container bottom-container">
          <p className="copyright-text">
            &copy; {currentYear} Dr. Sai Sekhar P. All Rights Reserved.
          </p>
          <p className="credit-text">
            Designed for professional healthcare excellence.
          </p>
        </div>
      </div>

      
    </footer>
  );
}
