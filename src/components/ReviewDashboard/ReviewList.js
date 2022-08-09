import React from 'react';

import { connect } from 'react-redux';

import Review from './Review';
import NewReviewPopup from './NewReviewPopup';
import { getReviews } from '../../actions/review';
import { getServices } from '../../actions/service';

import { Loading } from '../Common';


class ReviewList extends React.Component {
    constructor (props) {
        super(props)
        const loaded = this.props.servicesLoaded && this.props.reviewsLoaded;
        this.state = {
            loaded: loaded
        }
    }

    componentDidMount () {
        if (!this.props.servicesLoaded) {
            this.props.getServices();
        }
        if (!this.props.reviewsLoaded) {
            this.props.getReviews();
        }
    }

    componentDidUpdate(prevProps) {
        if (!this.state.loaded && this.props.reviewsLoaded && this.props.servicesLoaded) {
            this.setState({'loaded': true});
        }
    }

    render () {
        return (
            <>
                {!this.state.loaded
                    ? <Loading />
                    : <>
                        <div className="row">
                            <NewReviewPopup
                                services={this.props.services}
                                templates={this.props.templates} 
                            />
                        </div>
                        <div className="row mt-4">
                            {this.props.reviews.length === 0 
                                ? <p>No reviews found</p>
                                : <ul className="list-group">
                                    {this.props.reviews.map(review => (
                                        <li className="list-group-item" key={review.oid}>
                                            <Review 
                                                id={review.oid} 
                                                key={review.oid} 
                                                title={review.title} 
                                                creation_date={review.creation_date}
                                                services={review.services.map(soid => (
                                                    review.service_names[soid]
                                                ))}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            }
                        </div>
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    reviews: state.ReviewReducer.reviews,
    reviewsLoaded: state.ReviewReducer.loaded,
    services: state.ServiceReducer.services,
    servicesLoaded: state.ServiceReducer.loaded,
    templates: state.TemplateReducer.templates,
    templatesLoaded: state.TemplateReducer.loaded
});

export default connect(mapStateToProps, { 
    getReviews, getServices
})(ReviewList);
