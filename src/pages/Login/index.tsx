import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isMobile } from 'react-device-detect';
import { AuthContext } from '../../contexts/AuthContext';
// Components
import {
  Box,
  Typography,
  Container,
  Grid,
  Card,
  CardContent,
  TextField
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Formik, Form, Field } from 'formik';
import { styled } from '@mui/material/styles';
import Logo from 'src/components/LogoSign';
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton';

// Api
import { api } from 'src/services/api';
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

interface Values {
  email: string;
  password: string;
}
function Login() {
  const { isAuthenticated, setIsAuthenticated, a_profiles } = useContext(AuthContext);
  const navigate = useNavigate();
  const [errorLogin, setErrorLogin] = useState<boolean>(false);
  const [errorMsgLogin, setErrorMsgLogin] = useState<string>("");

  const login = async (email: string, password: string) => {
    const data = {
      email,
      password
    };

    try {
      const response = await api.post('/api/auth/login', data);
      console.log(data);
      console.log(response);

      if (response.status === 201) {
        localStorage.setItem('token', response.data.token);
        const tokenParts = response.data.token.split(".");
        const payload = JSON.parse(atob(tokenParts[1].replace(/-/g, "+").replace(/_/g, "/")));
        const user = {
          id: payload.sub,
          name: payload.name,
          email: payload.email,
          profile: a_profiles[payload.profile],
          avatar: payload.avatar,
          gender: payload.gender
        }
        localStorage.setItem('user', JSON.stringify(user));

        setIsAuthenticated(true);
        navigate('/dashboard');
      } else {
        setErrorLogin(true);
        setErrorMsgLogin(response.data.message);
      }
    } catch (error) {
      setErrorLogin(true);
      setErrorMsgLogin(error.response.data.message);
      console.log(error.response.data.message);
    }
  }

  return (
    <>
      <Helmet>
        <title>Login</title>
      </Helmet>
      <MainContent>
        <Grid
          container
          sx={{ height: '100%' }}
          alignItems="stretch"
          spacing={0}
        >
          <Grid
            container
            alignItems="center"
            display="flex"
            justifyContent="center"
            item
          >
            <Container maxWidth="sm">
              <Card
                sx={{
                  px: 1,
                  width: '100%',
                }}
              >
                <Formik
                  initialValues={{ email: '', password: '' }}
                  onSubmit={(values: Values, actions) => {
                    login(values.email, values.password);
                    actions.setSubmitting(false);
                  }
                  }
                >
                  {(props) => (
                    <Form>
                      <CardContent>
                        <Grid container justifyContent="center" textAlign="center" height="100%">
                          <Grid container justifyContent="center">
                            <Grid container>
                              <Logo />
                              <Grid item xs={12}>
                                <Typography align="center" mt={2} variant="h3" fontWeight="normal">
                                  Login
                                </Typography>
                                <Typography align="center" variant="subtitle2" fontWeight="normal">
                                  Entre com seu email e senha
                                </Typography>
                              </Grid>
                            </Grid>
                            <Grid item mt={2} xs={12} sm={8}>
                              <Field name="email">
                                {({ field }) => (
                                  <TextField
                                    {...field}
                                    label="Email"
                                    type="email"
                                    fullWidth
                                  />
                                )}
                              </Field>
                            </Grid>
                            <Grid item mt={2} xs={12} sm={8}>
                              <Field name="password">
                                {({ field }) => (
                                  <TextField
                                    {...field}
                                    label="Senha"
                                    type="password"
                                    fullWidth
                                  />
                                )}
                              </Field>
                            </Grid>
                          </Grid>
                          <Grid
                            container
                            justifyContent="center"
                            alignContent={isMobile ? 'center' : 'flex-end'}
                            flexGrow={1}
                          >
                            <Grid item mt={2} xs={12} sm={8}>
                              <LoadingButton
                                fullWidth
                                variant="contained"
                                size="large"
                                color="primary"
                                type="submit"
                                loading={props.isSubmitting}
                              >
                                Entrar
                              </LoadingButton>
                            </Grid>
                            <Typography display={errorLogin ? "block" : "none"} marginTop={2} variant="h4" style={{ fontWeight: 'normal' }} color="rgb(216, 27, 96)">
                              {errorMsgLogin}
                            </Typography>
                          </Grid>
                        </Grid>
                      </CardContent>
                    </Form>
                  )}
                </Formik>
              </Card>
            </Container>
          </Grid>

        </Grid>
      </MainContent >
    </>
  );
}

export default Login;
