import PropTypes from 'prop-types';
// components
import DashboardLayout from './dashboard';
import LogoOnlyLayout from './LogoOnlyLayout';
import AuthGuard from '../guards/AuthGuard';

// ----------------------------------------------------------------------

Layout.propTypes = {
    children: PropTypes.node.isRequired,
    variant: PropTypes.oneOf(['dashboard', 'main', 'logoOnly']),
};

export default function Layout({ variant = 'dashboard', children }) {
    if (variant === 'logoOnly') {
        return <LogoOnlyLayout> {children} </LogoOnlyLayout>;
    }

    return (
        <AuthGuard>
            <DashboardLayout> {children} </DashboardLayout>
        </AuthGuard>
    );
}
