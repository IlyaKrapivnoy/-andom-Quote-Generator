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

                this.setState({ advice });
            })
            .catch((error) => {
                console.log('hm', error);
            });
    };

    render() {
        const { advice } = this.state;

        return (
            <div className='app'>
                <h1 className='title'>Advice update every 5 seconds</h1>
                <div className='card'>
                    <h2 className='heading'>{advice}</h2>
                    <button className='button' onClick={this.fetchAdvice}>
                        <span>GIVE ME ADVICE!</span>
                    </button>
                </div>
            </div>
        );
    }
}

export default App;
