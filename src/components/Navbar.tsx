"use client";

import { useState, useEffect } from "react";

import NextLink from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open (prevents iOS scroll-through)
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.style.position = "fixed";
      document.body.style.width = "100%";
    } else {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    }
    return () => {
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.width = "";
    };
  }, [isOpen]);

  // Close menu on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) setIsOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  // Close nav on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "About Us", href: "/about-us" },
    { name: "About Doctor", href: "/about-doctor" },
    { name: "Clinic", href: "/about-clinic" },
    { name: "Contact Us", href: "/contact" }
  ];

  return (
    <nav className={`navbar-wrapper ${isScrolled ? "scrolled" : ""}`}>
      <div className="container nav-container">
        <NextLink 
          href="/" 
          className="nav-logo" 
          style={{ display: "flex", alignItems: "center", gap: "12px", flexDirection: "row", textDecoration: "none" }}
          onClick={() => {
            setIsOpen(false);
            if (pathname === "/") {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }
          }}
        >
          <Image
            src="/images/logo.png"
            alt="Dr. Sai Sekhar Clinic Logo"
            width={50}
            height={50}
            className="logo-img"
            priority
          />
          <div className="logo-text">
            <span className="logo-title"><span className="doctor-name-highlight">Dr. Sai Sekhar P</span></span>
            <span className="logo-subtitle">Consultant Physician</span>
          </div>
        </NextLink>

        {/* Mobile menu toggle */}
        <button
          className={`menu-toggle ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Navigation Menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        {/* Navigation Links */}
        <div className={`nav-links-wrapper ${isOpen ? "open" : ""}`}>
          <ul className="nav-links">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <li key={link.name}>
                  <NextLink
                    href={link.href}
                    className={`nav-link ${isActive ? "active" : ""}`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.name}
                  </NextLink>
                </li>
              );
            })}
          </ul>
          <NextLink href="/contact" className="btn btn-primary nav-cta" onClick={() => setIsOpen(false)}>
            Book Appointment
          </NextLink>
        </div>
      </div>
    </nav>
  );
}
