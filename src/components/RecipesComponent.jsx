import { useDispatch, useSelector } from "react-redux";
import RecipeComponent from "./RecipeComponent";
import drawing1 from "../assets/drawing1.png";
import drawing2 from "../assets/drawing2.png";
import { useEffect, useState } from "react";
import { animated, useSpring } from "@react-spring/web";
import { searchResultsActions } from "../store";
import RecipePlaceholder from "../ui/RecipePlaceholder";

export default function RecipesComponent(props) {
  const dispatch = useDispatch();
  const [tab, setTab] = useState("results");

  const [springs, api] = useSpring(() => ({
    from: { left: "0%" },
    config: { tension: 130, friction: 15 },
  }));

  const searchResults = useSelector((state) => state.searchResults.results);
  const loading = useSelector((state) => state.searchResults.isLoading);
  const saved = useSelector((state) => state.saved.savedRecipes);

  useEffect(() => {
    switch (tab) {
      case "results":
        api.start({
          to: { left: "0%" },
        });
        break;
      case "saved":
        api.start({
          to: { left: "50%" },
        });
        break;
    }
  }, [tab]);

  async function fetchData() {
    window.scrollTo({
      top: props.searchComponentHeight - 20,
      left: 0,
      behavior: "smooth",
    });
    try {
      dispatch(searchResultsActions.updateLoading(true));
      const response = await fetch(searchResults._links.next.href);
      const data = await response.json();
      dispatch(searchResultsActions.updateRecipesCurrent(data));
    } catch {
    } finally {
      dispatch(searchResultsActions.updateLoading(false));
    }
  }

  const loadingArray = [];

  for (let i = 0; i < 9; i++) {
    loadingArray.push(<RecipePlaceholder />);
  }

  return (
    <div className="flex min-h-[100dvh] w-full flex-col items-center bg-[#F7F3EF]">
      <div className="flex w-full justify-center">
        <div className="relative flex h-8 w-[90%] max-w-[1000px] overflow-hidden rounded-lg border border-black bg-white">
          <button
            onClick={() => {
              setTab("results");
            }}
            className={`z-50 w-1/2 font-inter text-xs font-semibold transition duration-500 ${tab === "results" ? "text-white" : "text-black"}`}
          >
            Search results
          </button>
          <button
            onClick={() => {
              setTab("saved");
            }}
            className={`z-50 w-1/2 font-inter text-xs font-semibold transition duration-500 ${tab === "saved" ? "text-white" : "text-black"}`}
          >
            Saved recipes
          </button>
          <animated.div
            style={{ ...springs }}
            className="absolute h-8 w-1/2 bg-black"
          />
        </div>
      </div>
      {tab === "results" && !loading && (
        <div className="relative flex w-[90%] max-w-[1000px] justify-center">
          {!searchResults ? (
            <div className="flex h-[100dvh] flex-col items-center justify-center md:flex-row">
              <img
                src={drawing1}
                loading="lazy"
                width={500}
                height={647.5}
                className="md:my-20 md:w-1/2"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-center font-inter font-semibold">
                  Ready to discover new recipes?
                </p>
                <p className="text-center font-inter font-semibold">
                  Enter your ingredients above to get started!
                </p>
              </div>
            </div>
          ) : (
            <div>
              <div className="flex w-full flex-col pt-5 md:flex-row md:flex-wrap">
                {searchResults.hits.map((recipe, index) => (
                  <RecipeComponent
                    key={index}
                    url={recipe.recipe.url}
                    image={recipe.recipe.image}
                    totalTime={recipe.recipe.totalTime}
                    calories={recipe.recipe.calories}
                    yield={recipe.recipe.yield}
                    label={recipe.recipe.label}
                    recipe={recipe.recipe}
                  ></RecipeComponent>
                ))}
              </div>
              {Object.keys(searchResults._links).length !== 0 && (
                <div className="flex justify-center">
                  <button
                    onClick={fetchData}
                    className="my-8 w-28 rounded-lg bg-black py-2 font-inter text-xs font-semibold tracking-wider text-white hover:outline hover:outline-black"
                  >
                    Show more
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      {tab === "saved" && (
        <div className="relative flex w-[90%] max-w-[1000px] justify-center">
          {saved.length === 0 ? (
            <div className="flex h-[100dvh] flex-col items-center justify-center md:flex-row">
              <img
                src={drawing2}
                width={500}
                height={647.5}
                loading="lazy"
                className="md:my-20 md:w-1/2"
              />
              <div className="flex flex-col items-center justify-center gap-2">
                <p className="text-center font-inter font-semibold">
                  No saved recipes yet.
                </p>
                <p className="text-center font-inter font-semibold">
                  Start exploring and save your favorite recipes here!
                </p>
              </div>
            </div>
          ) : (
            <div className="flex w-full flex-col pt-5 md:flex-row md:flex-wrap">
              {saved.map((recipe, index) => (
                <RecipeComponent
                  key={index}
                  url={recipe.url}
                  image={recipe.image}
                  totalTime={recipe.totalTime}
                  calories={recipe.calories}
                  yield={recipe.yield}
                  label={recipe.label}
                  recipe={recipe}
                ></RecipeComponent>
              ))}
            </div>
          )}
        </div>
      )}
      {loading && (
        <div className="flex w-full max-w-[1000px] flex-col pt-5 md:flex-row md:flex-wrap">
          {loadingArray.map((component) => {
            return component;
          })}
        </div>
      )}
    </div>
  );
}
