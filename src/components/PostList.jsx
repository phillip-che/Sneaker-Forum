import Post from "./Post"

const PostList = ({posts}) => {
    console.log(posts);
    return (
        <div className="post-list">
            {posts.map((post) => (
                <Post 
                    key={post.id}
                    timeCreated={post.created_at} 
                    title={post.title} 
                    upvotes={post.upvotes}
                    postID={post.id}
                />
            ))}
        </div>
    )
}

export default PostList