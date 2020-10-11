//JSX - Javascript XML
const appIndecisive = {
    title: 'Indecisive',
    subtitle: 'Making hard decisions a little less difficult...',
    options: []
}

const onFormSubmit = e => {
    e.preventDefault();
    const option = e.target.elements.option.value;

    if (option) {
        //Add option to the options array in appIndecisive
        appIndecisive.options.push(option);
        //Reset value to an empty string once the option is added to the options array.
        e.target.elements.option.value = '';
        render();
    }
};

const removeAllOptions = () => {
    appIndecisive.options = [];
    render();
    console.log(appIndecisive.options);
}

const onMakeDecision = () => {
    const randomNum = Math.floor(Math.random() * appIndecisive.options.length);
    const option = appIndecisive.options[randomNum];
    alert(option);
}

const render = () => {
    const template = (
        <div>
            <h1>{appIndecisive.title}</h1>
            <p>{appIndecisive.subtitle}</p>
            <p>{appIndecisive.options.length > 0 ? 'Here are your options' : 'There are no options available'}</p>
            <button disabled={appIndecisive.options.length === 0} onClick={onMakeDecision}>Decide</button>
            <button onClick={removeAllOptions}>Clear List</button>
            <ol>
            {
                appIndecisive.options.map((option) => <li key={option}>{option}</li>)
            }
            </ol>
            <form onSubmit={onFormSubmit}>
                <input type="text" name="option"/>
                <button>Add Option</button>
            </form>
        </div>
    );
    ReactDOM.render(template, appRoot);
};

const user = {
    name: 'Chris Alexander',
    age: 26,
    location: 'Pullman, WA'
};

const appRoot = document.getElementById('app');

render();




