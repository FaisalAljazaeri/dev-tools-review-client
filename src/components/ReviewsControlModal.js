import React from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import AddReviewForm from "./AddReviewForm";

// Nested Modal Component inside the UserControls Component. it contains functionality for
// Deleteing all Reviews, Deleteing all not recommended and Add new review.
function ReviewsControlModal(props) {
    // Triggered by submission of AddReviewForm. Calls the App with a new reviews to add to its list.
    const addReview = review => {
        props.addReview(review);
    };

    // Triggered by Delete ALL confirmation button. Calls the App method to delete all reviews.
    const deleteAllReviews = () => {
        props.deleteAllReviews();
        props.toggleAll();
    };

    // Triggered by Delete ALL Not Recommended confirmation button. Calls the App method to delete all not recommended reviews.
    const deleteNotRecommendedReviews = () => {
        props.deleteNotRecommendedReviews();
        props.toggleAll();
    };

    // Return appropriate Modal body content based on the selected action (Delete all, add review, or deleted not recommended reviews)
    const getBodyContent = modalType => {
        if (modalType === "add") {
            return (
                <AddReviewForm
                    createReview={addReview}
                    toggleAll={props.toggleAll}
                />
            );
        } else if (modalType === "deleteAll") {
            return <div>are you sure you want to delete all items?</div>;
        } else {
            return (
                <div>
                    are you sure you want to delete not recommended items?
                </div>
            );
        }
    };

    // Return appropriate Modal footer content based on the selected action (Delete all, add review, or deleted not recommended reviews)
    const getFooterContent = modalType => {
        if (modalType === "deleteNotRecommended") {
            return (
                <Button color="danger" onClick={deleteNotRecommendedReviews}>
                    Confirm
                </Button>
            );
        } else if (modalType === "deleteAll") {
            return (
                <Button color="danger" onClick={deleteAllReviews}>
                    Confirm
                </Button>
            );
        } else {
            return "";
        }
    };

    // Hold the content to be rendered for the Modal.
    const bodyContent = getBodyContent(props.modalType);
    const footerContent = getFooterContent(props.modalType);

    return (
        <Modal
            isOpen={props.nestedModal}
            toggle={props.toggleNested}
            onClosed={props.closeAll ? props.toggle : undefined}
        >
            <ModalHeader>Nested Modal title</ModalHeader>
            <ModalBody>{bodyContent}</ModalBody>
            <ModalFooter>
                {footerContent}{" "}
                <Button color="secondary" onClick={props.toggleNested}>
                    Cancel
                </Button>
            </ModalFooter>
        </Modal>
    );
}

export default ReviewsControlModal;
