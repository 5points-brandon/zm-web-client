/*
 * ***** BEGIN LICENSE BLOCK *****
 * Version: ZPL 1.1
 * 
 * The contents of this file are subject to the Zimbra Public License
 * Version 1.1 ("License"); you may not use this file except in
 * compliance with the License. You may obtain a copy of the License at
 * http://www.zimbra.com/license
 * 
 * Software distributed under the License is distributed on an "AS IS"
 * basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See
 * the License for the specific language governing rights and limitations
 * under the License.
 * 
 * The Original Code is: Zimbra Collaboration Suite.
 * 
 * The Initial Developer of the Original Code is Zimbra, Inc.
 * Portions created by Zimbra are Copyright (C) 2005 Zimbra, Inc.
 * All Rights Reserved.
 * 
 * Contributor(s):
 * 
 * ***** END LICENSE BLOCK *****
 */

/**
* Creates an address book tree controller.
* @constructor
* @class
* This class is a controller for the tree view used by the address book 
* application. This class uses the support provided by ZmOperation. 
*
* @author Parag Shah
* @param appCtxt	[ZmAppCtxt]		main (singleton) app context
* @param type		[constant]		type of organizer we are displaying/controlling
* @param dropTgt	[DwtDropTgt]	drop target for this type
*/
function ZmAddrBookTreeController(appCtxt, type, dropTgt) {
	if (arguments.length === 0) return;

	type = type || ZmOrganizer.ADDRBOOK;
	dropTgt = dropTgt || (new DwtDropTarget(ZmContact));

	ZmTreeController.call(this, appCtxt, type, dropTgt);

	this._listeners[ZmOperation.NEW_ADDRBOOK] = new AjxListener(this, this._newListener);
	this._listeners[ZmOperation.RENAME_FOLDER] = new AjxListener(this, this._renameListener);
	this._listeners[ZmOperation.EDIT_PROPS] = new AjxListener(this, this._editPropsListener);
	this._listeners[ZmOperation.SHARE_ADDRBOOK] = new AjxListener(this, this._shareAddrBookListener);
};

ZmAddrBookTreeController.prototype = new ZmFolderTreeController();
ZmAddrBookTreeController.prototype.constructor = ZmAddrBookTreeController;


// Public methods

ZmAddrBookTreeController.prototype.toString = 
function() {
	return "ZmAddrBookTreeController";
};

// Enables/disables operations based on the given organizer ID
ZmAddrBookTreeController.prototype.resetOperations = 
function(parent, type, id) {
	parent.enableAll(true);

	var addrBook = this._dataTree.getById(id);
	if (addrBook && addrBook.isSystem()) {
		parent.enable([ZmOperation.DELETE, ZmOperation.MOVE, ZmOperation.RENAME_FOLDER], false);
	}
};


// Protected methods

// Returns a list of desired header action menu operations
ZmAddrBookTreeController.prototype._getHeaderActionMenuOps =
function() {
	return [ZmOperation.NEW_ADDRBOOK];
};

// Returns a list of desired action menu operations
ZmAddrBookTreeController.prototype._getActionMenuOps =
function() {
	var ops = [];
	if (this._appCtxt.get(ZmSetting.SHARING_ENABLED)) {
		ops.push(ZmOperation.SHARE_ADDRBOOK);
	}
	ops.push(ZmOperation.DELETE, ZmOperation.MOVE, ZmOperation.RENAME_FOLDER, ZmOperation.EDIT_PROPS);
	return ops;
};

/*
* Returns a title for moving a folder.
*/
ZmAddrBookTreeController.prototype._getMoveDialogTitle =
function() {
	return AjxMessageFormat.format(ZmMsg.moveAddrBook, this._pendingActionData.name);
};

// Returns the dialog for organizer creation
ZmAddrBookTreeController.prototype._getNewDialog = 
function() {
	return this._appCtxt.getNewAddrBookDialog();
};


// Listeners

ZmAddrBookTreeController.prototype._editPropsListener = 
function(ev) {
	// TODO
	DBG.println("TODO: editPropsListener");
};

ZmAddrBookTreeController.prototype._shareAddrBookListener = 
function(ev) {
	// TODO
	DBG.println("TODO: share address book");
};


/*
* Called when a left click occurs (by the tree view listener). The folder that
* was clicked may be a search, since those can appear in the folder tree. The
* appropriate search will be performed.
*
* @param folder		ZmOrganizer		folder or search that was clicked
*/
ZmAddrBookTreeController.prototype._itemClicked =
function(folder) {
	DBG.println("-----------------------");
	DBG.println("-----------------------");
	DBG.println("XXX: RUNNING SEARCH IS TEMPORARY UNTIL WE GET PROPER MODEL SUPPORT FOR MULTIPLE FOLDERS");
	DBG.println("-----------------------");
	DBG.println("-----------------------");
	var searchController = this._appCtxt.getSearchController();
	var types = searchController.getTypes(ZmItem.CONTACT);
	searchController.search({query:folder.createQuery(), types:types});
};
