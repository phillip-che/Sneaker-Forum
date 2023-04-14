import Comment from "./Comment";
import { supabase } from "../client";
import { useState, useEffect } from "react";

const CommentSection = ({ comments, postID, timeSince }) => {

    const [commentInput, setCommentInput] = useState("");
    const [user, setUser] = useState("");

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
        if (session) {
            setUser(session.user.email);
        }
        });

        // const getComments = async () => {
        //     await supabase
        //       .from("Comments")
        //       .select()
        //       .eq("post_id", params.postID)
        //       .then((response) => {
        //         console.log(response.data);
        //         setComments(response.data);
        //       });
        //   };
        //   getComments();

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
    };

    return (
        <div className="comment-container">
        <div className="comment-list">
            <textarea
            className="comment-content"
            placeholder="Leave a comment"
            name="comment"
            onChange={handleChange}
            ></textarea>
            <button className="comment-button" onClick={addComment} >Comment</button>
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
        </div>
    );
};

export default CommentSection;
