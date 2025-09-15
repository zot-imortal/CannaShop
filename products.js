const products = [
  // Автоцветы (Autoflowers)
  { name: "Auto Northern Lights", price: 15, image: "img/coffeKush.jpg", category: "autoflowers", details: "Fast-growing autoflowering strain with vibrant buds.", packs: 5 },
  { name: "Auto Blue Dream", price: 14, image: "img\\coffeKush.jpg", category: "autoflowers", details: "Sweet and fruity autoflowering variety.", packs: 3 },
  { name: "Auto White Widow", price: 16, image: "https://via.placeholder.com/300x200", category: "autoflowers", details: "Resinous autoflower with strong effects.", packs: 7 },
  { name: "Auto Amnesia Haze", price: 17, image: "https://via.placeholder.com/300x200", category: "autoflowers", details: "Potent autoflowering haze strain.", packs: 4 },
  { name: "Auto Gorilla Glue", price: 18, image: "https://via.placeholder.com/300x200", category: "autoflowers", details: "Heavy-yielding autoflower with sticky buds.", packs: 6 },

  // Феминизированные (Feminized)
  { name: "Super Lemon Haze x GMO", price: 12, image: "https://via.placeholder.com/300x200", category: "feminized", details: "High-quality feminized hybrid seed.", packs: 8 },
  { name: "Girl Scout Cookies", price: 13, image: "https://via.placeholder.com/300x200", category: "feminized", details: "Sweet and earthy feminized strain.", packs: 2 },
  { name: "OG Kush", price: 11, image: "https://via.placeholder.com/300x200", category: "feminized", details: "Classic feminized strain with strong aroma.", packs: 5 },
  { name: "Purple Kush", price: 14, image: "https://via.placeholder.com/300x200", category: "feminized", details: "Deep purple feminized buds.", packs: 9 },
  { name: "Sour Diesel", price: 15, image: "https://via.placeholder.com/300x200", category: "feminized", details: "Energizing feminized diesel strain.", packs: 3 },

  // Регуляры (Regulars)
  { name: "Regular Coffee Kush", price: 200, image: "img/coffeKush1.jpg", category: "regulars", details: " сорт название которого говорит само за себя. Тонкий кофейный , шоколадный, земельный аромат в сочетании с тяжелыми запахами Stone Head. Эффект вызывает сильную лень и отсутствие желания делать что либо. Отличное снадобье для сна. Помогает бороться со стрессом и нервозом. Урожайность 600г на квадратный метр. Цветение занимает 55-65 дней, в открытом грунте готов к концу октября на южных широтах.", packs: 4 },
  { name: "Regular Ice Maker", price: 200, image: "img/Ice.jpg", category: "regulars", details: "был получен путем улучшения генетики Girl Scout Cookies и Larry Og нашим ландрейсом с Афганистана что помогло повысить сопротивление к плесени и насекомым. Как вишенка на торте стало последнее опыление нашим Stone Head, что добавило мощный стоун эффект. Запахи преимущественно сладкие , возможны фенотипы с запахом шоколада, сладких тропических фруктов, но также возможно тяжелые гашишный запахи. Эффект понравится любителям Стоуна, но если собрать урожай чуть ранее то получится отличный гибридный эффект. Урожайность  700-800г на квадратный метр. Цветение занимает 60-65 дней, в открытом грунте готов к началу ноября на южных широтах.", packs: 6 },
  { name: "Regular Hard snow ", price: 200, image: "img/hard snow.jpg", category: "regulars", details: "Hard snow был создал благодаря знаменитой генетике sour и нашим Stone Head. В результате мы получили очень высокое количество трихом, а так же высокую урожайность и размер растения. Не рекомендуется выращивать в маленьком пространстве. Выстрел после перевода на 12/12 может увеличить текущий размер в 3-4 раза. По истине хороший выбор для людей которые любят чистый нокаутирующий эффект, с ясностью ума, что позволяет соображать и находится в фокусе, данную особенность данный сорт как раз таки и берет от генетики Sour. Запах тяжелый как и сами соцветия , структура растения позволяет  проникать свету даже к нижним этажам. Урожайность  600-800г на квадратный метр. Цветение занимает 55-60 дней, в открытом грунте готов к концу октября на южных широтах.", packs: 5 },
  { name: "Regular GMO Kush", price: 200, image: "img/stoneHead1.jpg", category: "regulars", details: "GMO Kush это скрещивания двух легендарных сортов таких как GMO и Stone Head . Характеристики данного сорта на высшем уровне, урожайность, вкусовые качества, аромат, количество трихом - это все присуще данному сорту. Эффект довольно таки не предсказуемый, так как в данном сорте смесь двух разных типов. С одной стороны сильный сативный эффект с другой тяжелый стоун, в результате мы получаем мощный гибридный эффект, который может склоняться в ту или иную сторону. Запахи тяжелые: чесночный и гашишный. В конце цветения окрашивается в красные и фиолетовые цвета. Урожайность 600г на квадратный метр. Цветение занимает 65 дней, в открытом грунте готов к началу ноября  на южных широтах.", packs: 7 },
  { name: "Stone Head", price: 200, image: "img/stoneHead1.jpg", category: "regulars", details: "Stone Head по истине легенда нашего производства. Долгое время сложно найти что либо равное данному сорту тем, кто обожает стоун эффект. Некоторые экземпляры имеют настолько мощный нокаутирующий эффект  что просто заставят вас забыть про все свои дела, не рекомендуется принимать с утра. Аромат гашишный напоминающий пот, но также можно встретить фруктовые разновидности , но всеравно под конец созревания они сменят аромат на тяжелый. Урожайность  600г на квадратный метр. Цветение занимает 55-60 дней, в открытом грунте готов к концу октября на южных широтах.", packs: 3 },

  // Mushroom
  { name: "Mushroom Spore B", price: 18, image: "https://via.placeholder.com/300x200", category: "mushroom", details: "Premium mushroom spore for cultivation.", packs: 6 },
  { name: "Mushroom Spore Golden Teacher", price: 20, image: "https://via.placeholder.com/300x200", category: "mushroom", details: "Popular psychedelic mushroom spore.", packs: 4 },
  { name: "Mushroom Spore Blue Oyster", price: 16, image: "https://via.placeholder.com/300x200", category: "mushroom", details: "Edible oyster mushroom spore.", packs: 8 },
  { name: "Mushroom Spore Lion's Mane", price: 19, image: "https://via.placeholder.com/300x200", category: "mushroom", details: "Medicinal mushroom spore.", packs: 5 },
  { name: "Mushroom Spore Reishi", price: 21, image: "https://via.placeholder.com/300x200", category: "mushroom", details: "Healing Reishi mushroom spore.", packs: 7 }
];

if (typeof module !== 'undefined' && module.exports) {
  module.exports = products;
} else {
  window.products = products;
}