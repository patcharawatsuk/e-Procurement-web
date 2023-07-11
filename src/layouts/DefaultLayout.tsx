import { ReactNode } from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Sidebar from '../components/Sidebar';
import Topbar from '../components/Topbar';
import { useDispatch, useSelector } from 'react-redux';
import { selectAuthState, setAuthState } from '@store/authSlice';

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps): JSX.Element => {
  const authState = useSelector(selectAuthState);
  return (
    <>
      {/* <CssBaseline /> */}
      <Topbar />
      {authState && <Sidebar />} 
      <div className="fe-page-container">
        <div id="pageContent" className="op-content-wrap">
          {children}
        </div>
      </div>
    </>
  );
};

export default DefaultLayout;
