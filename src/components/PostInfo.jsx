import { useParams } from "react-router-dom"

const PostInfo = () => {
    let params = useParams();
    return (
        <div>
            POST INFORMATION: {params.postID}
        </div>
    )
}

export default PostInfo