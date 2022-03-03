import React from 'react';

import { connect } from 'react-redux';

import Service from "./Service";
import { getServices } from '../../actions/service';
import NewServicePopup from "./NewServicePopup";
import Loading from "../Common/Loading";


class ServiceList extends React.Component {
    componentDidMount() {
        if (!this.props.servicesLoaded) {
            this.props.getServices();
        }
    }

    render () {
        return (
            <>
                {!this.props.servicesLoaded
                    ? <Loading />
                    : <>
                        <div className="row">
                            <NewServicePopup />
                        </div>
                        <div className="row mt-4">
                            {Object.keys(this.props.services).length === 0 
                                ? <p>No services found</p>
                                : <ul className="list-group">
                                    {Object.keys(this.props.services).map((oid, index) => ( 
                                        <li key={oid} className="list-group-item">
                                            <Service 
                                                id={oid} 
                                                name={this.props.services[oid].name} 
                                                status={this.props.services[oid].status} 
                                                creation_date={this.props.services[oid].creation_date}
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
    services: state.ServiceReducer.services,
    servicesLoaded: state.ServiceReducer.loaded
});

export default connect(mapStateToProps, { getServices })(ServiceList);
