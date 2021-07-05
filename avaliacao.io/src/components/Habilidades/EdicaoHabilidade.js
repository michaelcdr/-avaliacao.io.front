import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Input } from 'reactstrap';
import { USERS_API_URL } from '../../constants';

class EdicaoHabilidade extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            id: props.habilidade.id,
            nome: props.habilidade.nome,
            descritivo: props.habilidade.descritivo
        }

        this.setModal = this.setModal.bind(this);
        this.setField = this.setField.bind(this);
        this.confirmAction = this.confirmAction.bind(this);
    }

    setField(event) {
        let {name: fieldName, value} = event.target;

        this.setState({
            [fieldName]: value
        });
    };

    setModal () {
        this.setState({ modal: !this.state.modal});
    }

    async confirmAction() {
        await fetch(`${USERS_API_URL}Habilidades/${this.props.habilidade.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: this.state.nome,
                descritivo: this.state.descritivo,
                competenciaId: this.props.competenciaId
            })
        })
        .then(body => {
            this.props.obterHabilidades();
            this.setModal();
            console.log('Habilidade atualizada com sucesso!');
        }).catch(err => console.log(`Erro ao atualizar habilidade: ${err}`));
    }
    
    render() {
        const { className } = this.props;
        const { modal, nome, descritivo } = this.state;
        return (
            <Fragment>
            <Button outline color='primary' onClick={this.setModal}>Editar</Button>
            <Modal isOpen={modal} toggle={this.setModal} className={className}>
                <ModalHeader toggle={this.setModal}>Edição da habilidade</ModalHeader>
                <ModalBody>
                    <Input 
                        onChange={this.setField} 
                        type="text" 
                        name="nome" 
                        placeholder="Informe o nome da habilidade para edição" 
                        value={nome}
                    />
                    <hr></hr>
                    <Input 
                        onChange={this.setField} 
                        type="text" 
                        name="descritivo" 
                        placeholder="Informe o descritivo da habilidade para edição" 
                        value={descritivo}
                    />
                </ModalBody>
                <ModalFooter>
                <Button color="success" onClick={() => this.confirmAction(this.props.id)} >Confirmar</Button>{' '}
                <Button color="secondary" onClick={this.setModal}>Cancelar</Button>
                </ModalFooter>
            </Modal>
            </Fragment>
        );
    }
}

export default EdicaoHabilidade;