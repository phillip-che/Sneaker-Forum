const Post = ({timeCreated, title, upvotes}) => {
    return (
        <div className="post">
            <h3>{title}</h3>
            <div>{upvotes} upvotes</div>
        </div>
    )
}

export default Post