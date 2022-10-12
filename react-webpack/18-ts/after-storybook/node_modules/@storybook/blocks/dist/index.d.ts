import React, { FunctionComponent, ComponentProps, ReactNode, FC, ElementType, Context } from 'react';
import { Conditional, Parameters, AnyFramework, StrictArgTypes, ProjectAnnotations, BaseAnnotations, StoryId as StoryId$1, StoryAnnotations, ComponentTitle } from '@storybook/csf';
import { PropDescriptor, ModuleExports, Story as Story$2, ModuleExport } from '@storybook/store';
import { DocsContextProps } from '@storybook/preview-web';
export { DocsContextProps } from '@storybook/preview-web';
import { SyntaxHighlighter, ActionItem, SyntaxHighlighterFormatTypes } from '@storybook/components';
import { Channel } from '@storybook/channels';
import { StoryId } from '@storybook/api';
import { ThemeVars } from '@storybook/theming';

declare enum SourceError {
    NO_STORY = "There\u2019s no story here.",
    SOURCE_UNAVAILABLE = "Oh no! The source is not available."
}
interface SourceErrorProps {
    isLoading?: boolean;
    error?: SourceError;
}
interface SourceCodeProps {
    language?: string;
    code?: string;
    format?: ComponentProps<typeof SyntaxHighlighter>['format'];
    dark?: boolean;
}
declare type SourceProps$1 = SourceErrorProps & SourceCodeProps;
/**
 * Syntax-highlighted source code for a component (or anything!)
 */
declare const Source$1: FunctionComponent<SourceProps$1>;

interface DescriptionProps$1 {
    markdown: string;
}

interface PreviewProps {
    isLoading?: true;
    isColumn?: boolean;
    columns?: number;
    withSource?: SourceProps$1;
    isExpanded?: boolean;
    withToolbar?: boolean;
    className?: string;
    additionalActions?: ActionItem[];
    children?: ReactNode;
}

interface ArgType {
    name?: string;
    description?: string;
    defaultValue?: any;
    if?: Conditional;
    [key: string]: any;
}
interface ArgTypes {
    [key: string]: ArgType;
}
interface Args {
    [key: string]: any;
}
declare type Globals = {
    [name: string]: any;
};

declare enum ArgsTableError {
    NO_COMPONENT = "No component found.",
    ARGS_UNSUPPORTED = "Args unsupported. See Args documentation for your framework."
}
declare type SortType = 'alpha' | 'requiredFirst' | 'none';
interface ArgsTableOptionProps {
    children?: React.ReactNode;
    updateArgs?: (args: Args) => void;
    resetArgs?: (argNames?: string[]) => void;
    compact?: boolean;
    inAddonPanel?: boolean;
    initialExpandedArgs?: boolean;
    isLoading?: boolean;
    sort?: SortType;
}
interface ArgsTableDataProps {
    rows: ArgTypes;
    args?: Args;
    globals?: Globals;
}
interface ArgsTableErrorProps {
    error: ArgsTableError;
}
interface ArgsTableLoadingProps {
    isLoading: true;
}
declare type ArgsTableProps$1 = ArgsTableOptionProps & (ArgsTableDataProps | ArgsTableErrorProps | ArgsTableLoadingProps);
/**
 * Display the props for a component as a props table. Each row is a collection of
 * ArgDefs, usually derived from docgen info for the component.
 */
declare const ArgsTable$1: FC<ArgsTableProps$1>;

declare const NoControlsWarning: () => JSX.Element;

declare enum StoryError {
    NO_STORY = "No component or story to display"
}
interface CommonProps$2 {
    title?: string;
    height?: string;
    id: string;
}
interface InlineStoryProps extends CommonProps$2 {
    parameters: Parameters;
    storyFn: ElementType;
}
declare type IFrameStoryProps = CommonProps$2;
declare type StoryProps$2 = InlineStoryProps | IFrameStoryProps;
/**
 * A story element, either rendered inline or in an iframe,
 * with configurable height.
 */
declare const Story$1: FunctionComponent<StoryProps$2 & {
    inline?: boolean;
    error?: StoryError;
    children?: React.ReactNode;
}>;

interface TypesetProps {
    fontFamily?: string;
    fontSizes: string[];
    fontWeight?: number;
    sampleText?: string;
}
/**
 * Convenient styleguide documentation showing examples of type
 * with different sizes and weights and configurable sample text.
 */
declare const Typeset: FC<TypesetProps>;

declare type Colors = string[] | {
    [key: string]: string;
};
interface ColorItemProps {
    title: string;
    subtitle: string;
    colors: Colors;
}
/**
 * A single color row your styleguide showing title, subtitle and one or more colors, used
 * as a child of `ColorPalette`.
 */
