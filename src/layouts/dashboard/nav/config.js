import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import GavelOutlinedIcon from '@mui/icons-material/GavelOutlined';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import CreateNewFolderIcon from '@mui/icons-material/CreateNewFolder';
import FolderCopyOutlinedIcon from '@mui/icons-material/FolderCopyOutlined';
import ArchiveOutlinedIcon from '@mui/icons-material/ArchiveOutlined';
import SvgColor from '../../../components/svg-color';

// ----------------------------------------------------------------------

const icon = (name) => <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />;
const navConfig = [
  {
    title: 'لوحة المعلومات',
    path: '/dashboard/app',
    icon: <GavelOutlinedIcon />,
  },
   {
    title: 'المسك و الإجراءت',
    path: '/dashboard/Procedures',
    icon: <GroupsOutlinedIcon />,
  },
  {
    title: 'سجل جلسات كل القضايا في المكتب ',
    path: '/dashboard/Problemes',
    icon: icon('ic_user'),
  },
  {
    title: 'جميع الملفات',
    path: '/dashboard/Dossiers',
    icon: <FolderCopyOutlinedIcon />,
  },
  {
    title: 'مال الجلسات',
    path: '/dashboard/Seances',
    icon:<EventAvailableIcon />,
  },
  {
    title: 'الارشيف',
    path: '/dashboard/Archive',
    icon:<ArchiveOutlinedIcon />,
  },
  {
    title: 'إضافة قضية جديدة',
    path: '/dashboard/AddNewfolderPage',
    icon:<CreateNewFolderIcon />,
  },
 
  {
    title: 'اتصل بنا',
    path: '/dashboard/contact',
    icon:<ContactMailIcon />,
  },
  {
    title: 'تسجيل خروج',
    path: '/login',
    icon: icon('ic_lock'),
  },
];

export default navConfig;
