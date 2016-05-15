    import React, { Component, PropTypes } from 'react';
    import { connect } from 'react-redux';
    import { fetchPost, deletePost } from '../actions/index';
    import { Link } from 'react-router';

    class PostsEdit extends Component {
      static contextTypes = {
        router: PropTypes.object
      };

      componentWillMount() {
        console.log(this.props.post);
        this.props.fetchPost(this.props.params.id);
      }

      onDeleteClick() {
        this.props.deletePost(this.props.params.id)
          .then(() => { this.context.router.push('/'); });
      }

      render() {
        const { post } = this.props;

        if (!post) {
          return <div>Loading...aksdj alksdjaslkjd laskdjlaskjd laksjdlaskjdlaskjdlaskjd alksjd laskjlorem  loremaskdj aslkdjalskjd laksjdlaksjdlaksjdlkasjdlksajdlkasjdlksajdlksajdl kasjdlkjaslkdjas lkdjaslkdjaslkdjaslkdjlaskdjlaskjdl kasjd lkasjd lkasjdl kasjd lkasj</div>;
        }

        return (
          <div>
            <Link to="/">Back To Index</Link>
            <button
              className="btn btn-danger pull-xs-right"
              onClick={this.onDeleteClick.bind(this)}>
              Delete Post
            </button>
            <h3>{post.title}</h3>
            <h6>Categories: {post.categories}</h6>
            <p>{post.content}</p>
          </div>
        );
      }
    }

    function mapStateToProps(state) {
      return { post: state.posts.post };
    }

    export default connect(mapStateToProps, { fetchPost, deletePost })(PostsEdit);
