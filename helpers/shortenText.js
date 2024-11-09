const shortenText = (txt) => {
    if (txt.length <= 12) {
        return txt;
      }
      return txt.slice(0, 12) + '...';
}
export default shortenText