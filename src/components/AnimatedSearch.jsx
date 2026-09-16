import { useEffect, useState } from "react";
import { Search } from "lucide-react";

const AnimatedSearch = ({ value, onChange }) => {
  const [placeholder, setPlaceholder] = useState("");

  useEffect(() => {
    const text = "Издөө...";
    let index = 0;
    let deleting = false;
    let timeout;

    const animate = () => {
      if (!deleting) {
        index++;
        setPlaceholder(text.slice(0, index));

        if (index === text.length) {
          deleting = true;
          timeout = setTimeout(animate, 1800);
          return;
        }

        timeout = setTimeout(animate, 150);
      } else {
        index--;
        setPlaceholder(text.slice(0, index));

        if (index === 0) {
          deleting = false;
          timeout = setTimeout(animate, 500);
          return;
        }

        timeout = setTimeout(animate, 80);
      }
    };

    animate();

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="relative mb-6">
      <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400">
        <Search size={18} />
      </span>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="
          w-full md:w-96
          pl-11 pr-4 py-2.5
          bg-[#1C3458]
          text-white
          rounded-xl
          text-sm
          focus:outline-none
          placeholder-gray-400
          shadow-sm
          transition-all
          duration-300
          focus:shadow-lg
        "
      />
    </div>
  );
};

export default AnimatedSearch;