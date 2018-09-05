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
    body: [{ name: "Dark", src: "body_dark_skin" }, { name: "Light", src: "body_light_skin" }, { name: "Medium", src: "body_medium_skin" }],
    eyes: [{ name: "01", src: "eyes_01" }, { name: "02", src: "eyes_02" }, { name: "03", src: "eyes_03" }],
    eyebrows: [
        { name: "01 black", src: "eyebrows_01_black" },
        { name: "02 black", src: "eyebrows_02_black" },
        { name: "03 black", src: "eyebrows_03_black" },
        { name: "01 brown", src: "eyebrows_01_brown" },
        { name: "02 brown", src: "eyebrows_02_brown" },
        { name: "03 brown", src: "eyebrows_03_brown" },
        { name: "01red", src: "eyebrows_01_red" },
        { name: "02red", src: "eyebrows_02_red" },
        { name: "03red", src: "eyebrows_03_red" },
        { name: "07red", src: "eyebrows_07_red" },
        { name: "01 blonde", src: "eyebrows_01_blonde" },
        { name: "02 blonde", src: "eyebrows_02_blonde" },
        { name: "03 blonde", src: "eyebrows_03_blonde" },
        { name: "07 blonde", src: "eyebrows_07_blonde" }
    ],
    nose: [{ name: "01", src: "nose_01" }, { name: "02", src: "nose_02" }, { name: "03", src: "nose_03" }],
    mouth: [{ name: "01", src: "mouth_01" }, { name: "02", src: "mouth_02" }, { name: "03", src: "mouth_03" }],
    beard: [
        { name: "01 black", src: "beard_01_black" },
        { name: "02 black", src: "beard_02_black" },
        { name: "03 black", src: "beard_03_black" },
        { name: "01 brown", src: "beard_01_brown" },
        { name: "02 brown", src: "beard_02_brown" },
        { name: "03 brown", src: "beard_03_brown" },
        { name: "01 red", src: "beard_01_red" },
        { name: "02 red", src: "beard_02_red" },
        { name: "03 red", src: "beard_03_red" },
        { name: "01 blonde", src: "beard_01_blonde" },
        { name: "02 blonde", src: "beard_02_blonde" },
        { name: "03 blonde", src: "beard_03_blonde" }
    ],
    accessories: [{ name: "01", src: "access_01" }, { name: "02", src: "access_02" }],
    hair: [
        { name: "01", src: "hair_01_black" },
        { name: "02", src: "hair_02_black" },
        { name: "03", src: "hair_03_black" },
        { name: "04", src: "hair_04_black" },
        { name: "01", src: "hair_01_brown" },
        { name: "02", src: "hair_02_brown" },
        { name: "03", src: "hair_03_brown" },
        { name: "04", src: "hair_04_brown" },
        { name: "01", src: "hair_01_red" },
        { name: "02", src: "hair_02_red" },
        { name: "03", src: "hair_03_red" },
        { name: "04", src: "hair_04_red" },
        { name: "01", src: "hair_01_blonde" },
        { name: "02", src: "hair_02_blonde" },
        { name: "03", src: "hair_03_blonde" },
        { name: "04", src: "hair_04_blonde" }
    ],
    clothes: [{ name: "01", src: "clothes_01" }, { name: "02", src: "clothes_02" }, { name: "03", src: "clothes_03" }]
};

export const female_asset = {
    body: [{ name: "Dark", src: "body_dark_skin" }, { name: "Light", src: "body_light_skin" }, { name: "Medium", src: "body_medium_skin" }],
    eyes: [{ name: "04", src: "eyes04" }, { name: "05", src: "eyes05" }, { name: "06", src: "eyes06" }, { name: "07", src: "eyes07" }],
    eyebrows: [
        { name: "04 black", src: "eyebrows04_black" },
        { name: "05 black", src: "eyebrows05_black" },
        { name: "06 black", src: "eyebrows06_black" },
        { name: "07 black", src: "eyebrows07_black" },
        { name: "04 brown", src: "eyebrows04_brown" },
        { name: "05 brown", src: "eyebrows05_brown" },
        { name: "06 brown", src: "eyebrows06_brown" },
        { name: "07 brown", src: "eyebrows07_brown" },
        { name: "04red", src: "eyebrows04_red" },
        { name: "05red", src: "eyebrows05_red" },
        { name: "06red", src: "eyebrows06_red" },
        { name: "07red", src: "eyebrows07_red" },
        { name: "04 blonde", src: "eyebrows04_blonde" },
        { name: "05 blonde", src: "eyebrows05_blonde" },
        { name: "06 blonde", src: "eyebrows06_blonde" },
        { name: "07 blonde", src: "eyebrows07_blonde" }
    ],
    nose: [{ name: "04", src: "nose04" }, { name: "05", src: "nose05" }, { name: "06", src: "nose06" }, { name: "07", src: "nose07" }],
    mouth: [{ name: "04", src: "mouth04" }, { name: "05", src: "mouth05" }, { name: "06", src: "mouth06" }, { name: "07", src: "mouth07" }],
    accessories: [
        { name: "03", src: "accessories03" },
        { name: "04", src: "accessories04" },
        { name: "05", src: "accessories05" },
        { name: "06", src: "accessories06" },
        { name: "07", src: "accessories07" },
        { name: "Tattoo 01", src: "tattoo01" }
    ],
    hair: [
        { name: "05", src: "hair05_black" },
        { name: "06", src: "hair06_black" },
        { name: "07", src: "hair07_black" },
        { name: "08", src: "hair08_black" },
        { name: "05", src: "hair05_brown" },
        { name: "06", src: "hair06_brown" },
        { name: "07", src: "hair07_brown" },
        { name: "08", src: "hair08_brown" },
        { name: "05", src: "hair05_red" },
        { name: "06", src: "hair06_red" },
        { name: "07", src: "hair07_red" },
        { name: "08", src: "hair08_red" },
        { name: "05", src: "hair05_blonde" },
        { name: "06", src: "hair06_blonde" },
        { name: "07", src: "hair07_blonde" },
        { name: "08", src: "hair08_blonde" }
    ],
    clothes: [
        { name: "04", src: "clothes04" },
        { name: "05", src: "clothes05" },
        { name: "06", src: "clothes06" },
        { name: "07", src: "clothes07" }
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
    if (gender === "Male") {
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
    }
};
