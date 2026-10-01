// demo-data.js - FICTIONAL sample land records for the MCL-LRMS demonstration.
// Every village, name, plot, area, date, reference and coordinate here is MADE UP.
// Boundaries are drawn on a synthetic grid; they are NOT real parcels or real MCL land.

var DEMO = (function () {
  var TAHASIL = "Kaniha", DISTRICT = "Angul";
  // Synthetic grid origin (not a surveyed location)
  // Site reference point given by the team (Kaniha Area). The demo villages are laid
  // out around it on a synthetic grid; their positions are NOT real village locations.
  var SITE = [21.079030, 85.041853];
  // Offsets (degrees) of each demo village's grid corner from the site point
  var OFFSET = {
    "Demopur (DEMO)": [0.0028, -0.0073], "Sampleguda (DEMO)": [-0.0017, 0.0012], "Testpali (DEMO)": [-0.0017, -0.0063],
    "Mockgarh (DEMO)": [0.0068, -0.0003], "Dummypada (DEMO)": [-0.0062, -0.0073], "Pilotnagar (DEMO)": [-0.0062, 0.0017],
    "Trialpur (DEMO)": [0.0078, -0.0093], "Modelguda (DEMO)": [0.0028, 0.0077]
  };
  var ORIGIN = {};
  Object.keys(OFFSET).forEach(function (v) { ORIGIN[v] = [SITE[0] + OFFSET[v][0], SITE[1] + OFFSET[v][1]]; });
  var CELL_LAT = 0.00052, CELL_LNG = 0.00056; // about 58 m x 58 m (~0.83 acre)

  // Deterministic small jitter so plots look hand-drawn rather than a perfect grid
  function jit(seed) { var x = Math.sin(seed * 12.9898) * 43758.5453; return (x - Math.floor(x) - 0.5) * 0.00005; }
  function cell(village, r, c, seed) {
    var o = ORIGIN[village], la = o[0] - r * CELL_LAT, ln = o[1] + c * CELL_LNG;
    return [
      [la + jit(seed + 1), ln + jit(seed + 2)],
      [la + jit(seed + 3), ln + CELL_LNG + jit(seed + 4)],
      [la - CELL_LAT + jit(seed + 5), ln + CELL_LNG + jit(seed + 6)],
      [la - CELL_LAT + jit(seed + 7), ln + jit(seed + 8)]
    ];
  }

  // r/c = grid position; poly:false = location could not be reconstructed
  var raw = [
    { id: "DP-145-234", v: "Demopur (DEMO)", khata: "145", plot: "234", areaAcq: 0.82, areaRec: 0.81, acquired: 0.82, type: "Agricultural (Sarad)",
      owner: "DEMO Owner Alpha", notif: "DEMO/LA/CBA/2009/017", acqDate: "2010-03-15", comp: "Paid", rr: "Provided", emp: "Employment provided",
      possession: "Pending", demarcation: "Pending", map: "Scanned acquisition map (1:4000, DEMO)", status: "Orange", conf: 92, r: 0, c: 1,
      sources: [{ doc: "Award statement (DEMO)", plot: "234", khata: "145", name: "DEMO Owner Alpha" },
                { doc: "Land record extract (DEMO)", plot: "234", khata: "145", name: "DEMO Ownr Alfa" }],
      landmarks: "About 120 m south-east of Sample Pond; east of Sample Village Road" },
    { id: "DP-145-235", v: "Demopur (DEMO)", khata: "145", plot: "235", areaAcq: 0.64, areaRec: 0.64, acquired: 0.64, type: "Agricultural (Sarad)",
      owner: "DEMO Owner Alpha", notif: "DEMO/LA/CBA/2009/017", acqDate: "2010-03-15", comp: "Paid", rr: "Provided", emp: "Annuity",
      possession: "Completed", demarcation: "Completed", map: "Scanned acquisition map (1:4000, DEMO)", status: "Green", conf: 88, r: 0, c: 2,
      sources: [{ doc: "Award statement (DEMO)", plot: "235", khata: "145", name: "DEMO Owner Alpha" }], landmarks: "Next to Plot 234" },
    { id: "DP-121-124", v: "Demopur (DEMO)", khata: "121", plot: "124", areaAcq: 1.10, areaRec: 1.10, acquired: 1.10, type: "Homestead (Gharabari)",
      owner: "DEMO Owner Beta", notif: "DEMO/LA/CBA/2009/017", acqDate: "2010-03-15", comp: "Paid", rr: "Under process", emp: "Cash compensation (CC)",
      possession: "Pending", demarcation: "Pending", map: "Scanned acquisition map (1:4000, DEMO)", status: "Orange", conf: 71, r: 1, c: 0,
      sources: [{ doc: "Award statement (DEMO)", plot: "124/356", khata: "121", name: "DEMO Owner Beta" }],
      landmarks: "Near Sample Primary School (DEMO)" },
    { id: "DP-121-125", v: "Demopur (DEMO)", khata: "121", plot: "125", areaAcq: 0.45, areaRec: 0.45, acquired: 0.45, type: "Agricultural (Bahal)",
      owner: "DEMO Owner Beta", notif: "DEMO/LA/CBA/2009/017", acqDate: "2010-03-15", comp: "Paid", rr: "Provided", emp: "Not applicable",
      possession: "Pending", demarcation: "Pending", map: "Scanned acquisition map (1:4000, DEMO)", status: "Yellow", conf: 84, r: 1, c: 1,
      sources: [{ doc: "Award statement (DEMO)", plot: "125", khata: "121", name: "DEMO Owner Beta" }], landmarks: "West of Sample Village Road" },
    { id: "DP-121-126", v: "Demopur (DEMO)", khata: "121", plot: "126", areaAcq: 0.38, areaRec: 0.38, acquired: 0.38, type: "Agricultural (Bahal)",
      owner: "DEMO Owner Gamma", notif: "DEMO/LA/CBA/2011/042", acqDate: "2012-07-02", comp: "Paid", rr: "Provided", emp: "Employment provided",
      possession: "Completed", demarcation: "Completed", map: "Scanned acquisition map (1:4000, DEMO)", status: "Blue", conf: 90, r: 1, c: 2,
      sources: [{ doc: "Award statement (DEMO)", plot: "126", khata: "121", name: "DEMO Owner Gamma" }], landmarks: "-" },
    { id: "DP-150-240", v: "Demopur (DEMO)", khata: "150", plot: "240", areaAcq: 0.95, areaRec: 0.95, acquired: 0.95, type: "Uncultivable (Anabadi)",
      owner: "DEMO Owner Delta", notif: "DEMO/LA/CBA/2011/042", acqDate: "2012-07-02", comp: "Paid", rr: "Not applicable", emp: "Not applicable",
      possession: "Completed", demarcation: "Completed", map: "Scanned acquisition map (1:4000, DEMO)", status: "Green", conf: 95, r: 0, c: 0,
      sources: [{ doc: "Award statement (DEMO)", plot: "240", khata: "150", name: "DEMO Owner Delta" }], landmarks: "Adjoining Sample Pond" },
    { id: "DP-150-241", v: "Demopur (DEMO)", khata: "150", plot: "241", areaAcq: 0.30, areaRec: 0.30, acquired: 0.30, type: "Agricultural (Sarad)",
      owner: "DEMO Owner Delta", notif: "DEMO/LA/CBA/2011/042", acqDate: "2012-07-02", comp: "Paid", rr: "Provided", emp: "Annuity",
      possession: "Pending", demarcation: "Not started", map: "Map sheet damaged - plot line unclear", status: "Red", conf: null, r: null, c: null,
      sources: [{ doc: "Award statement (DEMO)", plot: "241", khata: "150", name: "DEMO Owner Delta" }], landmarks: "Reported near Sample Nala (unconfirmed)" },
    { id: "SG-032-011", v: "Sampleguda (DEMO)", khata: "32", plot: "11", areaAcq: 0.70, areaRec: 0.72, acquired: 0.70, type: "Agricultural (Sarad)",
      owner: "DEMO Owner Epsilon", notif: "DEMO/LA/CBA/2014/008", acqDate: "2015-01-20", comp: "Paid", rr: "Provided", emp: "Employment provided",
      possession: "Pending", demarcation: "Pending", map: "Scanned acquisition map (1:4000, DEMO)", status: "Yellow", conf: 68, r: 0, c: 0,
      sources: [{ doc: "Award statement (DEMO)", plot: "11", khata: "32", name: "DEMO Owner Epsilon" }], landmarks: "North of Sample Temple (DEMO)" },
    { id: "SG-032-012", v: "Sampleguda (DEMO)", khata: "32", plot: "12", areaAcq: 0.55, areaRec: 0.55, acquired: 0.55, type: "Agricultural (Bahal)",
      owner: "DEMO Owner Epsilon", notif: "DEMO/LA/CBA/2014/008", acqDate: "2015-01-20", comp: "Paid", rr: "Provided", emp: "Cash compensation (CC)",
      possession: "Completed", demarcation: "Completed", map: "Scanned acquisition map (1:4000, DEMO)", status: "Green", conf: 91, r: 0, c: 1,
      sources: [{ doc: "Award statement (DEMO)", plot: "12", khata: "32", name: "DEMO Owner Epsilon" }], landmarks: "-" },
    { id: "TP-040-019", v: "Testpali (DEMO)", khata: "40", plot: "19", areaAcq: 1.25, areaRec: 1.25, acquired: 1.00, type: "Homestead (Gharabari)",
      owner: "DEMO Owner Zeta", notif: "DEMO/LA/CBA/2014/008", acqDate: "2015-01-20", comp: "Partly paid", rr: "Under process", emp: "Under process",
      possession: "Pending", demarcation: "Pending", map: "Scanned acquisition map (1:4000, DEMO)", status: "Yellow", conf: 55, r: 0, c: 0,
      sources: [{ doc: "Award statement (DEMO)", plot: "19", khata: "40", name: "DEMO Owner Zeta" }], landmarks: "Near Sample Road junction" },
    { id: "TP-040-020", v: "Testpali (DEMO)", khata: "40", plot: "20", areaAcq: 0.40, areaRec: 0.40, acquired: 0.40, type: "Agricultural (Sarad)",
      owner: "DEMO Owner Zeta", notif: "DEMO/LA/CBA/2014/008", acqDate: "2015-01-20", comp: "Paid", rr: "Provided", emp: "Annuity",
      possession: "Pending", demarcation: "Not started", map: "Not available", status: "Red", conf: null, r: null, c: null,
      sources: [{ doc: "Land record extract (DEMO)", plot: "20", khata: "40", name: "DEMO Owner Zeta" }], landmarks: "-" },
    { id: "TP-041-021", v: "Testpali (DEMO)", khata: "41", plot: "21", areaAcq: 0.62, areaRec: 0.62, acquired: 0.62, type: "Agricultural (Bahal)",
      owner: "DEMO Owner Eta", notif: "DEMO/LA/CBA/2014/008", acqDate: "2015-01-20", comp: "Paid", rr: "Provided", emp: "Employment provided",
      possession: "Completed", demarcation: "Completed", map: "Scanned acquisition map (1:4000, DEMO)", status: "Blue", conf: 87, r: 0, c: 1,
      sources: [{ doc: "Award statement (DEMO)", plot: "21", khata: "41", name: "DEMO Owner Eta" }], landmarks: "-" },
    { id: "MG-058-301", v: "Mockgarh (DEMO)", khata: "58", plot: "301", areaAcq: 0.74, areaRec: 0.74, acquired: 0.74, type: "Agricultural (Sarad)",
      owner: "DEMO Owner Theta", notif: "DEMO/LA/CBA/2016/021", acqDate: "2017-02-10", comp: "Paid", rr: "Provided", emp: "Employment provided",
      possession: "Completed", demarcation: "Completed", map: "Scanned acquisition map (1:4000, DEMO)", status: "Green", conf: 89, r: 0, c: 0,
      sources: [{ doc: "Award statement (DEMO)", plot: "301", khata: "58", name: "DEMO Owner Theta" }], landmarks: "-" },
    { id: "MG-058-302", v: "Mockgarh (DEMO)", khata: "58", plot: "302", areaAcq: 0.51, areaRec: 0.51, acquired: 0.51, type: "Agricultural (Bahal)",
      owner: "DEMO Owner Theta", notif: "DEMO/LA/CBA/2016/021", acqDate: "2017-02-10", comp: "Paid", rr: "Under process", emp: "Annuity",
      possession: "Pending", demarcation: "Pending", map: "Scanned acquisition map (1:4000, DEMO)", status: "Yellow", conf: 77, r: 0, c: 1,
      sources: [{ doc: "Award statement (DEMO)", plot: "302", khata: "58", name: "DEMO Owner Theta" }], landmarks: "-" },
    { id: "DM-012-077", v: "Dummypada (DEMO)", khata: "12", plot: "77", areaAcq: 0.88, areaRec: 0.88, acquired: 0.88, type: "Agricultural (Sarad)",
      owner: "DEMO Owner Iota", notif: "DEMO/LA/CBA/2016/021", acqDate: "2017-02-10", comp: "Paid", rr: "Provided", emp: "Cash compensation (CC)",
      possession: "Pending", demarcation: "Pending", map: "Scanned acquisition map (1:4000, DEMO)", status: "Orange", conf: 74, r: 0, c: 0,
      sources: [{ doc: "Award statement (DEMO)", plot: "77", khata: "13", name: "DEMO Owner Iota" }], landmarks: "-" },
    { id: "DM-012-078", v: "Dummypada (DEMO)", khata: "12", plot: "78", areaAcq: 0.33, areaRec: 0.33, acquired: 0.33, type: "Uncultivable (Anabadi)",
      owner: "DEMO Owner Iota", notif: "DEMO/LA/CBA/2016/021", acqDate: "2017-02-10", comp: "Paid", rr: "Not applicable", emp: "Not applicable",
      possession: "Completed", demarcation: "Completed", map: "Scanned acquisition map (1:4000, DEMO)", status: "Green", conf: 93, r: 0, c: 1,
      sources: [{ doc: "Award statement (DEMO)", plot: "78", khata: "12", name: "DEMO Owner Iota" }], landmarks: "-" },
    { id: "PN-205-410", v: "Pilotnagar (DEMO)", khata: "205", plot: "410", areaAcq: 0.92, areaRec: 0.92, acquired: 0.92, type: "Agricultural (Bahal)",
      owner: "DEMO Owner Kappa", notif: "DEMO/LA/CBA/2018/005", acqDate: "2019-08-26", comp: "Paid", rr: "Provided", emp: "Employment provided",
      possession: "Completed", demarcation: "Completed", map: "Scanned acquisition map (1:4000, DEMO)", status: "Blue", conf: 86, r: 0, c: 0,
      sources: [{ doc: "Award statement (DEMO)", plot: "410", khata: "205", name: "DEMO Owner Kappa" }], landmarks: "-" },
    { id: "PN-205-411", v: "Pilotnagar (DEMO)", khata: "205", plot: "411", areaAcq: 0.47, areaRec: 0.47, acquired: 0.47, type: "Agricultural (Sarad)",
      owner: "DEMO Owner Kappa", notif: "DEMO/LA/CBA/2018/005", acqDate: "2019-08-26", comp: "Partly paid", rr: "Under process", emp: "Under process",
      possession: "Pending", demarcation: "Pending", map: "Scanned acquisition map (1:4000, DEMO)", status: "Yellow", conf: 63, r: 0, c: 1,
      sources: [{ doc: "Award statement (DEMO)", plot: "411", khata: "205", name: "DEMO Owner Kappa" }], landmarks: "-" },
    { id: "TR-088-056", v: "Trialpur (DEMO)", khata: "88", plot: "56", areaAcq: 0.69, areaRec: 0.69, acquired: 0.69, type: "Homestead (Gharabari)",
      owner: "DEMO Owner Lambda", notif: "DEMO/LA/CBA/2018/005", acqDate: "2019-08-26", comp: "Paid", rr: "Provided", emp: "Employment provided",
      possession: "Completed", demarcation: "Completed", map: "Scanned acquisition map (1:4000, DEMO)", status: "Green", conf: 90, r: 0, c: 0,
      sources: [{ doc: "Award statement (DEMO)", plot: "56", khata: "88", name: "DEMO Owner Lambda" }], landmarks: "-" },
    { id: "TR-088-057", v: "Trialpur (DEMO)", khata: "88", plot: "57", areaAcq: 0.28, areaRec: 0.28, acquired: 0.28, type: "Agricultural (Sarad)",
      owner: "DEMO Owner Lambda", notif: "DEMO/LA/CBA/2018/005", acqDate: "2019-08-26", comp: "Paid", rr: "Provided", emp: "Annuity",
      possession: "Pending", demarcation: "Not started", map: "Map sheet missing", status: "Red", conf: null, r: null, c: null,
      sources: [{ doc: "Land record extract (DEMO)", plot: "57", khata: "88", name: "DEMO Owner Lambda" }], landmarks: "-" },
    { id: "MD-019-140", v: "Modelguda (DEMO)", khata: "19", plot: "140", areaAcq: 0.80, areaRec: 0.78, acquired: 0.80, type: "Agricultural (Bahal)",
      owner: "DEMO Owner Mu", notif: "DEMO/LA/CBA/2020/012", acqDate: "2021-04-05", comp: "Paid", rr: "Provided", emp: "Cash compensation (CC)",
      possession: "Pending", demarcation: "Pending", map: "Scanned acquisition map (1:4000, DEMO)", status: "Yellow", conf: 70, r: 0, c: 0,
      sources: [{ doc: "Award statement (DEMO)", plot: "140", khata: "19", name: "DEMO Owner Mu" }], landmarks: "-" },
    { id: "MD-019-141", v: "Modelguda (DEMO)", khata: "19", plot: "141", areaAcq: 0.58, areaRec: 0.58, acquired: 0.58, type: "Agricultural (Sarad)",
      owner: "DEMO Owner Mu", notif: "DEMO/LA/CBA/2020/012", acqDate: "2021-04-05", comp: "Paid", rr: "Provided", emp: "Employment provided",
      possession: "Completed", demarcation: "Completed", map: "Scanned acquisition map (1:4000, DEMO)", status: "Green", conf: 91, r: 0, c: 1,
      sources: [{ doc: "Award statement (DEMO)", plot: "141", khata: "19", name: "DEMO Owner Mu" }], landmarks: "-" }
  ];

  var plots = raw.map(function (p, i) {
    return {
      id: p.id, village: p.v, tahasil: TAHASIL, district: DISTRICT, khata: p.khata, plot: p.plot,
      areaAcq: p.areaAcq, areaRec: p.areaRec, acquired: p.acquired, landType: p.type, owner: p.owner,
      notif: p.notif, acqDate: p.acqDate, comp: p.comp, rr: p.rr, emp: p.emp, possession: p.possession,
      demarcation: p.demarcation, map: p.map, status: p.status, confidence: p.conf,
      fieldStatus: p.status === "Blue" || p.status === "Green" ? "Completed" : "Pending",
      polygon: p.r == null ? null : cell(p.v, p.r, p.c, (i + 1) * 17),
      polygonSource: p.r == null ? null : "AI reconstruction from scanned map (DEMO)",
      sources: p.sources, landmarks: p.landmarks,
      documents: ["Award statement (DEMO).pdf", "Acquisition map sheet 3 (DEMO).jpg", "Land record extract (DEMO).pdf"],
      remarks: "DEMO record", lastUpdatedBy: "DEMO-LRO-01", lastUpdated: "2026-06-30"
    };
  });

  function box(village, rows, cols, pad) {
    var o = ORIGIN[village];
    return [[o[0] + pad, o[1] - pad], [o[0] + pad, o[1] + cols * CELL_LNG + pad],
            [o[0] - rows * CELL_LAT - pad, o[1] + cols * CELL_LNG + pad], [o[0] - rows * CELL_LAT - pad, o[1] - pad]];
  }
  function at(village, dLat, dLng) { var o = ORIGIN[village]; return [o[0] + dLat, o[1] + dLng]; }
  var villages = Object.keys(ORIGIN).map(function (v) {
    return { name: v, boundary: box(v, 3, v === "Demopur (DEMO)" ? 4 : 3, 0.0012) };
  });
  var mclLand = Object.keys(ORIGIN).map(function (v) { return box(v, v === "Demopur (DEMO)" ? 2 : 1, v === "Demopur (DEMO)" ? 3 : 2, 0.0002); });
  var landmarks = [
    { name: "Pond (DEMO landmark)", at: at("Demopur (DEMO)", 0.0005, -0.0004) },
    { name: "Primary School (DEMO landmark)", at: at("Demopur (DEMO)", -0.0013, -0.0004) },
    { name: "Village Road (DEMO landmark)", at: at("Demopur (DEMO)", -0.0005, 0.0020) },
    { name: "Temple (DEMO landmark)", at: at("Sampleguda (DEMO)", -0.0006, 0.0003) },
    { name: "Road junction (DEMO landmark)", at: at("Testpali (DEMO)", -0.0010, -0.0002) }
  ];
  // Ground control points used by the (simulated) georeferencing step
  var controlPoints = [
    { name: "GCP-1 Road culvert (DEMO)", at: at("Demopur (DEMO)", 0.0003, -0.0001) },
    { name: "GCP-2 Pond corner (DEMO)", at: at("Demopur (DEMO)", 0, -0.0004) },
    { name: "GCP-3 Survey pillar (DEMO)", at: at("Demopur (DEMO)", -0.0011, 0.0014) }
  ];

  // Text an OCR engine could return for the sample old map (used by "Try the sample map")
  var sampleOcrText =
    "GOVT. OF ODISHA (DEMO)  ACQUISITION MAP - SHEET 3\n" +
    "Mouza: Demopur (DEMO)   Tahasil: Kaniha   Dist: Angul\n" +
    "Notification No. DEMO/LA/CBA/2009/017  Dated 15-03-2010\n" +
    "Khata No. 145   Plot No. 234   Area 0.82 Ac.\n" +
    "Khata No. 145   Plot No. 235   Area 0.64 Ac.\n" +
    "Khata No. 121   Plot No. 124/356   Area 1.10 Ac.\n" +
    "Recorded tenant: DEMO Owner Alpha\n" +
    "Scale 1:4000   Land acquired for Coal Block (DEMO)";

  // The map may only show this area: all villages plus about 1 km around them
  var allPts = [SITE]; villages.forEach(function (v) { allPts = allPts.concat(v.boundary); });
  var lats = allPts.map(function (x) { return x[0]; }), lngs = allPts.map(function (x) { return x[1]; });
  var siteBounds = [[Math.min.apply(null, lats) - 0.009, Math.min.apply(null, lngs) - 0.009],
                    [Math.max.apply(null, lats) + 0.009, Math.max.apply(null, lngs) + 0.009]];

  return { site: SITE, siteBounds: siteBounds, plots: plots, villages: villages, mclLand: mclLand, landmarks: landmarks, controlPoints: controlPoints,
           sampleOcrText: sampleOcrText, CELL_LAT: CELL_LAT, CELL_LNG: CELL_LNG };
})();
