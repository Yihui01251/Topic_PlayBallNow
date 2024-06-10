# 現在想打球
這是一個為常打羽球、排球的用戶設計的報名網站。
## 特色 
1. 簡單的報名流程
2. 多重篩選貼文
3. 團主和球友的雙向回饋
4. 即時管理打球行程

## 目錄
- [探索頁功能](#探索頁功能index.html)
- [篩選貼文頁功能](#篩選貼文頁功能filterPosts.html)
- [我的收藏頁功能](#我的收藏頁功能myCollect.html)
- [更多貼文頁功能](#更多貼文頁功能More-postsArea.html)
- [發文找人頁](#發文找人頁publicationForm.html)
- [我的貼文頁](#我的貼文頁myPostList.html)
- [行程頁](#行程頁notice.html)
- [個人頁](#個人頁personal.html)
- [編輯資料頁](#編輯資料頁register.html)

## 探索頁功能index.html
- 改打羽/排球按鈕 -> 切換成羽/排球樣式和羽/排球貼文資料
- 我的收藏按鈕 -> 連結到我的收藏頁
- 更改表單選項(改變縣市會改變地區的選項) -> 送出按鈕 -> 儲存篩選條件 -> 連結到篩選貼文頁
- 本日貼文、本週貼文區可托拽輪播
- 本日貼文、本週貼文區的更多按鈕 -> 儲存類別(羽/排) -> 連結更多貼文頁面
- **多重篩選tags** : 點擊貼文區標籤 -> 篩選貼文
- **報名流程** : *判斷此貼文的狀態*
  1. 未報名: 報名按鈕-> 彈出報名元件 -> 取得*團主資料* -> 確認報名按鈕 -> *旋轉*彈出報名審核中通知
  2. 臨打  : 報名按鈕-> 彈出查看貼文元件(臨打) -> 取消行程按鈕 -> 彈出確認取消元件 -> 確認取按鈕 -> 顯示取消中 -> 關閉元件
  3. 團主  : 報名按鈕-> 彈出查看貼文元件(團主) -> 取得此貼文報名者和取消者資料
     - 點擊報名者 -> 已讀狀態(new提示消失) -> 彈出審核報名元件  -> 同意報名或婉拒按鈕 -> 顯示審核狀態 -> 關閉回到此查看貼文元件(團主) -> 關閉元件
     - 點擊取消者 -> 已讀狀態(new提示消失) -> 彈出審核取消元件 -> 同意取消或婉拒 -> 顯示審核狀態 -> 關閉回到此查看貼文元件(團主) -> 關閉元件

## 篩選貼文頁功能filterPosts.html
- **貼文多重篩選** : 載入時取得篩選條件 -> 篩選貼文
- 返回按鈕 -> 回到首頁
- 重新篩選 : 顯示篩選條件按鈕-> 彈出篩選表單 -> 更改表單選項(改變縣市會改變地區的選項) -> 重新篩選按鈕 -> 改變篩選條件並篩選
- 顯示篩選條件數目
- 顯示符合篩選條件的資料筆數
- 報名流程 : 同上

## 我的收藏頁功能myCollect.html
- 載入時判斷此使用者有收藏的貼文資料
- 報名流程: 報名按鈕 -> 彈出報名元件 -> 取得團主名 -> 確認報名按鈕 -> 彈出報名審核中通知 -> 關閉元件

## 更多貼文頁功能More-postsArea.html
- 載入時取得儲存類別 -> 判斷要map的資料和樣式
- 顯示篩選條件按鈕 -> 彈出篩選表單 -> 更改表單選項(改變縣市會改變地區的選項) -> 重新篩選按鈕 -> 儲存篩選條件 -> 連結到篩選貼文頁 

## 發文找人頁publicationForm.html
- *更改表單選項會即時更新預覽*
- 打羽球/打排球按鈕 -> 改變樣式、改變預覽顯示的資訊、改變表單中類型和程度的選項
- 我的貼文按鈕 -> 連結到我的貼文頁

## 我的貼文頁myPostList.html
- map此使用者發文資料
- 彈出團主查看行程元件 -> 流程同上

## 我的行程頁notice.html
- 未來行程按鈕
  - 顯示此使用者所有未來打球行程 -> 判斷是團主還是臨打改變行程元件樣式和元件連結
    - 臨打 : 彈出查看貼文元件(臨打) -> 取消行程按鈕 -> 彈出確認取消元件 -> 確認取按鈕 -> 顯示取消中 -> 關閉元件
    - 團主 : 彈出查看貼文元件(團主) -> 同上
    - 取消 : 彈出查看貼文元件(取消) -> 關閉元件
  - 主辦按鈕 -> 自己發文的貼文
  
- 過去紀錄按鈕
  - 顯示此使用者所有過去打球行程 -> 判斷是團主還是臨打改變行程元件樣式和元件連結
    - 臨打 : 彈出臨打回饋元件 -> 判斷回饋狀態:
      1.已回饋 : 只顯示關閉按鈕 -> 關閉元件
      2.未回饋 : 選擇評價標籤 ->  送出按鈕 -> 關閉元件 -> `行程元件`改為已評價
    - 團主 : 彈出團主評價元件 -> 取得本則貼文臨打者資料 -> 判斷評價狀態:
      1.已評價 : 彈出團主表單元件(顯示已評價) -> 關閉
      2.未評價 : 彈出團主表單元件 -> 送出按鈕 -> 顯示已評價/已加入黑名單 -> 關閉元件回到團主評價元件 -> 狀態改為已評價 -> 關閉元件

### 個人頁personal.html
*載入時判斷是否註冊過*
- 未註冊 : 顯示未註冊狀態 -> Line登入按鈕 -> 連結到編輯資料頁
- 已註冊 : 取得使用者資料並顯示
  
### 編輯資料頁register.html
- 送出按鈕 -> 改變儲存的使用者資料
  
## 聯繫方式
如果有任何問題，可以通過以下方式聯繫：
負責前端開發: *詹怡慧*
- 電子郵件: ciuhyi@gmal.com
- GitHub: [Yihui01251](https://github.com/Yihui01251)
負責UI設計 : *吳華梵*
負責UX設計和撰寫json、部分RWD : *黃靖雯*
