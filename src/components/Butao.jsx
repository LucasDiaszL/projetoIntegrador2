import React, { useState } from "react";

const Butao = ({ containerRef }) => {
    const [position, setPosition] = useState({ bottom: 20, right: 20 });

    const teleport = () => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        
        const containerRect = container.getBoundingClientRect();
        const viewportWidth = containerRect.width - 150; 
        const viewportHeight = containerRect.height - 150;

        const randomX = Math.floor(Math.random() * viewportWidth);
        const randomY = Math.floor(Math.random() * viewportHeight);

        setPosition({
            top: randomY + containerRect.top,
            left: randomX + containerRect.left,
            bottom: "auto",
            right: "auto"
        });
    };

    return (
        <button
            onMouseEnter={teleport}
            className="bg-red-500 text-white py-2 px-6 rounded-md hover:bg-red-600 transition-all"
            style={{
                position: "absolute", 
                ...position,
                transition: "top 0.3s, left 0.3s, bottom 0.3s, right 0.3s",
                zIndex: 9999
            }}
        >
            Deletar Conta
        </button>
    );
};

export default Butao;
