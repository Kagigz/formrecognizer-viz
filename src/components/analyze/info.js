import React from 'react';
import KeyValue from './keyValue';
import Field from './field';
import Table from './table';

const uuid = require('uuid/v1');

class Info extends React.Component{


    render(){
        var keyValuePairs = "";
        var tables = "";
        var lines = "";
        var fields = "";

        try{
            if(this.props.isReceipt === true){
                fields = Object.keys(this.props.fieldsReceipt)
                    .map(item => <Field key={uuid()} item={item} field={this.props.fieldsReceipt[item]}/>);
                lines = this.props.linesReceipt
                    .map(item => <div className="line" key={uuid()}>{item['text']}</div>);
            }
            else{
                keyValuePairs = this.props.keyValuePairs
                    .map(item => <KeyValue key={uuid()} item={item}/>);
                tables = this.props.tables
                    .map(item => <Table key={uuid()} table={item}/>);
            }
        }
        catch(e){
            console.log(e);
        }

        return (
            <div id="info">
                <h3 id="infoTitle">Info</h3>

                {this.props.isReceipt === true ?
                    <div>
                        <div className="infoSection" id="keyValuePairs">
                        <h4>Fields</h4>
                            {fields}
                        </div>

                        <div className="infoSection" id="tables">
                        <h4>Lines</h4>
                            {lines}
                        </div>
                    </div> :
                    <div>
                    <div className="infoSection" id="keyValuePairs">
                    <h4>Key-Value Pairs</h4>
                        {keyValuePairs}
                    </div>

                    <div className="infoSection" id="tables">
                    <h4>Tables</h4>
                        {tables}
                    </div>
                    </div>
                }


            </div>
        )
    }
  }
  
  export default Info;