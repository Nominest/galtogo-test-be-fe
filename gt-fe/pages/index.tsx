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

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:3000/user");
//   const users = await res.json();
//   console.log("users", users);
//   return {
//     props: {
//       users,
//     },
//   };
// }
