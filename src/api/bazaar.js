import {get} from './index';

//获取分类
export function fetchMenuClassIf() {
    return get('/menuClassification');
}
