import React, { Component, Fragment } from 'react';
import { Link } from "react-router-dom";
import { Button, Input, Modal, ModalHeader, ModalFooter, Table, Container, Form, FormGroup, Label } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';

class EdicaoCompetencia2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            id: props.competencia.id,
            disciplinaId: props.disciplinaId,
            nome: props.competencia.nome,
            descritivo: props.competencia.descritivo,
            habilidades: [],
            nomeNovaHabilidade: '',
            descritivoNovaHabilidade: ''
        }
        
        this.setModal = this.setModal.bind(this);
        this.setField = this.setField.bind(this);
        this.deleteHabilidade = this.deleteHabilidade.bind(this);
        this.addHabilidade = this.addHabilidade.bind(this);
        this.deleteItemFromState = this.deleteItemFromState.bind(this);
        this.addItemToState = this.addItemToState.bind(this);
    }

    componentDidMount() {
        //this.obterCompetencia();
        this.obterHabilidades();
    }

    async obterHabilidades() {
        await fetch(`${USERS_API_URL}Habilidades/ObterTodasPorCompetencia/${this.state.id}`)
          .then(res => res.json())
          .then(habilidades => this.setState({ habilidades: habilidades }))
          .catch(err => console.log(err));
    }

    setModal () {
        this.setState({ modal: !this.state.modal});
    }

    setField(e) {
        let {name: fieldName, value} = e.target;

        this.setState({
            [fieldName]: value
        });
    };

    async deleteHabilidade(id) {
        await fetch(`${USERS_API_URL}Habilidades/${id}`, {
          method: 'DELETE',
          headers: {
            'Access-Control-Allow-Origin' : '*' ,
            'Access-Control-Allow-Methods' : 'DELETE'
          }
        }).then(res => {
          this.deleteItemFromState(id);
        }).catch(err => console.log(`Erro ao deletar habilidade: ${err}`));
    }

    async addHabilidade() {
        await fetch(`${USERS_API_URL}Habilidades`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: this.state.nomeNovaHabilidade,
                descritivo: this.state.descritivoNovaHabilidade,
                competenciaId: this.state.id
            })
        })
        .then(res => res.json())
        .then(body => {
            const { id, descritivo, nome, dimensoes } = body.dados;
            this.addItemToState(id, descritivo, nome, dimensoes);
            console.log('Habilidade criada com sucesso!');
        }).catch(err => console.log(`Erro ao criar competência: ${err}`));

        this.setState({ nomeNovaHabilidade: '', descritivoNovaHabilidade: '' });
    }

    deleteItemFromState(id) {
        const updated = this.state.habilidades.filter(item => item.id !== id);
        this.setState({ habilidades: updated });
    }

    addItemToState(id, descritivo, nome, dimensoes) {
        const newHabilidade = {
            id: id,
            descritivo: descritivo,
            nome: nome,
            dimensoes: dimensoes
        };
        var novoState = this.state.habilidades;
        novoState.push(newHabilidade);
        this.setState({ ...this.state.habilidades, newHabilidade });
    }

    async salvar(e){
        e.preventDefault();
        await fetch(`${USERS_API_URL}Competencias/${this.state.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: this.state.nome,
                descritivo: this.state.descritivo,
                disciplinaId: this.state.disciplinaId
            })
        })
        .then(res => res.json())
        .then(body => {
            this.props.obterCompetencias(this.state.disciplinaId);
            this.setModal();
        })
        .catch(err => console.log('Erro ao atualizar competência: ' + err));
    }
    
    render() {
        const { modal, nome, descritivo, habilidades, nomeNovaHabilidade, descritivoNovaHabilidade } = this.state;
        
        return (
            <Fragment>
            <Button outline color="primary" onClick={this.setModal}>Editar</Button>
            <Modal size="lg" isOpen={modal} toggle={this.setModal}>
                <ModalHeader toggle={this.setModal}>Competências</ModalHeader>
                <Container style={{ paddingTop: "20px" }}>
                    <Form onSubmit={e => this.salvar(e)}>
                    <FormGroup>
                        <Label for="nome">Nome:</Label>
                        <Input onChange={e => this.setField(e)} type="text" name="nome" placeholder="Informe o nome da competência" value={nome}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="descritivo">Descritivo:</Label>
                        <Input onChange={e => this.setField(e)} type="textarea" name="descritivo" placeholder="Informe o descritivo da competência" value={descritivo}/>
                    </FormGroup>
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
                                : habilidades.map(habilidade => (
                                <tr key={habilidade.id}>
                                    <td>
                                    {habilidade.nome}
                                    </td>
                                    <td>
                                    {habilidade.descritivo}
                                    </td>
                                    <td align="center">
                                    <div>
                                        &nbsp;&nbsp;&nbsp;
                                        <Link className="btn btn-outline-primary mr-2" to={`/competencia/edicao/${habilidade.id}`}>Editar</Link>{' '}
                                        <ConfirmationModal color='danger' id={habilidade.id} confirm={this.deleteHabilidade} message="Tem certeza que deseja deletar a habilidade?" buttonLabel="Deletar"/>
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
                                        <Button onClick={this.addHabilidade} color='success'>Adicionar</Button>
                                    </div>
                                    </td>
                                </tr>
                            </tbody>
                            <tfoot>
                                
                            </tfoot>
                    </Table>

                    <div style={{ display: 'flex', marginBottom: '10px' }}>
                        <Button onClick={this.setModal} color='light'>Voltar</Button>
                        <Button onClick={e => this.salvar(e)} className='ml-auto' color='success'>Salvar</Button>
                    </div>
                    
                    </Form>
                </Container>
                <ModalFooter>
                </ModalFooter>
            </Modal>
            </Fragment>
        );
    }
}

export default EdicaoCompetencia2;

/*
<ConfirmationModal color='success' confirm={this.addItem} message="Tem certeza que deseja adicionar a nova habilidade?" buttonLabel="Adicionar"/>
*/