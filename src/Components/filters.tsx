const Filter = () => {
    return (
        <div className="mt-12 flex justify-between">
            <div className="flex gap-6 flex-wrap">
                <select 
                    name="productType" 
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
                >
                    <option value="">Type</option>
                    <option value="physical">Physical</option>
                    <option value="digital">Digital</option>
                </select>

                <input
                    type="text"
                    name="min"
                    placeholder="Min price"
                    className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-yellow-400"
                />
                <input
                    type="text"
                    name="max"
                    placeholder="Max price"
                    className="text-xs rounded-2xl pl-2 w-24 ring-1 ring-yellow-400"
                />

                <select 
                    name="size" 
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
                >
                    <option value="text">text</option>
                    <option value="text">text</option>
                    <option value="text">text</option>
                </select>

                <select 
                    name="category" 
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
                >
                    <option value="">Category</option>
                    <option value="drywall-screws">Drywall Screws</option>
                    <option value="cabinet-hinges">Cabinet Hinges</option>
                    <option value="roofing-nails">Roofing Nails</option>
                    <option value="angle-brackets">Angle Brackets</option>
                </select>

                <select 
                    name="filters" 
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
                >
                    <option value="">All filters</option>
                </select>
            </div>

            <div>
                <select 
                    name="sort" 
                    className="py-2 px-4 rounded-2xl text-xs font-medium bg-[#EBEDED]"
                >
                    <option value="">Sorted by</option>
                    <option value="low-to-high">Price (Low to High)</option>
                    <option value="high-to-low">Price (High to Low)</option>
                    <option value="oldest">Oldest</option>
                    <option value="newest">Newest</option>
                </select>
            </div>
        </div>
    );
};

export default Filter;