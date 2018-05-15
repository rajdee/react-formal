export default function uniqMessage(msg, i, list) {
  var idx = -1;

  var extract = function extract(item) {
    return item.message || item;
  };

  msg = extract(msg);
  list.some(function (item, ii) {
    if (extract(item) === msg) {
      idx = ii;
      return true;
    }
  });
  return idx === i;
}