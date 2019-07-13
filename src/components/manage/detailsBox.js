import React from 'react';  
const uuid = require('uuid/v4');

class DetailsBox extends React.Component {  


  render() {
        var keys = [];
        for(var cluster in this.props.details){
            for(var key in this.props.details[cluster]){
                keys.push(this.props.details[cluster][key]);
            }
        }

        const keysList = keys.map(k => <p key={uuid()} className='key'>{k}</p>);

        return (  
        <div className='popup-overlay'>  
            <div className='popup-window details-box'>  
                <div className='popup-inner scrollbar'>
                    <div className='popup-text'>
                        <h3 className='popup-title'>Keys extracted</h3>
                    {keysList}
                    </div>
                </div>  
                <button type="button" className="btn close-popup" onClick={this.props.close}>Close</button> 
            </div>  
        </div>  
        );  
    }  

}  

export default DetailsBox;