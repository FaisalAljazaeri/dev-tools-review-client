import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import EditReviewForm from "./EditReviewForm";
import axios from "axios";

class ReviewModal extends Component {
    constructor(props) {
        super(props);

        // isOpen -> to determine if the modal is currently open or closed.
        // modalType -> Based on its value the content of the modal is rendered
        // githubReposCount -> Holds data retieved from the API call in ComponentDidMount (the Repo count of current item)
        this.state = {
            isOpen: false,
            modalType: "",
            githubReposCount: 0
        };
    }

    // Toggle the Modal to close and open
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    // When the TRASH icon of a review is clicked the modal is open with the content for the delete functionality.
    toggleDelete = () => {
        this.setState({
            modalType: "delete"
        });

        this.toggle();
    };

    // When the EDIT icon of a review is clicked the modal is open with the EditReviewForm in it.
    toggleEdit = () => {
        this.setState({
            modalType: "edit"
        });

        this.toggle();
    };

    // When the GITHUB icon is clicked it opens the modal with the content of RepostCount for the corresponding review.
    toggleGithub = () => {
        this.setState({
            modalType: "github"
        });

        this.toggle();
    };

    // Called when the delete modal's confirmation button is clicked. it triggers the deleteReview method in APP and passes
    // it the ID of the corresponding review item to deleted.
    deleteReview = e => {
        this.props.deleteReview(this.props.review._id);
        this.toggle();
    };

    // Called when the EditReviewForm inside the modal was submitted. It passes the data of the edited review to the
    // APP method editReview where the old review is updated.
    editReview = review => {
        this.props.editReview(review);
        this.toggle();
    };

    // Set modal header content based on the modal selected type.
    getModalHeader = modalType => {
        if (modalType === "delete") {
            return "Deleting Selected Item";
        } else if (modalType === "edit") {
            return "Editing Selected Review";
        } else if (modalType === "github") {
            return "Github Stats";
        } else {
            return "";
        }
    };

    // Set modal body content based on the modal selected type.
    getModalBody = modalType => {
        if (modalType === "delete") {
            return "Are you sure you want to delete?";
        } else if (modalType === "edit") {
            return (
                <EditReviewForm
                    review={this.props.review}
                    editReview={this.editReview}
                />
            );
        } else if (modalType === "github") {
            return `Total Repositories on Github for ${this.props.review.itemName} is ${this.state.githubReposCount}`;
        } else {
            return "";
        }
    };

    // Set modal footer content based on the modal selected type.
    getModalFooter = modalType => {
        if (modalType === "delete") {
            return (
                <Button color="danger" onClick={this.deleteReview}>
                    Delete
                </Button>
            );
        } else {
            return "";
        }
    };

    render() {
        // Get the modal content based on the modalType selected.
        const modalBody = this.getModalBody(this.state.modalType);
        const modalFooter = this.getModalFooter(this.state.modalType);
        const modalHeader = this.getModalHeader(this.state.modalType);

        return (
            <div>
                {/* Icons for triggering the modal to open with the content specific to different functionality */}
                <i className="fa fa-github fa-lg" onClick={this.toggleGithub} />
                <i
                    className="fa fa-trash fa-lg red"
                    onClick={this.toggleDelete}
                />
                <i
                    className="fa fa-edit fa-lg blue"
                    id="edit-icon"
                    onClick={this.toggleEdit}
                />
                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        {modalHeader}
                    </ModalHeader>
                    <ModalBody>{modalBody}</ModalBody>
                    <ModalFooter>
                        {modalFooter}{" "}
                        <Button color="secondary" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    // Get all repo count from github for the rendered review item and set the state.
    componentDidMount() {
        axios
            .get(
                `https://api.github.com/search/repositories?q=${this.props.review.itemName}`
            )
            .then(res =>
                this.setState({
                    githubReposCount: res.data.total_count
                })
            )
            .catch(err => console.log(err));
    }
}

export default ReviewModal;
