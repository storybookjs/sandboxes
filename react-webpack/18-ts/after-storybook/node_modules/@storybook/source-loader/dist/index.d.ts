interface SourceLoc {
    line: number;
    col: number;
}
interface SourceBlock {
    startBody: SourceLoc;
    endBody: SourceLoc;
    startLoc: SourceLoc;
    endLoc: SourceLoc;
}
interface LocationsMap {
    [key: string]: SourceBlock;
}

/**
 * given a location, extract the text from the full source
 */
declare function extractSource(location: SourceBlock, lines: string[]): string | null;

declare const _default: any;

export { LocationsMap, SourceBlock, SourceLoc, _default as default, extractSource };
