import React from 'react';
import './deadline.scss';
const Deadline = ({ deadline, setDeadline }) => {
  const now = new Date();
  const currentYear = now.getFullYear(); // 今年
  const count = 10; // 年数制限

  const DeadlineYears = [];
  for (let i = currentYear; i <= currentYear + count; i++) {
    DeadlineYears.push(
      <option key={i} value={i} selected={i === deadline.year ? true : false}>
        {i}
      </option>,
    );
  }

  const DeadlineMonth = [];
  for (let i = 1; i <= 12; i++) {
    DeadlineMonth.push(
      <option key={i} value={i} selected={i === deadline.month ? true : false}>
        {i}
      </option>,
    );
  }

  const DeadlineDay = [];
  for (let i = 1; i <= 31; i++) {
    DeadlineDay.push(
      <option key={i} value={i} selected={i === deadline.day ? true : false}>
        {i}
      </option>,
    );
  }

  const DeadlineHour = [];
  for (let i = 0; i < 24; i++) {
    DeadlineHour.push(
      <option key={i} value={i} selected={i === deadline.hour ? true : false}>
        {i}
      </option>,
    );
  }

  const DeadlineMinute = [];
  for (let i = 0; i < 60; i++) {
    DeadlineMinute.push(
      <option key={i} value={i} selected={i === deadline.minute ? true : false}>
        {i}
      </option>,
    );
  }

  const handleDeadlineChange = (unit) => (e) => {
    setDeadline({ ...deadline, [unit]: e.target.value });
  };

  return (
    <div className="container-deadline">
      <p>期限：</p>
      <select value={deadline.yaer} onChange={handleDeadlineChange('year')}>
        {DeadlineYears}
      </select>
      <p>年</p>
      <select value={deadline.month} onChange={handleDeadlineChange('month')}>
        {DeadlineMonth}
      </select>
      <p>月</p>
      <select value={deadline.day} onChange={handleDeadlineChange('day')}>
        {DeadlineDay}
      </select>
      <p>日</p>
      <select value={deadline.hour} onChange={handleDeadlineChange('hour')}>
        {DeadlineHour}
      </select>
      <p>時</p>
      <select value={deadline.minute} onChange={handleDeadlineChange('minute')}>
        {DeadlineMinute}
      </select>
      <p>分まで</p>
    </div>
  );
};

export default Deadline;
