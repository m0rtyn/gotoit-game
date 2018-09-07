class Narrator {
    static workerFeelings(worker, widthNumbers = false) {
        // quantum {level: '', value: '', text: ''}
        // level in ['very low', 'lower', 'low', 'normal', 'high', 'higher', 'very high']

        let penalties_names = ["workloadPenalty", "difficultyPenalty", "educationPenalty", "collectivePenalty"];
        let penalties = {};

        const drawNum = (number, level = "normal") => {
            if (widthNumbers) {
                return "(" + number + ")";
            }
            return "";
        };

        const formQuantum = (penalty_name, num) => {
            let quantum = { level: "", value: num, text: "" };

            switch (true) {
                case num === -20:
                    quantum.level = "very low";
                    break;
                case num <= -15:
                    quantum.level = "lower";
                    break;
                case num <= -5:
                    quantum.level = "low";
                    break;
                case num < 5:
                    quantum.level = "normal";
                    break;
                case num < 15:
                    quantum.level = "high";
                    break;
                case num < 20:
                    quantum.level = "higher";
                    break;
                case num === 20:
                    quantum.level = "very high";
                    break;
                default:
                    console.log("error case: " + num);
            }

            return quantum;
        };

        const aboutHappiness = () => {
            let num = worker.calcEfficiency();
            switch (true) {
                case num < 20:
                    return worker.name + " hates" + drawNum(num) + " the job.";
                case num < 30:
                    return worker.name + " is extremely unhappy with" + drawNum(num) + " the job.";
                case num < 40:
                    return worker.name + " doesn't like" + drawNum(num) + " the job.";
                case num < 50:
                    return worker.name + " is a little disappointed" + drawNum(num) + " with the job.";
                case num < 60:
                    return worker.name + " thinks there's nothing wrong with" + drawNum(num) + " the job.";
                case num < 70:
                    return worker.name + " is satisfied with" + drawNum(num) + " the job.";
                case num < 80:
                    return worker.name + " likes" + drawNum(num) + " the job.";
                case num < 90:
                    return worker.name + " is happy" + drawNum(num) + " with the job.";
                case num < 100:
                    return worker.name + " is extremely happy " + drawNum(num) + "with the job.";
                case num >= 100:
                    return worker.name + " loves" + drawNum(num) + " the job.";
                default:
                    console.log("error case: " + num);
            }
        };

        const tellers = {
            workloadPenalty: penalty => {
                switch (penalty.level) {
                    case "very low":
                        return "Laziness grows due to the lack" + drawNum(penalty.value) + " of goals. ";
                    case "lower":
                        return `${worker.name} is dissatisfied due to the lack` + drawNum(penalty.value) + " of tasks. ";
                    case "low":
                        return worker.name + " is relaxed due to the lack" + drawNum(penalty.value) + " of tasks. ";
                    case "normal":
                        return worker.name + " is pleased by" + drawNum(penalty.value) + " quantity of tasks. ";
                    case "high":
                        return worker.name + " is stressed by excess" + drawNum(penalty.value) + " of tasks. ";
                    case "higher":
                        return worker.name + " is exhausted from having too much" + drawNum(penalty.value) + " work. ";
                    case "very high":
                        return worker.name + " is suffering because of an endless stream" + drawNum(penalty.value) + " of tasks. ";
                    default:
                        console.log("error case: " + penalty.level);
                        return " # Error! # ";
                }
            },
            difficultyPenalty: penalty => {
                switch (penalty.level) {
                    case "very low":
                        return "The complexity of tasks is " + "insane" + drawNum(penalty.value) + ". ";
                    case "lower":
                        return "The tasks are really taught" + drawNum(penalty.value) + ". ";
                    case "low":
                        return "The complexity of tasks is " + "positively challenging" + drawNum(penalty.value) + ". ";
                    case "normal":
                        return "The complexity of tasks is " + "appropriate" + drawNum(penalty.value) + ". ";
                    case "high":
                        return "The complexity of tasks is " + "easy" + drawNum(penalty.value) + ". ";
                    case "higher":
                        return "The complexity of tasks is " + "too simple" + drawNum(penalty.value) + ". ";
                    case "very high":
                        return "The complexity of tasks is " + "ridiculously low" + drawNum(penalty.value) + ". ";
                    default:
                        console.log("error case: " + penalty.level);
                        return " # Error! # ";
                }
            },
            educationPenalty: penalty => {
                switch (penalty.level) {
                    case "very low":
                        return worker.name + " is sick of endless learning and ";
                    case "lower":
                        return worker.name + " is tired of constant learning and";
                    case "low":
                        return worker.name + " wants to work more than learn and";
                    case "normal":
                        return worker.name + " is happy with the balance between working and learning, and";
                    case "high":
                        return worker.name + " wants to learn more than work and";
                    case "higher":
                        return worker.name + " dreams of an additional education and ";
                    case "very high":
                        return worker.name + " hates the monotonous work and";
                    default:
                        console.log("error case: " + penalty.level);
                        return " # Error! # ";
                }
            },
            collectivePenalty: penalty => {
                let realCollectivePenalty = () => {
                    switch (penalty.level) {
                        case "very low":
                            return " feels depressed by the solid experience of the colleagues.";
                        case "lower":
                            return " feels upset by low skills comparing to to the skills of the team.";
                        case "low":
                            return " feels like a follower in the team.";
                        case "normal":
                            return " feels comfortably in the team.";
                        case "high":
                            return " feels like a leader in the team.";
                        case "higher":
                            return " is sad in the incompetent team.";
                        case "very high":
                            return " becomes bored in the team of total newbies.";
                        default:
                            console.log("error case: " + penalty.level);
                            return " # Error! # ";
                    }
                };
                return realCollectivePenalty();
            }
        };

        const aboutStamina = () => {
            let num = worker.stamina;
            switch (true) {
                case num < 100:
                    return " The suitcase has been packed up.";
                case num < 250:
                    return " Thoughts are already on vacation.";
                case num < 500:
                    return " Plane tickets have been bought.";
                case num < 1000:
                    return " The travel route has been selected.";
                case num < 1500:
                    return " The worker is planning a trip.";
                case num < 2000:
                    return " The worker is thinking about vacation.";
                case num < 2500:
                    return " The worker is dreaming about vacation.";
                case num < 3000:
                    return " The worker is encouraged and ready to work.";
                case num < 3500:
                    return " The worker is full of energy.";
                case num < 4000:
                    return " The worker is rested and full of energy.";
                case num < 5000:
                    return " The worker is fresh after the vacation.";
                case num >= 5000:
                    return " The worker can't even think of resting.";
                default:
                    console.log("error case: " + num);
            }
        };

        penalties_names.forEach(penalty_name => {
            penalties[penalty_name] = formQuantum(penalty_name, worker[penalty_name]());
        });
        //    console.log(penalties);

        let tale = aboutHappiness();

        tale += penalties_names.reduce((string, penalty_name) => {
            return string + " " + tellers[penalty_name](penalties[penalty_name]);
        }, "");

        tale += aboutStamina();

        //  console.log(tale); // BUT! FIX repeatable calls
        return tale;
    }
}

export default Narrator;
