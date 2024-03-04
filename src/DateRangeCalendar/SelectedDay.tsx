import { alpha, useTheme } from '@mui/material/styles';
import { PickersDay, PickersDayProps } from '@mui/x-date-pickers/PickersDay';
import dayjs, { Dayjs } from 'dayjs';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);

type Props = PickersDayProps<Dayjs> & { dates?: Dayjs[] };

export const SelectedDay: React.FC<Props> = (props: Props) => {
  const theme = useTheme();
  const { dates = [], day } = props;
  const isSelected =
    dates.length === 0
      ? false
      : dates.length === 1
      ? day.isSame(dates[0], 'date')
      : day.isSameOrAfter(dates[0], 'date') &&
        day.isSameOrBefore(dates[1], 'date');
  return (
    <PickersDay
      {...props}
      selected={isSelected}
      aria-selected={isSelected} // selected only works for last selected day
      day={day}
      sx={{
        bgcolor: isSelected ? theme.palette.primary.main : 'inherit',
        color: isSelected ? theme.palette.primary.contrastText : 'inherit',
        '&:hover': {
          bgcolor: alpha(theme.palette.primary.light, 0.4),
          color: theme.palette.primary.contrastText,
        },
        '&.Mui-selected': isSelected
          ? {
              bgcolor: theme.palette.primary.main,
              color: theme.palette.primary.contrastText,
            }
          : {
              bgcolor: 'inherit',
              color: 'inherit',
            },
        '&.Mui-selected:hover': isSelected
          ? {
              bgcolor: theme.palette.primary.light,
              color: theme.palette.primary.contrastText,
            }
          : {
              bgcolor: 'inherit',
              color: 'inherit',
            },
      }}
    />
  );
};
