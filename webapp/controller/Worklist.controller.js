/*global location history */
sap.ui.define([
  "zjblessons/ControlTaskSidorovich/controller/BaseController",
  "sap/ui/model/json/JSONModel",
  "zjblessons/ControlTaskSidorovich/model/formatter",
  "sap/ui/model/Filter",
  "sap/ui/model/FilterOperator",
  		"sap/m/MessageBox"

], function (BaseController, JSONModel, formatter, Filter, FilterOperator, MessageBox) {
  "use strict";

  return BaseController.extend("zjblessons.ControlTaskSidorovich.controller.Worklist", {

    onInit: function () {
    					var oViewModel;
    		oViewModel = new JSONModel({
					 sID: 0
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

onItemSelect: function(oEvent) {
    var context = this;
    const oTable = this.byId("persoTable"); 
    const aSelectedIndices = oTable.getSelectedIndices(); 

    if (aSelectedIndices.length > 0) {
        const iSelectedIndex = aSelectedIndices[0]; 
        const oSelectedItem = oTable.getContextByIndex(iSelectedIndex); 

        if (oSelectedItem) {
        	context.getModel('worklistView').setProperty('/sID', oSelectedItem.getProperty("MaterialID"));

        }
    } else {
        alert("Нет выбранных элементов");
    }
},
onShow: function(oEvent      ){
	    var context = this;

	MessageBox.confirm(this.getResourceBundle().getText("MaterialID"), {
				title: context.getModel('worklistView').getProperty('/sID'),                                    
    			actions: [sap.m.MessageBox.Action.OK,
            	sap.m.MessageBox.Action.CANCEL],         
    			emphasizedAction: sap.m.MessageBox.Action.OK,
    			onClose: function(oAction){
					if(oAction === sap.m.MessageBox.Action.OK) {
						this.getModel().remove(key,
						{
							success: function(oData){
							var msg = this.getResourceBundle().getText("successDelete");
							MessageToast.show(msg);
							}.bind(this)
						});
					}
				}.bind(this)
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
