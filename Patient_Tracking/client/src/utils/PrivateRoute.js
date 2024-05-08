import { Outlet, Navigate } from 'react-router-dom';
import { useCookies, Cookies } from 'react-cookie';

const PrivateRoute = () => {
    const [ cookies, setCookies, rmCookies ] = useCookies(['user-auth']);

    let auth = (cookies['user-auth']) ? true : false;
    
    return (
        auth ? <Outlet/> : <Navigate to="/" />
    )
}

export default PrivateRoute;
