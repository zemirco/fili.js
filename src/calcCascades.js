'use strict';

var IirCoeffs = require('./iirCoeffs');

var getCoeffs = new IirCoeffs();

var table = {
  // values from https://gist.github.com/endolith/4982787#file-all-values-txt
  bessel: {
    q: [
      [0.57735026919],
      [0.805538281842, 0.521934581669],
      [1.02331395383, 0.611194546878, 0.510317824749],
      [1.22566942541, 0.710852074442, 0.559609164796, 0.505991069397],
      [1.41530886916, 0.809790964842, 0.620470155556, 0.537552151325, 0.503912727276],
      [1.59465693507, 0.905947107025, 0.684008068137, 0.579367238641, 0.525936202016, 0.502755558204],
      [1.76552743493, 0.998998442993, 0.747625068271, 0.624777082395, 0.556680772868, 0.519027293158, 0.502045428643],
      [1.9292718407, 1.08906376917, 0.810410302962, 0.671382379377, 0.591144659703, 0.542678365981, 0.514570953471, 0.501578400482],
      [2.08691792612, 1.17637337045, 0.872034231424, 0.718163551101, 0.627261751983, 0.569890924765, 0.533371782078, 0.511523796759, 0.50125489338],
      [2.23926560629, 1.26117120993, 0.932397288146, 0.764647810579, 0.664052481472, 0.598921924986, 0.555480327396, 0.526848630061, 0.509345928377, 0.501021580965],
      [2.38695091667, 1.34368488961, 0.991497755204, 0.81060830488, 0.701011199665, 0.628878390935, 0.57943181849, 0.545207253735, 0.52208637596, 0.507736060535, 0.500847111042],
      [2.53048919562, 1.42411783481, 1.04937620183, 0.85593899901, 0.737862159044, 0.659265671705, 0.604435823473, 0.565352679646, 0.537608804383, 0.51849505465, 0.506508536474, 0.500715908905]
    ],
    f3dB: [
      [1.27201964951],
      [1.60335751622, 1.43017155999],
      [1.9047076123, 1.68916826762, 1.60391912877],
      [2.18872623053, 1.95319575902, 1.8320926012, 1.77846591177],
      [2.45062684305, 2.20375262593, 2.06220731793, 1.98055310881, 1.94270419166],
      [2.69298925084, 2.43912611431, 2.28431825401, 2.18496722634, 2.12472538477, 2.09613322542],
      [2.91905714471, 2.66069088948, 2.49663434571, 2.38497976939, 2.30961462222, 2.26265746534, 2.24005716132],
      [3.13149167404, 2.87016099416, 2.69935018044, 2.57862945683, 2.49225505119, 2.43227707449, 2.39427710712, 2.37582307687],
      [3.33237300564, 3.06908580184, 2.89318259511, 2.76551588399, 2.67073340527, 2.60094950474, 2.55161764546, 2.52001358804, 2.50457164552],
      [3.52333123464, 3.25877569704, 3.07894353744, 2.94580435024, 2.84438325189, 2.76691082498, 2.70881411245, 2.66724655259, 2.64040228249, 2.62723439989],
      [3.70566068548, 3.44032173223, 3.2574059854, 3.11986367838, 3.01307175388, 2.92939234605, 2.86428726094, 2.81483068055, 2.77915465405, 2.75596888377, 2.74456638588],
      [3.88040469682, 3.61463243697, 3.4292654707, 3.28812274966, 3.17689762788, 3.08812364257, 3.01720732972, 2.96140104561, 2.91862858495, 2.88729479473, 2.8674198668, 2.8570800015]
    ],
    f1dB: [
      [2.16477559371],
      [2.70320928596, 2.41122332505],
      [3.25676581436, 2.88822569572, 2.74246238837],
      [3.76153580353, 3.35675411406, 3.14862673032, 3.05646412475],
      [4.22174260104, 3.79644757806, 3.55260471864, 3.41193742197, 3.34673435508],
      [4.64584812552, 4.20789257981, 3.94082363122, 3.76942681446, 3.66549975744, 3.61617359345],
      [5.04060395196, 4.5944592201, 4.3111677248, 4.11836351827, 3.98822359814, 3.90713836715, 3.86811234525],
      [5.41107948467, 4.95951159709, 4.66435804468, 4.45575796102, 4.30650679478, 4.20286750045, 4.13720522991, 4.10531748119],
      [5.76110791853, 5.30592898465, 5.00182215701, 4.7811081045, 4.61724509926, 4.49660100894, 4.41131378918, 4.35667671372, 4.32997951075],
      [6.09364309488, 5.63609116014, 5.32506930789, 5.09480346139, 4.91939504255, 4.78540258409, 4.68493280536, 4.61302286993, 4.56661931366, 4.54382759952],
      [6.41100731543, 5.95195558182, 5.63550073656, 5.39754464742, 5.21278891332, 5.06801430334, 4.95539684456, 4.8697869429, 4.80814951843, 4.76793469612, 4.74828032403],
      [6.71506056052, 6.25514029778, 5.9343616072, 5.69011422355, 5.49763642361, 5.34401973764, 5.22125973611, 5.12485045619, 5.05037962112, 4.99699982231, 4.96155789635, 4.94441828777]
    ]
  }
};

