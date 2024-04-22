// koa-compose

const app = {
  use(mid) {
    this.middleware.push(mid)
  },
  middleware: [],
}

app.use(async (ctx, next) => {
  console.log('mid1 enter')
  await next()
  // 利用 async / await 语法的特点，在中间件交出执行权后最终仍会回到这个的中间件，执行 await 后续的代码
  // Using the features of async/await syntax, after yielding control in the middleware, it will eventually return here to execute the code after await
  console.log('mid1 out')
})

app.use(async (ctx, next) => {
  console.log('mid2 enter')
  await asyncFunc(1000)
  await next()
  console.log('mid2 out')
})

app.use(async (ctx, next) => {
  console.log('mid3 enter')
  await asyncFunc(2000)
  await next()
  console.log('mid3 out')
})

function compose(middleware) {
  // 返回一个函数，等到需要的时候再执行
  // Return a function, to be executed when needed
  return function (ctx) {
    function dispatch(index) {
      if (index === middleware.length)
        return
      const mid = middleware[index]
      // koa 中间件中调用 next 方法，会交给下个中间件
      // In Koa middleware, calling the next method will pass control to the next middleware
      // 递归调用 dispatch
      // Recursively call dispatch
      // 因为中间件是一个 async 函数所以使用 Promise.resolve 包裹
      // Since middleware is an async function, wrap it with Promise.resolve
      return Promise.resolve(mid(ctx, () => dispatch(index + 1)))
    }
    dispatch(0)
  }
}

function asyncFunc(duration) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve()
    }, duration)
  })
}

const composedFunc = compose(app.middleware)
composedFunc({})
