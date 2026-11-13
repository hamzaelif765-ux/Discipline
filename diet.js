/* diet.js: Indian halal home-style fat-loss plans (Veg / Eggetarian / Non-veg), 7 days each.
   Every dish is built from FOODS so kcal, protein, quantities and the grocery list always agree.
   Values are home-cooking estimates (not lab numbers). Not medical advice. Data: dos_diet. */
/* id:[name, unit, kcal, protein, category]  (g/ml: per 100; pc/tsp/scoop: per unit) */
const FOODS={
roti:["Roti (atta)","pc",100,3.2,"Grains"],jroti:["Jowar roti","pc",100,3,"Grains"],broti:["Bajra roti","pc",105,3,"Grains"],mroti:["Multigrain roti","pc",105,3.8,"Grains"],
rice:["Rice (cooked)","g",130,2.7,"Grains"],quin:["Quinoa (cooked)","g",120,4.4,"Grains"],poha:["Poha (dry)","g",350,6.6,"Grains"],oats:["Rolled oats","g",380,13,"Grains"],rava:["Suji/rava (dry)","g",350,11,"Grains"],dalia:["Dalia (dry)","g",340,12,"Grains"],sp:["Sweet potato (boiled)","g",86,1.6,"Grains"],idli:["Idli","pc",58,2,"Grains"],ragi:["Ragi flour","g",330,7,"Grains"],
moong:["Moong dal (dry)","g",347,24,"Proteins"],masoor:["Masoor dal (dry)","g",343,25,"Proteins"],toor:["Toor dal (dry)","g",343,22,"Proteins"],rajma:["Rajma (dry)","g",337,23,"Proteins"],chole:["Kabuli chana (dry)","g",364,19,"Proteins"],lobia:["Lobia (dry)","g",336,24,"Proteins"],kchana:["Kala chana (dry)","g",360,20,"Proteins"],soya:["Soya chunks (dry)","g",345,52,"Proteins"],sprouts:["Sprouts (moong/matki)","g",85,6,"Proteins"],tofu:["Tofu","g",110,11,"Proteins"],besan:["Besan","g",387,22,"Proteins"],sattu:["Sattu","g",380,22,"Proteins"],rchana:["Roasted chana","g",370,20,"Proteins"],whey:["Whey protein (optional)","scoop",120,24,"Proteins"],
egg:["Egg","pc",72,6.3,"Proteins"],eggw:["Egg white","pc",17,3.6,"Proteins"],chick:["Chicken breast (raw)","g",120,22.5,"Proteins"],rohu:["Rohu fish (raw)","g",97,16.6,"Proteins"],surmai:["Surmai fish (raw)","g",105,20,"Proteins"],pomfret:["Pomfret (raw)","g",110,18,"Proteins"],bangda:["Bangda/mackerel (raw)","g",160,19,"Proteins"],mutton:["Mutton, lean (raw)","g",120,20,"Proteins"],
milk:["Toned milk","ml",58,3.1,"Dairy"],curd:["Dahi (curd)","g",60,3.5,"Dairy"],hcurd:["Hung curd / Greek-style dahi","g",85,8.5,"Dairy"],paneer:["Paneer","g",265,18,"Dairy"],chaas:["Chaas","ml",30,1.7,"Dairy"],
oil:["Oil / ghee","tsp",45,0,"Spices/others"],almond:["Almonds","g",579,21,"Spices/others"],walnut:["Walnuts","g",654,15,"Spices/others"],chia:["Chia seeds","g",486,17,"Spices/others"],pbutter:["Peanut butter","g",590,25,"Spices/others"],pnut:["Peanuts","g",567,26,"Spices/others"],makhana:["Makhana","g",350,9.7,"Spices/others"],wtr:["Water (warm)","ml",0,0,"Spices/others"],gtea:["Green tea","ml",1,0,"Spices/others"],coffee:["Black coffee","ml",2,0.1,"Spices/others"],
banana:["Banana","pc",90,1.1,"Fruits"],apple:["Apple","pc",78,0.4,"Fruits"],orange:["Orange","pc",60,1.2,"Fruits"],guava:["Guava","pc",68,2.6,"Fruits"],date:["Dates","pc",23,0.2,"Fruits"],
veg:["Mixed vegetables","g",35,2,"Vegetables"],palak:["Spinach (palak)","g",23,2.9,"Vegetables"],tomato:["Tomato-onion masala base","g",30,1,"Vegetables"],salad:["Salad (cucumber, carrot, onion)","g",20,1,"Vegetables"],broc:["Broccoli / beans / capsicum","g",32,2.5,"Vegetables"],peas:["Green peas","g",81,5,"Vegetables"]};
const FUNIT={g:" g",ml:" ml",pc:"",tsp:" tsp",scoop:" scoop"};
const fq=(f,q)=>{const u=FOODS[f][1];return u==="pc"?`${FOODS[f][0]} ×${q}`:`${FOODS[f][0]} ${q}${FUNIT[u]}`};
const fk=(f,q)=>{const x=FOODS[f],m=x[1]==="g"||x[1]==="ml"?q/100:q;return[x[2]*m,x[3]*m]};
/* standalone dishes: id:[name, comps, tip, mainProteinTag(optional), flex(optional)] */
const SDISH={
w1:["Warm water + lemon + ½ tsp jeera",[["wtr",250]],"Khali pet dheere dheere piyo."],w2:["Methi-soaked water + 6 almonds",[["wtr",250],["almond",7]],"Raat ko 1 tsp methi dana bhigo do; subah paani piyo, dana chaba lo."],w3:["Warm water + lemon + 1 tsp chia",[["wtr",250],["chia",5]],"Chia 10 min bhigo do."],w4:["Green tea (no sugar) + 2 walnut halves",[["gtea",200],["walnut",8]],"Cheeni ya doodh nahi."],w5:["Cinnamon-ajwain water",[["wtr",250]],"Dalchini + ajwain ubal ke chhan lo."],w6:["Amla-ginger shot in warm water",[["wtr",250]],"Taaza amla ya ginger, bina cheeni."],
b1:["Moong dal chilla ×3 + mint chutney + hung curd",[["moong",60],["veg",40],["oil",1],["hcurd",150]],"Moong raat ko bhigo ke pees lo, tawe par 1 tsp tel."],
b2:["Paneer-tofu bhurji + 1 roti",[["paneer",70],["tofu",80],["tomato",60],["oil",1],["roti",1]],"Dono ko crumble karke masala me 5 min pakao."],
b3:["Savoury veg oats + 1 scoop whey shake",[["oats",50],["veg",50],["pnut",10],["whey",1]],"Oats namkeen banao; whey alag glass me paani/doodh ke saath."],
b4:["Besan chilla ×2 (paneer stuffing) + hung curd",[["besan",60],["paneer",30],["veg",40],["oil",1],["hcurd",100]],"Batter patla rakho, paneer crumble andar bharo."],
b5:["Poha + sprouts + peanuts + hung curd",[["poha",50],["sprouts",50],["pnut",10],["veg",40],["oil",1],["hcurd",150]],"Poha dhoke 5 min rakho, tel 1 tsp se zyada nahi."],
b6:["Greek-style dahi bowl (oats, banana, chia)",[["hcurd",250],["oats",30],["banana",1],["chia",8]],"Oats raat ko dahi me bhigo do (overnight)."],
b7:["Soya keema + 2 roti + dahi",[["soya",30],["tomato",80],["oil",1],["roti",2],["curd",100]],"Soya garam paani me 10 min, nichod ke masale me."],
b8:["Tofu bhurji + 2 roti",[["tofu",150],["tomato",60],["oil",1],["roti",2]],"Haldi, jeera, hari mirch daal ke 5 min."],
b9:["Idli ×3 + sambar + peanut chutney + hung curd",[["idli",3],["toor",25],["veg",80],["pnut",15],["hcurd",100]],"Sambar me sabziyan zyada, tel kam."],
b10:["Ragi-besan cheela ×2 + hung curd",[["ragi",30],["besan",30],["veg",40],["oil",1],["hcurd",150]],"Ragi + besan 1:1 batter, pyaaz mila do."],
b11:["Sprouts chaat + paneer cubes + 1 roti",[["sprouts",100],["paneer",60],["tomato",40],["roti",1],["pnut",10]],"Nimbu, chaat masala, hara dhaniya."],
b12:["Dalia porridge (milk) + nuts + 1 scoop whey",[["dalia",40],["milk",250],["almond",10],["whey",1]],"Whey thanda hone ke baad milao, ubaalna mat."],
b13:["Veg upma (rava) + sprouts + hung curd",[["rava",40],["veg",80],["oil",1],["sprouts",60],["hcurd",150]],"Rava halka bhoon lo, sabziyan zyada."],
e1:["Masala omelette (2 eggs + 3 whites) + 2 multigrain roti",[["egg",2],["eggw",3],["veg",50],["oil",1],["mroti",2]],"Pyaaz-tamatar-mirch, ek tsp tel."],
e2:["Egg bhurji (2 eggs + 3 whites) + 1 roti + dahi",[["egg",2],["eggw",3],["tomato",60],["oil",1],["roti",1],["curd",100]],"Whites zyada, yolk 2 hi."],
e3:["Boiled eggs ×3 + poha",[["egg",3],["poha",40],["pnut",10],["veg",30],["oil",1]],"Poha halka, upar se nimbu."],
e4:["Egg-white wrap (6 whites + 1 egg) in 2 roti",[["eggw",6],["egg",1],["roti",2],["veg",50],["oil",1]],"Omelette ko roti me roll karo, pudina chutney."],
e5:["Anda curry (2 eggs) + 1 jowar roti + hung curd",[["egg",2],["tomato",100],["oil",1],["jroti",1],["hcurd",100]],"Gravy patli, tel 1 tsp."],
c1:["Chicken keema (100 g) + 2 roti",[["chick",100],["tomato",80],["oil",1],["roti",2]],"Breast ko mince karke dhimi aanch par pakao."],
c2:["Chicken tikka wrap (100 g chicken, 2 roti)",[["chick",100],["hcurd",30],["oil",1],["roti",2],["salad",60]],"Chicken dahi-masale me 30 min marinate, tawa par sekho."],
p1:["Banana + 10 g peanut butter",[["banana",1],["pbutter",10]],"Gym se ~60 min pehle."],p2:["Black coffee + 3 dates + 8 almonds",[["coffee",150],["date",3],["almond",8]],"Coffee bina cheeni."],p3:["Apple + 12 almonds",[["apple",1],["almond",12]],"Chhilke ke saath khao."],p4:["Whey shake (1 scoop) + banana",[["whey",1],["banana",1]],"Whey paani me; optional, na ho to p6 lo."],p5:["Roasted chana 30 g + guava",[["rchana",30],["guava",1]],"Bhuna chana namak-nimbu."],p6:["Hung curd 100 g + banana",[["hcurd",100],["banana",1]],"Dahi me banana kaat lo."],p7:["Sattu drink (25 g) + banana",[["sattu",25],["banana",1],["wtr",250]],"Sattu paani me ghol ke, nimbu-namak."],p8:["2 boiled eggs + orange",[["egg",2],["orange",1]],"Eggs pehle se ubaal ke rakho."],p9:["Whey shake (1 scoop) + 3 dates",[["whey",1],["date",3]],"Whey optional."],p10:["Sweet potato 150 g (boiled) + 10 g peanut butter",[["sp",150],["pbutter",10]],"Shakarkandi ubaal ke chhilke ke saath; chaat masala."],
s1:["Hung curd 150 g + 20 g roasted chana",[["hcurd",150],["rchana",20]],"Chaat masala + zeera."],s2:["Grilled paneer tikka 70 g + salad",[["paneer",70],["salad",100]],"Air-fryer/tawa par 1 tsp tel se bhi chalega."],s3:["Sprouts chaat 100 g + roasted chana + hung curd",[["sprouts",100],["rchana",15],["hcurd",50]],"Nimbu, pyaaz, tamatar."],s4:["Whey shake (1 scoop) + orange",[["whey",1],["orange",1]],"Optional; na ho to s1."],s5:["Soya tikki ×2",[["soya",25],["hcurd",40],["oil",1],["veg",40]],"Soya bhigo ke mash karo, tawe par sekho."],s7:["Tofu tikka 120 g",[["tofu",120],["hcurd",30],["oil",1]],"Dahi-masale me marinate, tawa/air-fry."],s8:["Whey shake + 20 g roasted chana",[["whey",1],["rchana",20]],"Optional; na ho to hung curd + chana."],
s9:["2 boiled eggs + guava",[["egg",2],["guava",1]],"Kali mirch + namak."],s10:["Egg-white bhurji (5 whites) + 1 roti",[["eggw",5],["roti",1],["oil",1]],"Pyaaz-mirch ke saath."],
s11:["Chicken tikka 100 g + salad",[["chick",100],["hcurd",30],["oil",1],["salad",100]],"Dahi-masale me marinate karke grill."],s12:["Clear chicken-veg soup + 1 egg",[["chick",80],["veg",100],["egg",1]],"Chicken ubal ke shred, sabziyan daalo."],s14:["Rohu fish tikka 100 g",[["rohu",100],["hcurd",30],["oil",1]],"Nimbu-ajwain masala, tawa par."],
n1:["Warm haldi milk (200 ml)",[["milk",200]],"Sone se 30-45 min pehle; cheeni nahi."],n2:["Hung curd 150 g + dalchini",[["hcurd",150]],"Thanda ya room temperature."],n3:["Paneer cubes 50 g",[["paneer",50]],"Kali mirch ke saath."],n5:["3 boiled egg whites",[["eggw",3]],"Namak + kali mirch."],
fv:["Veg pulao (150 g rice) + paneer tikka 70 g + raita",[["rice",150],["veg",100],["oil",1],["paneer",70],["hcurd",100]],"FLEX meal: hafte me ek baar, plate me measured portion.","pulao",1],
fn:["Chicken biryani (small plate) + salad",[["chick",150],["rice",150],["oil",2],["curd",60],["tomato",80],["salad",100]],"FLEX meal: halal, ghar ki; chawal measured, ghee kam.","biryani",1],
fe:["Egg biryani (3 eggs, small plate) + salad",[["egg",3],["rice",150],["oil",2],["curd",60],["tomato",80],["salad",100]],"FLEX meal: hafte me ek baar.","eggbiryani",1]};
/* main protein dishes by tag: [name, comps, tip] */
const MAIN={
soya:["Soya chunk curry",[["soya",40],["tomato",80],["oil",1]],"Soya 10 min garam paani me bhigo, nichod ke pakao."],paneer:["Palak paneer",[["paneer",70],["palak",150],["oil",1]],"Palak halka blanch, paneer last me."],chana:["Chole",[["chole",45],["tomato",80],["oil",1]],"Chana raat ko bhigo ke pressure cook."],tofu:["Tofu-veg stir-fry",[["tofu",200],["broc",100],["oil",1]],"Tofu pehle sekh lo, phir sabziyan."],rajma:["Rajma masala",[["rajma",45],["tomato",80],["oil",1]],"Rajma raat ko bhigo."],lobia:["Lobia masala",[["lobia",45],["tomato",80],["oil",1]],"Lobia 6 ghante bhigo ke pressure cook."],masoor:["Masoor dal + soya granules",[["masoor",50],["soya",20],["tomato",60],["oil",1]],"Dal me soya granules ubaal ke milao."],toor:["Toor dal tadka + paneer cubes",[["toor",45],["paneer",40],["tomato",60],["oil",1]],"Tadka me 1 tsp ghee."],kchana:["Kala chana curry",[["kchana",45],["tomato",80],["oil",1]],"Kala chana 8 ghante bhigo."],moong:["Moong dal khichdi",[["moong",50],["rice",60],["veg",100],["oil",1]],"Pressure cooker me sabziyon ke saath."],besan:["Besan-veg chilla ×3",[["besan",60],["veg",80],["oil",1]],"Patla batter, nonstick tawa."],sprouts:["Sprouts usal",[["sprouts",150],["tomato",60],["pnut",10],["oil",1]],"Sprouts 5 min ubaalo, phir masala."],
chicken:["Chicken curry (150 g breast)",[["chick",150],["tomato",100],["oil",1]],"Breast zyada mat pakao, 12-15 min."],rohu:["Rohu curry (150 g)",[["rohu",150],["tomato",80],["oil",1]],"Nimbu-haldi lagake 10 min rakho."],surmai:["Surmai tawa fry (150 g)",[["surmai",150],["oil",1]],"Masala lagake nonstick tawa par."],pomfret:["Pomfret masala (150 g)",[["pomfret",150],["tomato",80],["oil",1]],"Dhimi aanch, jaldi pakta hai."],bangda:["Bangda curry (120 g)",[["bangda",120],["tomato",80]],"Bangda oily hai, alag tel nahi."],mutton:["Mutton curry (100 g lean)",[["mutton",100],["tomato",80],["oil",1]],"Hafte me ek baar, chhota portion."],egg:["Egg curry (3 eggs)",[["egg",3],["tomato",100],["oil",1]],"Ubale ande halke fry, gravy patli."]};
const CARB={n:["",[]],r1:["1 roti",[["roti",1]]],r2:["2 roti",[["roti",2]]],j1:["1 jowar roti",[["jroti",1]]],j2:["2 jowar roti",[["jroti",2]]],b1:["1 bajra roti",[["broti",1]]],b2:["2 bajra roti",[["broti",2]]],m1:["1 multigrain roti",[["mroti",1]]],m2:["2 multigrain roti",[["mroti",2]]],rc100:["Rice 100 g",[["rice",100]]],rc150:["Rice 150 g",[["rice",150]]],q120:["Quinoa 120 g",[["quin",120]]],sp150:["Sweet potato 150 g",[["sp",150]]]};
const SIDE={sal:["Salad 150 g",[["salad",150]]],cur:["Dahi 100 g",[["curd",100]]],hc:["Hung curd raita 150 g",[["hcurd",150]]],dm:["Moong dal 25 g",[["moong",25]]],ds:["Masoor dal 25 g",[["masoor",25]]],dt:["Toor dal 30 g",[["toor",30]]],vg:["Sabzi 150 g",[["veg",150]]],sc:["Salad + dahi",[["salad",100],["curd",100]]],sh:["Salad + hung curd",[["salad",100],["hcurd",100]]],pt:["Paneer tikka 60 g",[["paneer",60]]],sy:["Soya granules 20 g",[["soya",20]]]};
const L=(t,c,s)=>[t,c,s||[]];
const dayRow=(w,b,l,s,p,d,n)=>({w,b,l,s,p,d,n});
const DIET_VEG=[
dayRow(["w1","w2"],["b1","b5"],[L("soya","rc150",["pt"]),L("rajma","n",["sy","ds","hc"])],["s4","s1"],["p4","p6"],[L("paneer","rc100",["sc"]),L("moong","n",["sy","sh"])],["n2","n1"]),
dayRow(["w3","w4"],["b2","b9"],[L("chana","n",["sy","ds","hc"]),L("tofu","q120",["sy"])],["s2","s5"],["p5","p6"],[L("besan","n",["sy","hc"]),L("masoor","r1",["sy"])],["n1","n3"]),
dayRow(["w2","w5"],["b4","b6"],[L("paneer","m2",[]),L("lobia","n",["sy","ds","hc"])],["s7","s3"],["p9","p3"],[L("soya","sp150",["hc"]),L("sprouts","r1",["sy","hc"])],["n3","n2"]),
dayRow(["w6","w1"],["b7","b13"],[L("toor","q120",["hc"]),L("kchana","sp150",["sy","sh"])],["s1","s8"],["p4","p7"],[L("tofu","r1",[]),L("rajma","m1",["sy","hc"])],["n1","n2"]),
dayRow(["w4","w3"],["b3","b10"],[L("soya","m2",["hc"]),L("masoor","m2",["sy"])],["s5","s4"],["p5","p2"],[L("chana","sp150",["hc"]),L("besan","n",["sy","hc"])],["n2","n3"]),
dayRow(["w5","w6"],["b11","b8"],[L("sprouts","q120",["hc"]),L("paneer","q120",["sy","hc"])],["s3","s7"],["p4","p6"],[L("moong","n",["sy","hc"]),L("lobia","n",["sy","hc"])],["n3","n1"]),
dayRow(["w2","w1"],["b12","b6"],["fv",L("tofu","m2",[])],["s1","s2"],["p4","p9"],[L("toor","n",["sy"]),L("kchana","b1",["hc"])],["n1","n2"])];
const DIET_EGG=[
dayRow(["w1","w2"],["e1","b5"],[L("soya","r2",["hc"]),L("egg","n",["sy","hc"])],["s9","s1"],["p8","p6"],[L("paneer","r1",["hc"]),L("moong","n",["sy","hc"])],["n5","n1"]),
dayRow(["w3","w4"],["e2","b9"],[L("chana","q120",["sy","sh"]),L("tofu","n",["sy","hc"])],["s10","s5"],["p5","p6"],[L("besan","n",["sy","hc"]),L("masoor","r1",["sy"])],["n5","n3"]),
dayRow(["w2","w5"],["e3","b6"],[L("paneer","n",["sy","hc"]),L("egg","n",["sy","hc"])],["s7","s3"],["p8","p6"],[L("soya","m1",["hc"]),L("sprouts","r1",["sy","hc"])],["n3","n2"]),
dayRow(["w6","w1"],["e4","b13"],[L("toor","rc150",[]),L("kchana","q120",["sy","hc"])],["s9","s8"],["p4","p7"],[L("tofu","r1",["hc"]),L("rajma","r1",["sy","hc"])],["n5","n2"]),
dayRow(["w4","w3"],["e5","b10"],[L("soya","q120",["hc"]),L("masoor","n",["sy","hc"])],["s5","s4"],["p8","p10"],[L("chana","r1",["sy","hc"]),L("besan","n",["sy","hc"])],["n2","n3"]),
dayRow(["w5","w6"],["e1","b8"],[L("sprouts","b2",["hc"]),L("paneer","n",["sy","ds","hc"])],["s10","s7"],["p4","p6"],[L("moong","n",["sy"]),L("lobia","m1",["sy","hc"])],["n5","n1"]),
dayRow(["w2","w1"],["e4","b12"],["fe",L("tofu","m2",["sh"])],["s10","s2"],["p8","p9"],[L("toor","n",["hc"]),L("kchana","rc100",[])],["n5","n2"])];
const DIET_NV=[
dayRow(["w1","w2"],["c1","e1"],[L("chicken","rc150",["pt"]),L("rohu","r2",["hc"])],["s11","s7"],["p1","p8"],[L("egg","rc100",["dt"]),L("soya","b1",["sy"])],["n5","n1"]),
dayRow(["w3","w4"],["e2","b13"],[L("surmai","b2",["pt"]),L("masoor","q120",["sy","hc"])],["s14","s4"],["p3","p1"],[L("pomfret","rc100",["dt"]),L("paneer","n",["sy","sh"])],["n2","n1"]),
dayRow(["w2","w5"],["e4","b1"],[L("chicken","rc150",["sc"]),L("rajma","b2",["ds"])],["s12","s1"],["p3","p9"],[L("bangda","b1",["pt"]),L("tofu","r1",["hc"])],["n1","n2"]),
dayRow(["w6","w1"],["c2","e3"],[L("rohu","r2",["hc"]),L("toor","n",["sy","hc"])],["s10","s5"],["p8","p4"],[L("egg","j1",["sy"]),L("lobia","r1",["hc"])],["n1","n3"]),
dayRow(["w4","w3"],["e5","b4"],[L("mutton","rc150",["pt"]),L("moong","n",["sy","hc"])],["s11","s2"],["p5","p2"],[L("surmai","sp150",["pt"]),L("soya","m1",["sy","hc"])],["n5","n3"]),
dayRow(["w5","w6"],["c1","b6"],[L("chicken","rc150",["vg","dt"]),L("chana","n",["sy","ds","hc"])],["s14","s1"],["p1","p6"],[L("pomfret","sp150",["dt","sc"]),L("tofu","n",["sy","hc"])],["n5","n1"]),
dayRow(["w2","w1"],["e2","e5"],["fn",L("bangda","b2",["dt"])],["s12","s9"],["p3","p9"],[L("masoor","b1",["sy"]),L("paneer","r1",["hc"])],["n1","n2"])];
const DIET_PLANS={veg:DIET_VEG,egg:DIET_EGG,nonveg:DIET_NV};
const DIET_TYPES=[["veg","Veg"],["egg","Eggetarian"],["nonveg","Non-veg"]];
const DIET_SLOTS=[["w","Wake-up drink","05:15"],["b","Breakfast","08:15"],["l","Lunch","13:30"],["s","Evening snack","17:30"],["p","Pre-workout","18:30"],["d","Dinner","20:30"],["n","Late-night (optional)","22:00"]];
const DIET_DAYS=["Mon","Tue","Wed","Thu","Fri","Sat","Sun"];
const DIET_TG={kmin:1900,kmax:2000,pmin:140,pmax:150,fmin:55,fmax:65,cmin:190,cmax:220,wmin:3000,wmax:4000};
/* build a dish object from an id (standalone) or [tag,carb,sides] (composed) */
function dishOf(slot,ref){let name,comps,tip,mp="",flex=0,id;
 if(typeof ref==="string"){const d=SDISH[ref];name=d[0];comps=d[1];tip=d[2];mp=d[3]||"";flex=d[4]||0;id=ref}
 else{const m=MAIN[ref[0]],c=CARB[ref[1]],sd=ref[2].map(k=>SIDE[k]);name=[m[0],c[0],...sd.map(s=>s[0])].filter(Boolean).join(" + ");comps=[...m[1],...c[1],...sd.flatMap(s=>s[1])];tip=m[2];mp=ref[0];id=ref[0]+"|"+ref[1]+"|"+ref[2].join("+")}
 let k=0,p=0;comps.forEach(([f,q])=>{const r=fk(f,q);k+=r[0];p+=r[1]});
 const mer={};comps.forEach(([f,q])=>mer[f]=(mer[f]||0)+q);
 return{id:slot+":"+id,slot,n:name,k:Math.round(k),p:Math.round(p),tip,mp,flex,comps:Object.entries(mer),q:Object.entries(mer).filter(([f])=>f!=="wtr").map(([f,q])=>fq(f,q)).join(" · ")}}