// from Texas Instruments "Op Amps for Everyone" Chapter 16 "Active Filter Design Techniques"
var tiTable = {
  bessel: {
    as: [
      [1.3617],
      [1.3397, 0.7743],
      [1.2217, 0.9686, 0.5131],
      [1.1112, 0.9754, 0.7202, 0.3728],
      [1.0215, 0.9393, 0.7815, 0.5604, 0.2883]
    ],
    bs: [
      [0.6180],
      [0.4889, 0.3890],
      [0.3887, 0.3505, 0.2756],
      [0.3162, 0.2979, 0.2621, 0.2087],
      [0.2650, 0.2549, 0.2351, 0.2059, 0.1665]
    ]
  },
  butterworth: {
    as: [
      [1.4142],
      [1.8478, 0.7654],
      [1.9319, 1.4142, 0.5176],
      [1.9616, 1.6629, 1.1111, 0.3902],
      [1.9754, 1.7820, 1.4142, 0.9080, 0.3129]
    ],
    bs: [
      [1.0],
      [1.0, 1.0],
      [1.0, 1.0, 1.0],
      [1.0, 1.0, 1.0, 1.0],
      [1.0, 1.0, 1.0, 1.0, 1.0]
    ]
  },
  tschebyscheff05: {
    as: [
      [1.3614],
      [2.6282, 0.3648],
      [3.8645, 0.7528, 0.1589],
      [5.1117, 1.0639, 0.3439, 0.0885],
      [6.3648, 1.3582, 0.4822, 0.1994, 0.0563]
    ],
    bs: [
      [1.3827],
      [3.4341, 1.1509],
      [6.9797, 1.8573, 1.0711],
      [11.9607, 2.9365, 1.4206, 1.0407],
      [18.3695, 4.3453, 1.9440, 1.2520, 1.0263]
    ]
  },
  tschebyscheff1: {
    as: [
      [1.3022],
      [2.5904, 0.3039],
      [3.8437, 0.6292, 0.1296],
      [5.1019, 0.8916, 0.2806, 0.0717],
      [6.3634, 1.1399, 0.3939, 0.1616, 0.0455]
    ],
    bs: [
      [1.5515],
      [4.1301, 1.1697],
      [8.5529, 1.9124, 1.0766],
      [14.7608, 3.0426, 1.4334, 1.0432],
      [22.7468, 4.5167, 1.9665, 1.2569, 1.0277]
    ]
  },
  tschebyscheff2: {
    as: [
      [1.1813],
      [2.4025, 0.2374],
      [3.5880, 0.4925, 0.0995],
      [4.7743, 0.6991, 0.2153, 0.0547],
      [5.9618, 0.8947, 0.3023, 0.1233, 0.0347]
    ],
    bs: [
      [1.7775],
      [4.9862, 1.1896],
      [10.4648, 1.9622, 1.0826],
      [18.1510, 3.1353, 1.4449, 1.0461],
      [28.0376, 4.6644, 1.9858, 1.2614, 1.0294]
    ]
  },
  tschebyscheff3: {
    as: [
      [1.0650],
      [2.1853, 0.1964],
      [3.2721, 0.4077, 0.0815],
      [4.3583, 0.5791, 0.1765, 0.0448],
      [5.4449, 0.7414, 0.2479, 0.1008, 0.0283]
    ],
    bs: [
      [1.9305],
      [5.5339, 1.2009],
      [11.6773, 1.9873, 1.0861],
      [20.2948, 3.1808, 1.4507, 1.0478],
      [31.3788, 4.7363, 1.9952, 1.2638, 1.0304]
    ]
  },
  allpass: {
    as: [
      [1.6278],
      [2.3370, 1.3506],
      [2.6117, 2.0706, 1.0967],
      [2.7541, 2.4174, 1.7850, 0.9239],
      [2.8406, 2.6120, 2.1733, 1.5583, 0.8018]
    ],
    bs: [
      [0.8832],
      [1.4878, 1.1837],
      [1.7763, 1.6015, 1.2596],
      [1.9420, 1.8300, 1.6101, 1.2822],
      [2.0490, 1.9714, 1.8184, 1.5923, 1.2877]
    ]
  },
}

var calcCoeffs = function (params, behavior) {
  var filter = [];
  var cnt = 0;
  if (behavior !== 'fromPZ') {
    if (params.order > 12) {
      params.order = 12;
    }
    for (cnt = 0; cnt < params.order; cnt++) {
      var q, f, fd;
      if (params.transform === 'matchedZ') {
        filter.push(getCoeffs['lowpassMZ']({
          Fs: params.Fs,
          Fc: params.Fc,
          as: tiTable[params.characteristic].as[params.order - 1][cnt],
          bs: tiTable[params.characteristic].bs[params.order - 1][cnt]
        }));
      } else {
        if (params.characteristic === 'butterworth') {
          q = 0.5 / (Math.sin((Math.PI / (params.order * 2)) * (cnt + 0.5)));
          f = 1;
        } else {
          q = table[params.characteristic].q[params.order - 1][cnt];
          if (params.oneDb) {
            f = table[params.characteristic].f1dB[params.order - 1][cnt];
          } else {
            f = table[params.characteristic].f3dB[params.order - 1][cnt];
          }
        }

        if (behavior === 'highpass') {
          fd = params.Fc / f;
        } else {
          fd = params.Fc * f;
        }
        filter.push(getCoeffs[behavior]({
          Fs: params.Fs,
          Fc: fd,
          Q: q,
          BW: params.BW || 0,
          gain: params.gain || 0,
          preGain: params.preGain || false
        }));
      }
    }
  } else {
    for (cnt = 0; cnt < params.length; cnt++) {
      filter.push(getCoeffs[behavior](params[cnt]));
    }

  }

  return filter;
};

var initCalcCoeffs = function (behavior) {
  return function (params) {
    return calcCoeffs(params, behavior);
  };
};

var self = {};
var CalcCascades = function () {
  for (var k in getCoeffs) {
    self[k] = initCalcCoeffs(k);
  }
  return self;
};

module.exports = CalcCascades;
