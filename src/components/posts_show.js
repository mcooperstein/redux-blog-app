import React, {Component} from 'react';
import { connect } from 'react-redux';
import { fetchPost, deletePost } from '../actions';
import { Link } from 'react-router-dom';

class PostsShow extends Component {
  componentDidMount(){
    //provided by react-router
    const id = this.props.match.params.id;
    this.props.fetchPost(id);
  }

  onDeleteClick(){
    const id = this.props.match.params.id;
    this.props.deletePost(id, ()=>{
      this.props.history.push('/');
    });
  }
  render(){
    const {post} = this.props;

    if(!post){
      return <div>Loading...</div>;
    }
    return (
      <div>
        <Link to="/">&larr; Back to Homepage</Link>
        <button className="btn btn-danger pull-xs-right" onClick={this.onDeleteClick.bind(this)}>Delete Post</button>
        <h3>{post.title}</h3>
        <h6>Categories: {post.categories}</h6>
        <p>{post.content}</p>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps){
  const posts = state.posts;
  return {post: posts[ownProps.match.params.id]};
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostsShow);
