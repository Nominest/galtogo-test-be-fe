import Header from "@/components/Header";
import Test from "../components/Test";

export default function Home(): JSX.Element {
  return (
    <>
      <main className="bg-gray-100 min-h-screen">
        <Header />
        <Test />
      </main>
    </>
  );
}
