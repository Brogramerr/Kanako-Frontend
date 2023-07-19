import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';
// next
import { useRouter } from 'next/router';

// hooks
import useError from '../hooks/useError';

// components
import Login from '../pages/auth/login';
import LoadingScreen from '../components/LoadingScreen';

// utils
import { getSession, isValidToken, setSession } from '../utils/jwt';

// store
import { useAuth } from '../zustand/store';

// routes
import { PATH_AUTH } from '../routes/path';

// ----------------------------------------------------------------------

AuthGuard.propTypes = {
    children: PropTypes.node,
};

export default function AuthGuard({ children }) {
    const router = useRouter();
    const store = useAuth();

    const { auth, getCurrentUser } = store;

    const { error, clearError, setIsInitialized, token, loading, isInitialized, isAuthenticated, user } = auth;

    const { pathname, push } = useRouter();

    const [requestedLocation, setRequestedLocation] = useState(null);

    useEffect(() => {
        const initialize = async () => {
            // initialize application
            setIsInitialized();

            const accessToken = getSession();

            if (accessToken && isValidToken(accessToken)) {
                setSession(accessToken);

                getCurrentUser();
            }
        };

        initialize();

        // eslint-disable-next-line
    }, []);

    useError(error, clearError);

    useEffect(() => {
        if (requestedLocation && pathname !== requestedLocation) {
            setRequestedLocation(null);
            push(requestedLocation);
        }
    }, [pathname, push, requestedLocation]);

    useEffect(() => {
        // added router.pathname check because of reset-password page
        if (isInitialized && !loading && !token) {
            router.push(PATH_AUTH.login);
        }

        // eslint-disable-next-line
    }, [token, isInitialized, loading]);

    if (!isInitialized) {
        return <LoadingScreen />;
    }

    if (!isAuthenticated && !user) {
        if (pathname !== requestedLocation) {
            setRequestedLocation(pathname);
        }
        return <Login />;
    }

    return <>{children}</>;
}
