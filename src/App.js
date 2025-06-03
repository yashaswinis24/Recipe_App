import './App.css';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home/Home";
import Favourites from './components/Favourites';
import Recipe from './components/recipe/Recipes';
import Login from './components/login/Login';
import Signup from './components/login/SignUp';
import Logout from './components/login/Logout';
import Header from "./components/header/Header";
import Footer from "./components/Footer";
import CuisineRecipes from "./components/recipe/cuisineRecipes";
import { AuthProvider } from './context/authContext';

function AppContent() {
  const location = useLocation();
  const hideHeaderRoutes = ["/login", "/signup"];
  const hideFooterRoutes=["/login","/signup"];
  return (
    <>
      {!hideHeaderRoutes.includes(location.pathname) && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/favourites' element={<Favourites />} />
        <Route path='/recipe/:id' element={<Recipe />} />
        <Route path="/cuisine/:cuisineType" element={<CuisineRecipes />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/logout' element={<Logout />} />
        
        <Route path='*' element={<Home />} />
      </Routes>
      {!hideFooterRoutes.includes(location.pathname) &&<Footer/>}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
}

export default App;
