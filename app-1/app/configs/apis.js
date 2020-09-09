
import Axios from 'axios'

export default apis = {
    register(username, password) {
        return Axios.post('register-user', { username, password })
    },
    getItemFoot(search) {
		return Axios.get('api/get-food-search/'+search)
	},
    getSport() {
		return Axios.get('api/get-sport')
	},
	getPostById(id) {
		return Axios.get('api/get-port-id/'+id)
	},
	getSportPhone(phone) {
		return Axios.get('api/get-sport-phone/'+phone)
	},
    count(phone) {
		return Axios.get('api/count/'+phone)
	},
    saveAlert(phone, du, bosung, thaydoi) {

        return Axios.post('save-alert', { phone, du, bosung, thaydoi })
    },
	getCreateFood(phone) {

        return Axios.get('get-create-food/'+phone)
    },
	deleteCreateFood(id) {

        return Axios.post('delete-create-food', { id })
    },		
    stepone(name, old, _height, _weight, sex, phone, mangthai) {
        return Axios.post('register-user-step-one', { name, old, _height, _weight, sex, phone, mangthai })
    },
	
	editChart(id, content) {
		return Axios.post('api/edit-chart', {id, content})
	},
	deleteChart(id) {
		
		return Axios.post('api/delete-chart', {id : id})
	},
	getPost() {
		return Axios.get('get-post')
	},
	getTop() {
		return Axios.get('get-top')
    },
	search(phone, search) {
		return Axios.post('api/search-user', { phone, search })
    },
	getInfoMenu(id) {
		return Axios.get('api/get-menu-info/'+id)
	},
	changeName(id, name) {
		return Axios.post('api/change-name', { id, name })
	},
	deleteFriend(id) {
		return Axios.post('api/delete-friend', { id })
	},
	deleteGroup(id) {
		return Axios.post('api/delete-group', { id })
	},
	getItemMenu(phone) {
		return Axios.post('api/get-menu-item', { phone })
    },	
	getItemMenuGroup(phone) {
		return Axios.post('api/get-menu-item-group', { phone })
    },	
	addFriend(phone, phone_friend) {
		return Axios.post('api/add-friend', { phone, phone_friend })
    },	
	listGroup(phone) {
		return Axios.get('api/list-group/'+phone)
	},
	listFood() {
		return Axios.get('api/list-food/')
	},
	getFood(phone) {
		return Axios.get('api/get-food/'+phone)
	},
	listFoodPhoneType(phone, category, type) {
		return Axios.get('api/list-food-get-type/'+phone+'?category='+category+'&type='+type)
	},
	listFoodPhone(phone) {
		return Axios.get('api/list-food-get/'+phone)
	},
	saveItem(text_, phone) {
		return Axios.post('api/save-item', { text_, phone })
	},
	getHeavy(phone, type) {
		
		return Axios.get('api/get-heavy/'+phone+'/'+type)
	},
	saveHeavy(phone, type, val) {
		return Axios.post('api/save-heavy', { phone, type, val })
	},
	getMenu(phone) {
		return Axios.post('api/get-menu', { phone})
	},
	getMenuTypeCategory(phone, type, type_g) {
		
		return Axios.post('api/get-menu-type', { phone, type: type, type_g: type_g})
	},
	saveItemCustom(phone, type, val) {
		
		return Axios.post('api/save-item-custom', { phone, type, val})
	},
	getMenuType(phone, type) {
		return Axios.post('api/get-menu-type', { phone, type: type})
	},
	getMenuGroup(phone, type) {
		return Axios.post('api/get-menu', { phone, type })
	},
	getMenuExtra(phone) {
		return Axios.post('api/get-menu-extra', { phone })
	},
	saveFoodTow(text_, phone) {
		return Axios.post('api/save-food-tow', { text_, phone })
	},
	saveFood(text_, phone) {
		return Axios.post('api/save-food', { text_, phone })
	},
	saveMenu(text_, phone, type, yeuthich) {
		return Axios.post('api/save-menu', { text_, phone, type, yeuthich })
	},
	saveMenuTow(text_, phone, type, yeuthich) {
		return Axios.post('api/save-menu-tow', { text_, phone, type, yeuthich })
	},
	saveMenuGroup(text_, phone, type, key_, id, type_) {
		return Axios.post('api/save-menu-group', { text_, phone, type, key_, id, type_ })
	},
	getAll(phone) {
		return Axios.get('api/get-config/'+phone)
	},
	acceptFriend(id) {
		return Axios.post('api/accept-friend', { id })
	},
	shareFriend(id) {
		return Axios.post('api/share-friend', { id })
	},
	denyFriend(id) {
		return Axios.post('api/deny-friend', { id })
	},
	deleteFriendGroup(phone, id) {
		return Axios.post('api/delete-friend-group', { phone, id })
   
	},
	addGroup(group, phone) {
		return Axios.post('api/add-group', { group, phone })
    },
	editDinhduong(phone, dinhduong, tee) {
        return Axios.post('api/edit-dinh-duong', { phone, dinhduong, tee })
    },
	forgot(username, password, height, current_job) {
		return Axios.post('api/forgot-password', {username, password, height, current_job})
	},
	edit(name, old, _height, _weight, sex, phone, current_job, disease, current_sport, playId, mangthai, cannang ) {
        return Axios.post('api/edit-user', { name, old, _height, _weight, sex, phone, current_job, disease, current_sport, playId, mangthai, cannang })
    },
	stepfive(current_job, disease, current_sport, activity, minutes, phone, wish, _w) {
		return Axios.post('register-user-step-five', { current_job, disease, current_sport, activity, minutes, phone, wish, _w })
	},
	stepsix(current_job, disease, current_sport, activity, minutes, phone, wish, _w, dinhduong) {
		return Axios.post('register-user-step-six', { current_job, disease, current_sport, activity, minutes, phone, wish, _w, dinhduong })
	},
	stepthree(current_job, disease, current_sport, activity, minutes, phone, wish, _w) {
        return Axios.post('register-user-step-three', { current_job, disease, current_sport, activity, minutes, phone, wish, _w })
    },
	setGroup(id, items) {
		return Axios.post('api/set-group', { id, items })
    },
	appectFriend(phone, phone_friend) {
        return Axios.post('api/appect-friend', { phone, phone_friend })
    },
	login(username, password) {
        return Axios.post('api/login', { username, password })
    },
    steptow(phone) {
        return Axios.get('api/get-alert/'+phone)
    },
	getListUser(phone) {
        return Axios.get('api/list-friend/'+phone)
    },
}