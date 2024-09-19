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
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const ingredients = queryParams.get("ingredients");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const response = await axios.get(
          `https://www.themealdb.com/api/json/v1/1/search.php?s=${encodeURIComponent(
            ingredients || ""
          )}`
        );
        setRecipes(response.data.meals || []);
      } catch (error) {
        console.error("Erro ao buscar receitas:", error);
      }
    };

    fetchRecipes();
  }, [ingredients]);

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-screen">
      <h1 className="title text-3xl md:text-4xl font-bold mb-6 text-center border-b-2 border-[#be8040] ">
        Receitas Sugeridas
      </h1>
      <CardCarousel recipes={recipes} />
      <button
        className="cursor-pointer bg-white inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 hover:bg-[#a9bf93] hover:text-black h-9 px-3 border border-black hover:border-[#a9bf93] mt-6"
        onClick={() => navigate("/")}
      >
        ← Back
      </button>
    </div>
  );
};

export default RecipeList;
