import {get,set} from 'idb-keyval';
export const loadDB=()=>get('gramsetu-v1');
export const saveDB=data=>set('gramsetu-v1',data);
