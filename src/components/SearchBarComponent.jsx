import { useState } from "react";
import search from "../assets/search.png";

export default function SearchBarComponent(props) {
  const [focus, setFocus] = useState(false);
  return (
    <div
      className={`relative flex w-[90%] items-center gap-1 rounded-lg border border-black bg-white pl-3 transition duration-200 ease-in-out ${focus ? "outline outline-2 outline-black" : ""}`}
    >
      <img src={search} className="h-4 lg:h-5" />
      <input
        onChange={props.autoCorrectHandler}
        value={props.singleQuery}
        spellCheck="false"
        onFocus={() => {
          setFocus(true);
        }}
        onBlur={() => {
          setFocus(false);
        }}
        className="w-full rounded-r-lg font-inter font-medium leading-[38px] outline-none"
      />
      <p
        className={`pointer-events-none absolute left-9 top-1/2 -translate-y-1/2 font-inter text-[11px] text-gray-500 transition lg:left-11 lg:text-sm lg:leading-[38px] ${props.singleQuery.length > 0 ? "opacity-0" : ""}`}
      >
        Enter ingredients (e.g., chicken, broccoli, garlic)
      </p>
    </div>
  );
}
