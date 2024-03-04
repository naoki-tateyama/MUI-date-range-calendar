import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { PickerSelectionState } from '@mui/x-date-pickers/internals';
import dayjs, { Dayjs } from 'dayjs';
import { useState } from 'react';
import { SelectedDay } from './SelectedDay';
import 'dayjs/locale/ja';
dayjs.locale('ja');

type Props = {
  dates: Dayjs[];
  setDates: (dates: Dayjs[]) => void;
};

export const DateRangeCalendar: React.FC<Props> = ({ dates, setDates }) => {
  const [lastSelectedDay, setLastSelectedDay] = useState<Dayjs | null>(null);

  const onClickDay = (
    day: Dayjs | null,
    selectionState?: PickerSelectionState
  ) => {
    if (!day || selectionState !== 'finish') return;
    const index = dates.findIndex((date) => date.isSame(day, 'day'));
    if (index >= 0) {
      const newDates = dates.filter((_, i) => i !== index);
      newDates.sort((a, b) => a.diff(b));
      setDates(newDates);
    } else {
      // add selected day to dates
      let newDates = [...dates];
      if (dates.length === 0) {
        newDates.push(day);
      } else if (dates.length === 1) {
        newDates.push(day);
        setLastSelectedDay(day);
      } else if (dates.length === 2) {
        // if in range, set selected day & lastSelectedDay
        if (
          day.isAfter(dates[0]) &&
          day.isBefore(dates[1]) &&
          lastSelectedDay
        ) {
          newDates = [day, lastSelectedDay];
        } else {
          newDates = [day];
        }
      }
      newDates.sort((a, b) => a.diff(b));
      setDates(newDates);
    }
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateCalendar
        onChange={onClickDay}
        slots={{
          day: SelectedDay,
        }}
        slotProps={{
          day: {
            dates,
          } as object,
        }}
      />
    </LocalizationProvider>
  );
};
