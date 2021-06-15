import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { USERS_API_URL } from '../constants';
import { Link } from "react-router-dom";
import ConfirmationModal from './ConfirmationModal';

class ListagemDisciplinas extends Component {

  deleteItem = (id) => {
    fetch(`${USERS_API_URL}Disciplinas/${id}`, {
      method: 'DELETE',
      headers: {
        'Access-Control-Allow-Origin' : '*' ,
        'Access-Control-Allow-Methods' : 'DELETE'
      }
    }).then(res => {
      this.props.deleteItemFromState(id);
    }).catch(err => console.log(err));
  }

  render() {
    const items = this.props.items;
    return <Table striped>
        <thead className="thead-dark">
          <tr>
            <th>Nome da disciplina</th>
            <th style={{ textAlign: "center" }}>Ações</th>
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
                    <Link className="btn btn-outline-primary" to={`edicao/${item.id}`}>Editar</Link>{' '}
                    <ConfirmationModal color={'danger'} id={item.id} confirm={this.deleteItem} message="Tem certeza que deseja deletar a disciplina?" buttonLabel="Deletar"/>
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
export default ListagemDisciplinas;