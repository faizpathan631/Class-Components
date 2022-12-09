import React from 'react'
import Data from './Data'
import Fai from './Images/Faiz-Pic.jpeg'
import ReactModal from 'react-modal'

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      data: Data,
      addPeople: false,
      newD: { id: '', name: '', age: '' },
    }
  }
  handleChange = (e) => {
    this.setState((prevState) => ({
      ...prevState,
      newD: {
        ...prevState.newD,
        [e.target.name]: e.target.value,
      },
    }))
  }
  openModal = () => {
    this.setState({ addPeople: true })
  }
  closeModal = () => {
    this.setState({ addPeople: false })
  }
  sub = () => {
    this.setState({ data: this.state.data.concat(this.state.newD) })
    this.closeModal()
  }
  nullCheck = (val) => {
    return val === null || val === undefined || val === ''
  }

  render() {
    return (
      <>
        <button onClick={this.openModal}>Add New person</button> &nbsp;&nbsp;
        <button onClick={() => this.setState({ data: [] })}>Clear All</button>
        <br />
        {this.state.data.map((a) => {
          const { id, name, age, image } = a
          return (
            <article key={id} className='person'>
              <br />
              <img src={image ? image : Fai} alt={name} />
              <div>
                <h4>{name}</h4>
                <p>{age} years</p>
              </div>
            </article>
          )
        })}
        <ReactModal
          isOpen={this.state.addPeople}
          onRequestClose={this.closeModal}
          contentLabel='Add a new person Modal'
        >
          <button onClick={this.closeModal}>Close Modal</button>
          <br />
          <br />
          <label>Id:</label>
          <input
            name='id'
            id='id'
            type='number'
            value={this.state.newD.id}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <label>Name:</label>
          <input
            name='name'
            id='name'
            type='text'
            value={this.state.newD.name}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <label>Age:</label>
          <input
            name='age'
            id='age'
            type='text'
            value={this.state.newD.age}
            onChange={this.handleChange}
          />
          <br />
          <br />
          <input
            type='submit'
            disabled={
              this.nullCheck(this.state.newD.id) ||
              this.nullCheck(this.state.newD.name) ||
              this.nullCheck(this.state.newD.age)
            }
            onClick={this.sub}
            value="Add new B'day"
          />
        </ReactModal>
      </>
    )
  }
}
