import React, { Component, Fragment } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ConfirmationModal extends Component {

    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }

        this.setModal = this.setModal.bind(this);
        this.confirmAction = this.confirmAction.bind(this);
    }

    setModal () {
        this.setState({ modal: !this.state.modal});
    }

    confirmAction (id) {
        this.props.confirm(id);
        this.setModal();
    }
    
    render() {
        const { buttonLabel, className, message, color } = this.props;
        const { modal } = this.state;
        return (
            <Fragment>
            <Button color={color} onClick={this.setModal}>{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={this.setModal} className={className}>
                <ModalHeader toggle={this.setModal}>Confirmação</ModalHeader>
                <ModalBody>
                {message}
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

export default ConfirmationModal;