import React, { Component, Fragment } from 'react';
import $ from 'jquery';


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            gameTime: 0,
            end: 0,
            score: 0,
            correctClicks: 0,
            wrongClicks: 0,
            totalClicks: 0,
            strQuestions: [],
            data: new Request('questions.json'),
        };
    }

    componentDidMount() {
        this.startTimer();
        fetch(this.state.data)
            .then((res) => {
                console.log('res')
                console.dir(res);
                return res.json();
            })
            .then((data) => {
                this.setState({ strQuestions: data });
            });
    }





    startTimer() {
        let start = new Date();
        $('#timer').html('0:00');
        $('#score').html('Score: 0%');

        this.setState({
            gameTime: setInterval(function () {
                let gameDuration = new Date() - start;
                let totalSeconds = Math.round(gameDuration / 1000);
                var minutes = Math.floor(totalSeconds / 60);
                var seconds = totalSeconds % 60;
                var pad = "00";
                pad = pad.toString();
                seconds = seconds.toString();
                seconds = pad.substring(0, pad.length - seconds.length) + seconds;
                let newTime = minutes + ":" + seconds;
                $('#timer').html(newTime);
            }, 1000)
        })
    }

    stopTimer() {
        this.setState({
            end: new Date()
        })
        clearTimeout(this.state.gameTime);
    }

    clearScore() {
        this.setState({
            score: 0,
            correctClicks: 0,
            wrongClicks: 0,
            totalClicks: 0,
        })

        $("#score").html("Score: 0%");
    }

    updateScore() {
        this.setState({
            score: Math.round(this.state.correctClicks / this.state.totalClicks * 100)
        })

        if (!isNaN(this.state.score) && this.state.score >= 0) {
            $("#score").html("Score: " + this.state.score + "%");
        } else {
            $("#score").html("");
        }
    }

    render() {
        return (
            <Fragment>
                <div className="title-wrapper">
                    <p className="title">React U.S. State Capital Quiz</p>
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
                    <button onClick={() => { this.stopTimer(); }}
                        className="stopTimer">Stop</button>
                </div>
            </Fragment>

        );
    }
}

export default App;
