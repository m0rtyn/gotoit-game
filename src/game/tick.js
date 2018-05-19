
import _ from 'lodash';

import {rules} from './rules';

export const tick = (state) => {
    _.each(rules, (item) => {
        if (item.onTick) state = item.onTick(state);
    });

    return state;
};