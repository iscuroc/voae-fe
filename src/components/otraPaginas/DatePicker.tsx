import React, { useEffect, useRef } from 'react';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

interface DatePickerProps {
  id: string;
  label: string;
  selectedDate: Date | null;
  onChange: (date: Date) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ id, label, selectedDate, onChange }) => {
  const datepickerRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (datepickerRef.current) {
      flatpickr(datepickerRef.current, {
        enableTime: true,
        dateFormat: 'Y-m-d H:i',
        defaultDate: selectedDate || undefined,
        onChange: (selectedDates) => {
          if (selectedDates[0]) {
            onChange(selectedDates[0]);
          }
        },
      });
    }
  }, [selectedDate, onChange]);

  return (
    <div className="w-full">
      <label htmlFor={id} className="text-sm font-bold text-gray-700 mb-1">{label}</label>
      <input
        type="text"
        id={id}
        ref={datepickerRef}
        className="border border-gray-300 rounded-lg w-full py-2 px-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        required
      />
    </div>
  );
};

export default DatePicker;
