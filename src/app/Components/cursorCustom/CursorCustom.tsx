"use client";
import "@/app/globals.css";
import React, { useState, useEffect } from "react";

const Circles = () => {
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const colors = ["#3b82f6"];

  useEffect(() => {
    const handleMouseMove = (e: { clientX: any; clientY: any }) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div>
      {colors.map((color, index) => (
        <div
          key={index}
          className="circle bg-black p-[0.3rem] rounded-[50%] border-2  border-sky-500 "
          style={{
            left: coords.x - 12 + "px",
            top: coords.y - 12 + "px",
          }}
        >
          {" "}
          <img
            className="w-[1.5rem]  rounded-[50%]  "
            src="aspaLogo.webp"
          ></img>{" "}
        </div>
      ))}
    </div>
  );
};

export default Circles;
