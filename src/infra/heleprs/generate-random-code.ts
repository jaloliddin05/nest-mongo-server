const generateRandomCode = (length:number) => {
    const randomNumbers = [];
    for (let i = 0; i < length; i++) {
      const randomNumber = Math.floor(Math.random() * (9 - 1 + 1)) + 1;
      randomNumbers.push(randomNumber);
    }
    return randomNumbers.join("");
}

export default generateRandomCode