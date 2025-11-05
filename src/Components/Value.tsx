
import { Briefcase, Building2, CheckCircle } from "lucide-react";


const ValuePreposition = () => {
    return (
        <section className="bg-gray-50 py-12 px-6">
    <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
        {[
        {
            icon: <Briefcase className="w-6 h-6 text-yellow-600" />, 
            title: "Bulk Discounts",
            desc: "Save more with high-volume purchasing."
        },
        {
            icon: <CheckCircle className="w-6 h-6 text-yellow-600" />, 
            title: "Trusted by Businesses",
            desc: "Join over 10,000 satisfied corporate clients."
        },
        {
            icon: <Building2 className="w-6 h-6 text-yellow-600" />, 
            title: "Fast B2B Shipping",
            desc: "Priority processing and logistics support."
        }
        ].map((item, index) => (
        <div key={index} className="text-center p-6 bg-white rounded-lg shadow-md ">
            <div className="mb-3 flex justify-center">{item.icon}</div>
            <h4 className="font-semibold text-lg mb-1">{item.title}</h4>
            <p className="text-gray-600 text-sm">{item.desc}</p>
        </div>
        ))}
    </div>
    </section>
)
}
export default ValuePreposition;