import React, { Component, Fragment } from 'react';
import $ from 'jquery';
import './App.css';

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
            currentQuestion: 0,
            corrId: 0,
            thisId: 100,
            container: "",
            clicked: 100,
            answered: 100,
        };

        this.startGame = this.startGame.bind(this);
        this.setupGame = this.setupGame.bind(this);
        this.by = this.by.bind(this);
        this.startTimer = this.startTimer.bind(this);
        this.stopTimer = this.stopTimer.bind(this);
        this.clearScore = this.clearScore.bind(this);
        this.updateScore = this.updateScore.bind(this);
        this.nextQuestion = this.nextQuestion.bind(this);
        this.constructQuestionPanel = this.constructQuestionPanel.bind(this);
        this.constructAnswer = this.constructAnswer.bind(this);
    }


    componentDidMount() {
        this.setupGame();
        this.startTimer();
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

        console.log('cC ' + this.state.correctClicks);
        console.log('tC ' + this.state.totalClicks);

        this.setState({
            score: Math.round(this.state.correctClicks / this.state.totalClicks * 100)
        })

        if (!isNaN(this.state.score) && this.state.score >= 0) {
            $("#score").html("Score: " + this.state.score + "%");
        } else {
            $("#score").html("");
        }
    }

    async setupGame() {
        this.stopTimer();
        this.clearScore();
        $("#gameWrapper").html("");
        $(".q-container").remove();
        $(".a-wrapper").remove();
        $(".q-wrapper").remove();

        await this.setState({
            currentQuestion: 1,
        });

        // console.log(this.state.currentQuestion);

        await this.setState({
            container: $("#gamewrapper"),
        });

        await fetch('./questions.json')
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({ strQuestions: data });
            });

        // console.log(this.state.strQuestions);

        let arrQuestions = [];
        arrQuestions = this.state.strQuestions;

        // console.log(arrQuestions);

        arrQuestions.sort(this.by("qSortOrder"))

        let i, j;
        for (i = 0; i < arrQuestions.length; i++) {
            arrQuestions[i].arrAnswers = JSON.parse(arrQuestions[i].answers)
            arrQuestions[i].arrAnswers.sort(this.by("id"))
            for (j = 0; j < arrQuestions[i].arrAnswers.length; j++) {
                arrQuestions[i].arrAnswers[j].id = j;
            }
        }
        this.startGame(arrQuestions);
    }

    by(path, reverse, primer, then) {
        var get = function (obj, path) {
            if (path) {
                path = path.split('.');
                for (var i = 0, len = path.length - 1; i < len; i++) {
                    obj = obj[path[i]];
                };
                return obj[path[len]];
            }
            return obj;
        },
            prime = function (obj) {
                return primer ? primer(get(obj, path)) : get(obj, path);
            };

        return function (a, b) {
            var A = prime(a),
                B = prime(b);

            return (
                (A < B) ? -1 :
                    (A > B) ? 1 :
                        (typeof then === 'function') ? then(a, b) : 0
            ) * [1, -1][+!!reverse];
        };
    };

    startGame(data) {
        this.clearScore();
        $(".a-wrapper").remove();
        $(".q-wrapper").remove();
        $(".q-header").remove();
        this.stopTimer();
        this.startTimer();

        let i, j;

        // let arrQuestions = [];

        // console.log(data);

        let arrQuestions = data;

        for (i = 0; i < arrQuestions.length; i++) {

            arrQuestions[i].answered = 0;

            for (j = 0; j < arrQuestions[i].arrAnswers.length; j++) {
                arrQuestions[i].arrAnswers[j].clicked = 0;
            }
        }

        this.setState({
            currentQuestion: 0,
        })

        this.nextQuestion(arrQuestions);
    }


    nextQuestion(data) {
        // arrQuestions = shuffle(arrQuestions);
        // console.log('Showing question ' + currentQuestion)

        // console.log('data');

        // console.dir(data);

        // let arrQuestions = data;

        // console.log(this.state.strQuestions[this.state.currentQuestion]);

        let q = this.state.strQuestions[this.state.currentQuestion];

        this.constructQuestionPanel(q)

        $("#questionCount").html(this.state.currentQuestion + 1 + "/" + this.state.strQuestions.length + " ");
    }


    constructQuestionPanel(q) {

        let qText = q.qText;

        let aHtml = "";
        let qHtml = "";
        let bHtml = "";

        qHtml = "<div class='q-container' >";

        for (let i = 0; i < q.arrAnswers.length; i++) {
            var a = q.arrAnswers[i];
            if (a.correct === "1") {
                this.setState({
                    corrId: a.id,
                })
            }
            aHtml = aHtml + this.constructAnswer(a.aText, a.id, a.clicked, a.correct)
        }

        if (q.questionLayout === 1) {
            bHtml = "<div id='divTextAfter'></div><div id='btnPrevious' class='btnBrowse' style={{float:'left', margin-right: '2em'}}><<</div><div id='btnNext' class='btnBrowse' style={{float: 'left', margin-right: '3.3em'}}>>></div>";

            aHtml = '<div class="a-wrapper qi">' + aHtml + bHtml + '</div>'

            qHtml = "<div class='q-header' > " + qText + "</div><div class='q-wrapper' style={{padding-left: '20px'}}>" + qHtml + aHtml + "</div>";

            this.state.container.append(qHtml);
        }

        // if (q.questionLayout === 2) {
        //     bHtml = "<div id='divTextAfter'></div>";
        //     aHtml = "<div class='a-wrapper qi2' style={{min-height: '750px'}}>" + aHtml + bHtml + "<div class='q-img q-img2'><img id='theImg' src='' /></div><div id='buttonDiv'><div id='btnPrevious' class='btnBrowse' style={{float: 'left'}}><<</div><div id='btnNext' class='btnBrowse' style={{float: 'right'}}>>></div></div> </div></div>";
        //     qHtml = "<div class='q-header' >" + qText + "</div><div class='q-wrapper'>" + qHtml + aHtml + "</div>";

        //     this.state.container.append(qHtml);
        // }

        $('.q-img').hide();
        $('#theImg').hide();

        $("#theImg").bind('load', function () {
            $('.q-img').fadeIn(2000)
            $("#theImg").fadeIn(2000)
        });

        if (q.answered === 0) {
            $(".answer").addClass("activeanswer");
            $("#btnNext").hide();
        }

        if (this.state.currentQuestion === q.length - 1) {
            $("#btnNext").hide();
        }

        var ah = $(".answer").height();
        var aw = $(".answer").width();

        $(".a-content").css("width: " + aw + "px");

        $(".a-content img").css("height: " + ah * .8 + "px");

        if (this.state.currentQuestion === 0) {
            $("#btnPrevious").hide();
        }

        let data = this.state;

        $(".answer").on("click", data, (e) => {

            let parse = parseInt(e.currentTarget.id);

            this.setState({
                thisId: parse,
            });

            // console.log('thisID ' + this.state.thisId);

            this.setState({
                clicked: this.state.strQuestions[data.currentQuestion].arrAnswers[this.state.thisId].clicked,
            });

            this.setState({
                clicked: 1,
            });

            let tC = data.totalClicks;
            tC++;
            this.setState({
                totalClicks: tC,
            });

            this.setState({
                answered: this.state.strQuestions[data.currentQuestion].answered,
            });

            // console.log('answered ' + this.state.answered);

            // console.log('data ' + data.corrId);

            if (this.state.answered === 0) {

                // console.log('corrId ' + data.corrId);

                // this.typeCheck(data.corrId);

                // this.typeCheck(this.state.thisId);

                // console.log('thisId ' + this.state.thisId);

                if (data.corrId === this.state.thisId) {

                    console.log('correct');

                    this.setState({
                        answered: 1,
                    })

                    console.log('answered.2 ' + this.state.answered);

                    let cC = data.correctClicks;
                    cC++;
                    this.setState({
                        correctClicks: cC,
                    });

                    $("#" + this.state.thisId).addClass("correct");
                    $("#" + this.state.thisId).removeClass("activeanswer");

                    $(".answer").off();

                    let cQ = data.currentQuestion;
                    cQ++;
                    this.setState({
                        currentQuestion: cQ,
                    });

                    if (this.state.strQuestions.length > data.currentQuestion) {
                        $("#btnNext").show();
                    }

                    if (this.state.strQuestions.length > data.currentQuestion) {

                        $(".q-wrapper").fadeOut(1000, (e) => {

                            $(".q-wrapper").remove();
                            $(".q-header").remove();

                            this.nextQuestion();
                        })

                    } else {
                        let cQ = data.currentQuestion;
                        cQ--;
                        this.setState({
                            currentQuestion: cQ,
                        });

                        $(".activeanswer").removeClass("activeanswer");
                        // this.stopTimer();
                        this.updateScore();
                    }
                } else {

                    console.log('wrong');

                    $("#" + this.state.thisId).addClass("wrong");
                    $("#" + this.state.thisId).removeClass("activeanswer");

                    let wC = data.wrongClicks;
                    wC++;
                    this.setState({
                        wrongClicks: wC,
                    });

                    $("#" + this.state.thisId).animate({ opacity: 0.75 }, 1000);
                    $("#" + this.state.thisId).off();
                }
                this.updateScore();
            }
        })

        $("#btnNext").on("click", data, () => {
            console.log('hello');
            console.log(data.currentQuestion);

            let cQ = data.currentQuestion;

            cQ++;

            this.setState({
                currentQuestion: cQ,
            });

            console.log('297 ' + this.state.currentQuestion);

            $(".q-wrapper").remove();
            $(".q-header").remove();
            this.nextQuestion(data);
        })

        // console.log('296 ' + this.state.currentQuestion);

        $("#btnPrevious").on("click", data, (e) => {

            // console.log('300 ' + this.state.currentQuestion);

            let cQ = data.currentQuestion;
            cQ--;
            this.setState({
                currentQuestion: cQ,
            });
            $(".q-wrapper").remove();
            $(".q-header").remove();
            this.nextQuestion();
        })
        // console.log('399 ' + this.state.currentQuestion);
    }

    constructAnswer(aTxt, aId, aClicked, aCorrect) {

        var cellHtml;

        var extraClass = '';

        if (aClicked === 1 && aCorrect === 0) extraClass = 'wrong';
        if (aClicked === 1 && aCorrect === 1) extraClass = 'correct';

        cellHtml = "<div class='answer'" + extraClass + "id='" + aId + "' ><div class='a-content' ><div class='text' >" + aTxt + "</div></div></div>";

        return cellHtml;
    }

    typeCheck(e) {
        if (typeof e === 'string') {
            console.log('string');
        } else if (typeof e === 'number') {
            console.log('integer');
        } else {
            console.log('what are you');
        };
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
                            onClick={() => { this.setupGame(); }}
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
