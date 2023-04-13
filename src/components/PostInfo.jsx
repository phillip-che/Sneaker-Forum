import { supabase } from '../client'
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"

const PostInfo = () => {
    let params = useParams();
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState(null);

    useEffect(() => {
        const getPost = async () => {
            await supabase
            .from('Posts')
            .select()
            .eq('id', params.postID)
            .then((response) => {
                console.log(response.data[0]);
                setPost(response.data[0]);
            });
        }
        getPost();
    }, []);

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
        <div className="post-container">
            {post ? (
                <div>
                    <h4>{post.author}</h4>
                    Posted {timeSince(new Date(post.created_at))} ago
                    <h3 className="post-title">{post.title}</h3>
                    <p className="post-description">{post.description}</p>
                </div>
            ) : null }
        </div>
    )
}

export default PostInfo