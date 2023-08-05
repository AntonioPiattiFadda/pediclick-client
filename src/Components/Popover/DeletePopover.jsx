import * as React from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function BasicPopover() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  // Definir el color verde pastel
  const verdePastel = '#98FB98';

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick} style={{ fontFamily: 'Open Sans', color: 'white', backgroundColor: verdePastel }}>
        Open Popover
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2, fontFamily: 'Open Sans' }}>
          Seguro que quieres eliminar del carrito?
          <div sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
            <Button sx={{ width: '24px', height: '24px', m: 1, backgroundColor: verdePastel, color: 'white' }} variant="contained">
              Si
            </Button>
            <Button sx={{ width: '24px', height: '24px', m: 1, backgroundColor: verdePastel, color: 'white' }} variant="contained">
              No
            </Button>
          </div>
        </Typography>
      </Popover>
    </div>
  );
}
