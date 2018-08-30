import _ from "lodash";

export const skills = { design: 0, program: 0, manage: 0 };
export const skills_1 = _.mapValues(skills, () => {
    return 1;
});
export const skills_inf = _.mapValues(skills, () => {
    return Number.POSITIVE_INFINITY;
});
export const skills_true = _.mapValues(skills, () => {
    return true;
});
export const skills_false = _.mapValues(skills, () => {
    return false;
});
export const skills_names = _.keys(skills);
