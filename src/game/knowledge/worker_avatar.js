import _ from "lodash";

const bodySVG_man = require.context("../../assets/images/man_asset/00_body/", true, /^\.\/.*\.svg$/);
const eyesSVG_man = require.context("../../assets/images/man_asset/01_eyes/", true, /^\.\/.*\.svg$/);
const eyebrowsSVG_man = require.context("../../assets/images/man_asset/02_eyebrows/", true, /^\.\/.*\.svg$/);
const nosesSVG_man = require.context("../../assets/images/man_asset/03_nose/", true, /^\.\/.*\.svg$/);
const mouthesSVG_man = require.context("../../assets/images/man_asset/04_mouth/", true, /^\.\/.*\.svg$/);
const beardsSVG_man = require.context("../../assets/images/man_asset/05_beard/", true, /^\.\/.*\.svg$/);
const accessoriesSVG_man = require.context("../../assets/images/man_asset/06_accessories/", true, /^\.\/.*\.svg$/);
const clothesSVG_man = require.context("../../assets/images/man_asset/07_clothes/", true, /^\.\/.*\.svg$/);
const hairSVG_man = require.context("../../assets/images/man_asset/08_hair/", true, /^\.\/.*\.svg$/);

const bodySVG_female = require.context("../../assets/images/female_asset/00_body/", true, /^\.\/.*\.svg$/);
const eyesSVG_female = require.context("../../assets/images/female_asset/01_eyes/", true, /^\.\/.*\.svg$/);
const eyebrowsSVG_female = require.context("../../assets/images/female_asset/02_eyebrows/", true, /^\.\/.*\.svg$/);
const nosesSVG_female = require.context("../../assets/images/female_asset/03_nose/", true, /^\.\/.*\.svg$/);
const mouthesSVG_female = require.context("../../assets/images/female_asset/04_mouth/", true, /^\.\/.*\.svg$/);
const accessoriesSVG_female = require.context("../../assets/images/female_asset/05_accessories/", true, /^\.\/.*\.svg$/);
const clothesSVG_female = require.context("../../assets/images/female_asset/07_clothes/", true, /^\.\/.*\.svg$/);
const hairSVG_female = require.context("../../assets/images/female_asset/06_hair/", true, /^\.\/.*\.svg$/);

export const male_asset = {
    body: [
        { name: "Mokko", src: "body_dark_skin" },
        { name: "Сappuccino", src: "body_medium_skin" },
        { name: "Latte", src: "body_light_skin" }
    ],
    eyes: [
        { name: "Curious dotes", src: "eyes_01" },
        { name: "Skeptical", src: "eyes_02" },
        { name: "After reading your code", src: "eyes_03" }
    ],
    eyebrows: [
        { name: "Rock Lee (Naruto)", src: "eyebrows_01_black" },
        { name: "Two fluffy dark slugs", src: "eyebrows_02_black" },
        { name: "Two dark kittens", src: "eyebrows_03_black" },
        { name: "Zushi", src: "eyebrows_01_brown" },
        { name: "A couple of furry slugs", src: "eyebrows_02_brown" },
        { name: "A fluffy couple", src: "eyebrows_03_brown" },
        { name: "Non-anime thick brows", src: "eyebrows_01_red" },
        { name: "The bushy red slugs", src: "eyebrows_02_red" },
        { name: "The resting felines", src: "eyebrows_03_red" },
        { name: "Shion Koga", src: "eyebrows_01_blonde" },
        { name: "A pair of fuzzy slugs", src: "eyebrows_02_blonde" },
        { name: "A pair of long cats", src: "eyebrows_03_blonde" }
    ],
    nose: [{ name: "An eagle", src: "nose_01" }, { name: "Mediocrity", src: "nose_02" }, { name: "Bulb", src: "nose_03" }],
    mouth: [
        { name: "Super Mario", src: "mouth_01" },
        { name: "One Punch Man", src: "mouth_02" },
        { name: "Sonic the Hedgehog", src: "mouth_03" }
    ],
    beard: [
        { name: "After barbershop", src: "beard_01_black" },
        { name: "Charismatic asshole", src: "beard_02_black" },
        { name: "Ghost-beard", src: "beard_03_black" },
        { name: "Hipsta", src: "beard_01_brown" },
        { name: "Charming prick", src: "beard_02_brown" },
        { name: "Brown almost beard", src: "beard_03_brown" },
        { name: "Hot goatee owner", src: "beard_01_red" },
        { name: "Leprechaun", src: "beard_02_red" },
        { name: "Hot ginger stubble", src: "beard_03_red" },
        { name: "Woodcutter-codewriter", src: "beard_01_blonde" },
        { name: "Devilishly handsome", src: "beard_02_blonde" },
        { name: "Blond designer stubble", src: "beard_03_blonde" }
    ],
    accessories: [{ name: "Four-eyed", src: "access_01" }, { name: "Fancy one here", src: "access_02" }],
    hair: [
        { name: "Elvis Presley", src: "hair_01_black" },
        { name: "No time for haircut", src: "hair_02_black" },
        { name: "Dark asymmetry", src: "hair_03_black" },
        { name: "Dark square head", src: "hair_04_black" },
        { name: "Brown old-fashioned", src: "hair_01_brown" },
        { name: "Too lazy for haircut", src: "hair_02_brown" },
        { name: "Messy medium brown", src: "hair_03_brown" },
        { name: "Two-legged headcrab", src: "hair_04_brown" },
        { name: "Ginger classic look", src: "hair_01_red" },
        { name: "Not a bug... a feature!", src: "hair_02_red" },
        { name: "Autumn fallen leaf", src: "hair_03_red" },
        { name: "Brutal red head", src: "hair_04_red" },
        { name: "Blond pompadour", src: "hair_01_blonde" },
        { name: "No money for haircut", src: "hair_02_blonde" },
        { name: "Blond freestyle", src: "hair_03_blonde" },
        { name: "Blond flat surface", src: "hair_04_blonde" }
    ],
    clothes: [
        { name: "Casual style", src: "clothes_01" },
        { name: "Noticeably neat shirt", src: "clothes_02" },
        { name: "Suspenders", src: "clothes_03" }
    ]
};

