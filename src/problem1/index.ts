var sum_to_n_a = function (n: number) {
  // your code here
//   using calculation formula
  const result = (n * (n + 1)) / 2;
  return result;
};

var sum_to_n_b = function (n: number) {
  // your code here
//   using for loop
  let result = 0;
  for (let index = 1; index <= n; index++) {
    result += index;
  }
  return result;
};

var sum_to_n_c = function (n) {
  // your code here
//   using recursion
  if (n == 0) return 0;
  else return n + sum_to_n_c(n - 1);
};

