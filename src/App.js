import './App.css';
import { Routes , Route } from 'react-router-dom';
import { Suspense, lazy, useEffect , useState } from 'react';
import Nav from './components/navbar/js/NavBar';
import HomePage from './pages/home-page/js/HomePage';
import Footer from './components/footer/js/Footer';
import Notfication from './components/notfication/js/Notfication';
import DeletingAskPopub from './components/deleting-ask-popub/js/DeletingAskPopub';
import AlreadyAddedPopub from './components/already-added-popub/js/AlreadyAdedd.popub';
import cursorImg from "./media/images/Cursor free vector icons designed by Freepik.png";
import Loading from './components/loading/js/Loading';
import LoginPopub from './components/login-popub/js/LoginPopub';
let CartPage = lazy(()=> import('./pages/cart-pages/js/CartPage'));
let WishListPage = lazy(()=> import("./pages/wishlist-page/js/WishListPage"));
let AboutPage = lazy(()=> import("./pages/about-page/js/AboutPage"));
let BlogPage = lazy(()=> import("./pages/blog-page/js/BlogPage"));
let ContactPage = lazy(()=> import("./pages/contact-page/js/ContactPage"));
let RegisterPage = lazy(()=> import("./pages/register-page/js/RegisterPage"));
let LogInPage = lazy(()=> import("./pages/log-in-page/js/LogInPage"));
let ProductDetailsPage = lazy(()=> import("./pages/product-details-page/js/ProductDetailsPage"));
let AirPodsPage = lazy(()=> import("./pages/airpods-page/js/AirPodsPage"));
let AcsesoriesPage = lazy(()=> import("./pages/acsesories-page/js/AcsesoriesPage"));
let SmartWatchPage = lazy(()=> import("./pages/smart-watch-page/js/SmartWatchPage"));
let ApplePage = lazy(()=> import("./pages/apple-page/js/ApplePage"));
let LaptopsPage = lazy(()=> import("./pages/laptops-page/js/LaptopsPage"));
let LCDScreenPage = lazy(()=> import("./pages/LCD-page/js/LCDSreenPage"));
let SofaPage = lazy(()=> import("./pages/sofa-page/js/SofaPage"));
let ChairPage = lazy(()=> import("./pages/chair-page/js/ChairPage"));
let TablePage = lazy(()=> import("./pages/table-page/js/TablePage"));
let DecorPage = lazy(()=> import("./pages/decor-page/js/DecorPage"));
let MensPage = lazy(()=> import("./pages/fashion-pages/mens-fashion-page/js/MensPage"));
let WomensPage = lazy(()=> import("./pages/fashion-pages/womens-fashion-page/js/womensPage"));
let KidsPage = lazy(()=> import("./pages/fashion-pages/kids-fashion-page/js/kidsPage"));

function App() {
  const globalStyles = {
    cursor: 'none',
  };
  const [isLoading, setIsLoading] = useState(true);
  useEffect(()=>{
    let navbar = document.querySelector(".navbar");
    let toTopBtn = document.querySelector(".to-top-btn");

    window.onscroll = ()=>{
      window.scrollY >= 10 
      ?
      navbar.classList.add("on-scrolling")
      :
      navbar.classList.remove("on-scrolling")

      window.scrollY >= 100 
      ?
      toTopBtn.classList.add("active")
      :
      toTopBtn.classList.remove("active");
      
    }
    var element = document.querySelector(".movableElement");
    var shadow = document.querySelector(".movableElement > span");
    function updateElementPosition(event) {
      var mouseX = event.clientX;
      var mouseY = event.clientY;
      element.style.left = mouseX + "px";
      element.style.top = mouseY + "px";
    }
    document.addEventListener("mousemove", updateElementPosition);
    document.addEventListener("scroll", updateElementPosition);
    window.onclick = ()=>{
      shadow.classList.toggle("clicked");
      setTimeout(()=>{
        shadow.classList.remove("clicked")
      },500);
      window.onload = ()=> setIsLoading(false);
    }
  },[]);
  return (
    <>
          <div style={globalStyles}>
        <Nav/>
        <Suspense fallback={<Loading/>}>
          <Routes>
            <Route path='/' element={<HomePage/>}/>
            <Route path='cart' element={<CartPage/>}/>
            <Route path='wishlist' element={<WishListPage/>}/>
            <Route path='about' element={<AboutPage/>}/>
            <Route path='blog' element={<BlogPage/>}/>
            <Route path='contact' element={<ContactPage/>}/>
            <Route path='register' element={<RegisterPage/>}/>
            <Route path='log-in' element={<LogInPage/>}/>
            <Route path='register/log-in' element={<LogInPage/>}/>
            <Route path='cart/register' element={<RegisterPage/>}/>
            <Route path='log-in/register' element={<RegisterPage/>}/>
            <Route path='airpods' element={<AirPodsPage/>}/>
            <Route path='cart/airpods' element={<AirPodsPage/>}/>
            <Route path='acsesories' element={<AcsesoriesPage/>}/>
            <Route path='smart-watch' element={<SmartWatchPage/>}/>
            <Route path='apple-phone' element={<ApplePage/>}/>
            <Route path='laptops-page' element={<LaptopsPage/>}/>
            <Route path='lcd-screen-page' element={<LCDScreenPage/>}/>
            <Route path='sofa-page' element={<SofaPage/>}/>
            <Route path='chair-page' element={<ChairPage/>}/>
            <Route path='table-page' element={<TablePage/>}/>
            <Route path='decor-page' element={<DecorPage/>}/>
            <Route path='mens-page' element={<MensPage/>}/>
            <Route path='womens-page' element={<WomensPage/>}/>
            <Route path='kids-page' element={<KidsPage/>}/>
            <Route path='/:productCategory/productdetails/:id' element={<ProductDetailsPage/>}/>
            <Route path='/:path/:productCategory/productdetails/:id' element={<ProductDetailsPage/>}/>
          </Routes>
        </Suspense>
        <Footer/>
        <button className='to-top-btn' onClick={()=>{
            window.scrollTo({
              top: 0,
              behavior: 'smooth'
            });
        }}>
          <i className="fa-solid fa-arrow-right"></i>
        </button>
        <DeletingAskPopub/>
        <Notfication />
        <AlreadyAddedPopub/>
        <Loading loading={isLoading}/>
        <LoginPopub/>
      </div>
      <div className='movableElement'>
          <span></span>
          <img src={cursorImg} alt=''/>
      </div>
    </>

  );
}

export default App;
