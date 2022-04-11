export const formatMoney = (value, character = ".") =>
  String(value).replace(/\B(?=(\d{3})+(?!\d))/g, character);

export const formatMoneyK = (value) => {
  if (value >= 1000 && value < 1000000) {
    const _value = value / 1000;
    return _value + "K";
  } else if (value >= 1000000) {
    const _value = value / 1000000;
    return _value + "M";
  } else if (value < 1000) {
    return value;
  }
};
