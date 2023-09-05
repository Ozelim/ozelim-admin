import { Layout } from "shared/ui";
import { Footer } from "widgets/Footer";
import { Header } from "widgets/Header";
import { Sidebar } from "widgets/Sidebar";

export const baseLayout = (
  <Layout
    sidebarSlot={<Sidebar/>}
    headerSlot={<Header/>}
  />
)