declare const ColorItem: FunctionComponent<ColorItemProps>;
interface ColorPaletteProps {
    children?: React.ReactNode;
}
/**
 * Styleguide documentation for colors, including names, captions, and color swatches,
 * all specified as `ColorItem` children of this wrapper component.
 */
declare const ColorPalette: FunctionComponent<ColorPaletteProps>;

interface IconItemProps {
    name: string;
    children?: React.ReactNode;
}
/**
 * An individual icon with a caption and an example (passed as `children`).
 */
declare const IconItem: FunctionComponent<IconItemProps>;
interface IconGalleryProps {
    children?: React.ReactNode;
}
/**
 * Show a grid of icons, as specified by `IconItem`.
 */
declare const IconGallery: FunctionComponent<IconGalleryProps>;

declare const anchorBlockIdFromId: (storyId: string) => string;
interface AnchorProps {
    storyId: string;
}
declare const Anchor: FC<AnchorProps>;

declare const DocsContext: Context<DocsContextProps<AnyFramework>>;

/**
 * No longer supported, only here to help with error handling
 */
declare const CURRENT_SELECTION = ".";
declare const currentSelectionWarning: () => void;
declare const PRIMARY_STORY = "^";
declare type Component = any;
interface StoryData {
    id?: string;
    kind?: string;
    name?: string;
    parameters?: any;
}
declare type DocsStoryProps = StoryData & {
    expanded?: boolean;
    withToolbar?: boolean;
};

interface BaseProps {
    include?: PropDescriptor;
    exclude?: PropDescriptor;
    sort?: SortType;
}
declare type OfProps = BaseProps & {
    of: '^' | Component;
};
declare type ComponentsProps = BaseProps & {
    components: {
        [label: string]: Component;
    };
};
declare type StoryProps$1 = BaseProps & {
    story: '.' | '^' | string;
    showComponent?: boolean;
};
declare type ArgsTableProps = BaseProps | OfProps | ComponentsProps | StoryProps$1;
declare const extractComponentArgTypes: (component: Component, context: DocsContextProps, include?: PropDescriptor, exclude?: PropDescriptor) => StrictArgTypes;
declare const getComponent: (props: ArgsTableProps, context: DocsContextProps) => Component;
declare const StoryTable: FC<StoryProps$1 & {
    component: Component;
    subcomponents: Record<string, Component>;
}>;
declare const ComponentsTable: FC<ComponentsProps>;
declare const ArgsTable: FC<ArgsTableProps>;

interface SourceItem {
    code: string;
    format: SyntaxHighlighterFormatTypes;
}
declare type StorySources = Record<StoryId, SourceItem>;
interface SourceContextProps {
    sources: StorySources;
    setSource?: (id: StoryId, item: SourceItem) => void;
}
declare const SourceContext: Context<SourceContextProps>;
declare const SourceContainer: FC<{
    channel: Channel;
}>;

declare enum SourceState {
    OPEN = "open",
    CLOSED = "closed",
    NONE = "none"
}
interface CommonProps$1 {
    language?: string;
    dark?: boolean;
    format?: PureSourceProps['format'];
    code?: string;
}
declare type SingleSourceProps = {
    id: string;
} & CommonProps$1;
declare type MultiSourceProps = {
    ids: string[];
} & CommonProps$1;
declare type CodeProps = {
    code: string;
} & CommonProps$1;
declare type NoneProps = CommonProps$1;
declare type SourceProps = SingleSourceProps | MultiSourceProps | CodeProps | NoneProps;
declare type SourceStateProps = {
    state: SourceState;
};
declare type PureSourceProps = ComponentProps<typeof Source$1>;
declare const getSourceProps: (props: SourceProps, docsContext: DocsContextProps<any>, sourceContext: SourceContextProps) => PureSourceProps & SourceStateProps;
/**
 * Story source doc block renders source code if provided,
 * or the source for a story if `storyId` is provided, or
 * the source for the current story if nothing is provided.
 */
declare const Source: FC<PureSourceProps>;

declare type CanvasProps = PreviewProps & {
    withSource?: SourceState;
    mdxSource?: string;
};
declare const Canvas: FC<CanvasProps>;

declare enum DescriptionType {
    INFO = "info",
    NOTES = "notes",
    DOCGEN = "docgen",
    LEGACY_5_2 = "legacy-5.2",
    AUTO = "auto"
}
interface DescriptionProps {
    of?: '.' | Component;
    type?: DescriptionType;
    markdown?: string;
    children?: string;
}
declare const getDescriptionProps: ({ of, type, markdown, children }: DescriptionProps, { storyById }: DocsContextProps<any>) => DescriptionProps$1;
declare const DescriptionContainer: FC<DescriptionProps>;

