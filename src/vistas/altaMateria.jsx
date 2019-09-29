import React from 'react';

const template = () => (
    <div>
        <h1>Ingresar nueva materia</h1>
        <label htmlFor="Nombre">Nombre:</label>
        <input type="text" name="nombre" id="Nombre" />
        <label htmlFor="Creditos">Creditos:</label>
        <input type="text" name="creditos" id="Creditos" />
        <label htmlFor="Semestre">Semestre:</label>
        <select name="semestre" id="Semestre">
            <option value="1"></option>
            <option value="2"></option>
            <option value="3"></option>
            <option value="4"></option>
            <option value="5"></option>
            <option value="6"></option>
        </select>
        <label htmlFor="Objetivo">Objetivo:</label>
        <input type="text" name="objetivo" id="Objetivo" />
        <label htmlFor="Temario">Temario:</label>
        <textarea rows="30" cols="50" name="temario" id="Temario"></textarea>
        <label htmlFor="Metodologia">Metodología:</label>
        <input type="text" name="metodologia" id="Metodologia" />
        <label htmlFor="Bibliografia">Bibliografía:</label>
        <input type="text" name="bibliografia" id="Bibliografia" />
        <label htmlFor="Evaluacion">Formas de evaluación:</label>
        <input type="text" name="evaluacion" id="Evolucion" />
        <input type="button" name="aceptar" value="Aceptar" />
    </div>
);

export default template;