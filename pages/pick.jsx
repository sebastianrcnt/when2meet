import React, { useState } from "react";
import styled from "styled-components";
import styles from "./pick.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";

// import SwiperCore, { Pagination } from "swiper/core";
// SwiperCore.use([Pagination]);
function setDigit(num, digitCount) {
  return num.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}
const timeblocks = [];

for (let i = 0; i < 24; i++) {
  timeblocks.push({ hour: i, minute: 0 });
  timeblocks.push({ hour: i, minute: 30 });
}

export default function PickPage() {
  const [selectedTimeblocks, setSelectedTimeblocks] = useState([]);

  return (
    <div>
      <p>날짜</p>
      <div className={styles.swiperWrapper}>
        <Swiper
          slidesPerView="auto"
          freeMode={true}
          style={{ padding: 20 }}
        >
          {timeblocks.map((timeblock) => (
            <SwiperSlide>
              <TimeColumn timeblock={timeblock} isSelected></TimeColumn>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

function TimeColumn({ children, onClick, timeblock, isSelected }) {
  return (
    <div className={styles.timeColumn}>
      {/* <span className={styles.dateSpan}>오후</span> */}
      {/* <span className={styles.hourSpan}>{children}</span> */}
      <div className={[styles.timeCell]}>
        <div>
          {setDigit(timeblock.hour, 2)}:{setDigit(timeblock.minute, 2)}
        </div>
        <div>
          {setDigit(timeblock.hour, 2)}:{setDigit(timeblock.minute, 2)}
        </div>
      </div>
    </div>
  );
}
