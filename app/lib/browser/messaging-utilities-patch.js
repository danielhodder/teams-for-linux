'use strict';

// Teams detects teams-for-linux as a web browser and tries to open a blank window and change its location later.
// This is daft, and doesn't work in electron. Just make it open the window.
exports = module.exports = () => {
	function patchMessagingUtilities() {
		global.teamspace.services.MessagingUtilities.prototype.openWindow = function(e) { this.$window.open(e, "_blank", "noopener"); }
	}
	if (global.teamspace && global.teamspace.services && global.teamspace.services.MessagingUtilities) {
		patchMessagingUtilities();
	} else {
		global.teamspace = global.teamspace || {};
		global.teamspace.services = global.teamspace.services || {};
		var messagingUtilities;
		Object.defineProperty(global.teamspace.services, 'MessagingUtilities', {
			configurable: true,
			enumerable: true,
			get() { return messagingUtilities; },
			set(newValue) { messagingUtilities = newValue; patchMessagingUtilities() }
		});
	}
};
