import React, { Component } from 'react';
import {colors, public_relations} from "../../game/knowledge";
import Bar from '../Bar';
import _ from 'lodash'

class Advertising extends Component {
    constructor(props) {
        super(props);
        this.state = {
            next_click_will_able_at: 0
        }
    }

    render() {
        const data = this.props.data;
        const rumor_bar = [
            {
                name : 'Rumor',
                width : Math.min(100, data.rumor),
                color : colors.blue,
                value : Math.ceil((data.rumor)*100)/100,
                id: 'rumor'
            }
        ];
        const reputation_bar = [
            {
                name : 'Reputation',
                width : Math.min(100, data.reputation),
                color : colors.orange,
                value : Math.ceil((data.reputation)*100)/100,
                id: 'reputation'
            }
        ];

        console.log(data.reputation)
        return (
            <div className="card border text-center">
                <div className='flex-container-row'>
                    <div style={{ width: '47%', float: 'left', margin: '5px'}}>
                        <h5>Rumor</h5>
                        <p>attracts new candidates to you </p>
                        <Bar bar_data={rumor_bar} />

                    </div>
                    <div style={{ width: '47%', float: 'right', margin: '5px'}}>
                        <h5>Reputation</h5>
                        <p>attracts new projects to you</p>
                        <Bar bar_data={reputation_bar} />
                    </div>
                </div>


                <div>
                    <div>
                        <button className="btn btn-info pr-button" onClick={
                            () => { public_relations['forum_thread'].onClick(data) }
                        } >{public_relations['forum_thread'].name + ' ' + (()=>{
                            let effect = _.find(data.on_tick_effects, (effect) => { return effect.type === 'forum_thread'});
                            return effect ? effect.click_count : 0;
                        })() }</button>

                    </div>
                    <div>
                        <button className={250 <= data.money ? "btn btn-info pr-button" : "btn btn-info disabled pr-button"} onClick={
                            () => {public_relations['search_specialist'].onClick(data)}
                        }>{public_relations['search_specialist'].name + ' ' + (()=>{
                            let effect = _.find(data.on_tick_effects, (effect) => { return effect.type === 'search_specialist'});
                            return effect ? effect.click_count : 0;
                        })()}</button>
                    </div>
                    <div>
                        <button className={100 <= data.money ? "btn btn-info pr-button" : "btn btn-info disabled pr-button"} onClick={
                            () => {public_relations['search_job'].onClick(data)}
                        }>{public_relations['search_job'].name + ' ' + (()=>{
                            let effect = _.find(data.on_tick_effects, (effect) => { return effect.type === 'search_job'});
                            return effect ? effect.click_count : 0;
                        })()}</button>
                    </div>
                    <div>
                        <button className={((1000 <= data.money) && (this.state.next_click_will_able_at < data.date.tick)) ? "btn btn-info pr-button" : "btn btn-info disabled pr-button"} onClick={
                            () => {
                                public_relations['big_event'].onClick(data);
                                this.setState({next_click_will_able_at: data.date.tick+24}); //only one click at day
                            }
                        }>{public_relations['big_event'].name + ' ' + (()=>{
                            let effect = _.find(data.on_tick_effects, (effect) => { return effect.type === 'big_event'});
                            return effect ? effect.click_count : 0;
                        })()}</button>
                    </div>

                </div>
            </div>
        );
    }
}

export default Advertising;