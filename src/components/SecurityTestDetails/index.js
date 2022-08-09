import React from 'react';

import { useParams } from 'react-router-dom';

import SecurityTestDetails from './SecurityTestDetails';


export default function SecurityTestDetailsLoader () {
    return (
        <main className="container p-3">
            <SecurityTestDetails securityTestId={useParams().securityTestId} key={useParams().securityTestId}/>
        </main>
    );
}
