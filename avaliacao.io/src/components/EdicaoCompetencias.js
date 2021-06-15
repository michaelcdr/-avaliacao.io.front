import React, { Component, Fragment, Link } from 'react';
import { Button, Input, Modal, ModalHeader, ModalBody, ModalFooter, Table } from 'reactstrap';
import { USERS_API_URL } from '../constants';
import CadastroCompetencia from './CadastroCompetencia';
import ConfirmationModal from './ConfirmationModal';

class EdicaoCompetencias extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            items: [],
            nome: '',
            descritivo: '',
            disciplinaId: props.disciplinaId,
            competencias: props.competencias,
            cadastrar: false
        }
        
        this.setField = this.setField.bind(this);
        this.setModal = this.setModal.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
        this.getItens = this.getItens.bind(this);
        this.addItem = this.addItem.bind(this);
        this.getProps = this.getProps.bind(this);
    }

    getProps() {
        this.setState({
            disciplinaId: this.props.disciplinaId,
            competencias: this.props.competencias
        });
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

    setCadastrar () {
        this.setState({ cadastrar: !this.state.cadastrar});
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
        const { className, competencias } = this.props;
        const { modal, nome, descritivo } = this.state;
        
        return (
            <Fragment>
            <Button color="primary" onClick={this.setModal}>Editar Competências</Button>
            <Modal size="lg" isOpen={modal} toggle={this.setModal} className={className}>
                <ModalHeader toggle={this.setModal}>Competências</ModalHeader>
                <Table striped>
                    <thead className="thead-dark">
                    <tr>
                        <th>Nome da Competência</th>
                        <th>Descritivo da Competência</th>
                        <th style={{ textAlign: "center" }}>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!competencias || competencias.length <= 0 ?
                        <tr>
                            <td>
                                <b>Não há competências cadastradas!</b>
                            </td>
                        </tr>
                        : competencias.map(item => (
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
                                <ConfirmationModal color='danger' id={item.id} confirm={this.deleteItem} message="Tem certeza que deseja deletar a competência?" buttonLabel="Deletar"/>
                            </div>
                            </td>
                        </tr>
                        ))}
                        <tr>
                            <td><Input onChange={this.setField} type="text" name="nome" placeholder="Informe o nome da competência" value={nome}/></td>
                            <td><Input onChange={this.setField} type="text" name="descritivo" placeholder="Informe o descritivo da competência" value={descritivo}/></td>
                            <td>
                            <div>
                                &nbsp;&nbsp;&nbsp;
                                <ConfirmationModal color='success' confirm={this.addItem} message="Tem certeza que deseja adicionar a nova competência?" buttonLabel="Adicionar"/>
                            </div>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                           
                    </tfoot>
                </Table>
                <ModalFooter>
                </ModalFooter>
            </Modal>
            </Fragment>
        );
    }
}

export default EdicaoCompetencias;

/*
                                <Link className="btn btn-outline-primary" to={`edicao/${item.id}`}>Editar</Link>{' '}

if (cadastrar) {
    console.log(id);
    return (
        <Fragment>
        <Modal size="lg" isOpen={true} toggle={this.setModal} className={className}>
            <ModalHeader toggle={this.setModal}>Competências</ModalHeader>
            <CadastroCompetencia id={id} />
            <ModalFooter>
            <Button color="success" onClick={this.setCadastrar} >Confirmar</Button>
            </ModalFooter>
        </Modal>
        </Fragment>
    );
}
                <Button color="success" onClick={this.setCadastrar} >Cadastrar</Button>

*/