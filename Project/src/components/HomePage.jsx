import React from "react";
import IconsBtn from "../comman/IconBtn";

const HomePage = () => {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      price: "₹1,999",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
    },
    {
      id: 2,
      name: "Smart Watch",
      price: "₹2,499",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30",
    },
    {
      id: 3,
      name: "Laptop",
      price: "₹49,999",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    },
    {
      id: 4,
      name: "Gaming Mouse",
      price: "₹999",
      image: "https://images.unsplash.com/photo-1527814050087-3793815479db",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-black text-white">
        <div className="max-w-7xl mx-auto px-6 py-24 flex flex-col items-center text-center">
          <h1 className="text-5xl font-bold mb-4">
            Shop Smart, Live Better
          </h1>
          <p className="text-lg text-gray-300 mb-6">
            Discover the latest products at unbeatable prices.
          </p>
          {/* <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 transition">
            Shop Now
          </button> */}
           <IconsBtn
            text="shop More" 
            onClick={() => console.log("clicked the buttons ")}
            ></IconsBtn> 
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Shop By Category
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {["Electronics", "Fashion", "Shoes", "Accessories"].map(
            (category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md text-center hover:shadow-xl transition cursor-pointer"
              >
                <h3 className="font-semibold text-lg">{category}</h3>
              </div>
            )
          )}
        </div>
      </section>

      {/* Products */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 text-center">
          Featured Products
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition"
            >
              <img
                src={product.image}
                alt={product.name}
                className="h-56 w-full object-cover"
              />

              <div className="p-4">
                <h3 className="font-semibold text-lg">
                  {product.name}
                </h3>

                <p className="text-green-600 font-bold mt-2">
                  {product.price}
                </p>

                <button className="w-full mt-4 bg-black text-white py-2 rounded-lg hover:bg-gray-800">
                  Add To Cart
                </button>

                {/* <IconsBtn
                  text="Learn More" 
                  onClick={() => console.log("clicked the buttons ")}
                  ></IconsBtn> */}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Offer Banner */}
      <section className="bg-yellow-400 py-16 mt-12">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-3">
            50% OFF Summer Sale
          </h2>
          <p className="text-lg">
            Limited Time Offer. Grab your favorite products now.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <h3 className="text-xl font-bold">ShopHub</h3>
          <p className="text-gray-400 mt-2">
            © 2026 All Rights Reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;