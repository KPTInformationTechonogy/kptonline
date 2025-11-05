// data/products.ts
import Hinges from "@/images/Hinges - Copy.png";
import Drywall from "@/images/Drywall.png";
import angleIron from "@/images/angleiron.png";
import carbonateHinges from "@/images/carbinateHinges.jpeg";
import angleIron2 from "@/images/angleiron.jpeg";
import IMG4 from "@/images/IMG3-4.jpg";
import IMG5 from "@/images/IMG_1_5.jpg";
import IMG6 from "@/images/IMG_1_4.jpg";
import IMG7 from "@/images/s-l1600.webp";
import IMG8 from "@/images/screws.png";
import plywood from "@/images/plywood.jpeg";
import plywood2 from "@/images/plywood.png";
import runner20 from "@/images/runner20.jpeg";
import runner18 from "@/images/runner18.jpeg";
import runner16 from "@/images/runner16.jpeg";
import runner14 from "@/images/runner14.jpeg";
import runner12 from "@/images/runner12.jpeg";
import runner10 from "@/images/runner10.jpeg";
import runner from "@/images/runner.jpg";
import bedHook from "@/images/bedhook.png";
import wpcPanel from "@/images/Wallpanel.png";
import wpcPanel2 from "@/images/WPC-Flute-Panel.jpg";
import tapTurkey from "@/images/turkey.jpg";
import tapTurkey2 from "@/images/download.jpg";
import cobra from "@/images/cobra.jpg";
import cobra2 from "@/images/cobra2.jpg";
import sink from "@/images/sink.jpg";
import sink3 from "@/images/sink3.jpg";
import shower from "@/images/pressing shower.jpg";
import shower2 from "@/images/pressing1.jpg";
import mixer from "@/images/baxmixer.jpg";
import pvc from "@/images/pvc valve.jpg";
import pvc2 from "@/images/pvc valve2.jpg";
import magic from "@/images/magicconnector.jpg";
import magic2 from "@/images/margicconnector.jpg";
import waste from "@/images/waste.jpg";
import showerHead from "@/images/showerhead.jpg";
import showerHead2 from "@/images/showerhead2.jpg";

export interface Product {
id: number;
name: string;
price: string;
description: string;
primaryImage: any;
secondaryImage: any;
slug: string;
category: string;
specifications: {
    material: string;
    size: string;
    weight: string;
    color: string;
    quantity_per_carton: string;
};
features: string[];
inStock: boolean;
minOrder: string;
deliveryTime: string;
}

