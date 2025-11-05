const CustomizedProducts = () => {
    return (
        <div className="flex flex-col gap-6">
            <h4 className="font-medium">Choose a color</h4>
            <ul className="flex items-center gap-6">
                <li className="w-8 h-8 rounded-full ring-1 ring-yellow-700 cursor-pointer relative bg-blue-700">
                    <div className="absolute w-10 h-10 rounded-full ring-2 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </li>
                <li className="w-8 h-8 rounded-full ring-1 ring-yellow-700 cursor-pointer relative bg-red-400" />
                <li className="w-8 h-8 rounded-full ring-1 ring-yellow-100 relative bg-green-400 cursor-not-allowed">
                    <div className="absolute w-10 h-[2px] rounded-full bg-yellow-700 rotate-45 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                </li>
            </ul>

            <h4 className="font-medium">Choose a size</h4>
            <ul className="flex items-center gap-3">
                {['6X2"', '6X1-1/2"', '6X1-1/4"', '6X1-1"', '6X3/4"', '6X5/8"'].map((size) => (
                    <li
                        key={size}
                        className="ring-1 ring-yellow-700 text-yellow-700 rounded-md py-1 px-4 text-sm cursor-pointer"
                    >
                        {size}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomizedProducts;
