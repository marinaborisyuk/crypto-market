export const DotsLoader = () => {
  return (
    <div className="flex justify-center items-center py-10 space-x-2">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="animate-pulse rounded-full h-4 w-4 bg-blue-400"
          style={{ animationDelay: `${i * 0.2}s` }}
        />
      ))}
    </div>
  );
};