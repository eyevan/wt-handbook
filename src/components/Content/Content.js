import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import logo from '../../logo.svg';
import PropTypes from 'prop-types';

const COUNTRY_QUERY = gql`
  query getCountry($code: String) {
    country(code: $code) {
      code
      name
      native
      phone
      continent {
        code
        name
      }
      currency
      languages {
        code
        name
        native
      }
      emoji
      emojiU
    }
  }
`;

class Content extends Component {
   render() {
        return(
            <main className="mt-3 mt-sm-5">
                <div className="container">
                    <Query query={COUNTRY_QUERY} variables={{code: this.props.currentCountry}}>
                        { ({loading, data, error}) => {
                        if (loading) return <div className="loader"><img src={logo} className="App-logo" alt="logo" /></div>;
                        if(error) return <div>Error</div>;
                        
                        const { country } = data;

                        if (country) {
                            const countryFlag = 'embed-responsive-item flag-icon flag-icon-' + country.code.toLowerCase();
                            
                            return(
                                <div className="card country-card">
                                    <div className="row no-gutters align-items-center">
                                        
                                        <div className="col-12 col-md-5 col-lg-4">
                                            <div className="embed-responsive embed-responsive-4by3">
                                                <span className={countryFlag}></span>
                                            </div>
                                        </div>
                                        
                                        <div className="col-12 col-md-7 col-lg-8">
                                            <div className="details">
                                                <h2 className="title detail">
                                                    <span className="key">
                                                        <strong>Name</strong>:&nbsp;
                                                    </span>
                                                    <span className="value">
                                                        {country.name} ({country.native})
                                                    </span>
                                                </h2>

                                                <ul className="details-list list-unstyled">
                                                    <li>
                                                        <span className="key">
                                                            <strong>Currency</strong>:&nbsp;
                                                        </span>
                                                        <span className="value">
                                                            {country.currency}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="key">
                                                            <strong>Phone</strong>:&nbsp;
                                                        </span>
                                                        <span className="value">
                                                            (+{country.phone})
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="key">
                                                            <strong>Languages</strong> :&nbsp;
                                                        </span>
                                                        <span className="value">
                                                            {country.languages.map(lang => lang.name).join(', ')}
                                                        </span>
                                                    </li>
                                                    <li>
                                                        <span className="key">
                                                            <strong>Continent</strong>:&nbsp;
                                                        </span>
                                                        <span className="value">
                                                            {country.continent.name}
                                                        </span>
                                                    </li>
                                                </ul>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            )
                        } else {
                            return null
                        }

                        } }
                    </Query>
                </div> 
            </main>
       )
   } 
}

// PropTypes validation
Content.propTypes = {
    currentCountry: PropTypes.string
}

export default Content;