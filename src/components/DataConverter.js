export const displayWeekDay = (seconds) => {
    let milliseconds = seconds * 1000;
    const calendarDays = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return calendarDays[new Date(milliseconds).getDay()];
  };
  
  export const displayDayDate = (seconds) => {
    let milliseconds = seconds * 1000;
    const calendarMonths = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    
    let day = displayWeekDay(seconds);
    let date = new Date(milliseconds).getDate();
    let month = calendarMonths[new Date(milliseconds).getMonth()]
      .toString()
      .slice(0, 3);
    return `${day}, ${date} ${month}`;
  };
  
  
  
  export const displayTime = (seconds) => {
    let milliseconds = seconds * 1000;
    return new Date(milliseconds).toTimeString().slice(0, 5);
  };
  
  
  export const KelvinToCelsius = (kelvin) => {
    return Math.floor(kelvin - 273.15);
  };