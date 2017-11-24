import * as types from '../action-types'
/**
 * @param menuCover  封面图片
 * @param menuTitle  标题
 * @param menuCateStory  美食故事
 * @param foodMaterials[{material,num}]  食材  material 材料  num 材料数量
 * @param step[{img,content}]  步骤  img 路径  base64  content 描述
 * @param tips  小贴士
 * @param exclusive  独家发布
 *
 */
let initState={
    menuCover:"",
    menuTitle:"",
    menuCateStory:"",
    foodMaterials:[
        {
            material:"",
            num:""
        }
    ],
    step:[
        {
            img:"",
            content:""
        }
    ],
    tips:"",
    exclusive:false,
    classify:null,
    picture:"",
    time:null
};

export default function (state=initState,action){
    switch(action.type){
        case types.MENU_COVER: //封面图片
            return {
                ...state,menuCover:action.payload
            };

        case types.REMOVE_COVER: //删除封面图片
            return {
                ...state,menuCover:''
            };

        case types.MENU_TITLE: //标题
            return {
                ...state,menuTitle:action.payload
            };
        case types.MENU_CATE_STORE: //美食故事
            return {
                ...state,menuCateStory:action.payload
            };
        case types.ADD_MATERIAL: //增加食材
            return {
                ...state,foodMaterials:[...state.foodMaterials,action.payload]
            };
        case types.CHANGE_MATERIAL: //更改食材
            return {
                ...state,foodMaterials:action.payload
            };
        case types.ADD_STEP: //增加步骤
            return {
                ...state,step:[...state.step,action.payload]
            };

        case types.CHANGE_STEP_IMG: //更改步骤内容
            return {
                ...state,step:action.payload
            };

        case types.MENU_TIPS: //小贴士
            return {
                ...state,tips:action.payload
            };
        case types.MENU_EXCLUSIVE: //独家发布
            return {
                ...state,exclusive:action.payload
            };
        case types.DELETE_MENU: //删除菜单
            return initState;
        default:
        return state;
    }
}