import { useHelloWorld } from "./hooks/useHelloWorld";

export default function Home() {
  const { helloWorld, isLoading, isError } = useHelloWorld();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }
  if (!helloWorld) {
    return <div>No data</div>;
  }
  return <div>{helloWorld.Hello}</div>;
}
