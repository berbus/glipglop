import React from 'react';

import { useParams } from 'react-router-dom';

import ReviewDetails from './ReviewDetails';


export default function ReviewDetailsLoader () {
    return (
        <main className="container p-3">
            <ReviewDetails reviewId={useParams().reviewId}/>
        </main>
    );
}
