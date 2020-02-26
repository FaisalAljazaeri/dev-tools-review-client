import React, { Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./UserControls.css";
import ReviewsControlModal from "./ReviewsControlModal";

// Modal Comonent that has three buttons(add review, delete all reviews, delete not recommended reviews)
// each one of the buttons opens a nested modal with the content that is required to acheive the specific action.
class UserControls extends Component {
    constructor(props) {
        super(props);

        // State to control the open/closed state of this modal and its nested modal. as well as determine the
        // type of the nested modal content ("add", "deleteAll", "deletedNotRecommended").
        this.state = {
            isOpen: false,
            nestedModal: false,
            closeAll: false,
            nestedModalType: ""
        };
    }

    // Toggle the modal open/close.
    toggle = () => {
        this.setState({
            isOpen: !this.state.isOpen
        });
    };

    // Toggle the nested modal open/close.
    toggleNested = () => {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: false
        });
    };

    // Toggle both modals open/close.
    toggleAll = () => {
        this.setState({
            nestedModal: !this.state.nestedModal,
            closeAll: true
        });
    };

    // When the Add review button is clicked set the state modal type and open the nested modal.
    toggleAddReview = () => {
        this.toggleNested();
        this.setState({
            nestedModalType: "add"
        });
    };

    // pass the new review to the App component to add it to the list.
    addReview = review => {
        this.props.addReview(review);
    };

    // When the Delete All Reviews button is clicked set the state modal type and open the nested modal.
    toggleDeleteAllReviews = () => {
        this.toggleNested();
        this.setState({
            nestedModalType: "deleteAll"
        });
    };

    // Call the App method to delete all Reviews in the list.
    deleteAllReviews = () => {
        this.props.deleteAllReviews();
    };

    // When the Delete Not Recommended Reviews button is clicked set the state modal type and open the nested modal.
    toggleDeleteNotRecommendedReviews = () => {
        this.toggleNested();
        this.setState({
            nestedModalType: "deleteNotRecommended"
        });
    };

    // Call the App method to Delete All Not Recommended Reviews.
    deleteNotRecommendedReviews = () => {
        this.props.deleteNotRecommendedReviews();
    };

    render() {
        return (
            <div>
                <i
                    id="action-btn"
                    className="fa fa-cog fa-2x"
                    onClick={this.toggle}
                />

                <Modal isOpen={this.state.isOpen} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>
                        Select an Action to Perform
                    </ModalHeader>
                    <ModalBody>
                        <div className="modal-buttons">
                            <Button
                                color="success"
                                onClick={this.toggleAddReview}
                            >
                                Add Review
                            </Button>
                            <Button
                                color="secondary"
                                onClick={this.toggleDeleteNotRecommendedReviews}
                            >
                                Delete All Not Recommended Reviews
                            </Button>
                            <Button
                                color="danger"
                                onClick={this.toggleDeleteAllReviews}
                            >
                                Delete All Reviews
                            </Button>
                        </div>
                        <ReviewsControlModal
                            addReview={this.addReview}
                            deleteAllReviews={this.deleteAllReviews}
                            deleteNotRecommendedReviews={
                                this.deleteNotRecommendedReviews
                            }
                            modalType={this.state.nestedModalType}
                            nestedModal={this.state.nestedModal}
                            toggle={this.toggle}
                            toggleNested={this.toggleNested}
                            toggleAll={this.toggleAll}
                            closeAll={this.state.closeAll}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}
export default UserControls;
