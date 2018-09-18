import { project_kinds } from "./projects";
import _ from "lodash";

export const DREAMS_TYPES = ["development_kind", "development_platform", "development_complex"];

export const get_worker_dream = (unlocked_platforms = ["desktop"]) => {
    const KINDS = Object.keys(project_kinds);
    const KIND = KINDS[_.random(0, KINDS.length - 1)];
    const PLATFORMS = unlocked_platforms;
    const PLATFORM = PLATFORMS[_.random(0, PLATFORMS.length - 1)];
    const TYPE = DREAMS_TYPES[_.random(0, DREAMS_TYPES.length - 1)];
    let dream;

    switch (TYPE) {
        case "development_kind":
            dream = {
                text: `Dreams to take part in the development of the top 1 ${KIND} on the market.`,
                type: TYPE,
                kind: KIND,
                platform: null
            };
            break;

        case "development_platform":
            dream = {
                text: `Dreams of participating in the development of the top 1 ${PLATFORM} project on the market.`,
                type: TYPE,
                kind: null,
                platform: PLATFORM
            };
            break;

        case "development_complex":
            dream = {
                text: `Dreams of participating in the development of the top 1 ${PLATFORM} ${KIND} on the market.`,
                type: TYPE,
                kind: KIND,
                platform: PLATFORM
            };
            break;

        default:
            dream = {
                text: "",
                type: null,
                kind: null,
                platform: null
            };
    }

    return dream;
};
