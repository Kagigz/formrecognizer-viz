import React from 'react';
import NewModel from './newModel';

class Add extends React.Component{

   
    render(){
        return (
            <div className='addBtn'>
                <svg onClick={this.props.createNew} xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 512 512"><path d="M363 277h-86v86h-42v-86h-86v-42h86v-86h42v86h86v42z"/><path d="M256 90c44.3 0 86 17.3 117.4 48.6C404.7 170 422 211.7 422 256s-17.3 86-48.6 117.4C342 404.7 300.3 422 256 422c-44.3 0-86-17.3-117.4-48.6C107.3 342 90 300.3 90 256c0-44.3 17.3-86 48.6-117.4C170 107.3 211.7 90 256 90m0-42C141.1 48 48 141.1 48 256s93.1 208 208 208 208-93.1 208-208S370.9 48 256 48z"/></svg>
                <div className="addLabel">
                    Create new model
                </div>
                {this.props.showPopup ?  
                    <NewModel create={this.props.createModel} close={this.props.closePopup} handleChangeInput={this.props.handleChangeInput} responseStatus={this.props.responseStatus} responseText={this.props.responseText}/>  
                    : null  
                }  
            </div>
        )
    }

}

export default Add;