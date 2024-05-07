import { useEffect } from "react";
import { animated, useSpring } from "@react-spring/web";

export default function AutofillButton(props) {
  const [springs, api] = useSpring(() => ({
    from: { y: "-200%" },
    config: { tension: 250, friction: 12 },
  }));

  useEffect(() => {
    if (!props.hide) {
      const timeoutId = setTimeout(() => {
        {
          props.children != "" &&
            api.start({
              to: { y: "0%" },
            });
        }
      }, props.delay);
      return () => clearTimeout(timeoutId);
    }
    if (props.hide) {
      api.start({
        to: { y: "-200%" },
      });
    }
  }, [props.hide]);

  return (
    <animated.button
      className="h-fit min-h-[40px] rounded-lg border border-black bg-white px-1 font-inter text-[10px] font-medium shadow-sm transition-colors duration-200 hover:outline hover:outline-2 hover:outline-black md:px-4 md:text-xs"
      style={{ ...springs }}
      onClick={props.onClick}
    >
      {props.children}
    </animated.button>
  );
}
