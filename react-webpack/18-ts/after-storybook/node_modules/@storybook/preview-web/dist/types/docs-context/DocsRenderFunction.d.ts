import type { AnyFramework, Parameters } from '@storybook/csf';
import { DocsContextProps } from './DocsContextProps';
export declare type DocsRenderFunction<TFramework extends AnyFramework> = (docsContext: DocsContextProps<TFramework>, docsParameters: Parameters, element: HTMLElement, callback: () => void) => void;