const dayDishes=(type,di,opt)=>DIET_SLOTS.map(s=>dishOf(s[0],DIET_PLANS[type][di][s[0]][opt==="B"?1:0]));
const sumD=a=>({k:a.reduce((x,d)=>x+d.k,0),p:a.reduce((x,d)=>x+d.p,0)});
/* ===================== tracker UI ===================== */
const DIET=(()=>{
 const KEY="dos_diet";let D=null,ddate="",dauto=true,dtype="",gtimer=0;
 const num=v=>{const n=parseFloat(String(v??"").replace(",","."));return isFinite(n)?n:0};
 const wdIdx=d=>(fromK(d).getDay()+6)%7;
 function load(){if(D)return;const o=jp(localStorage.getItem(KEY),{});D={v:1,type:["veg","egg","nonveg"].includes(o.type)?o.type:"nonveg",tg:Object.assign({},DIET_TG,o.tg||{}),logs:o.logs&&typeof o.logs==="object"?o.logs:{},groc:Object.assign({checked:{},incB:0},o.groc||{})}}
 const save_=()=>sset(KEY,D),soon=()=>{clearTimeout(gtimer);gtimer=setTimeout(save_,400)};
 const lg=d=>D.logs[d]||(D.logs[d]={items:[],water:0,auto:{}});
 const peek=d=>D.logs[d]||{items:[],water:0,auto:{}};
 const planDay=d=>{const l=D.logs[d];return l&&l.pd!=null?l.pd:wdIdx(d)};
 const tot=d=>{const l=peek(d);return{k:l.items.reduce((a,i)=>a+i.k,0),p:l.items.reduce((a,i)=>a+i.p,0),w:l.water||0}};
 function score(d){const l=peek(d),t=tot(d),g=D.tg;if(!l.items.length&&!l.water)return null;
  const ks=t.k<g.kmin?40*t.k/g.kmin:t.k<=g.kmax+60?40:Math.max(0,40-(t.k-g.kmax-60)/10),ps=40*Math.min(1,t.p/g.pmin),ws=20*Math.min(1,t.w/g.wmin);return Math.round(ks+ps+ws)}
 function sync(d){const l=lg(d),t=tot(d),g=D.tg;let ch=false;
  const rule=(id,ok)=>{const tk=db[d]?.ticks;if(ok){if(!tk?.[id]){ent(d).ticks[id]=true;l.auto[id]=1;ch=true}}else if(l.auto[id]){if(tk?.[id]){tk[id]=false;ch=true}delete l.auto[id]}};
  rule("water",t.w>=g.wmin);rule("protein",l.items.length>0&&t.p>=Math.round(g.pmin*0.9));if(ch)save();if(typeof upd==="function"&&view==="today")upd()}
 function addWater(ml){load();const d=todayK(),l=lg(d);l.water=Math.max(0,(l.water||0)+ml);save_();sync(d);vib(10);return l.water}
 const rings=(v,max,col)=>{const c=2*Math.PI*38,f=Math.max(0,Math.min(1,v/max));return `<svg width="92" height="92" viewBox="0 0 92 92" aria-hidden="true"><circle class="bg" cx="46" cy="46" r="38"/><circle class="fg ${col||""}" cx="46" cy="46" r="38" style="stroke-dasharray:${c};stroke-dashoffset:${c*(1-f)}"/></svg>`};
 function sumHTML(){const d=ddate,t=tot(d),g=D.tg,l=peek(d),sc=score(d),left=Math.max(0,g.kmax-t.k),over=t.k>g.kmax+60;
  return `<div class="hd"><div class="ring" role="img" aria-label="${t.k} of ${g.kmax} kcal">${rings(t.k,g.kmax,over?"warn":"")}<b>${t.k}</b></div><div class="dnums"><div><b>${t.k}</b> / ${g.kmin}-${g.kmax} kcal ${over?"· thoda zyada":left?`· ${left} baaki`:"· target poora"}</div>
  <div class="mut">Protein <b>${t.p} g</b> / ${g.pmin}-${g.pmax} g</div><div class="pbar" aria-hidden="true"><i style="width:${Math.min(100,100*t.p/g.pmin)}%"></i></div>
  <div class="mut">Diet score: <b>${sc==null?"–":sc}</b></div></div></div>
  <div class="hd"><div>Water <b>${(t.w/1000).toFixed(2)} L</b> <span class="mut">/ ${g.wmin/1000}-${g.wmax/1000} L</span></div><div><button class="btn" data-dw="-250" aria-label="Minus 250 ml">−250</button><button class="btn g" data-dw="250">+250 ml</button></div></div><div class="pbar" aria-hidden="true"><i style="width:${Math.min(100,100*t.w/g.wmin)}%"></i></div>
  ${l.items.length?`<details><summary><h3>Aaj ka log (${l.items.length})</h3></summary>${l.items.map((i,x)=>`<div class="row"><div>${esc(i.n)}<div class="p">${i.k} kcal · ${i.p} g protein</div></div><button class="btn" data-ditem="${x}" aria-label="Remove ${esc(i.n)}">✕</button></div>`).join("")}</details>`:'<p class="mut empty">Neeche kisi meal option par tap karo; wo khaya hua count hoga.</p>'}`}
 const upSum=()=>{const e=document.getElementById("dsum");if(e)e.innerHTML=sumHTML()};
 function mealCard(s,di){const a=dishOf(s[0],DIET_PLANS[dtype][di][s[0]][0]),b=dishOf(s[0],DIET_PLANS[dtype][di][s[0]][1]),l=peek(ddate),cus=l.items.filter(i=>i.slot===s[0]&&i.c);
  const opt=(o,lab)=>{const on=l.items.some(i=>i.id===o.id);return `<button class="opt ${on?"on":""}" data-eat="${s[0]}:${lab}" aria-pressed="${on}"><span class="ol">Option ${lab}${o.flex?' · <em>Flex meal</em>':""}${on?" ✓":""}</span><b>${esc(o.n)}</b><span class="oq">${esc(o.q)}</span><span class="om">${o.k} kcal · ${o.p} g protein</span><span class="ot">${esc(o.tip)}</span></button>`};
  return `<div class="card meal" data-slot="${s[0]}"><div class="hd"><h3>${s[1]}</h3><span class="mut">${s[2]}</span></div>${opt(a,"A")}${opt(b,"B")}${cus.map(i=>`<div class="row"><div>${esc(i.n)} <span class="mut">(mera) ${i.k} kcal · ${i.p} g</span></div></div>`).join("")}<button class="btn" data-dadd="${s[0]}">+ Apna khana add karo</button></div>`}
 function totCard(di){const A=sumD(dayDishes(dtype,di,"A")),B=sumD(dayDishes(dtype,di,"B")),nA=dishOf("n",DIET_PLANS[dtype][di].n[0]),nB=dishOf("n",DIET_PLANS[dtype][di].n[1]);
  return `<div class="card" id="dtot"><h3>Plan total (computed)</h3><div class="row"><div>Sab Option A<div class="p">late-night ke bina: ${A.k-nA.k} kcal · ${A.p-nA.p} g</div></div><b>${A.k} kcal · ${A.p} g</b></div><div class="row"><div>Sab Option B<div class="p">late-night ke bina: ${B.k-nB.k} kcal · ${B.p-nB.p} g</div></div><b>${B.k} kcal · ${B.p} g</b></div><p class="mut">A/B mix karo to total beech me aayega. ${dtype==="veg"?"Veg me protein 140 tak pahunchne ke liye whey optional hai; bina whey ~10-20 g kam.":""}${di===6?" Sunday: relaxed rest-day plan, ek flex meal ke saath.":""}</p></div>`}
 function grocery(){const days=[0,1,2,3,4,5,6],tot={};days.forEach(di=>["A","B"].forEach(o=>{if(o==="B"&&!D.groc.incB)return;dayDishes(dtype,di,o).forEach(x=>x.comps.forEach(([f,q])=>{tot[f]=(tot[f]||0)+q}))}));
  const cats={};Object.entries(tot).forEach(([f,q])=>{if(f==="wtr"||f==="gtea"||f==="coffee")return;const c=FOODS[f][4],u=FOODS[f][1];let t;if(u==="g")t=q>=1000?(q/1000).toFixed(2)+" kg":Math.round(q/10)*10+" g";else if(u==="ml")t=q>=1000?(q/1000).toFixed(1)+" L":Math.round(q)+" ml";else t=q+(u==="pc"?" pcs":u==="tsp"?" tsp":" scoop");(cats[c]=cats[c]||[]).push([f,FOODS[f][0],t])});
  const order=["Grains","Proteins","Vegetables","Fruits","Dairy","Spices/others"],ck=D.groc.checked;
  return `<div class="seg"><button class="btn ${D.groc.incB?"on":""}" data-gincb aria-pressed="${!!D.groc.incB}">Option B bhi shamil karo</button><button class="btn" data-gclear>Ticks hatao</button></div>`+order.filter(c=>cats[c]).map(c=>`<h4>${c}</h4>${cats[c].sort((a,b)=>a[1].localeCompare(b[1])).map(([f,n,t])=>{const k=dtype+":"+f;return `<div class="row"><div>${esc(n)}<div class="p">${t}</div></div><button class="ck ${ck[k]?"on":""}" data-gck="${k}" role="checkbox" aria-checked="${!!ck[k]}" aria-label="${esc(n)}">${CK}</button></div>`}).join("")}`).join("")+`<p class="mut">Staples: namak, haldi, jeera, dhaniya powder, lal mirch, garam masala, adrak-lehsun, hari mirch, nimbu, hara dhaniya. Quantities ek hafte ke liye, approx (dal/dry items kachche weight me).</p>`}
 const RULES=[["Avoid / limit","Meethe drinks (cold drink, packaged juice), tali hui street food, maida (white bread, naan), zyada cheeni, raat ko der se bhaari dinner (sone se 2-3 ghante pehle halka khao)."],["Oil","Lagbhag 1 tsp tel/ghee har meal me. Tadka halka, gravy patli."],["Skin & hair","Omega-3 (machli, akhrot, chia), Vitamin C (amla, nimbu, santra, guava), zinc (chana, kaddu ke beej, meat), iron (palak, rajma, masoor) aur poora protein."],["Water","3-4 litre; din bhar thoda thoda."],["Not medical advice","Ye general fitness diet hai. Kisi bimari/allergy me doctor ya dietitian se poochho. Agar baal jhadna, pimples ya thakaan lagatar rahe to Vitamin D, B12, iron aur thyroid ka blood test karwao."]];
 function html(){const d=ddate,di=planDay(d),g=D.tg,isT=d===todayK();
  return `<h1>Diet</h1><div class="seg" role="tablist" aria-label="Diet type">${DIET_TYPES.map(t=>`<button class="btn ${t[0]===dtype?"on":""}" role="tab" aria-selected="${t[0]===dtype}" data-dtype="${t[0]}">${t[1]}</button>`).join("")}</div>
  <div class="hd dnav"><button class="btn" data-ddate="-1" aria-label="Previous day">‹</button><span class="mut">${isT?"Today":""} ${d}</span><button class="btn" data-ddate="1" ${isT?"disabled":""} aria-label="Next day">›</button></div>
  <div class="chips noswipe" role="group" aria-label="Plan day">${DIET_DAYS.map((n,i)=>`<button class="chip ${i===di?"on":""}" data-dday="${i}" aria-pressed="${i===di}">${n}${i===6?"<br><small>rest+flex</small>":""}</button>`).join("")}</div>
  <div class="card hero" id="dsum">${sumHTML()}</div>${DIET_SLOTS.map(s=>mealCard(s,di)).join("")}${totCard(di)}
  <details class="card" id="dgroc"><summary><h3>Grocery list (is hafte ka, ${DIET_TYPES.find(t=>t[0]===dtype)[1]})</h3></summary><div id="dgbody" class="mut">Khulne par bante hain…</div></details>
  <details class="card"><summary><h3>Rules</h3></summary>${RULES.map(r=>`<p><b>${r[0]}:</b> ${r[1]}</p>`).join("")}</details>
  <details class="card"><summary><h3>Targets (editable)</h3></summary><div class="bodygrid">${[["kmin","Kcal min"],["kmax","Kcal max"],["pmin","Protein min (g)"],["pmax","Protein max (g)"],["fmin","Fat min (g)"],["fmax","Fat max (g)"],["cmin","Carbs min (g)"],["cmax","Carbs max (g)"]].map(f=>`<label>${f[1]}<input class="gin" inputmode="decimal" data-tg="${f[0]}" value="${g[f[0]]}"></label>`).join("")}<label>Water min (L)<input class="gin" inputmode="decimal" data-tgw="wmin" value="${g.wmin/1000}"></label><label>Water max (L)<input class="gin" inputmode="decimal" data-tgw="wmax" value="${g.wmax/1000}"></label></div><p class="mut">Tracker kcal, protein aur water gin-ta hai; fat/carbs guide hain.</p></details>
  <p class="mut">Halal, ghar ka Indian khana. Values estimates hain; plate ke hisaab se thoda adjust karo. Not medical advice.</p>`}
 function ensure(){load();const t=todayK();if(dauto||!ddate){if(ddate!==t)ddate=t}if(!dtype)dtype=D.type}
 const draw=()=>{ensure();app.innerHTML=html()};
 function click(e){load();const T=e.target,q=s=>T.closest(s);let b;
  if(b=q("[data-dtype]")){dtype=b.dataset.dtype;D.type=dtype;save_();render();return}
  if(b=q("[data-ddate]")){const x=fromK(ddate);x.setDate(x.getDate()+ +b.dataset.ddate);if(dk(x)<=todayK()){ddate=dk(x);dauto=ddate===todayK();render()}return}
  if(b=q("[data-dday]")){lg(ddate).pd=+b.dataset.dday;save_();render();return}
  if(b=q("[data-eat]")){const[slot,o]=b.dataset.eat.split(":"),di=planDay(ddate),dish=dishOf(slot,DIET_PLANS[dtype][di][slot][o==="B"?1:0]),l=lg(ddate),ix=l.items.findIndex(i=>i.id===dish.id);
   if(ix>=0)l.items.splice(ix,1);else{l.items.push({id:dish.id,slot,n:dish.n,k:dish.k,p:dish.p});vib(10)}
   save_();sync(ddate);const on=ix<0;b.classList.toggle("on",on);b.setAttribute("aria-pressed",on);const lab=b.querySelector(".ol");if(lab)lab.innerHTML=lab.innerHTML.replace(" ✓","")+(on?" ✓":"");upSum();return}
  if(b=q("[data-dw]")){const l=lg(ddate);l.water=Math.max(0,(l.water||0)+ +b.dataset.dw);save_();sync(ddate);upSum();vib(8);return}
  if(b=q("[data-ditem]")){const l=lg(ddate);l.items.splice(+b.dataset.ditem,1);save_();sync(ddate);render();return}
  if(b=q("[data-dadd]")){const slot=b.dataset.dadd;sheet({title:"Apna khana add karo",html:'<label>Naam<input id="cn" placeholder="jaise: 1 samosa"></label><label>Kcal<input id="ck" class="gin" inputmode="decimal" placeholder="250"></label><label>Protein (g)<input id="cp" class="gin" inputmode="decimal" placeholder="5"></label>',ok:"Add",onOk(r){const n=r.querySelector("#cn").value.trim(),k=num(r.querySelector("#ck").value),p=num(r.querySelector("#cp").value);if(!n||k<=0){toast("Naam aur kcal daalo","warn");return false}lg(ddate).items.push({id:"c"+Date.now(),slot,n,k:Math.round(k),p:Math.round(p),c:1});save_();sync(ddate);render();return true}});return}
  if(q("[data-gincb]")){D.groc.incB=D.groc.incB?0:1;save_();fillG();return}
  if(q("[data-gclear]")){D.groc.checked={};save_();fillG();return}
  if(b=q("[data-gck]")){const k=b.dataset.gck,c=D.groc.checked;c[k]=!c[k];if(!c[k])delete c[k];b.classList.toggle("on",!!c[k]);b.setAttribute("aria-checked",!!c[k]);soon()}}
 function fillG(){const e=document.getElementById("dgbody");if(e){e.className="";e.innerHTML=grocery()}}
 function toggle(e){if(e.target.id==="dgroc"&&e.target.open&&!document.querySelector("#dgbody .row"))fillG()}
 function change(e){load();const T=e.target;if(T.dataset.tg){const v=num(T.value);if(v>0){D.tg[T.dataset.tg]=v;save_();upSum()}else T.value=D.tg[T.dataset.tg]}else if(T.dataset.tgw){const v=num(T.value);if(v>0){D.tg[T.dataset.tgw]=Math.round(v*1000);save_();upSum()}}}
 const reload=()=>{D=null;dtype=""};
 const stat=()=>{load();return{score:score(todayK())}};
 return{render:draw,click,input(){},change,toggle,addWater,reload,stat,leave:()=>{clearTimeout(gtimer);if(D)save_()}};
})();
