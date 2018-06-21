import React, { Component } from 'react';

import Office from './Header';
import People from './People';
import Projects from './Projects';
import PopupsNest from './PopupsNest';
import ToastNest from './ToastNest';

import ButtonToolbar from './ButtonToolbar.js';
import ContentContainer from './ContentContainer.js';

import {colors} from '../game/knowledge.js';

class Layout extends Component {
    render() {
        return (
            <div className="container-fluid">
                <div className="background-color" style={{backgroundColor: colors.backgrounds[this.props.data.content]}}></div>
                <div className="background-image" style={{backgroundImage: 'url(backgrounds/'+this.props.data.content+'.png)'}}></div>

                <Office data={this.props.data} />

                <div className="main-container app">
                    <div className="row">
                        <div className="col-3 people-column">
                            <People data={this.props.data}/>
                        </div>
                        <div className="col-6 main-column">
                            <ButtonToolbar data={this.props.data} />
                            <ContentContainer data={this.props.data} />
                        </div>
                        <div className="col-3 projects-column">
                            <Projects data={this.props.data}/>
                        </div>
                    </div>
                </div>

                <PopupsNest data={this.props.data} />
                
                <ToastNest data={this.props.data} />
            </div>
        );
    }
}

export default Layout;
