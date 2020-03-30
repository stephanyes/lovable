import React from "react";
import SingleTable from "../components/SingleTable";
import SidebarContainer from "../containers/SidebarContainer";
import FooterContainer from "./FooterContainer";

class SingleTableContainer extends React.Component {
  constructor(props) {
    super();
  }

  render() {
    return (
      <div>
        <SidebarContainer />
        <SingleTable />
      </div>
    );
  }
}

export default SingleTableContainer;
