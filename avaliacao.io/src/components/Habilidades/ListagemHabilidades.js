import React, { Component, Fragment } from 'react';
import { Button, Input, Label, Table } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

class ListagemHabilidades extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            items: [],
            nome: '',
            descritivo: '',
            disciplinaId: props.disciplinaId,
            competencias: props.competencias,
            update: false
        }
        
        this.setField = this.setField.bind(this);
        this.setModal = this.setModal.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.getItens = this.getItens.bind(this);
        this.addItem = this.addItem.bind(this);
    }
    
    getItens(id) {
        fetch(`${USERS_API_URL}Competencias/ObterTodasPorDisciplina/${id}`)
          .then(res => res.json())
          .then(items => this.setState({ items: items }))
          .catch(err => console.log(`Erro ao buscar competências: ${err}`));
    }

    setModal () {
        this.setState({ modal: !this.state.modal});
    }

    setField(event) {
        let {name: fieldName, value} = event.target;

        this.setState({
            [fieldName]: value
        });
    };

    deleteItem = (id) => {
        fetch(`${USERS_API_URL}Competencias/${id}`, {
          method: 'DELETE',
          headers: {
            'Access-Control-Allow-Origin' : '*' ,
            'Access-Control-Allow-Methods' : 'DELETE'
          }
        }).then(res => {
          this.props.deleteItemFromState(id);
        }).catch(err => console.log(`Erro ao deletar competências: ${err}`));
    }

    addItem() {
        fetch(`${USERS_API_URL}Competencias`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: this.state.nome,
            descritivo: this.state.descritivo,
            disciplinaId: this.props.disciplinaId
        })
        })
        .then(res => res.json())
        .then((body) => {
            const { descritivo, disciplinaId, id, nome } = body.dados;            
            this.props.addItemFromState(id, disciplinaId, descritivo, nome);
            console.log('Competência criada com sucesso!');
        }).catch(err => console.log(`Erro ao criar competência: ${err}`));

        this.setState({ nome: '', descritivo: '' });
    }
    
    render() {
        const { competencias } = this.props;
        const { nome, descritivo, disciplinaId } = this.state;
        
        return (
            <Fragment>
                <Label for="competencias">Competências:</Label>
                <Table striped>
                            <thead className="thead-light">
                            <tr>
                                <th>Nome da Habilidade</th>
                                <th>Descritivo da Habilidade</th>
                                <th style={{ textAlign: "center" }}>Ações</th>
                            </tr>
                            </thead>
                            <tbody>
                            {!habilidades || habilidades.length <= 0 ?
                                <tr>
                                    <td colSpan="6" align="center">
                                        <b>Não há habilidades cadastradas!</b>
                                    </td>
                                </tr>
                                : habilidades.map(item => (
                                <tr key={item.id}>
                                    <td>
                                    {item.nome}
                                    </td>
                                    <td>
                                    {item.descritivo}
                                    </td>
                                    <td align="center">
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                        <Link className="btn btn-outline-primary mr-2" to={`/competencia/edicao/${item.id}`}>Editar</Link>{' '}
                                        <ConfirmationModal color='danger' id={item.id} confirm={this.deleteItem} message="Tem certeza que deseja deletar a habilidade?" buttonLabel="Deletar"/>
                                    </div>
                                    </td>
                                </tr>
                                ))}
                                <tr>
                                    <td><Input onChange={this.setField} type="text" name="nomeNovaHabilidade" placeholder="Informe o nome da nova habilidade" value={nomeNovaHabilidade}/></td>
                                    <td><Input onChange={this.setField} type="text" name="descritivoNovaHabilidade" placeholder="Informe o descritivo nova habilidade" value={descritivoNovaHabilidade}/></td>
                                    <td>
                                    <div align='center'>
                                        &nbsp;&nbsp;&nbsp;
                                        <Button onClick={this.addItem} color='success'>Adicionar</Button>
                                    </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                
                            </tfoot>
                </Table>
            </Fragment>
        );
    }
}

export default ListagemHabilidades;

/*
<ConfirmationModal color='success' confirm={} message="Tem certeza que deseja adicionar a nova competência?" buttonLabel=""/>
*/