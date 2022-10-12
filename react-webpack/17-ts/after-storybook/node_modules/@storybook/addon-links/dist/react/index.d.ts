import { PureComponent, ReactNode } from 'react';

interface Props {
    kind: string | null;
    story: string | null;
    children: ReactNode;
}
interface State {
    href: string;
}
declare class LinkTo extends PureComponent<Props, State> {
    static defaultProps: Props;
    state: State;
    componentDidMount(): void;
    componentDidUpdate(prevProps: Props): void;
    updateHref: () => Promise<void>;
    handleClick: () => void;
    render(): JSX.Element;
}

export { LinkTo as default };
