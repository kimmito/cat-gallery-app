import type { FC, PropsWithChildren } from 'react';

interface ILayout {
    className?: string;
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, className }) => {
    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default Layout;