import React from 'react';
import KeyField from '../general/keyField';
import InputFile from './inputFile';
import Info from './info';
import ImageView from './imageView';

class Analyze extends React.Component{

    constructor(props) {    
        super(props);    
        this.state = {
            region: "westeurope",
            subscriptionKey:"",
            pageDisplay:false,
            analyzeDisplay:false,
            file:null,
            isReceipt:false,
            modelID:"",
            keyValuePairs:[],
            fieldsReceipt:[],
            linesReceipt:[],
            tables:[]
          };    
      }

    handleOK = () => {
        if(this.state.subscriptionKey !== ""){
            this.setState({pageDisplay:true});
        }
    }

    
    handleChangeSelectRegion = (e) => {
        this.setState({ region: e.target.value});  
    }

    handleChangeInputKey = (e) => {
        this.setState({subscriptionKey: e.target.value});
        if(this.state.subscriptionKey === ""){
            this.setState({pageDisplay:false});
        }
    }

    handleChangeInputFile = (e) => {
        this.setState({file: e.target.files[0]});
    }

    handleChangeInputModelID = (e) => {
        this.setState({modelID: e.target.value});
    }

    handleChangeInputCheckbox = (e) => {
        this.setState({isReceipt: !this.state.isReceipt});
    }

    displayImage = () => {
        var reader = new FileReader();
    }

    analyzeFile = () => {

        if(this.state.subscriptionKey !== ""){

            this.displayImage();

            if(this.state.isReceipt === true){
                this.analyzeReceipt();
            }
            else{
                this.analyzeForm();
            }

            this.setState({analyzeDisplay:true});
            console.log("Analyzing form "+this.state.file.name);
        }
        else{
            console.log("Please fill in your subscription key");
        }

    }

    analyzeReceipt = () => {
        console.log("Analyzing receipt...");
        const apiURL = `https://${this.state.region}.api.cognitive.microsoft.com/formrecognizer/v1.0-preview/prebuilt/receipt/asyncBatchAnalyze`;

        fetch(apiURL, {
            method: 'POST',
            headers:{
                'Content-Type':'application/octet-stream',
                'Ocp-Apim-Subscription-Key':this.state.subscriptionKey
            },
            body:this.state.file
        })
        .then((res) => {
            return res.headers;
        })
        .then((results) => {
            this.getAnalyzeReceiptResults(results.get('Operation-Location'));
        })
        .catch((error) => {
            console.error(error);
        });
    }

    sleep = (ms) => {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      

    getAnalyzeReceiptResults = (url) => {
        console.log("Retrieving receipt results...");

        fetch(url, {
            method: 'GET',
            headers:{
                'Ocp-Apim-Subscription-Key':this.state.subscriptionKey
            }
        })
        .then((res) => {
            return res.json();
        })
        .then((data) => {
            if(data['status'] === "Running"){
                this.sleep(3000);
                this.getAnalyzeReceiptResults(url);
                console.log(data);
            }
            else{
                console.log(data);
                this.parseResultsReceipt(data);
            }
            
        })
        .catch((error) => {
            console.error(error);
        });
    }

    analyzeForm = () => {
        console.log("Analyzing custom form...");
        const apiURL = `https://${this.state.region}.api.cognitive.microsoft.com/formrecognizer/v1.0-preview/custom/models/${this.state.modelID}/analyze`;

            fetch(apiURL, {
                method: 'POST',
                headers:{
                    'Content-Type':'image/jpeg',
                    'Ocp-Apim-Subscription-Key':this.state.subscriptionKey
                },
                body:this.state.file
            })
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                console.log(data);
                this.parseResultsForm(data);
            })
            .catch((error) => {
                console.error(error);
            });
    }

    parseResultsForm = (result) => {

          try{
            let pages = result['pages']
            let keyValuePairs = pages[0]['keyValuePairs'];
            let tables = pages[0]['tables'];
            this.setState({keyValuePairs});
            this.setState({tables});
          }
          catch(e){
              console.log(e);
          }

    }
    
    parseResultsReceipt = (result) => {

        try{
            let recognition = result['recognitionResults'];
            let understanding = result['understandingResults'];
            if(recognition.length > 0){
                this.setState({linesReceipt:recognition[0]['lines']});
                console.log("Lines: "+JSON.stringify(this.state.linesReceipt));
            }
            if(understanding.length > 0){
                this.setState({fieldsReceipt:understanding[0]['fields']});
                console.log("Fields: "+JSON.stringify(this.state.fieldsReceipt));

            }
        }
        catch(e){
            console.log(e);
        }

  }


    render(){
        return (
            <div className="page">

                <KeyField region={this.state.region} handleChangeInput={this.handleChangeInputKey} handleChangeSelect={this.handleChangeSelectRegion} handleOK={this.handleOK}/>
                { this.state.pageDisplay ?
                    <InputFile handleChangeInputFile={this.handleChangeInputFile} handleChangeInputModelID={this.handleChangeInputModelID} handleChangeInputCheckbox={this.handleChangeInputCheckbox} analyzeFile={this.analyzeFile} isReceipt={this.state.isReceipt}/>:
                    ""
                }
                {this.state.analyzeDisplay ? 
                <div className="container-fluid">
                    <div className="row" id="imageAnalysis">
                        <div className="col-md-9" id="imageViewWrapper">
                            <ImageView file={this.state.file} isReceipt={this.state.isReceipt} linesReceipt={this.state.linesReceipt} keyValuePairs={this.state.keyValuePairs}/>
                        </div>
                        <div className="col-md-3">
                            <Info isReceipt={this.state.isReceipt} fieldsReceipt={this.state.fieldsReceipt} linesReceipt={this.state.linesReceipt} keyValuePairs={this.state.keyValuePairs} tables={this.state.tables}/>
                        </div>
                    </div>
                </div>  :
                    ""
                }

            </div>
        )
    }
}

export default Analyze;