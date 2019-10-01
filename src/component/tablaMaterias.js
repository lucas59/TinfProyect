import React, { Component } from 'react';
import Style from '../estilos/tablaMaterias.css';
import filtro from '../otros/filtroTablaMateria.js';

export default class tablaMaterias extends Component {
    render() {
        return (
            <div className="col-md-12 search-table-col">
                <div className="form-group pull-right col-lg-4"><input type="text" placeholder="buscar..." className="search form-control" /></div><span className="counter pull-right" />
                <div className="table-responsive table-bordered table table-hover table-bordered results">
                    <table className="table table-bordered table-hover">
                        <thead className="bill-header cs">
                            <tr>
                                <th id="trs-hd" className="col-lg-1">Nombre</th>
                                <th id="trs-hd" className="col-lg-2">Semestre</th>
                                <th id="trs-hd" className="col-lg-3">Docente</th>
                                <th id="trs-hd" className="col-lg-2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="warning no-result">
                                <td colSpan={12}><i className="fa fa-warning" />&nbsp; No hay Resultados!!!</td>
                            </tr>
                            <tr>
                                <td />
                                <td />
                                <td />
                                <td><button className="btn btn-success" type="submit" style={{ marginLeft: 5 }}><i className="fa fa-check" style={{ fontSize: 15 }} /></button><button className="btn btn-danger" type="submit" style={{ marginLeft: 5 }}><i className="fa fa-trash" style={{ fontSize: 15 }} /></button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
};
