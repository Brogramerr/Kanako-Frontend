import * as Yup from 'yup';
import { useState } from 'react';
// next
import NextLink from 'next/link';
// form
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
// @mui
import { Link, Stack, Alert, IconButton, InputAdornment } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// routes
import { PATH_AUTH } from '../../../routes/path';
// hooks
import useError from '../../../hooks/useError';
import useIsMountedRef from '../../../hooks/useisMountedRef';
// components
import Iconify from '../../../components/Iconify';
import { FormProvider, RHFTextField } from '../../../components/hook-form';

// store
import { useAuth } from '../../../zustand/store';

// ----------------------------------------------------------------------

export default function LoginForm() {
    const isMountedRef = useIsMountedRef();

    const [showPassword, setShowPassword] = useState(false);

    // get state context
    const { login, auth } = useAuth();

    const { error, loading, clearError } = auth;
    //const isLoading = useAuth();

    const LoginSchema = Yup.object().shape({
        email: Yup.string().required('MKAN ID is required'),
        password: Yup.string().required('Password is required'),
    });

    const defaultValues = {
        email : '',
        password: '',
    };

    const methods = useForm({
        resolver: yupResolver(LoginSchema),
        defaultValues,
    });

    // hook to handle error from login
    useError(error, clearError);

    const {
        reset,
        setError,
        handleSubmit,
        formState: { errors },
    } = methods;

    const onSubmit = async (data) => {
        try {
            // await login(data);
            login(data);
        } catch (_error) {
            console.log(_error);
            console.log(error.response);
            reset();    
            if (isMountedRef.current) {
                setError('afterSubmit', { ..._error, message: _error.message });
            }
        }
    };

    /**
     * All props including errors from here are passed down to the childComponent without actually
     * passing props down to the childComponent.
     * The ChildComponent in this case which would be `RHFTextField` access this props
     * using `useFormContext` provided by react-hook-form
     * This is how `RHFTextField` access the errors from here and displays them when there is one
     * This way, we don't have to handle input error validations message here
     * */

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={3}>
                {!!errors.afterSubmit && <Alert severity="error">{errors.afterSubmit.message}</Alert>}
                

                <RHFTextField name="email" label="Email" />

                <RHFTextField
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                                    <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
            </Stack>

            <Stack direction="row" alignItems="center" justifyContent="flex-end" sx={{ my: 2 }}>
                <NextLink href={PATH_AUTH.forgotPassword} passHref>
                    <Link variant="subtitle2">Forgot password?</Link>
                </NextLink>
            </Stack>

            <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={loading}>
                Login
            </LoadingButton>
        </FormProvider>
    );
}
