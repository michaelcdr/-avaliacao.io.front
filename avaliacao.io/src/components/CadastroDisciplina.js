import React, { Component } from 'react';
import {  Container, Button, FormGroup, Label, Input,Form } from 'reactstrap';
import { USERS_API_URL } from '../constants';
import { Link } from 'react-router-dom';
import { Redirect } from 'react-router';

class CadastroDisciplina extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: 0,
      nome: '',
      descritivo: '',
      horario: '',
      professores : [],
      professoresResult: [],
      redirect: false
    }

    this.setField = this.setField.bind(this);
    this.setProfessores = this.setProfessores.bind(this);
    this.salvar = this.salvar.bind(this);
  }

  componentDidMount(){
    this.obterProfessores();
  }

  salvar (e) {
    e.preventDefault();
    fetch(`${USERS_API_URL}Disciplinas`, {
      method: 'POST',
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

  render() {
    const { nome, descritivo, horario, professoresResult} = this.state;
    const redirect = this.state.redirect;

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
            <Input type="select" name="professores" onChange={this.setProfessores} multiple> 
              {professoresResult.map(opt => <option key={opt.id} value={opt.id}>{opt.nome}</option>)}
            </Input>
          </FormGroup>
          <Link className="btn btn-light mr-2" to="/">Voltar</Link>
          <Button color='success'>Salvar</Button>
        </Form>
    </Container>;
  }
}
export default CadastroDisciplina;