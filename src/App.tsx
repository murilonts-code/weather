import 'core-js/es/map';
import 'core-js/es/set';
import axios from 'axios';
import { Component } from 'react';
import {
  SecondBox,
  Dating,
  CloudRec,
} from './helper';
import './App.css';

class App extends Component<{}, any> {
  constructor(props) {
    super(props);
    this.state = {
      persons: [],
      isLoaded: false,
      bottonBox: false,
      bottonBoxWeather: [],
      Clicked: "",
      city: "Fortaleza",
      cidade: "",
      cod: true
    }
    this.handleClick = this.handleClick.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(event) {
    this.setState({ cidade: event.target.value });
  }

  handleSubmit(event) {
    this.setState({ city: this.state.cidade });
    event.preventDefault();
  }

  handleClick(person) {
    var checker = person.dt;
    this.state.Clicked == "" ? this.setState({ bottonBox: true, bottonBoxWeather: person, Clicked: checker }) :
      checker == this.state.Clicked ? this.setState({ bottonBox: !this.state.bottonBox, bottonBoxWeather: person, Clicked: "" }) : this.setState({ Clicked: checker, bottonBoxWeather: person });
  }

  async componentDidMount() {
    const response = await axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state.city}&cnt=5&appid=886705b4c1182eb1c69f28eb8c520e20&units=metric`)
    const persons = response.data.list;
    const cod = response.data.cod;
    this.setState({ persons, cod, isLoaded: true });
    // testando o node daqui pra baixo(nesse componente)
    axios.get(`http://localhost:3001/api/v1/alunos`)
    .then(teste => {
      console.log(teste);
    })
    

  }

  async componentDidUpdate(a, sS) {
    if (sS.city != this.state.city) {
      this.setState({ isLoaded: false, bottonBox: false, cod: true });
      try {
        const responde = await axios.get(`http://api.openweathermap.org/data/2.5/forecast/daily?q=${this.state.city}&cnt=5&appid=886705b4c1182eb1c69f28eb8c520e20&units=metric`)
        const persons = responde.data.list
        this.setState({ persons, isLoaded: true, cod: true });
      } catch (err) { this.setState({ isLoaded: false, cod: false }) }
    }
  }

  render() {
    return (
      <div className="App">
        <header>Previsão do clima para os próximos 5 dias</header>
        <div className="cidade">{<Search submit={this.handleSubmit} handleChange={this.handleChange} place={this.state.city} />}</div>
        {!this.state.isLoaded ? <Loading erro={this.state.cod} /> : <Good weather={this.state.persons} city={this.state.city} handle={this.handleClick} />}
        <SecondBox aparece={this.state.bottonBox} param={this.state.bottonBoxWeather} />
      </div>
    );
  }
}

const Loading: Function = (props) => {
  return (
    props.erro ?
      <div className="loading">
        <div className="lds-ellipsis"><div></div><div></div><div></div></div>
      </div> :
      <div className="loading caixa erro">
        <div>O nome da cidade que você digitou é invalido</div>
      </div>
  );
}

const Good: Function = (props) => {
  return (
    <div key={props.weather.dt}>
      <div className="caixa">
        {props.weather.map(person =>
          <div className="row block" key={person.dt} onClick={() => props.handle(person)}>
            <div className="items"><Dating data={person.dt} espec="dia" /></div>
            <div className="items "><CloudRec type={person.weather[0].icon} /></div>
            <div className="items">
              <div>Sensação de</div>
              {Math.round(person.feels_like.day)}° C
              </div>
            <div className="items">
              <div>Temp. max</div>
              {Math.round(person.temp.max)}° C
              </div>
            <div className="items">
              <div>Temp. min</div>
              {Math.round(person.temp.min)}° C
              </div>
          </div>
        )}
      </div>
    </div>
  );
}

const Search: Function = (props) => {
  return (
    <>
      <form onSubmit={props.submit}>
        <label>
          <input type="text" onChange={props.handleChange} placeholder={props.place} />
        </label>
      </form>
    </>
  );
}

export default App;
