import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "react-bootstrap";


export class ItemBadges extends React.Component {
    constructor (props) {
        super(props)

        let path = null;
        let title = '';

        switch (this.props.type) {
            case 'service':
                path = '/services/'
                title = 'Service: '
                break;
            case 'tm':
                path = '/threat-models/'
                title = 'Threat model: '
                break;
            case 'st':
                path = '/security-tests/'
                title = 'Security test: '
                break;
            default:
                console.error(`Invalid type ${this.props.type} for ItemBadges`)
        }
        if (this.props.title) title = this.props.title

        this.state = {
            title: title,
            path: path
        }
    }

    render () {
        return (
            <>
                {this.props.lineBreak ? <br/> : <>{this.state.title}</> }
                {Object.keys(this.props.items).map((idx) => (
                    <>
                        <Link to={this.state.path + this.props.items[idx].oid} key={"itembadge-" + this.props.items[idx].oid}>
                            <Badge className="mx-1" bg="primary"> 
                                {this.props.items[idx].name || this.props.items[idx].title}
                            </Badge>
                        </Link>
                        {this.props.lineBreak && <br/>}
                    </>
                ))}
            </>
        )
    }
}
