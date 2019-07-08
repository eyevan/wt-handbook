import React from 'react';
import { Component } from 'react';
import './App.css';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import Header from './components/Header/Header';
import Content from './components/Content/Content';

const client = new ApolloClient({
  uri: 'https://countries.trevorblades.com/'
})


class App extends Component {
  state = {
    currentContinent: null,
    currentCountry: null
  }

  /**
   * Return wether the countries select should be disabled or not
   */
  disableCountries = () => {
    if (!this.state.currentContinent) {
      return 'disabled'
    }
  }

  /**
   * On continent select change
   * @param event Event
   */
  onContinentSelect = event => {
    this.setState({ currentContinent: event.target.value });
  }

  /**
   * On country select change
   * @param event Event
   */
  onCountrySelect = event => {
    this.setState({ currentCountry: event.target.value });
  }

  /**
   * On search field change
   * @param event Event
   */
  onSearch = selectedOption => {
    this.setState({ currentCountry: selectedOption.value });
  };
  

  render() {
    return(
      <ApolloProvider client={client}>
          
          <Header continentSelect={this.onContinentSelect}
                  countrySelect={this.onCountrySelect}
                  countrySearch={this.onSearch}
                  currentContinent={this.state.currentContinent} />
          
          <Content currentCountry={this.state.currentCountry} />

      </ApolloProvider>
    )
  };
}

export default App;