import { useState, useEffect } from "react";

interface Recipe {name:string,instructions:string,ingredients:string,thumbnail:string}

interface CarouselProps {
  recipes: Recipe[];
}

export default function Carousel({ recipes }: CarouselProps) {
  const [currentRecipeIndex, setCurrentRecipeIndex] = useState(0);

  const handleNext = () => {
    setCurrentRecipeIndex((prevIndex) =>
      prevIndex === recipes.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentRecipeIndex((prevIndex) =>
      prevIndex === 0 ? recipes.length - 1 : prevIndex - 1
    );
  };

  const currentRecipe = recipes[currentRecipeIndex];

  return (
    <>
      <div className="carousel w-full border border-primary rounded-lg bg-base-200">
        <div className="carousel-item w-full">
          <img
            src={currentRecipe.thumbnail}
            alt={currentRecipe.ingredients}
            className="size-32 md:size-60 w-1/4 p-2"
          />
          <div className="m-5 flex flex-col space-y-3">
            <h1>{currentRecipe.name}</h1>
            <p className="text-sm">{currentRecipe.ingredients}</p>
            <p className="text-sm">{currentRecipe.instructions}</p>
          </div>
        </div>
      </div>
      <div className="flex justify-center w-full py-2 gap-2">
        <button onClick={handlePrev} className="btn btn-md btn-secondary">
          Previous
        </button>
        <button onClick={handleNext} className="btn btn-md btn-secondary">
          Next
        </button>
      </div>
    </>
  );
}
