import { AnyFramework } from '@storybook/csf';
import { DocsRenderFunction } from '@storybook/preview-web';
export declare const defaultComponents: Record<string, any>;
export declare class DocsRenderer<TFramework extends AnyFramework> {
    render: DocsRenderFunction<TFramework>;
    unmount: (element: HTMLElement) => void;
    constructor();
}
