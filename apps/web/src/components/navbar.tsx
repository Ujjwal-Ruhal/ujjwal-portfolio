"use client";
import { Menu, X } from "lucide-react";
import { useState } from "react";
const links = [
  "Home",
  "About",
  "Skills",
  "Projects",
  "Experience",
  "Education",
  "Contact",
];
export function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <header>
      <nav>
        <a className="wordmark" href="#home">
          Ujjwal Ruhal<span>.</span>
        </a>
        <div className="nav-links">
          {links.map((x) => (
            <a href={`#${x.toLowerCase()}`} key={x}>
              {x}
            </a>
          ))}
        </div>
        <span className="availability">
          <i /> Available for opportunities
        </span>
        <button
          className="menu"
          onClick={() => setOpen(!open)}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>
      {open && (
        <div className="mobile-nav">
          {links.map((x) => (
            <a
              onClick={() => setOpen(false)}
              href={`#${x.toLowerCase()}`}
              key={x}
            >
              {x}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}
