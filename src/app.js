class IndecisionApp extends React.Component {
    constructor(props) {
        super(props);
        this.handleClearList = this.handleClearList.bind(this);
        this.handleDecide = this.handleDecide.bind(this);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.handleClearOption = this.handleClearOption.bind(this);
        this.state = {options: []}
    }

    componentDidMount() {
        try {
            const json = localStorage.getItem('options');
            const options = JSON.parse(json);

            if (options) {
                this.setState(() => ({options}))
            }
        } catch(e) {
            //Default
        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.options.length !== this.state.options.length) {
            const json = JSON.stringify(this.state.options);
            localStorage.setItem('options', json);
        }
    }

    handleClearList() {
        this.setState(() => ({ options: [] }))
    }

    handleClearOption(optionToRemove) {
        this.setState((prevState) => {
            return {
                options: prevState.options.filter(option => optionToRemove !== option
                )
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

        this.setState((prevState) => ({options: prevState.options.concat(option)}))
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
                    handleClearOption={this.handleClearOption}
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
                <button
                    onClick={this.props.handleClearList}>Clear List</button>
                {this.props.options.length === 0 && <p>Let me help you decide.</p>}
                {
                    this.props.options.map((option) => (
                        <Option
                            key={option}
                            optionText={option}
                            handleClearOption={this.props.handleClearOption}
                        />
                    ))
                }
            </div>
        )
    }
}

const Option = (props) => {
    return(
        <div>
            {props.optionText}
            <button
                onClick={(e) => {
                    props.handleClearOption(props.optionText);
                }}
            >
                Remove
            </button>
        </div>
    )
}


class AddOptions extends React.Component {
    constructor(props) {
        super(props);
        this.handleAddOption = this.handleAddOption.bind(this);
        this.state = {error: undefined}
    }
    handleAddOption(e) {
        e.preventDefault();

        const option = e.target.elements.option.value.trim();
        const error = this.props.handleAddOption(option);

        this.setState(() => ({ error }));
        
        if (!error) {
            e.target.elements.options.value = '';
        }
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