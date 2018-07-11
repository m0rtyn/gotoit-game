import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import _ from 'lodash'
import ProjectEndScreen from '../ProjectEndScreen';
import HotOffer from "../HotOffer";
import SimpleModal from "../SimpleModal";
import Resume from "../Resume";
import Offer from '../Offer'

class Mail extends Component {
    constructor(props) {
        super(props);
        this.state = {
            current_popup: null,
            letters: null,
            show_popup: false
        }
    }
    closePopup = () => {
        this.setState({show_popup: false});
        console.log(this.state.show_popup)
    }


    render() {
        const data = this.props.data;

        const letters = _.map(data.mailbox, (letter, i) => {

            let button;
            switch(letter.type){
                case 'Project report':
                    button = <button onClick={ () => {
                        this.setState({current_popup: <ProjectEndScreen closePopup={this.closePopup} key={i} project={letter.content} data={this.props.data} />});
                        this.setState({show_popup: true});
                        letter.isRead = true;

                    }

                    }> Show </button>;
                    break;

                case 'Hot offer':
                    button = <button onClick={ () => {
                        this.setState({current_popup: <HotOffer closePopup={this.closePopup} key={i} project={letter.content} data={this.props.data}/>});
                        this.setState({show_popup: true});
                        letter.isRead = true;
                    }}>Show</button>;
                    break;
                case 'Resume':
                    button = <button onClick={ () => {
                        this.setState({current_popup: <Resume closePopup={this.closePopup} key={i} worker={letter.content} data={this.props.data}/>});
                        this.setState({show_popup: true});
                        letter.isRead = true;
                    }}>Show</button>;
                    break;
                case 'Offer':
                    button = <button onClick={ () => {
                        this.setState({current_popup: <Offer closePopup={this.closePopup} key={i} project={letter.content} data={this.props.data}/>});
                        this.setState({show_popup: true});
                        letter.isRead = true;
                    }}>Show</button>;
                    break;
            }
           return (
               <div>
                   {letter.type}
                   {letter.content.name}
                   {button}
                   {letter.isRead ? 'read' : ''}

               </div>
           )
        });
        return (
            <div>
                {letters}
                {
                    this.state.show_popup
                    ? <SimpleModal >
                        {this.state.current_popup}
                      </SimpleModal>
                    : <div/>
                }

            </div>
        );
    }
}

Mail.propTypes = {};

export default Mail;
