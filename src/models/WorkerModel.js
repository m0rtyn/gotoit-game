import _ from "lodash";

import { chatMessage } from "../components/Chat";

import bulkStyler from "../services/bulkStyler";
import { meetings } from "../game/knowledge/meetings";
import { worker_character_types, workers_bonus_items } from "../game/knowledge/workers";
import { skills, skills_1 } from "../game/knowledge/skills";

import { addAction } from "../components/ToastNest";

import Narrator from "../services/Narrator";
import ValueCache from "../services/ValueCache";

import { getData } from "../App";

import { generateFemaleAvatar, generateMaleAvatar } from "../game/knowledge/worker_avatar";

class WorkerModel {
    constructor(name = "Default", stats = skills_1, gender = "male", is_player = false) {
        this.id = is_player ? "player" : _.uniqueId("worker") + "_" + _.random(100000000, 999999999);
        this.name = name;
        this.gender = gender;
        this.stats = stats;
        this.is_player = is_player;
        this.expirience = JSON.parse(JSON.stringify(skills));
        this.standing = 0;
        this.standing_after_salary_rising = 0;
        this.morale = 100;
        this.accept_default = true;
        this.avatar = gender === "male" ? generateMaleAvatar() : generateFemaleAvatar();
        this.hired = false;

        this.temper = {
            earliness: _.random(0, 4),
            variability: _.random(0, 4)
        };

        this.character = worker_character_types[_.random(0, 4)];
        this.salary_coefficient = this.character.name === "Workaholic" ? -15 : this.character.name === "Modest" ? 20 : 0;
        this.thirst_to_knowledge_coefficient = this.character.name === "Gifted" ? 0.75 : this.character.name === "Wonk" ? 1.25 : 1;

        this.feelings = new ValueCache(24, () => {
            return Narrator.workerFeelings(this);
        });

        this.efficiency = new ValueCache(24, () => {
            return this.calcEfficiencyReal();
        });

        this.stamina = 5000;
        this.salary = this.getSalary();
        this.get_monthly_salary = true;
        this.to_vacation_ticker = 0;
        this.to_vacation = false;
        this.in_vacation_ticker = 0;
        this.in_vacation = false;
        this.to_leave_ticker = 0;
        this.to_leave = false;

        this.items = JSON.parse(JSON.stringify(skills));
        _.forEach(this.items, (val, key) => {
            this.items[key] = { exp: false, flat: false, percent: false };
        });

        this.fed_ticker = 0;

        this.facts = {
            project_finished: 0,
            tick_hired: 0,
            prev_salary_payment_tick: 0,
            money_earned: 0,
            tasks_done: 0,
            training_tasks_done: 0,
            bugs_passed: 0,
            refactored: 0,
            tests_wrote: 0
        };

        this.motivation_pull = 0;

        this.effects = {};
    }

    tick() {
        // effects gone
        _.each(this.effects, (effect_value, effect) => {
            if (this.effects[effect] > 0) this.effects[effect]--;
        });

        // hunger
        if (this.fed_ticker > 0) this.fed_ticker--;
    }

    statsSum() {
        return _.sum(_.values(this.stats));
    }

    drainStamina() {
        this.stamina--;
        //   console.log(this.stamina);
    }

    proposeVacation() {
        this.to_vacation = true;
        this.to_vacation_ticker = 24 * 7 * 2; // 2 weeks
        addAction(
            this.name + " leaves on vacation in two weeks",
            {
                timeOut: 10000,
                extendedTimeOut: 5000
            },
            "error"
        );
    }

    sendToVacation(long) {
        this.to_vacation = false;
        this.in_vacation = true;
        this.in_vacation_ticker = 24 * 7 * long; // long weeks
        addAction(
            this.name + " leaves on a " + long + " week vacation now",
            {
                timeOut: 15000,
                extendedTimeOut: 8000
            },
            "error"
        );
    }

    tellFeelings() {
        if (!this.feelings.get)
            this.feelings = new ValueCache(24, () => {
                return Narrator.workerFeelings(this);
            });
        return this.feelings.get();
    }

    getSalary() {
        if (this.is_player) {
            return 0;
        } else {
            //    console.log("standing " + this.standing + " means " + (1 + (this.standing/(12*4*7*8*Math.PI))));
            return Math.floor((this.statsSum() + _.max(_.values(this.stats))) * (1 + this.getOverrate() / 100) * 160);
        }
    }

