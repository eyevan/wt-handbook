import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import Select from 'react-select';
import PropTypes from 'prop-types';

const CONTINENTS_QUERY = gql`
  {
    continents {
      code
      name
    }
  }
`;

const ALL_COUNTRIES_QUERY = gql`
  {
      countries {
          code
          name
      }
  }
`;

const COUNTRIES_QUERY = gql`
  query getCountries($code: String) {
    continent(code: $code) {
      code
      name
      countries{
        code
        name
      }
    }
  }
`;

class Header extends Component {


    render() {
        return(
            <header id="header">
                <div className="container">
                    <div className="header-wrapper">
                        <div className="navbar-brand">
                            World Traveler's Handbook
                        </div>
                        <form className="filters-form">

                            {/* Continent select */}
                            <select className="form-control" onChange={this.props.continentSelect}>
                                <option>Continents</option>
                                <Query query={CONTINENTS_QUERY}>
                                    { ({loading, data}) => {
                                        if (loading) {
                                            return <option>Loading</option>;
                                        };
                                        
                                        const { continents } = data;
                                        return continents.map(continent => <option key={continent.code} value={continent.code}>{continent.name}</option>)
                                    } }
                                </Query>
                            </select>
                            
                            {/* Country select */}
                            <select className="form-control" disabled={this.props.currentContinent ? null : 'disabled'} onChange={this.props.countrySelect}>
                                <option>Countries</option>
                                <Query query={COUNTRIES_QUERY} variables={{code: this.props.currentContinent}}>
                                    { ({loading, data, error}) => {
                                        if (loading) return <option>Loading</option>;
                                        if(error) return <option>Error</option>;
                                        
                                        const { continent } = data;
                                        if (continent && continent.countries.length > 0) {
                                            return continent.countries.map(country => <option key={country.code} value={country.code}>{country.name}</option>)
                                        } else {
                                            return null
                                        }
                                    }}
                                </Query>
                            </select>

                            {/* Search bar */}
                            <Query query={ALL_COUNTRIES_QUERY}>
                                { ({loading, data, error}) => {
                                    if (loading) return <Select className="form-search" options={['Loading']}></Select>;
                                    if (error) return <Select className="form-search" options={['Error']}></Select>;

                                    if (data.countries) {
                                        let res = [];

                                        data.countries.map(country => {
                                            res.push({
                                                value: country.code,
                                                label: country.name
                                            });
                                            return null;
                                        });
                                        return <Select className="form-search" placeholder="Search countries..." options={res} onChange={this.props.countrySearch}></Select>
                                    } else {
                                        return null;
                                    }
                                }}
                            </Query>
                            
                            {/* <input name="search" type="text" placeholder="Search" className="form-control" /> */}
                        </form>
                    </div>
                </div>
            </header>
        )
    }
}

// PropTypes validation
Header.defaultProps = {
    currentContinent: PropTypes.string
}

export default Header;