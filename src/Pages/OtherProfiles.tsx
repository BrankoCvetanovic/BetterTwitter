import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getUserData } from "../util/auth";
import { getAllPosts } from "../util/post";
import Post from "../components/Post";
import { CircularProgress } from "@mui/material";

export default function OtherProfiles() {
  const params = useParams();

  const { data, error, isError, isPending } = useQuery({
    queryFn: (userId: any) => getUserData(params.userId!),
    queryKey: ["account", params.userId],
  });

  const {
    data: postsData,
    error: postsError,
    isError: isPostsError,
    isPending: isPostsPending,
  } = useQuery({
    queryFn: getAllPosts,
    queryKey: ["posts"],
  });

  const posts = [];
  if (postsData) {
    for (const key in postsData) {
      if (postsData[key].userId === params.userId!) {
        posts.push({ data: postsData[key], postId: key });
      }
    }
    posts.reverse();
  }

  return (
    <div className="profile">
      {isPending && <CircularProgress />}
      {isError && <h2>{error.message}</h2>}
      {data && <h1>{data.username}</h1>}
      {isPostsPending && (
        <div className="pending">
          <CircularProgress size="4rem" />
        </div>
      )}
      {isPostsError && <p>{postsError.message}</p>}
      {posts && (
        <ul className="post-container">
          {posts.map((post: any) => {
            return (
              <li key={post.data.imageName + Math.random()}>
                <Post
                  imageName={post.data.imageName}
                  text={post.data.postText}
                  userName={post.data.userName}
                  authId={post.data.userId}
                  likes={post.data.likes}
                  postId={post.postId}
                />
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
