const MILLISECONDS_IN_DAY = 86400000;

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US").format(new Date(value));
}

export function fromNowInDays(value: string) {
  const date = new Date(value);
  const now = new Date();
  const diff = date.getTime() - now.getTime();
  const diffInDays = Math.round(diff / MILLISECONDS_IN_DAY);

  return new Intl.RelativeTimeFormat("en", {
    style: "narrow",
  }).format(diffInDays, "days");
}
