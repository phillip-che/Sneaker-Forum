import { useState, useEffect } from 'react'
import PostList from './components/PostList'
import './App.css'
import { supabase } from './client'
import { v4 as uuid4 } from 'uuid';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';

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
      <div className="filters-bar">
        <SearchBar />
        <Filters />
      </div>
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
