import React, { useEffect } from 'react';
import './Header.css';
import Search from './Search/Search';
import { Link } from "react-router-dom";
import * as ActionType from '../../Actions/index';
import { useDispatch, useSelector } from "react-redux";
import Swal from 'sweetalert2';
const ID = JSON.parse(localStorage.getItem('ID'));
const Header = () => {

    //dispatch
    const dispatch = useDispatch();
    const GetListUser = () => dispatch(ActionType.GetListUserAPIResult());
    const GetIdOneUser = (ID) => dispatch(ActionType.GetOneUserApiRequest(ID))
    // State
    const GetIdOneUserResult = useSelector(state => state.GetIdUser);
    // function
    useEffect(() => {
        GetListUser();
        if (ID) {
            GetIdOneUser(ID)
        }
    }, []);
    // function
    const LogOut = () => {
        localStorage.removeItem('ID');
        setTimeout("location.reload(true)", 1);
    }
    const date = new Date();
    const Hours = date.getHours();

    const ShowUser = (ID) => {
        if (ID) {
            if (Hours > 6 && Hours < 12) {
                setTimeout(() => {
                    Swal.fire('Chúc bạn có buổi sáng nhiều may mắn')
                }, 3000)
            }
            else if (Hours >= 12 && Hours <= 17) {
                setTimeout(() => {
                    Swal.fire('Chúc bạn có buổi chiều gặp nhiều niềm vui');
                }, 3000)
            }
            else if (Hours > 17 && Hours < 22) {
                setTimeout(() => {
                    Swal.fire({
                        html: `buổi tối xem vui vẻ nhé ${GetIdOneUserResult.Name}`
                    });
                }, 3000)
            }
            else if (Hours >= 22 && Hours <= 24) {
                setTimeout(() => {
                    Swal.fire({
                        html: `Khuya rồi ngủ đi ${GetIdOneUserResult.Name}`
                    });
                }, 3000)
            }
            return (
                <div className="login-user-success">
                    <div className="grounp-user-success">
                        <div className="image-user">
                            <img src={GetIdOneUserResult.Avatar} alt="" />
                        </div>
                        <div className="grounp-information-user">
                            <ul className='menu-user'>
                                <li><p>{GetIdOneUserResult.Name}</p> <span className="fas fa-caret-down" />
                                    <ul className="menu-information">
                                        <li> <Link to="/edit-user" >Thông tin</Link></li>
                                        <li> <button onClick={LogOut}>Đăng Xuất</button></li>
                                    </ul>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="Login-out">
                    <Link
                        to='/dang-nhap'
                    >
                        Đăng Nhập
                </Link>
                    <Link
                        to='/dang-ky'
                    >
                        Đăng Ký
                </Link>
                </div>
            )
        }
    }
    return (
        <>
            <header>
                <Link to='/'>PhuocKaito.tk</Link>
                <Search />
                <div className="Login-out">
                    {ShowUser(ID)}
                </div>
            </header>
        </>
    )
}
export default Header;