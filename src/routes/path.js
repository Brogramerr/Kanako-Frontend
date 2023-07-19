const path = (root, sublink) => `${root}${sublink}`;

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_EXAMINATION = '/examinations';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    root: ROOTS_AUTH,
    login: path(ROOTS_AUTH, '/login'),
    forgotPassword: path(ROOTS_AUTH, '/forgot-password'),
};

export const PATHS = {
    root: ROOTS_DASHBOARD,
    examination: {
        root: ROOTS_EXAMINATION,
        edit: (id) => path(ROOTS_EXAMINATION, `/${id}/edit`),
        single: path(ROOTS_EXAMINATION, '/${id}'),
    },
};
