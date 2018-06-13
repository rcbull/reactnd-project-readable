import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class Page404 extends Component {
  render() {
    return (
      <div>404</div>
    );
  }
}

// export default Page404;
export default withRouter(Page404);
