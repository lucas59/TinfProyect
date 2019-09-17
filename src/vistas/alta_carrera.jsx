import React from 'react';
import '../estilos/alta_carrera.css';
const template = () => (
    <div>
        <h1>Alta carrera</h1>
        <form class="form">
            <p>Nombre</p><input id="nombre" type="text" placeholder="Nombre de la carrera"/>
            <p>Descripción</p><input id="descripcion" type="text" placeholder="Descripción de la carrera"></input>
            <p>Perfil de ingreso</p><textarea id="perfil_ing" placeholder="Perfil de ingreso"></textarea>
            <p>Perfil de egreso</p><textarea id="perfil_egr" placeholder="Perfil de egreso"></textarea>
            <p>Contactos</p><textarea id="contactos" placeholder="Contactos"></textarea>
            <p>Administrador</p>
            <select id="admin">
                <option value="Jose">Jose</option>
                <option value="Pedro">Pedro</option>
                <option value="Varela">Varela</option>
                </select>
            <p>Materias</p>
            <select id="materias">
                <option value=".Net">.Net</option>
                <option value="Probabilidad">Probabilidad y estadisticas</option>
                <option value="sistemas de control">Sistemas de control</option>
            </select>
            <input name="aceptar" value="Aceptar" type="button"/>
        </form>
    </div>
);

export default template;