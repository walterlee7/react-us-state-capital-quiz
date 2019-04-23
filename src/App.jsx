import React, { Component, Fragment } from 'react';
import $ from 'jquery';
// import './App.css';

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
            // arrQuestions: [],
            strQuestions: [],
            currentQuestion: 0,
            corrId: 0,
            container: "",
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
        this.adjustAnswerPosition = this.adjustAnswerPosition.bind(this);
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

        console.log(this.state.currentQuestion);

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

        console.log(this.state.strQuestions);

        let arrQuestions = [];
        arrQuestions = this.state.strQuestions;

        console.log(arrQuestions);

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

        console.log(data);

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

        let arrQuestions = data;

        let q = arrQuestions[this.state.currentQuestion];
        this.constructQuestionPanel(q)
        $("#questionCount").html(this.state.currentQuestion + 1 + "/" + arrQuestions.length + " ");
    }


    constructQuestionPanel(q) {
        console.log('210');
        console.dir(q);
        let qText = q.qText;

        console.log(qText);

        // let qImage = q.image;

        // console.log(q.arrAnswers);
        // console.log(qText)

        let aHtml = "";
        let qHtml = "";
        let bHtml = "";

        qHtml = "<div className='q-container' >";

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
            bHtml = "<div id='divTextAfter'></div><div id='btnPrevious' className='btnBrowse' style={{float:'left', margin-right: '2em'}}><<</div><div id='btnNext' className='btnBrowse' style={{float: 'left', margin-right: '3.3em'}}>>></div>";

            aHtml = '<div className="a-wrapper qi">' + aHtml + bHtml + '</div>'

            qHtml = "<div className='q-header' >' " + qText + "</div><div className='q-wrapper' style={{padding-left: '20px'}}>" + qHtml + aHtml + "</div>";

            this.state.container.append(qHtml);
        }

        if (q.questionLayout === 2) {
            bHtml = "<div id='divTextAfter'></div>";
            aHtml = "<div className='a-wrapper qi2' style={{min-height: '750px'}}>" + aHtml + bHtml + "<div className='q-img q-img2'><img id='theImg' src='' /></div><div id='buttonDiv'><div id='btnPrevious' className='btnBrowse' style={{float: 'left'}}><<</div><div id='btnNext' className='btnBrowse' style={{float: 'right'}}>>></div></div> </div></div>";
            qHtml = "<div class='q-header' >" + qText + "</div><div class='q-wrapper'>" + qHtml + aHtml + "</div>";

            this.state.container.append(qHtml);
        }


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

        $(".q-img img").on("load", function () {
            this.adjustAnswerPosition();
        })

        $(window).resize(function () {
            this.adjustAnswerPosition();
        })

        $("#btnNext").on("click", function () {
            let cQ = this.state.currentQuestion;
            cQ++;
            this.setState({
                currentQuestion: cQ,
            });
            $(".q-wrapper").remove();
            $(".q-header").remove();
            this.nextQuestion();
        })

        $("#btnPrevious").on("click", function () {
            let cQ = this.state.currentQuestion;
            cQ--;
            this.setState({
                currentQuestion: cQ,
            });
            $(".q-wrapper").remove();
            $(".q-header").remove();
            this.nextQuestion();
        })

        $(".answer").on("click", function () {
            var item = $(this);
            var thisId = item.attr("id");

            q[this.state.currentQuestion].arrAnswers[thisId].clicked = 1;

            let tC = this.state.totalClicks;
            tC++;
            this.setState({
                totalClicks: tC,
            })

            if (q[this.state.currentQuestion].answered === 0) {
                if (this.state.corrId === thisId) {

                    q[this.state.currentQuestion].answered = 1;

                    let cC = this.state.correctClicks;
                    cC++;
                    this.setState({
                        correctClicks: cC,
                    });

                    item.addClass("correct");
                    item.removeClass("activeanswer");
                    $(".answer").off();

                    let cQ = this.state.currentQuestion;
                    cQ++;
                    this.setState({
                        currentQuestion: cQ,
                    });

                    if (q.length > this.state.currentQuestion) {
                        $("#btnNext").show();
                    }

                    if (q.length > this.state.currentQuestion) {
                        $(".q-wrapper").fadeOut(1000, function () {

                            $(".q-wrapper").remove();
                            $(".q-header").remove();

                            this.nextQuestion();
                        })
                    } else {
                        let cQ = this.state.currentQuestion;
                        cQ--;
                        this.setState({
                            currentQuestion: cQ,
                        });

                        $(".activeanswer").removeClass("activeanswer");
                        this.stopTimer();
                        this.updateScore();
                    }
                } else {
                    item.addClass("wrong");
                    item.removeClass("activeanswer");

                    let wC = this.state.wrongClicks;
                    wC++;
                    this.setState({
                        wrongClicks: wC,
                    });

                    item.animate({ opacity: 0.75 }, 1000);
                    item.off();
                }
                this.updateScore();
            }
        })
    }

    constructAnswer(aTxt, aId, aClicked, aCorrect) {

        var cellHtml;

        var extraClass = '';

        if (aClicked === 1 && aCorrect === 0) extraClass = 'wrong';
        if (aClicked === 1 && aCorrect === 1) extraClass = 'correct';

        cellHtml = "<div className='answer'" + extraClass + "id='" + aId + "' ><div className='a-content' ><div className='text' >" + aTxt + "</div></div></div>";

        return cellHtml;
    }

    adjustAnswerPosition() {
        if ($(".q-img").length > 0) {
            var qh = $(".q-container").height();
            var am = (qh / 2) - ($(".a-wrapper").height() / 2);

            if ($(".a-wrapper.qi .answer.image").length > 0) {
                console.log(am);

                if (qh / 6 < 70) {
                    am = 0;
                    qh = 70 * 6;
                } else {
                    am = qh / 6;
                }

                $(".a-wrapper").css("margin-top", am + "px");
                $(".qi .text").css("margin-top", (qh / 6 / 2) - ($(".qi .text").height() / 2) - 5 + "px")
                $(".qi .answer").css("height", qh / 6 + "px")
                $(".qi .img-wrapper img").css("height", qh / 6 - 20 + "px")

            }
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
