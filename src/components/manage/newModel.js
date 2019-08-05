import React from 'react';  

class NewModel extends React.Component {  

    constructor(props) {    
        super(props);
        this.state={
            uri:true,
            path: "",
            created:false
        }
    }

    chooseFolder = e => {

        var path = e.target.files;
        console.log(path);
        
        this.setState(path);
    }

    changeInput = () => {
        this.setState({uri:!this.state.uri});
    }

    handleCreated = () => { 
        this.props.create();
        this.setState({created:true});
    }

  render() {

        return (  
        <div className='popup-overlay'>  
            <div className='popup-window create-new'>
                    {!this.state.created ?
                    
                    <div className='popup-text'>

                        <h3 className='popup-title'>Create New Model</h3>

                        <p className='textCreateNew'>
                            The Form Recognizer API will train a model using all the data (PDFs and images) located in a given folder.
                            Please provide an externally accessible Azure Storage blob container Uri (preferably a Shared Access Signature Uri). 
                            The training dataset must contain at least 5 items, and the total size must be under 4MB.
                        </p>

                        <div className="labelField">
                            {this.state.uri ? 
                            "Blob Storage URI (SAS)":
                            "Local files"
                            }
                        </div>
                        {this.state.uri ? 
                            <input className="form-control" autoFocus onChange={this.props.handleChangeInput}/>
                            :
                            <input type="file" ref={(ref) => this.upload = ref} onChange={this.chooseFolder}  webkitdirectory="" directory="" multiple/>
                        }
                        {/*<div className='useFolderLabel'>
                            <span onClick={this.changeInput}>
                                {this.state.uri ?
                                    "Use local files instead":
                                    "Use blob storage URI instead"
                                }
                            </span>
                        </div>*/
                        }

                    </div> :

                    <div className='popup-text'>

                    <h3 className='popup-title'>Model creation response code: {this.props.responseStatus}</h3>

                    <p className='textCreateNew'>
                        Response Text: <br/>
                        {this.props.responseText}
                    </p>
  
                    </div> 
                    }
                    <div className='popup-buttons'>
                        {this.state.created ? 
                           <button type="button" className="btn" onClick={this.props.close}>Close</button>:     
                            <div>                   
                            <button type="button" className="btn" onClick={this.handleCreated}>Create</button>
                            <button type="button" className="btn" onClick={this.props.close}>Cancel</button> 
                            </div>
                        }
                    </div>
            </div>  
        </div>  
        );  
    }  

}  

export default NewModel;