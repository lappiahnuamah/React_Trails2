import React, { Component } from 'react';


class Namecomponent extends Component{
 
    constructor(props) {
        super(props);
        this.state = { 
          user_displayed: 'First Name',
         };
      }
    
   
    componentWillReceiveProps(nextProps){
          console.log(nextProps);
          if(this.props.user_name !== nextProps.user_name){
              if(nextProps.user_name.indexOf(' ')>-1){
                  this.setState({
                      name_displayed: 'Full Name'
                  })
              }else{
                this.setState({
                    name_displayed: 'First Name'
                })
              }
          }
      }
  render(){
    const {user_displayed} = this.state;
    const {user_name} =  this.props;

    return (
        <div>
            <p>{user_displayed}</p>
            {/* <button onClick={() => {console.log("You are welcomed")}}>Click</button> */}
            <p>{user_name ? user_name : 'No username'}</p>
        </div>
      
    );
  }

}
export default Namecomponent;
