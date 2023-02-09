import { useCallback, useState } from "react";
import { Header, Text, Spinner } from "../..";
import { usePostContext } from "../../../contexts/PostProvider";

const PostItem = ({ post }) => {
  const [loading, setLoading] = useState(false);
  const { onDeletePost } = usePostContext();

  const handleDeletePost = useCallback(
    async (id) => {
      setLoading(true);
      await onDeletePost(id);
      setLoading(false);
    },
    [onDeletePost]
  );
  return (
    <li>
      <Header>{post.title}</Header>
      <Text>{post.body}</Text>
      <div>
        {loading ? (
          <Spinner />
        ) : (
          <button onClick={() => handleDeletePost(post.id)}>Delete</button>
        )}
      </div>
    </li>
  );
};

export default PostItem;
