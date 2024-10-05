import React from 'react'

const About = () => {
  return (
    <div className='min-h-screen flex items-center justify-center'>
      <div className='max-w-2xl mx-auto p-2 text-center'>
        <div>
          <h1 className='text-3xl font font-semibold text-center my-7'>
            About Dark Light
          </h1>
          <div className='text-md text-gray-500 flex flex-col gap-6'>
            <p>
              Welcome to Dark Light Novels! This novel app was created by Precious Enubiaka's team
              as a personal project to share his her stories and works with the
              world. Precious Enubiaka is a passionate writerr who loves to write about
              stories inspired by how she percieves songs, her dreams, and everything in between.
            </p>

            <p>
              On this app, you'll find weekly uploads on stories plot
              focused on romance, fantasy, family and horry.
              Precious is a writter who coninues to develop her writing skills is always learning
              and exploring ways to share her inner world and thought through stories,
              so be sure to check back often for new content!
            </p>

            <p>
              We encourage you to leave comments on our novels and engage with
              other readers. You can like other people's comments and reply to
              them as well. We believe that a community of readers and writers can help
              each other grow and improve.
            </p>
            <p>Visit our social media page to know more...</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About
