export interface IUserPreferences {
	receiveNotifications?: boolean;
	submitAfterLoading?: boolean;
	isSidebarCollapsed?: boolean;
	isSettingsOpen?: boolean;

	showMyLocation?: boolean;
	shareProfileAsPublic?: boolean;
	allowNotifications?: boolean;
	shareWhatsAppId?: boolean;
	shareSkypeId?: boolean;
	shareTwitterId?: boolean;
	shareFacebookId?: boolean;
	dateFormat?: string;
	timezoneId?: string;
	utcOffset?: string;
	coverPhoto?: string;
	avatar?: string;
	favoriteCityId?: string;
	targetCountry?: string;
}
