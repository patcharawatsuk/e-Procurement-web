import { useSelector } from 'react-redux';
import { selectAuthState } from '../store/authSlice';
import UnAuthApp from '../components/UnAuthApp';
import { useRouter } from 'next/router';

function withAuth(Component: any) {
  const router = useRouter();
  const currentUrl = router.asPath;

  function AuthenticatedComponent(props: any) {
    const isAuthenticated = useSelector(selectAuthState);
    if (!isAuthenticated && currentUrl !== '/') {
      router.push('/');
    } else {
      return isAuthenticated ? <Component {...props} /> : <UnAuthApp/>;
    }
  }
  return AuthenticatedComponent;
}

export default withAuth;
