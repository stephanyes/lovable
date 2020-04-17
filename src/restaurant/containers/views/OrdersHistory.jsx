import React from "react";
import firebase from "../../../services/firebase";
import Sidebar from "../general/Sidebar";
import OrdersHistoryComp from "../../../restaurant/components/views/OrdersHistory";
import FullPageLoader from "../../components/FullPageLoader/FullPageLoader";
import Pagination from "react-js-pagination"
import { showLoader, hideLoader } from "../../../store/actions/loginAction";
import { connect } from "react-redux";
require('bootstrap-less')

const DB = firebase.db;
let doc;
let dateNow = `${new Date()}`.slice(0, 15);
let local = JSON.parse(window.localStorage.getItem('persist:lovableLogin'))
let userLS
if (local) {
    userLS = JSON.parse(local.user)
}

class OrdersHistory extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orderHistory: [],
            actualPage: 1,
            total: 0,
            startingPoint: 0,
            finishingPoint: 0,
            pageTotal: 1,
            itemsPerPage: []
        };
        this.handlePageChange = this.handlePageChange.bind(this)
    }

    componentDidMount() {
        if (userLS.isAuth === false) {
            this.props.history.push("/");
        } else {
            this.props.dispatch(showLoader())
            //Query
            doc = DB.collection("restaurants")
                .doc(userLS.loginUser.restaurantID)
                .collection("orders");
            //Snapshot
            doc.onSnapshot((pastOrders) => {
                let completedOld = [];
                pastOrders.forEach(completed => {
                    if (completed.data().status === "completed" && completed.data().date !== dateNow) {
                        completedOld.push({
                            id: completed.id,
                            idUser: completed.data().idUser,
                            numberOfOrder: completed.data().numberOfOrder,
                            numberOfTable: completed.data().numberOfTable,
                            status: completed.data().status,
                            totalPrice: completed.data().totalPrice,
                            notify: completed.data().notify,
                            date: completed.data().date
                        });
                    }
                })
                const orderArray = completedOld
                let totalItems = completedOld.length //5
                let paginas = Math.ceil(totalItems / 5) // 
                let final = (this.state.actualPage * 5) - 1  //4
                let start = (final - 5) + 1 // 10
                let itemsXPagina = orderArray.slice(start, final + 1)

                this.setState({
                    orderHistory: completedOld,
                    total: totalItems,
                    pageTotal: paginas,
                    startingPoint: start,
                    finishingPoint: final,
                    itemsPerPage: itemsXPagina,
                })
                setTimeout(() => {
                    this.props.dispatch(hideLoader())
                }, 500)
            })

        }
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevState.actualPage !== this.state.actualPage) {
            const orderHistory = this.state.orderHistory
            const actualPage = this.state.actualPage
            let finalPoint = (actualPage * 5) - 1  //9
            let start = (finalPoint - 5) + 1 // 5
            let newArr = orderHistory.slice(start, finalPoint + 1)

            this.setState({
                startingPoint: start,
                finishingPoint: finalPoint,
                itemsPerPage: newArr,
            })
        }
    }

    handlePageChange(pageNumber) {
        this.setState({
            actualPage: pageNumber
        });
    }

    render() {
        const { orderHistory, actualPage, itemsPerPage, total } = this.state
        console.log(this.state.actualPage)
        return (
            <div>
                <Sidebar />
                <OrdersHistoryComp completedOld={itemsPerPage} />
                <div style={{ display: "flex", justifyContent: "center" }}>
                    <Pagination
                        onChange={this.handlePageChange}
                        totalItemsCount={total}
                        activePage={actualPage}
                        itemsCountPerPage={5}
                        itemClass="page-item"
                        linkClass="page-link"
                    />
                </div>
                <div>
                    <FullPageLoader />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userLogin: state.user.loginUser.restaurantID,
        isAuth: state.user.isAuth,
    };
};

export default connect(mapStateToProps)(OrdersHistory);
