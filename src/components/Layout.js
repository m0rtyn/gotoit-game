import React, { Component } from 'react';

import Header from './Header';
import People from './People';
// import Timeline from './Timeline'
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

                <Header data={this.props.data} newGame={this.props.newGame}/>

                <div className="main-container">
                    <div className="row gap-1">
                        <div className="col-3 people-column">
                            <People data={this.props.data}/>
                        </div>
                        <div className="col-6 activity-column">
                            <div>
                                <ButtonToolbar data={this.props.data} />
                                <ContentContainer data={this.props.data} />
                            </div>
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
