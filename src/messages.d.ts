type BCX_beep_versionCheck = {
	version: string;
	devel: boolean;
	GameVersion: string;
	Source: string;
	UA: string;
};

type BCX_beep_versionResponse = {
	status: "unsupported" | "deprecated" | "newAvailable" | "current";
	supporterStatus?: BCXSupporterType;
	supporterSecret?: string;
};

type BCX_beeps = {
	versionCheck: BCX_beep_versionCheck;
	versionResponse: BCX_beep_versionResponse;
	supporterCheck: {
		memberNumber: number;
		status: BCXSupporterType;
		secret: string;
	};
	supporterCheckResult: {
		memberNumber: number;
		status: BCXSupporterType;
	};
	clearData: true;
};

type BCX_message_ChatRoomStatusEvent = {
	Type: string;
	Target: number | null;
};

/** BCX effects that should be visible to everyone in room */
interface BCX_effects {
	/** Any extra effects to be applied to character */
	Effect: string[];
}

type BCX_message_hello = {
	version: string;
	request: boolean;
	effects?: Partial<BCX_effects>;
	typingIndicatorEnable?: boolean;
	screenIndicatorEnable?: boolean;
	supporterStatus?: BCXSupporterType;
	supporterSecret?: string;
};

type BCX_message_query = {
	id: string;
	query: keyof BCX_queries;
	data?: any;
};

type BCX_message_queryAnswer = {
	id: string;
	ok: boolean;
	data?: any;
};

type BCX_messages = {
	ChatRoomStatusEvent: BCX_message_ChatRoomStatusEvent;
	hello: BCX_message_hello;
	goodbye: undefined;
	query: BCX_message_query;
	queryAnswer: BCX_message_queryAnswer;
	somethingChanged: undefined;
};

type BCX_logAllowedActions = {
	delete: boolean;
	configure: boolean;
	praise: boolean;
	leaveMessage: boolean;
};

type BCX_queries = {
	disabledModules: [undefined, import("./constants").ModuleCategory[]];
	commandHint: [string, [string, string][]];
	permissions: [undefined, PermissionsBundle];
	myAccessLevel: [undefined, import("./modules/authority").AccessLevel];
	editPermission: [{
		permission: BCX_Permissions;
		edit: "self" | "min";
		target: boolean | number;
	}, boolean];
	permissionAccess: [BCX_Permissions, boolean];
	rolesData: [undefined, PermissionRoleBundle];
	editRole: [
		{
			type: "owner" | "mistress";
			action: "add" | "remove";
			target: number;
		},
		boolean
	];
	logData: [undefined, import("./modules/log").LogEntry[]];
	logDelete: [number, boolean];
	logConfigGet: [undefined, import("./modules/log").LogConfig];
	logConfigEdit: [{
		category: BCX_LogCategory;
		target: import("./modules/log").LogAccessLevel;
	}, boolean];
	logClear: [undefined, boolean];
	logPraise: [
		{
			message: string | null;
			value: -1 | 0 | 1;
		},
		boolean
	];
	logGetAllowedActions: [undefined, BCX_logAllowedActions];
	curseItem: [
		{
			Group: string;
			curseProperties: boolean | null;
		},
		boolean
	];
	curseLift: [string, boolean];
	curseLiftAll: [undefined, boolean];
	curseBatch: [
		{
			mode: "items" | "clothes";
			includingEmpty: boolean;
		},
		boolean
	];
	conditionsGet: [ConditionsCategories, ConditionsCategoryPublicData<ConditionsCategories>];
	conditionSetLimit: [{
		category: ConditionsCategories;
		condition: string;
		limit: import("./constants").ConditionsLimit;
	}, boolean];
	conditionUpdate: [{
		category: ConditionsCategories;
		condition: string;
		data: ConditionsConditionPublicData;
	}, boolean];
	conditionCategoryUpdate: [{
		category: ConditionsCategories;
		data: ConditionsCategoryConfigurableData;
	}, boolean];
	ruleCreate: [BCX_Rule, boolean];
	ruleDelete: [BCX_Rule, boolean];
	rule_alt_allow_changing_appearance: [undefined, boolean];
	commandTrigger: [[BCX_Command, ...string[]], boolean];
};
