/*global location history */
sap.ui.define([
  "zjblessons/ControlTaskSidorovich/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "zjblessons/ControlTaskSidorovich/model/formatter",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator"
], function (BaseController, JSONModel, formatter, Filter, FilterOperator) {
  "use strict";

  return BaseController.extend("zjblessons.ControlTaskSidorovich.controller.Worklist", {

    onInit: function () {
    					var oViewModel;
    		oViewModel = new JSONModel({
					
				});
				this.setModel(oViewModel, "worklistView");

      this._bindTable();
    },

    _bindTable: function () {
      var oTable = this.byId("persoTable");

      oTable.bindRows({
        path: "/zjblessons_base_Materials",
        parameters: {
          $select: "MaterialID,Rating,Created"
        },
        events: {
          dataRequested: function () {
            sap.ui.core.BusyIndicator.show();
          },
          dataReceived: function () {
            sap.ui.core.BusyIndicator.hide();
          }
        }
      });
    },
    onFilterChange: function(oEvent) {
    const sFilter = oEvent.getParameter("value"); 
    const oTable = this.byId("persoTable"); 

    if (!sFilter) {
        oTable.getBinding("rows").filter([]);
    }
    const aFilter = [];
			
				aFilter.push(new Filter("MaterialID", sap.ui.model.FilterOperator.Contains, sFilter));
			

    oTable.getBinding("rows").filter(aFilter);
},


    onItemSelect(oEvent){
				const oSelectedItem = oEvent.getParameter('listItem'),
					sHeaderID = oSelectedItem.getBindingContext().getProperty('MaterialID');
					this.getRouter().navTo("object", {
					objectId: sObjectID
				});
			},

    openPersoDialog: function (oEvt) {
      const oTable = this.byId("persoTable");
      sap.ui.require(["sap/m/p13n/Engine"], function (Engine) {
        Engine.getInstance().show(oTable, ["Columns", "Sorter"], {
          contentHeight: "35rem",
          contentWidth: "32rem",
          source: oEvt.getSource()
        });
      });
    },

    onColumnHeaderItemPress: function (oEvt) {
      const oTable = this.byId("persoTable");
      const sPanel = oEvt.getSource().getIcon().indexOf("sort") >= 0 ? "Sorter" : "Columns";
      sap.ui.require(["sap/m/p13n/Engine"], function (Engine) {
        Engine.getInstance().show(oTable, [sPanel], {
          contentHeight: "35rem",
          contentWidth: "32rem",
          source: oTable
        });
      });
    }
  });
});
