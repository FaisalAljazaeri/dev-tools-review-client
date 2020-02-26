import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

// Component that holds the form for editing any selected Review component and
// it handles lifting the data of the edited review to the state where it will be updated.
class EditReviewForm extends Component {
    constructor(props) {
        super(props);

        // Get the data for the review slected to be edited and assing it to the state
        // to manage the change in form inputs. (all inputs start by the values of the selected review and not empty)
        const { itemName, content, itemImgSrc } = this.props.review;

        this.state = {
            itemName,
            content,
            itemImgSrc
        };
    }

    // Update the state with changes in form inputs
    changehandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    // On form submission send the state(the edited review) to the APP where the old review will be updated.
    submitHandler = e => {
        e.preventDefault();
        this.props.editReview({ ...this.state, _id: this.props.review._id });
    };

    render() {
        return (
            <Form onSubmit={this.submitHandler}>
                <FormGroup>
                    <Label>Item Name</Label>
                    <Input
                        type="text"
                        name="itemName"
                        placeholder="item name"
                        onChange={this.changehandler}
                        value={this.state.itemName}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Review Content</Label>
                    <Input
                        type="textarea"
                        name="content"
                        placeholder="Review Content"
                        onChange={this.changehandler}
                        value={this.state.content}
                    />
                </FormGroup>
                <FormGroup>
                    <Label>Image Src</Label>
                    <Input
                        type="text"
                        name="itemImgSrc"
                        placeholder="Image Src"
                        onChange={this.changehandler}
                        value={this.state.itemImgSrc}
                    />
                </FormGroup>
                <Button type="submit" color="primary">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default EditReviewForm;
