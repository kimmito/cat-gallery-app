import type { FC } from "react";
import { ClipLoader } from "react-spinners";

const Loader: FC = () => {
	return (
		<div className="flex w-full items-center justify-center py-10" role="status" aria-live="polite" aria-label="Loading">
			<ClipLoader size={44} color="#0284c7" speedMultiplier={0.9} />
		</div>
	);
};

export default Loader;
