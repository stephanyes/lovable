import React from "react";
import Sidebar from "../general/Sidebar";
import Menues from "../../../restaurant/components/views/Menues";
import { connect } from "react-redux";
import { getMenu, deleteMenu } from "../../../store/actions/menuActions";

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    this.props.buscandoMenu(this.props.restaurantID);
  }
  handleDelete(e, id) {
    e.preventDefault();
    this.props.eliminar(this.props.restaurantID, id, this.props.history);
  }

  render() {
    return (
      <div>
        <Sidebar />
        <Menues
          menuObject={this.props.menuArray}
          deleteFunc={this.handleDelete}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    restaurantID: state.user.loginUser.restaurantID,
    menuArray: state.menuArray.menuArray,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    buscandoMenu: (restoID) => dispatch(getMenu(restoID)),
    eliminar: (restoID, id, history) =>
      dispatch(deleteMenu(restoID, id, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
