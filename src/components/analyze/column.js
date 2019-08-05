import React from 'react';

const uuid = require('uuid/v1');

class Column extends React.Component{



    render(){
        var headerDisplay = "";
        var body = "";
        var header = this.props.column.header;
        var entries = this.props.column.entries;

        if(header.length > 0 ){
            headerDisplay = header.map(h => <tr><th key={uuid()} className="header-row">{h["text"]}</th></tr>);
        }

        if(entries.length > 0 ){
            body = entries.map(entry => entry.map(e => <tr><td key={uuid()} className="entry-row"><span className="entry-text">{e["text"]}</span> <span className="entry-confidence">(Conf. {e["confidence"]})</span></td></tr>));
        }
       
        return (
                <table className="column-info">
                    <thead>
                        {headerDisplay}
                    </thead>
                    <tbody>
                        {body}
                    </tbody>
                </table>
        )
    }
  }
  
  export default Column;