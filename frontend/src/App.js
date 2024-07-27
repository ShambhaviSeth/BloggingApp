import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Base from './Components/Base';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import About from "./Pages/About";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserDashboard from './Pages/user-routes/UserDashboard';
import PrivateRoutes from './Components/PrivateRoutes';
import ProfileInfo from './Pages/user-routes/ProfileInfo';
import PostPage from './Pages/PostPage';
import UserProvider from './context/UserProvider';
import Categories from './Pages/Categories';
import UpdateBlog from './Pages/UpdateBlog';

function App() {
  return (
    <UserProvider>
      <BrowserRouter>
      <ToastContainer />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/login' element={<Login />}/>
        <Route path='/signup' element={<Signup />}/>
        <Route path='/about' element={<About />}/>
        <Route path='/posts/:postId' element={<PostPage />}/>
        <Route path='/categories/:categoryId' element={<Categories />}/>
        <Route path='/user' element={<PrivateRoutes />}>
          <Route path='dashboard' element={<UserDashboard />}/>
          <Route path='profile-info/:userId' element={<ProfileInfo />}/>
          <Route path='update-blog/:blogId' element={<UpdateBlog />}/>
        </Route>
      </Routes>
    </BrowserRouter>
    </UserProvider>
  );
}

export default App;
