/*!
 * @author liwei
 */


define(function() {
	'use strict';

	var base = require('./base');

	var IS_SESSION_STORAGE_AVAILABLE = base.isStorageAvailable( 'sessionStorage' );

	/**
	 * 设置一个 storage
	 * @param {String} sKey   键名
	 * @param {String} sValue 键值
	 */
	function set( sKey, sValue ) {
		if ( IS_SESSION_STORAGE_AVAILABLE ) {

			sessionStorage.setItem( sKey, sValue );
		}
	}

	/**
	 * 获取 storage
	 * @param  {String} sKey 键名
	 * @return {String}      键值
	 */
	function get( sKey ) {
		if ( IS_SESSION_STORAGE_AVAILABLE ) {

			return sessionStorage.getItem( sKey );
		}
	}

	/**
	 * 清除所有 storage
	 */
	function clear() {
		if ( IS_SESSION_STORAGE_AVAILABLE ) {
			
			sessionStorage.clear();
		}
	}

	/**
	 * 删除一个 storage
	 * @param  {String} sKey 键名
	 */
	function remove( sKey ) {
		if ( IS_SESSION_STORAGE_AVAILABLE ) {

			sessionStorage.removeItem( sKey );
		}
	}

	return {
		set: set,
		get: get,
		clear: clear,
		remove: remove
	};
});