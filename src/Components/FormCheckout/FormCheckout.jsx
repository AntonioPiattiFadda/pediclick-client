import {
  Button,
  Grid,
  TextField,
  Typography,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
  InputAdornment,
} from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './Formulario.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const FormCheckout = ({ getCartTotalPrice, cart, clearCart }) => {
  const [successBuy, setSuccesBuy] = useState({ stage: 0, active: false });
  const [orderId, setOrderId] = useState(0);
  const [orderInfo, setOrderInfo] = useState({});
  const [total, setTotal] = useState(0);
  const [buyer, setBuyer] = useState({});

  const { handleSubmit, handleChange, values, setFieldValue, errors } =
    useFormik({
      initialValues: {
        nombre: '',
        email: '',
        phone: '',
        delivery: undefined,
        deliveryDay: '',
        adress: '',
        adressNumber: null,
        neighborhood: '',
        apartment: false,
        pay: '',
        cashPayment: 0,
      },

      validationSchema: Yup.object({
        nombre: Yup.string()
          .min(6, 'El nombre debe tener al menos 6 caracteres')
          .required('El nombre es obligatorio'),
        email: Yup.string()
          .email('El correo electrónico no es válido')
          .matches(/@/, 'El correo electrónico debe contener @')
          .required('El correo electrónico es obligatorio'),
        phone: Yup.number()
          .typeError('El teléfono tiene que ser un número')
          .required('El numero de telefono es obligatorio'),
        delivery: Yup.boolean().required(),
        pay: Yup.string().required(),
        cashPayment: Yup.number().required(),
      }),

      onSubmit: (data) => {
        let total = getCartTotalPrice();
        let order = {
          //NOTE -  Informacion que va al dueño del local
          buyer: data,
          items: cart,
          total,
        };
        let newOrderId = 450;
        setOrderId(newOrderId);
        setBuyer(data);
        setTotal(total);
        setOrderInfo(cart);
        setSuccesBuy({ ...successBuy, active: true });
        const getCartItemDetails = (cart) => {
          const itemDetails = cart.map(
            (item) => `${item.name} (X${item.quantity})`
          );
          return itemDetails.join(', ');
        };
        // Construir el mensaje personalizado
        const message = `¡Hola! Quisiera hacer el siguiente pedido a nombre de ${
          buyer.nombre
        }: ${getCartItemDetails(cart)}. Pago: ${data.pay}. Total: ${total} `;

        // Función para enviar mensaje a WhatsApp
        const sendWhatsAppMessage = () => {
          const whatsappLink = `https://wa.me/${3517631584}?text=${encodeURIComponent(
            message
          )}`;
          window.location.href = whatsappLink;
        };

        // Llama a la función para redireccionar al usuario a WhatsApp
        sendWhatsAppMessage();
      },
    });

  if (successBuy.active) {
    return (
      <div className="formWrapper">
        <Typography
          sx={{
            fontSize: '20px',
            fontWeight: 'bold',
            marginBottom: '10px',
          }}
          color="grey.800"
          align="center"
        >
          La compra se ha efectuado correctamente! Felicidades!
        </Typography>
        <Typography
          sx={{
            fontSize: '15px',
            marginBottom: '10px',
          }}
          color="grey.800"
          align="center"
        >
          Tu numero de seguimiento es {orderId}
        </Typography>
        <span> Forma de entrega: {buyer.delivery}</span>
        <span>Entrega el dia: {buyer.deliveryDay}</span>
        <span>Tipo de pago: {buyer.pay}</span>
        <span>Paga con: {buyer.cashPayment}</span>
        <span>
          {' '}
          Tu pedido es:{' '}
          <ul>
            {orderInfo.map((item) => {
              return (
                <li>
                  {item.quantity} {item.name}
                </li>
              );
            })}
          </ul>
        </span>
        <p>
          {' '}
          A nombre de:{' '}
          <span style={{ fontWeight: 'bold' }}>{buyer.nombre}</span>
        </p>
        <p>
          Email:
          <span style={{ fontWeight: 'bold' }}>{buyer.email}</span>
        </p>
        <span> Total: ${total} </span>
        <span>La idea es que todo esto se mande por Whatsapp</span>
      </div>
    );
  }

  return (
    <div className="formWrapper">
      <Typography
        sx={{
          fontSize: '20px',
          fontWeight: 'bold',
          marginBottom: '10px',
        }}
        color="grey.800"
        align="center"
      >
        {successBuy.stage === 0 && 'Necesitamos algunos datos para el envio'}
        {successBuy.stage === 1 && ' ¡Ya casi terminas tu compra!'}
      </Typography>

      <form className="form-container" onSubmit={handleSubmit}>
        <Grid
          container
          alignItems={'center'}
          justifyContent="space-evenly"
          spacing={2}
          sx={{ width: '100%' }}
        >
          {successBuy.stage === 0 && (
            <>
              {' '}
              <Grid item xs={12} md={7}>
                <TextField
                  type="text"
                  label="Ingrese su nombre"
                  name="nombre"
                  onChange={(e) => {
                    setFieldValue('nombre', e.target.value);
                  }}
                  variant="outlined"
                  fullWidth
                  // value={values.nombre}
                  helperText={errors.nombre}
                  error={errors.nombre}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <TextField
                  type="email"
                  label="Ingrese su email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  onChange={handleChange}
                  // value={values.email}
                  error={errors.email}
                  helperText={errors.email}
                />
              </Grid>
              <Grid item xs={12} md={7}>
                <TextField
                  type="text"
                  label="Ingrese su teléfono"
                  variant="outlined"
                  fullWidth
                  name="phone"
                  onChange={handleChange}
                  // value={values.phone}
                  error={errors.phone}
                  helperText={errors.phone}
                />
              </Grid>
              <Button
                sx={{
                  marginTop: '15px',
                  alignSelf: 'flex-end',
                }}
                variant="outlined"
                onClick={() => {
                  if (
                    values.nombre === '' ||
                    values.email === '' ||
                    values.phone === ''
                  )
                    return;
                  setSuccesBuy({ ...successBuy, stage: 1 });
                }}
              >
                <img
                  width="24"
                  height="24"
                  src="https://img.icons8.com/ios-filled/50/arrow.png"
                  alt="arrow"
                />
              </Button>
            </>
          )}

          {successBuy.stage === 1 && (
            <>
              <FormControl sx={{ m: 2, minWidth: 300, marginLeft: '32px' }}>
                <InputLabel id="demo-simple-select-label">
                  Forma de entrega
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  // value={age}
                  label="Forma de entrega"
                  onChange={handleChange}
                  error={errors.delivery}
                  helperText={errors.delivery}
                  name="delivery"
                >
                  <MenuItem value={false}>Retiro</MenuItem>
                  <MenuItem value={true}>Envio</MenuItem>
                </Select>
                {errors.delivery && (
                  <p style={{ color: 'red' }}>{errors.delivery}</p>
                )}
              </FormControl>
              {values.delivery === false && (
                <>
                  <FormControl sx={{ m: 2, minWidth: 300 }}>
                    <InputLabel htmlFor="grouped-native-select">
                      ¿Qué día retiras?
                    </InputLabel>
                    <Select
                      native
                      defaultValue=""
                      id="grouped-native-select"
                      label="¿Qué día retiras?"
                      onChange={handleChange}
                      error={errors.deliveryDay}
                      helperText={errors.deliveryDay}
                      name="deliveryDay"
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
              {values.delivery && (
                <>
                  <TextField
                    sx={{ m: 1, minWidth: 350 }}
                    label="Calle"
                    variant="outlined"
                    fullWidth
                    name="adress"
                    onChange={handleChange}
                    error={errors.adress}
                    helperText={errors.adress}
                  />
                  <TextField
                    sx={{ m: 1, minWidth: 350 }}
                    label="Número de calle"
                    variant="outlined"
                    fullWidth
                    inputProps={{
                      inputMode: 'numeric',
                    }}
                    name="adressNumber"
                    onChange={handleChange}
                    error={errors.adressNumber}
                    helperText={errors.adressNumber}
                  />
                  <TextField
                    sx={{ m: 1, minWidth: 350 }}
                    label="Barrio"
                    variant="outlined"
                    fullWidth
                    name="neighborhood"
                    onChange={handleChange}
                    error={errors.neighborhood}
                    helperText={errors.neighborhood}
                  />
                  <InputLabel htmlFor="apartment-select">
                    ¿Es un departamento?
                  </InputLabel>
                  <Select
                    native
                    defaultValue=""
                    id="apartment-select"
                    label="¿Es un departamento?"
                    onChange={handleChange}
                    error={errors.apartment}
                    helperText={errors.apartment}
                    name="apartment"
                  >
                    <option value={1}>Sí</option>
                    <option value={2}>No</option>
                  </Select>
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
              <InputLabel id="demo-simple-select-label">
                Forma de pago
              </InputLabel>
              <Select
                labelId="emo-simple-select-label"
                id="demo-simple-select"
                name="pay"
                label=" Forma de pago"
                onChange={handleChange}
                error={errors.pay}
                helperText={errors.pay}
              >
                <MenuItem value={'cash'}>Efectivo</MenuItem>
                <MenuItem value={'transfer'}>Transferencia</MenuItem>
              </Select>
              {errors.pay ? (
                <p style={{ color: 'red' }}>{errors.pay}</p>
              ) : (
                <></>
              )}

              {values.pay === 'cash' && (
                <TextField
                  name="cashPayment"
                  fullWidth
                  margin="normal"
                  label="¿Con cuánto pagás?"
                  id="outlined-start-adornment"
                  sx={{ width: '25ch' }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">$</InputAdornment>
                    ),
                  }}
                />
              )}
              {values.pay === 'transfer' && (
                <span>
                  Te enviaremos los datos de la transferencia por Whatsapp
                </span>
              )}
            </>
          )}
        </Grid>
        {successBuy.stage === 1 && (
          <>
            <Button
              sx={{
                marginTop: '15px',
                alignSelf: 'flex-end',
              }}
              type="submit"
              variant="contained"
            >
              Enviar WhatsApp
            </Button>
          </>
        )}
      </form>
      <span style={{ height: '55px' }}></span>
    </div>
  );
};

export default FormCheckout;
