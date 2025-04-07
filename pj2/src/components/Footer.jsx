import React from "react";

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
        <footer className="w-full fixed bottom-0 left-0 flex flex-col md:flex-row justify-between items-center p-6 bg-white">
            <div className="flex items-center mb-4 md:mb-0">
                <img
                    src="https://storage.googleapis.com/a1aa/image/ivujRWm4vSIg4GSQ8AMfX1Ao8XyGaPyFlmnZEDp_hnY.jpg"
                    alt="Logo"
                    className="w-6 h-6 mr-4"
                />
                <i className="fab fa-x text-2xl mr-4"></i>
                <i className="fab fa-instagram text-2xl mr-4"></i>
                <i className="fab fa-youtube text-2xl mr-4"></i>
                <i className="fab fa-linkedin text-2xl"></i>
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full md:max-w-4xl">
                {footerSections.map((section, index) => (
                    <div key={index} className="mb-4 md:mb-0 md:mr-16">
                        <h3 className="font-bold text-lg text-black mb-2">{section.title}</h3>
                        <ul>
                            {section.links.map((link, idx) => (
                                <li key={idx} className="mb-2">
                                    <a href="#" className="text-black text-sm">{link}</a>
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