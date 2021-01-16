import React, { Component } from "react";

import axios from "axios";

 class App extends Component {

  constructor(props) {

    super(props);

    this.state = {imageUrl: ""};
    this.handleUploadImage = this.handleUploadImage.bind(this);

  }


  handleUploadImage(e) {
    e.preventDefault();

    // FormData is used to send file
    const data = new FormData();
    data.append("file", this.uploadInput.files[0]);
    data.append("filename", this.fileName.value);

    
    // to send a file over axios post, request body should not be added as an object(inside curly braces),
    // because data instance above of FormData is already an object.
    // 2nd parameter of following axios post request contains both file and filename
    // at the express backend req.files.file will find the file
    // and req.body.filename will get the filename
    axios.post("http://localhost:3030/api", data)
      .then(res => {
        console.log(res.data);
        this.setState({ imageURL: `http://localhost:3030/${res.data.file}` });
      })
      .catch(err => console.log(err));
    
  }



  // If FormData is used to send a file to the backend then encType="multipart/form-data" is not mandatory
  // src attribute of first image points to the location of the image file inside the public/images directory 
  // of http://localhost:3030 but folder name 'public' is not needed, 
  // thanks to 'app.use(express.static(__dirname + "/public"))'
  render() {
    return (
      <form onSubmit={this.handleUploadImage} encType="multipart/form-data" >
        <div>
          <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
        </div>
        <div>
          <input ref={(ref) => { this.fileName = ref; }} type="text" placeholder="Enter the desired name of file" />
        </div>
        <br />
        <div>
          <button>Upload</button>
        </div>
        <img width="400" height="400" src="http://localhost:3030/images/fgfgh.jpeg" alt="img" />
        <img width="200" height="200" src={this.state.imageURL} alt="img" />
      </form>
    )
  }
}



export default App;
