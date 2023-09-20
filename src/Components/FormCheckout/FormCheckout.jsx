import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useState } from 'react';
import styles from './Formulario.module.css';
import DeliveryIcono from '../../assets/svg/delivery.svg';
import EntregaIcono from '../../assets/svg/entregaLocal.svg';
import EfectivoIcono from '../../assets/svg/Efectivo.svg';
import TarjetaIcono from '../../assets/svg/Tarjeta.svg';
import WhatsAppIcono from '../../assets/svg/Whatsapp.svg';

const FormCheckout = ({ getCartTotalPrice, cart, clearCart }) => {
  const [checkbox1Selected, setCheckbox1Selected] = useState(false);
  const [checkbox2Selected, setCheckbox2Selected] = useState(false);
  const [checkbox3Selected, setCheckbox3Selected] = useState(false);
  const [checkbox4Selected, setCheckbox4Selected] = useState(false);

  const handleCheckboxChange = (checkboxNumber) => {
    if (checkboxNumber === 1) {
      setCheckbox1Selected(true);
      setCheckbox2Selected(false);
    } else if (checkboxNumber === 2) {
      setCheckbox1Selected(false);
      setCheckbox2Selected(true);
    }
  };
  const handleCheckboxPaymentChange = (checkboxNumber) => {
    if (checkboxNumber === 3) {
      setCheckbox3Selected(true);
      setCheckbox4Selected(false);
    } else if (checkboxNumber === 4) {
      setCheckbox3Selected(false);
      setCheckbox4Selected(true);
    }
  };
  const [successBuy, setSuccesBuy] = useState({ stage: 0, active: false });
  const [orderId, setOrderId] = useState(0);
  const [orderInfo, setOrderInfo] = useState({});
  const [total, setTotal] = useState(0);
  const [buyer, setBuyer] = useState({});
  const [extraDeliveryError, setExtraDeliveryError] = useState({
    cashPayError: false,
    cashPayErrorMessage: '',
    deliveryError: false,
    deliveryErrorMessage: '',
  });

  const yupObject = {
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
  };
  if (checkbox1Selected) {
    yupObject.delivery = Yup.boolean().required();
    yupObject.adress = Yup.string().required();
    yupObject.adressNumber = Yup.number().required();
  }
  const initialValues = {
    nombre: '',
    email: '',
    phone: '',
    homeDelivery: false,
    storeDelivery: true,
    adress: '',
    adressNumber: null,
    neighborhood: '',
    apartment: '',
    pay: '',
    cashPayment: 0,
  };
  if (checkbox1Selected) {
    initialValues.homeDelivery = true;
    initialValues.storeDelivery = false;
  }

  const { handleSubmit, handleChange, values, setFieldValue, errors } =
    useFormik({
      initialValues: initialValues,

      validationSchema: Yup.object(yupObject),

      onSubmit: (data) => {
        console.log(data);
        // let total = getCartTotalPrice();
        // let order = {
        //   buyer: data,
        //   items: cart,
        //   total,
        // };
        // let newOrderId = 450;

        // //ANCHOR - Validador manual de la info
        // console.log(data);
        //         if (data.delivery === true && data.cashPayment === 0) {
        //           setExtraDeliveryError({
        //             deliveryError: true,
        //             deliveryErrorMessage:
        //               'Controla la informacion del envio te faltan campos',
        //           });
        //           return;
        //         }
        //         if (data.pay === 'cash' && data.cashPayment === 0) {
        //           setExtraDeliveryError({
        //             cashPayError: true,
        //             cashPayErrorMessage:
        //               'Por favor ingresa el valor con el que vas a pagar',
        //           });
        //           return;
        //         }

        //         setOrderId(newOrderId);
        //         setBuyer(data);
        //         setTotal(total);
        //         setOrderInfo(cart);
        //         setSuccesBuy({ ...successBuy, active: true });
        //         const getCartItemDetails = (cart) => {
        //           const itemDetails = cart.map(
        //             (item) => `${item.name} (X${item.quantity})`
        //           );
        //           return itemDetails.join(`,
        //           `);
        //         };

        //         const message = ` ¡Hola! Quisiera hacer el siguiente pedido a nombre de ${
        //           data.nombre
        //         }:
        //         ${getCartItemDetails(cart)}.

        // Retiro el dia: XXX
        // Quisiera que me lo envien a: XXX

        // Pago: ${data.pay}.
        // Pago con: XXX

        // Total: ${total}.`;

        //         const sendWhatsAppMessage = () => {
        //           const whatsappLink = `https://wa.me/${3516192831}?text=${encodeURIComponent(
        //             message
        //           )}`;
        //           window.location.href = whatsappLink;
        //         };

        //         sendWhatsAppMessage();
      },
    });

  if (successBuy.active) {
    return (
      //TODO - Hacer que se muestre el numero de orden
      <div className={styles.finalInfo}>
        <span className={styles.deliveryInfo}>
          {' '}
          Forma de entrega: {buyer.delivery}
        </span>
        <span className={styles.deliveryInfo}>
          Entrega el día: {buyer.deliveryDay}
        </span>
        <span className={styles.deliveryInfo}>Tipo de pago: {buyer.pay}</span>
        <span className={styles.deliveryInfo}>
          Paga con: {buyer.cashPayment}
        </span>
        <span className={styles.orderList}>
          {' '}
          Tu pedido es:{' '}
          <ul className={styles.listItem}>
            {orderInfo.map((item, index) => (
              <li key={index} className={styles.listItem}>
                {item.quantity} {item.name}
              </li>
            ))}
          </ul>
        </span>
        <p className={styles.deliveryInfo}>
          {' '}
          A nombre de: <span className={styles.bold}>{buyer.nombre}</span>
        </p>
        <p className={styles.deliveryInfo}>
          Email: <span className={styles.bold}>{buyer.email}</span>
        </p>
        <span className={styles.total}> Total: ${total} </span>
        <span>La idea es que todo esto se mande por Whatsapp</span>
      </div>
    );
  }

  return (
    <div className={styles.formWrapper}>
      <h2 className={styles.title}>Información del pedido</h2>

      <form className="form-container" onSubmit={handleSubmit}>
        <div className={styles.formGroupContainer}>
          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel} htmlFor="nombre">
              Nombre y apellido:
            </label>
            <input
              className={styles.input}
              type="text"
              name="nombre"
              id="nombre"
              onChange={handleChange}
              value={values.nombre}
            />
            {errors.nombre ? (
              <span className={styles.error}>{errors.nombre}</span>
            ) : null}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel} htmlFor="email">
              Email:
            </label>
            <input
              className={styles.input}
              type="text"
              name="email"
              id="email"
              onChange={handleChange}
              value={values.email}
            />
            {errors.email ? (
              <span className={styles.error}>{errors.email}</span>
            ) : null}
          </div>
          <div className={styles.formGroup}>
            <label className={styles.formGroupLabel} htmlFor="phone">
              Teléfono:
            </label>
            <input
              className={styles.input}
              type="text"
              name="phone"
              id="phone"
              onChange={handleChange}
              value={values.phone}
            />
            {errors.phone ? (
              <span className={styles.error}>{errors.phone}</span>
            ) : null}
          </div>
          <label className={styles.formGroupLabel} htmlFor="">
            Metodo de entrega:
          </label>
          <div className={styles.formGroupDelivery}>
            <div className={styles.formGroupLeft}>
              <div>
                <input
                  className={styles.checkBoxInput}
                  type="checkbox"
                  checked={checkbox1Selected}
                  name="homeDelivery"
                  id="homeDelivery"
                  onChange={() => handleCheckboxChange(1)}
                  value={values.homeDelivery}
                />{' '}
                <span>Entrega a domicilio</span>
              </div>
              <div></div>
              <div>
                <input
                  className={styles.checkBoxInput}
                  type="checkbox"
                  checked={checkbox2Selected}
                  value={values.storeDelivery}
                  name="storeDelivery"
                  id="storeDelivery"
                  onChange={() => handleCheckboxChange(2)}
                />{' '}
                <span>Recoger en tienda</span>
              </div>
            </div>
            <div className={styles.formGroupRight}>
              <img src={DeliveryIcono} alt="Icono de delivery" />
              <div></div>
              <img src={EntregaIcono} alt="Icono de local" />
            </div>
          </div>
          <label className={styles.formGroupLabel} htmlFor="">
            Forma de pago:
          </label>
          <div className={styles.formGroupDelivery}>
            <div className={styles.formGroupLeft}>
              <div>
                <input
                  className={styles.checkBoxInput}
                  type="checkbox"
                  checked={checkbox3Selected}
                  onChange={() => handleCheckboxPaymentChange(3)}
                />{' '}
                <span>Efectivo</span>
              </div>
              <div></div>
              <div>
                <input
                  className={styles.checkBoxInput}
                  type="checkbox"
                  checked={checkbox4Selected}
                  onChange={() => handleCheckboxPaymentChange(4)}
                />{' '}
                <span>Transferencia</span>
              </div>
            </div>
            <div className={styles.formGroupRight}>
              <img src={EfectivoIcono} alt="Icono de delivery" />
              <div></div>
              <img src={TarjetaIcono} alt="Icono de local" />
            </div>
          </div>

          {checkbox1Selected && (
            <>
              <div className={styles.formGroup}>
                <label className={styles.formGroupLabel} htmlFor="adress">
                  Calle:
                </label>
                <input
                  className={styles.input}
                  type="text"
                  name="adress"
                  id="adress"
                  onChange={handleChange}
                  value={values.adress}
                />
                {errors.adress ? (
                  <span className={styles.error}>{errors.adress}</span>
                ) : null}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formGroupLabel} htmlFor="adressNumber">
                  Numero:
                </label>
                <input
                  className={styles.input}
                  type="text"
                  name="adressNumber"
                  id="adressNumber"
                  onChange={handleChange}
                  value={values.adressNumber}
                />
                {errors.adressNumber ? (
                  <span className={styles.error}>{errors.adressNumber}</span>
                ) : null}
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formGroupLabel} htmlFor="apartment">
                  Departamento: (opcional)
                </label>
                <input
                  className={styles.input}
                  type="text"
                  name="apartment"
                  id="apartment"
                  onChange={handleChange}
                  value={values.apartment}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.formGroupLabel} htmlFor="references">
                  Referencias: (opcional)
                </label>
                <textarea
                  className={styles.textArea}
                  name="references"
                  id="references"
                  onChange={handleChange}
                  value={values.references}
                />
              </div>
            </>
          )}
        </div>
        <div className={styles.buttonContainer}>
          <div className={styles.buttonCard}>
            <div className={styles.buttonInfo}>
              <img
                className={styles.buttonIcon}
                src={WhatsAppIcono}
                alt="Icono de Whatsapp"
              />
              <button className={styles.submitButton} type="submit">
                Finalizar la compra
              </button>
            </div>
          </div>
        </div>
        <div style={{ height: '4rem' }}></div>
      </form>
    </div>
  );
};

export default FormCheckout;
