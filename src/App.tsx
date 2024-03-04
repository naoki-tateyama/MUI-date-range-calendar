import { Dayjs } from 'dayjs';
import { useState } from 'react';
import { DateRangeCalendar } from './DateRangeCalendar';

function App() {
  const [dates, setDates] = useState<Dayjs[]>([]);

  return (
    <DateRangeCalendar
      dates={dates}
      setDates={setDates}
    />
  );
}

export default App;
