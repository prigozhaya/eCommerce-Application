import { Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Footer from './components/footer';
import NavBar from './components/navBar';
import {
  StyledPageWrapper,
  StyledRoutes,
} from './components/routerWrapper/style';
import Catalog from './pages/catalog';
import { CustomerProfile } from './pages/customerProfile';
import Login from './pages/login';
import Logout from './pages/logout';
import NotFound from './pages/notFound';
import Registration from './pages/registration';
import Welcome from './pages/welcome';

export default function App() {
  return (
    <StyledPageWrapper>
      <NavBar />
      <StyledRoutes>
        <Route path="/" element={<Welcome />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/profile" element={<CustomerProfile />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/catalog" element={<Catalog />} />
        <Route path="*" element={<NotFound />} />
      </StyledRoutes>
      <ToastContainer />
      <Footer />
    </StyledPageWrapper>
  );
}
