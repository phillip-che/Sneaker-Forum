import { Link } from "react-router-dom"

const Post = ({timeCreated, title, upvotes, postID}) => {

    const timeSince = (date) => {
        var seconds = Math.floor((new Date() - date) / 1000);
      
        var interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + " years";
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + " months";
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + " days";
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + " hours";
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + " minutes";
        }
        return Math.floor(seconds) + " seconds";
    }

    return (
        <div className="post">
            <Link to={`/${postID}`}>
                <h5>Posted {timeSince(new Date(timeCreated))} ago</h5>
                <h3>{title}</h3>
                <div>{upvotes} upvotes</div>
            </Link>
        </div>
    )
}

export default Post