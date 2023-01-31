import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useReducer,
} from "react";

const PostContext = createContext();
export const usePostContext = () => useContext(PostContext);

// reducer는 상태관리만 하고 async await를 사용하지 않는다.
const reducer = (state, action) => {
  switch (action.type) {
    case "INIT_POSTS": {
      return action.payload;
    }
    case "ADD_POST": {
      return [...state, action.payload];
    }
    case "DELETE_POST": {
      const payload = action.payload;
      return state.filter((item) => item.id !== payload.id);
    }
    default: {
      console.error("Wrong type");
      break;
    }
  }
};

const PostProvider = ({
  children,
  initialPosts,
  handleDeletePost,
  handleAddPost,
}) => {
  const [posts, dispatch] = useReducer(reducer, initialPosts || []);

  useEffect(() => {
    dispatch({ type: "INIT_POSTS", payload: initialPosts || [] });
  }, [initialPosts]);

  const onAddPost = useCallback(
    async (id) => {
      const payload = await handleAddPost(id);
      dispatch({ type: "ADD_POST", payload });
    },
    [handleAddPost]
  );

  const onDeletePost = useCallback(
    async (id) => {
      const payload = await handleDeletePost(id);
      dispatch({ type: "DELETE_POST", payload });
    },
    [handleDeletePost]
  );

  return (
    <PostContext.Provider value={{ posts, onDeletePost, onAddPost }}>
      {children}
    </PostContext.Provider>
  );
};

export default PostProvider;
