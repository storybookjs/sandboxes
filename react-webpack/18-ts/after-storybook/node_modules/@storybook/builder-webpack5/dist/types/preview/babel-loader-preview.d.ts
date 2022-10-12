import { TypescriptOptions } from '../types';
export declare const createBabelLoader: (options: any, typescriptOptions: TypescriptOptions) => {
    test: RegExp;
    use: {
        loader: string;
        options: any;
    }[];
    include: string[];
    exclude: RegExp;
};
