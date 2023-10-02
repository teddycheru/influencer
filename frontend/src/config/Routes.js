import { Routes, Route, BrowserRouter } from 'react-router-dom'

import Login from '../pages/Login'
import SignUp from '../pages/SignUp'
import Home from '../pages/Home'
import CreatePostPage from '../pages/CreatePostPage'
import Settings from '../pages/Settings'
import Account from '../pages/Account'
import Notifications from '../pages/Notifications'
import PrivacyPolicy from '../pages/LandingPageCom/PrivacyPolicyPage'
import TermsOfUse from '../pages/LandingPageCom/TermsOfUse'
import AboutUs from '../pages/LandingPageCom/AboutUs'
import ContactUs from '../pages/LandingPageCom/ContactUs'
import UserSupport from '../pages/LandingPageCom/UserSupport'
import PrivateWrapper from './PrivateRoutes'
import ScrollToTop from './ScrollToTop'
import Faq from '../pages/LandingPageCom/Faq'
import MyLanding from '../pages/LandingPageCom/LandingPage'
import PasswordUpdatePage from '../components/PageComponents/PasswordUpdate';
const Routers = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route element={<PrivateWrapper />}>
          <Route path='/home' element={<Home />} />
          <Route path='/create-post' element={<CreatePostPage />} />
          <Route path='/account-details' element={<Account />} />
          <Route path='/setting' element={<Settings />} />
          <Route path='/notifications' element={<Notifications />} />
          <Route path="/change-password" element={<PasswordUpdatePage />} />
        </Route>
        <Route path='/' element={<MyLanding />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
        <Route path='/privacy' element={<PrivacyPolicy />} />
        <Route path='/terms' element={<TermsOfUse />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/contact' element={<ContactUs />} />
        <Route path='/support' element={<UserSupport />} />
        <Route path='/faqs' element={<Faq />} />
      </Routes>
    </BrowserRouter>
  )
}

export default Routers
