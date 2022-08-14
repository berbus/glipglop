import React from 'react';

import { Modal } from 'react-bootstrap/';


export class NewItemPopup extends React.Component {
    constructor (props) {
        super(props)

        this.state = {
            visible: false
        }

        this.createAction = this.createAction.bind(this);
    }


    handleClick = () => {
        this.setState({'visible': !this.state.visible});
    };

    createAction () {
        this.props.createCallback();
        this.handleClick();
    }

    render() {
        return (
            <>
                <button className="btn btn-primary" onClick={this.handleClick}>
                    {this.props.title}
                </button>
                {(this.props.loaded === undefined || this.props.loaded) && 
                <div className="row">
                    <Modal show={this.state.visible} onHide={this.handleClick}>
                        <Modal.Header closeButton>
                            <Modal.Title>{this.props.title}</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form>
                                {this.props.children}
                            </form>
                        </Modal.Body>
                        <Modal.Footer>
                            <button className="btn btn-danger" onClick={this.handleClick}>
                                Cancel
                            </button>
                            <button className="btn btn-success" onClick={this.createAction}>
                                Create
                            </button>
                        </Modal.Footer>
                    </Modal>
                </div>
                }
            </>
        );
    }
}
