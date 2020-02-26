import React, { Component } from "react";
import { Form, FormGroup, Label, Input, Button } from "reactstrap";

// Form Component for adding a new Review. It contains all required input fields to 
// create a new review and once it's submitted its state (a new Review) is lifted to the APP.
class AddReviewForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemName: "",
            content: "",
            itemImgSrc: "",
            isRecommended: false
        };
    }

    // Handle change in form input values
    changehandler = e => {
        this.setState({
            [e.target.name]: e.target.value
        });
    };

    // Handle form submission by sending the current state(new Review data) to the 
    // UserControls componet and later that app where the review will be added to the list.
    submitHandler = e => {
        e.preventDefault();
        this.props.createReview(this.state);
        this.props.toggleAll();
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
                <FormGroup>
                    <Label>Do You Recommend It?</Label>
                    <Input
                        type="select"
                        name="isRecommended"
                        onChange={this.changehandler}
                        value={this.state.isRecommended}
                    >
                        <option value={false}>No</option>
                        <option value={true}>Yes</option>
                    </Input>
                </FormGroup>
                <Button type="submit" color="primary">
                    Submit
                </Button>
            </Form>
        );
    }
}

export default AddReviewForm;
