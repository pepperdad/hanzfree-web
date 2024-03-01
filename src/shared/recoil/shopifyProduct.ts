import { atom } from 'recoil';

import { uniqueId } from 'lodash';

export const shopifyProductState = atom<any>({
  key: `shopifyProduct/${uniqueId}`, // 각 atom의 고유한 키
  default: {},
});
