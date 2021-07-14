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
    this.calculateAccuracy = this.calculateAccuracy.bind(this);
    this.replaceAims = this.replaceAims.bind(this);
    this.createAims = this.createAims.bind(this);

    this.state = {
      accuracy: 0,
      complexityLevel: 0,
      totalShots: 0,
      successfulShots: 0,
      sceneryWidth: 0,
      sceneryHeight: 0,
      aims: [
        {
          top: 0,
          left: 0
        }
      ]
    };
  }

  shotMissed() {

    this.setState((prevState) => {
      return {
        totalShots: prevState.totalShots + 1
      };
    });

  }

  shotAim(aim) {

    this.setState((prevState) => {
      let aims = [...prevState.aims];
      return {
        totalShots: prevState.totalShots + 1,
        successfulShots: prevState.successfulShots + 1,
        aims: aims.filter((currentAim) => !(currentAim.left === aim.left && currentAim.top === aim.top))
      };
    });
  }

  changeComplexity(level) {
    this.setState((prevState) => {
      return {
        complexityLevel: level
      };
    }, this.createAims);
  }

  check() {
    this.setState((prevState) => {
      return {
        accuracy: calculateAccuracy(this.state.successfulShots,
          this.state.totalShots, this.state.aims)
      };
    });

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

  calculateAccuracy() {
    if (this.state.aims.length === 0) {
      this.endGame();
    }
    return this.state.successfulShots === 0 ?
      0 : (this.state.successfulShots * 100 / this.state.totalShots).toFixed(0);
  }

  replaceAims() {
    const aimSize = complexity[this.state.complexityLevel].size;
    const sceneryBack = document.getElementById('scenery-back');

    if (sceneryBack.width <= aimSize
      || sceneryBack.height <= aimSize) {
      window.resizeTo(this.state.sceneryWidth + 100, this.state.sceneryHeight + 100);
    } else {
      const maxWidth = sceneryBack.width - aimSize;
      const maxHeight = sceneryBack.height - aimSize;
      let aims = [...this.state.aims];

      aims.map(aim => {
        aim.top = aim.top * (sceneryBack.height - aimSize) / (this.state.sceneryHeight - aimSize);
        aim.left = aim.left * (sceneryBack.width - aimSize) / (this.state.sceneryWidth - aimSize);
        return aim;
      })
      this.setState((prevState) => {
        return {
          aims: aims,
          sceneryWidth: document.getElementById('scenery-back').width,
          sceneryHeight: document.getElementById('scenery-back').height
        };
      });
    }
  }

  createAims() {

    window.addEventListener("resize", this.replaceAims);

    const aimSize = complexity[this.state.complexityLevel].size;
    const sceneryBack = document.getElementById('scenery-back');
    const maxWidth = sceneryBack.width - aimSize;
    const maxHeight = sceneryBack.height - aimSize;
    let aims = [];

    for (let i = 0; i < complexity[this.state.complexityLevel].aimQuantity; i++) {
      aims.push({
        top: (Math.random() * maxHeight).toFixed(0),
        left: (Math.random() * maxWidth).toFixed(0)
      });
    }

    this.setState((prevState) => {
      return {
        aims: aims,
        sceneryWidth: document.getElementById('scenery-back').width,
        sceneryHeight: document.getElementById('scenery-back').height
      };
    });
  }

  render() {
    return (
      <div>
        <h1>Test</h1>
        <Header
          accuracy={this.calculateAccuracy()}
        />
        <ComplexityLevel
          options={complexity}
          complexityLevel={this.state.complexityLevel}
          changeComplexity={this.changeComplexity}
        />
        <Timer/>

        <div id="scenery" style={{position: "relative"}}>
          <Scenery
            createAims={this.createAims}
            replaceAims={this.replaceAims}
            shotMissed={this.shotMissed}
          />
          <Aims
            aims={this.state.aims}
            shotAim={this.shotAim}
            size={complexity[this.state.complexityLevel].size}
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
           onClick={this.props.shotMissed} onLoad={this.props.createAims}
           onresize={this.props.replaceAims}/>
    )

  }
}

class Aims extends React.Component {
  render() {
    return (
      this.props.aims.map(aim => <Aim top={aim.top} left={aim.left} size={this.props.size}
                                      shotAim={this.props.shotAim}/>)
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

    let aim = {
      top: this.props.top,
      left: this.props.left
    }
    this.props.shotAim(aim);
  }

  render() {
    return (
      <img id="sample-aim" src="/img/aim-target-svgrepo-com.svg" height={this.props.size}
           style={{
             position: "absolute",
             top: this.props.top + 'px',
             left: this.props.left + 'px'
           }} onClick={this.handleClick}/>
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

ReactDOM.render(<App/>, document.getElementById('app2'));

