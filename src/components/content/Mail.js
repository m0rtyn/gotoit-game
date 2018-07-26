import React, {Component} from 'react';
//import PropTypes from 'prop-types';
import _ from 'lodash'
import ProjectEndScreen from '../ProjectEndScreen';
import HotOffer from "../HotOffer";
import SimpleModal from "../SimpleModal";
import Resume from "../Resume";
import Offer from '../Offer';
import {FormattedDate} from 'react-intl';

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
    markAllAsRead = () => {
        console.log(this.props.data.mailbox);
        _.map(this.props.data.mailbox, (letter) => {
            letter.isRead = true;
        });
    };


    render() {
        const data = this.props.data;
        const inverted_mailbox = (()=>{
            let array = [];
            for (let i = data.mailbox.length-1; i>=0; i--){
                array.push(data.mailbox[i]);
            }
            return array;
        })();
        let handleClick;
        const letters = _.map(inverted_mailbox, (letter, i) => {
            let button;
            switch(letter.type){
                case 'Project report':
                    handleClick = () => {
                        this.setState({current_popup: <ProjectEndScreen closePopup={this.closePopup} key={i} project={letter.content} data={this.props.data} />});
                        this.setState({show_popup: true});
                        letter.isRead = true;

                    };
                    break;

                case 'Hot offer':
                    handleClick = () => {
                        this.setState({current_popup: <HotOffer closePopup={this.closePopup} key={i} project={letter.content} data={this.props.data}/>});
                        this.setState({show_popup: true});
                        letter.isRead = true;
                    };
                    break;
                case 'Resume':
                    handleClick = () => {
                        this.setState({current_popup: <Resume closePopup={this.closePopup} key={i} worker={letter.content} data={this.props.data}/>});
                        this.setState({show_popup: true});
                        letter.isRead = true;
                    };
                    break;
                case 'Offer':
                     handleClick = () => {
                         this.setState({
                             current_popup: <Offer closePopup={this.closePopup} key={i} project={letter.content}
                                                   data={this.props.data}/>
                         });
                         this.setState({show_popup: true});
                         letter.isRead = true;
                     };
                    break;
            }

           return (
               <div className='mail-letter' onClick={handleClick}>
                   {
                       letter.type === 'Resume'
                           ? <div className='letter-icon'>
                               <img
                                   className='worker-avatar'

                                   alt={letter.content.name + ' avatar'}
                                   src={letter.content.avatar}
                               />
                           </div>
                           : <div className='letter-icon'>
                               <img
                                   style={{ position: 'absolute'}}
                                   width={70}//without this img will be only 50px despite container is 70px
                                   height={70}
                                   alt={letter.content.name + ' avatar'}
                                   src={letter.content.avatar.platform}
                               />
                               <img
                                   style={{ position: 'absolute'}}
                                   width={70}
                                   height={70}
                                   alt={letter.content.name + ' avatar'}
                                   src={letter.content.avatar.kind}
                               />
                           </div>
                   }
                   <div className='letter-description'>
                       {
                           letter.isRead
                           ? <h4>{letter.type}</h4>
                           : <h4 style={{fontWeight: 'bold'}}>{letter.type}</h4>
                       }

                       <p>{letter.content.name}</p>
                   </div>
                   {letter.isRead ? 'read' : ''}

                   <FormattedDate
                       value={letter.date}
                       weekday="short"
                       day="numeric"
                       month="short"
                       year="numeric"
                       hour="numeric"
                   />

               </div>
           )
        });
        return (
            <div>
                <button style={{ float: 'right' }} onClick = { this.markAllAsRead }>Mark all as read</button>
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
