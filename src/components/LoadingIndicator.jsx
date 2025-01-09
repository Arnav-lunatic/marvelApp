import { useAppSelector } from "../app/hooks";
import { Progress } from "@nextui-org/react";

export default function LoadingIndicator() {
	const isLoading = useAppSelector((state) => state.loader.isLoading);

	return (
		<>
			{isLoading ? (
				<Progress
					isIndeterminate
					aria-label="Loading..."
					color="danger"
					className="absolute top-0 left-0 w-full"
					size="sm"
				/>
			) : (
				""
			)}
		</>
	);
}
