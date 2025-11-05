"use client";

import SearchIcon from "@/images/Search.png";
import Image from "next/image";
import { useRouter } from "next/navigation";

const SearchBar = () => {
    const router = useRouter();

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;

        if (name.trim()) {
            router.push(`/list?name=${name}`);
        }
    };

    return (
        <form 
            onSubmit={handleSearch} 
            className="flex items-center gap-4 bg-gray-100 rounded-md shadow-md p-2 flex-1"
        >
            <input 
                type="text" 
                name="name" 
                placeholder="Search" 
                className="flex-1 bg-transparent outline-none px-2"
            />
            <button type="submit" className="cursor-pointer border-l-2 w-full border-gray-300 px-2">
                <Image src={SearchIcon} alt="search" width={16} height={16} />
            </button>
        </form>
    );
};

export default SearchBar;
