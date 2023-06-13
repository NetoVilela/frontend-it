// React and hooks
import React from 'react';

// Components
import { Box, Card, CardContent, Divider, Grid, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { styled } from '@mui/material/styles';

// Types
import PageTitleWrapper from 'src/components/PageTitleWrapper';

const MainContent = styled(Box)(
  () => `
    height: 100%;
    display: flex;
    flex: 1;
    overflow: auto;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`
);

interface ILayoutDefault {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  cardContent?: boolean;
}

function LayoutDefault({ title, subtitle, children, cardContent = true }: ILayoutDefault) {

  return (
    <>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <MainContent>
        <Grid
          container
          sx={{ height: '100%' }}
          alignItems="stretch"
          spacing={0}
          justifyContent="center"
        >
          <Grid item xs={12} margin="0">
            <PageTitleWrapper>
              <Grid item xs={12} md={10}>
                <Typography variant="h3" gutterBottom>
                  {title}
                </Typography>
                {
                  subtitle ?
                    <Typography variant="subtitle2">
                      {subtitle}
                    </Typography>
                    : null
                }
              </Grid>
            </PageTitleWrapper>
          </Grid>
          <Grid item xs={12} mt={0} padding={3}>
            <Card>
              <Divider />
              {
                cardContent ?
                  <CardContent>
                    <Grid item xs={12}>
                      {children}
                    </Grid>
                  </CardContent>
                  :
                  <Grid item xs={12}>
                    {children}
                  </Grid>
              }

            </Card>
          </Grid>
        </Grid>
      </MainContent >
    </>
  );
}

export default LayoutDefault;
