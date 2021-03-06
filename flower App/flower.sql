SET NAMES 'utf8';
DROP DATABASE IF EXISTS flower;
CREATE DATABASE flower CHARSET=UTF8;
USE flower;

CREATE TABLE fl_dish(
    did INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(64),
    price FLOAT(6,2),
    img_sm VARCHAR(64),
    img_lg VARCHAR(64),
    detail VARCHAR(2048),
    material VARCHAR(2048)
);
INSERT INTO fl_dish(did,img_sm,img_lg,name,price,material,detail) VALUES
(   null,
    'p0281.jpg',
    'p0281-l.jpg',
    '【百合】',
    360,
    '百合包装材质：扇形包装 丝带扎束 白绵纸	黄莺',
     '百合花语：百合具有百年好合美好家庭、伟大的爱之含意，有深深祝福的意义。收到这种花的祝福的人具有清纯天真的性格，集众人宠爱于一身，不过光凭这一点并不能平静度过一生，必须具备自制力，抵抗外界的诱惑，才能保持不被污染的纯真。'
),
(   null,
    'p2679.jpg',
    'p2679-l.jpg',
    '【粉色百合】',
    406.5,
    '粉色百合包装材质：粉色百合,搭配绿叶、蛇鞭菊适量,透明玻璃纸、白色雪点网纱内衬,加上篮子的衬托',
    '郁金香的花语：博爱.体贴.高雅.富贵.能干.聪颖。   红色郁金香代表热烈的爱意  粉色郁金香代表永远的爱   黄色郁金香代表开朗   白色郁金香代表纯洁清高的恋情黑色郁金香代表独特领袖权力.爱的表白、荣誉的皇冠、永恒的祝福红郁金香：爱的宣言、喜悦、热爱  黑郁金香：神秘，高贵紫郁金香：高贵的爱、无尽的爱白郁金香：纯情、纯洁粉郁金香：美人、热爱、爱惜、幸福黄郁金香：高雅、珍贵、财富、友谊象征神圣、幸福与胜利。红色郁金香：我爱你。紫色郁金香:忠贞的爱。黄色郁金香:没有希望的爱白色郁金香：失恋。  黑郁金香：骑士精神（或忧郁的爱情）。'
),
(   null,
    'p8489.jpg',
    'p8489-l.jpg',
    '【蓝玫瑰】',
    332,
    '蓝玫瑰包装材质：	叶上黄金	麻网	卷边纸	瓦楞纸',
    '蓝玫瑰的花语：奇迹与不可能实现的事；纯洁，透明。相知是一种宿命，心灵的交汇让我们有诉不尽的浪漫情怀；相守是一种承诺，人世轮回中，永远铭记我们这段美丽的爱情故事！其花语代表"清纯的爱和敦厚善良”。'
),
(   null,
    'p7818.jpg',
    'p7818-l.jpg',
    '【向日葵】',
    405,
    '向日葵包装材质：黄莺	洋桔梗	绿叶	丝带扎束	皱纹纸。',
    '向日葵的话语：向日葵花语为“沉默的爱，没有说出口的爱”。向日葵的花姿虽然没有玫瑰那么浪漫，没有百合那么纯净，但它阳光、明亮，爱得坦坦荡荡，爱得不离不弃，有着属于自己的独特魅力，而且，它绽放的不仅是爱情，还有对梦想、对生活的热爱。'
),
(   null,
    'p9138.jpg',
    'p9138-l.jpg',
    '【勿忘我】',
    642,
    '勿忘我包装材质：	黄莺	绿叶	纱网	皱纹纸	丝带扎束。',
    '勿忘我花语： 永恒的爱，浓情厚谊 ，永不变的心，永远的回忆。勿忘我的寓意：“请不要忘记我真诚的爱”或代表“请想念我，忠贞的希望一切都还没有晚，我会再次归来 给你幸福”“请别忘记我”。'
),
(   null,
    'p4788.jpg',
    'p4788-l.jpg',
    '【康乃馨】',
   425,
    '康乃馨包装材质：粉色菊花和黄色向日葵加花篮',
    '康乃馨的花语：热情、魅力、使人柔弱的爱、真情、母亲我爱你、温馨的祝福、热爱着你、慈祥、不求代价的母爱、宽容、母亲之花、浓郁的亲情、亲情思念、清纯的爱慕之情、热恋、热心、伤心与懊悔、伟大、神圣，慰问、心灵的相通、真挚、走运、思念。'
),
(   null,
    'p7933.jpg',
    'p7933-l.jpg',
    '【粉色玫瑰】',
    300,
    '粉玫瑰包装材质：丝带扎束	多层包装	绿叶',
    '粉玫瑰的花语是：初恋、特别的关怀、喜欢你那灿烂的微笑。粉玫瑰的寓意是：希望与你泛起激情的爱。粉玫瑰代表着感动、爱的宣言、铭记于心等等。 粉玫瑰的美，没有红玫瑰那么热烈和张扬，其象征的爱也没有那么炽热，但多了几分温暖、甜蜜和柔情，适合送给内心不是那么火热但很甜美的女孩。'
),
(   null,
    'p6611.jpg',
    'p6611-l.jpg',
    '【郁金香】',
    690,
    '郁金香包装材质：混搭花束	红玫瑰 红掌绿叶，太阳花，蛇鞭菊适量',
     '郁金香的花语：博爱.体贴.高雅.富贵.能干.聪颖。红色郁金香代表热烈的爱意；粉色郁金香代表永远的爱；黄色郁金香代表开朗 ；白色郁金香代表纯洁清高的恋情 ；黑色郁金香代表独特领袖权力.爱的表白、荣誉的皇冠、永恒的祝福； 红郁金香：爱的宣言、喜悦、热爱；黑郁金香：神秘，高贵；  紫郁金香：高贵的爱、无尽的爱；白郁金香：纯情、纯洁  粉郁金香：美人、热爱、爱惜、幸福  黄郁金香：高雅、珍贵、财富、友谊象征神圣、幸福与胜利。  红色郁金香：我爱你。紫色郁金香:忠贞的爱。黄色郁金香:没有希望的爱，白色郁金香：失恋。 黑郁金香：骑士精神（或忧郁的爱情）。'
    );
##SELECT * FROM fl_dish;

CREATE TABLE fl_order(
    oid INT PRIMARY KEY AUTO_INCREMENT,
    phone VARCHAR(16),
    user_name VARCHAR(16),
    sex INT,    /*1:男  2:女*/
    order_time LONG,
    addr VARCHAR(256),
    did INT
);
INSERT INTO fl_order(oid, phone,user_name,sex,order_time,addr,did) VALUES
(NULL,'13501234567','婷婷',2,1445154859209,'大钟寺中鼎B座',3),
(NULL,'13501234567','婷婷',2,1445254959209,'大钟寺中鼎B座',2),
(NULL,'13501234567','婷婷',2,1445354959209,'大钟寺中鼎B座',5);

##SELECT * FROM fl_order;