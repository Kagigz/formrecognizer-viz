import React from 'react';

class Field extends React.Component{



    render(){
        var text = "";
        if(this.props.item.length > 0 ){
            text = this.props.item[0]["text"];
        }
    
        return (
            <span className="keyValue">
                {text}
            </span>
        )
    }
  }
  
  export default Field;