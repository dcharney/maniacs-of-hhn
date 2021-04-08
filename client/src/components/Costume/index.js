import React from 'react';
import './style.css';

export default class ItemAdd extends React.Component {

    constructor() {
        super();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            image: null,
            imagePreviewUrl: null
        }
    }

    handleSubmit(e) {
        e.preventDefault();
        let form = document.forms.itemAdd;
        this.props.createItem({
            name: form.name.value,
            image: this.state.image
        });
        // Clear the form and state for the next input.
        form.name.value = "";
        this.state.image = null;
        this.state.imagePreviewUrl = null;
    }

    handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                image: file,
                imagePreviewUrl: reader.result
            });
        }

        reader.readAsDataURL(file)
    }

    render() {
        let { imagePreviewUrl } = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
            $imagePreview = (<img src={imagePreviewUrl} className={'img-preview'} width="200" height="300"/>);
        } else {
            $imagePreview = (<div className="previewText">Please select an image.</div>);
        }
        return (
            <div>
                <form name="itemAdd" onSubmit={this.handleSubmit}>
                    <table>
                        <tr>
                            <td><label for="name"></label></td>
                            <td><input className="TT" type="text" name="name" id="name" placeholder="Costume Name" /></td>
                        </tr>
                        <tr>
                            <td><input type="file" onChange={(e) => this.handleImageChange(e)} /></td>
                            <td>
                                <div className="img-preview">
                                    {$imagePreview}
                                </div>
                            </td>
                        </tr>
                        <tr>
                            <td><label for="name"></label></td>
                            <td><input className="DC" type="text" name="name" id="Description" placeholder="Description of Content" /></td>
                        </tr>
                        <tr>
                            <td><button>Submit</button></td>
                        </tr>
                    </table>
                </form>
            </div>
        );
    }
}


