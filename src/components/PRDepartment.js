import React, { Component } from 'react';
import {colors, project_bars, public_relations} from "../game/knowledge";
import Bar from './Bar';

class PRDepartment extends Component {
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
                width : Math.min(100, data.rumor),
                color : colors.orange,
                value : Math.ceil((data.reputation)*100)/100,
                id: 'reputation'
            }
        ];

        return (
            <div className="card border text-center">
                <div className='flex-container-row'>
                    <div style={{ width: '50%', float: 'left', margin: '5px'}}>
                        <h5>Rumor</h5>
                        <Bar bar_data={rumor_bar} />
                    </div>
                    <div style={{ width: '50%', float: 'right', margin: '5px'}}>
                        <h5>Reputation</h5>

                        <Bar bar_data={reputation_bar} />
                    </div>
                </div>


                <div>
                    <div>
                        <button className="btn btn-info pr-button" onClick={
                            () => { public_relations['forum_thread'].onClick(data) }
                        } >{public_relations['forum_thread'].name}</button>
                    </div>
                    <div>
                        <button className={250 <= data.money ? "btn btn-info pr-button" : "btn btn-info disabled pr-button"} onClick={
                            () => {public_relations['search_specialist'].onClick(data)}
                        }>{public_relations['search_specialist'].name}</button>
                    </div>
                    <div>
                        <button className={100 <= data.money ? "btn btn-info pr-button" : "btn btn-info disabled pr-button"} onClick={
                            () => {public_relations['search_job'].onClick(data)}
                        }>{public_relations['search_job'].name}</button>
                    </div>
                    <div>
                        <button className={1000 <= data.money ? "btn btn-info pr-button" : "btn btn-info disabled pr-button"} onClick={
                            () => {public_relations['big_event'].onClick(data)}
                        }>{public_relations['big_event'].name}</button>
                    </div>

                </div>
            </div>
        );
    }
}

export default PRDepartment;