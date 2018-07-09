import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import _ from 'lodash'
import ProjectEndScreen from '../ProjectEndScreen';

class Mail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            end_screen_project: null,
            letters: null
        }
    }


    render() {
        const data = this.props.data;
        const letters = _.map(data.projects_end_reports, (project) => {
            console.log(project);
           return (
               <div>
                   {project.name}
                   <button onClick={()=>{ this.setState({end_screen_project: project})}}> Show </button>
               </div>
           )
        });
        return (
            <div>
                {letters}
                <div>
                    {this.state.end_screen_project !== null ?
                        (() => {

                            return <ProjectEndScreen key={this.state.end_screen_project.id} project={this.state.end_screen_project} data={this.props.data} />
                        })()

                        : '' }
                </div>
            </div>
        );
    }
}

Mail.propTypes = {};

export default Mail;