    isWorkingTime(time, micromanagement, motivation, office_things) {
        let variability = _.random(-this.temper.variability, this.temper.variability);
        let mod = variability + this.temper.earliness;
        let character_working_mod = this.character.name === "Workaholic" ? -2 : this.character.name === "Wonk" ? 2 : 0;

        //let office_things_bonus = (office_things.coffeemaker ? 10 : 0) + (office_things.lanch ? 25 : 0 ) + office_things.gadget;

        let is_working_time =
            time.hour >= 9 + (office_things.coffeemaker ? -1 : 0) + mod + character_working_mod &&
            time.hour <= 17 + (this.fed_ticker > 1 ? 2 : 0) + (this.effects["status"] > 0 ? 3 : 0) + mod &&
            ((time.day !== 6 && time.day !== 0) ||
                _.random(1, 20 - this.temper.variability * 3) === 1 ||
                _.random(1, this.effects["teambuilding"]) > 100) && // variability guys work on weekends more often
            _.random(1, 10 - this.temper.variability * 0.5) !== 1; // variability guys eblanyat more often

        return this.efficiencyCheck(micromanagement, motivation) ? is_working_time : false;
    }

    efficiencyCheck(micromanagement, motivation) {
        return (
            _.random(1, 200) <=
            Math.floor(this.stamina / 50) +
                (micromanagement ? Math.floor((this.getEfficiency() + 80) / 2) : this.getEfficiency()) +
                (motivation ? this.motivation_pull : 0)
        );
    }

    getEfficiency() {
        //   if (getData().date.tick < 10) return 100;

        let efficiency = this.calcEfficiency();

        /*
        if (((getData().date.tick - this.facts.tick_hired)/24) < 30) return 100;
        if (((getData().date.tick - this.facts.tick_hired)/24) < 100) return Math.floor((efficiency + 100) / 2);
        */

        // smooth first 14 days
        //   if (((getData().date.tick - this.facts.tick_hired)/24) < 14) return Math.floor((efficiency + 100) / 2);

        return efficiency;
    }

    staminaPenalty() {
        const stamina_factor = this.stamina / (1000 / 10);
        return Math.max(Math.min(Math.floor(stamina_factor), 10), -10);
    }

    workloadPenalty() {
        const task_preferred = Math.ceil((getData().date.tick - this.facts.tick_hired) / 24) * 3;
        const tasks_stream = Math.max(
            Math.min(Math.floor(20 * (1 - (200 + task_preferred) / (200 + (this.facts.tasks_done - this.facts.training_tasks_done)))), 20),
            -20
        );
        const overloaded = Math.floor((100 - this.morale) / 5);
        //   console.log('Workload: ' + tasks_stream + ' ' + overloaded);
        return Math.abs(tasks_stream) > overloaded ? tasks_stream : overloaded;
        // return Math.max(Math.abs(Math.max(Math.min(Math.floor(tasks_stream), 20), -20)), Math.abs(Math.floor(overloaded)));
    }

    difficultyPenalty() {
        let difficulty_ratio = (200 + this.facts.bugs_passed * 2) / (200 + this.facts.tasks_done);
        let thirst_for_difficulty = (100 + _.max(_.values(this.stats))) / (100 + this.statsSum() / 4);
        // console.log(difficulty_ratio, thirst_for_difficulty);
        const difficulty_stream = 20 * (1 - difficulty_ratio / thirst_for_difficulty);
        return Math.max(Math.min(Math.floor(difficulty_stream), 20), -20);

        //   const tasks_difficulty = Math.min(20, 20 * (1-((200+(this.facts.bugs_passed * Math.PI)) / ((200+(this.facts.tasks_done))))));
        //   return Math.max(Math.min(Math.floor(tasks_difficulty), 20), -20);
    }

    educationPenalty() {
        let knowledge_ratio = (200 + this.facts.training_tasks_done * 4) / (200 + this.facts.tasks_done);
        let thirst_for_knowledge =
            ((100 + this.statsSum() / 4) / (100 + _.max(_.values(this.stats)))) * this.thirst_to_knowledge_coefficient;
        // console.log(knowledge_ratio, thirst_for_knowledge);
        const education_stream = 20 * (1 - knowledge_ratio / thirst_for_knowledge);
        return Math.max(Math.min(Math.floor(education_stream), 20), -20);
    }

