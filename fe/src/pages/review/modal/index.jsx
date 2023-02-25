import "./index.scss";
import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal, TextField } from "@material-ui/core";
// import { Button, Modal, TextField } from '@mui/material';
import logo1 from "../../../components/navbar/images/acount.jpeg";
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 600,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
  },
}));

const PostModal = ({ open, onClose }) => {
  const classes = useStyles();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleTitleChange = (e) => setTitle(e.target.value);
  const handleContentChange = (e) => setContent(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <div className={classes.paper}>
        <div className="modale-header-search">
          <h2>Chọn địa điểm đánh giá</h2>
          {/* <i class="bx  bx-x"></i> */}
        </div>
        <form onSubmit={handleSubmit}>
          <div className="modale-body-search">
            <input type="text" placeholder="Tìm kiếm địa điểm" />
            <i className="bx bx-search-alt-2"></i>
          </div>
          <div className="modale-conten-search">
            <div className="images">
              <img className="image" src={logo1} alt="" />
            </div>
            <div className="info">
              <div className="name">
                <span>Chùa nam sơn</span>
              </div>
              <div className="address">
                <span>đà nẵng quảng nam</span>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PostModal;
