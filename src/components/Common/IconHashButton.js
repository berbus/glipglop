import React from 'react';

import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { NavHashLink } from 'react-router-hash-link';
import { Icon } from './Icon';


export class IconHashButton extends React.Component {
    render () {
        return (
            <OverlayTrigger overlay={<Tooltip>{this.props.tooltip}</Tooltip>}>
                <Button className="btn btn-primary">
                    <NavHashLink to={this.props.to} className="btn-link">
                        <Icon icon={this.props.icon} />
                    </NavHashLink>
                </Button>
            </OverlayTrigger>
        )}
}
