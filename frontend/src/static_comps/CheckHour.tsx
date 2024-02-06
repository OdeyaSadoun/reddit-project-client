export function getGreeting() {
    const now = new Date();
    const hour = now.getHours();
  
    if (hour >= 5 && hour < 12) {
      return "Good morning, ";
    } else if (hour >= 12 && hour < 18) {
      return "Good afternoon,";
    } else if (hour >= 18 && hour < 24) {
      return "Good evening,";
    } else {
      const isFriday = now.getDay() === 6;
      if (isFriday && hour < 18) {
        return "Almost Shabbat Shalom,";
      } else {
        return "Good night,";
      }
    }
}
