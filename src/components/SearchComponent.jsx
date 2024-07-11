import { useEffect, useRef, useState } from "react";
import logo from "../assets/logo.png";
import IngredientsComponent from "./IngredientsComponent";
import AutofillComponent from "./AutofillComponent";
import MealTypeComponent from "./MealTypeComponent";
import CuisineTypeComponent from "./CuisineTypeComponent";
import DietTypeComponent from "./DietTypeComponent";
import { useDispatch } from "react-redux";
import { searchResultsActions } from "../store";
import CaloriesComponent from "./CaloriesComponent";
import SearchBarComponent from "./SearchBarComponent";

export default function SearchComponent(props) {
  const dispatch = useDispatch();
  const windowRef = useRef();

  const [singleQuery, setSingleQuery] = useState("");
  const [queries, setQueries] = useState([]);
  const [autofill, setAutofill] = useState([]);
  const [timeoutId, setTimeoutId] = useState(null);
  const [hide, setHide] = useState(true);
  const [calMin, setCalMin] = useState("");
  const [calMax, setCalMax] = useState("");
  const [timeMax, setTimeMax] = useState("");
  const [mealType, setMealType] = useState("All");
  const [cuisineType, setCuisineType] = useState("All");
  const [dietType, setDietType] = useState([]);

  useEffect(() => {
    props.setSearchComponentHeight(windowRef.current.clientHeight);
  }, []);

  async function fetchData() {
    const queriesFinal = queries.join("+");
    const meatTypeFinal = mealType === "All" ? "" : "&mealType=" + mealType;
    const caloriesFinal = () => {
      if (calMin != "" && calMax === "") {
        return "&calories=" + calMin + "%2B";
      } else if (calMin != "" && calMax != "") {
        return "&calories=" + calMin + "-" + calMax;
      } else if (calMin === "" && calMax != "") {
        return "&calories=" + calMax;
      } else {
        return "";
      }
    };
    const timeFinal = timeMax != "" ? "&time=1-" + timeMax : "&time=1%2B";
    const cuisineTypeFinal =
      cuisineType === "All" ? "" : "&cuisineType=" + cuisineType;
    const dietTypeFinal =
      dietType.length === 0
        ? ""
        : dietType.map((dietType) => "&diet=" + dietType).join("");
    window.scrollTo({
      top: windowRef.current.clientHeight - 20,
      left: 0,
      behavior: "smooth",
    });
    try {
      dispatch(searchResultsActions.updateLoading(true));
      const response = await fetch(
        `https://api.edamam.com/api/recipes/v2?type=public&app_id=9758c9cf&app_key=f568a57f065e287f7a1106cf1980104c&q=${queriesFinal}${meatTypeFinal}${caloriesFinal()}${timeFinal}${cuisineTypeFinal}${dietTypeFinal}`,
      );
      const data = await response.json();
      dispatch(searchResultsActions.updateRecipesCurrent(data));
    } catch {
    } finally {
      dispatch(searchResultsActions.updateLoading(false));
    }
  }

  function autoCorrectHandler(event) {
    setHide(true);
    const { value } = event.target;
    setSingleQuery(value);
    if (value.length >= 2) {
      clearTimeout(timeoutId);
      const id = setTimeout(async () => {
        try {
          const response = await fetch(
            `https://api.edamam.com/auto-complete?app_id=a033bf5a&app_key=faa80c7eff3d19a87cfa47a0999c69ad&q=${value}&limit=4`,
          );
          if (!response.ok) {
            throw new Error("Failed to fetch autofill suggestions");
          }
          const data = await response.json();
          setAutofill(data);
        } catch (error) {
          console.error("Error fetching autofill suggestions:", error);
        } finally {
          setHide(false);
        }
      }, 500);
      setTimeoutId(id);
    } else {
      clearTimeout(timeoutId);
      setHide(true);
    }
  }

  function deleteIngredient(ingredient) {
    const ingredients = queries;
    const ingredientsNew = ingredients.filter((ingr) => {
      return ingr !== ingredient;
    });
    setQueries(ingredientsNew);
  }

  return (
    <div
      ref={windowRef}
      className="z-50 flex w-full items-center justify-center bg-[#F7F3EF] px-5 py-8 lg:w-[50dvw] lg:justify-end lg:px-0"
    >
      <div className="flex max-w-[500px] flex-col items-center justify-center rounded-lg border border-black bg-white pb-8 shadow-xl">
        <div className="flex w-[90%] flex-col items-center py-4 lg:py-8">
          <img src={logo} className="h-16 object-cover" />
          <div>
            <p className="text-center font-inter text-xl font-semibold">
              DishPal
            </p>
            <p className="text-center font-inter text-xs font-semibold">
              From fridge to feast: share your ingredients, we'll do the rest!
            </p>
          </div>
        </div>
        <div className="flex w-full flex-col items-center">
          <SearchBarComponent
            autoCorrectHandler={autoCorrectHandler}
            singleQuery={singleQuery}
          />
          <AutofillComponent
            autofill={autofill}
            queries={queries}
            hide={hide}
            setQueries={setQueries}
            setHide={setHide}
            singleQuery={singleQuery}
            setSingleQuery={setSingleQuery}
          />
          <IngredientsComponent
            queries={queries}
            deleteIngredient={deleteIngredient}
          />
        </div>
        <MealTypeComponent mealType={mealType} setMealType={setMealType} />
        <div className="mt-4 flex w-[90%]">
          <div className="flex w-1/2 flex-col gap-4">
            <h2 className="font-inter font-semibold tracking-wider">
              Time (max):
            </h2>
            <input
              onChange={(e) =>
                parseInt(e.target.value) === 0
                  ? setTimeMax("")
                  : setTimeMax(e.target.value)
              }
              value={timeMax}
              type="number"
              step={15}
              min={0}
              placeholder="Max"
              className="h-8 w-2/3 rounded-lg border border-black px-3 py-2 font-inter text-[16px] outline-black"
            />
          </div>
          <CaloriesComponent
            calMin={calMin}
            setCalMin={setCalMin}
            calMax={calMax}
            setCalMax={setCalMax}
          />
        </div>
        <div className="mt-4 flex w-[90%]">
          <CuisineTypeComponent
            cuisineType={cuisineType}
            setCuisineType={setCuisineType}
          />
          <DietTypeComponent dietType={dietType} setDietType={setDietType} />
        </div>
        <button
          onClick={fetchData}
          disabled={queries.length === 0}
          className="mt-8 w-28 rounded-lg bg-black py-2 font-inter text-xs font-semibold tracking-wider text-white hover:outline hover:outline-black disabled:opacity-50 disabled:outline-none"
        >
          Search
        </button>
      </div>
    </div>
  );
}
