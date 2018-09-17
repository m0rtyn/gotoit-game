import React, { Component } from "react";
import { DefaultClickSoundButton } from "../game/knowledge/sounds";

class Dialog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            //shwo,
        };
    }
    componentDidMount() {
        document.getElementById(this.props.id).showModal();
    }
    // shouldComponentUpdate() {
    //   return false;
    // }
    render() {
        return (
            <div>
                <DefaultClickSoundButton onClick={document.getElementById(this.props.id).close()}>Close</DefaultClickSoundButton>
                {this.props.children}
            </div>
        );
    }
}

export default Dialog;
