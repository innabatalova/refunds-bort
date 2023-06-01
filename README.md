# Refound-Bort
Interface on native HTML, CSS, JS.
Верстка интерфейса адаптивная на нативном HTML, CSS, JS, JQuery. Подключен FakeAPI для создания списка друзей.
Посмотреть сейчас https://iridescent-biscotti-6fd50b.netlify.app

# Technologies used
- JS
- JQuery
- Sass
- FakeAPI
-localStorage in Window

# Install and start
Запустить компиляцию sass. Запустить на локальном сервере.

# Link to layout
https://www.figma.com/file/Amrp5K0JZ3tWJpHUVcnbs6/Extego---%D0%9F%D0%BE%D1%87%D1%82%D0%B0-%D0%A0%D0%BE%D1%81%D1%81%D0%B8%D0%B8---%D0%B2%D0%BE%D0%B7%D0%B2%D1%80%D0%B0%D1%82-%D1%82%D0%BE%D0%B2%D0%B0%D1%80%D0%BE%D0%B2?type=design&node-id=2-10&t=7fxkxKzrDTct8zLA-0

# Link to deploy
https://iridescent-biscotti-6fd50b.netlify.app

# Working components
1. Ввод номера заказа - по 2 псевдо API со значениями от 1 до 100 для этого поля. По другим значениям выдает результат, что такой заказ не найден, и предлагает оставить заявку на поиск вручную. 
2. Ввод номера телефона - принимает любое значение, соответствующее формату номера мобильного.
3. Поле подтверждения по коду из смс либо можно по ссылке под input перейти на подтверждение по email. 
Поле подтверждения по коду из смс принимает как корректные значение из псевдо API вот эти:  92998-3874, 90566-7771, 59590-4157, 53919-4257, 33263, 23505-1337, 58804-1099, 45169, 76495-3109, 31428-2261 (все значение из поля "zipcode" вот отсюда https://jsonplaceholder-typicode-com.translate.goog/users?_x_tr_sl=en&_x_tr_tl=ru&_x_tr_hl=ru&_x_tr_pto=sc). В случае ввода некорректного значения остается на текущей страничке.
4. Далее выбор товаров для возврата, с проверкой чтобы была поставлена хотя бы одна галочка в чекбоксе. 
5. Проверка, есть ли черновик в этом браузере - если нет - сразу переход на страницу анкеты. Если есть - предлагает вернуться к черновику либо очистить черновик. При возврате к черновику сохраненные значения подставляются в поля.