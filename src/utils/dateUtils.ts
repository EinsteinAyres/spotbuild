export const dateUtils = {
    formatTimeHM(date: Date): string {
        const hours = date.getHours().toString().padStart(2, '0');
        const minutes = date.getMinutes().toString().padStart(2, '0');
        return `${hours}:${minutes}`;
    },

    parseTimeHM(timeStr: string): Date | null {
        const [hourStr, minStr] = timeStr.split(':');
        const hour = Number(hourStr);
        const minute = Number(minStr);
        if (
            isNaN(hour) || isNaN(minute) ||
            hour < 0 || hour > 23 ||
            minute < 0 || minute > 59
        ) {
            return null;
        }
        const date = new Date();
        date.setHours(hour, minute, 0, 0);
        return date;
    },

    isTimePassed(timeStr: string): boolean {
        const now = new Date();
        const timeDate = this.parseTimeHM(timeStr);
        if (!timeDate) return false;
        return timeDate.getTime() <= now.getTime();
    },

    addDays(date: Date, days: number): Date {
        const newDate = new Date(date);
        newDate.setDate(newDate.getDate() + days);
        return newDate;
    },

    weeksToMilliseconds(weeks: number): number {
        return weeks * 7 * 24 * 60 * 60 * 1000;
    }
};
