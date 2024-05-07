import { animated, useSpring } from "@react-spring/web";
import { useEffect } from "react";

export default function Ingredient(props) {
  const [springs, api] = useSpring(() => ({
    from: { scale: "0%" },
    config: { tension: 130, friction: 15 },
  }));

  useEffect(() => {
    api.start({
      to: { scale: "100%" },
    });
  }, []);

  return (
    <animated.button
      style={{ ...springs }}
      className="flex h-[28px] w-fit items-center justify-between gap-1 rounded-lg bg-black pl-4 pr-2 font-inter text-xs font-medium text-white transition-[background-color] duration-150 hover:bg-red-500"
      onClick={() => {
        props.onClick(props.children);
      }}
    >
      <p className="">{props.children}</p>
      <div className="relative h-[30px] w-4">
        <div className="absolute left-1/2 top-1/2 h-3 w-[1px] -translate-x-1/2 -translate-y-1/2 rotate-45 bg-white" />
        <div className="absolute left-1/2 top-1/2 h-3 w-[1px] -translate-x-1/2 -translate-y-1/2 -rotate-45 bg-white" />
      </div>
    </animated.button>
  );
}
