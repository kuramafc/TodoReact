import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Grid from '../template/grid'
import IconButton from '../template/iconButton'
import { add, changeDescription, search, clear } from './todoActions'

class TodoForm extends Component {
    constructor(props) {
        super(props)
        this.keyHandler = this.keyHandler.bind(this);
    }

    keyHandler(e) {
        const { add, search, description } = this.props
        if(e.key === 'Enter') {
            e.shiftKey ? handleSearch() : add(description);
        } else if(e.key === 'Escape') {
            this.props.clear();
        }
    }

    componentWillMount() {
        this.props.search()
    }

    render() {
        const { add, search, description } = this.props
        return (
            <div role='form' className='todoForm'>
            <Grid cols='12 9 10'>
                <input id='desciption' className='form-control' 
                    value={this.props.description} 
                    onChange={this.props.changeDescription}
                    onKeyUp={this.keyHandler} 
                    placeholder='Adicione uma tarefa'></input>
            </Grid>

            <Grid cols='12 3 2'>
                <IconButton style='primary' icon='plus' onClick={() => add(description)}/>
                <IconButton style='info' icon='search' onClick={() =>this.props.search()}/>
                <IconButton style='dafault' icon='close' onClick={() => this.props.clear()}/>
            </Grid>
        </div>
        )
    }
}

const mapStateToProps = state => ({description: state.todo.description})
const mapDispatchToProps = dispatch => 
      bindActionCreators({ add, changeDescription, search, clear }, dispatch)
export default connect(mapStateToProps, mapDispatchToProps)(TodoForm)