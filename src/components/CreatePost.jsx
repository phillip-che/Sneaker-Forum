import { useState, useEffect } from "react"
import { supabase } from "../client";
import { v4 as uuid4 } from "uuid";

const CreatePost = () => {

    const [user, setUser] = useState("");
    const [input, setInputs] = useState({
        postID: uuid4(),
        title: "",
        description: "",
        images: []
    });

    useEffect(() => {
        console.log(input.postID);
        supabase.auth.onAuthStateChange((event, session) => {
            console.log(session.user);
          if(session) {
            setUser(session.user);
          }
        });
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
        .insert([{id: input.postID, author: user.email, title: input.title, description: input.description}])
        .select()
        .then((data) => {
            console.log(data);
            window.location = "/";
        });
    }

    const onUpload = (event) => {
        let file = event.target.files[0];
        console.log(file);
        input.images.push(file);
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

            {input.images ? (
                <div>
                    {input.images.map((image) => {
                        <img className="upload-image" src={image} />
                    })}
                </div>
            ) : null }

            <input className="image-url" type="file" onChange={(e) => onUpload(e)} />
            
            <button disabled={input.title.length < 1} className="button" onClick={createPost}>
                Post
            </button>
        </div>
    )
}

export default CreatePost