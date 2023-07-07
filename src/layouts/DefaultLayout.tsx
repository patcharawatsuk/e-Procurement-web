import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { selectAuthState, setAuthState } from '@store/authSlice';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps): JSX.Element => {
  return (
    <>
      {/* <CssBaseline /> */}
      <Topbar />
      <Sidebar />
      <div className="fe-page-container">
        <div id="pageContent" className="op-content-wrap">
          {children}
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
