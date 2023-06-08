// React and hooks
import { useState } from 'react';

// Libs
import { Formik, Form, FormikHelpers } from 'formik';
import * as Yup from 'yup';

// Components
import {
  Box,
  Grid,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Button,
  Typography
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { MyField, MyErrorMsg, MySelect, MySwitch } from 'src/components/FormikComponents';
import { styled } from '@mui/material/styles';
import AvatarUploader from 'src/components/AvatarUploader';
import AlertCustom from "src/components/AlertCustom";
import LayoutDefault from "src/components/LayoutDefault";

// Api
import { api } from 'src/services/api';

// Types
import CreateUser from "../../../types/create.user.dto";
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

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Nome muito curto')
    .max(60, 'Nome muito longo')
    .required('Nome é obrigatório'),
  email: Yup.string()
    .email('Endereço de email inválido')
    .required('Email é obrigatório'),
  status: Yup.boolean(),
  password: Yup.string()
    .min(4, 'Senha muito curta')
    .required('A senha é obrigatória'),
  passwordAgain: Yup.string()
    .min(4, 'Senha muito curta')
    .required('A senha é obrigatória')
    .oneOf([Yup.ref('password')], 'As senhas devem ser iguais'),
  cpf: Yup.string()
    .required('CPF é obrigatório'),
  profile: Yup.number()
    .positive('Perfil é obrigatório')
    .required('Perfil é obrigatório'),
  gender: Yup.string(),
  dateBirth: Yup.date()
    .required('Data é obrigatória')
});

const initialValues = {
  name: '',
  email: '',
  status: true,
  password: '',
  passowrdAgain: '',
  cpf: '',
  profile: 0,
  gender: 0,
  dateBirth: ''
};

const profiles = [
  {
    value: 1,
    label: 'Administrador'
  },
  {
    value: 2,
    label: 'Colaborador'
  }
];
const genders = [
  {
    value: 1,
    label: 'Masculino'
  },
  {
    value: 2,
    label: 'Feminino'
  }
];

function UsersForm() {
  const [selectedFile, setSelectedFile] = useState<File>(null);
  const [alert, setAlert] = useState({
    title: "",
    message: "",
    open: false,
  });
  const [resetAvatar, setResetAvatar] = useState<boolean>(false);

  const onSubmit = async (values, { resetForm }: FormikHelpers<any>) => {
    const formData = new FormData();
    formData.append("file", selectedFile);
    const obj: CreateUser = {
      name: values.name,
      status: values.status,
      email: values.email,
      password: values.password,
      cpf: values.cpf,
      profile: values.profile,
      gender: values.gender,
      dateBirth: values.dateBirth,
      file: selectedFile,
    }

    try {
      const response = await api.post('/api/v1/users/add', obj);
      if (response.status === 201) {
        const user_id = response.data.id;
        const responseAvatar = await api.post(`/api/v1/users/uploadAvatar/${user_id}`, formData);
      }

      setResetAvatar(!resetAvatar);
      setSelectedFile(null);
      setAlert({
        title: "Sucesso!",
        message: "Usuário cadastrado.",
        open: true,
      });
      resetForm();

    } catch (error) {
      setAlert({
        title: "Houve um erro",
        message: error.response.data.message,
        open: true,
      });
    }
  };

  const closeAlert = () => {
    setAlert({
      title: "",
      message: "",
      open: false,
    });
  }

  return (
    <>
      <LayoutDefault
        title="Cadastrar usuário"
        subtitle="Informe os dados desejados para criar um usuário."
      >
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema}
        >
          {({
            handleSubmit,
            values,
            handleChange,
            errors,
            isSubmitting,
          }) => (

            <Form onSubmit={handleSubmit}>
              <Grid container justifyContent="space-between">

                <Grid
                  item
                  xs={12}
                  md={3.5}> {/* Left Col */}
                  <Grid container justifyContent="center" alignItems="center" height="100%">
                    <Grid item xs={10} alignItems="center" justifyContent="center" >
                      <AvatarUploader reset={resetAvatar} file={selectedFile} setFile={setSelectedFile} />
                    </Grid>
                  </Grid>
                </Grid>

                <Grid item xs={12} md={8}> {/* Right Col */}

                  <Grid item xs={12}>
                    <MyField name="name" label="Nome" type="text" value={values.name} required />
                    <MyErrorMsg name="name" />
                  </Grid>

                  <Grid container justifyContent="space-between">
                    <Grid item mt={2} xs={12} md={4.8}>
                      <MyField name="email" label="Email" type="email" value={values.email} required />
                      <MyErrorMsg name="email" />
                    </Grid>
                    <Grid item mt={2} xs={12} md={3.5}>
                      <MyField name="password" label="Senha" type="password" value={values.password} required />
                      <MyErrorMsg name="password" />
                    </Grid>
                    <Grid item mt={2} xs={12} md={3.5}>
                      <MyField name="passwordAgain" label="Repita a senha" type="password" value={values.passwordAgain} required />
                      <MyErrorMsg name="passwordAgain" />
                    </Grid>
                  </Grid>

                  <Grid container justifyContent="space-between">
                    <Grid item mt={2} xs={12} md={4.8}>
                      <MyField name="cpf" label="CPF" type="text" value={values.cpf} required />
                      <MyErrorMsg name="cpf" />
                    </Grid>

                    <Grid item mt={2} xs={12} md={3.5}>
                      <MySelect
                        label="Perfil"
                        name="profile"
                        value={values.profile}
                        onChangeProps={handleChange}
                        options={profiles}
                        error={Boolean(errors.profile)}
                        txtError="Perfil é obrigatório"
                        required
                      />
                    </Grid>
                    <Grid item mt={2} xs={12} md={3.5}>
                      <MyField name="dateBirth" label="Data de nascimento" type="date" value={values.dateBirth} required />
                      <MyErrorMsg name="dateBirth" />
                    </Grid>
                  </Grid>

                  <Grid container justifyContent="space-between">
                    <Grid item mt={2} xs={12} md={3.5}>
                      <MySelect
                        label="Gênero"
                        name="gender"
                        value={values.gender}
                        onChangeProps={handleChange}
                        options={genders}
                      />
                    </Grid>
                    <Grid item mt={2} xs={12} md={3.5} ml={3} alignItems="center" justifyContent="center" pt={1}>
                      <MySwitch
                        name="status"
                        label="Status"
                        value={values.status}
                        onChangeProps={handleChange}
                      />
                    </Grid>

                    <Grid item mt={2} xs={12} md={4.5} justifyContent="center">
                      <Grid container justifyContent="flex-end" alignItems="flex-end" height="100%">
                        <Button variant="contained" type="submit" disabled={isSubmitting}>
                          Salvar
                        </Button>
                      </Grid>
                    </Grid>

                  </Grid>

                </Grid>

              </Grid>
            </Form>
          )}
        </Formik>
      </LayoutDefault>
      <AlertCustom
        open={alert.open}
        title={alert.title}
        message={alert.message}
        onClose={() => closeAlert()}
        buttonLabel="Fechar"
      />
    </>
  );
}

export default UsersForm;
