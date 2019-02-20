import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Formik } from 'formik';
import { Icon } from 'react-fa';
import './add-new-form.css';

class AddNewForm extends Component {
    tempImage = 'https://bulma.io/images/placeholders/96x96.png';
    imageBase64Prefix = 'data:image/jpg;base64,';
    allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/svg'];

    constructor(props) {
        super(props);
        this.state = {
            image: ''
        };
    }

    handleImage(event) {
        event.preventDefault();
        let reader = new FileReader();
        let file = event.target.files[0];
		reader.onloadend = () => {
            this.setState({image: reader.result.substr(reader.result.indexOf(',') + 1)});
		}
		reader.readAsDataURL(file)
    }

    submitForm(values) {
        if(values.password !== 'Password1!') {
            alert('Nice try scrub');
            return;
        }
        if(this.state.image){
            values.image = this.imageBase64Prefix + this.state.image;
        }
        console.log(JSON.stringify(values, null, 2));
    }

    render() {
        return (
            <div className="column is-8 is-offset-2 review-column"> 
                <div className="card review-card">
                    <div className="card-content">
                    <div className="media">
                        <div className="image-header-container">
                            <img src="/images/plus.png" className="image-header" alt="Image header" />
                        </div>
                    </div>
                    <Formik
                        initialValues={{ title: '', image: '', imageName: '', imageFileType: '', author: '', startedOn: '', finishedOn: '', pageCount: 0, category: 'Fiction', summary: '', password: '' }}
                        validate={values => {
                            let errors = {};
                            if (!values.title)
                                errors.title = 'Required';
                            if(!values.author)
                                errors.author = 'Required';
                            if(!values.startedOn)
                                errors.startedOn = 'Required';
                            if(!values.finishedOn) 
                                errors.finishedOn = 'Required';
                            if(!values.pageCount)
                                errors.pageCount = 'Required';
                            if(!values.summary)
                                errors.summary = 'Required';
                            if(!values.password)
                                errors.password = 'Required';
                            if(values.imageFileType && this.allowedTypes.indexOf(values.imageFileType) === -1)
                                errors.image = 'File does not match allowed types';
                            if(!values.imageName)
                                errors.image = 'Required';
                            return errors;
                        }}
                        onSubmit={(values, { setSubmitting }) => {
                            setTimeout(() => {
                                this.submitForm(values);
                                setSubmitting(false);
                            }, 400);
                        }}>{({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting, setFieldValue }) => (
                            <form className="form" onSubmit={handleSubmit}>
                                <div className="field">
                                    <label className="label">Title</label>
                                    <div className="control">
                                        <input className={errors.title && touched.title ? 'input is-danger' : 'input'} type="text" name="title" placeholder="Enter title" onChange={handleChange} onBlur={handleBlur} value={values.title} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Image</label>
                                    <div className="file has-name is-centered">
                                        <label className="file-label">
                                            <input className="file-input" id="image" type="file" name="image"
                                                onChange={(event) => {
                                                    this.handleImage(event)
                                                    const file = event.currentTarget.files[0];
                                                    setFieldValue("imageName", file.name);
                                                    setFieldValue("imageFileType", file.type);
                                                }} 
                                            />
                                            <span className="file-cta">
                                                <span className="file-icon"><Icon name="upload" /></span><span className="file-label"> Choose a file…</span>
                                            </span>
                                            {values.imageName ? <span className="file-name">{values.imageName}</span> : null}
                                        </label>
                                    </div>
                                    {errors.image && touched.image ? <p className="help is-danger" style={{'textAlign': 'center'}}>{errors.image}</p> : null}
                                </div>
                                <div className="add-new-image">
                                    {!errors.image && this.state.image && values.imageName ? <img src={this.imageBase64Prefix + this.state.image} alt={values.imageName} width="96" height="96" /> : <img src={this.tempImage} alt="Placeholder" />}
                                </div>
                                <div className="field">
                                    <label className="label">Author</label>
                                    <div className="control">
                                        <input className={errors.author && touched.author ? 'input is-danger' : 'input'} type="text" name="author" placeholder="Enter author" onChange={handleChange} onBlur={handleBlur} value={values.author} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Started On</label>
                                    <div className="control">
                                        <input className={errors.startedOn && touched.startedOn ? 'input is-danger' : 'input'} name="startedOn" type="date" onChange={handleChange} onBlur={handleBlur} value={values.startedOn} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Finished On</label>
                                    <div className="control">
                                        <input className={errors.finishedOn && touched.finishedOn ? 'input is-danger' : 'input'} type="date" name="finishedOn" onChange={handleChange} onBlur={handleBlur} value={values.finishedOn} />
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Page Count</label>
                                    <div className="control">
                                        <input className={errors.pageCount && touched.pageCount ? 'input is-danger' : 'input'} type="number" name="pageCount" placeholder="Enter page count" onChange={handleChange} onBlur={handleBlur} value={values.pageCount}/>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Category</label>
                                    <div className="control radio-container">
                                        <input type="radio" name="category" value={values.category} onBlur={handleBlur} id="Fiction" checked={values.category === 'Fiction'} onChange={() => {setFieldValue('category', 'Fiction')}} />
                                        <label className="radio">Fiction</label>
                                        <input type="radio" name="category" value={values.category} onBlur={handleBlur} id="Non-Fiction" checked={values.category === 'Non-Fiction'} onChange={() => {setFieldValue('category', 'Non-Fiction')}}/>
                                        <label className="radio">Non-Fiction</label>
                                    </div>
                                </div>   
                                <div className="field">
                                    <label className="label">Summary</label>
                                    <div className="control">
                                        <textarea className={errors.summary && touched.summary ? 'textarea is-danger' : 'textarea'} name="summary" placeholder="Enter summary" onChange={handleChange} onBlur={handleBlur} value={values.summary}></textarea>
                                    </div>
                                </div>
                                <div className="field">
                                    <label className="label">Password</label>
                                    <div className="control">
                                        <input className={errors.password && touched.password ? 'input is-danger' : 'input'} type="password" name="password" placeholder="Enter password" onChange={handleChange} onBlur={handleBlur} value={values.password} />
                                    </div>
                                </div>
                                <button className="button is-link" type="submit" disabled={isSubmitting}>Submit</button>
                                <Link to="/">
                                    <button className="button is-text">Cancel</button>
                                </Link>
                            </form>
                        )}
                        </Formik>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddNewForm;