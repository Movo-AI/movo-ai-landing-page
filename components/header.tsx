"use client";

import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import posthog from "posthog-js";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const trackClick = (
    elementType: string,
    elementText: string,
    section: string,
    metadata?: Record<string, any>
  ) => {
    posthog.capture("button_click", {
      element_type: elementType,
      element_text: elementText,
      section,
      page_url: typeof window !== "undefined" ? window.location.pathname : "",
      ...metadata,
    });
  };

  const scrollToSection = (sectionId: string) => {
    trackClick("button", `Navigate to ${sectionId}`, "header", {
      action: "scroll_to_section",
      section_id: sectionId,
    });
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 80; // Height of fixed header
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition =
        elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
    setMobileMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-[1600px] mx-auto flex h-20 items-center justify-between px-6 md:px-8 lg:px-16">
        <a
          href="/"
          onClick={() =>
            trackClick("link", "Movo Logo", "header", {
              action: "navigate_home",
              link_type: "logo",
            })
          }
          className="flex items-end gap-0.5 group"
        >
          <img
            src="/images/design-mode/Kids%20Playing%20Sport%20Graphic%20Nov%209%202025%20%287%29%20%281%29.png"
            alt="Movo Logo"
            className="w-10 h-10 object-contain transition-transform group-hover:scale-105 flex-shrink-0"
          />
          <span className="font-bold text-2xl text-gray-900 tracking-tight">
            Movo
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-10">
          <button
            onClick={() => scrollToSection("product")}
            className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Product
          </button>
          <button
            onClick={() => scrollToSection("solution")}
            className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Solution
          </button>
          <button
            onClick={() => scrollToSection("success")}
            className="text-base font-medium text-gray-600 hover:text-gray-900 transition-colors"
          >
            Success
          </button>
        </nav>

        <a
          href="https://calendly.com/ari-movo/30min"
          target="_blank"
          rel="noopener noreferrer"
          onClick={() =>
            trackClick("link", "Book a demo", "header", {
              url: "https://calendly.com/ari-movo/30min",
              cta_type: "primary",
              location: "desktop_nav",
            })
          }
          className="hidden md:block"
        >
          <Button
            size="lg"
            className="bg-gray-900 hover:bg-gray-800 text-white rounded-sm px-8 h-12 text-base font-semibold shadow-md hover:shadow-lg transition-all hover:scale-[1.02] cursor-pointer w-full"
          >
            Book a demo
          </Button>
        </a>

        <div className="flex md:hidden">
          <button
            onClick={() => {
              trackClick(
                "button",
                mobileMenuOpen ? "Close Menu" : "Open Menu",
                "header",
                {
                  action: mobileMenuOpen
                    ? "close_mobile_menu"
                    : "open_mobile_menu",
                  menu_type: "mobile",
                }
              );
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="p-2 text-gray-600 hover:text-gray-900 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <nav className="flex flex-col px-6 py-4">
            <button
              onClick={() => scrollToSection("product")}
              className="py-3 text-base font-medium text-gray-600 hover:text-gray-900 transition-colors border-b border-gray-100 text-left"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection("solution")}
              className="py-3 text-base font-medium text-gray-600 hover:text-gray-900 transition-colors border-b border-gray-100 text-left"
            >
              Solution
            </button>
            <button
              onClick={() => scrollToSection("success")}
              className="py-3 text-base font-medium text-gray-600 hover:text-gray-900 transition-colors border-b border-gray-100 text-left"
            >
              Success
            </button>
            <a
              href="https://calendly.com/ari-movo/30min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => {
                trackClick("link", "Book a demo", "header", {
                  url: "https://calendly.com/ari-movo/30min",
                  cta_type: "primary",
                  location: "mobile_menu",
                });
                setMobileMenuOpen(false);
              }}
              className="py-3 text-base font-medium text-gray-900 hover:text-gray-700 transition-colors"
            >
              Book a demo
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
