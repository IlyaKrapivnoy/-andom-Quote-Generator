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
                console.log('hm', response);
            })
            .catch((error) => {
                console.log('hm', error);
            });
    };

    render() {
        return <div className='App'>hi</div>;
    }
}

export default App;
