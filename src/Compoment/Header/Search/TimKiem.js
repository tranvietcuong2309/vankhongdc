import React from 'react';
import { useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import $ from "jquery";
const TimKiem = () => {
    let { search } = useRouteMatch().params;
    document.querySelector('title').innerHTML=`Tìm Kiếm: ${search}`;
    const GetListMovies = useSelector(state => state.GetListMove);
    var MangSearch = GetListMovies.filter(movie => {
        if (movie.TheLoai.toLowerCase().indexOf(search.toLowerCase()) !== -1 || movie.QuocGia.toLowerCase().indexOf(search.toLowerCase()) !== -1 || movie.NSX.toLowerCase().indexOf(search.toLowerCase()) !== -1 || movie.NgonNgu.toLowerCase().indexOf(search.toLowerCase()) !== -1 || movie.TenPhim.toLowerCase().indexOf(search.toLowerCase()) !== -1 || movie.DaoDien.toLowerCase().indexOf(search.toLowerCase()) !== -1 || movie.DienVien.toLowerCase().indexOf(search.toLowerCase()) !== -1) 
            return movie;
    });
    if (MangSearch.length === 0) {
        return (
        <div className="NotFount" style={{'textAlign':'center','minHeight':'50vh'}}>
            <span style={{'fontSize':'16px','color':'#00adff','padding':'10px','position':'relative','top':'15px'}}>Không tìm thấy kết quả này phù hợp với từ khóa của bạn.</span>
        </div>)
    }
    else {
        return (
            <>
                <div className="title-link-menu">
                    <h1 style={{ 'textTransform': 'capitalize' }}>Tìm Kiếm: {search}</h1>
                </div>
                <div className="ground-movie">

                    {
                        MangSearch.map(movie => (

                            <div className="list-movie" key={movie.id} data-aos='fade-up'>
                                <div className="movies">
                                    <div className="item-movie">
                                        <div className="front-face">
                                            <div className="contents front">
                                                <img src={movie.Poster} alt={movie.TenPhim} />
                                                <p>{movie.NgonNgu} </p>
                                                <h3>{movie.TenPhim}</h3>
                                            </div>
                                        </div>
                                        <div className="back-face">
                                            <div className="contents back">
                                                <h3>{movie.TenPhim}</h3>
                                                <p>Đạo Diễn: <span>{movie.DaoDien}</span></p>
                                                <p>Diễn Viên: <span>{movie.DienVien}</span></p>
                                                <p>Quốc gia: <span>{movie.QuocGia}</span></p>
                                                <p>Điểm IMDB: <span>{movie.MDB}</span></p>
                                                <p>Ngày phát hành: <span>{movie.NSX}</span></p>
                                                <p>Thể loại: <span>{movie.TheLoai}</span></p>
                                                <p>Thời lượng: <span>{movie.ThoiGian} phút</span></p>
                                                <Link
                                                onClick={()=>{$("html ,body").animate({ scrollTop: 0 }, 800)}}
                                                    to={`/ChiTiet/${movie.id}/${movie.TenPhim}/${movie.TheLoaiMenu}/${movie.QuocGiaMEnu}`}
                                                >
                                                    xem phim</Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </>
        )
    }
}
export default TimKiem;