import React from 'react';

import { connect } from 'react-redux';
import { Toaster } from 'react-hot-toast';

import {
    BrowserRouter,
    Routes,
    Route
} from "react-router-dom";

import Dashboard from "./Dashboard";
import ServiceDashboard from "./ServiceDashboard";
import ServiceDetailsLoader from "./ServiceDetails";
import ExerciseDashboard from "./ExerciseDashboard";
import ExerciseDetailsLoader from "./ExerciseDetails";
import TemplateDashboard from "./TemplateDashboard";
import TemplateDetailsLoader from "./TemplateDetails";
import Navbar from "./Navbar";
import Settings from "./Settings";


class App extends React.Component {
    render () {
        return (
            <>
                <Toaster />
                <BrowserRouter>
                    <Navbar />
                    <Routes>
                        <Route path="/services" element={<ServiceDashboard />} />
                        <Route path="/services/:serviceId" element={<ServiceDetailsLoader />} />
                        <Route path="/exercises/:exerciseId" element={<ExerciseDetailsLoader />} />
                        <Route path="/exercises" element={<ExerciseDashboard />} />
                        <Route path="/templates/:templateId" element={<TemplateDetailsLoader />} />
                        <Route path="/templates" element={<TemplateDashboard />} />
                        <Route path="/settings" element={<Settings />} />
                        <Route path="/" element={<Dashboard />} />
                    </Routes>
                </BrowserRouter>
            </>
        )
    }
}

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, { })(App);
