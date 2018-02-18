import React, { Component } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import moment from 'moment';
import axios from 'axios';
import Autosuggest from 'react-autosuggest';
import { Button, FormGroup } from 'react-bootstrap';

class FlightSearchForm extends Component {
    state = {startDate: moment().add(1, 'd'), from: 'CZ', to: 'porto', value: 'Brn', suggestions:[]}

    dateChanged = (date) => {
        this.setState({
            startDate: date,
        });
    }
    
    handleSubmit = (e) => {
        e.preventDefault();
        if(!this.state.from || !this.state.to || !this.state.startDate){
            return;
        }
        axios.get('https://api.skypicker.com/flights', {
            params: {
                flyFrom: this.state.from,
                to: this.state.to,
                dateFrom: this.state.startDate.format('DD/MM/YYYY'),
                dateTo: this.state.startDate.format('DD/MM/YYYY'),
                curr: 'EUR'
            }
        }).then(response => {
            this.props.onFlightsLoaded(response.data.data);
        });
    }

    onChange = (name, event, {newValue}) => {
        this.setState({ [name]: newValue });
    }

    onFromChange = this.onChange.bind(null, 'from')
    onToChange = this.onChange.bind(null, 'to')

    getSuggestions = value => {
        axios.get('https://api.skypicker.com/locations/', {
            params: {
                term: value,
            }
        }).then(response => {
            this.setState({
                suggestions: response.data.locations.map(location => location.name)
            })
        })
    }

    onSuggestionsFetchRequested = ({ value }) => {
        this.getSuggestions(value)
    }

    onSuggestionsClearRequested = () => {
        this.setState({
            suggestions: []
        })
    }

    renderSuggestion = suggestion => (
        <a href='#'>{suggestion}</a>
    )

    getSuggestionValue = suggestion => suggestion;
    
    render() {
        const { date, from, to } = this.state;
        const inputProps = {
            placeholder: 'Fly from',
            value: from,
            onChange: this.onFromChange
        };
        const inputPropsTo = {
            placeholder: 'Fly to',
            value: to,
            onChange: this.onToChange
        };

        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <FormGroup>
                    <Autosuggest 
                        suggestions={ this.state.suggestions } 
                        inputProps={ inputProps }
                        name='from'
                        onSuggestionsFetchRequested={ this.onSuggestionsFetchRequested }
                        onSuggestionsClearRequested={ this.onSuggestionsClearRequested }
                        renderSuggestion={ this.renderSuggestion }
                        getSuggestionValue={ this.getSuggestionValue }
                    />
                    </FormGroup>
                    <FormGroup>
                    <Autosuggest 
                        suggestions={ this.state.suggestions } 
                        inputProps={ inputPropsTo }
                        name='to'
                        onSuggestionsFetchRequested={ this.onSuggestionsFetchRequested }
                        onSuggestionsClearRequested={ this.onSuggestionsClearRequested }
                        renderSuggestion={ this.renderSuggestion }
                        getSuggestionValue={ this.getSuggestionValue }
                    />
                    </FormGroup>
                    <FormGroup required>
                        <label>Date</label>
                        <DatePicker
                        name='startDate'
                        value={date}
                        selected={this.state.startDate}
                        onChange={this.dateChanged}
                        />
                    </FormGroup>
                    <Button type='submit'>Submit</Button>
                </form>
            </div>
        )
    }
}

export default FlightSearchForm;