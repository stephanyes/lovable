import React from "react";
import Sidebar from "../general/Sidebar";
import Menues from "../../../restaurant/components/views/Menues";
import FullPageLoader from "../../components/FullPageLoader/FullPageLoader";
import { connect } from "react-redux";
import { getMenu, deleteMenu } from "../../../store/actions/menuActions";

class MenuContainer extends React.Component {
  constructor(props) {
    super(props);

    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    if (this.props.isAuth == false) {
      this.props.history.push("/");
    } else {
      this.props.buscandoMenu(this.props.restaurantID);
    }
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
        <div>
          <FullPageLoader />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    restaurantID: state.user.loginUser.restaurantID,
    menuArray: state.menuArray.menuArray,
    isAuth: state.user.isAuth,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    buscandoMenu: (restoID) => dispatch(getMenu(restoID)),
    eliminar: (restoID, id, history) =>
      dispatch(deleteMenu(restoID, id, history))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MenuContainer);
