import React, { Component, Fragment } from 'react';
import { Button, Input, Label, Table } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import ConfirmationModal from '../ConfirmationModal/ConfirmationModal';
import EdicaoHabilidade from './EdicaoHabilidade';

class ListagemHabilidades extends Component {

    constructor(props) {
        super(props);

        this.state = {
            competenciaId: props.competenciaId,
            habilidades: props.habilidades,
            nomeNovaHabilidade: '',
            descritivoNovaHabilidade: ''
        }
        
        this.setField = this.setField.bind(this);
        this.deleteHabilidade = this.deleteHabilidade.bind(this);
        this.addHabilidade = this.addHabilidade.bind(this);
    }

    setField(event) {
        let {name: fieldName, value} = event.target;

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
          this.props.deleteItemFromState(id);
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
                competenciaId: this.state.competenciaId
            })
        })
        .then(res => res.json())
        .then(body => {
            const { id, descritivo, nome, dimensoes } = body.dados;
            this.props.addItemToState(id, descritivo, nome, dimensoes);
            console.log('Habilidade criada com sucesso!');
        }).catch(err => console.log(`Erro ao criar habilidade: ${err}`));

        this.setState({ nomeNovaHabilidade: '', descritivoNovaHabilidade: '' });
    }
    
    render() {
        const { habilidades } = this.props;
        const { competenciaId, nomeNovaHabilidade, descritivoNovaHabilidade } = this.state;
        
        return (
            <Fragment>
                <Label for="habilidades">Habilidades:</Label>
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
                                        <EdicaoHabilidade 
                                            habilidade={habilidade} 
                                            competenciaId={competenciaId} 
                                            obterHabilidades={this.props.obterHabilidades}
                                        />{' '}
                                        <ConfirmationModal color='danger' id={habilidade.id} confirm={this.deleteHabilidade} message="Tem certeza que deseja deletar a habilidade?" buttonLabel="Deletar"/>
                                    </div>
                                </td>
                            </tr>
                        ))}
                        <tr>
                            <td>
                                <Input 
                                    onChange={this.setField} 
                                    type="text" 
                                    name="nomeNovaHabilidade" 
                                    placeholder="Informe o nome da nova habilidade" 
                                    value={nomeNovaHabilidade}
                                />
                            </td>
                            <td>
                                <Input 
                                    onChange={this.setField} 
                                    type="text" 
                                    name="descritivoNovaHabilidade" 
                                    placeholder="Informe o descritivo nova habilidade" 
                                    value={descritivoNovaHabilidade}
                                />
                            </td>
                            <td>
                                <div align='center'>
                                    &nbsp;&nbsp;&nbsp;
                                    <Button onClick={this.addHabilidade} color='success'>Adicionar</Button>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                </Table>
            </Fragment>
        );
    }
}

export default ListagemHabilidades;

/* <Input 
                                        onChange={this.setField}
                                        type="text" 
                                        name="nome" 
                                        placeholder="Informe o nome da habilidade" 
                                        defaultValue={habilidade.nome}

                                        
                                        <Link className="btn btn-outline-primary mr-2" to={`/competencia/edicao/${habilidade.id}`}>Editar</Link>
                                    />*/