import React, { Component } from 'react';
import {  Container, Button, FormGroup, Label, Input, Form } from 'reactstrap';
import { USERS_API_URL } from '../constants';
import { Link } from 'react-router-dom';
import { Redirect, withRouter } from 'react-router';


class EdicaoDisciplina extends Component {
    constructor(props){
        super(props);
        this.state = {
            id: 0,
            nome: '',
            descritivo: '',
            professores: [],
            professoresResult: [],
            items: [],
            redirect: false
        }

        this.setField = this.setField.bind(this);
        this.salvar = this.salvar.bind(this);
        this.setProfessores = this.setProfessores.bind(this);
        this.componentDidMount = this.componentDidMount.bind(this);
    }

    componentDidMount() {
        //console.log(this.props.match.params.id);
        this.obterProfessores();
        const { id } = this.props.match.params;
        fetch(`${USERS_API_URL}Disciplinas/${id}`)
        .then(res => res.json())
        .then(disciplinasResult => {
            this.setState({ id: disciplinasResult.id });
            this.setState({ nome: disciplinasResult.nome });
            this.setState({ descritivo: disciplinasResult.descritivo });
            this.setState({ professores: disciplinasResult.professores });
            console.log(disciplinasResult.nome);
            console.log(disciplinasResult.professores);
            }
        )
        .catch(err => console.log(err));
    }

    setField(event) {
        let {name: fieldName, value} = event.target;

        this.setState({
            [fieldName]: value
        });
    };

    setProfessores(event) {
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
        
        
        console.log(this.state);
    }

    obterProfessores() {
        fetch(USERS_API_URL + "professores")
        .then(res => res.json())
        .then(professoresResult => {
            this.setState({ professoresResult: professoresResult });
            }
        )
        .catch(err => console.log(err));
    }

    salvar(e){
        e.preventDefault();
        fetch(`${USERS_API_URL}Disciplinas/${this.state.id}`, {
        method: 'put',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: this.state.nome,
            descritivo: this.state.descritivo,
            professores: this.state.professores
        })
        })
        .then(() => {
            this.setState({ redirect: true });
            console.log(this.state);
            console.log('sucess');
        })
        .catch(err => console.log(err));
        
        //console.log(this.state);
    }

    render() {
        const { nome, descritivo, professores, professoresResult } = this.state;
        const redirect = this.state.redirect;

        //console.log(professores);

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
                <Label for="professores">Professores:</Label>
                <Input type="select" name="professores" value={professores} onChange={this.setProfessores}  multiple> 
                {professoresResult.map(opt => <option key={opt.id} value={opt.id}>{opt.nome}</option>)}
                </Input>
            </FormGroup>
            <Link className="btn btn-warning mr-2" to="/">Voltar</Link>
            <Button>Salvar</Button>
            </Form>
        </Container>;
    }
}
export default withRouter(EdicaoDisciplina);