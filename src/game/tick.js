
import _ from 'lodash';

import {rules} from './rules';
import {achievements} from './achievements'

export function tick(state) {
    _.each(rules, (item) => {
        if (item.onTick) state = item.onTick.call(this, state);
    });

    _.each(achievements, (achievement, key) => {
        if (state.data.achieved[key]) return
        if (achievement.rule(state)) state.data.achieved[key] = true
    })

    return state;
}