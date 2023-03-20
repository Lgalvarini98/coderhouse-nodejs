process.on("message", ({ cant, max }) => {
  console.log(`Recibidos los parámetros: cant=${cant}, max=${max}`);

  const numbers = [];

  for (let i = 0; i < cant; i++) {
    const random = Math.floor(Math.random() * max) + 1;
    numbers.push(random);
  }

  process.send(numbers);
});
