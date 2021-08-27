import React, { Component } from "react";
import SimpleMap from "./Map";

class App extends Component {
    render() {
        return (
            <div>
                <SimpleMap />
                <button className="capture">Capture</button>

            </div>
        );
    }
}

export default App;
