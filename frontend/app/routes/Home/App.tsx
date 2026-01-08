import { useHelloWorld } from "./useHelloWorld";

export default function Home() {
  const { helloWorld, isLoading, isError } = useHelloWorld();
  console.log(helloWorld);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error loading data</div>;
  }
  return <div>{helloWorld.Hello}</div>;
}
