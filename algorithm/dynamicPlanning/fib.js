/**
 * @desc 斐波那契数列 #509
 * F(N) = F(N-1) + F(N-2)
 * fib1(100)的时候就会有卡顿，fib2(1000)可以很轻松的计算出来
 */

// 递归调用，缺点是会有重复计算
// 比如 fib(10)  计算fib(11) fib(12)都需要计算fib(10)
function fib1(N) {
  if (N <= 1) return N
  return fib1(N - 1) + fib1(N - 2)
}

// 做一个缓存，把计算结果保存下来
function fib2(N) {
  let dp = [0, 1]
  for (let i = 2; i <= N; i++) {
    dp[i] = dp[i - 1] + dp[i - 2]
  }
  return dp[N]
}