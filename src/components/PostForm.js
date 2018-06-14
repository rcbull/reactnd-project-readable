import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import * as PostActions from "../actions/posts";
import * as Api from "../Api";
import uuidv1 from "uuid/v1";
import InputLabel from "@material-ui/core/InputLabel";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Modal from "react-modal";
import Select from "react-select";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "450px",
    height: "450px"
  }
};

const styles = theme => ({
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

class PostForm extends Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false,
      title: "",
      author: "",
      body: "",
      category: "",
      voteScore: 0,
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

    let p = {
      timestamp: Date.now(),
      title: this.state.title,
      body: this.state.body,
      author: this.state.author,
      category: this.state.category,
      voteScore: this.state.voteScore
    };

    if (p.category) {
      // with id
      if (this.props.edit === true) {
        p.id = this.state.id;
        this.props.editPost(p);
      } else {
        // without id
        p.id = uuidv1();
        this.props.addPost(p);
      }
      this.setState({
        modalIsOpen: false
      });
    }
  }

  componentWillMount() {
    Modal.setAppElement("body");
  }

  componentDidMount() {
    const post = this.props.post;
    if (post) {
      this.setState({
        id: post.id,
        title: post.title,
        author: post.author,
        body: post.body,
        category: post.category
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

  handleClick = event => {
    this.props.onSelect(this.props.option, event);
  };

  handleChange = selectedOption => {
    this.setState({ selectedOption });
    // selectedOption can be null when the `x` (close) button is clicked
    if (selectedOption) {
      this.setState({ category: selectedOption.label });
    }
  };

  render() {
    const { categoriesOption, classes, edit } = this.props;
    const { selectedOption } = this.state;

    let label = "New Post";
    if (edit === true) {
      label = "Edit Post";
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
            {label} - <Button onClick={this.closeModal}>Close</Button>
          </h2>

          <form onSubmit={this.handleSubmit}>
            {edit ? null : (
              <div>
                <InputLabel>Category</InputLabel>
                <Select
                  name="form-field-name"
                  value={selectedOption}
                  onChange={this.handleChange}
                  options={categoriesOption}
                />
              </div>
            )}
            <br />
            <InputLabel>Title</InputLabel>
            <TextField
              id="title"
              name="title"
              rowsMax="4"
              rows="4"
              value={this.state.title}
              onChange={this.handleInputChange}
              className={classes.textField}
              margin="normal"
            />
            <br />
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
      </div>
    );
  }
}

const mapStateToProps = state => {
  const categoriesOption = Api.toArray(state.categories).reduce(
    (acc, category) => {
      return [...acc, { value: category.name, label: category.name }];
    },
    []
  );
  return {
    posts: state.posts,
    categories: state.categories,
    categoriesOption
  };
};
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    addPost: post => {
      dispatch(PostActions.addPost(post));
    },
    editPost: post => {
      dispatch(PostActions.editPost(post));
    }
  };
};

PostForm.propTypes = {
  classes: PropTypes.object.isRequired
};

// export default PostForm;
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(withStyles(styles)(PostForm))
);
