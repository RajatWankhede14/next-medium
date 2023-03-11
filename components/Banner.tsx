import React from "react";

function Banner() {
  return (
    <div className="max-w-7xl mx-auto bg-yellow-400 px-4 py-8 flex items-center">
      <div>
        <h1 className="text-5xl font-thin font-serif">
          <span className="underline">Medium</span> is a place to read, write
          and connect
        </h1>
        <h4>
          It's easy and free to post your thinking on any topic and connect with
          millions of readers.
        </h4>
      </div>
      <img
        src="https://seeklogo.com/images/M/medium-logo-31646BE2FD-seeklogo.com.png"
        className="hidden sm:block object-contain w-24 md:w-3/12"
      />
    </div>
  );
}

export default Banner;
