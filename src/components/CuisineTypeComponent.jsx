import { useState } from "react";
import expand from "../assets/expand.png";

const cuisineTypes = [
  "All",
  "American",
  "Asian",
  "British",
  "Caribbean",
  "Central Europe",
  "Chinese",
  "Eastern Europe",
  "French",
  "Indian",
  "Italian",
  "Japanese",
  "Kosher",
  "Mediterranean",
  "Mexican",
  "Middle Eastern",
  "Nordic",
  "South American",
  "South East Asian",
];

function CuisineButton(props) {
  return (
    <button
      onClick={() => {
        props.setCuisineType(props.children);
        setTimeout(() => {
          props.setCuisineTypeExpanded(false);
        }, [200]);
      }}
      className={`h-8 w-full px-3 font-inter text-xs font-semibold transition duration-200 ${props.cuisineType === props.children ? "bg-black text-white" : "bg-white hover:bg-gray-200"}`}
    >
      {props.children}
    </button>
  );
}

export default function CuisineTypeComponent(props) {
  const [cuisineTypeExpanded, setCuisineTypeExpanded] = useState(false);

  return (
    <div className="flex w-1/2 flex-col items-start gap-1">
      <h2 className="font-inter font-semibold tracking-wider text-[#231F23]">
        Cuisine type:
      </h2>
      <div className="relative mt-4 w-full">
        <button
          className="flex h-8 w-[90%] items-center justify-between rounded-lg border border-black bg-white pl-3 pr-2 font-inter text-xs font-semibold hover:outline hover:outline-2 hover:outline-black"
          onClick={() =>
            setCuisineTypeExpanded(
              (prevCuisineTypeExpanded) => !prevCuisineTypeExpanded,
            )
          }
        >
          {props.cuisineType}
          <img src={expand} className="h-5" />
        </button>
        <div
          onMouseLeave={() => {
            setCuisineTypeExpanded(false);
          }}
          className={`absolute bottom-0 left-0 z-50 flex w-[90%] flex-col overflow-hidden rounded-lg border-2 border-black bg-white transition duration-500 ${cuisineTypeExpanded ? "" : "pointer-events-none opacity-0"}`}
        >
          {cuisineTypes.map((type, index) => (
            <CuisineButton
              key={index}
              cuisineType={props.cuisineType}
              setCuisineType={props.setCuisineType}
              setCuisineTypeExpanded={setCuisineTypeExpanded}
            >
              {type}
            </CuisineButton>
          ))}
        </div>
      </div>
    </div>
  );
}
