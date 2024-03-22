import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Nav from "./Components/Nav";
import FilmGrain from "./film-grain.jpeg";
import Search from "./Components/Search";

export interface Drink {
  idDrink: number;
  strDrink: string;
  strCatagory: string;
  strGlass: string;
  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strMeasure1: string;
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strMeasure6: string;
  strMeasure7: string;
  strMeasure8: string;
  strMeasure9: string;
  strMeasure10: string;
  strDrinkThumb: string;
  strInstructions: string;
}

function App() {
  const [selectedLetter, setSelectedLetter] = useState("a");
  const [drinks, setDrinks] = useState<any[]>([]);
  const [data, setData] = useState<any>(null);

  const handleLetterSelection = (letter: string) => {
    setSelectedLetter(letter);
    fetchData(letter);
  };

  const fetchData = async (letter: string) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
      const response = await axios.get(url);
      setData(response.data);

      // Check if the drinks array is empty
      if (response.data.drinks.length === 0) {
        // If drinks array is empty, return null
        setDrinks([]); // Set drinks state to empty array to clear any previous data
        return null;
      } else {
        // If drinks array is not empty, set drinks state with fetched data
        setDrinks(response.data.drinks);
      }
    } catch (error) {
      console.error("Error fetching the data:", error);
    }
  };

  const handleSearch = async (searchQuery: string) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`;
      const response = await axios.get(url);
      setData(response.data);

      // Check if the drinks array is empty
      if (response.data.drinks === null) {
        // If drinks array is null, return null
        setDrinks([]); // Set drinks state to empty array to clear any previous data
        return null;
      } else {
        // If drinks array is not empty, set drinks state with fetched data
        setDrinks(response.data.drinks);
      }
    } catch (error) {
      console.error("Error fetching the data:", error);
    }
  };

  function renderDrink(drink: Drink, index: number) {
    return (
      <div key={index} className="drinks-container">
        <div className="drinks-info">
          <h1 className="drinks-name">{drink.strDrink}</h1>
          <h3 className="drinks-glass">{drink.strGlass}</h3>
          <p className="drinks-instructions">{drink.strInstructions}</p>
        </div>
        <div className="drink-ingredients">
          {[...Array(10)].map((_, i) => (
            <li key={i}>
              {drink[`strMeasure${i + 1}` as keyof Drink]} -{" "}
              {drink[`strIngredient${i + 1}` as keyof Drink]}
            </li>
          ))}
        </div>
        <div className="drink-image-container">
          <img
            src={drink.strDrinkThumb}
            alt={drink.strDrink}
            className="drinks-image"
          />
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <img src={FilmGrain} className="overlay" alt="Overlay" />
      <Search onSearch={handleSearch} />
      <Nav onSelectLetter={handleLetterSelection} />
      <div>{drinks.map((drink, index) => renderDrink(drink, index))}</div>
    </div>
  );
}

export default App;
