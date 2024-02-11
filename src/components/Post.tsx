import { FC, useEffect, useState } from "react";
import { useRouteLoaderData } from "react-router-dom";

const Post: FC<{
  text: string;
  imageName: string;
  userName: string;
  userId: string;
}> = ({ text, imageName, userName, userId }) => {
  const [imageData, setImageData] = useState<string[]>([]);

  const loaderData = useRouteLoaderData("root") as string[];

  useEffect(() => {
    setImageData(loaderData);
  }, []);

  let imageIndex = -1;
  if (imageName !== "") {
    imageIndex = imageData!.findIndex((url: string) => url.includes(imageName));
  }

  return (
    <div className="post">
      <h4
        onClick={() => {
          console.log(userId);
        }}
      >
        {userName}
      </h4>
      <p> {text}</p>
      {imageName && <img src={imageData[imageIndex]} alt="" />}
    </div>
  );
};

export default Post;
