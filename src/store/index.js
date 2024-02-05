import { proxy } from "valtio";

export const PAGES = {
    loading: 0x00,
    intro: 0x01,
    customize: 0x02,
};

// export const MODELS = {
//     packs: 0x01,
//     machines: 0x02,
//     battles: 0x03,
//     career: 0x04,
// };

const state = proxy({
    page: PAGES.loading,
    color: "#043467",
    enableMenu: false,
    disappear: false,
    fullscreen: false,
    model: "",
    modelId: "1-1",

    // subscribing: false,
    // isLogoTexture: true,
    // isFullTexture: false,
    // materialType: "wood",
});

export default state;
