import ParticlesBg from "particles-bg";

import Navigation from "./Components/Navigation/Navigation";
import Logo from "./Components/Logo/Logo";
import Rank from "./Components/Rank/Rank";
import ImageLinkForm from "./Components/ImageLinkForm/ImageLinkForm";
// import FaceRecognition from "./FaceRecognition";

import "./App.css";

function App() {
  return (
    <>
      <div className="App">
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm />
        {/*
      <FaceRecognition /> */}
      </div>

      <ParticlesBg type="cobweb" num={120} bg={true} color="#000000" />
    </>
  );
}

export default App;
