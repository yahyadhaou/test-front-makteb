import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Link } from '@mui/material';

// ----------------------------------------------------------------------
import logoss from "./logo.png"

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const theme = useTheme();

  const PRIMARY_LIGHT = theme.palette.primary.light;
  const PRIMARY_MAIN = theme.palette.primary.main;
  const PRIMARY_DARK = theme.palette.primary.dark;

  const logo = (
    <Box
      ref={ref}
      component="div"
      sx={{
        width: 190,
        height: 190,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
    >
      <img
        src={logoss}
        alt="Logo"
        style={{
          width: '100%',
          height: '100%',
          cursor: 'pointer',
          objectFit: 'cover',
        }}
      />
    </Box>
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;