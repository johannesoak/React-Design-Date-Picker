export default function CreateDate(date) {
  if (date === "date") {
    return new Date(
      new Date().getFullYear(),
      new Date().getMonth(),
      new Date().getDate()
    )
  } else if (date instanceof Date && !isNaN(date.valueOf())) {
    date = new Date(date)
    return new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    )
  } else {
    return false
  }
}
