import Comment from "./Comment";
import { supabase } from "../client";
import { useState, useEffect } from "react";

const CommentSection = ({ postID, timeSince }) => {

    const [commentInput, setCommentInput] = useState("");
    const [user, setUser] = useState("");
    const [comments, setComments] = useState(null);

    const getComments = async () => {
        await supabase
          .from("Comments")
          .select()
          .eq("post_id", postID)
          .then((response) => {
            console.log(response.data);
            setComments(response.data);
          });
      };

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
            setUser(session.user.email);
        }
        });

          getComments();
    }, []);

    const handleChange = (event) => {
        console.log(event.target.name + ": " + event.target.value);
        setCommentInput(event.target.value);
    };

    const addComment = async () => {
        await supabase
        .from("Comments")
        .insert({'post_id' : postID, 'author' : user, 'comment' : commentInput})
        .select()
        .then((response) => {
            console.log(response);
            getComments();
        })
    };

    return (
        <div className="comment-container">
    
            <textarea
            className="comment-content"
            placeholder="Leave a comment"
            name="comment"
            onChange={handleChange}
            ></textarea>
            <button disabled={commentInput.length < 1} className="comment-button" onClick={addComment} >Comment</button>
            
            {comments ? (
                <div className="comment-list">
                <h3>Comments</h3>
                <hr class="gradient" />
                {comments
                ? comments.map((comment) => (
                    <Comment
                        author={comment.author}
                        comment={comment.comment}
                        date={timeSince(new Date(comment.created_at))}
                    />
                    ))
                : null}
            </div>
            ) : null }
            

        </div>
    );
};

export default CommentSection;
