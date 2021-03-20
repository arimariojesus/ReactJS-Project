import './styles.css';

export const PostCard = ({...post}) => (
  <div className="post">
    <img src={post.cover} alt={post.title} className="post-thumb"/>
    <div className="post-content">
      <h2>{ post.title }</h2>
      <p>{ post.body }</p>
    </div>
  </div>
);