let queue = Promise.resolve();

export function enqueue(task: () => Promise<any>) {
  let result = queue.then(task);
  queue = result.catch(() => {});
  return result;
}
