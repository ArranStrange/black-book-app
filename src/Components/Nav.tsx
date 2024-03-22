import React, { useEffect, useState } from "react";

interface Props {
  onSelectLetter: (letter: string) => void;
}

export default function Nav({ onSelectLetter }: Props) {
  const [selectedLetter, setSelectedLetter] = useState("");

  const handleLetterClick = (letter: string) => {
    onSelectLetter(letter);
    setSelectedLetter(letter);
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
              <li key={index} onClick={() => handleLetterClick(letter)}>
                {letter}
              </li>
            )
          )}
        </ul>

        <h1 className="current-letter">{selectedLetter}</h1>
      </nav>
    </div>
  );
}
