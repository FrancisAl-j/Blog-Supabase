import { useAppSelector } from "../redux/Hooks";

type BlogType = {
  id: number;
  title: string;
  content: string;
  image_url: string;
  create_at?: Date;
};

const Blogs = () => {
  const { blogs, gettingBlogs } = useAppSelector((state) => state.blog);

  if (gettingBlogs) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }
  return (
    <main>
      <h1 className="title text-[#2c2c2c] font-semibold">Blogs</h1>
      <div className="flex flex-wrap justify-center gap-2 py-6">
        {blogs &&
          blogs.map((blog: BlogType, index: number) => {
            return (
              // Blog Cards
              <div
                key={index}
                className="border-[#2c2c2c] border-2 w-[350px] cursor-pointer p-2 rounded-md"
              >
                <div>
                  <img
                    src={blog.image_url}
                    alt=""
                    className="aspect-square w-[350px] h-[200px] object-contain"
                  />
                  <h1 className="text-[#2c2c2c]">{blog.title}</h1>
                  <p className="text-[#2c2c2c]">{blog.content}</p>
                </div>
              </div>
            );
          })}
      </div>
    </main>
  );
};

export default Blogs;
