import type { SelectionSpecifier, Selection } from '@storybook/store';
import qs from 'qs';
export declare function pathToId(path: string): string;
export declare const setPath: (selection?: Selection | undefined) => void;
export declare const getSelectionSpecifierFromPath: () => SelectionSpecifier | null;
export declare class UrlStore {
    selectionSpecifier: SelectionSpecifier | null;
    selection?: Selection;
    constructor();
    setSelection(selection: Selection): void;
    setQueryParams(queryParams: qs.ParsedQs): void;
}
