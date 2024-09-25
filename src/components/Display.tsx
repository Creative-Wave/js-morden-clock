import React, { useState, useEffect, useCallback } from "react";
// Import CSS file for styles

const Display = () => {
  const [dateTime, setDateTime] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    am: "AM",
    day: "00",
    month: "00",
    year: "0000",
  });

  const updateDateTime = useCallback(() => {
    const now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let am = h >= 12 ? "PM" : "AM";
    let day = now.getDate();
    let month = now.getMonth() + 1; // Months are zero-indexed
    let year = now.getFullYear();

    h = h % 12;
    h = h ? h : 12; // the hour '0' should be '12'
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;
    day = day < 10 ? "0" + day : day;
    month = month < 10 ? "0" + month : month;

    setDateTime({
      hours: h,
      minutes: m,
      seconds: s,
      am: am,
      day: day,
      month: month,
      year: year,
    });
  }, [setDateTime]);

  useEffect(() => {
    const timerId = setInterval(updateDateTime, 1000);
    updateDateTime(); // Call immediately to set initial time and date

    return () => clearInterval(timerId); // Clean up on component unmount
  }, [updateDateTime]);

  const getStrokeDashoffset = (seconds) => {
    const totalLength = 288; // Circumference of the circle
    return totalLength - (totalLength * seconds) / 60;
  };

  return (
    <div className=" h-screen flex justify-center items-center bg-[url('/bg.jpg')] bg-cover bg-center ">
      <div className="absolute w-full h-full bg-black/50"></div>
      {/* Clock section start */}
      <div
        className="w-[370px] h-[370px] flex justify-center items-center relative bg-[#070707] rounded-full overflow-hidden"
        style={{ boxShadow: "inset 20px 0px 50px  15px #000" }}>
        <svg
          className="absolute w-full h-full z-10"
          viewBox="0 0 100 100"
          style={{
            filter: "drop-shadow(0px 0px 15px rgba(45, 240, 234, 100))",
          }}>
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#2df0ea"
            strokeWidth="2"
            fill="none"
            strokeDasharray="288"
            strokeDashoffset={getStrokeDashoffset(dateTime.seconds)}
            style={{
              transition: "stroke-dashoffset 1s linear",
              boxShadow: "50px 20px 15px rgba(45, 240, 234, 100)",
              strokeLinecap: "round",
            }}
          />
        </svg>
        <svg className="absolute w-full h-full z-[1]" viewBox="0 0 100 100">
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#131313"
            strokeWidth="4"
            fill="none"
            strokeDasharray="288"
          />
        </svg>
        <div className="bg-[#000] w-[320px] h-[150px] -translate-x-12 absolute rounded-full -z-[]"></div>
        <div className="relative">
          <div className="text-white text-5xl flex z-10">
            <div className="font-bold" id="hours">
              {dateTime.hours}:
            </div>
            <div className="font-bold" id="minutes">
              {dateTime.minutes}:
            </div>
            <div className="font-bold" id="seconds">
              {dateTime.seconds}
            </div>
            <div className="text-sm font-bold mt-7 mx-2" id="am">
              {dateTime.am}
            </div>
          </div>

          {/* Date section start */}
          <div className="flex text-white gap-5 mt-5 text-xl font-bold">
            <div className="day">{dateTime.day}</div>
            <div className="month">{dateTime.month}</div>
            <div className="year">{dateTime.year}</div>
          </div>
          {/* Date section end */}
        </div>
      </div>
      {/* Clock section end */}
    </div>
  );
};

export default Display;
