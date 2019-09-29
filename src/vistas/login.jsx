import React from 'react';
import styles from '../estilos/login.css';

const template = () => (
    <div style={styles.contenedorlogin} id="contenedorlogin" >
    <div style={styles.wrapper, styles.fadeInDown} className="wrapper fadeInDown">
  <div style={styles.formContent} id="formContent">
    <div className="fadeIn first">
      <img src={require("../img/coder.png")}  id="icon" alt="User Icon" />
    </div>
    <form>
      <input type="text" id="login" className="fadeIn second" name="login" placeholder="Correo" />
      <input type="text" id="password" className="fadeIn third" name="login" placeholder="Contraseña" />
      <input type="submit" value="Ingresar" className="fadeIn fourth" defaultValue="Log In" />
    </form>
    {/* Remind Passowrd */}
    <div id="formFooter">
      <a className="underlineHover" href="#">¿Olvidastes tu contraseña?</a>
    </div>
  </div>
  
</div>
</div>
);


export default template;
