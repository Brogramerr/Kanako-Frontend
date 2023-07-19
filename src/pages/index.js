import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { PATHS } from '../routes/path';

// ----------------------------------------------------------------------

export default function Index() {
    const router = useRouter();

    useEffect(() => {
        if (router.pathname === '/') {
            router.push(PATHS.root);
        }
    });

    return null;
}
