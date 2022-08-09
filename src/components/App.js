import React from 'react';

import { connect } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import {
    BrowserRouter,
    Routes,
    Route
} from 'react-router-dom';

import Dashboard from './Dashboard';
import ServiceDashboard from './ServiceDashboard';
import ServiceDetailsLoader from './ServiceDetails';
import ReviewDashboard from './ReviewDashboard';
import ReviewDetailsLoader from './ReviewDetails';
import TemplateDashboard from './TemplateDashboard';
import TemplateDetailsLoader from './TemplateDetails';
import SecurityTestDashboard from './SecurityTestDashboard';
import SecurityTestDetailsLoader from './SecurityTestDetails';
import ThreatModelDashboard from './ThreatModelDashboard';
import ThreatModelDetailsLoader from './ThreatModelDetails';
import Navbar from './Navbar';
import Settings from './Settings';


class App extends React.Component {
    render () {
        return (
            <>
                <Toaster />
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path='/services' element={<ServiceDashboard />} />
                        <Route path='/services/:serviceId' element={<ServiceDetailsLoader />} />
                        <Route path='/reviews/:reviewId' element={<ReviewDetailsLoader />} />
                        <Route path='/reviews' element={<ReviewDashboard />} />
                        <Route path='/templates/:templateId' element={<TemplateDetailsLoader />} />
                        <Route path='/templates' element={<TemplateDashboard />} />
                        <Route path='/settings' element={<Settings />} />
                        <Route path='/security-tests/:securityTestId' element={<SecurityTestDetailsLoader />} />
                        <Route path='/security-tests' element={<SecurityTestDashboard />} />
                        <Route path='/threat-models/:threatModelId' element={<ThreatModelDetailsLoader />} />
                        <Route path='/threat-models' element={<ThreatModelDashboard />} />
                        <Route path='/' element={<Dashboard />} />
                    </Routes>
                </BrowserRouter>
            </>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { })(App);
