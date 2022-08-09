import React from 'react';

import { connect } from 'react-redux';

import SecurityTest from './SecurityTest';
import { getSecurityTests } from '../../actions/securityTest';
import { Loading } from '../Common';
import NewSecurityTestPopup from './NewSecurityTestPopup';


class SecurityTestList extends React.Component {
    componentDidMount() {
        if (!this.props.securityTestsLoaded) {
            this.props.getSecurityTests();
        }
    }

    render () {
        return (
            <>
                {!this.props.securityTestsLoaded
                    ? <Loading />
                    : <>
                        <div className="row">
                            <div className="col-8"></div>
                            <div className="col-4">
                                <NewSecurityTestPopup />
                            </div>
                        </div>
                        <div className="row mt-4">
                            {Object.keys(this.props.securityTests).length === 0 
                                ? <p>No security tests found</p>
                                : <ul className="list-group">
                                    {Object.keys(this.props.securityTests).map((oid, index) => ( 
                                        <li key={oid} className="list-group-item">
                                            <SecurityTest 
                                                id={oid} 
                                                title={this.props.securityTests[oid].title} 
                                                creation_date={this.props.securityTests[oid].creation_date}
                                                completion_date={this.props.securityTests[oid].completion_date}
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
    securityTests: state.SecurityTestReducer.security_tests,
    securityTestsLoaded: state.SecurityTestReducer.loaded
});

export default connect(mapStateToProps, { getSecurityTests })(SecurityTestList);
