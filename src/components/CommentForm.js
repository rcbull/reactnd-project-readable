import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as CommentActions from "../actions/comments";
import uuidv1 from "uuid/v1";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "react-modal";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Divider from "@material-ui/core/Divider";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "450px",
    height: "350px"
  }
};

const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
    color: "#FF0000"
  },
  input: {
    display: "none"
  },
  container: {
    display: "flex",
    flexWrap: "wrap"
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 350
  },
  menu: {
    width: 350
  }
});

class CommentForm extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      author: "",
      body: "",
      multiline: "Controlled"
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    let c = {
      timestamp: Date.now(),
      body: this.state.body,
      author: this.state.author,
      parentId: this.props.parentId
    };

    if (this.props.edit === true) {
      c.id = this.state.id;
      this.props.editComment(c);
    } else {
      c.id = uuidv1();
      this.props.addComment(c);
    }
    this.setState({
      author: "",
      body: ""
    });
  }

  componentWillMount() {
    Modal.setAppElement("body");
  }

  componentDidMount() {
    const comment = this.props.comment;
    if (comment) {
      this.setState({
        id: comment.id,
        author: comment.author,
        body: comment.body
      });
    }
  }

  openModal() {
    this.setState({ modalIsOpen: true });
  }

  afterOpenModal() {
    this.subtitle.style.color = "#f00";
  }

  closeModal() {
    this.setState({ modalIsOpen: false });
  }

  render() {
    const { classes } = this.props;
    const { edit } = this.props;

    let label = "New Comment";
    if (edit === true) {
      label = "Edit Comment";
    }

    return (
      <div>
        <Button onClick={this.openModal} variant="raised" color="primary">
          {label}
        </Button>
        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel=""
        >
          <h2 ref={subtitle => (this.subtitle = subtitle)}>
            New Comment - <Button onClick={this.closeModal}>Close</Button>
          </h2>

          <form onSubmit={this.handleSubmit}>
            <InputLabel>Body</InputLabel>
            <TextField
              id="multiline-flexible"
              multiline
              name="body"
              rowsMax="4"
              rows="4"
              value={this.state.body}
              onChange={this.handleInputChange}
              className={classes.textField}
              margin="normal"
            />
            <br />
            {edit ? null : (
              <div>
                <InputLabel>Author</InputLabel>
                <TextField
                  id="author"
                  name="author"
                  rowsMax="4"
                  rows="4"
                  value={this.state.author}
                  onChange={this.handleInputChange}
                  className={classes.textField}
                  margin="normal"
                />
              </div>
            )}
            <div
              style={{ position: "absolute", bottom: "20px", margin: "auto" }}
            >
              <Button type="submit" variant="raised" color="primary">
                Save
              </Button>
            </div>
          </form>
        </Modal>
        <Divider />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    comments: state.comments,
    categories: state.categories,
    parentId: ownProps.parentId
  };
};
const mapDispatchToProps = dispatch => {
  return {
    addComment: comment => dispatch(CommentActions.addComment(comment)),
    editComment: comment => dispatch(CommentActions.editComment(comment))
  };
};

CommentForm.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default CommentForm;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(CommentForm))
);
