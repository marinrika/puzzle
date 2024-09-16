function sortArray(arr: JSX.Element[]): JSX.Element[] {
  const newArr = [...arr];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArr[i], newArr[j]] = [newArr[j], newArr[i]];
  }
  return newArr;
}

export default sortArray;
