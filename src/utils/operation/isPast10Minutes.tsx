const isPast10Minutes = (isoTime: string): boolean => {
  const inputTime: Date = new Date(isoTime);
  const now: Date = new Date();
  const diffInMs: number = now.getTime() - inputTime.getTime();
  return diffInMs >= 10 * 60 * 1000;
};