export const female_asset = {
    body: [
        { name: "Dark Chocolate", src: "body_dark_skin" },
        { name: "Milk Chocolate", src: "body_medium_skin" },
        { name: "White Chocolate", src: "body_light_skin" }
    ],
    eyes: [
        { name: "Before deadline", src: "eyes04" },
        { name: "At the start of deadline", src: "eyes05" },
        { name: "In the middle of deadline", src: "eyes06" },
        { name: "After deadline", src: "eyes07" }
    ],
    eyebrows: [
        { name: "Jasmine", src: "eyebrows04_black" },
        { name: "Tousled dark", src: "eyebrows05_black" },
        { name: "Esmeralda", src: "eyebrows06_black" },
        { name: "Pocahontas", src: "eyebrows07_black" },
        { name: "Moana", src: "eyebrows04_brown" },
        { name: "Ruffled brown", src: "eyebrows05_brown" },
        { name: "Miranda Lawson", src: "eyebrows06_brown" },
        { name: "Belle", src: "eyebrows07_brown" },
        { name: "Lilith", src: "eyebrows04_red" },
        { name: "Spiky ginger", src: "eyebrows05_red" },
        { name: "Aloy", src: "eyebrows06_red" },
        { name: "Merida", src: "eyebrows07_red" },
        { name: "Amy Dunne", src: "eyebrows04_blonde" },
        { name: "Mussed blond", src: "eyebrows05_blonde" },
        { name: "Rapunzel", src: "eyebrows06_blonde" },
        { name: "Kara Thrace", src: "eyebrows07_blonde" }
    ],
    nose: [
        { name: "A potato", src: "nose04" },
        { name: "Elegant", src: "nose05" },
        { name: "Turned-up", src: "nose06" },
        { name: "Snuffy", src: "nose07" }
    ],
    mouth: [
        { name: "Charming leader", src: "mouth04" },
        { name: "Hatching a plan", src: "mouth05" },
        { name: "Hot CEO", src: "mouth06" },
        { name: "Cheerful", src: "mouth07" }
    ],
    accessories: [
        { name: "Just a necklace", src: "accessories03" },
        { name: "Navy earrings", src: "accessories04" },
        { name: "Old fashion beads", src: "accessories05" },
        { name: "A stylish amulet", src: "accessories06" },
        { name: "Gothic earrings", src: "accessories07" },
        { name: "Super Star Tatoo", src: "tattoo01" }
    ],
    hair: [
        { name: "Sarah Silverman", src: "hair05_black" },
        { name: "Pucca", src: "hair06_black" },
        { name: "Xena", src: "hair07_black" },
        { name: "Gothic", src: "hair08_black" },
        { name: "The vintage Barbie", src: "hair05_brown" },
        { name: "Cheburashka", src: "hair06_brown" },
        { name: "Francie Doll", src: "hair07_brown" },
        { name: "Neformal brown", src: "hair08_brown" },
        { name: "Back to 1950s", src: "hair05_red" },
        { name: "Cute ginger buns", src: "hair06_red" },
        { name: "Mary Jane Watson", src: "hair07_red" },
        { name: "Ginger star", src: "hair08_red" },
        { name: "Modern Barbie", src: "hair05_blonde" },
        { name: "Princess Leia Blond", src: "hair06_blonde" },
        { name: "Emma Stone", src: "hair07_blonde" },
        { name: "Bond non-conformist", src: "hair08_blonde" }
    ],
    clothes: [
        { name: "Wonk", src: "clothes04" },
        { name: "Dark mistress", src: "clothes05" },
        { name: "Second hand jamper", src: "clothes06" },
        { name: "Modern princess", src: "clothes07" }
    ]
};

