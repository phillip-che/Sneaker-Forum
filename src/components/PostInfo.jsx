import { supabase } from '../client'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import commentIcon from '../assets/comment.png'
import upvoteIcon from '../assets/upvote.png'
import upvoted from '../assets/upvoted.png'


const PostInfo = () => {
    let params = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [upvotes, setUpvotes] = useState(0);
    const [liked, setLiked] = useState(false);

    useEffect(() => {
        const getPost = async () => {
            await supabase
            .from('Posts')
            .select()
            .eq('id', params.postID)
            .then((response) => {
                console.log(response.data[0]);
                setPost(response.data[0]);
                setUpvotes(response.data[0].upvotes)
            });
        }

        const getComments = async () => {
          await supabase
          .from('Comments')
          .select()
          .eq('post_id', params.postID)
          .then((response) => {
            console.log(response.data);
            setComments(response.data);
          });
        }

        getPost();
        getComments();
    }, []);

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

    const upvote = () => {
      setUpvotes(upvotes+1);

      const updateUpvotes = async () => {
        await supabase
        .from('Posts')
        .update({upvotes: upvotes})
        .eq('id', params.postID);
      }

      updateUpvotes();
    }
    
    return (
        <div className="post-container">
            {post ? (
                <div>
                    <p className="post-author">{post.author}</p>
                    <h2 className="post-title">{post.title}</h2>
                    <p className="post-description">{post.description}</p>
                    <div className="post-footer">
                      <img className="post-icons" src={commentIcon} />
                        <li className="post-misc">
                          <p className="post-comments">{comments.length + (comments.length == 1 ? " Comment" : " Comments")}</p>
                        </li>
                        {liked}
                        <img className="post-icons" src={upvoteIcon} />
                        <li className="post-misc">
                          <p className="post-comments">{upvotes + (upvotes == 1 ? " Upvote" : " Upvotes")}</p>
                        </li>
                        <li className="post-misc">
                          <p className="post-time" >Posted {timeSince(new Date(post.created_at))} ago</p>
                        </li>
                    </div>
                </div>
            ) : null }
        </div>
    )
}

export default PostInfo