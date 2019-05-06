// @material-ui/icons
import Dashboard from "@material-ui/icons/Dashboard";
import LocationOn from "@material-ui/icons/LocationOn";
import Person from "@material-ui/icons/Person";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import ServicePage from "views/Service/Service.jsx";
import UserProfile from "views/UserProfile/UserProfile.jsx";
import RegisterPage from "views/RegisterPage/RegisterPage.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/service",
    name: "Find Service",
    icon: LocationOn,
    component: ServicePage,
    layout: "/admin"
  },
  {
    path: "/user/:userId",
    name: "User",
    icon: Person,
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/updateProfile",
    name: "Update Profile",
    icon: Person,
    component: RegisterPage,
    layout: "/admin"
  }
];

export default dashboardRoutes;
