import RecipesComponent from "./components/RecipesComponent";
import SearchComponent from "./components/SearchComponent";
import drawingMain from "./assets/drawingMain.png";
import { useEffect, useState } from "react";

function App() {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [searchComponentHeight, setSearchComponentHeight] = useState(0);

  function updateWidth() {
    setScreenWidth(window.innerWidth);
  }

  useEffect(() => {
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <>
      <div className="flex min-h-[100dvh]">
        <SearchComponent setSearchComponentHeight={setSearchComponentHeight} />
        {screenWidth > 1024 && (
          <div className="relative flex w-[50dvw] flex-col items-center justify-center bg-[#F7F3EF]">
            <img
              src={drawingMain}
              className="absolute right-0 top-1/2 min-h-[650px] min-w-[105%] -translate-y-1/2 object-cover"
            />
          </div>
        )}
      </div>
      <RecipesComponent searchComponentHeight={searchComponentHeight} />
    </>
  );
}

export default App;
