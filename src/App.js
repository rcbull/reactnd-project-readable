import React, { Component } from "react";
import { connect } from "react-redux";
import { Link, withRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Category from "./components/Category";
import Post from "./components/Post.js";
import * as CategoryActions from "./actions/categories";
import * as PostActions from "./actions/posts";
import Page404 from "./components/Page404";

import "./App.css";

class App extends Component {
  componentDidMount() {
    this.props.getCategories();
    this.props.getPosts();
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">My Readable</h1>
          <Link to="/">Home</Link>
        </header>

        <main>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/:category" component={Category} />
            <Route exact path="/:category/:id" component={Post} />
            <Route component={Page404} />
          </Switch>
        </main>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    getCategories: categories => dispatch(CategoryActions.getData()),
    getPosts: posts => dispatch(PostActions.getPosts())
  };
}

// export default App
export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
