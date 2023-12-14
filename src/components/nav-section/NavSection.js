import PropTypes from 'prop-types';
import { NavLink as RouterLink} from 'react-router-dom';
import { Box, List, ListItemText } from '@mui/material';
//
import { StyledNavItem, StyledNavItemIcon } from './styles';

// ----------------------------------------------------------------------

NavSection.propTypes = {
  data: PropTypes.array,
};
const handleNavLinkClick = (path) => {
  if (path === '/login') {
    localStorage.removeItem('token');
  }
  // navigate(path);
};
export default function NavSection({ data }) {
  return (
    <List disablePadding>
      {data.map((section, index) => (
        <NavItem
          key={index}
          item={section}
          onClick={handleNavLinkClick}
        />
      ))}
    </List>
  );
}

// ----------------------------------------------------------------------

NavItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    icon: PropTypes.element.isRequired,
    info: PropTypes.element,
  }),
  onClick: PropTypes.func.isRequired,
};

function NavItem({ item, onClick }) {
  if (!item || !item.title || !item.path || !item.icon) {
    // Handle case when item or required properties are missing
    return null;
  }

  const { title, path, icon, info } = item;

  return (
    <StyledNavItem
      component={RouterLink}
      to={path}
      sx={{
        '&.active': {
          color: 'text.primary',
          bgcolor: 'action.selected',
          fontWeight: 'fontWeightBold',
        },
      }}
      onClick={() => onClick(path)}
    >
      <StyledNavItemIcon>{icon && icon}</StyledNavItemIcon>
      <ListItemText disableTypography primary={title} />
      {info && info}
    </StyledNavItem>
  );
}