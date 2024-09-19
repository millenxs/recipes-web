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
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
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

  if (!recipe) return <div>Carregando...</div>;

  // Convertendo as instruções em uma lista ordenada
  const instructionsList = recipe.strInstructions
    .split("\r\n") // Divide o texto com base em quebras de linha
    .filter((instruction) => instruction.trim() !== "") // Remove linhas vazias
    .map((instruction, index) => <li key={index}>{instruction}</li>);

  return (
    <div className="container mx-auto box-content max-h-[500px] w-[550px] p-4 border-4 md:box-content overflow-y-scroll">
      <div className="flex items-center space-x-4 mb-4">
        <img
          src={`${recipe.strMealThumb}/preview`}
          alt={recipe.strMeal}
          className="w-[120px] h-[120px] object-cover"
        />
        <h1 className="title text-[16px] font-semibold">{recipe.strMeal}</h1>
      </div>
      <ol className="list-decimal space-y-2 text-sm">
        {instructionsList}
      </ol>

      {/* Adicionando o botão para voltar à lista de receitas */}
      <button
        onClick={() => navigate(-1)}
        className="cursor-pointer bg-white mt-4 inline-flex items-center justify-center gap-2 rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-[#a9bf93] hover:text-[#000] h-9 rounded-md px-3 border border-[#000] hover:border-[#a9bf93]"
      >
        Voltar para a lista de receitas
      </button>
    </div>
  );
};

export default RecipeDetails;
