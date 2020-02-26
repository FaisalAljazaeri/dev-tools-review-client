import React, { Component } from "react";
import axios from "axios";
import "./App.css";
import ReviewsContainer from "./components/ReviewsContainer";
import UserControls from "./components/UserControls";

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            reviews: []
        };
    }

    // Function to add a new Review to the list
    addReview = review => {
        axios
            .post("http://localhost:5000/api/reviews", review)
            .then(res => {
                this.setState({
                    reviews: [...this.state.reviews, res.data.review]
                });
            })
            .catch(err => console.log(err));
    };

    // Function responsible for toggling the isRecommended property of a selected review
    toggleRecommended = review => {
        const updatedReview = {
            ...review,
            isRecommended: !review.isRecommended
        };

        // Send the updated review to the backend API and update the state
        this.updateReview(updatedReview);
    };

    // Function that takes a modified and updates it
    editReview = updatedReview => {
        // Pass the updated review to the fucntion that will update the state and backend
        this.updateReview(updatedReview);
    };

    // Make a PATCH call to the server with an updated review and change the state to reflect changes
    updateReview = updatedReview => {
        axios
            .patch(`http://localhost:5000/api/reviews/${updatedReview._id}`, {
                review: updatedReview
            })
            .then(res => {
                const reviewsCopy = [...this.state.reviews];
                const indexOfReviewToUpdate = reviewsCopy.findIndex(
                    review => updatedReview._id === review._id
                );

                reviewsCopy.splice(indexOfReviewToUpdate, 1, res.data);

                this.setState({
                    reviews: reviewsCopy
                });
            })
            .catch(err => console.log(err));
    };

    // Function that makes a DELETE request to the server to delete all Reviews from DB
    deleteAllReviews = () => {
        axios
            .delete("http://localhost:5000/api/reviews")
            .then(res => {
                this.setState({
                    reviews: res.data
                });
            })
            .catch(err => console.log(err));
    };

    // Function that makes a DELETE request to the server to delete all Reviews that aren't recommended from DB
    deleteNotRecommendedReviews = () => {
        axios
            .delete("http://localhost:5000/api/reviews/notrecommended")
            .then(res => {
                this.setState({
                    reviews: res.data
                });
            })
            .catch(err => console.log(err));
    };

    // Function to delete a specific Review by id
    deleteReview = reviewId => {
        axios
            .delete(`http://localhost:5000/api/reviews/${reviewId}`)
            .then(res => {
                const newReviews = [...this.state.reviews].filter(
                    review => reviewId !== review._id
                );

                this.setState({
                    reviews: newReviews
                });
            });
    };

    render() {
        return (
            <div className="main-container">
                {/* Component Responsible for Modals used in: deleting all reviews, 
                delete not recommended reviews, and adding new reviews */}
                <UserControls
                    addReview={this.addReview}
                    deleteAllReviews={this.deleteAllReviews}
                    deleteNotRecommendedReviews={
                        this.deleteNotRecommendedReviews
                    }
                />

                {/* Component that contains all individual Review Components, it's passes an array of all reviews
                to map over and make each element a Review Component*/}
                <ReviewsContainer
                    reviews={this.state.reviews}
                    deleteReview={this.deleteReview}
                    toggleRecommended={this.toggleRecommended}
                    editReview={this.editReview}
                />
            </div>
        );
    }

    // MAKE a GET request to the server to retrieve all Reviews from the Database and populate the state
    componentDidMount() {
        axios
            .get("http://localhost:5000/api/reviews")
            .then(res => {
                this.setState({
                    reviews: res.data
                });
            })
            .catch(err => console.log(err));
    }
}

export default App;
