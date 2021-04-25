const formatPrice = str => {
  var st1 = str.toString().replace(/\s+/g, "");
  var st2 = new Number(st1).toLocaleString("fr-Fr");
  return st2;
};

export default formatPrice;
