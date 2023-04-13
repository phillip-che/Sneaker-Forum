import { useState } from "react"

const CreatePost = () => {

    const [input, setInputs] = useState({
        title: "",
        description: "",
        
    })

    return (
        <div className="create-container">
            CREATE POST
            <div>
                <input className="title" placeholder="Title"/>
            </div>
            <div>
                <textarea placeholder="Content (Optional)" className="description">
                        
                </textarea>
            </div>

            <button classname="button" >
                Post
            </button>
        </div>
    )
}

export default CreatePost