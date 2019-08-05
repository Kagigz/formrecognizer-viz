import React from 'react';
import Column from './column';

const uuid = require('uuid/v1');

class Table extends React.Component{



    render(){
        var columnsDisplay = "";
        const columns = this.props.table.columns;

        if(columns.length > 0 ){
            columnsDisplay = columns.map(c => <Column key={uuid()} column={c}/>);
        }
       
        return (
            <div className="table-info">
                <div className="table-id">{this.props.table.id}</div>
                {columnsDisplay}
            </div>
        )
    }
  }
  
  export default Table;