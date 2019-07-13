import React from 'react';
import KeyValue from './keyValue';
import Field from './field';

const uuid = require('uuid/v1');

class Info extends React.Component{


    render(){
        var keyValuePairs = "";
        var tables = "";
        var lines = "";
        var fields = "";

        try{
            if(this.props.isReceipt === true){
                for(let key of Object.keys(this.props.fieldsReceipt)){
                    console.log(`${key} : ${JSON.stringify(this.props.fieldsReceipt[key])}`);
                }
                fields = Object.keys(this.props.fieldsReceipt)
                    //.map(item => <Field key={uuid()} item={item}/>);
                    .map(item => <div key={uuid()}>{item}: {JSON.stringify(this.props.fieldsReceipt[item])}</div>);
                lines = this.props.linesReceipt
                    .map(item => <div key={uuid()}>{item['text']}</div>);
            }
            else{
                keyValuePairs = this.props.keyValuePairs
                    .map(item => <div key={uuid()}><KeyValue item={item.key}/> - <KeyValue item={item.value}/></div>);
                tables = this.props.tables
                    .map(item => <div key={uuid()}>{JSON.stringify(item)}</div>);
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