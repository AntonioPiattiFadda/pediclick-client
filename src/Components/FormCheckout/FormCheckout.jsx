import { Button, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './Formulario.css';
import { useState } from 'react';

const FormCheckout = ({ getCartTotalPrice, cart, clearCart }) => {
  const [successBuy, setSuccesBuy] = useState(false);
  const [orderId, setOrderId] = useState(0);
  const [orderInfo, setOrderInfo] = useState({});
  const [total, setTotal] = useState(0);
  const [buyer, setBuyer] = useState({});
  const { handleSubmit, handleChange, values, setFieldValue, errors } =
    useFormik({
      initialValues: {
        nombre: '',
        email: '',
        contraseña: '',
      },

      validationSchema: Yup.object({
        nombre: Yup.string()
          .min(6, 'El nombre debe tener al menos 6 caracteres')
          .required('El nombre es obligatorio'),
        email: Yup.string()
          .email('El correo electrónico no es válido')
          .matches(/@/, 'El correo electrónico debe contener @')
          .required('El correo electrónico es obligatorio'),
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
        console.log(order.buyer);
        setOrderId(newOrderId);
        setBuyer(data);
        setTotal(total);
        setOrderInfo(cart);
        setSuccesBuy(true);
      },
    });

  if (successBuy) {
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
        Ya casi terminas tu compra!
      </Typography>

      <form className="form-container" onSubmit={handleSubmit}>
        <Grid
          container
          alignItems={'center'}
          justifyContent="space-evenly"
          spacing={2}
          sx={{ width: '100%' }}
        >
          <Grid item xs={12} md={7}>
            <TextField
              type="text"
              label="Ingrese su nombre"
              // name="nombre"
              onChange={(e) => {
                setFieldValue('nombre', e.target.value);
              }}
              variant="outlined"
              fullWidth
              value={values.nombre}
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
              value={values.email}
              error={errors.email}
              helperText={errors.email}
            />
          </Grid>
        </Grid>
        <Button
          sx={{
            marginTop: '15px',
            alignSelf: 'flex-end',
          }}
          type="submit"
          variant="contained"
        >
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default FormCheckout;
