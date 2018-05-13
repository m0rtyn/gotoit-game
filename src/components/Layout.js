import React, { Component } from 'react';

import Office from './Header';
import People from './People';
import Projects from './Projects';
import Chat from './Chat';
import PopupsNest from './PopupsNest';
import ToastNest from './ToastNest';
import ProjectFind from './ProjectsFind';

import CentralContentContainer from './CentralContentContainer.js'

class Layout extends Component {
    render() {
        return (
            <div>
                <Office data={this.props.data} />
                <div className="App row slim-top">
                    <div className="col-md-3 slim">
                        <People data={this.props.data}/>
                    </div>
                    <div className="col-md-6 slim">
                        <CentralContentContainer data={this.props.data} />
                    </div>
                    <div className="col-md-3 slim">
                        <Projects data={this.props.data}/>
                    </div>
                </div>
                <PopupsNest data={this.props.data} />
                <ToastNest data={this.props.data} />
            </div>
        );
    }
}

export default Layout;
