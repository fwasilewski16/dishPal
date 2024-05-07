import { useDispatch, useSelector } from "react-redux";
import time from "../assets/time.png";
import { savedActions } from "../store";
import { useEffect, useState } from "react";

export default function RecipeComponent(props) {
  const dispatch = useDispatch();
  const recipesPersist = useSelector((state) => state.saved.savedRecipes);

  const [reveal, setReveal] = useState(false);
  const [buttonsVisible, setButtonsVisible] = useState(false);

  function resetButtons() {
    setButtonsVisible(false);
  }

  useEffect(() => {
    window.addEventListener("scroll", resetButtons);
    return () => {
      window.removeEventListener("scroll", resetButtons);
    };
  }, []);

  return (
    <div
      onClick={() => setButtonsVisible(true)}
      onMouseLeave={() => setButtonsVisible(false)}
      className={`group relative px-4 py-4 transition duration-200 md:w-1/3 ${!reveal ? "opacity-0" : "opacity-100"}`}
    >
      <div
        className={`pointer-events-none absolute left-4 right-4 top-4 flex aspect-square flex-col items-center justify-center gap-5 rounded-lg opacity-0 backdrop-blur-[6px] transition duration-200 group-hover:pointer-events-auto group-hover:opacity-100 ${buttonsVisible && "pointer-events-auto opacity-100"}`}
      >
        <button className="w-40 rounded-lg border border-black bg-white py-1 font-inter font-semibold">
          <a href={props.url} target="_blank" rel="noopener noreferrer">
            View recipe
          </a>
        </button>
        {!recipesPersist.includes(props.recipe) ? (
          <button
            onClick={() => {
              dispatch(savedActions.saveRecipe(props.recipe));
            }}
            className="w-40 rounded-lg border border-black bg-white py-1 font-inter font-semibold"
          >
            Save
          </button>
        ) : (
          <button
            onClick={() => {
              dispatch(savedActions.removeRecipe(props.recipe));
            }}
            className="w-40 rounded-lg border border-black bg-black py-1 font-inter font-semibold text-white"
          >
            Remove
          </button>
        )}
      </div>
      <div className="flex h-full flex-col justify-between">
        <div>
          <img
            src={props.image}
            width={300}
            height={300}
            loading="lazy"
            onLoad={() => setReveal(true)}
            className="w-full rounded-lg object-cover"
          />
          <div className="flex justify-between px-1 py-2">
            <div className="flex items-center gap-[5px]">
              <img src={time} className="h-3" />
              <p className="font-inter text-xs font-semibold">
                {props.totalTime} min
              </p>
            </div>
            <p className="font-inter text-xs font-semibold">
              {Math.ceil(props.calories / props.yield)} kcal per serving
            </p>
          </div>
          <h3 className="px-1 text-center font-inter font-semibold">
            {props.label}
          </h3>
        </div>
      </div>
    </div>
  );
}
