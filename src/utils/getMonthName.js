const getMonthName = (monthNumber) => {
    // Ensure the month number is in two-digit format
    const formattedMonth = monthNumber.padStart(2, "0");
  
    // Mapping month numbers to month names
    const months = {
      "01": "January",
      "02": "February",
      "03": "March",
      "04": "April",
      "05": "May",
      "06": "June",
      "07": "July",
      "08": "August",
      "09": "September",
      "10": "October",
      "11": "November",
      "12": "December"
    };
  
    // Return the corresponding month name or "Unknown" if not found
    return months[formattedMonth] || "Unknown";
  };
  
  export default getMonthName;
  