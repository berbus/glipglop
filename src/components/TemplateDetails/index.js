import React from 'react';

import { useParams } from 'react-router-dom';


import TemplateDetails from "./TemplateDetails";


export default function TemplateDetailsLoader () {
    return (
        <main className="container p-3">
            <TemplateDetails templateId={useParams().templateId} key={useParams().templateId}/>
        </main>
    );
}
