import React, { useRef } from "react";
import { Link } from "react-router-dom";
import "./CardCarousel.css";

interface Recipe {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

interface CardCarouselProps {
  recipes: Recipe[];
}

const CardCarousel: React.FC<CardCarouselProps> = ({ recipes }) => {
  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: -250, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({ left: 250, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full max-w-[800px] mt-6">
      <div
        className="flex space-x-4 overflow-hidden pb-4 snap-x snap-mandatory scroll-smooth"
        ref={carouselRef}
      >
        {recipes.map((recipe) => (
          <div
            key={recipe.idMeal}
            className="card min-w-[250px] bg-white shadow-lg rounded-lg overflow-hidden snap-start"
          >
            {/* Card Image and Save Icon */}
            <div className="img relative">
              <img
                src={`${recipe.strMealThumb}/preview`}
                alt={recipe.strMeal}
                className="w-full h-40 object-cover"
              />
              <div className="save absolute right-2">
                <svg
                  className="svg"
                  width="24"
                  height="24"
                  viewBox="0 0 683 683"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <g clipPath="url(#clip0_993_25)">
                    <mask
                      id="mask0_993_25"
                      style={{ maskType: "luminance" }}
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="683"
                      height="683"
                    >
                      <path d="M0 0H682.667V682.667H0V0Z" fill="white" />
                    </mask>
                    <g mask="url(#mask0_993_25)">
                      <path
                        d="M148.535 19.9999C137.179 19.9999 126.256 24.5092 118.223 32.5532C110.188 40.5866 105.689 51.4799 105.689 62.8439V633.382C105.689 649.556 118.757 662.667 134.931 662.667H135.039C143.715 662.667 151.961 659.218 158.067 653.09C186.451 624.728 270.212 540.966 304.809 506.434C314.449 496.741 327.623 491.289 341.335 491.289C355.045 491.289 368.22 496.741 377.859 506.434C412.563 541.074 496.752 625.242 524.816 653.348C530.813 659.314 538.845 662.667 547.308 662.667C563.697 662.667 576.979 649.395 576.979 633.019V62.8439C576.979 51.4799 572.48 40.5866 564.447 32.5532C556.412 24.5092 545.489 19.9999 534.133 19.9999H148.535Z"
                        stroke="#CED8DE"
                        strokeWidth="40"
                        strokeMiterlimit="10"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      ></path>
                    </g>
                  </g>
                  <defs>
                    <clipPath id="clip0_993_25">
                      <rect width="682.667" height="682.667" fill="white"></rect>
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            {/* Card Text */}
            <div className="text p-2">
              <h3 className="text-lg font-semibold mb-2">{recipe.strMeal}</h3>
              <div className="icon-box mt-4">
                <Link
                  to={`/recipes/${recipe.idMeal}`}
                  className="span text-sm text-[#a9bf93] hover:text-black"
                >
                  View More
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Navigation Buttons outside the container */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="prev p-2 rounded-full shadow "
          onClick={scrollLeft}
        >
          ←
        </button>
        <button
          className="next p-2 rounded-full shadow bg-white"
          onClick={scrollRight}
        >
          →
        </button>
      </div>
    </div>
  );
};

export default CardCarousel;
