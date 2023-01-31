import useForm from "../../../hooks/useForm";
import { Spinner } from "../../";
import { usePostContext } from "../../../contexts/PostProvider";

const PostAddForm = () => {
  const { onAddPost } = usePostContext();
  const { isLoading, errors, handleChange, handleSubmit } = useForm({
    initialValues: { userId: 1, title: "", body: "" },
    onSubmit: async (values) => {
      await onAddPost(values);
    },
    validate: ({ title, body }) => {
      const errors = {};
      if (!title) errors.title = "제목입력하라";
      if (!body) errors.body = "내용입력하라";
      return errors;
    },
  });
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <input type="text" name="title" onChange={handleChange} />
        {errors.title}
      </div>
      <div>
        <input type="text" name="body" onChange={handleChange} />
        {errors.body}
      </div>
      {isLoading ? <Spinner /> : <button type="submit">Add</button>}
    </form>
  );
};

export default PostAddForm;
