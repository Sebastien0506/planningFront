export function validateVacation(vacances: any): boolean {
    const startDay = new Date(vacances.start_day);
    const endDay = new Date(vacances.end_day);
  
    if (isNaN(startDay.getTime()) || isNaN(endDay.getTime())) {
      return false;
    }
  
    if (startDay >= endDay) {
      return false;
    }
  
    if (['accepted', 'rejected'].includes(vacances.status)) {
      return false;
    }
  
    return true;
  }