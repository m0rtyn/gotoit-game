import { technologies } from "./technologies";
import { workers_bonus_items } from "./workers";

export const player_backgrounds = {
    //  autodidact: {name: 'Autodidact', money: 1000, start_tech: ['creativity'], text: 'Inspired researcher, looking own way. Eclectic stats.'},
    //  university: {name: 'Student', money: 5000, start_tech: ['tdd'], text: 'Fundamental education according to verified program. Flat stats.'},
    specialist: {
        name: "Specialist",
        money: 10000,
        might: "skill",
        start_tech: ["rad"],
        text: "Raised their professional skills and buy some stuff.",
        spices: {
            design: {
                name: "Designer",
                start_tech: [],
                description: "Start items: " + workers_bonus_items.design.exp.name + " and " + workers_bonus_items.design.flat.name
            },
            program: {
                name: "Programmer",
                start_tech: [],
                description: "Start items: " + workers_bonus_items.program.exp.name + " and " + workers_bonus_items.program.flat.name
            },
            manage: {
                name: "Manager",
                start_tech: [],
                description: "Start items: " + workers_bonus_items.manage.exp.name + " and " + workers_bonus_items.manage.flat.name
            }
        }
    },
    coworker: {
        name: "Startup founder & co",
        money: 10000,
        might: "team",
        start_tech: [],
        text: "Team player with co-worker.",
        spices: {
            pair: {
                name: technologies.pair.name,
                start_tech: ["pair"],
                description: technologies.pair.description
            },
            helper: {
                name: "Second co-worker",
                start_tech: [],
                description: "One more co-worker."
            },
            motivation: {
                name: technologies.motivation.name,
                start_tech: ["motivation"],
                description: technologies.motivation.description
            }
        }
    },
    businessman: {
        name: "Businessman",
        money: 10000,
        might: "investment",
        start_tech: [],
        text: "Made a fortune doing business.",
        spices: {
            cash: {
                name: "Cash reserves",
                start_tech: [],
                description: "You have accumulated a cash reserve and now ready to invest."
            },
            micromanagement: {
                name: technologies.micromanagement.name,
                start_tech: ["micromanagement"],
                description: technologies.micromanagement.description
            },
            manager: {
                name: "Manager",
                start_tech: [],
                description: "Previous work experience develop your management skills."
            }
        }
    }
};
