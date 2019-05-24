import React, { Component } from 'react'
import CommentInput from './CommentInput'
import CommentList from './CommentList'
import wrapWithLoadData from './wrapWithLoadData'
import PropTypes from 'prop-types'

class CommentApp extends Component {

    static propTypes = {
        data: PropTypes.any,
        saveData: PropTypes.func.isRequired
    }

    constructor(props) { //这个props在constructor中使用到就要传入，不使用时可以不传
        super(props)
        this.state = {
            comments: props.data
        }
    }

    // componentWillMount() {
    //     this._loadComments()
    // }

    // _saveComments(comments) {
    //     localStorage.setItem('comments', JSON.stringify(comments));
    // }

    // _loadComments() {
    //     let comments = localStorage.getItem('comments')
    //     if (comments) {
    //         comments = JSON.parse(comments)
    //         this.setState({comments})
    //     }
    // }

    handleSubmitComment(comment) {
        if (!comment) return
        if (!comment.username) return alert('请输入用户名')
        if (!comment.content) return alert('请输入评论内容')
        const comments = this.state.comments;
        comments.push(comment)
        this.setState({
            comments
        })
        // this._saveComments(comments)
        this.props.saveData(comments)
    }

    handleDeleteComment(index) {
        const comments = this.state.comments
        comments.splice(index, 1)
        this.setState({comments})
        // this._saveComments(comments)
        this.props.saveData(comments)
    }

    render() {
        return (
            <div className="wrapper">
                <CommentInput onSubmit={this.handleSubmitComment.bind(this)} />
                <CommentList comments={this.state.comments} onDeleteComment={this.handleDeleteComment.bind(this)} />
            </div>
        );
    }
}

CommentApp = wrapWithLoadData(CommentApp, 'comments')

export default CommentApp