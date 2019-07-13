import React from 'react';

class InputFile extends React.Component{

    
    render(){

        return (
                <div className="inputFile container-fluid">     

                    <div className="row align-items-center">

                        <div className="col-md-10 container-fluid">
                            <div className="row align-items-center">

                                <div className="col-md-4 order-md-first">
                                    <div className=" labelField">
                                        <span className="keyLabel">File</span>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    <input name="fileInput" type="file" className="form-control" onChange={this.props.handleChangeInputFile}/>
                                </div>

                                <div className="col-md-4">
                                    <div className=" labelField">
                                        <span className="keyLabel">Model ID</span>
                                    </div>
                                </div>

                                <div className="col-md-8">
                                    {!this.props.isReceipt ? 
                                        <input name="modelIDInput" className="form-control" onChange={this.props.handleChangeInputModelID} /> :
                                        <input name="modelIDInput" className="form-control" onChange={this.props.handleChangeInputModelID} disabled />
                                    }
                                </div>

                            </div>

                            <div className="checkboxField">
                                <input type="checkbox" className="checkbox" value={this.props.isReceipt} onChange={this.props.handleChangeInputCheckbox}/>
                                <label className="form-check-label">This is a receipt</label>
                            </div>

                        </div>

                    

                        <div className="col-md-2 OKBtn">
                            <button type="button" className="btn btn-lg" onClick={this.props.analyzeFile}>OK</button>
                        </div>

                    </div>

                </div>
        )
    }
}

export default InputFile;