    collectivePenalty() {
        let collective_sum = 0;
        getData().workers.forEach(worker => {
            //console.log(collective_sum, worker.statsSum(), worker);
            collective_sum += worker.statsSum();
        });
        const collective_avg = collective_sum / getData().workers.length;
        const collective = 20 * (1 - (10 + collective_avg) / (10 + this.statsSum()));
        return Math.max(Math.min(Math.floor(collective), 20), -20);
        //console.log(collective_sum, getData().workers.length, collective_avg, this.statsSum(), collective);
    }

    getOverrate() {
        return ((1 + this.standing / (24 * 7 * (59.524 + this.salary_coefficient))) * 100 - 100).toFixed(2);
    }

    getMotivate() {
        return Math.sqrt(this.standing_after_salary_rising) / Math.PI + this.effects["teambuilding"] > 0
            ? Math.floor(2 * Math.log(this.effects["teambuilding"]))
            : 0;
    }

    calcEfficiency() {
        // happiness
        if (!this.efficiency.get)
            this.efficiency = new ValueCache(24, () => {
                return this.calcEfficiencyReal();
            });
        // return this.calcEfficiencyReal();
        return this.efficiency.get();
    }
    calcEfficiencyReal() {
        // happinessReal
        //  const stamina = this.staminaPenalty();
        const tasks_stream = this.workloadPenalty();
        const tasks_difficulty = this.difficultyPenalty();
        const education_stream = this.educationPenalty();
        const collective = this.collectivePenalty();

        const happiness =
            20 +
            +Math.floor(this.getOverrate() / 10) +
            this.getMotivate() +
            getData().office_things.gadget +
            //   + (10 - Math.abs(stamina))
            (20 - Math.abs(tasks_stream)) +
            (20 - Math.abs(tasks_difficulty)) +
            (20 - Math.abs(education_stream)) +
            (20 - Math.abs(collective));

        // console.log(Math.floor(this.getOverrate() / 10));
        //console.log(happiness);
        //console.log(tasks_stream, tasks_difficulty, education_stream, collective);

        if (isNaN(happiness)) {
            console.log(happiness);
            console.log(tasks_stream, tasks_difficulty, education_stream, collective);
            console.log(this.getOverrate(), this.getMotivate(), getData().office_things.gadget);
        }

        return this.get_monthly_salary === false ? Math.ceil(happiness / 2) : Math.ceil(happiness);

        //return 100;
    }
    getEfficiencyArray() {
        // happinessReal
        let salary_mod = this.get_monthly_salary === false ? 0.5 : 1;

        //  const stamina = this.staminaPenalty();
        const tasks_stream = this.workloadPenalty();
        const tasks_difficulty = this.difficultyPenalty();
        const education_stream = this.educationPenalty();
        const collective = this.collectivePenalty();
        let happiness_array = {
            happiness_const: {
                name: "Happiness const",
                value: salary_mod * 20
            },
            overrate: {
                name: "Overrate",
                value: salary_mod * Math.floor(this.getOverrate() / 10)
            },
            motivation: {
                name: "Motivation",
                value: salary_mod * this.getMotivate()
            },
            gadgets: {
                name: "Gadgets",
                value: salary_mod * getData().office_things.gadget
            },
            tasks_stream: {
                name: "Tasks stream",
                value: salary_mod * 20 - Math.abs(tasks_stream)
            },
            tasks_difficulty: {
                name: "Tasks difficulty",
                value: salary_mod * (20 - Math.abs(tasks_difficulty))
            },
            education_stream: {
                name: "Education_stream",
                value: salary_mod * (20 - Math.abs(education_stream))
            },
            collective: {
                name: "Collective",
                value: salary_mod * (20 - Math.abs(collective))
            }
        };

        return happiness_array;

        //return 100;
    }

    getStatsData(stat) {
        return (
            (this.stats[stat] + this.expirience[stat] / 100).toFixed(2) +
            (this.items[stat].flat === true ? " +" + workers_bonus_items[stat].flat.bonus + " " : "") +
            (this.items[stat].percent === true ? " +" + workers_bonus_items[stat].percent.bonus + "% " : "")
        );
    }

