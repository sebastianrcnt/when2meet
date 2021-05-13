import styled from "styled-components";
import React, { useState } from "react";
import { Avatar, Button, Row, TimePicker, Input } from "antd";
import _ from "lodash";
import DayPicker from "react-day-picker";
import "react-day-picker/lib/style.css";

function dateEquals(date1, date2) {
  const doesYearMatch = date1.year === date2.year;
  const doesMonthMatch = date1.month === date2.month;
  const doesDateMatch = date1.date === date2.date;
  return doesYearMatch && doesMonthMatch && doesDateMatch;
}

function dateSetIncludes(dateSet, targetDate) {
  for (let date of dateSet) {
    if (dateEquals(date, targetDate)) {
      return true;
    }
  }

  return false;
}

function toDate(date) {
  return {
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
  };
}

export default function Home() {
  const [dates, setDates] = useState([]);

  const handleDayClick = (date) => {
    date = toDate(date);
    let nextDates;
    if (dateSetIncludes(dates, date)) {
      nextDates = dates.filter((d) => !dateEquals(d, date));
    } else {
      nextDates = [...dates, date];
    }
    setDates(nextDates);
  };

  return (
    <Container>
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
            return dateSetIncludes(dates, toDate(date));
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
        <span>시작 시간</span>
        <TimePicker minuteStep={30} secondStep={60}></TimePicker>
      </Row>
      <Row align="middle">
        <span>종료 시간</span>
        <TimePicker minuteStep={30} secondStep={60}></TimePicker>
      </Row>
      <Row>
        <Button type="primary">등록하기</Button>
      </Row>
    </Container>
  );
}

const Container = styled.div`
  width: 100vw;
  height: 100vh;
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
`;
