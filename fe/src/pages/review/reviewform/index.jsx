import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { EnvironmentOutlined } from "@ant-design/icons";
import "./index.scss"
import Review from "../index";
import Navbar from "../../../components/navbar";
import PostModal from "../modal";
const ReviewForm = () => {

    const [placeSelected, seuseAppDispatcht] = useState(false);

    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }

    return (
        <div>
            

            <Navbar />

            <button onClick={handleOpen}>nnn</button>
            <PostModal open={open} onClose={handleClose} />
            <div className="ViewForm_Container">
                <div className="header">
                    <h1>Viết Review</h1>
                </div>
                <div className="content">
                    <Review />
                    <div className="review-place">
                        <div className="review-input">
                            <h3>Địa điểm</h3>
                            {placeSelected ? (
                                <h1></h1>
                            ) : (
                                <div
                                    className="review-select-place"
                                    onClick={handleOpen}
                                // onClick={() => setOpen(true)}
                                >
                                    <span>
                                        <EnvironmentOutlined /> Nhấn vào đây để chọn địa điểm
                                    </span>
                                    <PostModal open={open} onClose={handleClose} />

                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            {open && (
                <div
                    title="Chọn địa điểm đánh giá"
                    onClose={() => setOpen(false)}
                />

            )}
        </div>
    );
};

export default ReviewForm;
