
import _ from 'lodash';

export const skills = {design: 0, program: 0, manage: 0};
export const skills_1 = _.mapValues(skills, () => { return 1; });
export const skills_true = _.mapValues(skills, () => { return true; });
export const skills_false = _.mapValues(skills, () => { return false; });
export const skills_names = _.keys(skills);


export const roles = {
    design: {name: 'Design', profession_name: 'Designer', description: 'Design'},
    program: {name: 'Programming', profession_name: 'Programmer', description: 'Programming'},
    manage: {name: 'Management', profession_name: 'Manager', description: 'Management'}
};

export const meetings = {
    fire: {name: 'Firefighting', deadline: 1, max_bonus: 4, description: 'Urgent overtime for several hours to solve a critical problem.'},
    test: {name: 'Mass Test', deadline: 8, max_bonus: 168, description: 'Mass testing will help to write tests twice often.'},
    review: {name: 'Code Review', deadline: 8, max_bonus: 168, description: 'Code Review will help to refactor twice often.'},
    backlog: {name: 'Backlog Grooming', deadline: 8, max_bonus: 168, description: 'Backlog grooming will help to retrospective twice often.'},

    training: {name: 'Internal Hakaton', deadline: 0, max_bonus: 0, description: 'An interesting educational project, tailored specifically for the development of your team\'s skills.'},
    planing: {name: 'Planing', deadline: 8, max_bonus: 168*2, description: 'Deep planning improves the tasks/bugs ratio.'},
    teambuilding: {name: 'Team Building', deadline: 8, max_bonus: 168*4, description: 'Team Building fills with the belief in the common cause and increases the motivation.'},
    status: {name: 'Status', deadline: 1, max_bonus: 12, description: 'Strict discipline and status meetings extend the working day.'}
};

export const technologies = {
    overtime: {name: 'Overtime Work', acronym: 'Over', price: 0, meeting: 'fire', description: 'Overtime helps to finish project on time but exhausts team.'},

    tdd: {name: 'Test Driven Development', acronym: 'TDD', price: 10000, meeting: 'test', description: 'Developing tests that reduce the probability of errors.'},
    refactoring: {name: 'Non-stop refactoring', acronym: 'Ref', price: 10000, meeting: 'review', description: "The complexity of the code - it's just a task for refactoring."},
    agile: {name: 'Agile Development', acronym: 'Agile', price: 10000, meeting: 'backlog', description: 'Focus on priority and lower the cost of the project by cutting out unnecessary tasks.'},

    creativity: {name: 'Creativity boost', acronym: 'Free', price: 0, meeting: 'training', description: "Every fifth working hour is given to pet projects that boost experience."},

    rad: {name: 'Rapid Development', acronym: 'RAD', price: 10000, meeting: 'planing', description: 'Faster Development at the cost of increasing complexity.'},
    pair: {name: 'Pair Programming', acronym: 'Pair', price: 10000, meeting: 'teambuilding', description: 'Working in tandem allows us to solve complex problems and sharing experience.'},
    micromanagement: {name: 'Micromanagement', acronym: 'Micro', price: 10000, meeting: 'status', description: 'Solid control is averaging performance and work visiting.'}
};

export const workers_bonus_items = {
    design: {
        exp: {name: 'Sketchbook', money: 500, bonus: 10, description: 'add 10% EXP'},
        flat: {name: 'Tablet', money: 2500, bonus: 1, description: 'add 10 to skill'},
        percent: {name: '4K Monitor', money: 10000, bonus: 10, description: 'add 10% to skill'}
    },
    program: {
        exp: {name: 'IDE', money: 500, bonus: 10, description: 'add 10% EXP'},
        flat: {name: 'Laptop', money: 2500, bonus: 1, description: 'add 10 to skill'},
        percent: {name: 'CI Server', money: 10000, bonus: 10, description: 'add 10% to skill'}
    },
    manage: {
        exp: {name: 'Phone', money: 500, bonus: 10, description: 'add 10% EXP'},
        flat: {name: 'Bug tracker', money: 2500, bonus: 1, description: 'add 10 to skill'},
        percent: {name: 'ERP System', money: 10000, bonus: 10, description: 'add 10% to skill'}
    }
};

