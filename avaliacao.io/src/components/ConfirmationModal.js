import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ModalExample extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }

        this.setModal = this.setModal.bind(this);
        this.deleteItem = this.deleteItem.bind(this);
    }

    setModal () {
        this.setState({ modal: !this.state.modal});
    }

    deleteItem (id) {
        this.props.confirm(id);
    }
    
    render() {
        const { buttonLabel, className, message } = this.props;
        const { modal } = this.state;
        return (
            <Fragment>
            <Button color="danger" onClick={this.setModal}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={this.setModal} className={className}>
                <ModalHeader toggle={this.setModal}>Confirmação</ModalHeader>
                <ModalBody>
                {message}
                </ModalBody>
                <ModalFooter>
                <Button color="success" onClick={() => this.deleteItem(this.props.id)} >Confirmar</Button>{' '}
                <Button color="secondary" onClick={this.setModal}>Cancelar</Button>
                </ModalFooter>
            </Modal>
            </Fragment>
        );
    }
}

export default ModalExample;