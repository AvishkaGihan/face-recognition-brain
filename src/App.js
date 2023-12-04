// Importing necessary dependencies and components
import React, { Component } from "react";
import "./App.css";
import ParticlesBg from "particles-bg";
import Navigation from "./Components/Navigation/Navigation";
import SignIn from "./Components/SignIn/SignIn";
import Register from "./Components/Register/Register";
import Logo from "./Components/Logo/Logo";
import Rank from "./Components/Rank/Rank";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./Components/FaceRecognition/FaceRecognition";

const initialState = {
  input: "",
  imageURL: "",
  box: {},
  route: "signIn", // Default route is set to "signIn"
  isSignedIn: false, // Flag indicating whether the user is signed In
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  },
};

// Main App component
class App extends Component {
  // Constructor to initialize the state
  constructor() {
    super();
    this.state = {
      input: "",
      imageURL: "",
      box: {},
      route: "signIn", // Default route is set to "signIn"
      isSignedIn: false, // Flag indicating whether the user is signed In
      user: {
        id: "",
        name: "",
        email: "",
        entries: 0,
        joined: "",
      }, // User object containing details of logged in user
    };
  }

  loadUser = (data) => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined,
      },
    });
  };

  // Function to calculate the face location based on Clarifai API response
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

  // Function to update the state with the calculated face box
  displayFaceBox = (box) => {
    this.setState({ box: box });
  };

  // Event handler for input change
  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  };

  // Event handler for button click to submit the image for face detection
  onButtonSubmit = () => {
    this.setState({ imageURL: this.state.input });

    fetch("http://localhost:3000/imageUrl", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response) {
          fetch("http://localhost:3000/image", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              id: this.state.user.id,
            }),
          })
            .then((response) => response.json())
            .then((count) => {
              this.setState(Object.assign(this.state.user, { entries: count }));
            })
            .catch(console.log);
        }
        this.displayFaceBox(this.calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  // Event handler for route change
  onRouteChange = (route) => {
    // Update state based on the new route
    if (route === "signOut") {
      this.setState(initialState);
    } else if (route === "home") {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };

  // Render method for rendering the component
  render() {
    return (
      <>
        {/* Particle background */}
        <ParticlesBg type="cobweb" num={120} color="#000000" bg={true} />
        <div className="App">
          {/* Navigation component */}
          <Navigation
            isSignedIn={this.state.isSignedIn}
            onRouteChange={this.onRouteChange}
          />
          {/* Conditional rendering based on the current route */}
          {this.state.route === "home" ? (
            <div>
              {/* Logo, Rank, ImageLinkForm, and FaceRecognition components */}
              <Logo />
              <Rank
                name={this.state.user.name}
                entries={this.state.user.entries}
              />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onButtonSubmit={this.onButtonSubmit}
              />
              <FaceRecognition
                box={this.state.box}
                imageUrl={this.state.imageURL}
              />
            </div>
          ) : this.state.route === "signIn" ? (
            // SignIn component
            <SignIn
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          ) : (
            // Register component
            <Register
              loadUser={this.loadUser}
              onRouteChange={this.onRouteChange}
            />
          )}
        </div>
      </>
    );
  }
}

// Exporting the App component
export default App;
