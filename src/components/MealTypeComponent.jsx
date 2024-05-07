import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";

const mealTypes = ["All", "Breakfast", "Dinner", "Lunch", "Snack"];

function MealTypeButton(props) {
  return (
    <button
      onClick={() => {
        props.setMealType(props.children);
      }}
      className={`z-50 h-8 w-1/5 font-inter text-[10px] font-semibold transition duration-500 md:px-3 md:text-xs ${props.children === props.mealType ? "text-white" : "text-black"}`}
    >
      {props.children}
    </button>
  );
}

export default function MealTypeComponent(props) {
  const [springs, api] = useSpring(() => ({
    from: { left: "0%" },
    config: { tension: 130, friction: 15 },
  }));

  useEffect(() => {
    switch (props.mealType) {
      case "All":
        api.start({
          to: { left: "0%" },
        });
        break;
      case "Breakfast":
        api.start({
          to: { left: "20%" },
        });
        break;
      case "Dinner":
        api.start({
          to: { left: "40%" },
        });
        break;
      case "Lunch":
        api.start({
          to: { left: "60%" },
        });
        break;
      case "Snack":
        api.start({
          to: { left: "80%" },
        });
        break;
    }
  }, [props.mealType]);

  return (
    <div className="mt-4 flex w-[90%] flex-col gap-4">
      <h2 className="flex font-inter font-semibold tracking-wider">
        Meal type:
      </h2>
      <div className="relative flex overflow-hidden rounded-lg border border-black bg-white">
        <animated.div
          style={{ ...springs }}
          className="absolute h-8 w-1/5 bg-black"
        />
        {mealTypes.map((type, index) => (
          <MealTypeButton
            key={index}
            mealType={props.mealType}
            setMealType={props.setMealType}
          >
            {type}
          </MealTypeButton>
        ))}
      </div>
    </div>
  );
}
