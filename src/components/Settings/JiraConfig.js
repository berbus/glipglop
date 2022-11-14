
import React from 'react';

import { connect } from 'react-redux';
import { Loading } from '../Common';

import { getJiraAuthStatus } from '../../actions/jiraAuth';


class JiraConfig extends React.Component {
    componentDidMount () {
        this.props.getJiraAuthStatus();
    }

    render () {
        return (
            <>
                {!this.props.loaded 
                    ? <Loading />
                    : <>
                        {this.props.userAuthenticated
                            ? <p>Jira authentication ok</p>
                            : <a href={this.props.jiraURL}>Go!</a>
                        }
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    userAuthenticated: state.JiraAuthReducer.authenticated,
    jiraURL: state.JiraAuthReducer.url,
    loaded: state.JiraAuthReducer.loaded
});
export default connect(mapStateToProps, {getJiraAuthStatus})(JiraConfig);
