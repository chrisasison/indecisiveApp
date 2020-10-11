class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleClearList = this.handleClearList.bind(this);
        this.handleDecide = this.handleDecide.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            options: []
        }
    }

    handleClearList() {
        this.setState(() => {
            return {
                options: []
            }
        })
    }

    handleDecide() {
        const randomIndex = Math.floor(Math.random() * this.state.options.length)
        const decision = this.state.options[randomIndex];
        alert(decision);
    }

    handleAddOption(option) {
        if (!option) {
            return 'Please enter an option'
        } else if (this.state.options.indexOf(option) > -1) {
            return 'This option exists'
        }

        this.setState((prevState) => {
            return {
                options: prevState.options.concat(option)
            }
        })
    }

    render() {
        const title = 'Indecision';
        const subtitle = 'Making hard decisions a little bit easier';

        return (
            <div>
                <Header title={title} subtitle ={subtitle} />
                <Action
                    hasOptions={this.state.options.length > 0}
                    handleDecide={this.handleDecide}
                />
                <Options
                    options={this.state.options}
                    handleClearList={this.handleClearList}
                />
                <AddOptions
                    handleAddOption={this.handleAddOption}
                />
            </div>
        )
    }
}

const Header = (props) => {
    return (
        <div>
            <h1>{props.title}</h1>
            <h2>{props.subtitle}</h2>
        </div>
    )
}


const Action = (props) => {
    return (
        <div>
            <button
                onClick={props.handleDecide}
                disabled={!props.hasOptions}
            >
                Decide
            </button>
        </div>
    )
}

class Options extends React.Component {
    render() {
        return (
            <div>
                <button onClick={this.props.handleClearList}>Clear List</button>
                {
                    this.props.options.map((option) => <Option key={option} OptionText={option} />)
                }
            </div>
        )
    }
}

const Option = (props) => {
    return(
        <div>
            <p>{props.OptionText}</p>
        </div>
    )
}


class AddOptions extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {
            error: undefined
        }
    }
    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => {
            return {error}
        });
    }
    render() {
        return (
            <div>
                {this.state.error && <p>{this.state.error}</p>}
                <form onSubmit={this.handleAddOption}>
                    <input type='text' name='option' />
                    <button>Add Option</button>
                </form>
            </div>
        )
    }
}

const User = (props) => {
    return (
        <div>
            <p>Name: {props.name}</p>
            <p>Age:</p>
        </div>
    )
};

ReactDOM.render(<IndecisionApp />, document.getElementById('app'));