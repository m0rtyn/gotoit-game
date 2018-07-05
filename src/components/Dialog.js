import React, { Component } from 'react';

class Dialog extends Component {
    constructor(props){
        super(props);
        this.state = {
            shwo
        }
    }
    componentDidMount(){
        document.getElementById(this.props.id).showModal()
    }

    render() {
        return (
            <div>
                <button onClick={document.getElementById(this.props.id).close()}>Close</button>
                {this.props.children}
            </div>
        );
    }
}

export default Dialog;
