import { useEffect, useState, useCallback } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';

export const Home =  () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(9);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = posts.length >= allPosts.length;

  const filteredPosts = !!searchValue ? 
  allPosts.filter(post => {
    const value = searchValue.toLocaleLowerCase();
    return post.title.toLowerCase().includes(value);
  })
  : posts;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();

    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, [])
  
  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  }

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  }

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <div><strong>Search value: {searchValue}</strong></div>
        )}

        <SearchInput 
          searchValue={searchValue}
          handleChange={handleChange}
        />
      </div>

      {filteredPosts.length > 0 ? (
        <Posts posts={filteredPosts} />
      ) : (
        <p>Nenhum post encontrado :( </p>
      )}

      <div className="button-container">
        {!searchValue && (
          <Button 
            text="Load more"
            onClick={loadMorePosts} 
            disabled={noMorePosts}  
          />
        )}
      </div>
    </section>
  );
}
