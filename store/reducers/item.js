import {Image} from 'react-native';
import {ADD_ITEM} from '../types/item';

const initialState = {
  feedItems: [
    {
      owner: 'ปริญญา สีตะวัน',
      name: 'น้ำยา ส ร ร พ ร ส',
      images: [
        Image.resolveAssetSource(require('../../assets/img/drink2.jpg')).uri,
        Image.resolveAssetSource(require('../../assets/img/drink.jpg')).uri,
      ],
      tags: [
        {id: 21232, name: 'จ๊วดๆ'},
        {id: 55, name: 'เมาฟรี'},
        {id: 99, name: 'ลูกหมาป่า'},
        {id: 88, name: 'ยาวิเศษ'},
        {id: 77, name: 'Magic'},
      ],
      category: 'เครื่องดื่มเพื่อสุขภาพ',
      description: 'มาจ๊วดๆกันค้าบ',
    },
    {
      owner: 'Stamp Watcharin',
      name: 'กระเป๋าหนังแท้มือสอง ยี่ห้อ Chanel',
      images: [
        Image.resolveAssetSource(require('../../assets/img/bag.jpg')).uri,
      ],
      tags: [
        {id: 34, name: 'เครื่องใช้'},
        {id: 899, name: 'เสื้อผ้า'},
        {id: 678, name: 'สิ่งของทั่วไป'},
      ],
      category: 'ของใช้',
      description: 'ซื้อมาละมาขว้าง ขอแบ่งให้คนอยากดูหรู ดุรวย',
    },
  ],
};

export default function itemReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_ITEM:
      return {
        ...state,
        feedItems: [action.payload, ...state.feedItems],
      };
    default:
      return state;
  }
}