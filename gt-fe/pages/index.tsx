import Header from "@/components/Header";

export default function Home(): JSX.Element {
  return (
    <>
      <main className="bg-gray-100 min-h-screen">
        <Header />
      </main>
    </>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("http://localhost:4200/user/all");
//   const users = await res.json();
//   return {
//     props: {
//       users: users,
//     },
//   };
// }
