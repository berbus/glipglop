import React from 'react';

import { connect } from 'react-redux';

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

    }

    componentDidUpdate(prevProps) {
        if (!this.state.loaded && this.props.serviceDetailsLoaded) {
            this.setState({'loaded': true})
        }
    }

    componentDidMount () {
        this.props.getServiceDetails(this.props.serviceId);
    }

    render () {
        return (
            <>
                {!this.state.loaded
                    ? <Loading />
                    : <>
                        <DetailsHeader title={this.props.serviceName} />
                        <div className="row my-3">
                            <div className="col-6">
                                <p>{this.props.serviceCreationDate}</p>
                                <p>{this.props.serviceStatus}</p>
                            </div>
                        </div>
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
});

export default connect(mapStateToProps, {
    getServiceDetails,
    clearServiceDetails,
    updateServiceDetails,
})(ServiceDetails);
