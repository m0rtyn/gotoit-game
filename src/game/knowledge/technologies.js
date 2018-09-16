import overtime_sm from "../../assets/images/methodologies/sm/overtime.png";
import micromanage_sm from "../../assets/images/methodologies/sm/micromanagement.png";
import tdd_sm from "../../assets/images/methodologies/sm/test-driven-development.png";
import refactoring_sm from "../../assets/images/methodologies/sm/refactoring.png";
import creativity_sm from "../../assets/images/methodologies/sm/creativity-boost.png";
import rad_sm from "../../assets/images/methodologies/sm/rapid-development.png";
import motivation_sm from "../../assets/images/methodologies/sm/motivation.png";
import pair_sm from "../../assets/images/methodologies/sm/pair-programming.png";

export const technologies = {
    overtime: {
        name: "Overtime Work",
        acronym: "Over",
        price: 0,
        meeting: "fire",
        description: "It helps to finish project on time but exhausts your team.",
        img_sm: overtime_sm
    },
    micromanagement: {
        name: "Micromanagement",
        acronym: "Micro",
        price: 10000,
        meeting: "status",
        description: "Solid control is averaging performance and work visiting.",
        img_sm: micromanage_sm
    },
    tdd: {
        name: "Test Driven Development",
        acronym: "TDD",
        price: 10000,
        meeting: "test",
        description: "Developing tests reduce the probability of errors.",
        img_sm: tdd_sm
    },
    refactoring: {
        name: "Non-stop refactoring",
        acronym: "Ref",
        price: 10000,
        meeting: "review",
        description: "The complexity of the code - it's just a task for refactoring.",
        img_sm: refactoring_sm
    },
    creativity: {
        name: "Creativity boost",
        acronym: "Free",
        price: 0,
        meeting: "training",
        description: "Every fifth working hour is given to pet projects that boost experience.",
        img_sm: creativity_sm
    },
    rad: {
        name: "Rapid Development",
        acronym: "RAD",
        price: 10000,
        meeting: "planing",
        description: "Faster Development at the cost of increasing complexity.",
        img_sm: rad_sm
    },
    motivation: {
        name: "Team Motivation",
        acronym: "motive",
        price: 10000,
        meeting: "backlog",
        description: "The head of the company develop motivation of employees, spending part of their working time on this.",
        img_sm: motivation_sm
    },
    pair: {
        name: "Pair Programming",
        acronym: "Pair",
        price: 10000,
        meeting: "teambuilding",
        description: "Working in tandem allows us to solve complex problems and sharing experience.",
        img_sm: pair_sm
    }
};
