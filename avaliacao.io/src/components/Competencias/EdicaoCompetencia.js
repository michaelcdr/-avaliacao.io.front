import React, { Component, Fragment } from 'react';
import { Button, Input, Modal, ModalHeader, ModalFooter, Container, Form, FormGroup, Label } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import ListagemHabilidades from '../Habilidades/ListagemHabilidades';

class EdicaoCompetencia2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            id: props.competencia.id,
            disciplinaId: props.disciplinaId,
            nome: props.competencia.nome,
            descritivo: props.competencia.descritivo,
            habilidades: []
        }

        this.token = localStorage.getItem('@login-avaliacao.io/token');
        
        this.obterHabilidades = this.obterHabilidades.bind(this);
        this.setModal = this.setModal.bind(this);
        this.setField = this.setField.bind(this);
        this.deleteItemFromState = this.deleteItemFromState.bind(this);
        this.addItemToState = this.addItemToState.bind(this);
    }

    componentDidMount() {
        //this.obterCompetencia();
        this.obterHabilidades();
    }

    async obterHabilidades() {
        await fetch(`${USERS_API_URL}Habilidades/ObterTodasPorCompetencia/${this.state.id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })
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
                'Authorization': `Bearer ${this.token}`,
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
        const { modal, id, nome, descritivo, habilidades } = this.state;
        
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

                    <ListagemHabilidades 
                        deleteItemFromState={this.deleteItemFromState} 
                        addItemToState={this.addItemToState} 
                        competenciaId={id} 
                        habilidades={habilidades}
                        obterHabilidades={this.obterHabilidades} />{' '}

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