var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// CLIPS
var clips = [{
    id: 1,
    value: "Q",
    text: "Chord 1",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
}, {
    id: 2,
    value: "W",
    text: "Chord 2",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
}, {
    id: 3,
    value: "E",
    text: "Chord 3",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
}, {
    id: 4,
    value: "A",
    text: "Drum 1",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
}, {
    id: 5,
    value: "S",
    text: "Drum 2",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
}, {
    id: 6,
    value: "D",
    text: "Drum 3",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
}, {
    id: 7,
    value: "Z",
    text: "Sound 1",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
}, {
    id: 8,
    value: "X",
    text: "Sound 2",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
}, {
    id: 9,
    value: "C",
    text: "Sound 3",
    audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
}];

// ----- DISPLAY COMPONENT -----
var Display = function Display(props) {
    return React.createElement(
        "p",
        { id: "display" },
        props.text && React.createElement("i", { className: "fas fa-music" }),
        " ",
        props.text
    );
};

// DRUM PAD COMPONENT

var DrumPad = function (_React$Component) {
    _inherits(DrumPad, _React$Component);

    function DrumPad(props) {
        _classCallCheck(this, DrumPad);

        var _this = _possibleConstructorReturn(this, (DrumPad.__proto__ || Object.getPrototypeOf(DrumPad)).call(this, props));

        _this.play = function () {
            _this.props.onClick(_this.props.text);
            // OPTIONAL PLAYING AUDIO USING REF
            // this.audioRef.play();
            var audio = document.getElementById(_this.props.value);
            audio.currentTime = 0;
            audio.play();
        };

        _this.play = _this.play.bind(_this);
        _this.handleKeyDown = _this.handleKeyDown.bind(_this);
        _this.handleKeyUp = _this.handleKeyUp.bind(_this);
        return _this;
    }

    _createClass(DrumPad, [{
        key: "handleKeyDown",
        value: function handleKeyDown(event) {
            if (event.code === "Key" + this.props.value) {
                event.preventDefault();
                var element = document.getElementById("drum-pad" + this.props.id);
                element.click();
                element.classList.add('btn-active');
            }
        }
    }, {
        key: "handleKeyUp",
        value: function handleKeyUp(event) {
            if (event.code === "Key" + this.props.value) {
                var element = document.getElementById("drum-pad" + this.props.id);
                element.classList.remove('btn-active');
            }
        }

        // MAYBE MOVE LISTENERS TO MAIN APP

    }, {
        key: "componentDidMount",
        value: function componentDidMount() {
            window.addEventListener('keydown', this.handleKeyDown);
            window.addEventListener('keyup', this.handleKeyUp);
        }

        // MAYBE MOVE LISTENERS TO MAIN APP

    }, {
        key: "componentWillUnmount",
        value: function componentWillUnmount() {
            window.removeEventListener('keydown', this.handleKeyDown);
            window.removeEventListener('keyup', this.handleKeyUp);
        }
    }, {
        key: "render",
        value: function render() {
            return React.createElement(
                "button",
                {
                    type: "button",
                    className: "drum-pad",
                    id: "drum-pad" + this.props.id,
                    onClick: this.play
                },
                React.createElement("audio", {
                    className: "clip",
                    id: this.props.value,
                    src: this.props.audioSrc
                    // OPTIONAL SETTING REF FOR PLAYING AUDIO
                    //ref={(audio) => { this.audioRef = audio; }}
                }),
                this.props.value
            );
        }
    }]);

    return DrumPad;
}(React.Component);

DrumPad.propTypes = {
    id: PropTypes.number.isRequired,
    value: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    audioSrc: PropTypes.string.isRequired,
    onClick: PropTypes.func
};
;

// DRUM MACHINE COMPONENT

var DrumMachine = function (_React$Component2) {
    _inherits(DrumMachine, _React$Component2);

    function DrumMachine(props) {
        _classCallCheck(this, DrumMachine);

        var _this2 = _possibleConstructorReturn(this, (DrumMachine.__proto__ || Object.getPrototypeOf(DrumMachine)).call(this, props));

        _this2.updateDisplay = function (text) {
            _this2.setState({ text: text });
        };

        _this2.state = {
            text: ''
        };

        _this2.updateDisplay = _this2.updateDisplay.bind(_this2);
        return _this2;
    }

    _createClass(DrumMachine, [{
        key: "render",
        value: function render() {
            var _this3 = this;

            return React.createElement(
                "div",
                { id: "drum-machine" },
                React.createElement(
                    "header",
                    { id: "header" },
                    "Drum Machine"
                ),
                React.createElement(
                    "div",
                    { id: "interface" },
                    React.createElement(Display, { text: this.state.text }),
                    React.createElement(
                        "div",
                        { id: "buttons" },
                        this.props.clips.map(function (clip) {
                            return React.createElement(DrumPad, Object.assign({
                                key: clip.id
                            }, clip, {
                                onClick: _this3.updateDisplay
                            }));
                        })
                    )
                )
            );
        }
    }]);

    return DrumMachine;
}(React.Component);

// ----- RENDER COMPONENT -----


DrumMachine.propTypes = {
    clips: PropTypes.array
};
ReactDOM.render(React.createElement(DrumMachine, { clips: clips }), document.getElementById('main-app'));