import { getUserPosts } from "../util/post";
import { getUserData } from "../util/auth";
import { getUserId } from "../util/auth";
import { useQuery } from "@tanstack/react-query";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../store/hooks";
import Post from "../components/Post";

export default function ProfilePage() {
  const postCount = useAppSelector((state) => state.newPost.postsCount);

  const uId = getUserId();

  const { data, error, isError, isPending } = useQuery({
    queryFn: (userId: any) => getUserData(uId!),
    queryKey: ["account", uId],
  });

  const {
    data: postsData,
    error: errorP,
    isError: sd,
    isPending: aw,
  } = useQuery({
    queryFn: (userId: any) => getUserPosts(uId!),
    queryKey: ["posts", uId, postCount],
  });

  const posts = [];
  if (postsData) {
    for (const key in postsData) {
      posts.push(postsData[key]);
    }
    posts.reverse();
  }

  return (
    <>
      <h1>Profile Page</h1>
      {isPending && <CircularProgress />}
      {isError && <p>{error.message}</p>}
      {data && <p>{data.username}</p>}
      {posts && (
        <ul className="post-container">
          {posts.map((post: any) => {
            return (
              <li key={post.imageName + Math.random()}>
                <Post
                  imageName={post.imageName}
                  text={post.postText}
                  userName={post.userName}
                  userId={post.userId}
                />
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
