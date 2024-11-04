import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import CardCarousel from "../components/CardCarousel";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}
const RecipeList: React.FC = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ingredients = queryParams.get("ingredients");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      setLoading(true);
      setError(null); // Reset error state before fetching
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
            ingredients || ""
          )}`
        );
        setRecipes(response.data.meals || []);
      } catch (error) {
        setError("Erro ao buscar receitas. Tente novamente mais tarde.");
        console.error("Erro ao buscar receitas:", error);
      } finally {
        setLoading(false);
      }
    };

    if (ingredients) {
      fetchRecipes();
    } else {
      setLoading(false);
      setError("Por favor, forneça ingredientes para buscar receitas.");
    }
  }, [ingredients]);

  const handleSelectRecipe = (recipe: Recipe) => {
	console.log("Receita selecionada:", recipe);
	navigate(`/recipe/${recipe.idMeal}`)
  }

  return (
    <div className="p-4 flex flex-col items-center justify-center max-h-screen mt-[5rem]">
      <h1 className="title text-3xl md:text-4xl font-bold mb-4 text-center">
        Receitas Sugeridas
      </h1>
      {loading && <p>Carregando receitas...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && recipes.length === 0 && (
        <p className="text-gray-500">Nenhuma receita encontrada.</p>
      )}
      {!loading && !error && recipes.length > 0 && (
        <CardCarousel recipes={recipes} onSelectRecipe={handleSelectRecipe}/>
      )}
      <div className="flex justify-start items-start py-6">
        <button
          className="bg-slate-100/75 text-center w-40 rounded-2xl min-h-[36px] relative text-black text-base font-semibold group"
          type="button"
          onClick={() => navigate("/")}
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

export default RecipeList;
