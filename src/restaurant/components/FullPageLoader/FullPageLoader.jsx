import React, { Component } from 'react'
import GIF from '../../../assets/imgs/loader.gif'
import styles from '../../../assets/css/Styles.module.css'
import { connect } from "react-redux"

class FullPageLoader extends Component {
    state = {}
    render() {
        const { loading } = this.props
        if (!loading) return null;
        return (
            <div className={styles.loaderContainer}>
                <div className={styles.loader}>
                    <img src={GIF} alt="loading Gif" />
                </div>
            </div>
        )
    }
}
const mapStateToProps = state => ({ loading: state.user.loader })
export default connect(mapStateToProps)(FullPageLoader);