import React from 'react';

import { useParams } from 'react-router-dom';


import ServiceDetails from './ServiceDetails';


export default function ServiceDetailsLoader () {
    return (
        <main className="container p-3">
            <ServiceDetails serviceId={useParams().serviceId}/>
        </main>
    );
}
