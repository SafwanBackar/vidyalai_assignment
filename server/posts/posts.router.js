const express = require('express');
const { fetchPosts } = require('./posts.service');
const { fetchUserById } = require('../users/users.service');
const axios = require('axios');

const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const start = req.query.start
    const limit = req.query.limit
    const posts = await fetchPosts({ start, limit });

    const postsWithImages = await posts.reduce(async (promisedAcc, post) => {
      const acc = await promisedAcc;

      try {
        const photoData = await axios.get(`https://jsonplaceholder.typicode.com/albums/${post.id}/photos`);
        const photos = photoData.data.map(photo => ({ url: photo.url }));
        
        const user = await fetchUserById(post.userId)

        return [...acc,
          {
            ...post,
            images: photos,
            user: { name: user.name || '', email: user.email || ''},
          },
        ];
      } catch (error) {
          console.error('Error fetching photos', post.id, error);
      }
    }, []);

    res.json(postsWithImages);
  } catch (error) {
    console.error('Error fetching posts', error);
  }
});

module.exports = router;