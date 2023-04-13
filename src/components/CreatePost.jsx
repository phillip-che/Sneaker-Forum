import { useState, useEffect } from "react"
import { supabase } from "../client";

const CreatePost = () => {

    const [user, setUser] = useState("");
    const [input, setInputs] = useState({
        title: "",
        description: "",
    });

    useEffect(() => {
        supabase.auth.onAuthStateChange((event, session) => {
          if(session) {
            setUser(session.user.email);
          }
        })
      }, []);

    const handleChange = (event) => {
        console.log("name: " + event.target.name + " value: " + event.target.value);
        setInputs((prev) => {
            return {
                ...prev,
                [event.target.name]: event.target.value
            }
        })
    };

    const createPost = async () => {
        await supabase
        .from('Posts')
        .insert([{author: user, title: input.title, description: input.description}])
        .select();
    }

    return (
        <div className="create-container">
            <h2>Create Post</h2>
            <div>
                <input name="title" className="title" placeholder="Title" type="text" onChange={handleChange} />
            </div>
            <div>
                <textarea name="description" placeholder="Text (Optional)" className="description" onChange={handleChange} >
                        
                </textarea>
            </div>

            <button className="button" >
                Post
            </button>
        </div>
    )
}

export default CreatePost