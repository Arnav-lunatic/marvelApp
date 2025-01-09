import { Button } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export default function ErrorPage() {
	const navigate = useNavigate()
	return (
		<div className="relative h-full">
			<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
				<h1 className="text-7xl font-bold">Oops!</h1>
				<h1 className="text-xl font-semibold opacity-50 mt-4 mb-12">
					Something went wrong
				</h1>
				<Button onPress={()=>navigate('/')} color="primary" variant="ghost">
					Go Back to Home
				</Button>
			</div>
		</div>
	);
}
