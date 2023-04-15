import { useState, useEffect } from "react";
import PostList from "./components/PostList";
import "./App.css";
import { supabase } from "./client";
import { v4 as uuid4 } from "uuid";
import SearchBar from "./components/SearchBar";
import Filters from "./components/Filters";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState("");
  const [auth, setAuth] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const getPosts = async () => {
      await supabase
        .from("Posts")
        .select()
        .order("created_at", { ascending: true })
        .then(({ data }) => {
          setPosts(data);
          console.log(data);
        });
    };

    getPosts();

    supabase.auth.onAuthStateChange((event, session) => {
      if (event === "SIGNED_IN" || session) {
        setUser(session.user);
        setAuth(true);
      }
    });
  }, []);

  const newFilter = async () => {
    await supabase
      .from("Posts")
      .select()
      .order("created_at", { ascending: false })
      .then(({ data }) => {
        setPosts(data);
        console.log(data);
      });
  };

  const popularFilter = async () => {
    await supabase
      .from("Posts")
      .select()
      .order("upvotes", { ascending: false })
      .then(({ data }) => {
        setPosts(data);
        console.log(data);
      });
  };

  const searchItems = (searchValue) => {
    console.log(searchValue);
    setSearchInput(searchValue);

    if (searchValue.length > 0) {
      const filteredPosts = Object.keys(posts).filter(item => 
        Object.values(posts[item])
          .join("")
          .toLowerCase()
          .includes(searchValue.toLowerCase())
      );

      const filteredData = [...new Set([...filteredPosts])];

      const filteredResults = [];
      filteredData.forEach((postID) => {
        filteredResults.push(posts[postID]);
      })

      setSearchResults(filteredResults);
      
    } else {
      setSearchResults(posts);
    }
  };

  return (
    <div>
      <div className="filters-bar">
        <SearchBar searchItems={searchItems} />
        <Filters popularFilter={popularFilter} newFilter={newFilter} />
      </div>
      {posts ? (
        <div>
          <PostList posts={searchInput.length > 0 ? searchResults : posts} />
        </div>
      ) : (
        <div>There are no posts</div>
      )}
    </div>
  );
};

export default App;