declare type DocsProps<TFramework extends AnyFramework = AnyFramework> = {
    docsParameter: Parameters;
    context: DocsContextProps<TFramework>;
};
declare const Docs: FunctionComponent<DocsProps>;

declare const DocsPage: FC;

interface DocsContainerProps<TFramework extends AnyFramework = AnyFramework> {
    context: DocsContextProps<TFramework>;
    theme?: ThemeVars;
}
declare const DocsContainer: FunctionComponent<DocsContainerProps>;

declare const DocsStory: FC<DocsStoryProps>;

declare type ExternalDocsProps<TFramework extends AnyFramework = AnyFramework> = {
    projectAnnotationsList: ProjectAnnotations<TFramework>[];
};
declare const ExternalDocs: FunctionComponent<ExternalDocsProps>;

declare const ExternalDocsContainer: React.FC<{
    projectAnnotations: any;
}>;

interface HeadingProps {
    children: JSX.Element | string;
    disableAnchor?: boolean;
}
declare const Heading: FC<HeadingProps>;

declare type MetaProps = BaseAnnotations & {
    of?: ModuleExports;
};
/**
 * This component is used to declare component metadata in docs
 * and gets transformed into a default export underneath the hood.
 */
declare const Meta: FC<MetaProps>;

declare const Preview: (props: ComponentProps<typeof Canvas>) => JSX.Element;

interface PrimaryProps {
    name?: string;
}
declare const Primary: FC<PrimaryProps>;

declare const Props: (props: ComponentProps<typeof ArgsTable>) => JSX.Element;

interface StoriesProps {
    title?: JSX.Element | string;
    includePrimary?: boolean;
}
declare const Stories: FC<StoriesProps>;

declare const storyBlockIdFromId: (storyId: string) => string;
declare type PureStoryProps = ComponentProps<typeof Story$1>;
declare type CommonProps = StoryAnnotations & {
    height?: string;
    inline?: boolean;
};
declare type StoryDefProps = {
    name: string;
    children: ReactNode;
};
declare type StoryRefProps = {
    id?: string;
    of?: ModuleExport;
    meta?: ModuleExports;
};
declare type StoryImportProps = {
    name: string;
    story: ElementType;
};
declare type StoryProps = (StoryDefProps | StoryRefProps | StoryImportProps) & CommonProps;
declare const getStoryId: (props: StoryProps, context: DocsContextProps) => StoryId$1;
declare const getStoryProps: <TFramework extends AnyFramework>({ height, inline }: StoryProps, story: Story$2<TFramework>) => PureStoryProps;
declare const Story: FC<StoryProps>;

declare const Subheading: FC<HeadingProps>;

interface SubtitleProps {
    children?: JSX.Element | string;
}
declare const Subtitle: FunctionComponent<SubtitleProps>;

interface TitleProps {
    children?: JSX.Element | string;
}
declare const extractTitle: (title: ComponentTitle) => string;
declare const Title: FunctionComponent<TitleProps>;

declare const Wrapper: FC;

declare const assertIsFn: (val: any) => any;
declare const AddContext: FC<DocsContextProps>;
interface CodeOrSourceMdxProps {
    className?: string;
}
declare const CodeOrSourceMdx: FC<CodeOrSourceMdxProps>;
interface AnchorMdxProps {
    href: string;
    target: string;
}
declare const AnchorMdx: FC<AnchorMdxProps>;
interface HeaderMdxProps {
    as: string;
    id: string;
}
declare const HeaderMdx: FC<HeaderMdxProps>;
declare const HeadersMdx: {};

