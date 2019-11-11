import React, { Component } from 'react';
export default class tablaMaterias extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lista_materia: "",
            lista: ""
        }
    };

    promesa = async () => {
        return new Promise(function (resolve, reject) {
            fetch(server.api + 'materia/listarMaterias', {
                method: "GET"
            })

                .then(res => {
                    return res.json();
                })
                .then(async data => {
                    resolve(data);
                })
        });
    };

    promesa_eliminar = async (id) => {
        return new Promise(function (resolve, reject) {
            var data = new URLSearchParams();
            data.append("id", id);
            fetch(server.api + 'materia/eliminarMateria', {
                method: "POST",
                credentials: "include",
                header: {
                    "Content-Type": "aplication/x-www-form-urlencoded"
                },
                body: data
            })

                .then(function (res) {
                    return res;
                })
                .then(async data => {
                    resolve(data);
                })
        });
    };

    eliminar_id = (id) => {
        this.promesa_eliminar(id).then(data => {
            console.log(data);
        });
    }

    Listar = () => {
        this.promesa().then(data => {
            if (data.mensaje.length > 0) {
                var ret = data.mensaje.map((data, i) => {
                    return (
                        <tr id={i}>
                            <td>{data.nombreMateria}</td>
                            <td>{data.semestreMateria}</td>
                            <td>{data.creditosMateria}</td>
                            <td><button onclick={() => this.eliminar_id(data._id)} >Eliminar</button></td>
                        </tr>
                    )
                });
                this.setState({ lista: ret });
            } else {
                return (
                    <div>Lista vacia</div>
                )
            }
        });
    }

    componentDidMount() {
        this.Listar();
    }

    render() {
        return (
            <div>
                <h1>Lista materias</h1>
                <NavLink to="/altaMateria">Agregar Materia</NavLink>
                <table className="table table-bordered table-hover">
                    <thead className="bill-header cs">
                        <tr>
                            <th id="trs-hd" className="col-lg-1">Nombre</th>
                            <th id="trs-hd" className="col-lg-2">Semestre</th>
                            <th id="trs-hd" className="col-lg-3">Creditos</th>
                            <th id="trs-hd" className="col-lg-2">Eliminar</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.lista ? this.state.lista : "cargando"}
                    </tbody>
                </table>
            </div>
        );
    }
};

export default lista_materias;
