import { useEffect, useRef } from "react";

const SmoothScroll = ({ children }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const elements = containerRef.current.querySelectorAll(
      "[data-scroll-reveal]"
    );

    const handleScroll = () => {
      elements.forEach((element) => {
        const rect = element.getBoundingClientRect();

        const windowHeight = window.innerHeight;

        // Насколько элемент вошёл в экран
        const progress =
          1 - (rect.top - windowHeight * 0.8) / (windowHeight * 0.5);

        const value = Math.min(Math.max(progress, 0), 1);

        element.style.opacity = value;
        element.style.transform = `
          translateY(${40 - value * 40}px)
        `;
      });
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return <div ref={containerRef}>{children}</div>;
};

export default SmoothScroll;