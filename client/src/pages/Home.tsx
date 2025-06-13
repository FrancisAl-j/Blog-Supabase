import Blogs from "../components/Blogs";

const Home = () => {
  return (
    <main className="main-container h-auto">
      <section className="h-[80svh]  grid place-items-center">
        <div>
          <h1 className="title font-extrabold text-center">Post Your Blogs</h1>
        </div>
      </section>

      <div className=" bg-[#eeeeee]">
        <Blogs />
      </div>
    </main>
  );
};

export default Home;
