import React from 'react';

const template = () => (
    <div>
        <h1>Ingresar nueva materia</h1>
        <input type="text" placeholder="Nombre..." name="nombre" />
        <input type="text" placeholder="Creditos..." name="creditos" />
        <input type="text" placeholder="Semestre..." name="semestre" />
        <input type="text" placeholder="Objetivo de la asignatura..." name="objetivo" />
        <textarea rows="30" cols="50" placeholder="Temario..."></textarea>
        <input type="text" placeholder="Metodología de enseñanza..." name="metodologia" />
        <input type="text" placeholder="Bibliografía..." name="bibliografia" />
        <input type="text" placeholder="Formas de evaluación..." name="evaluacion" />
    </div>

);