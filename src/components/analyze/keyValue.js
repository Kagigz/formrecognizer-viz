import React from 'react';

class KeyValue extends React.Component{



    render(){
        var key = "   ";
        if(this.props.item.key.length > 0 ){
            key = this.props.item.key[0]["text"];
        }
        var value = "   ";
        if(this.props.item.value.length > 0 ){
            value = this.props.item.value[0]["text"];
        }
    
        return (
            <span className="keyValue">
                <span className="key">{key}</span>
                <span className="value">{value}</span>
                <span className="delete-key-value">x</span>
            </span>
        )
    }
  }
  
  export default KeyValue;