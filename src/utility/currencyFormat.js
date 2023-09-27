const currencyFormat = new Intl.NumberFormat("fa-IR", {
  style: "currency",
  currency: "IRR",
  maximumFractionDigits: 2,
});

export const commaMoney = (money) => {
  return currencyFormat.format(money);
};
