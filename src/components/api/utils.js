import _ from 'lodash'
const localStorage = window.localStorage;

export function getLocalData(item) {
	return _.isEmpty(JSON.parse(localStorage.getItem(item)))? {} : JSON.parse(localStorage.getItem(item));
  }

export function setLocalData(item,obj) {
	if(!item)return
		localStorage.setItem(item, JSON.stringify(obj))
  }