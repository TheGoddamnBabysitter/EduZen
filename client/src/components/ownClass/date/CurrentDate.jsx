import React, { useEffect, useState } from 'react';

const CurrentDate = () => { 
    
    const [time, setTime] = useState('');
    const [date, setDate] = useState('');
    const [day, setDay] = useState('');
    const [year, setYear] = useState('');
    const [month, setMonth] = useState('');
    const weekdays = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday'
    ];
    
    const monthsFull = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December'
    ];
    

    const monthsShort = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];
  


  useEffect(() => {
  const updateTime = () => {
 
    const currentDateSet = new Date();

    const formattedDate = currentDateSet.getDate()
    const formattedDay = currentDateSet.getDay()
    // const formattedDate = currentDate.toLocaleDateString();
    const formattedTime = currentDateSet.toLocaleTimeString();
    // const timeParts = formattedTime.split(':');
    // console.log(timeParts);
    // const hours = parseInt(timeParts[2]);

   
    const year = currentDateSet.getFullYear();
    const formatedMonth = currentDateSet.getMonth(); // Months are zero-indexed


    // console.log(`Year: ${year}`);
    // console.log(`Month: ${month}`);
    // console.log(`Day: ${day}`);
    
    
    // setDate(formattedDate)
    setTime(formattedTime);
    setYear(year)
    setDay(weekdays[formattedDay])
  
    setDate(formattedDate)
    setMonth(monthsFull[formatedMonth])
    // console.log(formattedDate, formattedDay);
  };

  updateTime();

  const intervalId = setInterval(updateTime, 250);
  return () => clearInterval(intervalId);
}, []);








return (
  <div className="text-center text-lg font-semibold">
    <p className="text-blue-300">{`${day}, ${date} ${month}, ${year}`}</p>
    <p className="text-green-300">Current Time : {time}</p>
  </div>
);
};

export default CurrentDate;