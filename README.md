# ReactHigher Order Componentsを実装
- 完成イメージ

### ▪️PC
![PC](img/pc.gif "1")

### ▪️SP
![SP](img/pc.gif "1")


## firebase連携
```
{
  "rules": {
    ".read": "auth != null",
    ".write": "auth != null"
  }
}

↓　//下記に変更
{
  "rules": {
    ".read": "true",
    ".write": "true"
  }
}
```
## Axiosをインストール

- `npm install --save axios`
- フォルダ直下に`axios-orders`を作成する

```js
import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://react-buger-be17f.firebaseio.com/'
});

export default instance;
```
