import React from 'react';
import './App.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
    this.fetchDogAPI = this.fetchDogAPI.bind(this);
  }
  
  componentDidMount() {
    this.fetchDogAPI();
  }

  shouldComponentUpdate(nextProps, nextState) {
    if(nextState.data.message.includes('terrier')) return false;
    return true;
  }

  componentDidUpdate() {
    localStorage.setItem('lastURL', this.state.data.message);
    const breed = this.state.data.message.split('/')[4];
    alert(breed);
  }

  fetchDogAPI() {
    fetch('https://dog.ceo/api/breeds/image/random')
    .then(response => response.json())
    .then(result => this.setState({ data: result }));
  }


  render() {
    const { data } = this.state;
    if(data === '') return 'loading...';
    return (
      <div>
        <h1>Doge Family</h1>
        <button onClick={this.fetchDogAPI}>Next Doge xD</button>
        <div>
          <img src={data.message} alt='random doge' />
        </div>
      </div>
    );
  }
}

