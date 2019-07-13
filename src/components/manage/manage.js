import React from 'react';
import KeyField from '../general/keyField';
import Add from './add';
import List from './list';

class Manage extends React.Component{

    constructor(props) {    
        super(props); 
        this.state = {
            models: [],
            showDelete:false,
            showDetails:false,
            showAdd:false,
            details:[],
            modelDelete:null,
            region: "westeurope",
            subscriptionKey:"",
            pageDisplay:false,
            blobURI:"",
            responseCreatedStatus:"",
            responseCreatedText:""
          };
      }

    handleOK = () => {
        if(this.state.subscriptionKey !== ""){
            this.setState({pageDisplay:true});
            this.showModels();
        }
    }

    showModels = () => {
        console.log("Show Models");

        const apiURL = `https://${this.state.region}.api.cognitive.microsoft.com/formrecognizer/v1.0-preview/custom/models`;
        
        fetch(apiURL, {
            method: 'GET',
            headers:{
                'Ocp-Apim-Subscription-Key':this.state.subscriptionKey
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({models:data['models']});   
        })
        .catch((error) => {
            console.error(error);
        });

    }

    handleChangeSelectRegion = (e) => {
        this.setState({ region: e.target.value});  
    }

    handleChangeInputKey = (e) => {
        this.setState({subscriptionKey: e.target.value});
    }

    handleChangeInputURI = (e) => {
        this.setState({blobURI: e.target.value});
    }

    showDetails = (model) => {

        let id = model.props.model.modelId;
        console.log("Show details for model " + id);

        const apiURL = `https://${this.state.region}.api.cognitive.microsoft.com/formrecognizer/v1.0-preview/custom/models/${id}/keys`;

        fetch(apiURL, {
            method: 'GET',
            headers:{
                'Ocp-Apim-Subscription-Key':this.state.subscriptionKey
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            console.log(data);
            this.setState({details:data['clusters']});
        })
        .catch((error) => {
            console.error(error);
        });

        this.setState({  
            showDetails: !this.state.showDetails 
        });  

    }

    closeDetails = () => {
        this.setState({  
            showDetails: !this.state.showDetails,details:[]
        });  
    }

    cancelDelete = () => {  
        this.setState({  
            showDelete: false,modelDelete:null
        });  
    }  

    confirmDelete = () => {
        let index = this.state.models.indexOf(this.state.modelDelete.props.model);
        this.state.models.splice(index,1);
        this.setState({models:this.state.models});
        let id = this.state.modelDelete.state.id;
        console.log("Deletion of model "+ id);

        const apiURL = `https://${this.state.region}.api.cognitive.microsoft.com/formrecognizer/v1.0-preview/custom/models/${id}`;

        fetch(apiURL, {
            method: 'delete',
            headers:{
                'Ocp-Apim-Subscription-Key':this.state.subscriptionKey
            }
        })
        .then((res) => {
            console.log(res.status);
        })
        .catch((error) => {
            console.error(error);
        });

        this.setState({  
            showDelete: false,modelDelete:null
        });  
    }

    handleDelete = (model) => {
        console.log("Delete model");
        this.setState({  
            showDelete: true,modelDelete:model 
        });  
    }

    createNew = () => {
        this.setState({  
            showAdd: !this.state.showAdd 
        });  
    }

    createModel = () => {
        console.log("Creating new model with dataset located at "+this.state.blobURI);
        
        const apiURL = `https://${this.state.region}.api.cognitive.microsoft.com/formrecognizer/v1.0-preview/custom/train`;

        fetch(apiURL, {
            method: 'POST',
            headers:{
                'Content-Type':'application/json',
                'Ocp-Apim-Subscription-Key':this.state.subscriptionKey
            },
            body:JSON.stringify({
                "source":this.state.blobURI
            })
        })
        .then((res) => {
            this.setState({responseCreatedStatus:res.status});
            if(res.status !== 200){
                this.setState({responseCreatedText:res.statusText});
            }
            return res.json();
        })
        .then((data) => {
            console.log(data);
            if(this.state.responseCreatedText === ""){
                this.setState({responseCreatedText:JSON.stringify(data)});
            }
        })
        .catch((error) => {
            console.error(error);
        });

    }


    closeAdd = () => {
        this.setState({  
            showAdd: !this.state.showAdd 
        });  
    }

    render(){ 
        return (
            <div className="page">
                <KeyField region={this.state.region} handleChangeInput={this.handleChangeInputKey} handleChangeSelect={this.handleChangeSelectRegion} handleOK={this.handleOK} />
                {this.state.pageDisplay ?
                <div>
                    <Add showPopup={this.state.showAdd} createNew={this.createNew} createModel={this.createModel} closePopup={this.closeAdd} handleChangeInput={this.handleChangeInputURI} responseStatus={this.state.responseCreatedStatus} responseText={this.state.responseCreatedText}/>
                    <List models={this.state.models} showDelete={this.state.showDelete} showDetails={this.showDetails} closeDetails={this.closeDetails} showKeys={this.state.showDetails} details={this.state.details} modelDelete={this.state.modelDelete} cancelDelete={this.cancelDelete} confirmDelete={this.confirmDelete} handleDelete={this.handleDelete}/>
                </div>:
                ""
                }
            </div>
            
        )
    }
}

export default Manage;