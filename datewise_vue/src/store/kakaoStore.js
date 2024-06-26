import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios';


export const useKakaoStore = defineStore('kakao', () => {
    const category_group_code = ref('CE7');
    const x = ref('127.05902969025047');
    const y = ref('37.51207412593136');
    const size = ref(3);
    const keyword = ref('');
    const recommendList = ref([]);
    const kakaoSearchList = ref([]);
  
    const setSearchData = (newCode, newX, newY) => {
        category_group_code.value = newCode;
        x.value = newX;
        y.value = newY;
        console.log('code', category_group_code.value);
        console.log('x', x.value);
        console.log('y', y.value);

    };

    const setSize = (newSize) => {
        size.value = newSize;
    };

    const setKeyword = (newKeyword) => {
      keyword.value = newKeyword;
      console.log('keyword', keyword);
    };

    const setSearchList = () => {
      kakaoSearchList.value = [];
    }

    const recommend = async () => {
      try {
          if (category_group_code.value == "") {
            category_group_code.value = "CE7"
          }
          
          const data = {
            "category_group_code" : category_group_code.value,
            "x": x.value,
            "y": y.value,
            "size" : size.value
          };
          const response = await axios.get("https://dapi.kakao.com/v2/local/search/category.json", {
            params : data,
            headers : {
              'Content-Type': 'application/json',
              "Authorization" : 'KakaoAK cb8c6c7d8d8e084e5b0b35ddc4b64b78',
              },
            }
          );
          
          if (response.status == 200) {
            recommendList.value = response.data.documents;  
          }
      } catch(e) {
        console.log("error", e);
      }
    };

    const search = async () => {
      try {
          const data = {
            "query" : keyword.value,
            "x" : "127.0733985",
            "y" : "37.5481533",
            "size" : 5
          };
          const response = await axios.get("https://dapi.kakao.com/v2/local/search/keyword.json", {
            params : data,
            headers : {
              'Content-Type': 'application/json',
              "Authorization" : 'KakaoAK cb8c6c7d8d8e084e5b0b35ddc4b64b78',
              },
            }
          );
          
          if (response.status == 200) {
            kakaoSearchList.value = response.data.documents;
            console.log("kaka_search", kakaoSearchList.value);
          }
      } catch(e) {
        console.log("error", e);
      }
    };

    return { category_group_code, x, y, kakaoSearchList, recommendList,  recommend, setSearchData, setSize, setKeyword, search, setSearchList };
  }
);