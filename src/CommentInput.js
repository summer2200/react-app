import React, { Component } from 'react'

class CommentInput extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            content: ''
        }
    }

    componentWillMount() {
        this._loadUsername()
    }

    componentDidMount() {
        this.textarea.focus();
    }

    handleUsernameChange(event) {
        this.setState({
            username: event.target.value
        })
    }

    handleContentChange(event) {
        this.setState({
            content: event.target.value
        })
    }

    handleSubmit() {
        if(this.props.onSubmit) {
            const { username, content } = this.state
            this.props.onSubmit({
                username,
                content,
                createdTime: +new Date()
            })
        }
        this.setState({
            content: ''
        })
    }

    handleUsernameBlur(event) {
        this._saveusername(event.target.value)
    }

    _loadUsername() {
        const username = localStorage.getItem('username')
        if (username) {
            this.setState({username})
        }
    }

    _saveusername(username) {
        localStorage.setItem('username', username)
    }

    render() {
        return (
            <div className='comment-input'>
                <div className='comment-field'>
                    <span className='comment-field-name'>用户名：</span>
                    <div className='comment-field-input'>
                        <input value={this.state.username}
                        onChange={this.handleUsernameChange.bind(this)}
                        ref={(input) => this.inputName = input}
                        onBlur={this.handleUsernameBlur.bind(this)} />
                    </div>
                </div>
                <div className='comment-field'>
                    <span className='comment-field-name'>评论内容：</span>
                    <div className='comment-field-input'>
                        <textarea value={this.state.content}
                        onChange={this.handleContentChange.bind(this)}
                        ref={(textarea) => this.textarea = textarea} />
                    </div>
                </div>
                <div className='comment-field-button'>
                    <button onClick={this.handleSubmit.bind(this)}>发布</button>
                </div>
            </div>
        )
    }
}

export default CommentInput