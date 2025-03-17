import Home from "../views/home";
import ContactUs from '../views/contactUs';
import IndividualService from "../views/individualService";
import AboutUs from '../views/aboutUs';
import Payment from '../components/Shop/Payment';
import Team from "../components/Team/Team";
import Shop from "../components/Shop/Shop";



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
    component: IndividualService,
    to: '/individualService'
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
  
  ];

export default routes;
