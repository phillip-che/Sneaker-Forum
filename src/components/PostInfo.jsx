import { supabase } from "../client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import commentIcon from "../assets/comment.png";
import upvoteIcon from "../assets/upvote.png";
import upvoted from "../assets/upvoted.png";
import updateIcon from "../assets/update.png";
import CommentSection from "./CommentSection";
import { Link } from "react-router-dom";

const PostInfo = () => {
  let params = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [upvotes, setUpvotes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [user, setUser] = useState("");

  useEffect(() => {
    const getPost = async () => {
      await supabase
        .from("Posts")
        .select()
        .eq("id", params.postID)
        .then((response) => {
          console.log(response.data[0]);
          setPost(response.data[0]);
          setUpvotes(response.data[0].upvotes);
        });
    };

    const getComments = async () => {
      await supabase
        .from("Comments")
        .select()
        .eq("post_id", params.postID)
        .then((response) => {
          console.log(response.data);
          setComments(response.data);
        });
    };

    supabase.auth.onAuthStateChange((event, session) => {
      if (session) {
        setUser(session.user.email);
      }
    });

    getPost();
    getComments();
  }, []);

  const timeSince = (date) => {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;

    if (interval > 1) {
      return (
        Math.floor(interval) + (Math.floor(interval) == 1 ? " year" : " years")
      );
    }
    interval = seconds / 2592000;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) == 1 ? " month" : " months")
      );
    }
    interval = seconds / 86400;
    if (interval > 1) {
      return (
        Math.floor(interval) + (Math.floor(interval) == 1 ? " day" : " days")
      );
    }
    interval = seconds / 3600;
    if (interval > 1) {
      return (
        Math.floor(interval) + (Math.floor(interval) == 1 ? " hour" : " hours")
      );
    }
    interval = seconds / 60;
    if (interval > 1) {
      return (
        Math.floor(interval) +
        (Math.floor(interval) == 1 ? " minute" : " minutes")
      );
    }
    return Math.floor(seconds) + " seconds";
  };

  const upvote = () => {
    setUpvotes(upvotes + 1);
    const updateUpvotes = async () => {
      await supabase
        .from("Posts")
        .update({ upvotes: upvotes + 1 })
        .eq("id", params.postID);
    };
    setLiked(!liked);
    updateUpvotes();
  };

  const deletePost = () => {
    if(confirm("Are you sure you want to delete your post? You can't undo this.")) {
      console.log("POST HAS BEEN DELETED.");
      const deletePost = async () => {
        await supabase
        .from('Posts')
        .delete()
        .eq('id', params.postID)
      }
      deletePost();
      window.location = "/";
      window.alert("Post Successfully Deleted.");
    };
  }

  return (
    <div>
      {post ? (
        <div className="post-container">
          <div>

            {user === post.author ? (
              <div className="update-dropdown">
              <div className="dropdown-button">
                <img className="post-icons" src={updateIcon} />
              </div>
              <div className="dropdown-content">
                <Link to={`/${params.postID}/update`} >Edit</Link>
                <Link onClick={deletePost}>Delete</Link>
              </div>
            </div>
            ) : null}
            
            <p className="etc">{post.author}</p>
            <h2 className="post-title">{post.title}</h2>
            <hr class="solid" />
            <p className="post-description">{post.description}</p>
            <hr class="solid" />
            <div className="post-footer">
              <img className="post-icons" src={commentIcon} />
              <li className="post-misc">
                <p className="post-comments">
                  {comments.length +
                    (comments.length == 1 ? " Comment" : " Comments")}
                </p>
              </li>
              {!liked ? (
                <>
                  <img
                    className="post-icons post-upvotes"
                    src={upvoteIcon}
                    onClick={upvote}
                  />
                  <li className="post-misc">
                    <p>{upvotes + (upvotes == 1 ? " Upvote" : " Upvotes")}</p>
                  </li>
                </>
              ) : (
                <>
                  <img className="post-icons post-upvotes" src={upvoted} />
                  <li className="post-misc">
                    <p>{upvotes + (upvotes == 1 ? " Upvote" : " Upvotes")}</p>
                  </li>
                </>
              )}
              <li className="post-misc">
                <p className="post-time">
                  Posted {timeSince(new Date(post.created_at))} ago
                </p>
              </li>
            </div>
          </div>
        </div>
      ) : null}
      <CommentSection
        comments={comments}
        postID={params.postID}
        timeSince={timeSince}
      />
    </div>
  );
};

export default PostInfo;
