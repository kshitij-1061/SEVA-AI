const STORAGE_KEY_REPORT_COUNTER = "sevafix_report_counter";

export function generateReportId(existingReports: { id: string }[] = []): string {
  let highestNum = 1023; // Default base starting number so first user report becomes SF-1024

  // Check existing reports for any higher numerical suffix
  existingReports.forEach((r) => {
    const match = r.id.match(/^SF-(\d+)$/i);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > highestNum) {
        highestNum = num;
      }
    }
  });

  // Check LocalStorage saved counter
  try {
    const savedCounter = localStorage.getItem(STORAGE_KEY_REPORT_COUNTER);
    if (savedCounter) {
      const parsedCounter = parseInt(savedCounter, 10);
      if (parsedCounter > highestNum) {
        highestNum = parsedCounter;
      }
    }
  } catch (err) {
    console.error("Failed to read report ID counter from storage:", err);
  }

  const nextNum = highestNum + 1;

  try {
    localStorage.setItem(STORAGE_KEY_REPORT_COUNTER, nextNum.toString());
  } catch (err) {
    console.error("Failed to save report ID counter:", err);
  }

  return `SF-${nextNum}`;
}
