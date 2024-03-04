import React from "react";
import { useCurrentUser } from "../contexts/CurrentUserContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash, faHeart } from "@fortawesome/free-solid-svg-icons";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";

import usePostActions from "../hooks/UsePostsActions";

function PostCard({ posts, updateLikesCount }) {
  const currentUser = useCurrentUser(); 
  const { deletePost, likePost, unlikePost } = usePostActions(updateLikesCount);

  if (!posts.length) return <div>No posts found.</div>;

  const handleDelete = async (postId) => {
    await deletePost(postId);
  };

  const handleLike = async (postId) => {
    await likePost(postId);
  };

  const handleUnlike = async (postId) => {
    await unlikePost(postId);
  };

  return (
    <Row xs={1} md={2} lg={3} className="g-4">
      {posts.map((post) => (
        <Col key={post.id}>
          <Card>
            <Card.Img
              variant="top"
              src={post.image}
              style={{ objectFit: "cover", height: "200px" }}
            />
            <Card.Body>
              <Card.Title>{post.title}</Card.Title>
              <Card.Text>{post.description}</Card.Text>

              {currentUser && (
                <>
                  <Card.Text>
                    Posted by: {post.creator?.username || "Unknown"}
                  </Card.Text>
                  Likes: {post.likes_count}
                  {post.isLikedByCurrentUser ? (
                    <Button
                      variant="light"
                      onClick={() => handleUnlike(post.id)}
                    >
                      <FontAwesomeIcon icon={faHeartBroken} /> Unlike
                    </Button>
                  ) : (
                    <Button variant="light" onClick={() => handleLike(post.id)}>
                      <FontAwesomeIcon icon={faHeart} /> Like
                    </Button>
                  )}
                  <Card.Text>Last updated: {post.updated_at}</Card.Text>
                </>
              )}
              <Card.Text>Posted on: {post.created_at}</Card.Text>
              {currentUser && post.creatorId === currentUser.userId && (
                <div>
                  <Button variant="outline-primary" size="sm" className="me-2">
                    <FontAwesomeIcon icon={faPen} /> Edit
                  </Button>
                  <Button variant="outline-danger" size="sm" onClick={() => handleDelete(post.id)}>
                    <FontAwesomeIcon icon={faTrash} /> Delete
                  </Button>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
}

export default PostCard;
