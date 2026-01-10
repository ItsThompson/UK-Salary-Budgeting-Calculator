import { useNavigate } from "react-router";
import { useHelloWorld } from "../hooks/useHelloWorld";

export const HomeContent = () => {
  const { helloWorld, isLoading, isError } = useHelloWorld();
  const navigate = useNavigate();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }
  if (!helloWorld) {
    return <div>No data</div>;
  }
  return (
    <div className="flex flex-col items-center gap-4">
      {helloWorld.message}
      <button
        onClick={() => navigate("/budget-calculator")}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Budget Calculator
      </button>
    </div>
  );
};
