import React from 'react';  

class ConfirmBox extends React.Component {  


  render() {  
        return (  
        <div className='popup-overlay'>  
            <div className='popup-window confirm-box'>  
                <div className='popup-inner'>
                    <div className='confirm-text'>{this.props.text}</div>
                    <button type="button" className="btn btn-primary" onClick={this.props.confirm}>OK</button> 
                    <button type="button" className="btn btn-primary" onClick={this.props.cancel}>Cancel</button> 
                </div>  
            </div>  
        </div>  
        );  
    }  

}  

export default ConfirmBox;