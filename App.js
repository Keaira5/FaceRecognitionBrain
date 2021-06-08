import React, { component } from 'react';
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import './App.css';

const app = new Clarifai.App({
  apiKey: '11b0733886a7473f824ff2576c48c8bf'
});

const particlesOptions = {
 particles: {
   number: {
      value: 30,
      density: {
        enable: true,
        value_area: 800
      }
   }
  }
}

class App extends component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: ''
    }
  }

  onInputChange = (event) => {
    this.setstate({input: event.target.value});
  }

  onButtonsSubmit = () => {
    this.setState({imageUrl: this.state.input});
    app.models
    .predict(
      Clarifai.FACE_DETECT_MODEL, 
      this.state.input)
    .then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {

      }
    );
  }

    render() {
    return (
      <div className="App">
          <Particles className='particles'
              params={particlesOptions}
         />
        <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm 
            onInputChange={this.onInputChange} 
            onButtonsSubmit={this.onButtonsSubmit}
          />
          <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
