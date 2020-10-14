


// ----- DISPLAY COMPONENT -----
const Display = (props) => {
    return (
        <p id="display">{props.text}</p>
    );
};




class DrumPad extends React.Component {
    constructor(props) {
        super(props);

        this.play = this.play.bind(this);
    };

    static propTypes = {
        id: PropTypes.number.isRequired,
        value: PropTypes.string.isRequired,
        audioSrc: PropTypes.string.isRequired,
        onClick: PropTypes.function
    };

    play = () => {
        this.props.onClick(this.props.id);
        document.getElementById(this.props.value).play();
    };

    render() {
        return (
            <button
                type="button"
                className="drum-pad"
                id={"drum-pad" + this.props.id}
                onclick={this.play}
            >
                <audio id={this.props.value}>
                    <source
                        src={this.props.audioSrc}
                        type="audio/mpeg"
                    />
                </audio>
            </button>
        );
    };
};



class DrumMachine extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: ''
        };

        this.updateDisplay = this.updateDisplay.bind(this);
    };

    updateDisplay = (id) => {
        this.setState({ text: "set this" });
    };

    render() {
        return (
            <div id="drum-machine">
                <Display text="Playing chord" />

                <div id="buttons">

                    <DrumPad
                        id={1}
                        value="Q"
                        audioSrc="https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
                        onClick={this.updateDisplay}
                    />

                </div>
            </div>
        );
    };
}



// // ----- CLASS COMPONENT -----
// class MyComponent extends React.Component {
//     constructor(props) {
//         super(props);

//         // ----- STATE FOR STATEFUL COMPONENT -----
//         this.state = {
//             value: 0,
//             input: ''
//         };

//         // ----- BINDING METHODS -----
//         this.handleChange = this.handleChange.bind(this);
//     }

//     // ----- PROP TYPES -----
//     static propTypes = {
//         title: PropTypes.string.isRequired,
//         value: PropTypes.number,
//         tools: PropTypes.array
//     }

//     // ----- DEFAULT PROPS -----
//     static defaultProps = {
//         title: 'Title',
//         value: 1,
//         tools: ['react']
//     }

//     // ----- COMPONENT DID MOUNT -----
//     componentDidMount() {
//         // ----- CALL FOR API -----
//         // ----- ADD LISTENERS -----
//     }

//     // ----- COMPONENT WILL UNMOUNT -----
//     componentWillUnmount() {
//         // ----- REMOVE LISTENERS -----
//     }

//     // ----- SHOULD COMPONENT UPDATE -----
//     shouldComponentUpdate(nextProps, nextState) {
//         return true;
//     }

//     // ----- METHODS -----
//     handleChange(event) {
//         let v = event.target.value;

//         // ----- SET STATE -----
//         this.setState((state, props) => ({
//             value: state.value + props.value,
//             input: v
//         }));
//     }

//     // ----- RENDER -----
//     render() {
//         // ----- INLINE STYLES -----
//         const styles = {
//             border: "2px solid blue",
//             fontSize: 20
//         }

//         return (
//             <div>
//                 <h1 className="text-primary">My component</h1>
//                 <h2>{this.props.title + " " + this.props.value}</h2>
//                 <h3>Tools: {this.props.tools.join(", ")}</h3>
//                 <hr />
//                 <input type="text" onChange={this.handleChange} style={styles}></input>
//                 <span> {this.state.value} </span>
//                 <hr />
//                 <FunComponent value={1} />
//             </div>
//         );
//     }
// };





// ----- RENDER COMPONENT -----
ReactDOM.render(
    <MyComponent
        title='Template' value={4} tools={['jquery', 'bootstrap', 'react']} />,
    document.getElementById('app')
);

