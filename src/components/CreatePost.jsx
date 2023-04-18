import { useState, useEffect } from "react"
import { supabase } from "../client";
import { v4 as uuid4 } from "uuid";

const CreatePost = () => {

    const [user, setUser] = useState("");
    const [input, setInputs] = useState({
        postID: uuid4(),
        title: "",
        description: "",
    });
    const [images, setImages] = useState([]);

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
            if(images.length) {
                const storeImage = async (image) => {
                    console.log("Storing Images...");
                    await supabase
                    .storage
                    .from('images')
                    .upload(user.id + "/" + input.postID + "/" + uuid4(), image)
                    .then((data, error) => {
                        console.log("Stored " + data);
                        if(error) {
                            console.log(error);
                        }
                    })
                }
                images.forEach(image => storeImage(image));
            }
            console.log(data);
            window.location = `/${input.postID}`;
        });
    }

    const onUpload = (event) => {
          setImages(prev =>  [...prev, event.target.files[0]]);
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

            {images ? (
                <div className="upload-container">
                    {images.map((image, index) => {
                        return (
                            <div key={index} className="image-upload">
                                <img width={"250px"} src={URL.createObjectURL(image)} />
                                <button
                                className="image-delete-button"
                                onClick={() => {
                                    setImages(images.filter((e) => e !== image));
                                }}>✖</button>
                            </div>
                        )
                    })}
                </div>
            ) : null }
            
            <input className="image-url" type="file" onChange={(e) => onUpload(e)} />
            
            <button disabled={!input.title} className="button" onClick={createPost}>
                Post
            </button>
        </div>
    )
}

export default CreatePost