export const generateMaleAvatar = () => {
    let have_beard = Boolean(Math.round(Math.random()));
    let have_accessories = Boolean(Math.round(Math.random()));
    return {
        body: bodySVG_man(`./${_.sample(male_asset.body).src}.svg`),
        eyes: eyesSVG_man(`./${_.sample(male_asset.eyes).src}.svg`),
        eyebrows: eyebrowsSVG_man(`./${_.sample(male_asset.eyebrows).src}.svg`),
        nose: nosesSVG_man(`./${_.sample(male_asset.nose).src}.svg`),
        mouth: mouthesSVG_man(`./${_.sample(male_asset.mouth).src}.svg`),
        beard: have_beard ? beardsSVG_man(`./${_.sample(male_asset.beard).src}.svg`) : null,
        accessories: have_accessories ? accessoriesSVG_man(`./${_.sample(male_asset.accessories).src}.svg`) : null,
        hair: hairSVG_man(`./${_.sample(male_asset.hair).src}.svg`),
        clothes: clothesSVG_man(`./${_.sample(male_asset.clothes).src}.svg`)
    };
};

export const generateFemaleAvatar = () => {
    let have_accessories = Boolean(Math.round(Math.random()));

    return {
        body: bodySVG_female(`./${_.sample(female_asset.body).src}.svg`),
        eyes: eyesSVG_female(`./${_.sample(female_asset.eyes).src}.svg`),
        eyebrows: eyebrowsSVG_female(`./${_.sample(female_asset.eyebrows).src}.svg`),
        nose: nosesSVG_female(`./${_.sample(female_asset.nose).src}.svg`),
        mouth: mouthesSVG_female(`./${_.sample(female_asset.mouth).src}.svg`),
        accessories: have_accessories ? accessoriesSVG_female(`./${_.sample(female_asset.accessories).src}.svg`) : null,
        hair: hairSVG_female(`./${_.sample(female_asset.hair).src}.svg`),
        clothes: clothesSVG_female(`./${_.sample(female_asset.clothes).src}.svg`)
    };
};

export const customizeAvatar = (gender, body, eyes, eyebrows, nose, mouth, beard, accessories, hair, clothes) => {
    if (gender === "male") {
        return {
            body: bodySVG_man(`./${male_asset.body[body].src}.svg`),
            eyes: eyesSVG_man(`./${male_asset.eyes[eyes].src}.svg`),
            eyebrows: eyebrowsSVG_man(`./${male_asset.eyebrows[eyebrows].src}.svg`),
            nose: nosesSVG_man(`./${male_asset.nose[nose].src}.svg`),
            mouth: mouthesSVG_man(`./${male_asset.mouth[mouth].src}.svg`),
            beard: beardsSVG_man(`./${male_asset.beard[beard].src}.svg`),
            accessories: accessoriesSVG_man(`./${male_asset.accessories[accessories].src}.svg`),
            hair: hairSVG_man(`./${male_asset.hair[hair].src}.svg`),
            clothes: clothesSVG_man(`./${male_asset.clothes[clothes].src}.svg`)
        };
    } else if (gender === "female") {
        return {
            body: bodySVG_female(`./${female_asset.body[body].src}.svg`),
            eyes: eyesSVG_female(`./${female_asset.eyes[eyes].src}.svg`),
            eyebrows: eyebrowsSVG_female(`./${female_asset.eyebrows[eyebrows].src}.svg`),
            nose: nosesSVG_female(`./${female_asset.nose[nose].src}.svg`),
            mouth: mouthesSVG_female(`./${female_asset.mouth[mouth].src}.svg`),
            beard: null,
            accessories: accessoriesSVG_female(`./${female_asset.accessories[accessories].src}.svg`),
            hair: hairSVG_female(`./${female_asset.hair[hair].src}.svg`),
            clothes: clothesSVG_female(`./${female_asset.clothes[clothes].src}.svg`)
        };
    }
};
