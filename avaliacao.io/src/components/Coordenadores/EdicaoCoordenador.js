import React, { Component } from 'react';
import {  Container, Button, FormGroup, Label, Input, Form } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class EdicaoCoordenador extends Component {
    constructor(props){
        super(props);
        this.state = {
        id: 0,
        nome: '',
        userName: '',
        email: '',
        senha: '',
        novaSenha: '',
        redirect: false
        }

        this.token = localStorage.getItem('@login-avaliacao.io/token');

        this.setField = this.setField.bind(this);
        this.setDisciplinas = this.setDisciplinas.bind(this);
        this.salvar = this.salvar.bind(this);
    }

    componentDidMount(){
        const { id } = this.props.match.params;
        this.setState({ id: id });

        this.obterDisciplinas();
        this.obterCoordenador(id);
    }

    obterDisciplinas() {
        fetch(`${USERS_API_URL}Disciplinas`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        }
        })
        .then(res => res.json())
        .then(disciplinasResult => {
            this.setState({ disciplinasResult: disciplinasResult });
            }
        )
        .catch(err => console.log(err));
    }

    obterCoordenador(id) {
        fetch(`${USERS_API_URL}Coordenador/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.token}`,
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(professor => {
                this.setState({ 
                    nome: professor.nome,
                    userName: professor.userName,
                    email: professor.email
                });
            })
            .catch(err => console.log(err));
    }

    salvar (e) {
        e.preventDefault();
        fetch(`${USERS_API_URL}Coordenador`, {
        method: 'PUT',
        headers: {
            'Authorization': `Bearer ${this.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome: this.state.nome,
            userName: this.state.userName,
            email: this.state.email,
            senha: this.state.novaSenha,
            senhaAntiga: this.state.senha,
            id: this.state.id
        })
        })
        .then(res => res.json())
        .then((body) => {
            console.log(body);
            this.setState({ redirect: true });
        })
        .catch(err => console.log(err));
    }

    setField(event) {
        let {name: fieldName, value} = event.target;

        this.setState({
        [fieldName]: value
        });
    };

    setDisciplinas(event) {
        let opts = [], opt;
        for (let i = 0, len = event.target.options.length; i < len; i++) {
            opt = event.target.options[i];
            if (opt.selected) {
                opts.push(opt.value);
            }
        }

        this.setState({
            disciplinas: opts
        });
    }

    render() {
        const { nome, userName, email, senha, novaSenha, redirect } = this.state;

        if (redirect) {
        return <Redirect to="/cadastro"/>;
        }

        return <Container style={{ paddingTop: "20px" }}>
            <Form onSubmit={this.salvar}>
                <FormGroup>
                    <Label for="nome">Nome:</Label>
                    <Input onChange={this.setField} type="text" name="nome" placeholder="Informe o nome do coordenador" value={nome}/>
                </FormGroup>
                <FormGroup>
                    <Label for="userName">Usuario:</Label>
                    <Input onChange={this.setField} type="textarea" name="userName" placeholder="Informe o nome de usuário" value={userName}/>
                </FormGroup>
                <FormGroup>
                    <Label for="email">Email:</Label>
                    <Input onChange={this.setField} type="email" name="email" placeholder="Informe o email do usuário" value={email}/>
                </FormGroup>
                <FormGroup>
                    <Label for="senha">Senha:</Label>
                    <Input onChange={this.setField} type="password" name="senha" placeholder="Informe a senha do usuário" value={senha}/>
                </FormGroup>
                <FormGroup>
                    <Label for="novaSenha">Nova senha:</Label>
                    <Input onChange={this.setField} type="password" name="novaSenha" placeholder="Informe a nova senha do usuário" value={novaSenha}/>
                </FormGroup>
                <Link className="btn btn-light mr-2" to="/cadastro">Voltar</Link>
                <Button color='success'>Salvar</Button>
            </Form>
        </Container>;
    }
}
export default EdicaoCoordenador;