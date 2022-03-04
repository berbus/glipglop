import React from 'react';

import { connect } from 'react-redux';

import { loadUserData, logout } from '../../actions/auth';

class AuthBar extends React.Component {
    componentDidMount () {
        if (!this.props.loaded && !this.props.loggedIn) {
            this.props.loadUserData();
        }
    }

    render() {
        return (
            <>
                {this.props.loggedIn
                    ? <>
                        <div className="text-white m-0">
                                {this.props.firstName}&nbsp;{this.props.lastName} ({this.props.username}) &nbsp;
                                <img src={this.props.profilePicture} alt="avatar" className="avatar" />  &nbsp;
                                <a href="#" className="link-light" onClick={this.props.logout}>Logout</a>
                        </div>
                    </>
                    : <>
                        <div className="row">
                            <div className="col-7"></div>
                            <div className="col-5">
                                <div id="g_id_onload"
                                    data-client_id="374530185068-80p56653ls8v4sjfumrfdne860ab5kcn.apps.googleusercontent.com"
                                    data-context="signin"
                                    data-ux_mode="redirect"
                                    data-login_uri="http://localhost:8000/api/user/login/"
                                    data-nonce=""
                                    data-auto_prompt="false">
                                </div>

                                <div className="g_id_signin"
                                    data-type="standard"
                                    data-shape="rectangular"
                                    data-theme="outlined"
                                    data-text="signin_with"
                                    data-size="large"
                                    data-width="260"
                                    data-logo_alignment="left">
                                </div>
                            </div>
                        </div>
                    </>
                }
            </>
        )};
};


const mapStateToProps = (state) => ({ 
    username: state.AuthReducer.username,
    firstName: state.AuthReducer.firstName,
    lastName: state.AuthReducer.lastName,
    profilePicture: state.AuthReducer.profilePicture,
    loggedIn: state.AuthReducer.loggedIn,
    authDataloaded: state.AuthReducer.loaded,
    authDataloading: state.AuthReducer.loading
});

export default connect(mapStateToProps, { loadUserData, logout })(AuthBar);

