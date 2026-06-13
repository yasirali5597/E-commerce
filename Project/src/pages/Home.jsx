import React from "react";
import Navbar from "../components/Navbar";
import CategoryMenu from "../components/CategoryMenu";
import FoodItems from "../components/FoodItems";
import Cart from '../components/Cart.jsx';
import Footer from "../components/footer.jsx";




const Home=()=>{
    return(
      <>
      <Navbar/>
      <CategoryMenu/>
      <FoodItems/>
      <Cart />  
      <Footer className="mt-0 "/>
      </>
    )
}
export default Home;




