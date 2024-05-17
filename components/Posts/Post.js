import PropTypes from 'prop-types';
import React, { useRef } from 'react';
import styled from '@emotion/styled';

const PostContainer = styled.div(() => ({
  width: '300px',
  margin: '10px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  overflow: 'hidden',
}));

const CarouselContainer = styled.div(() => ({
  position: 'relative',
}));

const Carousel = styled.div(() => ({
  display: 'flex',
  overflowX: 'scroll',
  scrollbarWidth: 'none',
  msOverflowStyle: 'none',
  '&::-webkit-scrollbar': {
    display: 'none',
  },
  position: 'relative',
}));

const CarouselItem = styled.div(() => ({
  flex: '0 0 auto',
  scrollSnapAlign: 'start',
}));

const Image = styled.img(() => ({
  width: '280px',
  height: 'auto',
  maxHeight: '300px',
  padding: '10px',
}));

const Content = styled.div(() => ({
  padding: '10px',
  '& > h2': {
    marginBottom: '16px',
  },
}));

const Button = styled.button(() => ({
  position: 'absolute',
  bottom: 0,
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  border: 'none',
  color: '#000',
  fontSize: '20px',
  cursor: 'pointer',
  height: '50px',
}));

const PrevButton = styled(Button)`
  left: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const NextButton = styled(Button)`
  right: 10px;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
`;

const PostUser = styled.div(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '10px',
}));

const PostUserProfileImg = styled.div(() => ({
  textAlign: 'center',
  backgroundColor: 'orange',
  padding: '15px',
  borderRadius: '50%',
}));

const PostUserDetail = styled.div(() => ({}));

const Post = ({ post }) => {
  const carouselRef = useRef(null);
  const nameSplit = post.user.name.split(' ');
  const nameInitials = nameSplit[0].charAt(0) + nameSplit[1].charAt(0);
  const handleNextClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: 300,
        behavior: 'smooth',
      });
    }
  };

  const handlePrevClick = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -300,
        behavior: 'smooth',
      });
    }
  };

  return (
    <PostContainer>
      <PostUser>
        <PostUserProfileImg>
          <h3>{nameInitials}</h3>
        </PostUserProfileImg>
        <PostUserDetail>
          <h3>{post.user.name}</h3>
          <p>{post.user.email}</p>
        </PostUserDetail>
      </PostUser>
      <CarouselContainer>
        <Carousel ref={carouselRef}>
          {post.images.map((image, index) => (
            <CarouselItem key={index}>
              <Image src={image.url} alt={post.title} />
            </CarouselItem>
          ))}
        </Carousel>
        <PrevButton onClick={handlePrevClick}>&#10094;</PrevButton>
        <NextButton onClick={handleNextClick}>&#10095;</NextButton>
      </CarouselContainer>
      <Content>
        <h2>{post.title}</h2>
        <p>{post.body}</p>
      </Content>
    </PostContainer>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    content: PropTypes.any,
    images: PropTypes.arrayOf(
      PropTypes.shape({
        url: PropTypes.string.isRequired
      })
    ),
    title: PropTypes.any,
  }),
};

export default Post;
