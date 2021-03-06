import styled from "styled-components";
import React, { useState } from "react";
import { Avatar, Button, Row, TimePicker, Input } from "antd";
import _ from "lodash";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";
import moment from "moment";

function dateEquals(date1, date2) {
  return onlyDate(date1).isSame(onlyDate(date2));
}

function dateSetIncludes(dateSet, targetDate) {
  for (let date of dateSet) {
    if (dateEquals(date, targetDate)) {
      return true;
    }
  }

  return false;
}

function toMoment(date) {
  return moment(date);
}

function onlyDate(date) {
  return date.clone().startOf("day");
}

export default function Home() {
  const [dates, setDates] = useState([]);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);

  const handleDayClick = (date) => {
    date = onlyDate(toMoment(date));
    let nextDates;
    if (dateSetIncludes(dates, date)) {
      nextDates = dates.filter((d) => !dateEquals(d, date));
    } else {
      nextDates = [...dates, date];
    }
    setDates(nextDates);
  };

  const handleStartTimeChange = setStartTime;
  const handleEndTimeChange = setEndTime;
  const handleSubmitButtonClick = () => {
    const isStartTimeSet = !!startTime;
    const isEndTimeSet = !!endTime;
    const areDatesSelected = dates.length > 0;

    // validation
    if (!(isStartTimeSet && isEndTimeSet && areDatesSelected)) {
      return;
    }

    // check end time is later than start time
    const isStartTimeBeforeEndTime = startTime.isBefore(endTime);
    if (!isStartTimeBeforeEndTime) {
      return;
    }

    console.log(
      dates.map((d) => d.format("YYYY-MM-DD")),
      startTime.format("hh"),
      endTime.format("hh")
    );
  };

  return (
    <Container>
      <h1>새로운 모임 등록하기</h1>
      <StepRow>
        <Avatar size="small">1</Avatar>
        <StepText>모임 제목</StepText>
      </StepRow>
      <Row>
        <Input></Input>
      </Row>
      <StepRow>
        <Avatar size="small">2</Avatar>
        <StepText>모임의 날짜를 선택하세요</StepText>
      </StepRow>
      <Row>
        <DayPicker
          selectedDays={(date) => {
            return dateSetIncludes(dates, toMoment(date));
          }}
          onDayClick={handleDayClick}
          modifiersStyles={{
            selected: {
              transition: "0.2s ease-out",
              borderRadius: 0,
            },
          }}
          locale="ko"
        ></DayPicker>
      </Row>
      <StepRow>
        <Avatar size="small">3</Avatar>
        <StepText>시간대를 선택하세요</StepText>
      </StepRow>
      <Row align="middle">
        <TimeLabel>시작 시간</TimeLabel>
        <TimePicker
          minuteStep={60}
          secondStep={60}
          onChange={handleStartTimeChange}
        ></TimePicker>
      </Row>
      <Row align="middle">
        <TimeLabel>종료 시간</TimeLabel>
        <TimePicker
          minuteStep={60}
          secondStep={60}
          onChange={handleEndTimeChange}
        ></TimePicker>
      </Row>
      <SizedBox height={30}></SizedBox>
      <Row align="end">
        <Button type="primary" onClick={handleSubmitButtonClick}>
          등록하기
        </Button>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  width: calc(100vw - 40px);
  height: calc(100vh - 20px);

  margin: 10px 20px;
  background-color: white;
`;

const SizedBox = styled.div`
  width: ${(p) => p.width}px;
  height: ${(p) => p.height}px;
`;

const StepText = styled.h3``;

const StepRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 5px 0;

  ${StepText} {
    margin-left: 5px;
  }

  margin-top: 10px;
  margin-bottom: 4px;
`;

const TimeLabel = styled.label`
  margin-right: 10px;
`;
