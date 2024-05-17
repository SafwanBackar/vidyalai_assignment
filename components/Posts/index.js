import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';
import styled from '@emotion/styled';
import Post from './Post';
import Container from '../common/Container';
import { WindowWidthContext } from '../context/useWindowWidth';

const PostListContainer = styled.div(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'center',
}));

const LoadMoreButton = styled.button(() => ({
  padding: '10px 20px',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: 5,
  cursor: 'pointer',
  fontSize: 16,
  marginTop: 20,
  transition: 'background-color 0.3s ease',
  fontWeight: 600,

  '&:hover': {
    backgroundColor: '#0056b3',
  },
  '&:disabled': {
    backgroundColor: '#808080',
    cursor: 'default',
  },
}));

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [start, setStart] = useState(0);
  const [postsPresent, setPostsPresent] = useState(true);
  const { isSmallerDevice } = useContext(WindowWidthContext);
  const postLimit = isSmallerDevice ? 5 : 10;

  useEffect(() => {
    const fetchPost = async () => {
      // const { data: posts } = await axios.get('/api/v1/posts', {
      //   params: { start: 0, limit: isSmallerDevice ? 5 : 10 },
      // });
      // setPosts(posts);
      setIsLoading(true);
      try {
        const { data: posts } = await axios.get('/api/v1/posts', {
          params: { start: start, limit: postLimit },
        });
        if (posts.length < postLimit) {
          setPostsPresent(false);
        }
        setPosts(prev => [...prev, ...posts]);
      } catch (error) {
          console.error('Error fetching posts', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPost();
  }, [start, postLimit]);

  const handleClick = () => {
    // setIsLoading(true);

    // setTimeout(() => {
    //   setIsLoading(false);
    // }, 3000);
    if (!isLoading) {
      setStart(prev => prev + postLimit);
    }
  };
  return (
    <Container>
      <PostListContainer>
        {posts.map((post,i) => (
          <Post post={post} key={i}/>
        ))}
      </PostListContainer>

      {/* <div style={{ display: 'flex', justifyContent: 'center' }}>
        <LoadMoreButton onClick={handleClick} disabled={isLoading}>
          {!isLoading ? 'Load More' : 'Loading...'}
        </LoadMoreButton>
      </div> */}
      {postsPresent && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <LoadMoreButton onClick={handleClick} disabled={isLoading}>
            {!isLoading ? 'Load More' : 'Loading...'}
          </LoadMoreButton>
        </div>
      )}
    </Container>
  );
}
