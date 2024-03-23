import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";

interface Props {
  onSelectLetter: (letter: string) => void;
}

export default function Nav({ onSelectLetter }: Props) {
  const [selectedLetter, setSelectedLetter] = useState("");

  const handleLetterClick = (letter: string) => {
    onSelectLetter(letter);
    setSelectedLetter(letter);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    handleLetterClick("A");
  }, []);

  return (
    <div>
      <nav>
        <ul className="alphabet">
          {Array.from(Array(26), (_, i) => String.fromCharCode(65 + i)).map(
            (letter, index) => (
              <motion.li
                whileHover={{ scale: 1.5 }}
                key={index}
                onClick={() => handleLetterClick(letter)}
              >
                {letter}
              </motion.li>
            )
          )}
        </ul>

        <motion.h1 className="current-letter">{selectedLetter}</motion.h1>
      </nav>
    </div>
  );
}