    getResources(worker_roles, focus_on = null, micromanagement) {
        let r = stat => {
            return _.random(1, this.stats[stat]);
        };
        let resource = 0;

        this.standing++;

        let stat = focus_on ? focus_on : _.sample(worker_roles);

        if (micromanagement) {
            let dices = [r(stat), r(stat), r(stat)];
            dices.sort((a, b) => {
                return a - b;
            });
            resource = dices[1];
        } else {
            resource = r(stat);
        }

        if (this.items[stat].flat === true) {
            resource += workers_bonus_items[stat].flat.bonus;
        }

        if (this.items[stat].percent === true) {
            resource *= 1 + workers_bonus_items[stat].percent.bonus / 100;
            resource = Math.floor(resource);
        }

        let ret = {};
        ret[stat] = resource;
        return ret;
    }

    getSideResource() {
        this.standing++;
        let s = this.statsSum() / _.values(this.stats).length;
        return Math.floor(_.random(1, s * 2));
    }

    getRareSideResource() {
        return Math.ceil(Math.sqrt(this.getSideResource()));
    }

    addExperience(learned) {
        Object.keys(learned).forEach(stat => {
            if (learned[stat] !== 0) {
                let learned_stat = Math.ceil((learned[stat] * 5) / this.stats[stat]);
                if (workers_bonus_items[stat].exp.bonus) {
                    learned_stat *= 1 + workers_bonus_items[stat].percent.bonus / 100;
                }
                this.expirience[stat] += learned_stat;
                if (this.expirience[stat] >= 100) {
                    //  console.log('stat rise');
                    chatMessage(this.name, " rise " + stat + " skill!", "success");
                    this.expirience[stat] -= 100;
                    this.stats[stat]++;
                }
            }
        });
    }

    gotoMeeting(meeting) {
        if (!this.effects[meeting.meeting_type]) {
            this.effects[meeting.meeting_type] = 0;
        }

        if (this.effects[meeting.meeting_type] > meetings[meeting.meeting_type].max_bonus) return false;

        this.effects[meeting.meeting_type] += Math.floor(
            meetings[meeting.meeting_type].max_bonus / meetings[meeting.meeting_type].deadline
        );
    }
    setAvatar(avatar) {
        this.avatar = avatar;
    }

    static generateGender() {
        return _.random(1, 100) > 70 ? "female" : "male";
    }

    static generate(quality = 1) {
        let stats_bulk = {
            design: this.genStat(quality),
            program: this.genStat(quality),
            manage: this.genStat(quality)
        };

        let stats = bulkStyler.speciality(stats_bulk);

        return this.generateWithStats(stats);
    }

    static generateWithStats(stats) {
        let gender = this.generateGender();
        return new WorkerModel(this.genName(gender), stats, gender);
    }

    static generateBlank() {
        return this.generateWithStats(JSON.parse(JSON.stringify(skills)));
    }

    static generateAgency(agency_state) {
        //console.log(agency_state);
        let stats = _.mapValues(skills, (value, skill) => {
            let stat = _.random(agency_state.min_stats[skill], agency_state.max_stats[skill]);
            //console.log(skill, stat);
            return stat;
        });
        //console.log(stats);
        let worker = this.generateWithStats(stats);
        worker.standing = Math.floor(_.random(agency_state.min_salary, agency_state.max_salary) * 26.888);
        //console.log(worker);
        return worker;
    }

    static generatePlayer(gender) {
        let name = ""; //prompt('Type your name', this.genName());

        return new WorkerModel(
            name,
            skills_1, // {design: 1, manage: 1, program: 1},
            gender,
            true
        );
    }

