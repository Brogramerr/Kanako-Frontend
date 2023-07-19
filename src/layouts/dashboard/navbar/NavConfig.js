// components
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
    // user: getIcon('ic_user'),
    // ecommerce: getIcon('ic_ecommerce'),
    // analytics: getIcon('ic_analytics'),
    dashboard: getIcon('ic_dashboard'),
};

const sidebarConfig = [
    // GENERAL
    // ----------------------------------------------------------------------
    {
        subheader: 'Dashboard',
        items: [{ title: 'Dashboard', path: '/dashboard', icon: ICONS.dashboard }],
    },

    // MANAGEMENT
];

export default sidebarConfig;
