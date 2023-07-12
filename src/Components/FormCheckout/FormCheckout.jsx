import { Button, Grid, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './Formulario.css';
import { useState } from 'react';

const FormCheckout = ({ getCartTotalPrice, cart, clearCart }) => {
  const [successBuy, setSuccesBuy] = useState(false);
  const [orderId, setOrderId] = useState(0);
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
        contraseña: Yup.string()
          .required('La contraseña es obligatoria')
          .matches(
            /^(?=.*[a-zA-Z])(?=.*\d).{8,}$/,
            'La contraseña debe tener al menos 8 caracteres, una mayúscula y un carácter alfanumérico'
          ),
      }),

      onSubmit: (data) => {
        // Crear la coleccion orders
        let total = getCartTotalPrice();
        let order = {
          buyer: data,
          items: cart,
          total,
        };
        let orderId = 0;
        // let orderCollection = collection(db, 'orders');
        // addDoc(orderCollection, order)
        //   .then((res) => setOrderId(res.id))
        //   .catch((err) => console.log(err));

        // cart.map((product) => {
        //   let refDoc = doc(db, 'products', product.id);
        //   updateDoc(refDoc, { stock: product.stock - product.quantity });
        //   return product;
        // });W
        clearCart();
        setSuccesBuy(true);
      },
    });

  if (successBuy) {
    return (
      <div className="formWrapper">
        <h1>La compra se ha efectuado correctamente</h1>
        <span>Tu numero de seguimiento es {orderId} </span>
      </div>
    );
  }

  return (
    <div className="formWrapper">
      <Typography color="grey.800" variant="h2" align="center">
        Formulario de registro
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

          <Grid item xs={12} md={7}>
            <TextField
              type="password"
              label="Ingrese su contraseña"
              variant="outlined"
              fullWidth
              name="contraseña"
              onChange={handleChange}
              value={values.contraseña}
              error={errors.contraseña}
              helperText={errors.contraseña}
            />
          </Grid>
        </Grid>
        <Button type="submit" variant="contained">
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default FormCheckout;
