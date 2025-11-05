// "use client"
import ProductList from "@/Components/ProductList";
import ContactUS from "@/Components/ContactUs";
import Slider from "@/Components/Slider";
import ImageSlider from "@/Components/ImageSlider";
import Value from "@/Components/Value";
import WhyChooseUs from "@/Components/WhyUs";
import FAQ from "@/Components/FAQ";
const Homepage = async () => {
  return (
    <div className="">
      <Slider/>
      <Value />
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32">
        <ProductList/>
      </div>
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32">
        <ImageSlider />
      </div>
      
      <div className="mt-24 px-4 md:px-8 lg:px-16 xl:px-32">
        <WhyChooseUs />
        <ContactUS />
        <FAQ />
      </div>

      
    </div>
  )
}
export default Homepage