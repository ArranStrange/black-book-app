import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import Nav from "./Components/Nav";
import FilmGrain from "./film-grain.jpeg";
import Search from "./Components/Search";

export interface Drink {
  //defines the types for the object elements response from API call
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
  includes: string;
  measure: number;
}

function App() {
  const [selectedLetter, setSelectedLetter] = useState("a");
  //sets state for the selected letter, updates the state when a new letter is clicked. Takes "a" as an initial state.
  const [drinks, setDrinks] = useState<any[]>([]);
  const [data, setData] = useState<any>(null); //state for the response for the API call

  const handleLetterSelection = (letter: string) => {
    setSelectedLetter(letter.toString()); // Convert letter to string explicitly
    fetchData(letter.toString()); // Convert letter to string explicitly
  };

  //API CALL BASED ON SELECTED LETTER
  const fetchData = async (letter: string) => {
    try {
      //try contains the the GET API call
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${letter}`;
      //sets the URL and updates with the letter from the handleLetterSelection function
      const response = await axios.get(url);
      //sends HTTP get request using axios
      // setData(response.data); //sets the state for the date from API call (UNUSED)
      // Check if the drinks array is empty
      if (response.data.drinks.length === 0) {
        // If drinks array is empty, return null - instead of showing and error
        setDrinks([]); // Set drinks state to empty array to clear any previous data
        return null;
      } else {
        // If drinks array is not empty, set drinks state with fetched data
        setDrinks(response.data.drinks);
      }
    } catch (error) {
      //catches any errors and displays error in the console
      console.error("Error fetching the data:", error);
    }
  };

  //API CALL BASED ON TEXT SEARCH
  const handleSearch = async (searchQuery: string) => {
    try {
      const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`;
      const response = await axios.get(url);
      setData(response.data);
      // Check if the drinks array is empty
      if (response.data.drinks.length === 0) {
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
          {[...Array(10)].map((_, i) => {
            const measure = drink[`strMeasure${i + 1}` as keyof Drink];
            const ingredient = drink[`strIngredient${i + 1}` as keyof Drink];
            let displayMeasure = measure;

            if (typeof measure === "string" && measure.includes("oz")) {
              const ounces = parseFloat(measure as string);
              const milliliters = ounces * Math.ceil(29.5735);
              displayMeasure = `${milliliters.toFixed(0)}ml `;
            } else if (
              typeof measure === "string" &&
              measure.includes("shots")
            ) {
              const shots = parseFloat(measure);
              const milliliters = shots * 40.0;
              displayMeasure = `${milliliters.toFixed(0)}ml `;
            } else if (
              typeof measure === "string" &&
              measure.includes("1/2 shot")
            ) {
              const halfShots = parseFloat(measure);
              const milliliters = halfShots * 20;
              displayMeasure = `${milliliters.toFixed(0)}ml `;
            } else if (typeof measure === "string" && measure.includes("cl")) {
              const centiliters = parseFloat(measure);
              const milliliters = centiliters * 10;
              displayMeasure = `${milliliters.toFixed(0)}ml `;
            }

            return (
              <li key={i}>
                {displayMeasure} {ingredient}
              </li>
            );
          })}
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
