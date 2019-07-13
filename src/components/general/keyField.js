import React from 'react';

class KeyField extends React.Component{

    constructor(props) {    
        super(props);
        this.regions = [
            {"value":"westeurope", "name":"West Europe"},
            {"value":"westus2", "name":"West US"}
        ]
      
    }

    
    render(){
        const regions = Object
        .keys(this.regions)
        .map(key => <option key={key} value={this.regions[key].value}>{this.regions[key].name}</option>);
        return (
                <div className="subscriptionKeyField">     

                    <div className="row align-items-center">

                        <div className="col-md-10 labelField">
                            <div className="row align-items-center">

                                <div className="col-md-8 order-md-first labelField">
                                    <span className="keyLabel">Subscription Key</span>
                                </div>

                                <div className="col-md-8">
                                    <input name="subscriptionKeyInput" className="form-control" autoFocus onChange={this.props.handleChangeInput}/>
                                </div>

                                <div className="col-md-4 order-md-first labelField">
                                    <span className="keyLabel">Region</span>
                                </div>

                                <div className="col-md-4">
                                    <select name="regionSelect" className="form-control" value={this.props.region || ""} onChange={this.props.handleChangeSelect}>
                                        {regions}
                                    </select>
                                </div>


                            </div>

                            <div className="row align-items-center">

                                
                            </div>  

                        </div>

                        <div className="col-md-2 OKBtn">
                            <button type="button" className="btn btn-lg" onClick={this.props.handleOK}>OK</button>
                        </div>

                    </div>
                </div>
        )
    }
}

export default KeyField;