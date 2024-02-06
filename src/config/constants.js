import { swatch, fileIcon, ai, logoShirt, stylishShirt } from "../assets";

export const EditorTabs = [
    {
        name: "colorpicker",
        icon: swatch,
    },
    {
        name: "filepicker",
        icon: fileIcon,
    },
    {
        name: "aipicker",
        icon: ai,
    },
];

export const matTabs = [
    {
        id:"1",
        name: "wood",
        icon: logoShirt,
    },
    {
        id:"2",
        name: "metal",
        icon: stylishShirt,
    },
];

export const DecalTypes = {
    logo: {
        stateProperty: "logoDecal",
        filterTab: "logoShirt",
    },
    full: {
        stateProperty: "fullDecal",
        filterTab: "stylishShirt",
    },
};
