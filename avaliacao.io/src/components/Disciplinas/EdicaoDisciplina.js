import React, { Component } from 'react';
import {  Container, Button, FormGroup, Label, Input, Form } from 'reactstrap';
import { Link } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';

import { USERS_API_URL } from '../../constants';
import ListagemCompetencias from '../Competencias/ListagemCompetencias';

class EdicaoDisciplina extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            nome: '',
            descritivo: '',
            horario: '',
            professores: [],
            competencias: [],
            professoresResult: [],
            redirect: false
        }
        
        this.token =  localStorage.getItem('@login-avaliacao.io/token');

        this.obterCompetencias = this.obterCompetencias.bind(this);
        this.deleteItemFromState = this.deleteItemFromState.bind(this);
        this.addItemToState = this.addItemToState.bind(this);
        this.salvar = this.salvar.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.setState({ id: id });
        this.obterDisciplina(id);
        this.obterCompetencias(id);
        this.obterProfessores();
    }

    async obterDisciplina(id) {
        await fetch(`${USERS_API_URL}Disciplinas/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(body => {
            this.setState({
                nome: body.nome,
                descritivo: body.descritivo,
                horario: body.horario,
                professores: body.professores
            });
        })
        .catch(err => console.log(err));
    }

    async obterCompetencias(id) {
        await fetch(`${USERS_API_URL}Competencias/ObterTodasPorDisciplina/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })
          .then(res => res.json())
          .then(competencias => this.setState({ competencias: competencias }))
          .catch(err => console.log(err));
    }

    async obterProfessores() {
        await fetch(`${USERS_API_URL}Professores`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })
        .then(res => res.json())
        .then(professoresResult => {
            this.setState({ professoresResult: professoresResult });
        })
        .catch(err => console.log(err));
    }

    setField(e) {
        let {name: fieldName, value} = e.target;

        this.setState({
            [fieldName]: value
        });
    };

    setProfessores = (event) =>  {
        let opts = [], opt;
        for (let i = 0, len = event.target.options.length; i < len; i++) {
            opt = event.target.options[i];
            if (opt.selected) {
                opts.push(opt.value);
            }
        }

        this.setState({
            professores: opts
        });
    }
    
    deleteItemFromState(id) {
        const updated = this.state.competencias.filter(competencia => competencia.id !== id);
        this.setState({ competencias: updated });
    }

    addItemToState(id, disciplinaId, descritivo, nome ) {
        const newCompetencia = {
            id: id,
            disciplinaId: disciplinaId,
            descritivo: descritivo,
            nome: nome
        };
        var novoState = this.state.competencias;
        novoState.push(newCompetencia);
        this.setState({ ...this.state.competencias, newCompetencia });
    }

    async salvar(e){
        e.preventDefault();
        await fetch(`${USERS_API_URL}Disciplinas/${this.state.id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nome: this.state.nome,
                descritivo: this.state.descritivo,
                horario: this.state.horario,
                professores: this.state.professores
            })
        })
        .then((body) => {
            this.setState({ redirect: true });
        })
        .catch(err => console.log('Erro ao atualizar disciplina: ' + err));
    }

    render() {
        const { id, nome, descritivo, horario, professores, competencias, professoresResult, redirect } = this.state;

        if (redirect) {
            return <Redirect to="/disciplinas"/>;
        }

        return <Container style={{ paddingTop: "20px" }}>
            <Form onSubmit={this.salvar}>
            <FormGroup>
                <Label for="nome">Nome:</Label>
                <Input onChange={e => this.setField(e)} type="text" name="nome" placeholder="Informe o nome da disciplina" value={nome}/>
            </FormGroup>
            <FormGroup>
                <Label for="descritivo">Descritivo:</Label>
                <Input onChange={e => this.setField(e)} type="textarea" name="descritivo" placeholder="Informe o descritivo da disciplina" value={descritivo}/>
            </FormGroup>
            <FormGroup>
                <Label for="horario">Horário:</Label>
                <Input onChange={e => this.setField(e)} type="time" name="horario" value={horario}/>
            </FormGroup>
            <FormGroup>
                <Label for="professores">Professores:</Label>
                <Input type="select" name="professores" value={professores} onChange={this.setProfessores}  multiple> 
                {professoresResult.map(opt => <option key={opt.id} value={opt.id}>{opt.nome}</option>)}
                </Input>
            </FormGroup>
            
            <ListagemCompetencias deleteItemFromState={this.deleteItemFromState} addItemToState={this.addItemToState} obterCompetencias={this.obterCompetencias} disciplinaId={id} competencias={competencias} />{' '}
            
            
            <div style={{ display: 'flex', marginBottom: '20px' }}>
                <Link className="btn btn-light mr-2" to="/disciplinas">Voltar</Link>
                <Button className='ml-auto' color='success'>Salvar</Button>
            </div>
            
            </Form>
        </Container>;
    }
}
export default withRouter(EdicaoDisciplina);