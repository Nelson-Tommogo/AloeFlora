import Home from "../views/home";
import ContactUs from '../views/contactUs';
import AboutUs from '../views/aboutUs';
import Payment from '../components/Shop/Payment';
import Team from "../components/Team/Team";
import Shop from "../components/Shop/Shop";
import blogs from "../components/Blog/data";
import Blog from "../components/Blog/blog";



const routes = [
  {
    component: Home, 
    to: '/'
  },

  {
    component: ContactUs,
    to: '/contactUs'
  },

  {
    component: AboutUs,
    to: '/aboutUs'
  },
  {
    component: Shop,
    to: '/Shop'
  },
{
      component: Payment, 
      to: '/Payment'
    },
    {
      component: Team,
      to: '/team'
    },
    {
      component: Blog,
      to: '/blogs'
    },
  
  ];

export default routes;
