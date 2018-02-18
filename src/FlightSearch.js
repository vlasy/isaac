import React, { Component } from 'react';
import FlightSearchForm from './FlightSearchForm';
import FlightList from './FlightList';

class FlightSearch extends Component {
    state = { flights: [] }

    onFlightsLoaded = (flights) => {
        console.log(flights);
        this.setState({ flights });
    }

    render() {
        const { flights } = this.state;
        
        return (
            <div>
                <FlightSearchForm onFlightsLoaded={this.onFlightsLoaded}/>
                <br/>
                <FlightList flights={flights}/>
            </div>
        )
    }
}

export default FlightSearch;