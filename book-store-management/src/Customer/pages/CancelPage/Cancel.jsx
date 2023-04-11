import { Link } from "react-router-dom";
import "./Cancel.css"

function Cancel() {
    return (
        <div className="cancel-container">
            <h1 className="cancel-notification">Đã hủy lượt thanh toán</h1>
            <Link to="/">
                <button className="cancel-container__back">Trở về trang chủ</button>
            </Link>
        </div>
    );
}
export default Cancel;
