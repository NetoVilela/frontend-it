// Components
import {
  Avatar,
  Grid,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LayoutDefault from 'src/components/LayoutDefault';
import Paper from '@mui/material/Paper';
import EditIcon from '@mui/icons-material/Edit';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

// API
import { api } from "src/services/api";
import { useEffect, useState } from 'react';

const StyledTableHead = styled(TableHead)`
  background: none !important;
`;

// Types
interface IUser {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  profile: number;
  status: boolean;
  cpf: string;
  avatarSrc: string;
}

const UsersList = () => {
  const theme = useTheme();
  const [users, setUsers] = useState<IUser[]>([]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await api.get(`api/v1/users`);
        console.log(response.data);
        setUsers(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getUsers();
  }, []);

  return (
    <>
      <LayoutDefault
        title="Listar usuários"
        subtitle=""
      >
        <TableContainer component={Paper}>
          <Table>
            <StyledTableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>CPF</TableCell>
                <TableCell>PERFIL</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </StyledTableHead>
            <TableBody>
              {users.map((user) => {
                return (
                  <TableRow key={user.id}>
                    <TableCell>
                      <Grid display="flex" alignItems="center">
                        <Avatar alt={`${user.name}`} src={`${process.env.REACT_APP_API_BASE_URL}/attachments/users/${user.avatarSrc}`} />
                        <Typography marginLeft="5px">{user.name}</Typography>
                      </Grid>
                      <Grid>
                        <Typography variant="subtitle2">
                          {user.createdAt}
                        </Typography>
                      </Grid>
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.cpf}</TableCell>
                    <TableCell>{user.profile}</TableCell>
                    <TableCell>{user.status ? "Ativo" : "Inativo"}</TableCell>
                    <TableCell>
                      <Tooltip title="Edit Order" arrow>
                        <IconButton
                          sx={{
                            '&:hover': {
                              background: theme.colors.primary.lighter
                            },
                            color: theme.palette.primary.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Delete Order" arrow>
                        <IconButton
                          sx={{
                            '&:hover': { background: theme.colors.error.lighter },
                            color: theme.palette.error.main
                          }}
                          color="inherit"
                          size="small"
                        >
                          <DeleteOutlineIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </LayoutDefault>
    </>
  );
}

export default UsersList;
