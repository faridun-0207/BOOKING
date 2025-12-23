
import { Book } from './types';

export const INITIAL_BOOKS: Book[] = [
  {
    id: '1',
    title: 'Тоҷикон',
    author: 'Бобоҷон Ғафуров',
    price: 150,
    category: 'Таърих',
    description: 'Асари монументалӣ дар бораи таърихи халқи тоҷик аз қадимтарин замонҳо то оғози асри XX.',
    coverImage: 'https://picsum.photos/seed/tojikon/400/600',
    stock: 25
  },
  {
    id: '2',
    title: 'Маснавии Маънавӣ',
    author: 'Ҷалолиддини Балхӣ',
    price: 120,
    category: 'Адабиёт',
    description: 'Яке аз бузургтарин асарҳои ирфонӣ ва адабии ҷаҳон.',
    coverImage: 'https://picsum.photos/seed/rumi/400/600',
    stock: 15
  },
  {
    id: '3',
    title: 'Сиёсатнома',
    author: 'Низом-ул-Мулк',
    price: 85,
    category: 'Таърих',
    description: 'Дастури идоракунии давлат ва ахлоқи сиёсӣ.',
    coverImage: 'https://picsum.photos/seed/siyosat/400/600',
    stock: 10
  },
  {
    id: '4',
    title: 'Панҷ панҷа',
    author: 'Сотим Улуғзода',
    price: 45,
    category: 'Адабиёт',
    description: 'Намунаи олитарини насри муосири тоҷик.',
    coverImage: 'https://picsum.photos/seed/ulugh/400/600',
    stock: 30
  },
  {
    id: '5',
    title: 'Физика барои ҳама',
    author: 'Ландау Л.Д.',
    price: 60,
    category: 'Илм',
    description: 'Китоби ҷолиб дар бораи қонунҳои асосии табиат.',
    coverImage: 'https://picsum.photos/seed/science/400/600',
    stock: 8
  },
  {
    id: '6',
    title: 'Афсонаҳои халқи тоҷик',
    author: 'Муаллифони гуногун',
    price: 35,
    category: 'Бачагона',
    description: 'Беҳтарин афсонаҳо барои кӯдакон бо забони сода.',
    coverImage: 'https://picsum.photos/seed/kids/400/600',
    stock: 50
  },
  {
    id: '7',
    title: 'Ёддоштҳо',
    author: 'Садриддин Айнӣ',
    price: 110,
    category: 'Адабиёт',
    description: 'Шоҳасари Садриддин Айнӣ, ки ҳаёти иҷтимоии Бухорои охири асри XIX-ро тасвир мекунад.',
    coverImage: 'https://picsum.photos/seed/ayni_yod/400/600',
    stock: 20
  },
  {
    id: '8',
    title: 'Дохунда',
    author: 'Садриддин Айнӣ',
    price: 75,
    category: 'Адабиёт',
    description: 'Романи машҳур дар бораи тақдири талхи деҳқонони тоҷик пеш аз инқилоб.',
    coverImage: 'https://picsum.photos/seed/dokhunda/400/600',
    stock: 12
  },
  {
    id: '9',
    title: 'Ғуломон',
    author: 'Садриддин Айнӣ',
    price: 95,
    category: 'Таърих',
    description: 'Аввалин романи таърихии тоҷик, ки ҳаёти ғуломонро инъикос мекунад.',
    coverImage: 'https://picsum.photos/seed/ghulomon/400/600',
    stock: 18
  },
  {
    id: '10',
    title: 'Фирдавсӣ',
    author: 'Сотим Улуғзода',
    price: 65,
    category: 'Адабиёт',
    description: 'Романи таърихӣ дар бораи ҳаёт ва эҷодиёти Ҳаким Фирдавсии Тӯсӣ.',
    coverImage: 'https://picsum.photos/seed/firdavsi_bio/400/600',
    stock: 15
  },
  {
    id: '11',
    title: 'Восеъ',
    author: 'Сотим Улуғзода',
    price: 55,
    category: 'Таърих',
    description: 'Драмаи таърихӣ дар бораи шӯриши Восеъ ва муборизаи халқ бар зидди зулм.',
    coverImage: 'https://picsum.photos/seed/vose/400/600',
    stock: 22
  },
  {
    id: '12',
    title: 'Духтари оташ',
    author: 'Ҷалол Икромӣ',
    price: 80,
    category: 'Адабиёт',
    description: 'Романи классикӣ дар бораи озодии зани тоҷик ва таҳаввулоти иҷтимоӣ.',
    coverImage: 'https://picsum.photos/seed/dukhtar/400/600',
    stock: 10
  },
  {
    id: '13',
    title: 'Шодӣ',
    author: 'Ҷалол Икромӣ',
    price: 40,
    category: 'Адабиёт',
    description: 'Романе, ки сохтмони ҳаёти навро дар Тоҷикистон тасвир менамояд.',
    coverImage: 'https://picsum.photos/seed/shodi/400/600',
    stock: 25
  },
  {
    id: '14',
    title: 'Палатаи кунҷакӣ',
    author: 'Фазлиддин Муҳаммадиев',
    price: 50,
    category: 'Психология',
    description: 'Асари амиқи фалсафӣ ва иҷтимоӣ дар бораи одамон ва ахлоқ.',
    coverImage: 'https://picsum.photos/seed/palata/400/600',
    stock: 14
  },
  {
    id: '15',
    title: 'Сарои санг',
    author: 'Мӯъмин Қаноат',
    price: 30,
    category: 'Адабиёт',
    description: 'Маҷмӯаи шеърҳои ватанпарваронаи шоири халқии Тоҷикистон.',
    coverImage: 'https://picsum.photos/seed/saroi_sang/400/600',
    stock: 40
  },
  {
    id: '16',
    title: 'Суруши Сталинград',
    author: 'Мӯъмин Қаноат',
    price: 35,
    category: 'Таърих',
    description: 'Достони машҳур дар бораи қаҳрамонии халқ дар Ҷанги Бузурги Ватанӣ.',
    coverImage: 'https://picsum.photos/seed/surush/400/600',
    stock: 35
  },
  {
    id: '17',
    title: 'Тоҷикон дар оинаи таърих',
    author: 'Эмомалӣ Раҳмон',
    price: 180,
    category: 'Таърих',
    description: 'Асари тадқиқотӣ дар бораи пайдоиш ва рушди тамаддуни тоҷикон.',
    coverImage: 'https://picsum.photos/seed/mirror_history/400/600',
    stock: 15
  },
  {
    id: '18',
    title: 'Девони Рӯдакӣ',
    author: 'Абуабдуллоҳ Рӯдакӣ',
    price: 70,
    category: 'Адабиёт',
    description: 'Маҷмӯаи ашъори Одамушшуаро, асосгузори адабиёти классикии тоҷику форс.',
    coverImage: 'https://picsum.photos/seed/rudaki_devon/400/600',
    stock: 20
  },
  {
    id: '19',
    title: 'Марги судхӯр',
    author: 'Садриддин Айнӣ',
    price: 50,
    category: 'Адабиёт',
    description: 'Повести ҳаҷвӣ дар бораи Қорӣ-Ишкамба ва ҷамъияти Бухорои кӯҳна.',
    coverImage: 'https://picsum.photos/seed/margi_sudkhur/400/600',
    stock: 30
  },
  {
    id: '20',
    title: 'Куллиёти Камоли Хуҷандӣ',
    author: 'Камоли Хуҷандӣ',
    price: 90,
    category: 'Адабиёт',
    description: 'Мероси адабии шоири ғазалсарои барҷастаи Хуҷанд.',
    coverImage: 'https://picsum.photos/seed/kamol_khujandi/400/600',
    stock: 12
  },
  {
    id: '21',
    title: 'Чаҳор мақола',
    author: 'Низомии Арӯзии Самарқандӣ',
    price: 55,
    category: 'Илм',
    description: 'Асари насрии асри XII дар бораи чаҳор пешаи зарурӣ: котибӣ, шоирӣ, нуҷум ва тиб.',
    coverImage: 'https://picsum.photos/seed/chahor_maqola/400/600',
    stock: 10
  },
  {
    id: '22',
    title: 'Шоҳнома (Ҷилди 1)',
    author: 'Абулқосим Фирдавсӣ',
    price: 130,
    category: 'Адабиёт',
    description: 'Шоҳасари ҳамосии ҷаҳонӣ, ки таъриху асотири Эронзаминро зинда кардааст.',
    coverImage: 'https://picsum.photos/seed/shohnoma/400/600',
    stock: 18
  },
  {
    id: '23',
    title: 'Гулистон',
    author: 'Саъдии Шерозӣ',
    price: 65,
    category: 'Адабиёт',
    description: 'Маҷмӯаи ҳикоёту пандҳои ахлоқӣ, ки бо насри мусаҷҷаъ навишта шудааст.',
    coverImage: 'https://picsum.photos/seed/guliston/400/600',
    stock: 25
  },
  {
    id: '24',
    title: 'Баҳористон',
    author: 'Абдураҳмони Ҷомӣ',
    price: 60,
    category: 'Адабиёт',
    description: 'Асари панду ахлоқии Мавлоно Ҷомӣ ба пайравии "Гулистон"-и Саъдӣ.',
    coverImage: 'https://picsum.photos/seed/bahoriston/400/600',
    stock: 22
  },
  {
    id: '25',
    title: 'Ҳикмати асрҳо',
    author: 'Бобоҷон Ғафуров',
    price: 80,
    category: 'Илм',
    description: 'Маҷмӯаи мақолаҳо дар бораи фарҳанг ва илми халқҳои Осиёи Марказӣ.',
    coverImage: 'https://picsum.photos/seed/hikmati_asrho/400/600',
    stock: 15
  },
  {
    id: '26',
    title: 'Овораи ватан',
    author: 'Ҷалол Икромӣ',
    price: 70,
    category: 'Адабиёт',
    description: 'Романи ҷолиб дар бораи тақдири зиёиёни тоҷик дар оғози асри XX.',
    coverImage: 'https://picsum.photos/seed/ovorai_vatan/400/600',
    stock: 10
  },
  {
    id: '27',
    title: 'Сафарнома',
    author: 'Носири Хусрав',
    price: 75,
    category: 'Таърих',
    description: 'Шарҳи сафарҳои ҳафтсолаи ҳаким Носири Хусрав ба кишварҳои мухталиф.',
    coverImage: 'https://picsum.photos/seed/safarnoma/400/600',
    stock: 12
  },
  {
    id: '28',
    title: 'Куллиёти Ҳофиз',
    author: 'Ҳофизи Шерозӣ',
    price: 90,
    category: 'Адабиёт',
    description: 'Маҷмӯаи ғазалиёти ноби шоири бузург, ки дар ҳар хонадони тоҷик мавҷуд аст.',
    coverImage: 'https://picsum.photos/seed/hafiz/400/600',
    stock: 30
  },
  {
    id: '29',
    title: 'Ҷаллодони Бухоро',
    author: 'Садриддин Айнӣ',
    price: 45,
    category: 'Таърих',
    description: 'Асари фоҷиабор дар бораи зулму истибдоди амирони Бухоро.',
    coverImage: 'https://picsum.photos/seed/jallodon/400/600',
    stock: 15
  },
  {
    id: '30',
    title: 'Модари тоҷик',
    author: 'Лоиқ Шералӣ',
    price: 55,
    category: 'Адабиёт',
    description: 'Маҷмӯаи шеърҳои самимии шоири маҳбуб дар васфи модар ва ватан.',
    coverImage: 'https://picsum.photos/seed/loiq_madar/400/600',
    stock: 40
  },
  {
    id: '31',
    title: 'Дафтари дил',
    author: 'Гулназар Келдӣ',
    price: 40,
    category: 'Адабиёт',
    description: 'Намунаи беҳтарини ашъори муаллифи Суруди миллии Тоҷикистон.',
    coverImage: 'https://picsum.photos/seed/gulnazar/400/600',
    stock: 20
  },
  {
    id: '32',
    title: 'Кимиёи саодат',
    author: 'Муҳаммади Ғазолӣ',
    price: 110,
    category: 'Илм',
    description: 'Асари ахлоқию ирфонии Имом Ғазолӣ, ки роҳи расидан ба саодатро меомӯзонад.',
    coverImage: 'https://picsum.photos/seed/ghazali/400/600',
    stock: 8
  },
  {
    id: '33',
    title: 'Сад панди Луқмони Ҳаким',
    author: 'Классика',
    price: 25,
    category: 'Бачагона',
    description: 'Пандҳои тарбиявӣ ва ахлоқӣ барои насли наврас.',
    coverImage: 'https://picsum.photos/seed/luqmon/400/600',
    stock: 100
  },
  {
    id: '34',
    title: 'Хазинаи тиллоии тоҷикон',
    author: 'Энсиклопедия',
    price: 200,
    category: 'Таърих',
    description: 'Маҷмӯаи мусаввари мероси фарҳангӣ ва таърихии халқи тоҷик.',
    coverImage: 'https://picsum.photos/seed/gold_treasure/400/600',
    stock: 5
  },
  {
    id: '35',
    title: 'Таърихи Байҳақӣ',
    author: 'Абулфазли Байҳақӣ',
    price: 140,
    category: 'Таърих',
    description: 'Яке аз муътамадтарин ва муфассалтарин асарҳои таърихии асри XI.',
    coverImage: 'https://picsum.photos/seed/bayhaqi/400/600',
    stock: 7
  },
  {
    id: '36',
    title: 'Асрори худӣ',
    author: 'Муҳаммад Иқбол',
    price: 65,
    category: 'Психология',
    description: 'Манзумаи фалсафии Иқболи Лоҳурӣ дар бораи шинохти зоти инсон ва қудрати ирода.',
    coverImage: 'https://picsum.photos/seed/iqbol_asror/400/600',
    stock: 14
  },
  {
    id: '37',
    title: 'Намунаи адабиёти тоҷик',
    author: 'Садриддин Айнӣ',
    price: 125,
    category: 'Таърих',
    description: 'Асари бунёдие, ки мавҷудияти миллати тоҷик ва таърихи адабиёти онро исбот кард.',
    coverImage: 'https://picsum.photos/seed/namuna/400/600',
    stock: 10
  },
  {
    id: '38',
    title: 'Тафсири Насафӣ',
    author: 'Абуҳафси Насафӣ',
    price: 160,
    category: 'Илм',
    description: 'Яке аз тафсирҳои муътабари Қуръон бо забони тоҷикии қадим.',
    coverImage: 'https://picsum.photos/seed/nasafi/400/600',
    stock: 6
  },
  {
    id: '39',
    title: 'Ҳазору як шаб',
    author: 'Тарҷумаи тоҷикӣ',
    price: 95,
    category: 'Адабиёт',
    description: 'Маҷмӯаи ҳикоёти ҷолиби Шарқ, ки бо забони равони тоҷикӣ пешкаш шудааст.',
    coverImage: 'https://picsum.photos/seed/1001nights/400/600',
    stock: 20
  },
  {
    id: '40',
    title: 'Фарҳанги забони тоҷикӣ',
    author: 'Академияи илмҳо',
    price: 250,
    category: 'Илм',
    description: 'Луғати муфассали дуҷилда, ки хазинаи калимоти забони тоҷикиро дар бар мегирад.',
    coverImage: 'https://picsum.photos/seed/dictionary/400/600',
    stock: 5
  },
  {
    id: '41',
    title: 'Ситораҳои Хуҷанд',
    author: 'Сайфиддин Акрамов',
    price: 45,
    category: 'Таърих',
    description: 'Дар бораи шахсиятҳои барҷастаи илму фарҳанги шаҳри бостонии Хуҷанд.',
    coverImage: 'https://picsum.photos/seed/khujand_stars/400/600',
    stock: 15
  },
  {
    id: '42',
    title: 'Зан ва оташ',
    author: 'Ҷалол Икромӣ',
    price: 70,
    category: 'Адабиёт',
    description: 'Романи ҷолиби таърихию иҷтимоӣ дар бораи тақдири зани тоҷик.',
    coverImage: 'https://picsum.photos/seed/woman_fire/400/600',
    stock: 12
  },
  {
    id: '43',
    title: 'Сад барги ғам',
    author: 'Лоиқ Шералӣ',
    price: 35,
    category: 'Адабиёт',
    description: 'Маҷмӯаи марсияҳо ва ғазалиёти сӯзони шоири халқии Тоҷикистон.',
    coverImage: 'https://picsum.photos/seed/loiq_sad/400/600',
    stock: 25
  },
  {
    id: '44',
    title: 'Мероси Одамушшуаро',
    author: 'Тадқиқот',
    price: 55,
    category: 'Илм',
    description: 'Таҳлили ҳаёт ва эҷодиёти сардафтари адабиёти тоҷику форс — Рӯдакӣ.',
    coverImage: 'https://picsum.photos/seed/rudaki_legacy/400/600',
    stock: 10
  },
  {
    id: '45',
    title: 'Ахлоқи Мӯҳсинӣ',
    author: 'Ҳусайн Воизи Кошифӣ',
    price: 60,
    category: 'Психология',
    description: 'Дастури ахлоқӣ ва тарбиявӣ, ки хислатҳои ҳамидаи инсониро шарҳ медиҳад.',
    coverImage: 'https://picsum.photos/seed/muhsini/400/600',
    stock: 18
  },
  {
    id: '46',
    title: 'Таърихи Табарӣ',
    author: 'Абӯҷаъфари Табарӣ',
    price: 180,
    category: 'Таърих',
    description: 'Яке аз бузургтарин ва муътамадтарин асарҳои таърихи ислом ва Эронзамин.',
    coverImage: 'https://picsum.photos/seed/tabari/400/600',
    stock: 4
  }
];
