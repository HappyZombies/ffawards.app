import Home from "../../components/Home";
import Dashboard from "../../components/Dashboard";
import Demo from "../../components/Demo";
import Callback from "../../components/Callback";
import Error from "../../components/Error";
import Awards from "../../components/Awards";
import About from "../../components/About";
import Settings from "../../components/Settings";
import Changelog from "../../components/Changelog";
import Privacy from "../../components/Privacy";
import SleeperLogin from "../../components/SleeperLogin";
import ESPNLogin from "../../components/ESPNLogin";

export const ROUTES = [
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/sleeper",
    element: <SleeperLogin />,
  },
  {
    path: "/espn",
    element: <ESPNLogin />,
  },
  {
    path: "/demo",
    element: <Demo />,
  },
  {
    path: "/dashboard/leagues/:league_key/awards",
    element: <Awards />,
  },
  {
    path: "/settings",
    element: <Settings />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/changelog",
    element: <Changelog />,
  },
  {
    path: "/privacy",
    element: <Privacy />,
  },
  {
    path: "/callback",
    element: <Callback />,
  },
  {
    path: "/error",
    element: <Error />,
  },
];
