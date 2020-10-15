// CLIPS
const clips = [
    {
        id: 1,
        value: "Q",
        text: "Chord 1",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
    },
    {
        id: 2,
        value: "W",
        text: "Chord 2",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
    },
    {
        id: 3,
        value: "E",
        text: "Chord 3",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
    },
    {
        id: 4,
        value: "A",
        text: "Drum 1",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
    },
    {
        id: 5,
        value: "S",
        text: "Drum 2",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
    },
    {
        id: 6,
        value: "D",
        text: "Drum 3",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
    },
    {
        id: 7,
        value: "Z",
        text: "Sound 1",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
    },
    {
        id: 8,
        value: "X",
        text: "Sound 2",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
    },
    {
        id: 9,
        value: "C",
        text: "Sound 3",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
    }
]



// ----- DISPLAY COMPONENT -----
const Display = (props) => {
    return (
        <p id="display">{props.text && <i className="fas fa-music"></i>} {props.text}</p>
    );
};



// DRUM PAD COMPONENT
class DrumPad extends React.Component {
    constructor(props) {
        super(props);

        this.play = this.play.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleKeyUp = this.handleKeyUp.bind(this);
    };

    static propTypes = {
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
        text: PropTypes.string.isRequired,
        audioSrc: PropTypes.string.isRequired,
        onClick: PropTypes.func
    };

    play = () => {
        this.props.onClick(this.props.text);
        // OPTIONAL PLAYING AUDIO USING REF
        // this.audioRef.play();
        let audio = document.getElementById(this.props.value);
        audio.currentTime = 0;
        audio.play();
    };

    handleKeyDown(event) {
        if (event.code === ("Key" + this.props.value)) {
            event.preventDefault();
            let element = document.getElementById("drum-pad" + this.props.id);
            element.click();
            element.classList.add('btn-active');
        }
    }

    handleKeyUp(event) {
        if (event.code === ("Key" + this.props.value)) {
            let element = document.getElementById("drum-pad" + this.props.id);
            element.classList.remove('btn-active');
        }
    }

    // MAYBE MOVE LISTENERS TO MAIN APP
    componentDidMount() {
        window.addEventListener('keydown', this.handleKeyDown);
        window.addEventListener('keyup', this.handleKeyUp);
    }

    // MAYBE MOVE LISTENERS TO MAIN APP
    componentWillUnmount() {
        window.removeEventListener('keydown', this.handleKeyDown);
        window.removeEventListener('keyup', this.handleKeyUp);
    }

    render() {
        return (
            <button
                type="button"
                className="drum-pad"
                id={"drum-pad" + this.props.id}
                onClick={this.play}
            >
                <audio
                    className="clip"
                    id={this.props.value}
                    src={this.props.audioSrc}
                // OPTIONAL SETTING REF FOR PLAYING AUDIO
                //ref={(audio) => { this.audioRef = audio; }}
                />
                {this.props.value}
            </button >
        );
    };
};



// DRUM MACHINE COMPONENT
class DrumMachine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.updateDisplay = this.updateDisplay.bind(this);
    };

    static propTypes = {
        clips: PropTypes.array
    };

    updateDisplay = (text) => {
        this.setState({ text });
    };

    render() {
        return (
            <div id="drum-machine">
                <header id="header">Drum Machine</header>
                <div id="interface">
                    <Display text={this.state.text} />
                    <div id="buttons">
                        {this.props.clips.map(clip => (
                            <DrumPad
                                key={clip.id}
                                {...clip}
                                onClick={this.updateDisplay}
                            />
                        ))}
                    </div>
                </div>
            </div>
        );
    };
}



// ----- RENDER COMPONENT -----
ReactDOM.render(
    <DrumMachine clips={clips} />,
    document.getElementById('main-app')
);

