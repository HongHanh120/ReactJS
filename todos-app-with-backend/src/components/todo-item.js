import React, {Component} from 'react';

class TodoItem extends Component {
    constructor(props) {
        super(props);

        this.state = {
            is_editing: false,
            hover: false,
            hover_edit: false,
            hover_delete: false,
            hover_save: false,
            hover_cancel: false
        }
    }

    renderTaskSection() {
        const {task, is_completed} = this.props;

        let task_style = {
            color: is_completed ? '#007BFF' : '#d9534f',
            cursor: "pointer"
        };

        if (this.state.is_editing) {
            return (
                <label className="col-md-8 text left">
                    <form onSubmit={this.onSaveClick.bind(this)}>
                        <input className="form-control input-sm" type="text" defaultValue={task} ref="input"/>
                    </form>
                </label>
            )
        }

        if (this.state.hover) {
            task_style.color = '#212529';
        }

        return (
            <label className="col-md-8 text-left text"
                   style={task_style}
                   onClick={this.props.toggleTask.bind(this, task)}
                   onMouseEnter={this.toggleHover.bind(this)}
                   onMouseLeave={this.toggleHover.bind(this)}> {task}
            </label>
        )
    }

    renderActionSection() {
        let edit_icon_style, delete_icon_style, save_icon_style, cancel_icon_style;
        if (this.state.hover_edit) {
            edit_icon_style = {
                color: '#007BFF'
            }
        }

        if (this.state.hover_delete) {
            delete_icon_style = {
                color: '#d9534f'
            }
        }

        if (this.state.hover_save) {
            save_icon_style = {
                color: '#007BFF'
            }
        }

        if (this.state.hover_cancel) {
            cancel_icon_style = {
                color: '#d9534f'
            }
        }

        if (this.state.is_editing) {
            return (
                <div className="col-md-3 text-right">
                    <span className="fa fa-save" onClick={this.onSaveClick.bind(this)}
                          style={save_icon_style} onMouseEnter={this.toggleHoverSave.bind(this)}
                          onMouseLeave={this.toggleHoverSave.bind(this)}> </span>
                    &nbsp; &nbsp; &nbsp;
                    <span className="fa fa-close" onClick={this.onCancelClick.bind(this)}
                          style={cancel_icon_style} onMouseEnter={this.toggleHoverCancel.bind(this)}
                          onMouseLeave={this.toggleHoverCancel.bind(this)}
                    > </span>
                </div>
            )
        }

        return (
            <div className="col-md-3 text-right">
                <span className="fa fa-edit" onClick={this.onEditClick.bind(this)}
                      style={edit_icon_style} onMouseEnter={this.toggleHoverEdit.bind(this)}
                      onMouseLeave={this.toggleHoverEdit.bind(this)}> </span>
                &nbsp; &nbsp; &nbsp;
                <span className="fa fa-trash" onClick={this.props.deleteTask.bind(this, this.props.task)}
                      style={delete_icon_style} onMouseEnter={this.toggleHoverDelete.bind(this)}
                      onMouseLeave={this.toggleHoverDelete.bind(this)}> </span>
            </div>
        )
    }

    renderStateSection() {
        const {is_completed} = this.props;

        if (is_completed) {
            return (
                <div className="col-md-1 text-left">
                    <span className="fa fa-check-square-o"> </span>
                </div>
            )
        }

        return (
            <div className="col-md-1 text-left">
                <span className="fa fa-square-o"> </span>
            </div>
        )
    }

    render() {
        return (
            <div className="form-group row">
                {this.renderStateSection()}
                {this.renderTaskSection()}
                {this.renderActionSection()}
            </div>
        )
    }

    toggleHover = () => {
        this.setState({hover: !this.state.hover})
    };

    toggleHoverEdit = () => {
        this.setState({hover_edit: !this.state.hover_edit})
    };

    toggleHoverDelete = () => {
        this.setState({hover_delete: !this.state.hover_delete})
    };

    toggleHoverSave = () => {
        this.setState({hover_save: !this.state.hover_save})
    };

    toggleHoverCancel = () => {
        this.setState({hover_cancel: !this.state.hover_cancel})
    };

    componentDidUpdate() {
        if (this.props.is_editing) {
            this.refs.input.focus();
        }
    }

    onEditClick() {
        this.setState({is_editing: true, hover_edit: false, hover_save: true});
        console.log(this.state.hover_save)
    }

    onCancelClick() {
        this.setState({is_editing: false, hover_cancel: false, hover_delete: true});
    }

    onSaveClick(event) {
        event.preventDefault();

        const oldTask = this.props.task;
        const newTask = this.refs.input.value;
        this.props.saveTask(oldTask, newTask);
        this.setState({is_editing: false, hover_save: false, hover_edit: true})
    }
}

export default TodoItem;