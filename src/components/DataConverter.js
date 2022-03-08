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

export const timestampToWeekDaysConversion =(parameter)=>{
  let timestamp = parameter;
  let date = new Date(timestamp * 1000);
  let weekDays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  let formattedWeekDay = weekDays[date.getDay()];
  return formattedWeekDay;
}



export const displayTime = (seconds) => {
  let milliseconds = seconds * 1000;
  return new Date(milliseconds).toTimeString().slice(0, 5);
};

export const timestampToHourConversion = (parameter) => {
  let timestamp = parameter;
  let date = new Date(timestamp * 1000);
  let hours = date.getHours();
  let minutes = "0" + date.getMinutes();
  let seconds = "0" + date.getSeconds();
  let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
  return formattedTime;
}


export const KelvinToCelsius = (kelvin) => {
  return Math.floor(kelvin - 273.15);
};

export const KelvinToFahrenheit = (Fahrenheit) => {
  return Math.floor((Fahrenheit - 273.15)* 9/5 + 32);
};