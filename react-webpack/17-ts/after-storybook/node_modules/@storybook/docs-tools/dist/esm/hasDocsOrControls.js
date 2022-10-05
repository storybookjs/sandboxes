// `addons/x` is for the monorepo, `addon-x` is for normal usage
const packageRe = /(addons\/|addon-)(docs|controls)/;
export const hasDocsOrControls = options => options.presetsList?.some(preset => packageRe.test(preset.name));