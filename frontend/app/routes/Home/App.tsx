import { useHelloWorld } from "./hooks/useHelloWorld";
import { useNavigate } from "react-router";

export default function Home() {
  const { helloWorld, isLoading, isError } = useHelloWorld();
  const navigate = useNavigate();
  
  const handleNavigation = () => {
    console.log("Attempting to navigate to /budget-calculator");
    navigate("/budget-calculator");
  };
  
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
    <div>
      {helloWorld.Hello}
      <br />
      <button 
        onClick={handleNavigation}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Go to Budget Calculator
      </button>
    </div>
  );
}
