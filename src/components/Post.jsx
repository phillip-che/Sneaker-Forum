import { Link } from "react-router-dom"

const Post = ({timeCreated, title, upvotes, postID}) => {

    const timeSince = (date) => {
        var seconds = Math.floor((new Date() - date) / 1000);
      
        var interval = seconds / 31536000;
      
        if (interval > 1) {
          return Math.floor(interval) + ((Math.floor(interval) == 1) ? " year" : " years");
        }
        interval = seconds / 2592000;
        if (interval > 1) {
          return Math.floor(interval) + ((Math.floor(interval) == 1) ? " month" : " months");
        }
        interval = seconds / 86400;
        if (interval > 1) {
          return Math.floor(interval) + ((Math.floor(interval) == 1) ? " day" : " days");
        }
        interval = seconds / 3600;
        if (interval > 1) {
          return Math.floor(interval) + ((Math.floor(interval) == 1) ? " hour" : " hours");
        }
        interval = seconds / 60;
        if (interval > 1) {
          return Math.floor(interval) + ((Math.floor(interval) == 1) ? " minute" : " minutes");
        }
        return Math.floor(seconds) + " seconds";
    }

    return (
        <div className="post">
            <Link to={`/${postID}`}>
                <h5>Posted {timeSince(new Date(timeCreated))} ago</h5>
                <h2>{title}</h2>
                <div>{upvotes + (upvotes == 1 ? " Upvote" : " Upvotes")}</div>
            </Link>
        </div>
    )
}

export default Post