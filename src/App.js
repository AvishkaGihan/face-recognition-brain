import React, { Component } from "react";

import "./App.css";

import ParticlesBg from "particles-bg";
import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import Rank from "./Components/Rank/Rank";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";

const returnClarifyRequestOptions = (imageURL) => {
  const PAT = "5a31d47de34b4535a34c9c2268340b71";
  const USER_ID = "x0fl1quggb5n";
  const APP_ID = "my-first-application";
  const IMAGE_URL = imageURL;

  const raw = JSON.stringify({
    user_app_id: {
      user_id: USER_ID,
      app_id: APP_ID,
    },
    inputs: [
      {
        data: {
          image: {
            url: IMAGE_URL,
          },
        },
      },
    ],
  });

  const requestOptions = {
    method: "POST",
    headers: {
      Accept: "application/json",
      Authorization: "Key " + PAT,
    },
    body: raw,
  };
  return requestOptions;
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
    };
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = (event) => {
    this.setState({ imageURL: this.state.input });
    fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      returnClarifyRequestOptions(this.state.input)
    )
      .then((response) => response.json())
      .then((result) =>
        console.log(result.outputs[0].data.regions[0].region_info.bounding_box)
      );
  };

  render() {
    return (
      <>
        <div className="App">
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />
          <FaceRecognition imageUrl={this.state.imageURL} />
        </div>
        <ParticlesBg type="cobweb" num={120} bg={true} color="#000000" />
      </>
    );
  }
}

export default App;
