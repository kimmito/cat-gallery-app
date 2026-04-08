import type { FC, PropsWithChildren } from 'react';
import { cn } from '../../../utils/cn';

interface ILayout {
    className?: string;
}

const Layout: FC<PropsWithChildren<ILayout>> = ({ children, className }) => {
    return (
        <div className={cn('mx-15.5', className)}>
            {children}
        </div>
    )
}

export default Layout;