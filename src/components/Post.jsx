import { Link } from "react-router-dom"

const Post = ({timeCreated, title, upvotes, postID}) => {

    return (
        <div className="post">
            <Link to={`/${postID}`}>
                <h5>Posted: {new Date(timeCreated).toLocaleDateString().toString()}</h5>
                <h3>{title}</h3>
                <div>{upvotes} upvotes</div>
            </Link>
        </div>
    )
}

export default Post