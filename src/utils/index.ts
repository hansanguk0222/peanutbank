export const findBeforeAndNextYearAndMonth: ({ year, month }: { year: number; month: number }) => { lastYear: number; lastMonth: number; nextYear: number; nextMonth: number } = ({
  year,
  month,
}: {
  year: number;
  month: number;
}) => {
  let lastYear = year;
  let lastMonth = month - 1;
  let nextYear = year;
  let nextMonth = month + 1;

  if (month === 1) {
    lastYear -= 1;
    lastMonth = 12;
  }

  if (month === 12) {
    nextYear += 1;
    nextMonth = 1;
  }

  return { lastYear, lastMonth, nextYear, nextMonth };
};

export const makeDatesWithDays: ({ year, month }: { year: number; month: number }) => { date: number; day: number; thisMonth: boolean }[][] = ({ year, month }) => {
  const datesWithDays: { date: number; day: number; thisMonth: boolean }[][] = [];
  const startDay = new Date(`${year}-${month}-01`).getDay();
  const lean = findLeanYear(year);
  const endDate = endOfMonth({ month, lean });
  const weekCnt = howManyWeeksInThisMonth({ endDate, startDay });

  for (let i = 0; i < 6; i++) {
    datesWithDays.push([]);
    for (let j = 0; j < 7; j++) {
      datesWithDays[i].push({ date: 0, day: j, thisMonth: false });
    }
  }

  let rotateDay = startDay;
  let rotateDate = 1;

  for (let i = 0; i < weekCnt; i++) {
    while (rotateDay < 7 && rotateDate <= endDate) {
      const { day } = datesWithDays[i][rotateDay];
      datesWithDays[i][rotateDay] = { date: rotateDate, day, thisMonth: true };
      rotateDate += 1;
      rotateDay += 1;
    }
    rotateDay = 0;
  }

  const { lastMonth, lastYear, nextMonth, nextYear } = findBeforeAndNextYearAndMonth({ year, month });

  const lastLean = findLeanYear(lastYear);
  let lastMonthEndOfDateRotate = endOfMonth({ month: lastMonth, lean: lastLean });
  let nextMonthDayRotate = 1;

  for (let i = 6; i >= 0; i--) {
    if (datesWithDays[0][i].date === 0) {
      datesWithDays[0][i] = { date: lastMonthEndOfDateRotate, day: i, thisMonth: false };
      lastMonthEndOfDateRotate -= 1;
    }
  }
  for (let i = weekCnt - 1; i < 6; i++) {
    for (let j = 0; j < 7; j++) {
      if (datesWithDays[i][j].date === 0) {
        datesWithDays[i][j] = { date: nextMonthDayRotate, day: j, thisMonth: false };
        nextMonthDayRotate += 1;
      }
    }
  }
  return datesWithDays;
};

const findLeanYear: (year: number) => boolean = (year) => {
  if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
    return true;
  }
  return false;
};

const endOfMonth: ({ month, lean }: { month: number; lean: boolean }) => number = ({ month, lean }: { month: number; lean: boolean }) => {
  if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
    return 31;
  } else if (month === 2) {
    if (lean) {
      return 29;
    }
    return 28;
  } else {
    return 30;
  }
};

const howManyWeeksInThisMonth: ({ endDate, startDay }: { endDate: number; startDay: number }) => number = ({ endDate, startDay }: { endDate: number; startDay: number }) => {
  if (endDate === 31) {
    if (startDay === 5 || startDay === 6) {
      return 6;
    }
    return 5;
  } else if (endDate === 30) {
    if (startDay === 6) {
      return 6;
    }
    return 5;
  } else if (endDate === 28) {
    if (startDay === 0) {
      return 4;
    }
    return 5;
  } else {
    return 5;
  }
};

export const checkNotAvailableValue: (arr: any[]) => boolean = (arr: any[]) => arr.every((item) => item !== '' && item !== null && item !== undefined);
