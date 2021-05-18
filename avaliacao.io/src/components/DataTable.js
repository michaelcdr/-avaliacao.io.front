import React, { Component } from 'react';
import { Table, Button } from 'reactstrap';
import { USERS_API_URL } from '../constants';
import { Link } from "react-router-dom";

class DataTable extends Component {

  deleteItem = id => {
    let confirmDeletion = window.confirm('Do you really wish to delete it?');
    if (confirmDeletion) {
      fetch(`${USERS_API_URL}disciplinas/${id}`, {
        method: 'DELETE',
        headers: {
          'Access-Control-Allow-Origin' : '*' ,
          'Access-Control-Allow-Methods' : 'DELETE'
        }
      }).then(res => {
        this.props.deleteItemFromState(id);
      }).catch(err => console.log(err));
    }
  }

  render() {
    const items = this.props.items;
    return <Table striped>
        <thead className="thead-dark">
          <tr>
            <th>Nome da disciplina</th>
            <th style={{ textAlign: "center" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {!items || items.length <= 0 ?
            <tr>
              <td colSpan="6" align="center"><b>Não há disciplinas cadastradas.</b></td>
            </tr>
            : items.map(item => (
              <tr key={item.id}>
                <td>
                  {item.nome}
                </td>
                <td align="center">
                  <div>
                    &nbsp;&nbsp;&nbsp;
                    <Button color="danger" onClick={() => this.deleteItem(item.id)}>Delete</Button>
                  </div>
                </td>
              </tr>
            ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan="2">
            <Link className="btn btn-primary" to="/cadastro">Cadastrar</Link>
            </td>
          </tr>        
        </tfoot>
      </Table>
    ;
  }
}
export default DataTable;