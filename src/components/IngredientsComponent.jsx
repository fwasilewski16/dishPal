import Ingredient from "../ui/Ingredient";

export default function IngredientsComponent(props) {
  function handleDelete(ingredient) {
    props.deleteIngredient(ingredient);
  }

  return (
    <div className="relative flex w-full items-center justify-center">
      <div className="flex h-[152px] w-[90%] items-start overflow-y-auto rounded-lg border border-black bg-white p-3 transition duration-200 hover:outline hover:outline-2 hover:outline-black">
        <div className="flex w-full flex-wrap gap-3">
          {props.queries.map((query, index) => (
            <Ingredient onClick={handleDelete} key={index}>
              {query}
            </Ingredient>
          ))}
        </div>
      </div>
      <p
        className={`pointer-events-none absolute top-1/2 flex -translate-y-1/2 items-center font-inter text-sm transition-all duration-300 ${props.queries.length === 0 ? "opacity-50" : "opacity-0"}`}
      >
        Add ingredients to get started
      </p>
    </div>
  );
}
