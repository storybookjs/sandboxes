declare type OutlineStyle = 'dotted' | 'dashed' | 'solid' | 'double';
export declare const highlightStyle: (color?: string, style?: OutlineStyle) => string;
export declare const highlightObject: (color: string) => {
    outline: string;
    outlineOffset: number;
    boxShadow: string;
};
export {};
