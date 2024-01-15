import { Outlet, Link } from "react-router-dom";
import Header from "../components/Header";
import './style/Layout.css'

const Layout = () => {
  return (
    <>
      <Header></Header>

      <div id="boxing">
        <Outlet />
      </div>
    </>
  )
};

export default Layout;