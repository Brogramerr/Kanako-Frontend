import React from 'react';
// @mui
import { CardActionArea } from '@mui/material';
// components
import useSettings from '../../../hooks/useSettings';
import Iconify from '../../../components/Iconify';
import { styled } from '@mui/material/styles';

// ----------------------------------------------------------------------

const BoxStyle = styled(CardActionArea)(({ theme }) => ({
    height: 72,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 10,
    color: theme.palette.text.disabled,
    border: `solid 1px ${theme.palette.grey[500_12]}`,
    borderRadius: Number(theme.shape.borderRadius) * 1.25,
}));

// ----------------------------------------------------------------------

export default function DarkMode() {
    const { themeMode, onToggleMode } = useSettings();

    return (
        <>
            <BoxStyle
                sx={{
                    width: 50,
                    height: 50,
                }}
                onClick={onToggleMode}
            >
                <Iconify
                    icon={themeMode === 'light' ? 'ph:moon-duotone' : 'ph:sun-duotone'}
                    width={20}
                    height={20}
                    sx={{ color: themeMode === 'dark' ? 'white' : '' }}
                />
            </BoxStyle>
        </>
    );
}
