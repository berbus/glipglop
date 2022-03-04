import React from 'react';

import { connect } from 'react-redux';

import Exercise from './Exercise';
import NewExercisePopup from './NewExercisePopup';
import { getExercises } from '../../actions/exercise';
import { getServices } from '../../actions/service';
import { getTemplates } from '../../actions/template';

import { Loading } from '../Common';


class ExerciseList extends React.Component {
    constructor (props) {
        super(props)
        const loaded = this.props.servicesLoaded && this.props.templatesLoaded && this.props.exercisesLoaded;
        this.state = {
            loaded: loaded
        }
    }

    componentDidMount () {
        if (!this.props.servicesLoaded) {
            this.props.getServices();
        }
        if (!this.props.templatesLoaded) {
            this.props.getTemplates();
        }
        if (!this.props.exercisesLoaded) {
            this.props.getExercises();
        }
    }

    componentDidUpdate(prevProps) {
        if (!this.state.loaded && this.props.exercisesLoaded && this.props.servicesLoaded && this.props.templatesLoaded) {
            this.setState({'loaded': true});
        }
    }

    render () {
        return (
            <>
                {!this.state.loaded
                    ? <Loading />
                    : <>
                        <div className="row">
                            <NewExercisePopup
                                services={this.props.services}
                                templates={this.props.templates} 
                            />
                        </div>
                        <div className="row mt-4">
                            {Object.keys(this.props.exercises).length === 0 
                                ? <p>No exercises found</p>
                                : <ul className="list-group">
                                    {this.props.exercises.map(exercise => (
                                        <li className="list-group-item" key={exercise.oid}>
                                            <Exercise 
                                                id={exercise.oid} 
                                                title={exercise.title} 
                                                creation_date={exercise.creation_date}
                                                template={exercise.template}
                                                service={this.props.services[exercise.service].name}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            }
                        </div>
                    </>
                }
            </>
        );
    }
}

const mapStateToProps = (state) => ({
    exercises: state.ExerciseReducer.exercises,
    exercisesLoaded: state.ExerciseReducer.loaded,
    services: state.ServiceReducer.services,
    servicesLoaded: state.ServiceReducer.loaded,
    templates: state.TemplateReducer.templates,
    templatesLoaded: state.TemplateReducer.loaded
});

export default connect(mapStateToProps, { 
    getExercises, getServices, getTemplates 
})(ExerciseList);
