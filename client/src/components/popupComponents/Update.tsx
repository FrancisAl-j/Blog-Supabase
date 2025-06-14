import React, {
  useState,
  type ChangeEvent,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useAppDispatch, useAppSelector } from "../../redux/Hooks";
import { GetMyBlogs, UpdateBlog } from "../../redux/thunks/blogThunk";

type UpdateData = {
  title: string;
  content: string;
};
const Update = ({
  id,
  title,
  content,

  setUpdateId,
}: {
  id: number;
  title: string;
  content: string;
  setUpdateId: Dispatch<SetStateAction<number | null>>;
}) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState<UpdateData>({
    title: title || "",
    content: content || "",
  });

  const { user } = useAppSelector((state) => state.auth);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await dispatch(UpdateBlog({ id, formData }));

    if (UpdateBlog.fulfilled.match(result)) {
      setUpdateId(null);
      dispatch(GetMyBlogs(user?.id as string));
    }
  };

  const handleCancel = () => {
    setUpdateId(null);
  };
  return (
    <main className="w-full h-[100svh] grid place-items-center  fixed top-0 left-0 bg-[#00000080]">
      <div className="form-container bg-[#eeeeee] border-black border-2 rounded-lg p-2">
        <h1 className="title text-[#2c2c2c] font-extrabold text-center">
          Update Blog
        </h1>

        <form onSubmit={handleUpdate} className="flex flex-col mt-20 gap-4 p-4">
          <div className="flex flex-col">
            <span className="label text-[#2c2c2c]">Title</span>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="border-black border-2 text-[#2c2c2c] p-2 rounded-md"
            />
          </div>

          <div className="flex flex-col">
            <span className="label text-[#2c2c2c]">Content</span>
            <textarea
              name="content"
              rows={3}
              value={formData.content}
              onChange={handleChange}
              className="border-black border-2 text-[#2c2c2c] p-2 rounded-md"
            ></textarea>
          </div>

          <div className="mt-10 flex gap-3">
            <button
              onClick={handleCancel}
              className="label bg-gray-300 text-[#2c2c2c] cursor-pointer rounded-md flex-1"
            >
              Cancel
            </button>
            <button className="label bg-[#2c2c2c] cursor-pointer rounded-md  hover:bg-[#eeeeee] hover:text-[#2c2c2c] border-[#2c2c2c] border-2 flex-1">
              Update
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Update;
