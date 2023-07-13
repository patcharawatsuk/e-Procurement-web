import { useSelector } from 'react-redux';
import { selectAuthState } from '../store/authSlice';
import UnAuthApp from '../components/UnAuthApp';
import { useRouter } from 'next/router';

function withAuth(Component: any) {
  function AuthenticatedComponent(props: any) {
    const isAuthenticated = useSelector(selectAuthState);
    const router = useRouter();
    const currentUrl = router.asPath;
    if (!isAuthenticated && currentUrl !== '/') {
      router.push('/');
      return <></>
    } else {
      return isAuthenticated ? <Component {...props} /> : <UnAuthApp/>;
    }
  }
  return AuthenticatedComponent;
}

export default withAuth;
