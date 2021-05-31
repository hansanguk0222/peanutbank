export const makeDatesWithDays: ({ year, month }: { year: number; month: number }) => { date: number; day: number }[][] = ({ year, month }) => {
  const datesWithDays: { date: number; day: number }[][] = [];
  const startDay = new Date(`${year}-${month}-01`).getDay();
  const lean = findLeanYear(year);
  const endDate = endOfMonth({ month, lean });
  const weekCnt = howManyWeeksInThisMonth({ endDate, startDay });

  for (let i = 0; i < weekCnt; i++) {
    datesWithDays.push([]);
    for (let j = 0; j < 7; j++) {
      datesWithDays[i].push({ date: 0, day: j });
    }
  }

  let rotateDay = startDay;
  let rotateDate = 1;

  for (let i = 0; i < weekCnt; i++) {
    while (rotateDay < 7 && rotateDate <= endDate) {
      const { day } = datesWithDays[i][rotateDay];
      datesWithDays[i][rotateDay] = { date: rotateDate, day };
      rotateDate += 1;
      rotateDay += 1;
    }
    rotateDay = 0;
  }
  console.log(datesWithDays);
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