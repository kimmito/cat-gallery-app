import type { FC, PropsWithChildren } from "react";
import cn from 'clsx'

interface ILayoutContainerProps {
  className?: string;
}

const LayoutContainer: FC<PropsWithChildren<ILayoutContainerProps>> = ({ children, className }) => {
  return <div className={cn("mx-auto w-full px-4 sm:px-8 lg:max-w-329.25 lg:px-0", className)}>{children}</div>;
};

export default LayoutContainer;
