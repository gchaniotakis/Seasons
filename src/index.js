import React from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Loader from './Loader';
import './SeasonDisplay.css';

class App extends React.Component{  

    
    state = {lat: null, errorMessage: ''};

    componentDidMount(){
        console.log('My component was rendered to the screen');
        window.navigator.geolocation.getCurrentPosition(
            position => this.setState({lat: position.coords.latitude}),
            err => this.setState({errorMessage: err.message})            
         );
    }

    componentDidUpdate(){
        console.log('My component was just updated');
    }
    
    renderContent(){
        if (this.state.errorMessage && !this.state.lat){
            return (<div className = "error">
                <i className = {`icon-left massive ban icon`}/>
                <h1>Error: {this.state.errorMessage}, please reload the page and select "Allow"</h1>
                <i className = {`icon-right massive ban icon`}/>
                </div>
                );
        }
        
        if(!this.state.errorMessage && this.state.lat){
            return <SeasonDisplay lat = {this.state.lat}/>
        }

        return <Loader message="Please accept location request"/>;
    }

    render(){
        return(
            <div className = "border-black">
                {this.renderContent()}
            </div>
        );
    }
}


ReactDOM.render(
    <App/>,
    document.querySelector('#root')
);