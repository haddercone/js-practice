const dummyApi = () => {
  let count = 0;
  return function () {
    return new Promise((resolve, reject) => {
      let val = parseInt(Math.random() * 1000);
      setTimeout(() => {
        count++;
        resolve(count);
      }, val);
    });
  };
};

const fn = dummyApi();
const promises = [fn(), fn(), fn(), fn()];

const promiseAllPolyfill = (promises) => {
  return new Promise((resolve, reject) => {
    const results = new Array(promises.length);
    let completedPromises = 0;

    promises.forEach((promise, index) => {
      promise
        .then((data) => {
          results[index] = data;
          completedPromises++;
          if (completedPromises === promises.length) {
            resolve(results);
          }
        })
        .catch((err) => {
          reject(err);
        });
    });
  });
};

// promiseAllPolyfill(promises)
//   .then((data) => console.log(data))
//   .catch((err) => console.log(err));

const promiseRacePolyfill = (promises) => {
  return new Promise((resolve, reject) => {
    promises.forEach((promise) => {
      promise.then(resolve).catch(reject);
    });
  });
};

// promiseRacePolyfill(promises)
//   .then(data => console.log(data))
//   .catch(err => console.log(err))

const promiseAnyPolyfill = (promises) => {
    if(!Array.isArray(promises)) {
        throw new TypeError(`${typeof promises} is not iterable`);
    }
    if(promises.length === 0) {
        throw new AggregateError(['ERROR'], "All promises have failed")
    }
  return new Promise((resolve, reject) => {
    let rejectedPromises = 0;
    const errors = [];
    promises.forEach((promise, index) => {
      promise.then(resolve).catch((err) => {
        errors[index] = err;
        rejectedPromises++;
        if (rejectedPromises === promises.length) {
          reject(new AggregateError(errors, "All promises were rejected"));
        }
      });
    });
  });
};

promiseAnyPolyfill()
  .then((data) => console.log(data))
  .catch((err) => console.log(err));