interface ControlProps<T> {
    name: string;
    value?: T;
    defaultValue?: T;
    argType?: ArgType;
    onChange: (value: T) => T | void;
    onFocus?: (evt: any) => void;
    onBlur?: (evt: any) => void;
}
declare type BooleanValue = boolean;
interface BooleanConfig {
}
declare type ColorValue = string;
declare type PresetColor = ColorValue | {
    color: ColorValue;
    title?: string;
};
interface ColorConfig {
    presetColors?: PresetColor[];
    startOpen?: boolean;
}
declare type DateValue = Date | number;
interface DateConfig {
}
declare type NumberValue = number;
interface NumberConfig {
    min?: number;
    max?: number;
    step?: number;
}
declare type RangeConfig = NumberConfig;
declare type ObjectValue = any;
interface ObjectConfig {
}
declare type OptionsSingleSelection = any;
declare type OptionsMultiSelection = any[];
declare type OptionsSelection = OptionsSingleSelection | OptionsMultiSelection;
declare type OptionsArray = any[];
declare type OptionsObject = Record<string, any>;
declare type Options = OptionsArray | OptionsObject;
declare type OptionsControlType = 'radio' | 'inline-radio' | 'check' | 'inline-check' | 'select' | 'multi-select';
interface OptionsConfig {
    labels: Record<any, string>;
    options: Options;
    type: OptionsControlType;
}
interface NormalizedOptionsConfig {
    options: OptionsObject;
}
declare type TextValue = string;
interface TextConfig {
    maxLength?: number;
}
declare type ControlType = 'array' | 'boolean' | 'color' | 'date' | 'number' | 'range' | 'object' | OptionsControlType | 'text';
declare type Control = BooleanConfig | ColorConfig | DateConfig | NumberConfig | ObjectConfig | OptionsConfig | RangeConfig | TextConfig;
declare type Controls = Record<string, Control>;

declare type ColorControlProps = ControlProps<ColorValue> & ColorConfig;

declare type BooleanProps = ControlProps<BooleanValue> & BooleanConfig;
declare const BooleanControl: FC<BooleanProps>;

declare const parseDate: (value: string) => Date;
declare const parseTime: (value: string) => Date;
declare const formatDate: (value: Date | number) => string;
declare const formatTime: (value: Date | number) => string;
declare type DateProps = ControlProps<DateValue> & DateConfig;
declare const DateControl: FC<DateProps>;

declare type NumberProps = ControlProps<NumberValue | null> & NumberConfig;
declare const parse: (value: string) => number;
declare const format: (value: NumberValue) => string;
declare const NumberControl: FC<NumberProps>;

declare type OptionsProps = ControlProps<OptionsSelection> & OptionsConfig;
declare const OptionsControl: FC<OptionsProps>;

declare type ObjectProps = ControlProps<ObjectValue> & ObjectConfig & {
    theme: any;
};
declare const ObjectControl: FC<ObjectProps>;

declare type RangeProps = ControlProps<NumberValue | null> & RangeConfig;
declare const RangeControl: FC<RangeProps>;

declare type TextProps = ControlProps<TextValue | undefined> & TextConfig;
declare const TextControl: FC<TextProps>;

interface FilesControlProps extends ControlProps<string[]> {
    accept?: string;
}
declare const FilesControl: FC<FilesControlProps>;

declare type ColorProps = ColorControlProps;
declare const LazyColorControl: React.LazyExoticComponent<React.FC<ColorControlProps>>;
declare const ColorControl: (props: ComponentProps<typeof LazyColorControl>) => JSX.Element;

export { AddContext, Anchor, AnchorMdx, AnchorProps, ArgsTable, BooleanConfig, BooleanControl, BooleanProps, BooleanValue, CURRENT_SELECTION, Canvas, CodeOrSourceMdx, ColorConfig, ColorControl, ColorItem, ColorPalette, ColorProps, ColorValue, Component, ComponentsTable, Control, ControlProps, ControlType, Controls, DateConfig, DateControl, DateProps, DateValue, DescriptionContainer as Description, DescriptionType, Docs, DocsContainer, DocsContainerProps, DocsContext, DocsPage, DocsProps, DocsStory, DocsStoryProps, ExternalDocs, ExternalDocsContainer, ExternalDocsProps, FilesControl, FilesControlProps, HeaderMdx, HeadersMdx, Heading, HeadingProps, IconGallery, IconItem, Meta, NoControlsWarning, NormalizedOptionsConfig, NumberConfig, NumberControl, NumberValue, ObjectConfig, ObjectControl, ObjectProps, ObjectValue, Options, OptionsArray, OptionsConfig, OptionsControl, OptionsControlType, OptionsMultiSelection, OptionsObject, OptionsProps, OptionsSelection, OptionsSingleSelection, PRIMARY_STORY, PresetColor, Preview, Primary, Props, ArgsTable$1 as PureArgsTable, RangeConfig, RangeControl, SortType, Source, SourceContainer, SourceContext, SourceContextProps, SourceItem, SourceState, Stories, Story, StoryData, StoryProps, StorySources, StoryTable, Subheading, Subtitle, TextConfig, TextControl, TextProps, TextValue, Title, Typeset, Wrapper, anchorBlockIdFromId, assertIsFn, currentSelectionWarning, extractComponentArgTypes, extractTitle, format, formatDate, formatTime, getComponent, getDescriptionProps, getSourceProps, getStoryId, getStoryProps, parse, parseDate, parseTime, storyBlockIdFromId };
