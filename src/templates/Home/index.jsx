import { Component } from 'react';

import './styles.css';

import { Posts } from '../../components/Posts';
import { loadPosts } from '../../utils/load-posts';
import { Button } from '../../components/Button';
import { SearchInput } from '../../components/SearchInput';

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 9,
    searchValue: ''
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const postsAndPhotos = await loadPosts();
    const { page, postsPerPage } = this.state;

    this.setState({
      ...this.state,
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const {
      page,
      postsPerPage,
      allPosts,
      posts
    } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    this.setState({ posts, page: nextPage });
  }

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  }

  render() {
    const { posts, allPosts, searchValue } = this.state;
    const noMorePosts = posts.length >= allPosts.length;

    const filteredPosts = !!searchValue ? 
    allPosts.filter(post => {
      const value = searchValue.toLocaleLowerCase();
      return post.title.toLowerCase().includes(value);
    })
    : posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <div><strong>Search value: {searchValue}</strong></div>
          )}

          <SearchInput 
            searchValue={searchValue}
            handleChange={this.handleChange}
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
              onClick={this.loadMorePosts} 
              disabled={noMorePosts}  
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
