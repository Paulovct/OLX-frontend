import { BrowserRouter, Route, Routes } from "react-router-dom"


//style
import "./App.css";

//Components
import { Template } from "./components/MainComponents";
import Header from "./components/Header";
import Footer from "./components/Footer";

//Pages
import  Home  from "./pages/Home";
import  About  from "./pages/About";
import Signin from "./pages/Signin"
import Signup from "./pages/Signup";
import AdPage from "./pages/AdPage";
import MyAccount from "./pages/MyAccount"
import PostAnAd from "./pages/PostAnAd";
import Ads from "./pages/Ads";
import NotFound from "./pages/NotFound"
//helpers
import { isLoged } from "./helpers/AuthHandler";


const App = (  )=>{

  let logged = isLoged();

  return(
    <BrowserRouter>

      <Template>
        
        <Header />
          

        <Routes>
          <Route path="/" element={ < Home /> } />
          <Route path="/about" element={<About />} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/ad/:id" element={<AdPage/>} />
          <Route path="/ads" element={<Ads/>} />
          <Route path="/my-account" element={logged ? <MyAccount/> : <Signin/>} />
          <Route path="/post-an-ad" element={logged ? <PostAnAd/> : <Signin/>} />
          <Route path="*" element={<NotFound/>} />
        </Routes>
      
        <Footer />
      
      </Template>


    </BrowserRouter>
  );  
}

export default App;