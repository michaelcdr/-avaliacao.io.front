import React, { Component } from 'react';
import {  Container, Button, FormGroup, Label, Input, Form } from 'reactstrap';
import { USERS_API_URL } from '../constants';
import { Link } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';
import EdicaoCompetencias from './EdicaoCompetencias';
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

        this.setField = this.setField.bind(this);
        this.salvar = this.salvar.bind(this);
        this.setProfessores = this.setProfessores.bind(this);
        this.obterProfessores = this.obterProfessores.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
        this.addItemFromState = this.addItemFromState.bind(this);
    }

    componentDidMount() {
        const { id } = this.props.match.params;
        this.obterDisciplina(id);
        this.obterCompetencias(id);
        this.obterProfessores();
    }

    setField(event) {
        let {name: fieldName, value} = event.target;

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

    obterProfessores() {
        fetch(`${USERS_API_URL}Professores`)
        .then(res => res.json())
        .then(professoresResult => {
            this.setState({ professoresResult: professoresResult });
            }
        )
        .catch(err => console.log(err));
    }

    obterCompetencias(id) {
        fetch(`${USERS_API_URL}Competencias/ObterTodasPorDisciplina/${id}`)
          .then(res => res.json())
          .then(competencias => this.setState({ competencias: competencias }))
          .catch(err => console.log(err));
    }

    obterDisciplina(id) {
        fetch(`${USERS_API_URL}Disciplinas/${id}`)
        .then(res => res.json())
        .then(disciplinasResult => {
            this.setState({
                id: disciplinasResult.id,
                nome: disciplinasResult.nome,
                descritivo: disciplinasResult.descritivo,
                horario: disciplinasResult.horario,
                professores: disciplinasResult.professores
            });
        })
        .catch(err => console.log(err));
    }

    deleteItemFromState = id => {
        const updated = this.state.competencias.filter(item => item.id !== id);
        this.setState({ competencias: updated });
    }

    addItemFromState = (id, disciplinaId, descritivo, nome ) => {
        const newCompetencia = {
            id: id,
            disciplinaId: disciplinaId,
            descritivo: descritivo,
            nome: nome
        };
        var novoState = this.state.competencias;
        novoState.push(newCompetencia);
        this.setState({ competencias: novoState });
    }

    salvar(e){
        e.preventDefault();
        fetch(`${USERS_API_URL}Disciplinas/${this.state.id}`, {
            method: 'PUT',
            headers: {
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
            console.log('Disciplina atualizada com sucesso!');
        })
        .catch(err => console.log('Erro ao atualizar disciplina: ' + err));
    }

    render() {
        const { id, nome, descritivo, horario, professores, competencias, professoresResult, redirect } = this.state;

        if (redirect) {
        return <Redirect to="/"/>;
        }

        return <Container style={{ paddingTop: "20px" }}>
            <Form onSubmit={this.salvar}>
            <FormGroup>
                <Label for="nome">Nome:</Label>
                <Input onChange={this.setField} type="text" name="nome" placeholder="Informe o nome da disciplina" value={nome}/>
            </FormGroup>
            <FormGroup>
                <Label for="descritivo">Descritivo:</Label>
                <Input onChange={this.setField} type="textarea" name="descritivo" placeholder="Informe o descritivo da disciplina" value={descritivo}/>
            </FormGroup>
            <FormGroup>
                <Label for="horario">Horário:</Label>
                <Input onChange={this.setField} type="time" name="horario" value={horario}/>
            </FormGroup>
            <FormGroup>
                <Label for="professores">Professores:</Label>
                <Input type="select" name="professores" value={professores} onChange={this.setProfessores}  multiple> 
                {professoresResult.map(opt => <option key={opt.id} value={opt.id}>{opt.nome}</option>)}
                </Input>
            </FormGroup>
            <Link className="btn btn-light mr-2" to="/">Voltar</Link>
            <EdicaoCompetencias deleteItemFromState={this.deleteItemFromState} addItemFromState={this.addItemFromState} disciplinaId={id} competencias={competencias} />{' '}
            <Button color='success'>Salvar</Button>
            </Form>
        </Container>;
    }
}
export default withRouter(EdicaoDisciplina);