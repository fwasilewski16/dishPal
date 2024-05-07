export default function CaloriesComponent(props) {
  return (
    <div className="flex w-1/2 flex-col items-start gap-4">
      <h2 className="flex font-inter font-semibold tracking-wider">
        Calories:
      </h2>
      <div className="flex gap-1">
        <input
          onChange={(e) => {
            parseInt(e.target.value) === 0
              ? props.setCalMin("")
              : props.setCalMin(parseInt(e.target.value));
            if (
              parseInt(e.target.value) >= props.calMax &&
              props.calMax != ""
            ) {
              props.setCalMax(parseInt(e.target.value) + 50);
            }
          }}
          value={props.calMin}
          type="number"
          step={50}
          min={0}
          placeholder="Min"
          className="z-50 h-8 w-1/2 rounded-l-lg border border-black px-3 font-inter text-[16px] outline-black"
        />
        <input
          onChange={(e) =>
            parseInt(e.target.value) === 0
              ? props.setCalMax("")
              : props.setCalMax(parseInt(e.target.value))
          }
          value={props.calMax}
          type="number"
          step={50}
          min={props.calMin ? parseInt(props.calMin) + 50 : 0}
          placeholder="Max"
          className="z-50 h-8 w-1/2 rounded-r-lg border border-black px-3 py-2 font-inter text-[16px] outline-black"
        />
      </div>
    </div>
  );
}
