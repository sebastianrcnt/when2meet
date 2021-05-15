import React, { useState } from "react";
import styled from "styled-components";
import styles from "./pick.module.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import _ from "lodash";
import moment from "moment";

// import SwiperCore, { Pagination } from "swiper/core";
// SwiperCore.use([Pagination]);
function setDigit(num, digitCount) {
  return num.toLocaleString("en-US", {
    minimumIntegerDigits: 2,
    useGrouping: false,
  });
}
const timeblocks = [];

const startHour = 10;
const endHour = 20;

for (let i = startHour; i < endHour + 1; i++) timeblocks.push(i);

const selections = [moment("2021-05-21"), moment("2021-05-30")];

export default function PickPage() {
  const [selectedTimeblocks, setSelectedTimeblocks] = useState({});

  return (
    <Wrapper>
      {selections.map((selection) => {
        return (
          <>
            <p>{selection.format("YYYY.MM.DD")}</p>
            <SwiperContainer>
              <Swiper slidesPerView={8} freeMode>
                {timeblocks.map((timeblock, index) => {
                  const dateKey = selection.format("$YYYY_MM_DD");
                  const selected =
                    selectedTimeblocks[dateKey]?.includes(timeblock);
                  return (
                    <SwiperSlide key={index}>
                      <TimeColumn
                        key={index}
                        timeblock={timeblock}
                        selected={selected}
                        onClick={() => {
                          let selectedTimeblocksCopy =
                            _.cloneDeep(selectedTimeblocks);
                          const nextSelectedTimeblocks = _.update(
                            selectedTimeblocksCopy,
                            dateKey,
                            (k) =>
                              _.xor(selectedTimeblocksCopy[dateKey], [
                                timeblock,
                              ])
                          );
                          setSelectedTimeblocks(nextSelectedTimeblocks);
                        }}
                      ></TimeColumn>
                    </SwiperSlide>
                  );
                })}
              </Swiper>
            </SwiperContainer>
          </>
        );
      })}
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 0 10px;
  p {
    margin: 0;
  }
`;

const SwiperContainer = styled.div`
  overflow: hidden;
`;

function TimeColumn({ children, onClick, timeblock, selected }) {
  return (
    <TimeColumnWrapper>
      <TimeCell $selected={selected} onClick={onClick}>
        <div>{setDigit(timeblock, 2)}:00</div>
        <div>
          {setDigit(timeblock + 1, 2)}
          :00
        </div>
      </TimeCell>
    </TimeColumnWrapper>
  );
}

const TimeColumnWrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  width: 100%;
`;

const TimeCell = styled.div`
  width: 100%;
  height: 40px;

  background-color: ${(p) => (p.$selected ? "green" : "gray")};
  border: 1px solid;
  border-color: ${(p) => (p.$selected ? "green" : "gray")};
  transition: background-color 0.2s ease;
  color: white;

  font-size: 10px;

  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  position: relative;
`;
