
import { Input } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { useSelector } from "react-redux";

export default function SearchBar({searchQuery,setSearchQuery}) {
	const isLightMode = useSelector((state) => state.theme.lightMode)

    return (
        <div className={`w-full ${isLightMode ? 'light' : 'dark'}`} >
			<Input
				label="Type the start of a superhero name..."
				isClearable
				radius="lg"
				value={searchQuery}
				on
                onChange={(event) => setSearchQuery(event.target.value)}
				classNames={{
					label: "text-black/50 dark:text-white/90",
					input: [
						"bg-transparent",
						"text-black/90 dark:text-white/90",
						"placeholder:text-default-700/50 dark:placeholder:text-white/60",
					],
					innerWrapper: "bg-transparent",
					inputWrapper: [
						"shadow-xl",
						"bg-default-200/50",
						"dark:bg-default/60",
						"backdrop-blur-xl",
						"backdrop-saturate-200",
						"hover:bg-default-200/70",
						"dark:hover:bg-default/70",
						"group-data-[focus=true]:bg-default-200/50",
						"dark:group-data-[focus=true]:bg-default/60",
						"!cursor-text",
					],
				}}
				placeholder="Type to search..."
				startContent={
					<CiSearch className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
				}
			/>
		</div>
	);
}