    static genName(gender) {
        let first_names = [];
        if (gender === "male") {
            first_names = [
                "Oleg",
                "Elliott",
                "Igor",
                "Jack",
                "Kristofer",
                "Mike",
                "Micheal",
                "John",
                "Loris",
                "Eugene",
                "Gregorio",
                "Freddy",
                "Devin",
                "Nicol",
                "Alexey",
                "Aleksandr",
                "Peter"
            ];
        } else {
            first_names = [
                "Eve",
                "Olga",
                "Jenny",
                "Olivia",
                "Jane",
                "Amelia",
                "Emily",
                "Mia",
                "Madison",
                "Grace",
                "Sofia",
                "Maya",
                "Alice",
                "Anna",
                "Aurora",
                "Audrey"
            ];
        }
        const second_names = [
            "Kornak",
            "Gapak",
            "Martynson",
            "Kozyrev",
            "Merkulov",
            "Lojchenko",
            "Ulyanov",
            "Cherepushak", //the names of developers
            "Smith",
            "Johnson",
            "Williams",
            "Brown",
            "Jones",
            "Miller",
            "Davis",
            "Garcia",
            "Rodriguez",
            "Wilson",
            "Martinez",
            "Anderson",
            "Taylor",
            "Thomas",
            "Hernandez",
            "Moore",
            "Martin",
            "Jackson",
            "Thompson",
            "White",
            "Lopez",
            "Lee",
            "Gonzalez",
            "Harris",
            "Clark",
            "Lewis",
            "Robinson",
            "Walker",
            "Perez",
            "Hall",
            "Young",
            "Allen",
            "Sanchez",
            "Wright",
            "King",
            "Scott",
            "Green",
            "Baker",
            "Adams",
            "Nelson",
            "Hill",
            "Ramirez",
            "Campbell",
            "Mitchell",
            "Roberts",
            "Carter",
            "Phillips",
            "Evans",
            "Turner",
            "Torres",
            "Parker",
            "Collins",
            "Edwards",
            "Stewart",
            "Flores",
            "Morris",
            "Nguyen",
            "Murphy",
            "Rivera",
            "Cook",
            "Rogers",
            "Morgan",
            "Peterson",
            "Cooper",
            "Reed",
            "Bailey",
            "Bell",
            "Gomez",
            "Kelly",
            "Howard",
            "Ward",
            "Cox",
            "Diaz",
            "Richardson",
            "Wood",
            "Watson",
            "Brooks",
            "Bennett",
            "Gray",
            "James",
            "Reyes",
            "Cruz",
            "Hughes",
            "Price",
            "Myers",
            "Long",
            "Foster",
            "Sanders",
            "Ross",
            "Morales",
            "Powell",
            "Sullivan",
            "Russell",
            "Ortiz",
            "Jenkins",
            "Gutierrez",
            "Perry",
            "Butler",
            "Barnes",
            "Fisher",
            "Henderson",
            "Coleman",
            "Simmons",
            "Patterson",
            "Jordan",
            "Reynolds",
            "Hamilton",
            "Graham",
            "Kim",
            "Gonzales",
            "Alexander",
            "Ramos",
            "Wallace",
            "Griffin",
            "West",
            "Cole",
            "Hayes",
            "Chavez",
            "Gibson",
            "Bryant",
            "Ellis",
            "Stevens",
            "Murray",
            "Ford",
            "Marshall",
            "Owens",
            "Mcdonald",
            "Harrison",
            "Ruiz",
            "Kennedy",
            "Wells",
            "Alvarez",
            "Woods",
            "Mendoza",
            "Castillo",
            "Olson",
            "Webb",
            "Washington",
            "Tucker",
            "Freeman",
            "Burns",
            "Henry",
            "Vasquez",
            "Snyder",
            "Simpson",
            "Crawford",
            "Jimenez",
            "Porter",
            "Mason",
            "Shaw",
            "Gordon",
            "Wagner",
            "Hunter",
            "Romero",
            "Hicks",
            "Dixon",
            "Hunt",
            "Palmer",
            "Robertson",
            "Black",
            "Holmes",
            "Stone",
            "Meyer",
            "Boyd",
            "Mills",
            "Warren",
            "Fox",
            "Rose",
            "Rice",
            "Moreno",
            "Schmidt",
            "Patel",
            "Ferguson",
            "Nichols",
            "Herrera",
            "Medina",
            "Ryan",
            "Fernandez",
            "Weaver",
            "Daniels",
            "Stephens",
            "Gardner",
            "Payne",
            "Kelley",
            "Dunn",
            "Pierce",
            "Arnold",
            "Tran",
            "Spencer",
            "Peters",
            "Hawkins",
            "Grant",
            "Hansen",
            "Castro",
            "Hoffman",
            "Hart",
            "Anderson",
            "Cunningham",
            "Knight",
            "Bradley"
        ];
        return _.sample(first_names) + " " + _.sample(second_names);
    }

    static genStat(quality) {
        return _.random(1, quality);
    }
}

export default WorkerModel;
