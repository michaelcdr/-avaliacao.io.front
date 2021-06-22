import React, { Component, Fragment } from 'react';
import { Button, Input, Label, Table } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import EdicaoCompetencia from '../Competencias/EdicaoCompetencia';

class ListagemCompetencias2 extends Component {

    constructor(props) {
        super(props);
        this.state = {
            nome: '',
            descritivo: '',
            disciplinaId: props.disciplinaId,
            competencias: props.competencias
        }

        this.setField = this.setField.bind(this);
        this.deleteCompetencia = this.deleteCompetencia.bind(this);
        this.addCompetencia = this.addCompetencia.bind(this);
    }

    setField(e) {
        let {name: fieldName, value} = e.target;

        this.setState({
            [fieldName]: value
        });
    };

    async deleteCompetencia(id) {
        await fetch(`${USERS_API_URL}Competencias/${id}`, {
            method: 'DELETE',
            headers: {
                'Access-Control-Allow-Origin' : '*' ,
                'Access-Control-Allow-Methods' : 'DELETE'
            }
        })
        .then(body => {
            this.props.deleteItemFromState(id);
        })
        .catch(err => console.log(`Erro ao deletar competências: ${err}`));
    }

    async addCompetencia() {
        await fetch(`${USERS_API_URL}Competencias`, {
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
        .then(body => {
            const { descritivo, disciplinaId, id, nome } = body.dados;
            this.props.addItemToState(id, disciplinaId, descritivo, nome);
            console.log('Competência criada com sucesso!');
        }).catch(err => console.log(`Erro ao criar competência: ${err}`));

        this.setState({ nome: '', descritivo: '' });
    }
    
    render() {
        const { disciplinaId, competencias } = this.props;
        const { nome, descritivo } = this.state;
        
        return (
            <Fragment>
                <Label for="competencias">Competências:</Label>
                <Table hover>
                    <thead className="thead-light">
                    <tr>
                        <th>Nome da Competência</th>
                        <th>Descritivo da Competência</th>
                        <th style={{ textAlign: "center" }}>Ações</th>
                    </tr>
                    </thead>
                    <tbody>
                    {!competencias || competencias.length <= 0 ?
                        <tr>
                            <td colSpan="6" align="center">
                                <b>Não há competências cadastradas!</b>
                            </td>
                        </tr>
                        : competencias.map(competencia => (
                        <tr key={competencia.id}>
                            <td>
                            {competencia.nome}
                            </td>
                            <td>
                            {competencia.descritivo}
                            </td>
                            <td align="center">
                            <div>
                                &nbsp;&nbsp;&nbsp;
                                <EdicaoCompetencia competencia={competencia} disciplinaId={disciplinaId} obterCompetencias={this.props.obterCompetencias} />{' '}
                                <ConfirmationModal color='danger' id={competencia.id} confirm={this.deleteCompetencia} message="Tem certeza que deseja deletar a competência?" buttonLabel="Deletar"/>
                            </div>
                            </td>
                        </tr>
                        ))}
                        
                    </tbody>
                    <tfoot>
                        <tr>
                            <td><Input onChange={this.setField} type="text" name="nome" placeholder="Informe o nome da nova competência" value={nome}/></td>
                            <td><Input onChange={this.setField} type="text" name="descritivo" placeholder="Informe o descritivo da nova competência" value={descritivo}/></td>
                            <td>
                            <div align='center'>
                                &nbsp;&nbsp;&nbsp;
                                <Button onClick={this.addCompetencia} color='success'>Adicionar</Button>
                            </div>
                            </td>
                        </tr>
                    </tfoot>
                    
                </Table>
            </Fragment>
        );
    }
}

export default ListagemCompetencias2;

/*
<ConfirmationModal color='success' confirm={} message="Tem certeza que deseja adicionar a nova competência?" buttonLabel=""/>
*/