import "./index.scss";
import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import { Button, Modal, TextField } from '@material-ui/core';
// import { Button, Modal, TextField } from '@mui/material';


const useStyles =makeStyles ((theme) => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
  }));
  
  const PostModal = ({ open, onClose }) => {
    const classes = useStyles();
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
  
    const handleTitleChange = (e) => setTitle(e.target.value);
    const handleContentChange = (e) => setContent(e.target.value);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission here
      onClose();
    };
  
    return (
      <Modal
        open={open}
        onClose={onClose}
      >
        <div className={classes.paper}>
          <h2>Create a new post</h2>
          <form onSubmit={handleSubmit}>
            <TextField
              label="Title"
              value={title}
              onChange={handleTitleChange}
              fullWidth
              margin="normal"
            />
            <TextField
              label="Content"
              value={content}
              onChange={handleContentChange}
              fullWidth
              margin="normal"
              multiline
              rows={4}
            />
            <Button type="submit" color="primary" variant="contained">
              Submit
            </Button>
          </form>
        </div>
      </Modal>
    );
  };
  
  export default PostModal;