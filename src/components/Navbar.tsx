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
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
            alt="Dr. P. Sai Sekhar - General Physician"
            width={50}
            height={50}
            className="logo-img"
            priority
          />
          <div className="logo-text">
            <span className="logo-title">Dr. P. Sai Sekhar</span>
            <span className="logo-subtitle">General Physician</span>
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
                    prefetch={true}
                    className={`nav-link ${isActive ? "active" : ""}`}
                    onClick={(e) => {
                      setIsOpen(false);
                      if (link.href === "/services" && pathname === "/") {
                        e.preventDefault();
                        const el = document.getElementById("services");
                        if (el) {
                          const yOffset = -80;
                          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
                          window.scrollTo({ top: y, behavior: "smooth" });
                        }
                      }
                    }}
                  >
                    {link.name}
                  </NextLink>
                </li>
              );
            })}
          </ul>
          <NextLink href="/contact" prefetch={true} className="btn btn-primary nav-cta" onClick={() => setIsOpen(false)}>
            Book Appointment
          </NextLink>
        </div>
      </div>
    </nav>
  );
}
