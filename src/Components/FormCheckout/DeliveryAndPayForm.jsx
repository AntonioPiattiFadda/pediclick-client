import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { TextField, InputAdornment } from '@mui/material';

export default function ControlledOpenSelect() {
  const [delivery, setDelivery] = React.useState(null);
  const [pay, setPay] = React.useState(null);
  const [openDelivery, setOpenDelivery] = React.useState(false);
  const [openPay, setOpenPay] = React.useState(false);

  const handleChangeDelivery = (event) => {
    setDelivery(event.target.value);
  };
  const handleChangePay = (event) => {
    setPay(event.target.value);
  };

  const handleCloseDelivery = () => {
    setOpenDelivery(false);
  };

  const handleOpenDelivery = () => {
    setOpenDelivery(true);
  };

  const handleClosePay = () => {
    setOpenPay(false);
  };

  const handleOpenPay = () => {
    setOpenPay(true);
  };

  return (
    <div>
      <form sx={{ m: 2, minWidth: 350 }}>
        <InputLabel id="demo-controlled-open-select-label">
          Forma de entrega
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openDelivery}
          onClose={handleCloseDelivery}
          onOpen={handleOpenDelivery}
          value={delivery}
          label=" Forma de entrega"
          onChange={handleChangeDelivery}
        >
          <MenuItem value={1}>Retiro pesonalmente</MenuItem>
          <MenuItem value={2}>Quiero que me lo envíen</MenuItem>
        </Select>
      </form>
      {delivery === 1 && (
        <>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel htmlFor="grouped-native-select">
              ¿Qué día retiras?
            </InputLabel>
            <Select
              native
              defaultValue=""
              id="grouped-native-select"
              label="¿Qué día retiras?"
            >
              <option aria-label="None" value="" />
              <optgroup label="Lunes">
                <option value={1}>Mañana (10:00 a 14:00 hs)</option>
                <option value={2}>Tarde (5:00 a 18:00 hs)</option>
              </optgroup>
              <optgroup label="Martes">
                <option value={3}>Mañana (10:00 a 14:00 hs)</option>
                <option value={4}>Tarde (5:00 a 18:00 hs)</option>
              </optgroup>
              <optgroup label="Miercoles">
                <option value={5}>Mañana (10:00 a 14:00 hs)</option>
                <option value={6}>Tarde (5:00 a 18:00 hs)</option>
              </optgroup>
              <optgroup label="Miercoles">
                <option value={5}>Mañana (10:00 a 14:00 hs)</option>
                <option value={6}>Tarde (5:00 a 18:00 hs)</option>
              </optgroup>
              <optgroup label="Miercoles">
                <option value={5}>Mañana (10:00 a 14:00 hs)</option>
                <option value={6}>Tarde (5:00 a 18:00 hs)</option>
              </optgroup>
              <optgroup label="Miercoles">
                <option value={5}>Mañana (10:00 a 14:00 hs)</option>
                <option value={6}>Tarde (5:00 a 18:00 hs)</option>
              </optgroup>
            </Select>
          </FormControl>
        </>
      )}
      {delivery === 2 && (
        <>
          <TextField
            sx={{ m: 1, minWidth: 350 }}
            label="Calle"
            variant="outlined"
            fullWidth
          />
          <TextField
            sx={{ m: 1, minWidth: 350 }}
            label="Número de calle"
            variant="outlined"
            fullWidth
            inputProps={{
              inputMode: 'numeric',
            }}
          />
          <TextField
            sx={{ m: 1, minWidth: 350 }}
            label="Barrio"
            variant="outlined"
            fullWidth
          />
          <FormControl sx={{ m: 1, minWidth: 350 }}>
            <InputLabel htmlFor="apartment-select">
              ¿Es un departamento?
            </InputLabel>
            <Select
              native
              defaultValue=""
              id="apartment-select"
              label="¿Es un departamento?"
            >
              <option value={1}>Sí</option>
              <option value={2}>No</option>
            </Select>
          </FormControl>
          {/* Show additional fields if it's an apartment */}
          {2 === 1 && (
            <>
              <TextField
                sx={{ m: 1, minWidth: 350 }}
                label="Número de departamento"
                variant="outlined"
                fullWidth
              />
            </>
          )}
        </>
      )}
      <form sx={{ m: 2, minWidth: 350 }}>
        <InputLabel id="demo-controlled-open-select-label">
          Forma de pago
        </InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={openPay}
          onClose={handleClosePay}
          onOpen={handleOpenPay}
          value={pay}
          label=" Forma de pago"
          onChange={handleChangePay}
        >
          <MenuItem value={1}>Efectivo</MenuItem>
          <MenuItem value={2}>Transferencia</MenuItem>
        </Select>
      </form>
      {pay === 1 && (
        <TextField
          name="price"
          fullWidth
          margin="normal"
          label="¿Con cuánto pagás?"
          id="outlined-start-adornment"
          sx={{ width: '25ch' }}
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
      )}
      {pay === 2 && (
        <span>Te enviaremos los datos de la transferencia por Whatsapp</span>
      )}
    </div>
  );
}
