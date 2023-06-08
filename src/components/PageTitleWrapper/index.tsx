import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, styled } from '@mui/material';

const PageTitle = styled(Box)(
  ({ theme }) => `
        padding: ${theme.spacing(3)};
        margin-bottom: 0px !important;
`
);

interface PageTitleWrapperProps {
  children?: ReactNode;
}

const PageTitleWrapper: FC<PageTitleWrapperProps> = ({ children }) => {
  return (
    <PageTitle className="MuiPageTitle-wrapper">
      <Grid maxWidth="lg">{children}</Grid>
    </PageTitle>
  );
};

PageTitleWrapper.propTypes = {
  children: PropTypes.node.isRequired
};

export default PageTitleWrapper;
