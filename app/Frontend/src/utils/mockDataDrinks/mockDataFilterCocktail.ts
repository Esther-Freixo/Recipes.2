// 20240130161441
// https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=Cocktail

const mockDataFilterCocktails = {
  drinks: [
    {
      strDrink: '155 Belmont',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/yqvvqs1475667388.jpg',
      idDrink: '15346',
    },
    {
      strDrink: '57 Chevy with a White License Plate',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/qyyvtu1468878544.jpg',
      idDrink: '14029',
    },
    {
      strDrink: '747 Drink',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/i9suxb1582474926.jpg',
      idDrink: '178318',
    },
    {
      strDrink: '9 1/2 Weeks',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xvwusr1472669302.jpg',
      idDrink: '16108',
    },
    {
      strDrink: "A Gilligan's Island",
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/wysqut1461867176.jpg',
      idDrink: '16943',
    },
    {
      strDrink: 'A True Amaretto Sour',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rptuxy1472669372.jpg',
      idDrink: '17005',
    },
    {
      strDrink: 'A.D.M. (After Dinner Mint)',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/ruxuvp1472669600.jpg',
      idDrink: '14560',
    },
    {
      strDrink: 'A1',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg',
      idDrink: '17222',
    },
    {
      strDrink: 'Abbey Martini',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/2mcozt1504817403.jpg',
      idDrink: '17223',
    },
    {
      strDrink: 'Absolut Summertime',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/trpxxs1472669662.jpg',
      idDrink: '14107',
    },
    {
      strDrink: 'Absolutely Fabulous',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/abcpwr1504817734.jpg',
      idDrink: '17224',
    },
    {
      strDrink: 'Absolutly Screwed Up',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/yvxrwv1472669728.jpg',
      idDrink: '16134',
    },
    {
      strDrink: 'Ace',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/l3cd7f1504818306.jpg',
      idDrink: '17225',
    },
    {
      strDrink: 'Adam & Eve',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vfeumw1504819077.jpg',
      idDrink: '17226',
    },
    {
      strDrink: 'Addington',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/ib0b7g1504818925.jpg',
      idDrink: '17227',
    },
    {
      strDrink: 'Addison',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/yzva7x1504820300.jpg',
      idDrink: '17228',
    },
    {
      strDrink: 'Addison Special',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/4vo5651493068493.jpg',
      idDrink: '14272',
    },
    {
      strDrink: 'Adios Amigos Cocktail',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/8nk2mp1504819893.jpg',
      idDrink: '17229',
    },
    {
      strDrink: 'Afterglow',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/vuquyv1468876052.jpg',
      idDrink: '12560',
    },
    {
      strDrink: 'Alice Cocktail',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/qyqtpv1468876144.jpg',
      idDrink: '12562',
    },
    {
      strDrink: 'Amaretto fizz',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/92h3jz1582474310.jpg',
      idDrink: '178321',
    },
    {
      strDrink: 'Aperol Spritz',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/iloasq1587661955.jpg',
      idDrink: '178325',
    },
    {
      strDrink: 'Apple Highball',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/66mt9b1619695719.jpg',
      idDrink: '178353',
    },
    {
      strDrink: 'Apple Karate',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/syusvw1468876634.jpg',
      idDrink: '12564',
    },
    {
      strDrink: 'Applejack',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/sutyqp1479209062.jpg',
      idDrink: '16311',
    },
    {
      strDrink: 'Aquamarine',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
      idDrink: '178319',
    },
    {
      strDrink: 'Arizona Stingers',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/y7w0721493068255.jpg',
      idDrink: '14584',
    },
    {
      strDrink: 'Arizona Twister',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/ido1j01493068134.jpg',
      idDrink: '17074',
    },
    {
      strDrink: 'Army special',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/55muhh1493068062.jpg',
      idDrink: '17066',
    },
    {
      strDrink: 'Autumn Garibaldi',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/ne7re71604179012.jpg',
      idDrink: '178337',
    },
    {
      strDrink: 'Aviation',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/trbplb1606855233.jpg',
      idDrink: '17180',
    },
    {
      strDrink: 'Bahama Mama',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/tyb4a41515793339.jpg',
      idDrink: '17267',
    },
    {
      strDrink: 'Banana Cream Pi',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/m5p67n1582474609.jpg',
      idDrink: '178320',
    },
    {
      strDrink: "Bee's Knees",
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/tx8ne41582475326.jpg',
      idDrink: '178317',
    },
    {
      strDrink: 'Bijou',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/rysb3r1513706985.jpg',
      idDrink: '17254',
    },
    {
      strDrink: 'Blue Hurricane',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/nwx02s1515795822.jpg',
      idDrink: '17268',
    },
    {
      strDrink: 'Blueberry Mojito',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/07iep51598719977.jpg',
      idDrink: '178336',
    },
    {
      strDrink: 'Bombay Cassis',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/h1e0e51510136907.jpg',
      idDrink: '17242',
    },
    {
      strDrink: 'Bora Bora',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/xwuqvw1473201811.jpg',
      idDrink: '12572',
    },
    {
      strDrink: 'Boulevardier',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/km84qi1513705868.jpg',
      idDrink: '17251',
    },
    {
      strDrink: 'Bounty Hunter',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/t8bgxl1596018175.jpg',
      idDrink: '178331',
    },
    {
      strDrink: 'Brigadier',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/nl89tf1518947401.jpg',
      idDrink: '17825',
    },
    {
      strDrink: 'Broadside',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/l2o6xu1582476870.jpg',
      idDrink: '178311',
    },
    {
      strDrink: 'Brooklyn',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/ojsezf1582477277.jpg',
      idDrink: '178310',
    },
    {
      strDrink: 'Butterfly Effect',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/ht3hnk1619704289.jpg',
      idDrink: '178356',
    },
    {
      strDrink: "Captain Kidd's Punch",
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/d83spj1596017390.jpg',
      idDrink: '178329',
    },
    {
      strDrink: 'Cherry Electric Lemonade',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/tquyyt1451299548.jpg',
      idDrink: '17174',
    },
    {
      strDrink: 'Cocktail Horse’s Neck',
      strDrinkThumb: 'https://www.thecocktaildb.com/images/media/drink/4vobt21643844913.jpg',
      idDrink: '178369',
    },
  ],
};

export default mockDataFilterCocktails;
