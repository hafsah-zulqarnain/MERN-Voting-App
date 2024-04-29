import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { createPoll } from '../store/actions';
import ErrorMessage from './ErrorMessage';

class CreatePoll extends Component {
    constructor(props) {
        super(props);
        this.state = {
            halka: '',
            options: ['', ''],
        };
        this.handleChange = this.handleChange.bind(this);
        this.addAnswer = this.addAnswer.bind(this);
        this.handleAnswer = this.handleAnswer.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }

    addAnswer() {
        this.setState({ options: [...this.state.options, ''] });
    }

    handleAnswer(e, index) {
        const options = [...this.state.options];
        options[index] = e.target.value;
        this.setState({ options });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.createPoll(this.state);
    }

    render() {
        const options = this.state.options.map((option, i) => (
            <Fragment key={i}>
                <label>Option</label>
                <input
                    type='text'
                    value={option}
                    onChange={(e) => this.handleAnswer(e, i)}
                />
            </Fragment>
        ));

        return (
            <div className='createPoll-container'>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor='halka' className='header'>Halka</label>
                    <input
                        type='text'
                        name='halka'
                        value={this.state.halka}
                        onChange={this.handleChange}
                        className='login-input'
                    />
                    <p className='header'>{options}</p>
                    <div style={{ margin: '1rem 0' }}></div>
                    <button
                        type='button'
                        onClick={this.addAnswer}
                        className='login-button'
                    >
                        Add Candidates
                    </button>
                    <div style={{ margin: '0.5rem 0' }}></div>
                    <button type='submit' className='login-button'>
                        Submit
                    </button>
                </form>
            </div>
        );
    }
}

export default connect(() => ({}), { createPoll })(CreatePoll);
