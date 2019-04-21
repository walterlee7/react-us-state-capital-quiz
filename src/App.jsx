import React, { Component, Fragment } from 'react';
import './quiz';


class App extends Component {


    render() {
        return (
            <Fragment>
                <div className="title-wrapper">
                    <p className="title">JavaScript U.S. State Capital Quiz</p>
                </div>
                <div className="gamewindow" style={{ marginTop: + '0', minHeight: + '500' }}>
                    <div id="gamewrapper" style={{ position: 'relative', backgroundColor: '#deded7', width: '100%', minHeight: + '500' }}>

                        <div id="HUD">
                            <span id="timer"></span>
                            <span id="score"></span>
                            <span id="questionCount"></span>
                        </div>
                        <div className="q-header"></div>
                        <div className="q-wrapper" style={{ paddingLeft: + '20' }}>...</div>
                    </div>
                </div>
                <div id="optionsRight" style={{ paddingRight: + '50', clear: 'both' }}>
                    <span>
                        {/* <input id="cbSoundOn" type="checkbox" name="cbSoundOn" checked="checked" /><label for="cbSoundOn">Sound On</label> */}
                    </span>

                    <span>&nbsp;&nbsp;
            <button
                            // onClick="startGame()"
                            id="restart" style={{ cursor: 'pointer' }}>Restart</button>
                    </span>
                    <div id="pnlRestart">
                    </div>
                </div>
            </Fragment>

        );
    }
}

export default App;
