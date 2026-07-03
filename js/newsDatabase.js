// ======================================
// SMARTMONEY NEWS DATABASE V2
// ======================================

const newsDatabase = [

/* ======================================
BANKING
====================================== */

{
    title:"Bank Indonesia menaikkan BI Rate 25 bps",
    sector:"Banking",
    effect:"bullish",
    impact:"High",
    min:3,
    max:6,
    duration:40,
    priority:5
},

{
    title:"Bank Indonesia memangkas BI Rate",
    sector:"Banking",
    effect:"bearish",
    impact:"Medium",
    min:-5,
    max:-2,
    duration:40,
    priority:4
},

{
    title:"Likuiditas perbankan meningkat",
    sector:"Banking",
    effect:"bullish",
    impact:"Medium",
    min:2,
    max:4,
    duration:40,
    priority:3
},

{
    title:"NPL perbankan meningkat",
    sector:"Banking",
    effect:"bearish",
    impact:"High",
    min:-6,
    max:-3,
    duration:40,
    priority:5
},

{
    title:"Laba bank melampaui ekspektasi",
    sector:"Banking",
    effect:"bullish",
    impact:"Medium",
    min:2,
    max:5,
    duration:40,
    priority:4
},

/* ======================================
MINING
====================================== */

{
    title:"Harga emas dunia melonjak",
    sector:"Mining",
    effect:"bullish",
    impact:"High",
    min:4,
    max:8,
    duration:40,
    priority:5
},

{
    title:"Harga nikel turun tajam",
    sector:"Mining",
    effect:"bearish",
    impact:"High",
    min:-8,
    max:-4,
    duration:40,
    priority:5
},

{
    title:"Pemerintah mempercepat hilirisasi",
    sector:"Mining",
    effect:"bullish",
    impact:"Medium",
    min:2,
    max:5,
    duration:40,
    priority:3
},

{
    title:"Harga batu bara melemah",
    sector:"Mining",
    effect:"bearish",
    impact:"Medium",
    min:-5,
    max:-2,
    duration:40,
    priority:3
},

/* ======================================
PROPERTY
====================================== */

{
    title:"PPN Properti diperpanjang",
    sector:"Property",
    effect:"bullish",
    impact:"High",
    min:5,
    max:9,
    duration:40,
    priority:5
},

{
    title:"Suku bunga KPR naik",
    sector:"Property",
    effect:"bearish",
    impact:"High",
    min:-7,
    max:-4,
    duration:40,
    priority:5
},

{
    title:"Penjualan rumah meningkat",
    sector:"Property",
    effect:"bullish",
    impact:"Medium",
    min:2,
    max:5,
    duration:40,
    priority:3
},

/* ======================================
TECHNOLOGY
====================================== */

{
    title:"Investor asing memborong saham teknologi",
    sector:"Technology",
    effect:"bullish",
    impact:"High",
    min:5,
    max:10,
    duration:40,
    priority:5
},

{
    title:"Pengguna aplikasi meningkat tajam",
    sector:"Technology",
    effect:"bullish",
    impact:"Medium",
    min:3,
    max:6,
    duration:40,
    priority:3
},

{
    title:"Pendapatan perusahaan teknologi turun",
    sector:"Technology",
    effect:"bearish",
    impact:"Medium",
    min:-6,
    max:-3,
    duration:40,
    priority:4
},

{
    title:"PHK massal di sektor teknologi",
    sector:"Technology",
    effect:"bearish",
    impact:"High",
    min:-10,
    max:-5,
    duration:40,
    priority:5
},

/* ======================================
CONSUMER
====================================== */

{
    title:"Daya beli masyarakat meningkat",
    sector:"Consumer",
    effect:"bullish",
    impact:"Medium",
    min:2,
    max:5,
    duration:40,
    priority:3
},

{
    title:"Inflasi melonjak",
    sector:"Consumer",
    effect:"bearish",
    impact:"Medium",
    min:-4,
    max:-2,
    duration:40,
    priority:3
},

{
    title:"Harga bahan baku turun",
    sector:"Consumer",
    effect:"bullish",
    impact:"Low",
    min:1,
    max:3,
    duration:40,
    priority:2
},

/* ======================================
TELECOMMUNICATION
====================================== */

{
    title:"Jumlah pelanggan internet meningkat",
    sector:"Telecommunication",
    effect:"bullish",
    impact:"Medium",
    min:2,
    max:5,
    duration:40,
    priority:3
},

{
    title:"Peluncuran jaringan 5G nasional",
    sector:"Telecommunication",
    effect:"bullish",
    impact:"High",
    min:4,
    max:7,
    duration:40,
    priority:5
},

{
    title:"Persaingan tarif semakin ketat",
    sector:"Telecommunication",
    effect:"bearish",
    impact:"Medium",
    min:-5,
    max:-2,
    duration:40,
    priority:3
},

/* ======================================
GLOBAL
====================================== */

{
    title:"The Fed menaikkan suku bunga",
    sector:"ALL",
    effect:"bearish",
    impact:"High",
    min:-4,
    max:-8,
    duration:40,
    priority:5
},

{
    title:"The Fed menurunkan suku bunga",
    sector:"ALL",
    effect:"bullish",
    impact:"High",
    min:4,
    max:8,
    duration:40,
    priority:5
},

{
    title:"Dana asing masuk ke IHSG",
    sector:"ALL",
    effect:"bullish",
    impact:"Medium",
    min:2,
    max:5,
    duration:40,
    priority:4
},

{
    title:"Geopolitik global memanas",
    sector:"ALL",
    effect:"bearish",
    impact:"Extreme",
    min:-8,
    max:-15,
    duration:40,
    priority:5
}

];