export const products: Product[] = [
{
    id: 1,
    name: "Carbonate Hinges",
    price: "₦40,000",
    description: "High-quality steel hinges with corrosion-resistant coating, perfect for all door types including heavy-duty applications.",
    primaryImage: Hinges,
    secondaryImage: carbonateHinges,
    slug: "carbonate-hinges",
    category: "Hardware",
    specifications: {
    material: "Carbon Steel",
    size: "4 inches",
    weight: "250g per pair",
    color: "Silver",
    quantity_per_carton: "100 pairs"
    },
    features: [
    "Corrosion resistant",
    "Heavy duty construction",
    "Easy installation",
    "Smooth operation"
    ],
    inStock: true,
    minOrder: "10 pairs",
    deliveryTime: "24 hours"
},
{
    id: 2,
    name: "Angle Bracket",
    price: "₦40,500",
    description: "Sturdy steel angle brackets for structural support in furniture and construction projects.",
    primaryImage: angleIron,
    secondaryImage: angleIron2,
    slug: "angle-bracket",
    category: "Hardware",
    specifications: {
    material: "Mild Steel",
    size: "30x30mm",
    weight: "180g each",
    color: "Silver",
    quantity_per_carton: "20 pieces"
    },
    features: [
    "90-degree angle",
    "Pre-drilled holes",
    "High load capacity",
    "Rust resistant"
    ],
    inStock: true,
    minOrder: "20 pieces",
    deliveryTime: "24 hours"
},
{
    id: 3,
    name: "Drywall Screws 6x2",
    price: "₦34,000",
    description: "Professional drywall screws designed for secure and efficient drywall installation with bugle head design.",
    primaryImage: IMG8,
    secondaryImage: Drywall,
    slug: "drywall-screws-6x2",
    category: "Fasteners",
    specifications: {
    material: "Steel",
    size: "6x2 inches",
    weight: "1kg per box",
    color: "Black",
    quantity_per_carton: "40 boxes"
    },
    features: [
    "Bugle head design",
    "Self-tapping",
    "Prevents paper tearing",
    "Phillips drive"
    ],
    inStock: true,
    minOrder: "1 carton (40 boxes)",
    deliveryTime: "24 hours"
},
{
    id: 4,
    name: "Drywall Screws 6x1-1/4",
    price: "₦52,000",
    description: "High-quality drywall screws perfect for professional construction and woodworking projects.",
    primaryImage: IMG6,
    secondaryImage: IMG6,
    slug: "drywall-screws-6x1-1-4",
    category: "Fasteners",
    specifications: {
    material: "Steel",
    size: "6x1.25 inches",
    weight: "1kg per box",
    color: "Black",
    quantity_per_carton: "40 boxes"
    },
    features: [
    "Bugle head design",
    "Self-tapping",
    "Prevents paper tearing",
    "Phillips drive"
    ],
    inStock: true,
    minOrder: "1 carton (40 boxes)",
    deliveryTime: "24 hours"
},
{
    id: 5,
    name: "Drywall Screws 6x1-1/2",
    price: "₦52,000",
    description: "Professional grade drywall screws for secure fastening in construction applications.",
    primaryImage: IMG5,
    secondaryImage: IMG5,
    slug: "drywall-screws-6x1-1-2",
    category: "Fasteners",
    specifications: {
    material: "Steel",
    size: "6x1.5 inches",
    weight: "1kg per box",
    color: "Black",
    quantity_per_carton: "40 boxes"
    },
    features: [
    "Bugle head design",
    "Self-tapping",
    "Prevents paper tearing",
    "Phillips drive"
    ],
    inStock: true,
    minOrder: "1 carton (40 boxes)",
    deliveryTime: "24 hours"
},
{
    id: 6,
    name: "Drywall Screws 6x1",
    price: "₦44,000",
    description: "Reliable drywall screws for various construction and renovation projects.",
    primaryImage: IMG7,
    secondaryImage: IMG5,
    slug: "drywall-screws-6x1",
    category: "Fasteners",
    specifications: {
    material: "Steel",
    size: "6x1 inches",
    weight: "1kg per box",
    color: "Black",
    quantity_per_carton: "40 boxes"
    },
    features: [
    "Bugle head design",
    "Self-tapping",
    "Prevents paper tearing",
    "Phillips drive"
    ],
    inStock: true,
    minOrder: "1 carton (40 boxes)",
    deliveryTime: "24 hours"
},
{
    id: 7,
    name: "Drywall Screws 6x5/8",
    price: "₦58,000",
    description: "Short-length drywall screws ideal for thin materials and precise applications.",
    primaryImage: IMG8,
    secondaryImage: IMG8,
    slug: "drywall-screws-6x5-8",
    category: "Fasteners",
    specifications: {
    material: "Steel",
    size: "6x0.625 inches",
    weight: "1kg per box",
    color: "Black",
    quantity_per_carton: "40 boxes"
    },
    features: [
    "Bugle head design",
    "Self-tapping",
    "Prevents paper tearing",
    "Phillips drive"
    ],
    inStock: true,
    minOrder: "1 carton (40 boxes)",
    deliveryTime: "24 hours"
},
{
    id: 8,
    name: "Drywall Screws 6x3/4",
    price: "₦58,000",
    description: "Versatile drywall screws suitable for various thickness materials and applications.",
    primaryImage: IMG4,
    secondaryImage: IMG4,
    slug: "drywall-screws-6x3-4",
    category: "Fasteners",
    specifications: {
    material: "Steel",
    size: "6x0.75 inches",
    weight: "1kg per box",
    color: "Black",
    quantity_per_carton: "40 boxes"
    },
    features: [
    "Bugle head design",
    "Self-tapping",
    "Prevents paper tearing",
    "Phillips drive"
    ],
    inStock: true,
    minOrder: "1 carton (40 boxes)",
    deliveryTime: "24 hours"
},
{
    id: 9,
    name: "HDF Plywood",
    price: "₦32,000",
    description: "High-Density Fiberboard plywood offering excellent strength and smooth surface for furniture making.",
    primaryImage: plywood,
    secondaryImage: plywood2,
    slug: "hdf-plywood",
    category: "Wood Products",
    specifications: {
    material: "High-Density Fiberboard",
    size: "8x4 feet",
    weight: "30kg per sheet",
    color: "Brown",
    quantity_per_carton: "1 sheet"
    },
    features: [
    "Smooth surface finish",
    "High density strength",
    "Easy to work with",
    "Consistent thickness"
    ],
    inStock: true,
    minOrder: "5 sheets",
    deliveryTime: "24 hours"
},
{
    id: 10,
    name: "MDF Plywood",
    price: "₦26,000",
    description: "Medium-Density Fiberboard plywood perfect for interior furniture and cabinetry.",
    primaryImage: plywood2,
    secondaryImage: plywood,
    slug: "mdf-plywood",
    category: "Wood Products",
    specifications: {
    material: "Medium-Density Fiberboard",
    size: "8x4 feet",
    weight: "28kg per sheet",
    color: "Brown",
    quantity_per_carton: "1 sheet"
    },
    features: [
    "Smooth surface",
    "Easy to paint",
    "Uniform density",
    "Cost-effective"
    ],
    inStock: true,
    minOrder: "5 sheets",
    deliveryTime: "24 hours"
},
{
    id: 11,
    name: "Sliding Runner 20 Inches",
    price: "₦31,000",
    description: "Smooth sliding drawer runners for furniture, providing effortless opening and closing.",
    primaryImage: runner20,
    secondaryImage: runner,
    slug: "sliding-runner-20-inches",
    category: "Furniture Hardware",
    specifications: {
    material: "Steel",
    size: "20 inches",
    weight: "800g per pair",
    color: "Silver",
    quantity_per_carton: "20 pairs"
    },
    features: [
    "Smooth sliding action",
    "Easy installation",
    "Durable construction",
    "Weight capacity 25kg"
    ],
    inStock: true,
    minOrder: "10 pairs",
    deliveryTime: "24 hours"
},
{
    id: 12,
    name: "Sliding Runner 18 Inches",
    price: "₦32,000",
    description: "Premium quality drawer slides for smooth and quiet drawer operation.",
    primaryImage: runner18,
    secondaryImage: runner,
    slug: "sliding-runner-18-inches",
    category: "Furniture Hardware",
    specifications: {
    material: "Steel",
    size: "18 inches",
    weight: "750g per pair",
    color: "Silver",
    quantity_per_carton: "20 pairs"
    },
    features: [
    "Quiet operation",
    "Easy mounting",
    "Sturdy construction",
    "Weight capacity 25kg"
    ],
    inStock: true,
    minOrder: "10 pairs",
    deliveryTime: "24 hours"
},
{
    id: 13,
    name: "Sliding Runner 16 Inches",
    price: "₦29,000",
    description: "Reliable drawer slides for medium-sized furniture and cabinets.",
    primaryImage: runner16,
    secondaryImage: runner,
    slug: "sliding-runner-16-inches",
    category: "Furniture Hardware",
    specifications: {
    material: "Steel",
    size: "16 inches",
    weight: "700g per pair",
    color: "Silver",
    quantity_per_carton: "20 pairs"
    },
    features: [
    "Smooth movement",
    "Easy to install",
    "Durable material",
    "Weight capacity 20kg"
    ],
    inStock: true,
    minOrder: "10 pairs",
    deliveryTime: "24 hours"
},
{
    id: 14,
    name: "Sliding Runner 14 Inches",
    price: "₦27,000",
    description: "Compact drawer slides perfect for small furniture and storage units.",
    primaryImage: runner14,
    secondaryImage: runner,
    slug: "sliding-runner-14-inches",
    category: "Furniture Hardware",
    specifications: {
    material: "Steel",
    size: "14 inches",
    weight: "650g per pair",
    color: "Silver",
    quantity_per_carton: "20 pairs"
    },
    features: [
    "Compact design",
    "Easy installation",
    "Smooth operation",
    "Weight capacity 15kg"
    ],
    inStock: true,
    minOrder: "10 pairs",
    deliveryTime: "24 hours"
},
{
    id: 15,
    name: "Sliding Runner 12 Inches",
    price: "₦25,000",
    description: "Short-length drawer runners ideal for small cabinets and compact furniture.",
    primaryImage: runner12,
    secondaryImage: runner,
    slug: "sliding-runner-12-inches",
    category: "Furniture Hardware",
    specifications: {
    material: "Steel",
    size: "12 inches",
    weight: "600g per pair",
    color: "Silver",
    quantity_per_carton: "20 pairs"
    },
    features: [
    "Space-saving design",
    "Easy to mount",
    "Smooth sliding",
    "Weight capacity 15kg"
    ],
    inStock: true,
    minOrder: "10 pairs",
    deliveryTime: "24 hours"
},
{
    id: 16,
    name: "Sliding Runner 10 Inches",
    price: "₦23,000",
    description: "Miniature drawer slides for small compartments and compact furniture designs.",
    primaryImage: runner10,
    secondaryImage: runner,
    slug: "sliding-runner-10-inches",
    category: "Furniture Hardware",
    specifications: {
    material: "Steel",
    size: "10 inches",
    weight: "550g per pair",
    color: "Silver",
    quantity_per_carton: "20 pairs"
    },
    features: [
    "Compact size",
    "Easy installation",
    "Smooth operation",
    "Weight capacity 10kg"
    ],
    inStock: true,
    minOrder: "10 pairs",
    deliveryTime: "24 hours"
},
{
    id: 17,
    name: "Bed Hooks",
    price: "₦75,000",
    description: "Sturdy bed frame hooks for secure assembly and disassembly of bed frames.",
    primaryImage: bedHook,
    secondaryImage: bedHook,
    slug: "bed-hooks",
    category: "Furniture Hardware",
    specifications: {
    material: "Steel",
    size: "3 inches",
    weight: "200g per set",
    color: "Silver",
    quantity_per_carton: "72 sets"
    },
    features: [
    "Easy bed assembly",
    "Secure locking",
    "Durable steel construction",
    "Reusable design"
    ],
    inStock: true,
    minOrder: "20 sets",
    deliveryTime: "24 hours"
},
{
    id: 18,
    name: "Wall Panel WPC",
    price: "₦15,000",
    description: "Waterproof Wood-Plastic Composite wall panels perfect for interior and exterior wall decoration. Eco-friendly and durable alternative to traditional wood panels.",
    primaryImage: wpcPanel,
    secondaryImage: wpcPanel2,
    slug: "wall-panel-wpc",
    category: "Building Materials",
    specifications: {
    material: "Wood-Plastic Composite",
    size: "8x4 feet",
    weight: "15kg per panel",
    color: "Wood Grain (Various finishes)",
    quantity_per_carton: "4 panels"
    },
    features: [
    "100% waterproof",
    "Eco-friendly material",
    "Easy installation",
    "Low maintenance",
    "Termite resistant",
    "UV resistant"
    ],
    inStock: true,
    minOrder: "10 panels",
    deliveryTime: "24-48 hours"
},
{
    id: 19,
    name: "Tap, Turkey",
    price: "₦15,000",
    description: "High-quality Turkish-made tap with durable construction and elegant design for kitchen and bathroom use.",
    primaryImage: tapTurkey,
    secondaryImage: tapTurkey2,
    slug: "tap-turkey",
    category: "Plumbing Materials",
    specifications: {
    material: "Brass with Chrome Finish",
    size: "Standard",
    weight: "800g",
    color: "Chrome",
    quantity_per_carton: "240 pcs"
    },
    features: [
    "Durable brass construction",
    "Corrosion resistant",
    "Easy installation",
    "Smooth operation",
    "Water efficient"
    ],
    inStock: true,
    minOrder: "50 pcs",
    deliveryTime: "24-48 hours"
},
{
    id: 20,
    name: "Kitchen Sink Faucet",
    price: "₦15,000",
    description: "Modern kitchen sink faucet with sleek design and reliable performance for daily use.",
    primaryImage: sink,
    secondaryImage: sink3,
    slug: "kitchen-sink-faucet",
    category: "Plumbing Materials",
    specifications: {
    material: "Stainless Steel",
    size: "Standard",
    weight: "1.2kg",
    color: "Chrome",
    quantity_per_carton: "240 pcs"
    },
    features: [
    "Easy to clean",
    "Durable construction",
    "Smooth handle operation",
    "Water saving",
    "Modern design"
    ],
    inStock: true,
    minOrder: "50 pcs",
    deliveryTime: "24-48 hours"
},
{
    id: 21,
    name: "Kitchen Sink Faucet Cobra",
    price: "₦15,000",
    description: "Cobra-style kitchen sink faucet with flexible hose and spray function for versatile kitchen tasks.",
    primaryImage: cobra,
    secondaryImage: cobra2,
    slug: "kitchen-sink-faucet-cobra",
    category: "Plumbing Materials",
    specifications: {
    material: "Stainless Steel",
    size: "Standard with pull-out spray",
    weight: "1.5kg",
    color: "Chrome",
    quantity_per_carton: "240 pcs"
    },
    features: [
    "Pull-out spray head",
    "Flexible hose",
    "Multiple spray patterns",
    "Easy installation",
    "Durable finish"
    ],
    inStock: true,
    minOrder: "50 pcs",
    deliveryTime: "24-48 hours"
},
{
    id: 22,
    name: "Bath Mixer Plastic",
    price: "₦15,000",
    description: "Plastic bath mixer with reliable performance and easy installation for bathroom use.",
    primaryImage: mixer,
    secondaryImage: mixer,
    slug: "bath-mixer-plastic",
    category: "Plumbing Materials",
    specifications: {
    material: "High-Quality Plastic",
    size: "Standard",
    weight: "600g",
    color: "White",
    quantity_per_carton: "240 pcs"
    },
    features: [
    "Corrosion resistant",
    "Easy to install",
    "Lightweight",
    "Cost-effective",
    "Durable plastic construction"
    ],
    inStock: true,
    minOrder: "50 pcs",
    deliveryTime: "24-48 hours"
},
{
    id: 23,
    name: "Pressing Shower",
    price: "₦15,000",
    description: "Pressure shower system with efficient water flow and comfortable shower experience.",
    primaryImage: shower,
    secondaryImage: shower2,
    slug: "pressing-shower",
    category: "Plumbing Materials",
    specifications: {
    material: "Plastic and Metal",
    size: "Standard",
    weight: "1kg",
    color: "White/Chrome",
    quantity_per_carton: "240 pcs"
    },
    features: [
    "Good water pressure",
    "Easy installation",
    "Comfortable grip",
    "Adjustable settings",
    "Durable construction"
    ],
    inStock: true,
    minOrder: "50 pcs",
    deliveryTime: "24-48 hours"
},
{
    id: 24,
    name: "PVC Ball Valve",
    price: "₦15,000",
    description: "High-quality PVC ball valves available in various sizes for plumbing applications.",
    primaryImage: pvc,
    secondaryImage: pvc2,
    slug: "pvc-ball-valve",
    category: "Plumbing Materials",
    specifications: {
    material: "PVC",
    size: "1 inch, 1/2 inch, 3/4 inch",
    weight: "200-400g depending on size",
    color: "White",
    quantity_per_carton: "240 pcs"
    },
    features: [
    "Corrosion resistant",
    "Easy to install",
    "Smooth operation",
    "Durable PVC material",
    "Multiple size options"
    ],
    inStock: true,
    minOrder: "50 pcs",
    deliveryTime: "24-48 hours"
},
{
    id: 25,
    name: "WC Magic Connector",
    price: "₦15,000",
    description: "Flexible connector for toilet installation with easy connection and reliable seal.",
    primaryImage: magic,
    secondaryImage: magic2,
    slug: "wc-magic-connector",
    category: "Plumbing Materials",
    specifications: {
    material: "Stainless Steel and Rubber",
    size: "4 inch",
    weight: "300g",
    color: "Silver",
    quantity_per_carton: "240 pcs"
    },
    features: [
    "Flexible installation",
    "Watertight seal",
    "Easy to connect",
    "Durable materials",
    "Corrosion resistant"
    ],
    inStock: true,
    minOrder: "50 pcs",
    deliveryTime: "24-48 hours"
},
{
    id: 26,
    name: "Magic Waste Pipe",
    price: "₦15,000",
    description: "Flexible waste pipe for sink and bathroom drainage with easy installation.",
    primaryImage: waste,
    secondaryImage: waste,
    slug: "magic-waste-pipe",
    category: "Plumbing Materials",
    specifications: {
    material: "Plastic",
    size: "1-1/2 inch",
    weight: "400g",
    color: "White",
    quantity_per_carton: "240 pcs"
    },
    features: [
    "Flexible design",
    "Easy installation",
    "Corrosion resistant",
    "Durable plastic",
    "Universal fit"
    ],
    inStock: true,
    minOrder: "50 pcs",
    deliveryTime: "24-48 hours"
},
{
    id: 27,
    name: "Shower Head",
    price: "₦15,000",
    description: "High-quality shower head with multiple spray patterns and efficient water distribution.",
    primaryImage: showerHead,
    secondaryImage: showerHead2,
    slug: "shower-head",
    category: "Plumbing Materials",
    specifications: {
    material: "Plastic and Metal",
    size: "Standard",
    weight: "500g",
    color: "Chrome",
    quantity_per_carton: "240 pcs"
    },
    features: [
    "Multiple spray patterns",
    "Easy to clean",
    "Water efficient",
    "Adjustable angle",
    "Durable finish"
    ],
    inStock: true,
    minOrder: "50 pcs",
    deliveryTime: "24-48 hours"
}
];