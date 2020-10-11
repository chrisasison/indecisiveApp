'use strict';

//JSX - Javascript XML
var appIndecisive = {
    title: 'Indecisive',
    subtitle: 'Making hard decisions a little less difficult...',
    options: []
};

var onFormSubmit = function onFormSubmit(e) {
    e.preventDefault();
    var option = e.target.elements.option.value;

    if (option) {
        //Add option to the options array in appIndecisive
        appIndecisive.options.push(option);
        //Reset value to an empty string once the option is added to the options array.
        e.target.elements.option.value = '';
        render();
    }
};

var removeAllOptions = function removeAllOptions() {
    appIndecisive.options = [];
    render();
    console.log(appIndecisive.options);
};

var onMakeDecision = function onMakeDecision() {
    var randomNum = Math.floor(Math.random() * appIndecisive.options.length);
    var option = appIndecisive.options[randomNum];
    alert(option);
};

var render = function render() {
    var template = React.createElement(
        'div',
        null,
        React.createElement(
            'h1',
            null,
            appIndecisive.title
        ),
        React.createElement(
            'p',
            null,
            appIndecisive.subtitle
        ),
        React.createElement(
            'p',
            null,
            appIndecisive.options.length > 0 ? 'Here are your options' : 'There are no options available'
        ),
        React.createElement(
            'button',
            { disabled: appIndecisive.options.length === 0, onClick: onMakeDecision },
            'Decide'
        ),
        React.createElement(
            'button',
            { onClick: removeAllOptions },
            'Clear List'
        ),
        React.createElement(
            'ol',
            null,
            appIndecisive.options.map(function (option) {
                return React.createElement(
                    'li',
                    { key: option },
                    option
                );
            })
        ),
        React.createElement(
            'form',
            { onSubmit: onFormSubmit },
            React.createElement('input', { type: 'text', name: 'option' }),
            React.createElement(
                'button',
                null,
                'Add Option'
            )
        )
    );
    ReactDOM.render(template, appRoot);
};

var user = {
    name: 'Chris Alexander',
    age: 26,
    location: 'Pullman, WA'
};

var appRoot = document.getElementById('app');

render();
