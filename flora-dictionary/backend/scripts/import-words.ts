import 'dotenv/config'
import { prisma } from '../src/config/database'

const WORDS: string[] = [
  // A
  'able','about','above','accept','account','achieve','across','act','action','activity',
  'actually','add','address','admit','adult','affect','after','again','age','ago',
  'agree','ahead','air','allow','already','also','although','always','among','animal',
  'another','answer','anxiety','appear','apple','apply','arm','army','around','ask',
  'attack','attention','avoid','awful','area','art','anger','alarm','access','advance',
  // B
  'baby','back','bad','bank','base','become','before','behind','believe','benefit',
  'better','beyond','black','blood','blue','board','book','both','break','bring',
  'build','business','blue','brain','brave','beach','beauty','begin','bread','breath',
  'bridge','bright','brother','brown','brush','butter','button','budget','burn','born',
  // C
  'call','calm','camera','cancer','care','carry','cause','certain','change','charge',
  'check','child','choice','choose','church','city','claim','class','clean','clear',
  'close','cloud','color','come','common','company','compare','complete','concern','condition',
  'confirm','connect','consider','contain','control','cook','cost','could','count','country',
  'cover','create','culture','customer','cut','coffee','courage','crowd','career','chance',
  // D
  'dance','dark','data','daughter','deal','decide','deep','define','deliver','describe',
  'design','detail','different','difficult','dinner','direction','discover','discuss','distance','doctor',
  'door','draw','dream','drive','during','death','defeat','demand','deserve','develop',
  'doubt','drama','drink','dress','dozen','daily','danger','decide','defend','depend',
  // E
  'each','early','earth','easy','edge','effect','effort','either','else','empty',
  'energy','enjoy','enter','entire','equal','especially','even','event','every','exact',
  'example','exist','expect','explain','express','experience','expert','explore','extend','extra',
  'earn','eat','effort','east','edge','election','emotion','enough','escape','evil',
  // F
  'face','fact','fail','fall','family','far','fast','father','feel','field',
  'fight','figure','final','find','fine','finger','fire','first','fish','floor',
  'fly','follow','food','force','forget','form','free','fresh','friend','front',
  'full','function','future','faith','fame','fear','female','focus','forest','forever',
  // G
  'game','garden','general','girl','give','glad','glass','goal','good','government',
  'great','green','ground','grow','guess','guide','guilt','give','grace','grand',
  'gray','grin','group','guard','gather','gain','gentle','gift','glory','gold',
  // H
  'hand','happen','happy','hard','hate','have','head','health','heart','heavy',
  'help','here','high','history','hold','home','hope','hospital','hour','house',
  'huge','human','humor','hurt','habit','heat','heaven','hide','honest','honor',
  'hunger','humble','hunt','husband','hero','hill','hire','horse','hotel','hot',
  // I
  'idea','identify','image','imagine','important','include','increase','indeed','indicate','industry',
  'inside','instead','interest','into','issue','item','impact','improve','invest','involve',
  'ignore','illness','injury','innocent','invite','island','itself','ideal','intense','intent',
  // J
  'job','join','joke','journal','journey','judge','jump','just','justice','jealous',
  // K
  'keep','kind','know','knowledge','kitchen','key','kick','kill','kingdom','knee',
  // L
  'large','last','late','laugh','lead','learn','leave','level','life','light',
  'like','limit','line','listen','little','live','local','long','look','lose',
  'love','low','lunch','language','leader','letter','library','lonely','luck','loud',
  // M
  'main','major','make','manage','market','match','matter','mean','meet','member',
  'memory','mind','model','money','month','more','mother','move','music','method',
  'moment','moon','morning','most','mouth','message','mistake','mountain','mystery','magic',
  // N
  'name','nature','near','need','never','news','next','night','normal','note',
  'nothing','notice','number','nurse','negative','network','novel','narrow','natural','nation',
  // O
  'object','offer','office','often','once','only','open','order','other','outside',
  'over','own','ocean','opinion','opportunity','original','outcome','overall','observe','obtain',
  // P
  'pain','paper','parent','part','pass','past','path','pay','peace','people',
  'person','picture','place','plan','plant','play','point','poor','power','present',
  'price','problem','process','promise','protect','provide','purpose','push','phone','prison',
  'proud','prefer','prepare','prevent','prove','public','pull','put','planet','pretty',
  // Q
  'question','quickly','quiet','quality','quarter','quite','quest','quick','quit','quote',
  // R
  'raise','reach','read','ready','real','reason','receive','reduce','remain','remember',
  'require','result','return','reveal','right','rise','risk','role','room','run',
  'rain','react','relate','release','replace','report','respect','rest','road','rock',
  // S
  'safe','same','scene','school','seem','sense','serve','share','show','side',
  'since','situation','size','small','social','some','sort','sound','speak','spend',
  'stand','start','stay','stop','story','strong','study','style','success','system',
  'save','sleep','smile','snow','south','space','special','speed','spirit','stage',
  'star','state','step','still','strange','street','stress','student','sun','support',
  // T
  'take','talk','tell','thank','think','those','though','time','today','together',
  'tomorrow','toward','town','travel','true','trust','turn','type','teach','team',
  'test','touch','trade','treat','tree','trial','trouble','truth','try','target',
  // U
  'under','understand','until','upon','upset','use','usual','unique','unite','update',
  'urban','urgent','useful','unit','upper','utter','ugly','unable','ultimate','unfair',
  // V
  'value','view','voice','vote','visit','various','victim','victory','vision','valid',
  // W
  'wait','walk','want','war','watch','water','week','well','west','whole',
  'wide','will','wind','wish','woman','wonder','word','work','world','write',
  'worry','wrong','weak','wealth','weapon','weather','weight','winter','wise','wake',
  // Y / Z
  'year','young','yourself','yesterday','yellow','zero','zone',
]

async function importWords() {
  console.log('Clearing existing data...')
  await prisma.history.deleteMany()
  await prisma.favorite.deleteMany()
  await prisma.word.deleteMany()

  const unique = [...new Set(WORDS.map((w) => w.toLowerCase().trim()))]
  const batch = unique.map((word) => ({ word }))

  await prisma.word.createMany({ data: batch, skipDuplicates: true })

  console.log(`Done. ${unique.length} words imported.`)
  await prisma.$disconnect()
}

importWords().catch((err: Error) => {
  console.error(err.message)
  process.exit(1)
})

