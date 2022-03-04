import React from 'react';

import { useParams } from 'react-router-dom';

import ExerciseDetails from './ExerciseDetails';


export default function ExerciseDetailsLoader () {
    return (
        <main className="container p-3">
            <ExerciseDetails exerciseId={useParams().exerciseId}/>
        </main>
    );
}
