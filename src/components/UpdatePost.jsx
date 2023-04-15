import { useParams } from "react-router-dom"

const UpdatePost = () => {
    let params = useParams();
    return(
        <div>
            UPDATE POST: {params.postID}
        </div>
    )
}

export default UpdatePost