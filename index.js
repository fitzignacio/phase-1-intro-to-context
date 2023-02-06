const createEmployeeRecord = (data) => {
    let [firstName, familyName, title, payPerHour] = data;
    return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: []
    };
  };
  
  const createEmployeeRecords = (data) => {
    return data.map(employeeData => createEmployeeRecord(employeeData));
  };
  
  const createTimeInEvent = (employeeRecord, timeIn) => {
    const [date, hour] = timeIn.split(" ");
    employeeRecord.timeInEvents.push({
      type: "TimeIn",
      date,
      hour: parseInt(hour)
    });
    return employeeRecord;
  };
  
  const createTimeOutEvent = (employeeRecord, timeOut) => {
    const [date, hour] = timeOut.split(" ");
    employeeRecord.timeOutEvents.push({
      type: "TimeOut",
      date,
      hour: parseInt(hour)
    });
    return employeeRecord;
  };
  
  const hoursWorkedOnDate = (employeeRecord, date) => {
    const timeInEvents = employeeRecord.timeInEvents.filter(
      event => event.date === date
    );
    const timeOutEvents = employeeRecord.timeOutEvents.filter(
      event => event.date === date
    );
  
    let totalHours = 0;
    timeInEvents.forEach((timeInEvent, index) => {
      const timeOutEvent = timeOutEvents[index];
      totalHours += (timeOutEvent.hour - timeInEvent.hour) / 100;
    });
    return totalHours;
  };
  
  const wagesEarnedOnDate = (employeeRecord, date) => {
    return employeeRecord.payPerHour * hoursWorkedOnDate(employeeRecord, date);
  };
  
  const allWagesFor = (employeeRecord) => {
    const dates = [
      ...new Set([
        ...employeeRecord.timeInEvents.map(event => event.date),
        ...employeeRecord.timeOutEvents.map(event => event.date)
      ])
    ];
    return dates.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
  };
  
  const calculatePayroll = (employeeRecords) => {
    return employeeRecords.reduce((total, employeeRecord) => total + allWagesFor(employeeRecord), 0);
  };
  
  module.exports = {
    createEmployeeRecord,
    createEmployeeRecords,
    createTimeInEvent,
    createTimeOutEvent,
    hoursWorkedOnDate,
    wagesEarnedOnDate,
    allWagesFor,
    calculatePayroll
  };
  