import React from 'react';

const About = () => {
  return (
    <div className='content-container about'>
      <h1 className='title'>What does CookBook do?</h1>
      <p className='description'>Ever come home to find your fridge filled with random leftover ingredients, and you have no clue what meal you can make with a bag of hot dogs, parsley, and a half stick of butter?</p>
      <p className='description'> CookBook is here to help you find any recipes available with your current ingredients. </p>
      <h1 className='title'>Who's the wholesome cook in the background?</h1>
      <p className='description'>We found him on <a href=''>Death to the Stock Photo</a>. They send free high quality stock images to their subscribers every month. Check them out, they take some of the best stock photos we've ever seen. </p>
      <div id='acknowledgements'>Recipe search powered by <a href='http://www.yummly.co/recipes'>Yummley</a></div>
    </div>
  )
}

export default About;
