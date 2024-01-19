import { Box, Grid, Paper, Typography } from '@mui/material';
import { FC } from 'react';
import { LayoutContainerStyles } from './layout.styles';
import { Outlet } from 'react-router-dom';

const Content = () => {
  return <Outlet />;
};

export const Layout: FC = () => {
  return (
    <Paper elevation={3} >
      <LayoutContainerStyles maxWidth={false}>
        <Grid container spacing={2} flexDirection="column" flexWrap="nowrap" sx={{ height: '100%' }}>
          <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center' }} >
            <Typography variant="h2">World Cups</Typography>
          </Grid>
          <Box sx={{ textAlign: 'center' }}>
            <img src="/assets/worldcup-icon.png" width={200} alt="worldcup-logo" />
          </Box>
          <Grid item container sx={{ height: '100%' }}>
            <Content />
          </Grid>
        </Grid>
      </LayoutContainerStyles>
    </Paper>
  );
};
