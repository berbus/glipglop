import React from 'react';

import { useParams } from 'react-router-dom';

import ThreatModelDetails from './ThreatModelDetails';


export default function ThreatModelDetailsLoader () {
    return (
        <main className="container p-3">
            <ThreatModelDetails threatModelId={useParams().threatModelId}/>
        </main>
    );
}
