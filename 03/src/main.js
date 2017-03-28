/**
 * Created by mprasanth on 26/03/2017.
 */

var React = require("react");
var ReactDOM = require("react-dom");
require("./style.scss");


class Message extends React.Component {
    render(){
        return (<div id="message">
                <h1>{this.props.title}</h1>
                <p>{this.props.message}</p>
            </div>);
    }
}

ReactDOM.render(<Message title="Murali" message="Hello there!!" />,
                document.getElementById("react-container"))