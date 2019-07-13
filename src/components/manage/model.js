import React from 'react';
import PropTypes from 'prop-types';

class Model extends React.Component{

    constructor(props) {    
        super(props);
        this.state = {
            id: this.props.model.modelId,
            createdDate: this.props.model.createdDateTime.substring(0,10),
            keys: []
        };
      }


    
    render(){
        return (
                    <div className="row list-item align-items-center">
                        <div className="col-md-7">
                            <span className="IDlabel">ID:</span> {this.state.id}
                        </div>
                        <div className="col-md-2">
                            {this.state.createdDate}
                        </div>
                        <div className="col-8 col-md-2 viewDetailsBtn">
                            <span onClick={() => this.props.showDetails(this)}>View Keys</span>
                        </div>
                        <div className="col-4 col-md-1 deleteBtn">
                            <svg onClick={() => this.props.handleDelete(this)} xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path d="M3 6v18h18v-18h-18zm5 14c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm5 0c0 .552-.448 1-1 1s-1-.448-1-1v-10c0-.552.448-1 1-1s1 .448 1 1v10zm4-18v2h-20v-2h5.711c.9 0 1.631-1.099 1.631-2h5.315c0 .901.73 2 1.631 2h5.712z"/></svg>
                        </div>
                    </div>
        )
    }

    static propTypes = {
        handleDelete: PropTypes.func.isRequired,
        showDetails: PropTypes.func.isRequired
    };

}

export default Model;