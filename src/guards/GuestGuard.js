import PropTypes from 'prop-types';
import { useEffect } from 'react';
// next
import { useRouter } from 'next/router';
// hooks
// routes
import { PATHS } from '../routes/path';
import { useAuth } from '../zustand/store';

// ----------------------------------------------------------------------

GuestGuard.propTypes = {
    children: PropTypes.node,
};

export default function GuestGuard({ children }) {
    const { push } = useRouter();

    const {
        auth: { isAuthenticated },
    } = useAuth();

    useEffect(() => {
        if (isAuthenticated) {
            push(PATHS.root);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return <>{children}</>;
}
