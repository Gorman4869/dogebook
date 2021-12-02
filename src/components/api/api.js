// 获取章节内容(根据章节获取内容)
import axios from 'axios'
// export function chapterContent (link) {
//   return axios.get(`/content/chapter/${link}`)
// }
// 获取书籍源 这里可能会有两个书籍源，用第一个就好了。
export function book(id) {
  return axios.get(`book-sources?view=summary&book=${id}`)
}
// 获取目录列表 获取书籍章节列表
export function bookMulu(id) {
  return axios.get(`book-chapters/${id}`)
}
// 获取章节内容 link需要解码
export function bookContent(link) {
  return axios.get(`chapters/${link}`)
}
//获取作者名下的书籍
export function authorBooks(name) {
  return axios.get(`author-books?author={${name}}`)
}
// 获取书籍相关推荐 bookid
export function  recommendBookList(id) {
  return axios.get(`recommend/${id}`)
}
// 书籍信息 详情
export function bookDetail(id) {
  return axios.get(`book-info/${id}`)
}
// 评论
export function bookComment(id) {
  return axios.get(`book/reviews?book=${id}`)
}
// 分类
export function bookcly() {
  return axios.get(`categories`)
}
// 获取分类详情
export function bookclyinfo(gender, type, major, minor, start, limit) {
  return axios.get(`category-info?gender=${gender}&type=${type}&major=${major}&minor=${minor}&start=${start}&limit=${limit}`)
}
// 获取分类（带子类）
export function bookclylist() {
  return axios.get(`sub-categories`)
}
// 获取排行榜  排名分类
export function bookRank() {
  return axios.get(`rank-category`)
}
// 获取排行榜 分类书籍  排名分类的id
export function bookRanks(id) {
  return axios.get(`rank/${id}`)
}

// 搜索热词
export function hotWord() {
  return axios.get(`search-hotwords`)
}


// 热门搜索
export function hotBook() {
  return axios.get(`hot-books`)
}

// 自动补全
export function search(key) {
  return axios.get(`auto-complete?query=${key}`)
}
// 搜索结果
export function searchresult(keyword) {
  return axios.get(`search?keyword=${keyword}`)
}


