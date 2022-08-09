import React from 'react';

import { connect } from 'react-redux';
import { FaRegEdit, FaTrash } from 'react-icons/fa';
import { IconContext } from 'react-icons';
import { Link } from 'react-router-dom';

import { deleteThreatModel } from '../../actions/threatModel';


class ThreatModel extends React.Component {
    constructor (props) {
        super(props)
        this.deleteThreatModel = this.deleteThreatModel.bind(this);
    }

    deleteThreatModel () {
        this.props.deleteThreatModel(this.props.id);
    }

    render () {
        return (
            <article className="row">
                <div className="row">
                    <div className="col-9">
                        <h2>{this.props.title}</h2>
                    </div>
                    <div className="col-3">
                        <Link to={"/threat-models/" + this.props.id}>
                            <button className="btn btn-primary mx-2">
                                <IconContext.Provider value={{ size: "1.5em" }}>
                                    <FaRegEdit />
                                </IconContext.Provider>
                            </button>
                        </Link>
                        <button className="btn btn-primary" onClick={this.deleteThreatModel}>
                            <IconContext.Provider value={{ size: "1.5em" }}>
                                <FaTrash />
                            </IconContext.Provider>
                        </button>
                    </div>
                </div>
                <div className="row py-0">
                    <div className="col-10">
                        <p className="m-0">{this.props.creation_date}</p>
                    </div>
                </div>
                <div className="row py-0">
                    <div className="col-10">
                        <p className="m-0">{this.props.completion_date 
                            ? this.props.completion_date
                            : <>In progress</>
                        }</p>
                    </div>
                </div>
            </article>
        );
    }
}


const mapStateToProps = (state) => ({ })

export default connect(mapStateToProps, { deleteThreatModel })(ThreatModel);
