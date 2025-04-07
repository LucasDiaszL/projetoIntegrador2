import React from "react";
import Logo from "../assets/caixa-de-ferramentas.png";

const Footer = () => {
  const footerSections = [
    {
      title: "Use cases",
      links: ["UI design", "UX design", "Wireframing", "Diagramming", "Brainstorming", "Online whiteboard", "Team collaboration"]
    },
    {
      title: "Explore",
      links: ["Design", "Prototyping", "Development features", "Design systems", "Collaboration features", "Design process", "FigJam"]
    },
    {
      title: "Resources",
      links: ["Blog", "Best practices", "Colors", "Color wheel", "Support", "Developers", "Resource library"]
    }
  ];

  return (
    <footer className="container mx-auto py-10 px-4 border-t mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
        {/* Logo e direitos autorais */}
        <div className="mb-3">
          <a href="/" className="flex items-center mb-3 text-gray-800 no-underline">
            <img
              src={Logo}
              alt="Logo"
              className="w-10 h-10 mr-2"
            />
          </a>
          <p className="text-gray-500">&copy; 2025</p>
        </div>

        {/* Espaço vazio para manter alinhamento */}
        <div className="mb-3" />

        {/* Seções dinâmicas */}
        {footerSections.map((section, idx) => (
          <div key={idx} className="mb-3">
            <h5 className="text-lg font-semibold text-gray-900 mb-3">{section.title}</h5>
            <ul className="space-y-2">
              {section.links.map((link, index) => (
                <li key={index}>
                  <a href="#" className="text-sm text-gray-500 hover:text-gray-800">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </footer>
  );
};

export default Footer;