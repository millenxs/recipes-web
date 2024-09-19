import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import LassoButton from "../components/LassoButton";

const Home: React.FC = () => {
  const [ingredients, setIngredients] = useState<string>(""); // Tipo string para os ingredientes
  const navigate = useNavigate();

  const handleSearch = (): void => {
    navigate(`/recipes?ingredients=${ingredients}`);
  };

  return (
    <div className="container mx-auto box-content p-4 border-double border-4 border-indigo-600 md:box-content rounded-lg shadow-2xl max-w-[1000px] h-[450px]">
      <div className="flex flex-row">
        
        {/* Coluna esquerda */}
        <div className="basis-1/2 min-h-[360px] align-center p-2">
          <h1 className="text-3xl md:text-4xl font-bold title text-center">
            Simple and Tasty Recipes
          </h1>
          <p className="md:text-lg mb-4 mr-3 paragraph text-center w-full">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </p>
          {/* Input e botão de busca */}
          <div className="flex flex-col items-center justify-center gap-2 w-full">
            <div className="relative rounded-lg w-3/4 overflow-hidden">
              <input
                type="text"
                value={ingredients}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setIngredients(e.target.value)
                }
                placeholder="Ex: tomato, cheese, garlic..."
                className="input shadow-lg focus:border-2 border-[#be8040] px-5 py-3 rounded-xl transition-all outline-none text-sm md:text-base ml-3"
              />
			<LassoButton onClick={handleSearch}>
              Search
            </LassoButton>
            </div>

          </div>
        </div>

        <div className="basis-1/2 flex justify-center items-center">
          <img className="animate-[spin_12s_linear_infinite] max-h-[400px] object-contain" src="https://static.vecteezy.com/system/resources/previews/046/342/818/non_2x/vegetable-thai-food-isolated-on-transparent-background-free-png.png" alt="Recipe image" />
        </div>
      </div>
    </div>
  );
};

export default Home;
