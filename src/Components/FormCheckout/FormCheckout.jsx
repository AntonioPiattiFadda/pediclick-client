import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useContext, useState, useEffect } from 'react';
import styles from './Formulario.module.css';
import DeliveryIcono from '../../assets/svg/delivery.svg';
import EntregaIcono from '../../assets/svg/entregaLocal.svg';
import EfectivoIcono from '../../assets/svg/Efectivo.svg';
import TarjetaIcono from '../../assets/svg/Tarjeta.svg';
import WhatsAppIcono from '../../assets/svg/Whatsapp.svg';
import { CartContext } from '../Context/CartContext';
import CalculateShipping from '../Maps/CalculateShipping';

const FormCheckout = () => {
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
  const { cart, getCartTotalPrice } = useContext(CartContext);
  const [successBuy, setSuccesBuy] = useState({ stage: 0, active: false });
  const [orderId, setOrderId] = useState(0);
  const [orderInfo, setOrderInfo] = useState({});
  const [total, setTotal] = useState(0);
  const [buyer, setBuyer] = useState({});
  const [extraDeliveryError, setExtraDeliveryError] = useState({
    deliveryError: false,
    deliveryErrorMessage: '',
    paymentError: false,
    paymentErrorMessage: '',
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
    yupObject.homeDelivery = Yup.boolean();
    yupObject.adress = Yup.string().required();
    yupObject.adressNumber = Yup.number().required();
  }
  const initialValues = {
    nombre: '',
    email: '',
    phone: '',
  };
  if (checkbox1Selected) {
    initialValues.adress = '';
    initialValues.adressNumber = null;
  } else if (checkbox2Selected) {
    delete initialValues.adress;
    delete initialValues.adressNumber;
  }

  const { handleSubmit, handleChange, values, errors } = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object(yupObject),

    onSubmit: (data) => {
      let total = getCartTotalPrice();
      console.log(data);
      let order = {
        buyer: data,
        items: cart,
        total,
      };
      let newOrderId = 450;

      //ANCHOR - Validador manual de la info
      if (!checkbox1Selected && !checkbox2Selected) {
        setExtraDeliveryError({
          deliveryError: true,
          deliveryErrorMessage: 'Debes seleccionar un metodo de entrega',
        });
        return;
      }
      if (!checkbox3Selected && !checkbox4Selected) {
        setExtraDeliveryError({
          paymentError: true,
          paymentErrorMessage: 'Por favor ingresa una forma de pago',
        });
        return;
      }

      console.log('order', order);
      console.log('buyer', data);
      console.log('total', total);
      setOrderId(newOrderId);
      setBuyer(data);
      setTotal(total);
      setOrderInfo(cart);
      // setSuccesBuy({ ...successBuy, active: true });
      const getCartItemDetails = (cart) => {
        const itemDetails = cart.map((item) => console.log(item));
        //FIXME - La quentity esta en cada UnitPrice

        
        return itemDetails.join(`,
                `);
      };

      let message = '';

      if (checkbox1Selected) {
        message += `¡Hola! Quisiera hacer el siguiente pedido a nombre de ${
          values.nombre
        }:
        ${getCartItemDetails(cart)}.
      
        Seleccioné entrega a domicilio. 
        Dirección: ${values.adress}, ${values.adressNumber}
        Retiro el día: XXX
        
        Pago: ${values.pay}.
        Pago con: XXX
        
        Total: ${total}.`;
      } else if (checkbox2Selected) {
        message += `¡Hola! Quisiera hacer el siguiente pedido a nombre de ${
          values.nombre
        }:
        ${getCartItemDetails(cart)}.
      
        Seleccioné retirar en tienda.
        
        Pago: ${values.pay}.
        
        Total: ${total}.`;
      }
      const sendWhatsAppMessage = () => {
        const whatsappLink = `https://wa.me/${3516192831}?text=${encodeURIComponent(
          message
        )}`;
        window.location.href = whatsappLink;
      };

      sendWhatsAppMessage();
    },
  });

  // if (successBuy.active) {
  //   return (
  //     //TODO - Hacer que se muestre el numero de orden
  //     <div className={styles.finalInfo}>
  //       <span className={styles.deliveryInfo}>
  //         {' '}
  //         Forma de entrega: {buyer.delivery}
  //       </span>
  //       <span className={styles.deliveryInfo}>
  //         Entrega el día: {buyer.deliveryDay}
  //       </span>
  //       <span className={styles.deliveryInfo}>Tipo de pago: {buyer.pay}</span>
  //       <span className={styles.deliveryInfo}>
  //         Paga con: {buyer.cashPayment}
  //       </span>
  //       <span className={styles.orderList}>
  //         {' '}
  //         Tu pedido es:{' '}
  //         <ul className={styles.listItem}>
  //           {orderInfo.map((item, index) => (
  //             <li key={index} className={styles.listItem}>
  //               {item.quantity} {item.name}
  //             </li>
  //           ))}
  //         </ul>
  //       </span>
  //       <p className={styles.deliveryInfo}>
  //         {' '}
  //         A nombre de: <span className={styles.bold}>{buyer.nombre}</span>
  //       </p>
  //       <p className={styles.deliveryInfo}>
  //         Email: <span className={styles.bold}>{buyer.email}</span>
  //       </p>
  //       <span className={styles.total}> Total: ${total} </span>
  //       <span>La idea es que todo esto se mande por Whatsapp</span>
  //     </div>
  //   );
  // }

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
                  // name="homeDelivery"
                  // id="homeDelivery"
                  // value={values.homeDelivery}
                  onChange={() => handleCheckboxChange(1)}
                />{' '}
                <span>Entrega a domicilio</span>
              </div>
              <div></div>
              <div>
                <input
                  className={styles.checkBoxInput}
                  type="checkbox"
                  checked={checkbox2Selected}
                  // value={values.storeDelivery}
                  // name="storeDelivery"
                  // id="storeDelivery"
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
          {extraDeliveryError.deliveryError && (
            <span className={styles.error}>
              {extraDeliveryError.deliveryErrorMessage}
            </span>
          )}
          {checkbox1Selected && (
            <>
              <CalculateShipping />
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
              {/* <div className={styles.formGroup}>
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
              </div> */}
              {/* <div className={styles.formGroup}>
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
              </div> */}
            </>
          )}
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
          {extraDeliveryError.paymentError && (
            <span className={styles.error}>
              {extraDeliveryError.paymentErrorMessage}
            </span>
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
