
import _ from 'lodash';

export const rules = {
    matrix_show: {onTick: (state) => { state.matrix_show = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15); return state; }},


};