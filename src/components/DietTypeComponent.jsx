import { useState } from "react";
import expand from "../assets/expand.png";
import checked from "../assets/checked.png";
import unchecked from "../assets/unchecked.png";

const dietTypes = [
  "balanced",
  "high-fiber",
  "high-protein",
  "low-carb",
  "low-fat",
  "low-sodium",
];

function DietTypeButton(props) {
  return (
    <button
      onClick={() => {
        props.dietType.includes(props.children)
          ? props.setDietType((prevDietType) =>
              prevDietType.filter((type) => props.children != type),
            )
          : props.setDietType((prevDietType) => [
              ...prevDietType,
              props.children,
            ]);
      }}
      className="flex h-8 w-full items-center justify-between bg-white px-3 font-inter text-xs font-semibold capitalize transition duration-200 hover:bg-gray-200"
    >
      {props.children}
      <img
        src={props.dietType.includes(props.children) ? checked : unchecked}
        className="h-5"
      />
    </button>
  );
}

export default function DietTypeComponent(props) {
  const [dietTypeExpanded, setDietTypeExpanded] = useState(false);

  return (
    <div className="flex w-1/2 flex-col items-start gap-1">
      <h2 className="font-inter font-semibold tracking-wider text-[#231F23]">
        Diet type:
      </h2>
      <div className="relative mt-4 w-full">
        <button
          className="flex h-8 w-full items-center justify-between rounded-lg border border-black bg-white pl-3 pr-2 font-inter text-xs font-semibold hover:outline hover:outline-2 hover:outline-black"
          onClick={() =>
            setDietTypeExpanded(
              (prevDietineTypeExpanded) => !prevDietineTypeExpanded,
            )
          }
        >
          Select option(s)
          <img src={expand} className="h-5" />
        </button>
        <div
          onMouseLeave={() => setDietTypeExpanded(false)}
          className={`absolute bottom-0 left-0 z-50 flex w-full flex-col justify-center overflow-hidden rounded-lg border-2 border-black bg-white transition duration-500 ${dietTypeExpanded ? "" : "pointer-events-none opacity-0"}`}
        >
          {dietTypes.map((type, index) => (
            <DietTypeButton
              key={index}
              dietType={props.dietType}
              setDietType={props.setDietType}
              setDietTypeExpanded={setDietTypeExpanded}
            >
              {type}
            </DietTypeButton>
          ))}
        </div>
      </div>
    </div>
  );
}
