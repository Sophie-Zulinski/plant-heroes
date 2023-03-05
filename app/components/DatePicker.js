'use client';

import 'react-nice-dates/build/style.css';
import { enGB } from 'date-fns/locale';
import React, { useState } from 'react';
import { DateRangePicker, END_DATE, START_DATE } from 'react-nice-dates';

export default function DatePicker() {
  const [startdate, setStartDate] = useState();
  const [endDate, setEndDate] = useState();
  return (
    <div className="border-solid  border-secondary">
      <DateRangePicker
        startDate={startdate}
        endDate={endDate}
        onStartDateChange={setStartDate}
        onEndDateChange={setEndDate}
        minimumDate={new Date()}
        minimumLength={1}
        format="dd MMM yyyy"
        locale={enGB}
      >
        {({ startDateInputProps, endDateInputProps, focus }) => (
          <div className="date-range">
            <input
              className={'input' + (focus === START_DATE ? ' -focused' : '')}
              {...startDateInputProps}
              placeholder="Start date"
            />
            <span className="date-range_arrow" />
            <input
              className={'input' + (focus === END_DATE ? ' -focused' : '')}
              {...endDateInputProps}
              placeholder="End date"
            />
          </div>
        )}
      </DateRangePicker>
    </div>
  );
}
