import React, {Component} from 'react';
import {Field, reduxForm} from 'redux-form';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
import { createPost } from '../actions';

class PostsNew extends Component{
  renderField(field){
    // const className = `form-group ${field.meta.touched&&field.meta.error? 'has-danger': ''}`;
    const {meta: {touched,error}} = field;
    const className = `form-group ${touched&&error? 'has-danger': ''}`;
    return (
      <div className={className}>
        <label>{field.label}</label>
        <input className="form-control"
          type="text"
          {...field.input}
        />
        {/* meta.error property automatically added from validate function */}
        {field.meta.touched && field.meta.error ? <div className="alert alert-danger">{field.meta.error}</div>: ''}
      </div>
    )
  }
  onSubmit(values){
    // console.log(values);
    this.props.createPost(values, ()=>{
      this.props.history.push('/');
    });
  }
  render(){
    // const handleSubmit = this.props.handleSubmit;
    const { handleSubmit } = this.props;
    return (
        <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
          <Field label="Title for Post" name="title" component={this.renderField}/>
          <Field label="Categories" name="categories" component={this.renderField}/>
          <Field label="Post Content" name="content" component={this.renderField}/>
          <button type="submit" className="btn btn-primary">Submit</button>
          <Link to="/" className="btn btn-secondary">Cancel</Link>
        </form>
    )
  }
}

function validate(values){
  //console.log(values)->{title: 'asd', categories:'eetr',content:'af'}
  const errors = {};

  // Validate the inputs from 'values'
  if(!values.title){
    errors.title = "Enter a title";
  }
  if(!values.categories){
    errors.categories = "Enter a category";
  }
  if(!values.content){
    errors.content = "Enter some content";
  }
  // if errors is empty, the form is fine to submit
  // if errors has any properties, redux form assumes form is invalid
  return errors;
}

export default reduxForm({
  //validate:validate,
  validate,
  form: 'PostsNewForm'
})(
  connect(null, {createPost})(PostsNew)
);
