import React from 'react';

import { connect } from 'react-redux';
import { Badge, ListGroup } from 'react-bootstrap';

import { Loading, DetailsHeader } from '../Common';
import { 
    getServiceDetails,
    clearServiceDetails,
    updateServiceDetails
} from '../../actions/serviceDetails';



class ServiceDetails extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            loaded: this.props.serviceDetailsLoaded
        }

        this.getBgForStatus = this.getBgForStatus.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (!this.state.loaded && this.props.serviceDetailsLoaded) {
            this.setState({'loaded': true})
        }
    }

    componentDidMount () {
        this.props.getServiceDetails(this.props.serviceId);
    }

    getBgForStatus () {
        switch(this.props.serviceStatus) {
            case 'SIGNED_OFF':
                return 'success';
            case 'NOTIFICATION':
                return 'info';
            case 'THREAT_MODEL':
                return 'warning';
            case 'TESTING':
                return 'danger';
            default:
                return 'dark';
        }
    }

    render () {
        return (
            <>
                {!this.state.loaded
                    ? <Loading />
                    : <>
                        <DetailsHeader title={this.props.serviceName}>
                            <div className="row">
                                <div className="col-4">
                                    <p>Creation date: <span className="fw-bold">{this.props.serviceCreationDate}</span></p>
                                </div>
                                <div className="col-4">
                                    <p>Status:&nbsp; 
                                        <Badge bg={this.getBgForStatus()}>
                                            {this.props.serviceStatus}
                                        </Badge>
                                    </p>
                                </div>
                            </div>
                        </DetailsHeader>
                        <h2>Exercises</h2>
                        <ListGroup>
                            {this.props.serviceExercises.map( function(ex) {
                                return <>
                                    <ListGroup.Item key={ex.oid}>
                                        <div className="row">
                                            <div className="col-2">
                                                {ex.creation_date}
                                            </div>
                                            <div className="col-1">
                                                <Badge bg={ex.finished ? 'success' : 'danger'}>
                                                    {ex.finished ? <>Finished</> : <>In progress</>}
                                                </Badge>
                                            </div>
                                            <div className="col-5">
                                                {ex.title}
                                            </div>
                                            <div className="col-4">
                                                {ex.template_name}
                                            </div>
                                        </div>
                                    </ListGroup.Item>
                                </>
                            })}
                        </ListGroup>
                    </>
                }
            </>
        )
    }
}

const mapStateToProps = (state) => ({
    serviceName: state.ServiceDetailsReducer.name,
    serviceCreationDate: state.ServiceDetailsReducer.creationDate,
    serviceStatus: state.ServiceDetailsReducer.status,
    serviceDetailsLoaded: state.ServiceDetailsReducer.loaded,
    serviceExercises: state.ServiceDetailsReducer.exercises
});

export default connect(mapStateToProps, {
    getServiceDetails,
    clearServiceDetails,
    updateServiceDetails,
})(ServiceDetails);
