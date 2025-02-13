import { createBrowserRouter } from "react-router-dom";
import {
  About,
  Bids,
  CharityFund,
  Home,
  News,
  OurTeam,
  Program,
  Resort,
  Resorts,
  Price,
  NotFound,
  Login,
  Withdraws,
  Users,
  Binary,
  Construct,
  Levels,
  AboutKz,
  CharityFundKz,
  OurTeamKz,
  NewsKz,
  ConstructKz,
  PriceKz,
  ProgramKz,
  HomeKz,
  Services,
  Replenish,
  Bonuses,
  Tester,
  ProfileCourses,
  Fund,
  HealthWorld,
  Tours,
  Rights,
  Dual,
  HealthWorldKz,
  FundKz,
  DualKz,
  Agents,
  AgentsBids,
  Tourist,
  Partners,
  Marketsers,
  Shops,
  Categories,
  Products,
  AllShops,
  Chat,
  TouristKz
} from "pages";
import { baseLayout } from "./layouts/baseLayout";
import { SwitchLayout } from "shared/ui";

const appRouter = createBrowserRouter([
  {
    element: baseLayout,
    children: [
      { path: "/", element: <SwitchLayout ru={<Home/>} kz={<HomeKz/>} /> },
      { path: "/insurance", element: <SwitchLayout ru={<CharityFund/>} kz={<CharityFundKz/>} /> },
      { path: "/bids", element: <Bids /> },
      { path: "/our-team", element: <SwitchLayout ru={<OurTeam/>} kz={<OurTeamKz/>} /> },
      { path: "/news", element: <SwitchLayout ru={<News/>} kz={<NewsKz/>} /> },
      { path: "/price", element: <SwitchLayout ru={<Price/>} kz={<PriceKz/>} /> },
      { path: "/program", element: <SwitchLayout ru={<Program/>} kz={<ProgramKz/>} /> },
      { path: "/resort/:id", element: <Resort /> },
      { path: "/resorts", element: <Resorts /> },
      { path: "/about", element: <SwitchLayout ru={<About/>} kz={<AboutKz/>} /> },
      { path: "/login", element: <Login /> },
      { path: "/withdraws", element: <Withdraws /> },
      { path: "/partners", element: <Partners /> },
      { path: "/binary", element: <Binary /> },
      { path: "/construct", element: <SwitchLayout ru={<Construct/>} kz={<ConstructKz/>} /> },
      { path: "/Levels", element: <Levels /> },
      { path: "/services", element: <Services /> },
      { path: "/replenish", element: <Replenish /> },
      { path: "/bonuses", element: <Bonuses /> },
      { path: "/tester", element: <Tester /> },
      { path: "/profile-courses", element: <ProfileCourses /> },
      { path: "/fund", element: <SwitchLayout ru={<Fund />} kz={<FundKz/>}/> },
      { path: "/health-world", element: <SwitchLayout ru={<HealthWorld/>} kz={<HealthWorldKz/>}/> },
      { path: "/tours", element: <Tours /> },
      { path: "/rights", element: <Rights /> },
      { path: "/agents", element: <Agents /> },
      { path: "/users", element: <Users /> },
      { path: "/tourist", element: <SwitchLayout ru={<Tourist/>} kz={<TouristKz/>}/>},
      { path: "/agents-bids", element: <AgentsBids /> },
      { path: "/dual", element: <SwitchLayout ru={<Dual />} kz={<DualKz/>} /> },
      { path: "*", element: <NotFound /> },
      
      { path: '/duken', children: [
        { path: 'users', element: <Marketsers/>},
        { path: 'shops', element: <Shops/>},
        { path: 'categories', element: <Categories/>},
        { path: 'products', element: <Products/>},
        { path: 'all-shops', element: <AllShops/>},
        { path: 'chat', element: <Chat/>},
      ]}
    ],
  },
]);

export { appRouter };