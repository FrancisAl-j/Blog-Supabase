import type { Dispatch, SetStateAction } from "react";
import { useAppDispatch } from "../../redux/Hooks";
import { DeleteBlog, GetBlogs } from "../../redux/thunks/blogThunk";

const Delete = ({
  id,
  setBlogId,
}: {
  id: number | null;
  setBlogId: Dispatch<SetStateAction<number | null>>;
}) => {
  const dispatch = useAppDispatch();

  const page = 1;
  const limit = 6;

  const cancelBtn = () => {
    setBlogId(null);
  };

  const handleDelete = async () => {
    const result = await dispatch(DeleteBlog(id as number));

    if (DeleteBlog.fulfilled.match(result)) {
      dispatch(GetBlogs({ page, limit }));
    }
  };
  return (
    <main className="bg-[#00000090] h-[100svh] w-full fixed grid place-items-center top-0 left-0">
      <div className="bg-[#eeeeee] flex flex-col px-7 py-5 gap-6 rounded-xl">
        <h1 className="text-[#2c2c2c] text-center border-b-2 border-gray-300 pb-2 font-bold text-xl">
          Delete this blog?
        </h1>

        <p className="text-[#2c2c2c]">
          Are you sure you want to delete this blog?
        </p>
        <div className="flex w-full gap-2">
          <button
            onClick={cancelBtn}
            className="bg-gray-300 flex-1 cursor-pointer text-xl text-[#2c2c2c] p-1 rounded-xl"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-400 flex-1 cursor-pointer text-xl p-1 rounded-xl"
          >
            Delete
          </button>
        </div>
      </div>
    </main>
  );
};

export default Delete;
