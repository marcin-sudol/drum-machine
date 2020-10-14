// CLIPS
const clips = [
    {
        id: 1,
        value: "Q",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
    },
    {
        id: 2,
        value: "W",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
    },
    {
        id: 3,
        value: "E",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
    },
    {
        id: 4,
        value: "A",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
    },
    {
        id: 5,
        value: "S",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
    },
    {
        id: 6,
        value: "D",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
    },
    {
        id: 7,
        value: "Z",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
    },
    {
        id: 8,
        value: "X",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
    },
    {
        id: 9,
        value: "C",
        audioSrc: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
    }
]



// ----- DISPLAY COMPONENT -----
const Display = (props) => {
    return (
        <p id="display">{props.text}</p>
    );
};



// DRUM PAD COMPONENT
class DrumPad extends React.Component {
    constructor(props) {
        super(props);

        this.play = this.play.bind(this);
    };

    static propTypes = {
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
        audioSrc: PropTypes.string.isRequired,
        onClick: PropTypes.func
    };

    play = () => {
        this.props.onClick(this.props.id);
        // OPTIONAL PLAYING AUDIO USING REF
        // this.audioRef.play();
        document.getElementById(this.props.value).play();
    };

    render() {
        return (
            <button
                type="button"
                className="drum-pad"
                id={"drum-pad" + this.props.id}
                onClick={this.play}
            >
                <audio
                    id={this.props.value}
                // OPTIONAL SETTING REF FOR PLAYING AUDIO
                //ref={(audio) => { this.audioRef = audio; }}
                >
                    <source
                        src={this.props.audioSrc}
                        type="audio/mpeg"
                    />
                </audio>
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

    updateDisplay = (id) => {
        this.setState({ text: id });
    };

    render() {
        return (
            <div id="drum-machine">
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
        );
    };
}



// ----- RENDER COMPONENT -----
ReactDOM.render(
    <DrumMachine clips={clips} />,
    document.getElementById('app')
);

