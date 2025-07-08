import React from 'react';

const About = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#fefce8] to-[#fdf6f6] dark:from-gray-900 dark:to-gray-950 px-4 py-16">
      <div className="max-w-3xl mx-auto text-center space-y-10">
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 dark:text-white tracking-tight leading-tight">
          About <span className="text-[#FE5448]">Dark Light</span>
        </h1>

        <div className="text-gray-700 dark:text-gray-300 text-sm sm:text-base space-y-6 leading-relaxed">
          <p>
            Welcome to <strong>Dark Light Novels</strong>, a sanctuary for stories born from dreams, melodies, and the whispered spaces in between. 
            Created by <strong>Precious Enubiaka</strong> and her team, this app is a personal project to share her worlds with you.
          </p>

          <p>
            Each week, we dive into plots woven with <em>romance</em>, <em>fantasy</em>, <em>family</em>, and a touch of <em>horror</em>. 
            Precious writes with heart, inspired by how she interprets music, vivid dreams, and fleeting thoughts that refuse to fade.
          </p>

          <p>
            Dark Light is not just a place to read, it is a growing community. Comment on stories, like and reply to others, and connect with fellow readers. 
            We believe that shared stories build stronger writers.
          </p>

          <p>
            Follow us on social media to learn more about the journey, and be sure to return often, new worlds await.
          </p>
        </div>

        <div className="flex justify-center gap-4 pt-6">
          <a
            href="/search"
            className="bg-[#FE5448] text-white px-6 py-2 rounded-md shadow hover:bg-[#e13e34] transition duration-300 text-sm font-semibold"
          >
            Explore Stories
          </a>
          <a
            href="/contact"
            className="border border-[#FE5448] text-[#FE5448] px-6 py-2 rounded-md hover:bg-[#fff2f0] dark:hover:bg-gray-800 transition duration-300 text-sm font-semibold"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
};

export default About;
