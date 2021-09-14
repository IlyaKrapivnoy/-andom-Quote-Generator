import { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
    state = {
        advice: '',
    };

    componentDidMount() {
        this.fetchAdvice();
    }

    fetchAdvice = () => {
        axios
            .get('https://api.adviceslip.com/advice')
            .then((response) => {
                const { advice } = response.data.slip;
                console.log('quote', advice);
            })
            .catch((error) => {
                console.log('hm', error);
            });
    };

    render() {
        return (
            <div className='App'>
                <h1>Random Quotes</h1>
            </div>
        );
    }
}

export default App;
