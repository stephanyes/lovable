import firebase from "../../services/firebase";
import { showLoader, hideLoader } from "./loginAction";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
const DB = firebase.db;
const MySwal = withReactContent(Swal);

export const getMenu = (restoID) => (dispatch) => {
  let array = [];
  dispatch(showLoader())
  let doc = DB.collection("restaurants").doc(restoID).collection("menu");
  doc.get().then((menuIndividual) => {
    menuIndividual.forEach((menuesFB) => {
      array.push({ name: menuesFB.data().nameOfMenu, id: menuesFB.id });
    });
    dispatch({
      type: "GET_MENU",
      menues: array,
    });
  });
  dispatch(hideLoader())
};

export const deleteMenu = (restoID, id, history) => (dispatch) => {
  let doc = DB.collection("restaurants")
    .doc(restoID)
    .collection("menu")
    .doc(id);
  MySwal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Confirm",
  }).then((result) => {
    if (result.value) {
      MySwal.fire("Deleted!", `Your Menu has been deleted.`, "success");
      doc.delete();
      history.push(`/dashboard`);
    }
  });
};
