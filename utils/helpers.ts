export function getTimeDifference(dateInput: Date): string {
    const givenDate = new Date(dateInput);
    const now = new Date();

    const diffMs = Math.abs(now.getTime() - givenDate.getTime());

    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    if (diffDays >= 1) {
        return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    }

    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    if (diffHours >= 1) {
        return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    }

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    if (diffMinutes >= 1) {
        return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    }

    const diffSeconds = Math.floor(diffMs / 1000);
    return `${diffSeconds} second${diffSeconds !== 1 ? 's' : ''} ago`;
}
