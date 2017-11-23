import {get} from './index';

//获取分类

export function fetchUncerList(offset,limit,getAList) {
    return get(`/${getAList}?offset=${offset}&limit=${limit}`);
}
