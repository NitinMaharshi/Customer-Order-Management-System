import { Fragment } from 'react';
import { Outlet } from 'react-router-dom';

//importing some required component
import Layout from './Layout';

function DashboardLayout() {
  //meta title
  document.title = 'Dashboard';

  return (
    <Fragment>
      <Layout>
        <Outlet />
      </Layout>
    </Fragment>
  );
}

export default DashboardLayout;