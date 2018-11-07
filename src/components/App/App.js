
import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';


class App extends Component {
  state = {
    newElement: '',
  }

  handleChange = (event) => {
    this.setState({
      newElement: event.target.value,
    });
  }

  getElements = () => {
    this.props.dispatch({type: 'FETCH_ELEMENTS'})
  //   axios.get('/api/element').then(response => {
  //     this.props.dispatch({ type: 'SET_ELEMENTS', payload: response.data });
  // })
  // .catch(error => {
  //     console.log('error with element get request', error);
  // });
  }

  componentDidMount() {
    this.getElements();
  }

  handleClick = () => {
    this.props.dispatch({type: 'POST_ELEMENTS', payload: this.state})
    // axios.post('/api/element', this.state)
    //   .then(() => {
    //     this.getElements();
    //     this.setState({
    //       newElement: '',
    //     });
    //   })
    //   .catch(error => {
    //     console.log('error with element get request', error);
    //   });
  }

  render() {
    return (
      <div>
        
        <input value={this.state.newElement} onChange={this.handleChange} />
        <button onClick={this.handleClick}>Add Element</button>
        <pre>{JSON.stringify(this.props.reduxState)}</pre>
      </div>
    );
  }
}

const mapReduxStateToProps = reduxState => ({
    reduxState
});

export default connect(mapReduxStateToProps)(App);
