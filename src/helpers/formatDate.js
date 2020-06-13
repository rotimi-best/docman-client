export default date => {
  const todaysDate = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${todaysDate}.${month}.${year}`;
}