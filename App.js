import React, { Component } from 'react';

import Select from 'react-select'

import {Navbar, Nav, NavDropdown, Form, FormControl, Button, Table} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import { compose, withProps } from "recompose";
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps";



// import App2 from './notes _ review/com/App2';

// import Namecomponent from './components/Namecomponent';

// const options = [
//   { value: 'chocolate', label: 'Chocolate' },
//   { value: 'strawberry', label: 'Strawberry' },
//   { value: 'vanilla', label: 'Vanilla' },
// ];
const MyMapComponent = compose(
  withProps({
    googleMapURL: "https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places",
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `400px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)((props) =>
  <GoogleMap
    defaultZoom={8}
    defaultCenter={{ lat: 7.9465, lng: 1.0232 }}
  >
    {props.isMarkerShown && <Marker position={{ lat: 7.9465, lng: 1.0232 }} onClick={props.onMarkerClick} />}
  </GoogleMap>
)

class App extends React.PureComponent{

  constructor(props){
    super(props);
    this.state = {
      selectedOption: " ",
      jsonList : []
    };
  }
  // constructor(props) {
  //   super(props);
  //   this.state = { 
  //     greet2 : ['welcome', 'to', 'my', 'journey', 'to','React'],
  //     user_name: 'Lawrence',
  //     Profession: 'A Software Engineer'
  //    };
  // }
  componentDidUpdate(){
    console.log("Changed");
}
  componentDidMount () {
    this.delayedShowMarker();
    fetch('http://www.json-generator.com/api/json/get/ckSXlNAMpu?indent=2', {
      method: 'GET'
    })
    .then(response => response.json())
    .then(json => {
       console.log(json)
       this.setState({
         jsonList : json
       });
    })
    .catch(error => console.log(error));

  }

  // handleClick() {
  //   this.setState({
  //     greet2 : ['This', 'is', 'my', 'name', 'and','Profession'],
  //     user_name: 'Lawrence Appiah-Nuamah',
  //     Profession: 'Data Scientist'
  //   });
  // }
  // state = {
  //   selectedOption: null,
  // };
  // handleChange = selectedOption => {
  //   this.setState(
  //     { selectedOption },
  //     () => console.log(`Option selected:`, this.state.selectedOption)
  //   );
  // };

  handleChange(selectedOption){
    this.setState({
      selectedOption: selectedOption ? selectedOption : " "
    });
  }


  state = {
    isMarkerShown: false,
  }


  delayedShowMarker = () => {
    setTimeout(() => {
      this.setState({ isMarkerShown: true })
    }, 3000)
  }

  handleMarkerClick = () => {
    this.setState({ isMarkerShown: false })
    this.delayedShowMarker();
  }

  render(){
    // var greet = 'Hello World';
    // const arrayToRender = [];
    // greet2.forEach(function(word){
    //   arrayToRender.push(
    //   )
    // });

    // const { selectedOption } = this.state;


    const selectList = this.state.jsonList.map(item => {
      return { value: item.name, label: item.name }
      });

    return (

      /*
      <div style={{backgroundColor:'green', height:'600px', padding:'0', margin:'0', boxSizing: 'border-box'}}>
        <h1>Hello World</h1>
        <p>It is time to learn React</p>
      <div>
        <p style={{fontSize:'23px', color:'red', fontWeight:'bold'}}>{greet} This is my first React Code. Hurray!!!!</p>
      </div>

      {this.state.greet2.map(word =>{
        return(
            <h3 key={word}>{word}</h3>
        )
      })}

      <p>{this.state.user_name}-{this.state.Profession}</p>
      <Namecomponent user_name='Lawrence Appiah-Nuamah'/>
      <button onClick={(this.handleClick.bind(this))}><Namecomponent /></button><br />
      <App2 />
      </div>
*/
<div>
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#home">FamMnT</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#link">Link</Nav.Link>
          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>      
    <div className="container">
      <div>   </div>
      <h1>Lawrence's Page</h1>
      <p>This is all about farm machinery and equipment so let's get the shot...</p>
      <div className="row">
        <div className="col-sm-3">
          <Select 
            name= "form-field-name"
            value={this.state.selectedOption.value}
            onChange={this.handleChange.bind(this)}
            options={selectList}
        />  
        </div>
      </div>
      <hr />

      {/* A table for the json genratior of lists */}
      <div className="row"> 
        <div className="col-sm-9">
            <Table striped bordered hover size="sm">
              <thead>
                <tr>
                  <th>Names</th>
                  <th>Address</th>
                  <th>Age</th>
                  <th>Company</th>
                </tr>
              </thead>
              <tbody>
                {this.state.jsonList.map(item => {
                  console.log(this.state.selectedOption);
                  if(this.state.selectedOption===''||item.name===this.state.selectedOption.value){
                    return (
                      <tr>
                        <td>{item.name}</td>
                        <td>{item.address}</td>
                        <td>{item.age}</td>
                        <td>{item.company}</td>
                      </tr>
                    )
                  }
                })}
              </tbody>
          </Table>

          <MyMapComponent
        isMarkerShown={this.state.isMarkerShown}
        onMarkerClick={this.handleMarkerClick}
      />
        </div>
      </div>
    </div>
    </div>
    );
  }
}

export default App;