export const player_backgrounds = {
    //  autodidact: {name: 'Autodidact', money: 1000, start_tech: ['creativity'], text: 'Inspired researcher, looking own way. Eclectic stats.'},
    //  university: {name: 'Student', money: 5000, start_tech: ['tdd'], text: 'Fundamental education according to verified program. Flat stats.'},
    technologist: {name: 'Technologist', money: 5000, might: 'technology', start_tech: [], text: 'Has a wide range of start technology.', spices: {
        agile: {name: 'Agile Development', description: technologies.agile.description},
        tdd: {name: 'TDD', description: technologies.tdd.description},
        refactoring: {name: 'Refactoring', description: technologies.refactoring.description}
    }},
    specialist: {name: 'Specialist', money: 5000, might: 'skill', start_tech: ['rad'], text: 'Raised their professional skills to enormous heights and buy some professional stuff.', spices: {
        design: {name: 'Designer', description: "Start items: "+workers_bonus_items.design.exp.name+" and "+workers_bonus_items.design.flat.name},
        program: {name: 'Programmer', description: "Start items: "+workers_bonus_items.program.exp.name+" and "+workers_bonus_items.program.flat.name},
        manage: {name: 'Manager', description: "Start items: "+workers_bonus_items.manage.exp.name+" and "+workers_bonus_items.manage.flat.name}
    }},
    coworker: {name: 'Teamplayer', money: 5000, might: 'team',  start_tech: ['pair'], text: 'An experienced team player.', spices: {
        apprentice: {name: 'Apprentice', description: 'Your partner is your follower and like you in skills.'},
        helpers: {name: 'Two helpers', description: 'Your team is two reliable helpers that support your skills.'},
        full: {name: 'Full team', description: 'Your team is three random employees.'}
    }},
    businessman: {name: 'Businessman', money: 5000, might: 'investment',  start_tech: ['micromanagement'], text: 'Made a fortune doing business.', spices: {
        credit: {name: 'Credit Rating', description: 'Good credit story increase your credit rating and allow to take addition credit.'},
        btc: {name: 'BTC savings', description: 'Once you bought some bitcoins. Now they are worth a lot.'},
        office: {name: 'Dream office', description: 'You rented a spacious office and bought a coffeemaker. What\'s next?'}
    }}
};

export const offices = {
    1: {size: 1, space: 1, price: 0,     name: 'Sweet Home', text: ''},
    2: {size: 2, space: 4, price: 500,   name: 'Garage Startup', text: ''},
    3: {size: 3, space: 7, price: 2500,  name: 'Busy Header', text: ''},
    4: {size: 4, space: 10, price: 10000, name: 'AAA Studio', text: ''}
};

export const project_platforms = {
    crossplatform: {name: 'Cross-platform'},
    mobile: {name: 'Mobile'},
    browser: {name: 'Browser'},
    desktop: {name: 'Desktop'}
};

export const project_kinds = {
    application: {name: 'Application'},
    game: {name: 'Game'},
    site: {name: 'Site'},
    editor: {name: 'Editor'},
    magazine: {name: 'Magazine'},
    service: {name: 'Service'},
    database: {name: 'Database'}
};

export const project_sizes = {
    0: {name: 'Training', alone_name: 'Training', agency_min: 0,  agency_max: 0},
    1: {name: 'Parts for', alone_name: 'Part', agency_min: 0,  agency_max: 500},
    2: {name: 'Module for', alone_name: 'Module', agency_min: 50,  agency_max: 1000},
    3: {name: 'The', alone_name: 'Application', agency_min: 100,  agency_max: 2500},
    4: {name: 'Big', alone_name: 'Big Deal', agency_min: 1000,  agency_max: 10000},
    5: {name: 'Custom', alone_name: 'Custom', agency_min: 0,  agency_max: 0},
    6: {name: 'Hackathon', alone_name: 'Hackathon', agency_min: 0,  agency_max: 0},
};

export const loans = {
    1: {size: 1, money: 5000, interest: 30, time: 3, open_after_tick: 24*30, min_credit_score: 300, name: 'Small Credit', text: ''},
    2: {size: 2, money: 10000, interest: 20, time: 6, open_after_tick: 24*30*6, min_credit_score: 500, name: 'Medium Credit', text: ''},
    3: {size: 3, money: 25000, interest: 10, time: 12, open_after_tick: 24*30*12, min_credit_score: 700, name: 'Big Credit', text: ''},
};


export const education = { // hm...
    training: {name: 'Training Project', hide: false, description: ''},
    hackathon: {name: 'Hackathon', hide: true, description: ''},
    university: {name: 'University', hide: true, description: ''},
    workshop: {name: 'Workshop', hide: true, description: ''}
};

export default {};
