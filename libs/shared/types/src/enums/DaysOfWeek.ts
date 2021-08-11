export enum DaysOfWeek {
	Sunday = 1,
	Monday = 2,
	Tuesday = 4,
	Wednesday = 8,
	Thursday = 16,
	Friday = 32,
	Saturday = 64,
}

const validDays = DaysOfWeek.Sunday +
	DaysOfWeek.Monday +
	DaysOfWeek.Tuesday +
	DaysOfWeek.Wednesday +
	DaysOfWeek.Thursday +
	DaysOfWeek.Friday +
	DaysOfWeek.Saturday;

export const isValidDay = (day: DaysOfWeek) => (day & validDays) === day;
