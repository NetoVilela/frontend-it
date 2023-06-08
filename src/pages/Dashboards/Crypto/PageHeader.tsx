import { Typography, Avatar, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useContext } from 'react';
import { AuthContext } from 'src/contexts/AuthContext';

function PageHeader() {
  const { user } = useContext(AuthContext);
  const avatar = '/static/images/avatars/4.jpg';
  const theme = useTheme();

  return (
    <Grid container alignItems="center">
      <Grid item>
        <Avatar
          sx={{
            mr: 2,
            width: theme.spacing(8),
            height: theme.spacing(8)
          }}
          variant="rounded"
          alt={user.name}
          src={`${process.env.REACT_APP_API_BASE_URL}/${user.avatar}`}
        />
      </Grid>
      <Grid item>
        <Typography variant="h3" component="h3" gutterBottom>
          {user.gender == "1" ? "Bem vindo" : "Bem vinda"}, {user.name}!
        </Typography>
        <Typography variant="subtitle2">
          Acompanhe os dados do sistema através do nosso Dashboard
        </Typography>
      </Grid>
    </Grid>
  );
}

export default PageHeader;
