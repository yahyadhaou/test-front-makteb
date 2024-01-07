import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import { filter } from 'lodash';
import axios from 'axios';
import { useState, useEffect } from 'react';
import {
  Card,
  Table,
  Stack,
  Paper,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Dialog,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material';
import Scrollbar from '../components/scrollbar';
import Iconify from '../components/iconify';
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';

const TABLE_HEAD = [
  { id: 'numeroDossier', label: 'رقم الملف', alignRight: false },
  { id: 'reste', label: 'ماتبقى', alignRight: false },
  { id: 'honoraires', label: 'الاتعاب', alignRight: false },
  { id: 'nomdudéfendeur', label: 'لقبه او ممثله ', alignRight: false },
  { id: 'Ledéfendeur', label: 'اسم ضد', alignRight: false },
  { id: 'nuLecas', label: 'ع.القظية', alignRight: false },
  { id: 'T', label: 'ط', alignRight: false },
  { id: 'Matière', label: ' المادة ', alignRight: false },
  { id: 'ville', label: 'مدينة', alignRight: false },
  { id: 'Tribunal', label: 'المحكمة', alignRight: false },
  { id: 'nomdedemandeur', label: 'لقبه او ممثله ', alignRight: false },
  { id: 'demandeur', label: 'اسم الحريف', alignRight: false },
];
function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function applySortFilter(array, comparator, query) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    return filter(array, (_user) => _user.numeroDossier.toString().toLowerCase().indexOf(query.toLowerCase()) !== -1);
  }

  return stabilizedThis.map((el) => el[0]);
}

