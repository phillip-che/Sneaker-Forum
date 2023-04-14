const Comment = ({author, comment, date}) => {

    return (
        <div>
            <p className="etc">{author}</p>
            <p className="comment">{comment}</p>
            <p className="post-time etc">{date} ago</p>
            <hr class="gradient" />
        </div>
    )
}

export default Comment