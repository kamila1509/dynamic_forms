import { LoadingIndicator, LocalesMenuButton } from 'react-admin';
import * as React from 'react';
import { ThemeSwapper } from '../themes/ThemeSwapper';
import { Typography } from '@mui/material';
import useUserStore from '../store/userStore';

export const AppBarToolbar = () => {
    const userName = useUserStore.getState().user?.displayName
   return (
    <>
    <LocalesMenuButton />
    <ThemeSwapper />
    <LoadingIndicator />
    <Typography>{userName}</Typography>
</>
   )
};
