import React, { Component } from 'react';

import Office from './Header';
import People from './People';
import Projects from './Projects';
import PopupsNest from './PopupsNest';
import ToastNest from './ToastNest';

import ButtonToolbar from './ButtonToolbar.js'
import ContentContainer from './ContentContainer.js'

class Layout extends Component {
    render() {
        return (
            <div className="page-layout">
                <div className="background-image" style={{backgroundImage: 'url(backgrounds/'+this.props.data.content+'.png)'}}></div>
                <Office data={this.props.data} />
                <div className="App row slim-top">
                    <div className="col-md-3 slim">
                        <People data={this.props.data}/>
                    </div>
                    <div className="col-md-6 slim">
                        <ButtonToolbar data={this.props.data} />
                        <ContentContainer data={this.props.data} />
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
