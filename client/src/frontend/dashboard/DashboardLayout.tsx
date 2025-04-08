import "bootstrap";
import "../../assets/js/dashboard/jquery.min.js";
import "../../assets/js/dashboard/admin.min.js";
import "../../assets/css/dashboard/admin.min.css";
import "../../assets/css/dashboard/style.css";

import DashboardSidebar from "./DashboardSidebar";
import DashboardTopBar from "./DashboardTopBar";
import DashboardFooter from "./DashboardFooter";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <div id="page-top">
      {/* <!-- Page Wrapper --> */}
      <div id="wrapper">
        {/* <!-- Sidebar --> */}
        <DashboardSidebar />
        {/* <!-- End of Sidebar --> */}

        {/* <!-- Content Wrapper --> */}
        <div id="content-wrapper" className="d-flex flex-column">
          {/* <!-- Main Content --> */}
          <div id="content">
            {/* <!-- Topbar --> */}
            <DashboardTopBar />
            {/* <!-- End of Topbar --> */}

            {/* <!-- Begin Page Content --> */}
            <div className="container-fluid">
              <Outlet />
            </div>
            {/* <!-- End of Main Content --> */}

            {/* <!-- Footer --> */}
            <DashboardFooter />
            {/* <!-- End of Footer --> */}
          </div>
          {/* <!-- End of Content Wrapper --> */}
        </div>

        <a className="scroll-to-top rounded" href="#page-top">
          <i className="fas fa-angle-up"></i>
        </a>
      </div>
    </div>
  );
};

export default DashboardLayout;
