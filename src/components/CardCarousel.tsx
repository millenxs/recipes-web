import React from "react";
import { Link } from "react-router-dom";


interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
  strDescription?: string;
}

interface CardCarouselProps {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
}

const CardCarousel: React.FC<CardCarouselProps> = ({ recipes, onSelectRecipe }) => {
  return (
    <div className="container flex flex-col items-center">
      <h1 className="title text-3xl md:text-4xl font-bold text-center mb-8">
        Receitas Sugeridas
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 justify-center py-4 w-[80rem]">
        {recipes.map((recipe) => (
          <article
            key={recipe.idMeal}
            className="flex bg-slate-100/75 transition hover:shadow-xl rounded-lg overflow-hidden card"
          >
            <div className="hidden sm:block sm:basis-56">
              <img
                alt={recipe.strMeal}
                src={`${recipe.strMealThumb}/preview`}
                className="aspect-square h-full w-full object-cover"
              />
            </div>

            <div className="flex flex-1 flex-col justify-between">
              <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
                <Link to={`/recipes/${recipe.idMeal}`}>
                  <h3 className="font-bold uppercase text-gray-900">
                    {recipe.strMeal}
                  </h3>
                </Link>
                <p className="mt-2 line-clamp-3 text-sm text-gray-700">
                  {recipe.strDescription}
                </p>
              </div>

              <div className="sm:flex sm:items-end sm:justify-end">
                <Link
                  to={`/recipes/${recipe.idMeal}`}
                  className="block bg-[#BD7F3F] px-5 py-3 text-center text-xs font-bold uppercase text-gray-50 transition hover:bg-[#a3562f]"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default CardCarousel;
