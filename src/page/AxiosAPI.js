//json placeholder 라는 페이지를 이용함

import Spinner from "../components/Spinner";
import Header from "../components/Header";
import useAsync from "../hooks/useAsync";
import axios from "axios";
import PostList from "../components/domain/PostList";
import PostProvider from "../contexts/PostProvider";
import { useCallback } from "react";
import PostAddForm from "../components/domain/PostAddForm";

const API_END_POINT = "https://jsonplaceholder.typicode.com/posts";

// 컴포넌트는 최대한 순수할 수록 좋습니다.
// 사이드 이펙트를 걱정하지 않아도 됩니다.
// 확장에 유연합니다.
// 테스트가 쉽습니다.

const AxiosAPI = () => {
  const initialPosts = useAsync(async () => {
    return await axios.get(API_END_POINT).then((response) => response.data);
  }, []);

  const handleAddPost = useCallback(async (post) => {
    return await axios
      .post(`${API_END_POINT}`, post)
      .then((response) => response.data);
  }, []);

  const handleDeletePost = useCallback(async (id) => {
    return await axios.delete(`${API_END_POINT}/${id}`).then(() => ({ id }));
  }, []);

  return (
    <PostProvider
      initialPosts={initialPosts.value}
      handleDeletePost={handleDeletePost}
      handleAddPost={handleAddPost}
    >
      <div>
        <Header>Posts</Header>
        <PostAddForm />
        {initialPosts.isLoading ? (
          <Spinner />
        ) : (
          <PostList initialPosts={initialPosts.value} />
        )}
      </div>
    </PostProvider>
  );
};

export default AxiosAPI;
