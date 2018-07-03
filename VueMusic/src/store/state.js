//顺序：1.state  2.getters 3.mutation-types  4.mutation
import {playMode} from 'common/js/config'
//原始数据
const state = {
singer: {},
playing: false,
fullScreen: false,//全屏
playlist: [],//播放列表
sequenceList: [],
mode: playMode.sequence,//播放模式 顺序播放
currentIndex: -1,
}
export default state
