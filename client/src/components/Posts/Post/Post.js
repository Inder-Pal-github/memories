import React, { useState } from "react";
import useStyles from "./styles";
import moment from "moment";
import {
  Card,
  CardContent,
  Button,
  Typography,
  CardMedia,
  ButtonBase,
} from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpOutlined from "@material-ui/icons/ThumbUpOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deletePost, likePost } from "../../../redux/Appreducer/posts";
import { getFromLocalStorage } from "../../../utils/localstorage";

const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = getFromLocalStorage("profile");
  const [likes,setLikes] = useState(post?.likes);
  const userId = user?.result?.googleId|| user?.result?._id
  const hasLikedPost =  post.likes.find((like) => like === userId);

  const deleteThisPost = (id) => {
    
    dispatch(deletePost(id));
  };
  const likeThisPost = async (id) => {
    dispatch(likePost(id));
    if(hasLikedPost){
      setLikes(post.likes.filter((id)=>id!==userId))
    }else{
      setLikes([...post.likes,userId])
    }
  };
  const openPost = () => {
    navigate(`/posts/${post._id}`);
  };
  const Likes = () => {
    if (likes.length > 0) {
      return likes.find(
        (like) => like === userId
      ) ? (
        <>
          <ThumbUpAltIcon fontSize="small" />
          &nbsp;
          {likes.length > 2
            ? `You and ${likes.length - 1} others`
            : `${likes.length} like${likes.length > 1 ? "s" : ""}`}
        </>
      ) : (
        <>
          <ThumbUpOutlined fontSize="small" />
          &nbsp;{likes.length} {likes.length === 1 ? "Like" : "Likes"}
        </>
      );
    }
    return (
      <>
        <ThumbUpOutlined fontSize="small" />
        &nbsp;Like
      </>
    );
  };

  return (
    <Card className={classes.card} raised elevation={6}>
      <div className={classes.cardAction} onClick={openPost}>
        {" "}
        <CardMedia
          className={classes.media}
          image={post.selectedFile}
          title={post.title}
        />
        <div className={classes.overlay}>
          <Typography variant="h6">{post.name}</Typography>
          <Typography variant="body2">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </div>
        <div className={classes.details}>
          <Typography variant="body2" color="textSecondary">
            {post.tags.map((tag) => `#${tag} `)}
          </Typography>
        </div>
        <Typography className={classes.title} variant="h5" gutterBottom>
          {post.title}
        </Typography>
        <CardContent>
          <Typography
            variant="body2"
            color="textSecondary"
            component="p"
            gutterBottom
            >
            {post.message}
          </Typography>
        </CardContent>
      </div>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <div className={classes.overlay2}>
            <Button
              style={{ color: "white" }}
              size="small"
              onClick={() => {
                setCurrentId(post._id);
              }}
            >
              <MoreHorizIcon fontSize="medium" />
            </Button>
          </div>
        )}
      <CardContent className={classes.cardActions}>
        <Button
          size="small"
          color="primary"
          disabled={!user?.result}
          onClick={() => likeThisPost(post._id)}
        >
          <Likes />
        </Button>
        {(user?.result?.googleId === post?.creator ||
          user?.result?._id === post?.creator) && (
          <Button
            size="small"
            color="secondary"
            onClick={() => deleteThisPost(post._id)}
          >
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default Post;
