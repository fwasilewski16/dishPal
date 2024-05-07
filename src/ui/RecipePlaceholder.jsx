export default function RecipePlaceholder() {
  return (
    <div className="flex animate-pulse flex-col items-center p-4">
      <div className="h-[300px] w-[300px] rounded-lg bg-gray-300" />
      <div className="flex w-full justify-between px-1 py-2">
        <div className="h-4 w-14 rounded-md bg-gray-300" />
        <div className="h-4 w-28 rounded-md bg-gray-300" />
      </div>
      <div className="mt-4 h-4 w-48 rounded-md bg-gray-300" />
    </div>
  );
}
