
import _ from 'lodash';

import {rules} from './rules';

export function tick(state) {
    _.each(rules, (item) => {
        if (item.onTick) state = item.onTick.call(this, state);
    });

    return state;
}