import Comment from "./Comment";

const CommentSection = ({ comments, timeSince }) => {

  return (
    <div className="comment-container">
      <div className="comment-list">
        <textarea
          className="comment-content"
          placeholder="Leave a comment"
        ></textarea>
        <button className="comment-button">asd</button>
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
