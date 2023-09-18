/* eslint-disable no-console */
import { publicInstance } from '..';
import { getTokenCookie } from '../cookieToken';
import { createAnonimCart } from './createAnonimCart';
import { getIndexAnonimCart } from './localeStorageCart';

export const getAnonimCartById = async () => {
  const anonimToken = getTokenCookie('anonim_token');
  const anonimCartId = getIndexAnonimCart();
  console.log(anonimCartId);
  if (!anonimCartId) await createAnonimCart();
  const { data } = await publicInstance.get(`/carts/${anonimCartId}`, {
    headers: {
      Authorization: `Bearer ${anonimToken}`,
    },
  });
  console.log(data);
  return data;
};
