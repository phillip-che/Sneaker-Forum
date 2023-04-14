import { useState, useEffect } from 'react'
import PostList from './components/PostList'
import './App.css'
import { supabase } from './client'
import { v4 as uuid4 } from 'uuid';

const App = () => {

  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [auth, setAuth] = useState(false);

  useEffect(() => {

    const getPosts = async () => {
      await supabase
      .from('Posts')
      .select()
      .order('created_at', { ascending: true })
      .then(({data}) => {
        setPosts(data);
        console.log(data)
      })
    }

    getPosts();

    supabase.auth.onAuthStateChange((event, session) => {
      if(event ==="SIGNED_IN" || session) {
        setUser(session.user);
        setAuth(true);
      }
    })
  }, []);

  return (
    <div>
      {posts ? (
        <div> 
          <PostList posts={posts} />
        </div>
      ) : (
        <div>
          There are no posts
        </div>
      )}
      
    </div>
  )    
}

export default App
