import type { FC } from "react";
import { Toaster } from "sonner";

const AppToaster: FC = () => {
  return <Toaster richColors position="top-right" closeButton />;
};

export default AppToaster;
