import { createBrowserRouter } from "react-router-dom";
import {
  About,
  Bids,
  CharityFund,
  Courses,
  Health,
  Home,
  News,
  OurTeam,
  Partners,
  Profile,
  Program,
  Resort,
  Resorts,
  Price,
  NotFound,
  Login,
  Withdraws,
  Users,
  MoneyFlow,
  Binary,
  Construct,
  Levels,
  AboutKz,
  CharityFundKz,
} from "pages";
import { baseLayout } from "./layouts/baseLayout";
import { PartnersTest } from "pages/partners/PartnersTest";
import { SwitchLayout } from "shared/ui";

const appRouter = createBrowserRouter([
  {
    element: baseLayout,
    children: [
      { path: "/", element: <Home /> },
      { path: "/charity-fund", element: <SwitchLayout ru={<CharityFund/>} kz={<CharityFundKz/>} /> },
      { path: "/profile", element: <Profile /> },
      { path: "/bids", element: <Bids /> },
      { path: "/health", element: <Health /> },
      { path: "/our-team", element: <OurTeam /> },
      { path: "/news", element: <News /> },
      { path: "/partners", element: <Partners /> },
      { path: "/price", element: <Price /> },
      { path: "/program", element: <Program /> },
      { path: "/resort/:id", element: <Resort /> },
      { path: "/resorts", element: <Resorts /> },
      { path: "/courses", element: <Courses /> },
      { path: "/about", element: <SwitchLayout ru={<About/>} kz={<AboutKz/>} /> },
      { path: "/login", element: <Login /> },
      { path: "/withdraws", element: <Withdraws /> },
      { path: "/users", element: <Users /> },
      { path: "/money-flow", element: <MoneyFlow /> },
      { path: "/binary", element: <Binary /> },
      { path: "/construct", element: <Construct /> },
      { path: "/Levels", element: <Levels /> },

      { path: "*", element: <NotFound /> },
    ],
  },
]);

export { appRouter };
