import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions/index';
import { Link } from 'react-router';
import { reduxForm} from 'redux-form';
import {initialValues} from 'redux-form';


function validate(values) {
  const errors = {};

  if (!values.title) {
    errors.title = 'Enter a username';
  }
  if(!values.body) {
    errors.body = 'Enter some content';
  }

  return errors;
}

class PostsEdit extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  componentWillMount() {
    this.props.fetchPost(this.props.params.id);
  }

  render() {
    const { fields: { title, body }, handleSubmit } = this.props;

    return (
      <form>
        <h3>Create A New Post</h3>

        <div className={`form-group ${title.touched && title.invalid ? 'has-danger' : ''}`}>
          <label>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="text-help">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${body.touched && body.invalid ? 'has-danger' : ''}`}>
          <label>Body</label>
          <textarea className="form-control" {...body} />
          <div className="text-help">
            {body.touched ? body.error : ''}
          </div>
        </div>

        <Link to="/" className="btn btn-danger">Cancel</Link>
      </form>
    );
  }
}

function mapStateToProps(state) {
  return { post: state.posts.post };
}

// connect: first argument is mapStateToProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStateToProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title','body'],
  validate
}, null, { fetchPost })(PostsEdit);



