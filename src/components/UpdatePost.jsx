import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { supabase } from "../client";

const UpdatePost = () => {
  let params = useParams();

  const [post, setPost] = useState(null);
  const [input, setInput] = useState({
    title: "",
    description: "",
  });

  useEffect(() => {
    const getPost = async () => {
      await supabase
        .from("Posts")
        .select()
        .eq("id", params.postID)
        .then((response) => {
          console.log(response.data[0]);
          setPost(response.data[0]);
          setInput({
            title: response.data[0].title,
            description: response.data[0].description,
          });
        });
    };

    getPost();
  }, []);

  const updatePost = async () => {
    await supabase
      .from("Posts")
      .update({ title: input.title, description: input.description })
      .eq("id", params.postID);
  };

  const handleChange = (event) => {
    console.log(event.target.value);
    setInput((prev) => {
      return {
        ...prev,
        [event.target.name]: event.target.value,
      };
    });
  };

  return (
    <div>
      {post ? (
        <div className="update-container">
          <h2>Update Post</h2>
          <div>
            <input
              name="title"
              className="title"
              placeholder="Title"
              type="text"
              value={input.title}
              onChange={handleChange}
            />
          </div>

          <div>
            <textarea
              name="description"
              placeholder="Text (Optional)"
              className="description"
              value={input.description}
              onChange={handleChange}
            ></textarea>
          </div>
          <button
            className="button"
            //   onClick={deletePost}
          >
            Delete
          </button>
          <button
            disabled={input.title.length < 1}
            className="button"
            onClick={updatePost}
          >
            Update
          </button>
        </div>
      ) : null}
    </div>
  );
};

export default UpdatePost;
