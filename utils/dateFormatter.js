function formattDate (dateString){
    const dateObj = new Date(dateString);
    if(isNaN(dateObj.getTime())){
        throw new Error("Invalid date string");
    }
    const day = dateObj.getDate().toString().padStart(2, "0")
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"]
    const month = monthNames[dateObj.getMonth()];
    const year = dateObj.getFullYear().toString().slice(-2);
    return `${day} ${month} ${year}`
}

export default formattDate;