export default function Dossiers() {
  const [openDialog, setOpenDialog] = useState(false);
  const [page, setPage] = useState(0);
  const [selectedDossier, setSelectedDossier] = useState('');
  const [order, setOrder] = useState('asc');
  const [selected, setSelected] = useState([]);
  const [orderBy, setOrderBy] = useState('name');
  const [filterName, setFilterName] = useState('');
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [datatoarchive,setDatatoarchive]=useState([])
  const navigate = useNavigate();

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const [usersData, setUsersData] = useState([]);
  const userId = localStorage.getItem('id');
  useEffect(() => {
    getUsersData();
  }, []);
  const getUsersData = () => {
    axios
      .get(`https://test-al-makteb.onrender.com/getdata/${userId}`)
      .then((res) => {
        const userDatas = res.data;
        const filteredUserDatas = userDatas.filter(userData => userData.archives === "false");
        const usersArray = filteredUserDatas.map((userData) => ({
          id: userData.id,
          numeroDossier: userData.numeroDossier,
          demandeur: userData.demandeur,
          nomdedemandeur: userData.nomdedemandeur,
          Tribunal: userData.Tribunal,
          ville: userData.ville,
          Matière: userData.Matière,
          T: userData.T,
          nuLecas: userData.nuLecas,
          Datedelaudience: userData.Datedelaudience,
          nomdudéfendeur: userData.nomdudéfendeur,
          Ledéfendeur: userData.Ledéfendeur,
          honoraires: userData.honoraires,
          reste: userData.reste,
        }));
        console.log(usersArray);
        setUsersData(usersArray);
      })
      .catch((err) => console.log(err));
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = usersData.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, numeroDossier) => {
    const selectedIndex = selected.indexOf(numeroDossier);
    let newSelected = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, numeroDossier);
      setSelectedDossier(numeroDossier);
      setOpenDialog(true);
      console.log(`Selected numeroDossier: ${numeroDossier}`)
      setDatatoarchive((prevData) => [...prevData, numeroDossier]); 
    } else {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
  
      setDatatoarchive((prevData) =>
        prevData.filter((dossier) => dossier !== numeroDossier)
      ); 
    }
  
    setSelected(newSelected);
  };
  const handleSubmit = async () => {
    try {
      const response = await axios.put(
        `https://test-al-makteb.onrender.com/archiver`,
        { numeroDossier: datatoarchive }
      );
  
      navigate("/dashboard/Archive");
      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  };

  const handleFilterByName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };
  const handleDialogClose = (isContinue) => {
    setOpenDialog(false);

    if (isContinue) {
     
      alert(`Continue selected for: ${selectedDossier}`);
    } 
  };

  const handelNavigate = () => {
    navigate('/dashboard/AddNewfolderPage');
  };
  const handelnavigate = () => {
    navigate(`/dashboard/UpdateFolderCase/${selectedDossier}`);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - usersData.length) : 0;

  const filteredUsers = applySortFilter(usersData, getComparator(order, orderBy), filterName);

  const isNotFound = !filteredUsers.length && !!filterName;

  return (
    <>
      <Helmet>
        <title>جميع الملفات بالمكتب </title>
      </Helmet>

      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handelNavigate}>
            إضافة قضية جديدة
          </Button>
          <Button variant="contained" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleSubmit}>
          أرشيف
          </Button>
          <Typography variant="h4" gutterBottom style={{ textAlign: 'right', marginLeft: 'auto' }}>
            جميع الملفات بالمكتب
          </Typography>
        </Stack>

        <Card>
          <UserListToolbar numSelected={selected.length} filterName={filterName} onFilterName={handleFilterByName} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 1150 }}>
              <Table>
                <UserListHead
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={usersData.length}
                  numSelected={selected.length}
                  onRequestSort={handleRequestSort}
                  onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {filteredUsers.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
                    const {
                      id,
                      numeroDossier,
                      demandeur,
                      nomdedemandeur,
                      Tribunal,
                      ville,
                      Matière,
                      T,
                      nuLecas,
                      reste,
                      honoraires,
                      nomdudéfendeur,
                      Ledéfendeur,
                    } = row;
                    const selectedUser = selected.indexOf(numeroDossier) !== -1;

                    return (
                      <TableRow hover key={id} tabIndex={-1} role="checkbox" selected={selectedUser}>
                        <TableCell padding="checkbox">
                          <Checkbox checked={selectedUser} onChange={(event) => handleClick(event, numeroDossier)} />
                        </TableCell>
                        <TableCell component="th" scope="row" padding="none">
                          <Stack direction="row" alignItems="center" spacing={2}>
                            <Typography variant="subtitle2" noWrap>
                              {numeroDossier}
                            </Typography>
                          </Stack>
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: '18px' }}>
                          {reste}
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: '18px' }}>
                          {honoraires}
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: '18px' }}>
                          {nomdudéfendeur}
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: '18px' }}>
                          {Ledéfendeur}
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: '18px' }}>
                          {nuLecas}
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: '18px' }}>
                          {T}
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: '18px' }}>
                          {Matière}
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: '18px' }}>
                          {ville}
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: '18px' }}>
                          {Tribunal}
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: '18px' }}>
                          {nomdedemandeur}
                        </TableCell>
                        <TableCell align="left" style={{ fontSize: '18px' }}>
                          {demandeur}
                        </TableCell>
                      </TableRow>
                    );
                  })}
                  {emptyRows > 0 && (
                    <TableRow style={{ height: 53 * emptyRows }}>
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>

                {isNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        <Paper
                          sx={{
                            textAlign: 'center',
                          }}
                        >
                          <Typography variant="h6" paragraph>
                            غير معثور عليه
                          </Typography>

                          <Typography variant="body2">
                            لا يوجد نتائج ل &nbsp;
                            <strong>&quot;{filterName}&quot;</strong>.
                            <br /> حاول التحقق من الأخطاء المطبعية أو استخدام الكلمات الكاملة
                          </Typography>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25]}
            component="div"
            count={usersData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      
      <Dialog open={openDialog} onClose={() => handleDialogClose(false)}>
        <DialogTitle>{`Confirm selection for ${selectedDossier}`}</DialogTitle>
        <DialogActions>
          <Button onClick={() => handleDialogClose(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              handleDialogClose(false);
            }}
            color="primary"
          >
            Continue
          </Button>
          <Button
            onClick={() => {
              handleDialogClose(false);
              handelnavigate(); // Call your second function here
            }}
            color="primary"
          >
            Navigate
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
