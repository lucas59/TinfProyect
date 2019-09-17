import React from 'react';
import '../estilos/login.css';
const template = () =>(
<div class="container container-login">
    <h2>Ingresar</h2>
    <form className="formLogin">
        <input type="text" name="correo" placeholder="Correo electronico"/>
        <input type="text" name="nombre" placeholder="Nombre"/>
        <input type="text" name="apellido" placeholder="Apellido"/>
        <input type="text" name="contraseña" placeholder="Contraseña"/>
        <input type="text" name="contraseñaConfirm" placeholder="Confirmar contraseña" id=""/>
        <input type="submit" name="btnEnviar" value="Ingresar" />
    </form>
</div>
);

export default template;
