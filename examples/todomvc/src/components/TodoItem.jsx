import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import TodoTextInput from './TodoTextInput'
import MainSection from './MainSection'
import {TxMixin} from 'transdux'

let actions = {
  save(msg, state,props) {
    if(msg.id!=props.todo.id) return
    return {
      editing: false
    }
  }
}


let TodoItem = React.createClass({
  mixins: [TxMixin],
  getInitialState(){
    return {
      editing: false,
    }
  },

  componentDidMount(){
    this.bindActions(actions)
  },

  render() {
    const { todo } = this.props

    let element
    if (this.state.editing) {
      element = (
        <TodoTextInput text={todo.text}
                       itemid={todo.id}
                       editing={this.state.editing}
                       />
      )
    } else {
      element = (
        <div className="view">
          <input className="toggle"
                 type="checkbox"
                 checked={todo.completed}
                 onChange={() => this.dispatch(MainSection, 'complete',{id:todo.id})} />
          <label onDoubleClick={()=> this.setState({editing:true})}>
            {todo.text}
          </label>
          <button className="destroy"
                  onClick={() => this.dispatch(MainSection, 'delete', {id:todo.id})} />
        </div>
      )
    }

    return (
      <li className={classnames({
        completed: todo.completed,
        editing: this.state.editing
      })}>
        {element}
      </li>
    )
  },
});

export default TodoItem
