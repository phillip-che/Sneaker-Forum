import Post from "./Post"

const PostList = ({posts}) => {
    return (
        <div className="post-list">
            {posts.map((post) => (
                <Post 
                    timeCreated={post.created_at} 
                    title={post.title} 
                    upvotes={post.upvotes} 
                />
            ))}
        </div>
    )
}

export default PostList