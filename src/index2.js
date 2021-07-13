const complexity = [
  {
    level: 0,
    size: 100,
    name: "Level 1",
    aimQuantity: 5
  },
  {
    level: 1,
    size: 50,
    name: "Level 2",
    aimQuantity: 10
  },
  {
    level: 2,
    size: 20,
    name: "Level 3",
    aimQuantity: 15
  }
]

const aim = {
  top: 0,
  left: 0
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.shotMissed = this.shotMissed.bind(this);
    this.shotAim = this.shotAim.bind(this);
    this.changeComplexity = this.changeComplexity.bind(this);

    this.state = {
      accuracy: 0,
      complexityLevel: 0,
      totalShots: 0,
      successfulShots: 0,
      aims: [
        {
          top: 0,
          left: 0
        }
      ]
    };
  }

  shotMissed() {
    console.log('Shot missed!');

    this.setState((prevState) => {
      return {
        totalShots: prevState.totalShots + 1
      };
    });

    this.check();
  }

  shotAim(aim) {
    console.log('Shot aim!');

    this.setState((prevState) => {
      let aims = [...prevState.aims];

      return {
        aims: aims.filter((currentAim) => !(currentAim.left === aim.left && currentAim.top === aim.top))
      };
    });

    this.check();
  }

  changeComplexity(level) {
    console.log(level);

    this.setState((prevState) => {
      return {
        complexityLevel: level
      };
    });
    console.log(this.state);
  }

  check() {
    this.state.accuracy = calculateAccuracy(this.state.successfulShots,
      this.state.totalShots);

    if (this.state.aims.length === 0) {
      this.endGame();
    }
  }

  endGame() {
    document.body.classList.remove('game-mode')
    document.body.classList.add('endgame-mode');
    this.alertUser();
  }

  alertUser() {
    window.setTimeout(function () {
      alert('That\'s all, Folks!')
    }, 500);
  }

  render() {
    return (
      <div>
        <h1>Test</h1>
        <Header/>
        <ComplexityLevel
          options={complexity}
          complexityLevel={this.state.complexityLevel}
          changeComplexity={this.changeComplexity}
        />
        <Timer/>

        <div id="scenery" style={{position: "relative"}}>
          <Scenery
            shotMissed={this.shotMissed}
          />
          <Aims
            aims={this.state.aims}
            shotAim={this.shotAim}
          />
        </div>
      </div>
    );
  }
}

class Header extends React.Component {
  render() {
    return (
      <div className="menu-button" style={{margin: "0 5% 0 0%;"}}>
        <h1>The game is a game</h1>
        <h2 id="accuracy"> Your accuracy is {this.props.accuracy ? this.props.accuracy + "%" : "unknown"} </h2>
      </div>
    );
  }
}

class Timer extends React.Component {
  render() {
    return (
      <div className="menu-button">
        <h2>Current time: {this.props.accuracy ? this.props.time : "unknown"}</h2>
      </div>
    )
  }
}

class Scenery extends React.Component {
  render() {
    return (
      <img id="scenery-back" className="scenery" src="/img/scenery.jpg"
           onClick={this.props.shotMissed}/>
    )
  }
}

class Aims extends React.Component {
  render() {
    return (
      this.props.aims.map(aim => <Aim top={aim.top} left={aim.left} shotAim={this.props.shotAim}/>)
    )
  }
}

class Aim extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick(e) {
    e.preventDefault();


    console.log('this ', this);
    let aim = {
      top: this.props.top,
      left: this.props.left
    }
    this.props.shotAim(aim);
  }

  render() {
    return (
      <img id="sample-aim" src="/img/aim-target-svgrepo-com.svg" height="100" top={this.props.top}
           bottom={this.props.left}
           style={{position: "absolute"}} onClick={this.handleClick}/>
    )
  }
}

class ComplexityLevel extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    e.preventDefault();

    const level = e.target.value;
    console.log(level);
    this.props.changeComplexity(level);
  }

  render() {
    return (
      <div className="menu-button">
        <select id="complexity" name="complexity"
                style={{
                  display: "inline-block",
                  fontSize: "large"
                }}
                onChange={this.handleChange}
        >
          {
            this.props.options.map(
              (option) => <option value={option.level}>{option.name}</option>)
          }
        </select>
        <label htmlFor="complexity" style={{display: 'inline-block'}}><h2>Level</h2></label>
      </div>
    );
  }
}

function calculateAccuracy(successfulShots, totalShots) {
  return (successfulShots / totalShots * 100).toFixed(2);
}

ReactDOM.render(<App/>, document.getElementById('app2'));
