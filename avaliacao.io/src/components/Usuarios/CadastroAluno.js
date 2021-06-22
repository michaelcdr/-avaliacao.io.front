import React, { Component } from 'react';
import {  Container, Button, FormGroup, Label, Input,Form } from 'reactstrap';
import { USERS_API_URL } from '../../constants';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class CadastroAluno extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: 0,
      nome: '',
      userName: '',
      email: '',
      senha: '',
      matricula: '',
      disciplinas : [],
      disciplinasResult: [],
      redirect: false
    }

    this.setField = this.setField.bind(this);
    this.setDisciplinas = this.setDisciplinas.bind(this);
    this.salvar = this.salvar.bind(this);
  }

  componentDidMount(){
    this.obterDisciplinas();
  }

  salvar (e) {
    e.preventDefault();
    fetch(`${USERS_API_URL}Alunos`, {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          nome: this.state.nome,
          matricula: this.state.matricula,
          userName: this.state.userName,
          email: this.state.email,
          senha: this.state.senha,
          disciplinas: this.state.disciplinas
      })
    })
    .then(res => res.json())
    .then((body) => {
        console.log(body);
        this.setState({ redirect: true });
        console.log('Sucess');
    })
      /*.then((obj) => {
        this.setState({ redirect: true });
        console.log(this.state);
        console.log('success');
      })*/
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
    
    
    console.log(this.state);
  }

  obterDisciplinas() {
    fetch(USERS_API_URL + "disciplinas")
      .then(res => res.json())
      .then(disciplinasResult => {
          this.setState({ disciplinasResult: disciplinasResult });
        }
      )
      .catch(err => console.log(err));
  }

  render() {
    const { nome, userName, email, senha, matricula, disciplinasResult} = this.state;
    const redirect = this.state.redirect;

    if (redirect) {
      return <Redirect to="/"/>;
    }

    return <Container style={{ paddingTop: "20px" }}>
        <Form onSubmit={this.salvar}>
          <FormGroup>
            <Label for="nome">Nome:</Label>
            <Input onChange={this.setField} type="text" name="nome" placeholder="Informe o nome do aluno" value={nome}/>
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
            <Input onChange={this.setField} type="email" name="senha" placeholder="Informe a senha do usuário" value={senha}/>
          </FormGroup>
          <FormGroup>
            <Label for="matricula">Matricula:</Label>
            <Input onChange={this.setField} type="text" name="matricula" placeholder="Informe o número de matrícula" value={matricula}/>
          </FormGroup>
          <FormGroup>
            <Label for="disciplinas">Disciplinas:</Label>
            <Input type="select" name="disciplinas" onChange={this.setDisciplinas} multiple> 
              {disciplinasResult.map(opt => <option key={opt.id} value={opt.id}>{opt.nome}</option>)}
            </Input>
          </FormGroup>
          <Link className="btn btn-light mr-2" to="/">Voltar</Link>
          <Button color='success'>Salvar</Button>
        </Form>
    </Container>;
  }
}
export default CadastroAluno;