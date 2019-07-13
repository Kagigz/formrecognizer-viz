import React from 'react';
import {Link} from 'react-router-dom';

class Navbar extends React.Component{

    render(){
        var classHome = 'nav-item nav-link';
        var classManage = 'nav-item nav-link';
        var classAnalyze = 'nav-item nav-link';
        var currentTagHome = '';
        var currentTagManage = '';
        var currentTagAnalyze = '';
        switch(this.props.current){
            case 0:
                classHome = 'nav-item nav-link active';
                currentTagHome = <span className="sr-only">(current)</span>;
                break;
            case 1:
                    classManage = 'nav-item nav-link active';
                    currentTagManage = <span className="sr-only">(current)</span>;
                    break;
            case 2:
                    classAnalyze = 'nav-item nav-link active';
                    currentTagAnalyze = <span className="sr-only">(current)</span>;
                    break;
            default:
                break;           
        }

        return (
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <span className="navbar-brand" href="#">FormRecognizer Viz</span>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                    <Link to='/'><span className={classHome}>Home{currentTagHome}</span></Link>
                    <Link to='/manage'><span className={classManage}>Manage Models{currentTagManage}</span></Link>
                    <Link to='/analyze'><span className={classAnalyze} href="#">Analyze Form{currentTagAnalyze}</span></Link>
                    </div>
                </div>
            </nav>

        )
    }
}

export default Navbar;