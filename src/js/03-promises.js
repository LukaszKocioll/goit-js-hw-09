function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const firstDelay = parseInt(form.elements.delay.value);
    const delayStep = parseInt(form.elements.step.value);
    const amount = parseInt(form.elements.amount.value);

    for (let i = 0; i < amount; i++) {
      const currentDelay = firstDelay + i * delayStep;
      createPromise(i, currentDelay)
        .then(({ position, delay }) => {
          console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        })
        .catch(({ position, delay }) => {
          console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        });
    }
  });
});
