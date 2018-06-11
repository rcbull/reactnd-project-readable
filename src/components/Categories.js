import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { withStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import Divider from "@material-ui/core/Divider";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});

class Categories extends Component {
  render() {
    const { categories } = this.props;

    return (
      <div>
        <br />
        <h3>All Categories</h3>
        <Divider />
        <List component="nav">
          {Object.keys(categories).map(key => (
            <ListItem
              button
              component="a"
              key={key}
              href={"/" + categories[key].path}
            >
              <ListItemText primary={categories[key].name} />
            </ListItem>
          ))}
        </List>
        <Divider />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    categories: state.categories
  };
};

// export default Categories;
export default withRouter(
  connect(mapStateToProps)(withStyles(styles)(Categories))
);
