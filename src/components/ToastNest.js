import React, { Component } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { chatMessage } from "./Chat";

export var addMessage = text => {
    console.log(text);
};
export var addAction = text => {
    console.log(text);
};

/***
 * Short info:
 * types: 'success', 'warning', 'error', 'info'
 */

class ToastNest extends Component {
    constructor(props) {
        super(props);
        this.addMessage = this.addMessage.bind(this);
        this.clearMessages = this.clearMessages.bind(this);
        this.addAction = this.addAction.bind(this);
        this.clearActions = this.clearActions.bind(this);
    }

    clearMessages() {
        this.refs.messages.clear();
    }

    addMessage(text, options, type = "info") {
        chatMessage("", text, type);
        toast.info(text, {
            position: toast.POSITION.BOTTOM_LEFT
        });
    }

    clearActions() {
        this.refs.actions.clear();
    }

    addAction(text, options, type = "info") {
        toast.info(text, {
            position: toast.POSITION.BOTTOM_RIGHT
        });
    }

    componentDidMount() {
        addMessage = this.addMessage;
        this.props.data.helpers.addMessage = this.addMessage;
        addAction = this.addAction;
        this.props.data.helpers.addAction = this.addAction;
    }

    render() {
        return (
            <div className="toast-nest">
                <ToastContainer
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnVisibilityChange
                    draggable
                    pauseOnHover
                />
                {/* Same as */}
                <ToastContainer />
            </div>
        );
    }
}

export default ToastNest;
