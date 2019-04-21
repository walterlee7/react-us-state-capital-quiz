import $ from 'jquery';

console.log('Hello');

let quizImgDir;

var totalSeconds;
var container;
var arrQuestions = [];
var currentQuestion = 0;
var corrId;

var strQuestions = [{ "id": "1", "qText": "What is the capital of Alabama?", "qSortOrder": "001", "answers": "[{\"id\":\"1\",\"aText\":\"Jackson\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Birmingham\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Montgomery\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Baton Rouge\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_alabama.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "2", "qText": "What is the capital of Alaska?", "qSortOrder": "002", "answers": "[{\"id\":\"1\",\"aText\":\"Anchorage\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Fairbanks\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Juneau\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Boise\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_alaska.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "3", "qText": "What is the capital of Arizona?", "qSortOrder": "003", "answers": "[{\"id\":\"1\",\"aText\":\"Tuscon\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Phoenix\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Sacramento\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Salem\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_arizona.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "4", "qText": "What is the capital of Arkansas?", "qSortOrder": "004", "answers": "[{\"id\":\"1\",\"aText\":\"Jackson\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Nashville\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Little Rock\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Jefferson City\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_Arkansas.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "5", "qText": "What is the capital of California?", "qSortOrder": "005", "answers": "[{\"id\":\"1\",\"aText\":\"Sacramento\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Los Angeles\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Carson City\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Fresno\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_california.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "6", "qText": "What is the capital of Colorado?", "qSortOrder": "006", "answers": "[{\"id\":\"1\",\"aText\":\"Denver\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Colorado Springs\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Cheyenne\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Santa Fe\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_colorado.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "7", "qText": "What is the capital of Connecticut?", "qSortOrder": "007", "answers": "[{\"id\":\"1\",\"aText\":\"New Haven\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Stamford\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Providence\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Hartford\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_connecticut.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "8", "qText": "What is the capital of Delaware?", "qSortOrder": "008", "answers": "[{\"id\":\"1\",\"aText\":\"Wilmington\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Trenton\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Dover\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Richmond\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_delaware.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "9", "qText": "What is the capital of Florida?", "qSortOrder": "009", "answers": "[{\"id\":\"1\",\"aText\":\"Jacksonville\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Miami\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Orlando\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Tallahassee\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_florida.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "10", "qText": "What is the capital of Georgia?", "qSortOrder": "010", "answers": "[{\"id\":\"1\",\"aText\":\"Augusta\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"\\tAtlanta\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"\\tColumbus\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Columbia\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_georgia.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "11", "qText": "What is the capital of Hawaii?", "qSortOrder": "011", "answers": "[{\"id\":\"1\",\"aText\":\"Phoenix\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Juneau\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Santa Fe\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Honolulu\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_hawaii.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "12", "qText": "What is the capital of Idaho?", "qSortOrder": "012", "answers": "[{\"id\":\"1\",\"aText\":\"Boise\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Helena\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Carson City\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Salem\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_Idaho.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "13", "qText": "What is the capital of Illinois?", "qSortOrder": "013", "answers": "[{\"id\":\"1\",\"aText\":\"Jefferson City\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Columbus\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Chicago\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Springfield\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_Illinois.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "14", "qText": "What is the capital of Indiana?", "qSortOrder": "014", "answers": "[{\"id\":\"1\",\"aText\":\"Springfield\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Fort Wayne\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Lansing\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Indianapolis\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_Indiana.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "15", "qText": "What is the capital of Iowa?", "qSortOrder": "015", "answers": "[{\"id\":\"1\",\"aText\":\"Des Moines\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Madison\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Saint Paul\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Cedar Rapids\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_iowa.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "16", "qText": "What is the capital of Kansas?", "qSortOrder": "016", "answers": "[{\"id\":\"1\",\"aText\":\"Lincoln\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Little Rock\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Wichita\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Topeka\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_kansas.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "17", "qText": "What is the capital of Kentucky?", "qSortOrder": "017", "answers": "[{\"id\":\"1\",\"aText\":\"Nashville\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Charleston\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Louisville\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Frankfort\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_kentucky.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "18", "qText": "What is the capital of Louisiana?", "qSortOrder": "018", "answers": "[{\"id\":\"1\",\"aText\":\"New Orleans\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Jackson\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Baton Rouge\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Little Rock\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_louisiana.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "19", "qText": "What is the capital of Maine?", "qSortOrder": "019", "answers": "[{\"id\":\"1\",\"aText\":\"Portland\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Concord\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Montpelier\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Augusta\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_maine.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "20", "qText": "What is the capital of Maryland?", "qSortOrder": "020", "answers": "[{\"id\":\"1\",\"aText\":\"Baltimore\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Dover\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Annapolis\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Richmond\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_maryland.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "21", "qText": "What is the capital of Massachusetts?", "qSortOrder": "021", "answers": "[{\"id\":\"1\",\"aText\":\"Springfield\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Boston\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Concord\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Providence\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_Massachusetts.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "22", "qText": "What is the capital of Michigan?", "qSortOrder": "022", "answers": "[{\"id\":\"1\",\"aText\":\"Madison\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Columbus\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Detroit\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Lansing\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_Michigan.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "23", "qText": "What is the capital of Minnesota?", "qSortOrder": "023", "answers": "[{\"id\":\"1\",\"aText\":\"Saint Paul\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Minneapolis\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Madison\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Des Moines\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_Minnesota.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "24", "qText": "What is the capital of Mississippi?", "qSortOrder": "024", "answers": "[{\"id\":\"1\",\"aText\":\"Little Rock\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Jackson\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Gulfport\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Springfield\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_Mississippi.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "25", "qText": "What is the capital of Missouri?", "qSortOrder": "025", "answers": "[{\"id\":\"1\",\"aText\":\"Des Moines\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"St. Louis\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Kansas City\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Jefferson City\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_Missouri.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "26", "qText": "What is the capital of Montana?", "qSortOrder": "026", "answers": "[{\"id\":\"1\",\"aText\":\"Helena\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Billings\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Boise\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Salem\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_Montana.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "27", "qText": "What is the capital of Nebraska?", "qSortOrder": "027", "answers": "[{\"id\":\"1\",\"aText\":\"Omaha\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Lincoln\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Pierre\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Cheyenne\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_Nebraska.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "28", "qText": "What is the capital of Nevada?", "qSortOrder": "028", "answers": "[{\"id\":\"1\",\"aText\":\"Cheyenne\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Carson City\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Salem\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Las Vegas\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_Nevada.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "29", "qText": "What is the capital of New Hampshire?", "qSortOrder": "029", "answers": "[{\"id\":\"1\",\"aText\":\"Montpelier\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Augusta\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Manchester\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Concord\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_NewHampshire.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "30", "qText": "What is the capital of New Jersey?", "qSortOrder": "030", "answers": "[{\"id\":\"1\",\"aText\":\"Trenton\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Newark\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Concord\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Hartford\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_NewJersey.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "31", "qText": "What is the capital of New Mexico?", "qSortOrder": "031", "answers": "[{\"id\":\"1\",\"aText\":\"Austin\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Phoenix\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Santa Fe\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Albuquerque\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_NewMexico.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "32", "qText": "What is the capital of New York?", "qSortOrder": "032", "answers": "[{\"id\":\"1\",\"aText\":\"New York City\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Albany\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Buffalo\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Rochester\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_newyork.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "33", "qText": "What is the capital of North Carolina?", "qSortOrder": "033", "answers": "[{\"id\":\"1\",\"aText\":\"Raleigh\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Richmond\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Columbia\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Charlotte\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_NorthCarolina.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "34", "qText": "What is the capital of North Dakota?", "qSortOrder": "034", "answers": "[{\"id\":\"1\",\"aText\":\"Bismarck\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Pierre\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Fargo\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Helena\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_northdakota.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "35", "qText": "What is the capital of Ohio?", "qSortOrder": "035", "answers": "[{\"id\":\"1\",\"aText\":\"Frankfort\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Lansing\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Cleveland\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Columbus\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_ohio.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "36", "qText": "What is the capital of Oklahoma?", "qSortOrder": "036", "answers": "[{\"id\":\"1\",\"aText\":\"Tulsa\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Norman\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Oklahoma City\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Topeka\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_oklahoma.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "37", "qText": "What is the capital of Oregon?", "qSortOrder": "037", "answers": "[{\"id\":\"1\",\"aText\":\"Salem\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Boise\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Olympia\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Portland\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_oregon.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "38", "qText": "What is the capital of Pennsylvania?", "qSortOrder": "038", "answers": "[{\"id\":\"1\",\"aText\":\"Hartford\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Albany\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Philadelphia\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Harrisburg\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_pennsylvania.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "39", "qText": "What is the capital of Rhode Island?", "qSortOrder": "039", "answers": "[{\"id\":\"1\",\"aText\":\"Boston\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Providence\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Hartford\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Concord\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_rhodeisland.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "40", "qText": "What is the capital of South Carolina?", "qSortOrder": "040", "answers": "[{\"id\":\"1\",\"aText\":\"\\tColumbia\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Raleigh\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Richmond\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Charleston\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_southcarolina.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "41", "qText": "What is the capital of South Dakota?", "qSortOrder": "041", "answers": "[{\"id\":\"1\",\"aText\":\"Cheyenne\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Sioux Falls\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Bismarck\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Pierre\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_southdakota.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "42", "qText": "What is the capital of Tennessee?", "qSortOrder": "042", "answers": "[{\"id\":\"1\",\"aText\":\"Frankfort\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Nashville\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Memphis\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Montgomery\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_tennessee.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "43", "qText": "What is the capital of Texas?", "qSortOrder": "043", "answers": "[{\"id\":\"1\",\"aText\":\"Houston\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Austin\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Dallas\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Santa Fe\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_texas.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "44", "qText": "What is the capital of Utah?", "qSortOrder": "044", "answers": "[{\"id\":\"1\",\"aText\":\"Denver\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Provo\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Carson City\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Salt Lake City\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_utah.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "45", "qText": "What is the capital of Vermont?", "qSortOrder": "045", "answers": "[{\"id\":\"1\",\"aText\":\"\\tMontpelier\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Burlington\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Concord\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Augusta\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_vermont.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "46", "qText": "What is the capital of Virginia?", "qSortOrder": "046", "answers": "[{\"id\":\"1\",\"aText\":\"Virginia Beach\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Richmond\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Charleston\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Norfolk\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_virginia.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "47", "qText": "What is the capital of Washington?", "qSortOrder": "047", "answers": "[{\"id\":\"1\",\"aText\":\"Boise\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Salem\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Olympia\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Seattle\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_washington.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "48", "qText": "What is the capital of West Virginia?", "qSortOrder": "048", "answers": "[{\"id\":\"1\",\"aText\":\"Charleston\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Huntington\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Richmond\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Frankfort\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_westvirginia.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "49", "qText": "What is the capital of Wisconsin?", "qSortOrder": "049", "answers": "[{\"id\":\"1\",\"aText\":\"Madison\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Milwaukee\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Springfield\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Lansing\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0}]", "image": "us_wisconsin.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }, { "id": "50", "qText": "What is the capital of Wyoming?", "qSortOrder": "050", "answers": "[{\"id\":\"1\",\"aText\":\"Salt Lake City\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"2\",\"aText\":\"Denver\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"3\",\"aText\":\"Pierre\",\"correct\":\"0\",\"image\":\"\",\"clicked\":0},{\"id\":\"4\",\"aText\":\"Cheyenne\",\"correct\":\"1\",\"image\":\"\",\"clicked\":0}]", "image": "us_wyoming.svg", "answered": 0, "imageWidth": 0, "imageHeight": 0, "questionLayout": 1 }];

var start;
var end;
var gameDuration;

var imgsLoaded = 0;
// var cellWidth;
// var cellPadding = 10;
var maxImgHeight = [10];
var correctClicks = 0;
var wrongClicks = 0;
var totalClicks = 0;
var score;
var gameTime;
var newTime = 0;
// var flasher;
// var qid = 0;
var q;
var clickTrans;
var usingTouch;
var arrFlagData;

// function saveHighScore() {
//     $.cookie("nickname", $("#nickname").val());
//     updateReport(exID, $.cookie("memberName"), $.cookie("memberId"), score, start, end, gameDuration, correctClicks, totalClicks - correctClicks, '', $.cookie("ip"), lang, $.cookie("sessionId"), $.cookie("nickname"))

//     setTimeout(function () { getHighScores($.cookie("memberId")) }, 1000);
//     hideCompletion();
// }

function setupGame() {

    hideCompletion();
    stopTimer();
    clearScore();
    $("#gameWrapper").html("");
    arrFlagData = [];
    arrQuestions = [];
    imgsLoaded = 0;
    $(".q-container").remove();
    $(".a-wrapper").remove();
    $(".q-wrapper").remove();

    currentQuestion = 0;

    container = $("#gamewrapper");

    // gameID = exid;

    // create hidden panel for completed game
    // setupCompletion();

    // var compPanel = $("#completion");
    // $("#HUDGroup").show();

    arrQuestions = strQuestions;
    arrQuestions.sort(by("qSortOrder"))

    var i, j;
    for (i = 0; i < arrQuestions.length; i++) {
        arrQuestions[i].arrAnswers = JSON.parse(arrQuestions[i].answers)
        arrQuestions[i].arrAnswers.sort(by("id"))
        for (j = 0; j < arrQuestions[i].arrAnswers.length; j++) {
            arrQuestions[i].arrAnswers[j].id = j;
        }
        // console.log(arrQuestions[i].arrAnswers)
    }


    //console.log(arrQuestions)
    setTimeout(function () { startGame(); }, 200)
}


function setMaxH(h) {
    maxImgHeight.push(h);
    imgsLoaded++;
    if (maxImgHeight.length >= arrFlagData.length) {
        var maxH = Math.max.apply(null, maxImgHeight);

    }

    $("#qlabel2").html("Loading " + imgsLoaded + "/" + arrFlagData.length)
    if (imgsLoaded >= arrFlagData.length) {
        startTimer();
        startGame();
    }
}


// question handling

function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}


function startGame() {
    clearScore();
    $(".a-wrapper").remove();
    $(".q-wrapper").remove();
    $(".q-header").remove();
    stopTimer();
    startTimer();
    var i, j;
    for (i = 0; i < arrQuestions.length; i++) {
        arrQuestions[i].answered = 0;
        for (j = 0; j < arrQuestions[i].arrAnswers.length; j++) {
            arrQuestions[i].arrAnswers[j].clicked = 0;
        }
    }
    currentQuestion = 0;
    nextQuestion();

}

function nextQuestion() {
    // arrQuestions = shuffle(arrQuestions);
    console.log('Showing question ' + currentQuestion)
    q = arrQuestions[currentQuestion];
    constructQuestionPanel(q)
    $("#questionCount").html(currentQuestion + 1 + "/" + arrQuestions.length + " ");
    // if (currentQuestion < arrQuestions.length) {
    //     var nextImg = new Image();
    //     console.log("LOADING " + quizImgDir + arrQuestions[currentQuestion + 1].image)
    //     nextImg.src = quizImgDir + arrQuestions[currentQuestion + 1].image;
    // }

}


function constructQuestionPanel(q) {

    var qText = q.qText;
    var qImage = q.image;

    console.log(q.arrAnswers);
    console.log(qText)
    var aHtml = "";
    var qHtml = "";


    var qHtml = '<div className="q-container" >';
    var clearHtml = '<div className="clear"></div>';
    for (let i = 0; i < q.arrAnswers.length; i++) {
        var a = q.arrAnswers[i];
        if (a.correct == "1") {
            corrId = a.id;
        }
        aHtml = aHtml + constructAnswer(a.aText, a.id, a.clicked, a.correct)
    }

    if (q.questionLayout == 1) {
        var bHtml = '<div id="divTextAfter"></div><div id="btnPrevious" className="btnBrowse" style="float:left;margin-right:2em;"><<</div><div id="btnNext" className="btnBrowse" style="float:left; margin-right:3.3em;">>></div>'
        // aHtml = '<div className="a-wrapper qi">' + aHtml + bHtml + '</div><div className="q-img q-img1"><img id="theImg" src="' + quizImgDir + qImage + '"/></div></div>'

        aHtml = '<div className="a-wrapper qi">' + aHtml + bHtml + '</div>'


        qHtml = '<div className="q-header" >' + qText + '</div><div className="q-wrapper" style="padding-left:20px;">' + qHtml + aHtml + '</div>';

        container.append(qHtml);
    }

    if (q.questionLayout == 2) {
        var bHtml = '<div id="divTextAfter"></div>'
        aHtml = '<div className="a-wrapper qi2" style="min-height:750px;">' + aHtml + bHtml + '<div className="q-img q-img2"><img  id="theImg" src="' + quizImgDir + qImage + '"/></div><div id="buttonDiv"><div id="btnPrevious" className="btnBrowse" style="float:left"><<</div><div id="btnNext" className="btnBrowse" style="float:right">>></div></div> </div></div>'


        qHtml = '<div className="q-header" >' + qText + '</div><div className="q-wrapper">' + qHtml + aHtml + '</div>';

        container.append(qHtml);
        //$(".answer").width(400)
    }


    $('.q-img').hide();
    $('#theImg').hide();
    $("#theImg").bind('load', function () {
        $('.q-img').fadeIn(2000)
        $("#theImg").fadeIn(2000)
    });


    if (q.answered == 0) {
        $(".answer").addClass("activeanswer");
        $("#btnNext").hide();
    }

    if (currentQuestion == arrQuestions.length - 1) {
        $("#btnNext").hide();
    }

    var ah = $(".answer").height();
    var aw = $(".answer").width();

    // $(".a-content").css("height", ah + "px");
    $(".a-content").css("width", aw + "px");

    $(".a-content img").css("height", ah * .8 + "px");


    if (currentQuestion == 0) {
        $("#btnPrevious").hide();
    }

    // add events


    // center answers against question image
    $(".q-img img").on("load", function () {

        adjustAnswerPosition();
    })

    $(window).resize(function () {
        adjustAnswerPosition();
    })

    $("#btnNext").on("click", function () {
        currentQuestion++;
        $(".q-wrapper").remove();
        $(".q-header").remove();
        nextQuestion();
    })

    $("#btnPrevious").on("click", function () {
        currentQuestion--;
        $(".q-wrapper").remove();
        $(".q-header").remove();
        nextQuestion();
    })


    $(".answer").on("click", function () {
        var item = $(this);
        var thisId = item.attr("id");

        arrQuestions[currentQuestion].arrAnswers[thisId].clicked = 1;
        //console.log(item)
        //console.log(thisId + " " + corrId)
        totalClicks++;
        if (arrQuestions[currentQuestion].answered == 0) {

            if (corrId == thisId) {

                arrQuestions[currentQuestion].answered = 1;

                playCorrectAnswerSound();
                correctClicks++;
                item.addClass("correct");
                item.removeClass("activeanswer");
                $(".answer").off();
                currentQuestion++;
                if (arrQuestions.length > currentQuestion) {
                    $("#btnNext").show();
                }

                if (arrQuestions.length > currentQuestion) {
                    $(".q-wrapper").fadeOut(1000, function () {

                        $(".q-wrapper").remove();
                        $(".q-header").remove();

                        nextQuestion();
                    })

                } else {
                    // game over
                    currentQuestion--;
                    $(".activeanswer").removeClass("activeanswer");
                    stopTimer();
                    updateScore();
                    // setupCompletion();
                    // showCompletion();
                }


            } else {
                playWrongAnswerSound();
                item.addClass("wrong");
                item.removeClass("activeanswer");
                wrongClicks++;
                // item.css("opacity", 0.35);

                item.animate({ opacity: 0.75 }, 1000);
                item.off();

            }


            updateScore();

        }

    })

    // startTimer();
}

function constructAnswer(aTxt, aId, aClicked, aCorrect) {

    var cellHtml;

    var extraClass = '';

    if (aClicked == 1 && aCorrect == 0) extraClass = 'wrong';
    if (aClicked == 1 && aCorrect == 1) extraClass = 'correct';

    cellHtml = '<div className="answer ' + extraClass + '" id="' + aId + '" ><div className="a-content" ><div className="text" >' + aTxt + '</div></div></div>';

    return cellHtml;

}



function adjustAnswerPosition() {
    if ($(".q-img").length > 0) {
        var qh = $(".q-container").height();
        var am = (qh / 2) - ($(".a-wrapper").height() / 2);



        if ($(".a-wrapper.qi .answer.image").length > 0) {
            console.log(am);

            if (qh / 6 < 70) {
                am = 0;
                qh = 70 * 6;
            } else {
                am = qh / 6;

            }

            $(".a-wrapper").css("margin-top", am + "px");
            $(".qi .text").css("margin-top", (qh / 6 / 2) - ($(".qi .text").height() / 2) - 5 + "px")
            $(".qi .answer").css("height", qh / 6 + "px")
            $(".qi .img-wrapper img").css("height", qh / 6 - 20 + "px")

        }
    }
}

//function setup

function clearScore() {
    score = 0;
    correctClicks = 0;
    wrongClicks = 0;
    totalClicks = 0;
    $("#score").html("Score: 0%");
}

function updateScore() {

    score = Math.round(correctClicks / totalClicks * 100)
    if (!isNaN(score) && score >= 0) {
        $("#score").html("Score: " + score + "%");
    } else {
        $("#score").html("");
    }
}

// utilities

Array.prototype.remove = function () {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

Array.prototype.removeFirst = function () {
    var what, a = arguments, L = a.length, ax;

    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
            return this;
        }
    }
    return this;
};


function getCleanName(dirtyText) {
    var cleanText = dirtyText.replace(/\ /g, '_');

    cleanText = cleanText.replace(/[|&;$%@"<>()+,.:#]/g, "");
    return cleanText;
}

function getDisplayName(cleanText) {
    var displayText = cleanText.replace("_", " ");
    return displayText;
}



function startTimer() {

    start = new Date;
    $('#timer').html('0:00');
    $('#score').html('Score: 0%');
    gameTime = setInterval(function () {
        gameDuration = new Date - start;
        totalSeconds = Math.round(gameDuration / 1000);
        var minutes = Math.floor(totalSeconds / 60);
        var seconds = totalSeconds % 60;
        var pad = "00";
        pad = pad.toString();
        seconds = seconds.toString();
        seconds = pad.substring(0, pad.length - seconds.length) + seconds;

        newTime = minutes + ":" + seconds;

        $('#timer').html(newTime);
    }, 1000);

}

function stopTimer() {
    end = new Date;
    clearTimeout(gameTime);
}

function hideCompletion() {

    $("#completion").hide();

}

function showCompletion() {

    $("#completion").show();

    if ($.cookie("hasAccount") == "true") {
        console.log("game complete")


        $("#nickname").val($.cookie("nickname"))

    }

}



var by = function (path, reverse, primer, then) {
    var get = function (obj, path) {
        if (path) {
            path = path.split('.');
            for (var i = 0, len = path.length - 1; i < len; i++) {
                obj = obj[path[i]];
            };
            return obj[path[len]];
        }
        return obj;
    },
        prime = function (obj) {
            return primer ? primer(get(obj, path)) : get(obj, path);
        };

    return function (a, b) {
        var A = prime(a),
            B = prime(b);

        return (
            (A < B) ? -1 :
                (A > B) ? 1 :
                    (typeof then === 'function') ? then(a, b) : 0
        ) * [1, -1][+!!reverse];
    };
};


function playWrongAnswerSound() {
    var s = $("#WrongAnswerSound")[0];
    try {
        if ($("#cbSoundOn").prop("checked") == true) { s.play() };
    } catch (e) { }
}



function playCorrectAnswerSound() {
    var s = $("#CorrectAnswerSound")[0];
    try {
        if ($("#cbSoundOn").prop("checked") == true) { s.play() };
    } catch (e) { }
}