import { Card, CardFooter, Image, Button } from "@nextui-org/react";

export default function CharacterCard({ characImg, characName }) {
	

	return (
		<Card isFooterBlurred radius="lg" className="border-none">
			<Image
				alt="Character"
				className="object-cover"
				height={200}
				src={characImg}
				width={200}
			/>
			<CardFooter className="justify-between bg-black bg-opacity-30 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
				<p className="text-tiny text-white/80">{characName}</p>
				<Button
					className="text-tiny text-white bg-black/20"
					variant="flat"
					color="default"
					radius="lg"
					size="sm"
				>
					Notify me
				</Button>
			</CardFooter>
		</Card>
	);
}
