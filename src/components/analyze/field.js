import React from 'react';

const uuid = require('uuid/v1');

class Field extends React.Component{



    render(){

        var item = "";
        var valueType = "";
        var value = "";
        var text = "";
        var elements = [];
        var refs = "";

        if(this.props.item){
            item = this.props.item;
        }

        if(this.props.field){
            let field = this.props.field;
            valueType = field.valueType;
            value = field.value;
            text = field.text;

            for(let i=0;i<field.elements.length;i++){
                elements.push(JSON.stringify(field.elements[i]));
            }

            refs = elements.map(e => <div key={uuid()}>{e}</div>);
        }
    
        return (
            <div className="container-fluid field">
                <div className='row'>
                    <div className="col-12 field-title">
                        {item}
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-4 field-label">
                        Value Type: 
                    </div>
                    <div className="col-md-8 field-value">
                        {valueType} 
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-4 field-label">
                        Value: 
                    </div>
                    <div className="col-md-8 field-value">
                        {value} 
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-4 field-label">
                        Text: 
                    </div>
                    <div className="col-md-8 field-value">
                        {text}
                    </div>
                </div>
                <div className='row'>
                    <div className="col-md-4 field-label">
                        Elements: 
                    </div>
                    <div className="col-md-8 field-value">
                        {refs}
                    </div>
                </div>
            </div>
        )
    }
  }
  
  export default Field;