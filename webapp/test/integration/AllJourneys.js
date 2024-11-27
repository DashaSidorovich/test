/*global QUnit*/

jQuery.sap.require("sap.ui.qunit.qunit-css");
jQuery.sap.require("sap.ui.thirdparty.qunit");
jQuery.sap.require("sap.ui.qunit.qunit-junit");
QUnit.config.autostart = false;

sap.ui.require([
	"sap/ui/test/Opa5",
	"zjblessons/ControlTaskSidorovich/test/integration/pages/Common",
	"sap/ui/test/opaQunit",
	"zjblessons/ControlTaskSidorovich/test/integration/pages/Worklist",
	"zjblessons/ControlTaskSidorovich/test/integration/pages/Object",
	"zjblessons/ControlTaskSidorovich/test/integration/pages/NotFound",
	"zjblessons/ControlTaskSidorovich/test/integration/pages/Browser",
	"zjblessons/ControlTaskSidorovich/test/integration/pages/App"
], function (Opa5, Common) {
	"use strict";
	Opa5.extendConfig({
		arrangements: new Common(),
		viewNamespace: "zjblessons.ControlTaskSidorovich.view."
	});

	sap.ui.require([
		"zjblessons/ControlTaskSidorovich/test/integration/WorklistJourney",
		"zjblessons/ControlTaskSidorovich/test/integration/ObjectJourney",
		"zjblessons/ControlTaskSidorovich/test/integration/NavigationJourney",
		"zjblessons/ControlTaskSidorovich/test/integration/NotFoundJourney"
	], function () {
		QUnit.start();
	});
});