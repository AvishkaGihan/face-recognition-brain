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
      box: {},
    };
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: clarifaiFace.left_col * width,
      topRow: clarifaiFace.top_row * height,
      rightCol: width - clarifaiFace.right_col * width,
      bottomRow: height - clarifaiFace.bottom_row * height,
    };
  };

  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });
    fetch(
      "https://api.clarifai.com/v2/models/face-detection/outputs",
      returnClarifyRequestOptions(this.state.input)
    )
      .then((response) => response.json())
      .then((result) => this.displayFaceBox(this.calculateFaceLocation(result)))

      .catch((err) => console.log(err));
  };

  render() {
    return (
      <>
        <ParticlesBg type="cobweb" num={120} color="#000000" bg={true} />
        <div className="App">
          <Navigation />
          <Logo />
          <Rank />
          <ImageLinkForm
            onInputChange={this.onInputChange}
            onButtonSubmit={this.onButtonSubmit}
          />

          <FaceRecognition
            box={this.state.box}
            imageUrl={this.state.imageURL}
          />
        </div>
      </>
    );
  }
}

export default App;
