import AutofillButton from "../ui/AutofillButton";

export default function AutofillComponent(props) {
  return (
    <div className="relative flex h-20 w-full items-center justify-center gap-4 overflow-hidden px-2">
      <p
        className={`${props.autofill.length === 0 && props.singleQuery.length > 2 && !props.hide ? "" : "pointer-events-none opacity-0"} absolute top-1/2 -translate-y-1/2 font-inter text-sm transition duration-500`}
      >
        No matches found
      </p>
      {props.singleQuery != "" &&
        props.autofill.map((word, index) => (
          <AutofillButton
            key={index}
            delay={100 + index * 100}
            onClick={() => {
              if (!props.queries.includes(word)) {
                props.setQueries((prevQueries) => [...prevQueries, word]);
                props.setSingleQuery("");
                props.setHide(true);
              }
            }}
            hide={props.hide}
          >
            {word}
          </AutofillButton>
        ))}
    </div>
  );
}
