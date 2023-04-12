const Post = ({timeCreated, title, upvotes}) => {
    return (
        <div className="post">
            <h5>Posted: {timeCreated}</h5>
            <h3>{title}</h3>
            <div>{upvotes} upvotes</div>
        </div>
    )
}

export default Post