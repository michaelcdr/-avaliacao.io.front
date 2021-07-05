import React, { Component } from 'react'
import { USERS_API_URL } from '../../constants';
import { Redirect } from 'react-router';
import {Button, Col, Form, FormGroup, Label, Input } from 'reactstrap';

class Login extends Component {
    
    constructor(props){
        super(props);
        this.state = {
            password: '',
            login: '',
            token: '',
            userName: '',
            nome: '',
            email: '',
            tipo: ''
        }

        this.autenticar = this.autenticar.bind(this);
        this.changeHeadler = this.changeHeadler.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    async autenticar(e) {
        e.preventDefault();
        await fetch(`${USERS_API_URL}Autenticacao/Autenticar`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                password: this.state.password,
                login: this.state.login
            })
        })
        .then(res => res.json())
        .then(body => {
            if (body.sucesso) {
                const { id, token, userName, nome, email, tipo } = body.dados;

                this.setState({
                    id: id,
                    token: token,
                    userName: userName,
                    nome: nome,
                    email: email,
                    tipo: tipo
                });

                this.handleSubmit(e);
            } else {
                alert(body.mensagem);
            }
        })
        .catch(err => console.log("Erro! - " + err));
    }

    changeHeadler = e => {
        this.setState({ [e.target.name]: e.target.value});
    }
  
    /*Armazena os dados de login no navegador*/
    handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('@login-avaliacao.io/id', this.state.id);
        localStorage.setItem('@login-avaliacao.io/token', this.state.token);
        localStorage.setItem('@login-avaliacao.io/username', this.state.userName);
        localStorage.setItem('@login-avaliacao.io/nome', this.state.nome);
        localStorage.setItem('@login-avaliacao.io/email', this.state.email);
        localStorage.setItem('@login-avaliacao.io/tipo', this.state.tipo);
        window.location.href = "http://localhost:3000/";
    }

    render() {
        const { login,password } = this.state;
        const username = localStorage.getItem('@login-avaliacao.io/username');//tras o username armazenado
        if (username !== null) {
            return (
                <Redirect to="/"/>
            );
        }
        //Se não tiver nenhum usuário armazenado (logado) abre o form de login
        return (
            <Form style={styles.container} onSubmit={this.autenticar}>
                <h1>Avaliação.io</h1>
                <hr></hr>
            <FormGroup row>
                <Label for="login" sm={2}>Login:</Label>
                <Col sm = {4}>
                <Input style={styles.username}
                    type="text" 
                    name="login" 
                    placeholder="Informe seu usuário" 
                    onChange={this.changeHeadler} 
                    required 
                    value={login}/>
                </Col>
            </FormGroup>
            <FormGroup row>
                <Label for="password" sm={2}>Senha:</Label>
                <Col sm = {4}>
                <Input style={styles.username}
                    type="password" 
                    name="password" 
                    placeholder="Informe a senha" 
                    onChange={this.changeHeadler} 
                    required 
                    value={password}/>
                </Col>
            </FormGroup>
            <Button color='success' type="submit" >Entrar</Button>
            </Form>
    );
  }
}

//Estilos do form
const styles = {
  container: {
    //display: 'flex',
    textAlign: 'center',
    flexDirection: 'column',
    minWidth: '300px',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 0px 20px',
    background: 'rgb(255, 255, 255)',
    borderRadius: '4px',
    padding: '30px 20px'
  },
  submitButton: {
    height: '40px',
    textAlign: 'center',
    alignItems: 'center',
    borderRadius: '4px',
    fontWeight: 'bold',
    fontSize: '14px',
    border: 0,
    color: '#fff',
    background: '#009587',
    marginTop: '5px',
  },
  username: {
    height: '40px',
    padding: '0 15px',
    border: '1px solid #eee',
    borderRadius: '4px',
    marginBottom: '10px',
    color: '#444',
    size: '20'
  }
}

export default Login;