import type { FC, PropsWithChildren } from 'react';
import LayoutContainer from './LayoutContainer';

interface ILayout {
    className?: string;
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, className }) => {
    return (
        <LayoutContainer className={className}>
            {children}
        </LayoutContainer>
    )
}

export default Layout;