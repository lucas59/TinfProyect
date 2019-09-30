import React from 'react';
import styles from '../estilos/alta_carrera.module.css';
const template = () => (
   <div>
  <h1 classname="{styles.titulo}">Alta carrera</h1>
  <form classname="{styles.form}">
    <p>Nombre</p><input className="form-control texto" id="nombre" type="text" placeholder="Nombre de la carrera" />
    <p>Descripción</p><input className="form-control texto" id="descripcion" type="text" placeholder="Descripción de la carrera" />
    <p>Perfil de ingreso</p><textarea className="form-control texto" id="perfil_ing" placeholder="Perfil de ingreso" defaultValue={""} />
    <p>Perfil de egreso</p><textarea className="form-control texto" id="perfil_egr" placeholder="Perfil de egreso" defaultValue={""} />
    <p>Contactos</p><textarea className="form-control texto" id="contactos" placeholder="Contactos" defaultValue={""} />
   
    <p>Materias</p>
    <select id="materias">
      <option value=".Net">.Net</option>
      <option value="Probabilidad">Probabilidad y estadisticas</option>
      <option value="sistemas de control">Sistemas de control</option>
    </select>
            <input id="aceptar" onClick={this.Alta_carrera} name="aceptar" defaultValue="Aceptar" type="button" />
  </form>
</div>

);

export default template;