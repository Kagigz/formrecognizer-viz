import React from 'react';
import Model from './model';
import ConfirmBox from '../general/confirmBox';
import DetailsBox from './detailsBox';

class List extends React.Component{


    render(){
        var list = [];
        if(this.props.models){
            try{
                list = this.props.models.map(m => <Model key={m.modelId} model={m} handleDelete={this.props.handleDelete} showDetails={this.props.showDetails}/>);
            }
            catch{
                console.log("Could not update list of models.");
            }
        }
        return (
            <div className="list">
                {this.props.showDelete ?  
                    <ConfirmBox text='This model will be deleted.' confirm={this.props.confirmDelete} cancel={this.props.cancelDelete}/>  
                    : null  
                }  
                {this.props.showKeys ?  
                    <DetailsBox details={this.props.details} close={this.props.closeDetails}/>  
                    : null  
                }
                {list}     
            </div>
        );
    }
}

export default List;