import React from 'react';

import { connect } from 'react-redux';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

import { deleteReview } from '../../actions/review';


class Review extends React.Component {
    constructor (props) {
        super(props)

        this.deleteReview = this.deleteReview.bind(this);
    }

    deleteReview () {
        this.props.deleteReview(this.props.id);
    }

    render () {
        return (
            <article className="row">
                <div className="row">
                    <div className="col-9">
                        <h2>{this.props.title}</h2>
                    </div>
                    <div className="col-3">
                        <Link to={"/reviews/" + this.props.id}>
                            <button className="btn btn-primary mx-2">
                                <IconContext.Provider value={{ size: "1.5em" }}>
                                    <FaRegEdit />
                                </IconContext.Provider>
                            </button>
                        </Link>
                        <button className="btn btn-primary" onClick={this.deleteReview}> <IconContext.Provider value={{ size: "1.5em" }}>
                                <FaTrash />
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
                <div className="row py-0">
                    <p className="m-0">
                    {this.props.services.map(service => (
                        <span className="mr-1"> {service} </span>
                    ))}
                    </p>
                </div>
                <div className="row py-0">
                    <p className="m-0">{this.props.creation_date}</p>
                </div>
            </article>
        );
    }
}


const mapStateToProps = (state) => ({ })

export default connect(mapStateToProps, { deleteReview })(Review);
