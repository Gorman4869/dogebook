import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
let state ={
	bookInfo: {},
  bookcrack:{},//是否在书架的状态
  sourceId:'',
  usercolor:"#c4b395",
  userfont:12,
  headtitle:'真相永远只有一个'
 
}
let mutations ={
  setSourceId(state,sourceId){
    state.sourceId = sourceId 
    // console.log(state.sourceId)
  },
  setBook(state,book){
    state.bookInfo = book
    
  },
  setBookcrack(state,bookcrack){
    state.bookcrack = bookcrack
  },
  setHeadTitle(state,headtitle){
    state.headtitle = headtitle
  },
  setColor(state,color){
    state.usercolor = color

  },
  setFont(state,font){
    state.userfont = font

  }
}

export default new Vuex.Store({
  state,
  mutations,
  // mutationsType,
  // getters
})
