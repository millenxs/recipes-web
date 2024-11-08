import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LassoButton from "../components/LassoButton";

const Home: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>(""); 
  const [errorMessage, setErrorMessage] = useState<string>("");
  const navigate = useNavigate();

  const handleSearch = (): void => {
    if (!ingredients.trim()) {
      setErrorMessage("Please enter some ingredients before searching!");
      return;
    }

    navigate(`/recipes?ingredients=${encodeURIComponent(ingredients)}`);
  };

  const handleKeypress = (e: React.KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="container mx-auto flex items-center justify-center max-h-screen">
      <div className="box-content p-4 md:box-content rounded-lg shadow-2xl max-w-[500px] h-[450px]">
        <div className="min-h-[360px] align-center p-2">
          <h1 className="text-3xl md:text-4xl font-bold title text-center">
            Simple and Tasty Recipes
          </h1>
          <p className="md:text-lg mb-4 mr-3 paragraph text-center w-full">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
            tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
            veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
            commodo consequat.
          </p>
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <div className="relative rounded-lg w-3/4 overflow-hidden">
              <input
                type="text"
                value={ingredients}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIngredients(e.target.value)
                }
                onKeyPress={handleKeypress}
                placeholder="Ex: tomato, cheese, garlic..."
                className="input w-full md:w-3/4 lg:w-[350px] shadow-lg focus:border-2 border-[#be8040] px-4 py-3 rounded-xl transition-all outline-none text-sm md:text-white ml-0 md:ml-3"
              />
              {errorMessage && (
                <p className="text-red-500 text-sm mt-3">{errorMessage}</p>
              )}
              <LassoButton onClick={handleSearch}>
                Search
              </LassoButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
