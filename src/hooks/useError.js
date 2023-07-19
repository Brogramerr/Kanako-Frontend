import { useEffect, useRef } from 'react';
import { useSnackbar } from 'notistack';

const useError = (error, errorHandler) => {
    const clearError = useRef(() => {});
    const { enqueueSnackbar } = useSnackbar();

    clearError.current = errorHandler;

    useEffect(() => {
        if (error) {
            enqueueSnackbar(error, { variant: 'error' });
            clearError.current();
        }

        // eslint-disable-next-line
    }, [error]);
};

export default useError;
