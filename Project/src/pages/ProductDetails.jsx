import { useParams } from "react-router-dom";
import ProductData from "../data/ProductData";
import Navbar from "../components/Navbar";
import { RxCross2 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";


const ProductDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const product = ProductData.find(
    (item) => item.id === Number(id)
  );

  if (!product) {
    return (
      <div className="text-center mt-20 text-3xl font-bold text-red-700">
        Product Not Found
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-800">
      <Navbar />

      <div className="max-w-7xl mx-auto px-8 py-12 ">
        <div className="bg-gray-500 rounded-2xl border-emerald-700 shadow-lg overflow-hidden grid md:grid-cols-2 gap-8 p-6">

          {/* Image */}
          

          <div className="flex justify-center items-center">
            <img
              src={product.img}
              alt={product.name}
              className="w-full max-w-md h-[400px] object-contain hover:scale-105 transition duration-300"
            />
          </div>

          {/* Details */}
          <div className=" justify-between">
            <div 
            onClick={() => navigate(-1)}
            className="ml-[330px] mb-3 font-bold text-lg hover:text-black border rounded-full cursor-pointer">
              <RxCross2 />
            </div>
            <div className="flex flex-col ">
              <p className="text-sm text-black uppercase">
              {product.category}
            </p>

            <h1 className="text-4xl font-bold mt-2">
              {product.name}
            </h1>

            <p className="text-black font-bold mt-4 leading-relaxed">
              {product.desc}
            </p>

            <div className="mt-5">
              <span className="text-3xl font-bold text-black-600">
                ₹{product.price}
              </span>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-yellow-500 text-xl">
                ⭐
              </span>
              <span className="font-semibold">
                {product.rating}
              </span>
            </div>

            <div className="mt-4">
              <p>
                <span className="font-semibold">
                  Brand:
                </span>{" "}
                {product.brand}
              </p>

              <p>
                <span className="font-semibold">
                  Stock:
                </span>{" "}
                <span className="text-blue-600">Available</span>
              </p>
            </div>
              
            </div>

            <div className="flex gap-4 mt-8">
              <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold">
                Add To Cart
              </button>

              <button className="bg-black hover:bg-gray-800 text-white px-6 py-3 rounded-lg font-semibold">
                Buy Now
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProductDetails;