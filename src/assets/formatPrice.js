const formatPrice = str => {
  str = str.replace(/\s+/g, "");
  str = new Number(str).toLocaleString("fr-Fr");
  return str;
};

export default formatPrice;
