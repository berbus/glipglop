import React from 'react';

import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Icon } from './Icon';


export class IconButton extends React.Component {
    render () {
        return (
                <OverlayTrigger overlay={<Tooltip>{this.props.tooltip}</Tooltip>}>
                    <Button className="btn btn-primary" onClick={this.props.onClick}>
                        <Icon icon={this.props.icon} />
                    </Button>
                </OverlayTrigger>
        )}
}
