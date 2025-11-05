"use client";

import Image from "next/image";
import { RadialBarChart, RadialBar, ResponsiveContainer } from "recharts";

const data = [
{
    name: "Total",
    count: 106,
    fill: "#FFFFFF",
},
{
    name: "IN",
    count: 53,
    fill: "#FAE3C3",
},
{
    name: "OUT",
    count: 53,
    fill: "#C3EBFA",
},
];

const CountChart = () => {
return (
    <div className="bg-white rounded-xl w-full h-full p-4 flex flex-col">
    {/* TITLE */}
    <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold">Inventory</h1>
        <Image 
        src="/moreDark.png" 
        alt="More options" 
        width={20} 
        height={20} 
        className="cursor-pointer"
        />
    </div>
    
    {/* CHART */}
    <div className="relative flex-1 min-h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
            cx="50%"
            cy="50%"
            innerRadius="40%"
            outerRadius="100%"
            barSize={32}
            data={data}
            startAngle={90}
            endAngle={-270}
        >
            <RadialBar 
            background={{ fill: '#F5F5F5' }}
            dataKey="count" 
            cornerRadius={10}
            />
        </RadialBarChart>
        </ResponsiveContainer>
        <Image
        src="/maleFemale.png"
        alt="alternate image"
        width={50}
        height={50}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        />
    </div>
    
    {/* LEGEND */}
    <div className="flex justify-center gap-8 mt-4">
        <div className="flex flex-col items-center gap-1">
        <div className="w-5 h-5 bg-lamaSky rounded-full" />
        <h1 className="font-bold">1,234</h1>
        <h2 className="text-xs text-gray-400">IN (55%)</h2>
        </div>
        <div className="flex flex-col items-center gap-1">
        <div className="w-5 h-5 bg-lamaYellow rounded-full" />
        <h1 className="font-bold">1,234</h1>
        <h2 className="text-xs text-gray-400">OUT (45%)</h2>
        </div>
    </div>
    </div>
);
};

export default CountChart;