import React from 'react';
import { Link } from 'react-router-dom';
import { Badge } from "react-bootstrap";


export class ServiceBadges extends React.Component {
    render () {
        return (
            <>
                {this.props.lineBreak ? <br/> : <>Service(s):</> }
                {Object.keys(this.props.services).map((idx) => (
                    <Link to={"/services/" + this.props.services[idx].oid}>
                        <Badge className="mx-1" bg="primary"> {this.props.services[idx].name}</Badge> {this.props.lineBreak && <br/>}
                    </Link>
                ))}
            </>
        )
    }
}
