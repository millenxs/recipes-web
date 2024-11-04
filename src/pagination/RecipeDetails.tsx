import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

// Definindo a estrutura do objeto RecipeDetail
interface RecipeDetail {
  idMeal: string;
  strMeal: string;
  strInstructions: string;
  strMealThumb: string;
}

const RecipeDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // Tipando o id como string
  const [recipe, setRecipe] = useState<RecipeDetail | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipeDetails = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
        );
        if (response.data.meals && response.data.meals.length > 0) {
          setRecipe(response.data.meals[0]);
        }
      } catch (error) {
        console.error("Erro ao buscar detalhes da receita:", error);
      }
    };

    fetchRecipeDetails();
  }, [id]);

  if (!recipe) return <div>Loading...</div>;

  return (
    <div className="container flex flex-col items-center justify-center p-4 max-h-screen mt-12">
      <h1 className="text-4xl font-bold text-[#BD7F3F] mb-4 text-center">
        {recipe.strMeal}
      </h1>
      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-64 h-64 object-cover rounded-lg shadow-lg mb-4"
      />
      <p className="max-w-xl text-center text-gray-50">
        {recipe.strInstructions}
      </p>
      
      <div className="flex justify-start items-start py-6">
        <button
          className="bg-slate-100/75 text-center w-40 rounded-2xl min-h-[36px] relative text-black text-base font-semibold group"
          type="button"
          onClick={() => navigate(-1)}
        >
          <div className="bg-[#BD7F3F] rounded-xl h-[30px] w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[152px] z-10 duration-500">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 1024 1024"
              height="25px"
              width="25px"
            >
              <path
                d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
                fill="#000000"
              ></path>
              <path
                d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
                fill="#000000"
              ></path>
            </svg>
          </div>
          <p className="translate-x-2">Go Back</p>
        </button>
      </div>
    </div>
  );
};

export default RecipeDetails;
