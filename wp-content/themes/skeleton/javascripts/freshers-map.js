/*
 * jQuery throttle / debounce - v1.1 - 3/7/2010
 * http://benalman.com/projects/jquery-throttle-debounce-plugin/
 * 
 * Copyright (c) 2010 "Cowboy" Ben Alman
 * Dual licensed under the MIT and GPL licenses.
 * http://benalman.com/about/license/
 */
(function(b,c){var $=b.jQuery||b.Cowboy||(b.Cowboy={}),a;$.throttle=a=function(e,f,j,i){var h,d=0;if(typeof f!=="boolean"){i=j;j=f;f=c}function g(){var o=this,m=+new Date()-d,n=arguments;function l(){d=+new Date();j.apply(o,n)}function k(){h=c}if(i&&!h){l()}h&&clearTimeout(h);if(i===c&&m>e){l()}else{if(f!==true){h=setTimeout(i?k:l,i===c?e-m:e)}}}if($.guid){g.guid=j.guid=j.guid||$.guid++}return g};$.debounce=function(d,e,f){return f===c?a(d,e,false):a(d,f,e!==false)}})(this);


/*
 * freshers-map.js
 */
jQuery(document).ready(function ($) {
    'use strict';

    if (!$('#places-content').length) {
        $('.entry-content').wrapInner('<div id="places-content"></div>');
    }

    var placesContent = $('#places-content');
    placesContent.before('<div id="map"></div>');

    if (!$('#places-list a').length) {
        // automatically make list of places based on divs and their constituent headings

        var list = document.createElement('ul');
        list.id = 'places-list';
        list.className = 'four columns alpha';

        $('#places-content > div').each(function () {
            var place = this.id,
                placeName = $(this).find('h3').text();

            if (place && placeName) {
                list.innerHTML += '<li><a href="#' + place + '">' + placeName + '</a></li>';
            }
        });

        $(document.getElementById('map')).after($(list));
    }

    $('#places-list li:first-child a').addClass('active');
    $('#places-content div:first-child').addClass('active');

    placesContent.addClass('twelve columns omega');


    var map = L.map('map').setMaxBounds([[53.916, -1.175], [54.008, -0.994]]);

    L.tileLayer('//www.york.ac.uk/about/maps/campus/data/tiles/{z}/{x}/{y}.png', {
        attribution: 'Map data &copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors | Map tiles by <a href="http://www.york.ac.uk/about/maps/campus/">University of York</a>',
        maxZoom: 18,    
        minZoom: 13
    }).addTo(map);

    // https://docs.google.com/spreadsheet/ccc?key=0AumxFaPyjySpdERqbE1KNXpDd1NkMzd1NVdUaEplWHc

    // Each article uses a subset of these places, probably.
    // This is all a terrible hack that needs to be improved.
    // There may be a good WordPress plugin already (we have used "Geo Mashup" in the past)

    var places = {
        // colleges
        alcuin:      {name: "Alcuin College",      location: [53.950056, -1.049548]},
        constantine: {name: "Constantine College", location: [53.949359, -1.024651]},
        derwent:     {name: "Derwent College",     location: [53.946830, -1.048003]},
        goodricke:   {name: "Goodricke College",   location: [53.948531, -1.030800]},
        halifax:     {name: "Halifax College",     location: [53.941216, -1.047435]},
        james:       {name: "James College",       location: [53.946211, -1.055235]},
        langwith:    {name: "Langwith College",    location: [53.949040, -1.028702]},
        vanbrugh:    {name: "Vanbrugh College",    location: [53.947726, -1.053808]},
        wentworth:   {name: "Wentworth College",   location: [53.946142, -1.058303]},

        // campus bars
        dbar:        {location: [53.946650, -1.047950]},
        vbar:        {location: [53.947701, -1.054183]},
        edge:        {location: [53.945939, -1.058260]},
        lounge:      {location: [53.945911, -1.055294]},
        courtyard:   {location: [53.947515, -1.049919]},
        glasshouse:  {location: [53.949002, -1.028144]},

        // york pubs
        burnshotel:        {location: [53.9587247, -1.081732 ]}, // formerly "the hansom cab"
        phoenixinn:        {location: [53.9540592, -1.0751256]},
        kingsarms:         {location: [53.9574269, -1.083178 ]},
        rookandgaskill:    {location: [53.954871,  -1.070147 ]},
        roseandcrown:      {location: [53.955024,  -1.069847 ]},
        yeoldestarreinne:  {location: [53.961121,  -1.083164 ]},
        thehop:            {location: [53.958762,  -1.078978 ]},
        lendalcellar:      {location: [53.9599879, -1.0854885]},
        pivni:             {location: [53.95971,   -1.080926 ]},
        tremblingmadness:  {location: [53.961241,  -1.08295  ]},
        deramorearms:      {location: [53.9438965, -1.0437057]},
        crosskeys:         {location: [53.9618699, -1.0798636]},
        lowther:           {location: [53.9569492, -1.0824288]},
        maltings:          {location: [53.9592837, -1.0879724]},
        yorktap:           {location: [53.9584227, -1.0926604]},
        goldenfleece:      {location: [53.9586871, -1.0796313]},
        sutlers:           {location: [53.958806,  -1.0792313]},

        // areas
        heslingtonroad:  {name: "Heslington Road",  location: [53.9520324, -1.0657771]},
        lawrencestreet:  {name: "Lawrence Street",  location: [53.9544569, -1.0644095]},
        tanghall:        {name: "Tang Hall",        location: [53.9589325, -1.0532051]},
        hullroad:        {name: "Hull Road",        location: [53.954013,  -1.034789 ]},
        // (other areas are stored as polygons in the areas object)

        // clubs
        duchess:    {location: [53.959164, -1.078333]},
        salvation:  {location: [53.958174, -1.087375]},
        revs:       {location: [53.959271, -1.084226]},
        fibbers:    {location: [53.957374, -1.089801]},
        kuda:       {location: [53.956829, -1.081897]},
        mankyo:     {location: [53.957422, -1.089752]},
        willow:     {location: [53.958591, -1.083488]},
        mansion:    {location: [53.957214, -1.087922]},

        // sport places
        // hes east
        sportvillage:  {location: [53.950896, -1.018038]}, // official
        three:         {location: [53.951448, -1.014224]}, // (3G pitch) guess
        velodrome:     {location: [53.94890,  -1.01779 ]}, // approximation
        basketball:    {location: [53.948865, -1.026368]}, // guess
        // hes west
        sportcentre:   {location: [53.943666, -1.056007]}, // official
        acres:         {location: [53.941311, -1.052607]},
        running:       {location: [53.943833, -1.054510]},
        newJLD:        {location: [53.944374, -1.054884]}, // not sure
        tennisdome:    {location: [53.943172, -1.055477]}, // not sure
    };

    var areas = {
        osbaldwick: L.polygon([
            [ 53.960396606374751, -1.045458611492929 ], [ 53.961545982935498, -1.04678889951556 ], [ 53.96178321029474, -1.047007547354923 ], [ 53.961802134724763, -1.046900420303024 ], [ 53.961823912230159, -1.046813042927901 ], [ 53.962275614683456, -1.04551628117515 ], [ 53.962367356419854, -1.045297743062215 ], [ 53.962400086271991, -1.045231452740234 ], [ 53.96250297484648, -1.045058385913428 ], [ 53.962532085679349, -1.044989129419025 ], [ 53.962573172023852, -1.044843386649138 ], [ 53.962714791135369, -1.044454512765731 ], [ 53.962790257973197, -1.044224148263969 ], [ 53.963004792004782, -1.043397661888092 ], [ 53.964455406514894, -1.044402505065106 ], [ 53.964505184543626, -1.044445571658642 ], [ 53.964635695070534, -1.044581299849409 ], [ 53.964900276020366, -1.044735303708615 ], [ 53.965609649767686, -1.045325777033105 ], [ 53.966059322085343, -1.043775881107139 ], [ 53.966318190244813, -1.043099225899196 ], [ 53.966834264956674, -1.041989832917533 ], [ 53.966944324997463, -1.041702244432836 ], [ 53.966976761029208, -1.041599364880198 ], [ 53.967031551729143, -1.04125663961972 ], [ 53.967107971741662, -1.041033845558535 ], [ 53.967145397690665, -1.040880544792346 ], [ 53.967167704365963, -1.040747408374386 ], [ 53.967182675553602, -1.040596147286339 ], [ 53.96739039397, -1.039707210077446 ], [ 53.96745337988817, -1.039490817850962 ], [ 53.967493828857869, -1.039378604455554 ], [ 53.967570550060216, -1.039193908300412 ], [ 53.967648413437715, -1.03903967386939 ], [ 53.968159810431786, -1.037912009089548 ], [ 53.968524818079807, -1.036912698555571 ], [ 53.96854556737221, -1.036810080824442 ], [ 53.968558870670762, -1.036675620888106 ], [ 53.968554005043821, -1.03651718847103 ], [ 53.968530193978154, -1.036350046370232 ], [ 53.968518584685746, -1.035911267883307 ], [ 53.968528236888822, -1.035657983609627 ], [ 53.968539974028424, -1.03555252438967 ], [ 53.968583120674168, -1.035328955684961 ], [ 53.968706270046923, -1.034882489747901 ], [ 53.968809948803205, -1.034585870026018 ], [ 53.96895804531966, -1.034224193586391 ], [ 53.968997022878142, -1.033817779559542 ], [ 53.969036261388673, -1.033667472309092 ], [ 53.969096058556815, -1.033502968674221 ], [ 53.969208214257733, -1.033254930240478 ], [ 53.969344498330578, -1.032989562389614 ], [ 53.969418081178333, -1.032862849825937 ], [ 53.969455113300619, -1.032773571284016 ], [ 53.969502499788909, -1.032630695184076 ], [ 53.969575996339742, -1.03249331196164 ], [ 53.969723138707373, -1.032125545431941 ], [ 53.970072915748091, -1.031361276198776 ], [ 53.970157589517534, -1.031161123979621 ], [ 53.970207127843473, -1.03106240502695 ], [ 53.970347161462669, -1.030816755511611 ], [ 53.970452651041576, -1.030634412181171 ], [ 53.970519275753183, -1.030536819833009 ], [ 53.970578674210429, -1.030434821294975 ], [ 53.970660859564383, -1.030260639794437 ], [ 53.970802529203887, -1.029883835535688 ], [ 53.97087149233888, -1.029741974795532 ], [ 53.970994645665876, -1.029521102058186 ], [ 53.971485249623981, -1.028834314992558 ], [ 53.971590920962889, -1.028674826082708 ], [ 53.972211892669947, -1.027548948648149 ], [ 53.972262867491274, -1.027405973515202 ], [ 53.97234506071625, -1.027233303363433 ], [ 53.972795665746595, -1.026492512752855 ], [ 53.972862027640268, -1.026362897211843 ], [ 53.9729856655837, -1.026091679720106 ], [ 53.973083909153992, -1.025903383243488 ], [ 53.973151721657977, -1.025731042183767 ], [ 53.973229604569212, -1.025581335182673 ], [ 53.973294440130893, -1.025485294574384 ], [ 53.973459443055006, -1.025327454730374 ], [ 53.973542486506489, -1.025259956570952 ], [ 53.973668245007453, -1.025139622768858 ], [ 53.973704916822349, -1.025117421512425 ], [ 53.973777584401219, -1.025100478542344 ], [ 53.974139281426645, -1.024924320704285 ], [ 53.974563748070253, -1.02472992228891 ], [ 53.974797419103744, -1.024616211541355 ], [ 53.974581442157181, -1.023477739055857 ], [ 53.973074367328337, -1.02196242587991 ], [ 53.971858976708937, -1.020727002911247 ], [ 53.97124883734454, -1.020085744708436 ], [ 53.971104947486602, -1.01985586257688 ], [ 53.971020601511732, -1.019763319281795 ], [ 53.970820667804468, -1.019604884581786 ], [ 53.970691852131587, -1.019460027197105 ], [ 53.970591653467402, -1.01940749596631 ], [ 53.970521959337134, -1.019348150586676 ], [ 53.969851752057679, -1.018726638201952 ], [ 53.969567594532833, -1.01849091749187 ], [ 53.969331526104781, -1.018310476083046 ], [ 53.969140452495651, -1.018136601431864 ], [ 53.969056167484844, -1.018051686906905 ], [ 53.96886023891814, -1.017833718761892 ], [ 53.968694876731341, -1.017616558214346 ], [ 53.968648073191801, -1.01749875006079 ], [ 53.968473420980708, -1.017574508225502 ], [ 53.96845119135385, -1.017603995937173 ], [ 53.968417553336188, -1.017667290165836 ], [ 53.968386186072514, -1.017788460527977 ], [ 53.96813812074474, -1.018449809428617 ], [ 53.968067423435244, -1.018597818175061 ], [ 53.968012378955152, -1.018681431788227 ], [ 53.967958071258643, -1.018745210042833 ], [ 53.9679098923175, -1.018789026358484 ], [ 53.967669547578915, -1.018965409233096 ], [ 53.96736540452703, -1.019364330024285 ], [ 53.967229694426997, -1.019806549446628 ], [ 53.967142832016435, -1.01995645632674 ], [ 53.966693421529868, -1.020177367795907 ], [ 53.966577681181931, -1.020202948613099 ], [ 53.966521040919694, -1.020201228359798 ], [ 53.966490449288024, -1.020197372725112 ], [ 53.966299428056836, -1.020029597457095 ], [ 53.966108770618348, -1.019796266803978 ], [ 53.966005888509585, -1.019745327741141 ], [ 53.965905114560648, -1.019732448785048 ], [ 53.965786218248134, -1.019701702731859 ], [ 53.965706262626092, -1.019706627784185 ], [ 53.965622774546986, -1.019719257525752 ], [ 53.965452340527143, -1.019761365916766 ], [ 53.96527321831082, -1.019840262221854 ], [ 53.964966507938584, -1.02003495229478 ], [ 53.96489521198432, -1.020109792925824 ], [ 53.964615957999179, -1.020695587136448 ], [ 53.964452252431272, -1.021011910369589 ], [ 53.964410268412493, -1.020933629680181 ], [ 53.964395927145517, -1.020938538741748 ], [ 53.964370963428948, -1.020963512871608 ], [ 53.964343465169826, -1.021008362477955 ], [ 53.964316140736265, -1.021074548363056 ], [ 53.964294642773289, -1.021193948639862 ], [ 53.964193601054447, -1.021589588179353 ], [ 53.964139125226851, -1.021743294885197 ], [ 53.964102888250522, -1.021818834491613 ], [ 53.963947546048303, -1.022058738540528 ], [ 53.96391482907984, -1.02212504932707 ], [ 53.963866357916736, -1.022243554899026 ], [ 53.963803415455672, -1.022461478100383 ], [ 53.963702487146591, -1.022982099189415 ], [ 53.963667594136709, -1.023112479971574 ], [ 53.963635861970516, -1.023189436482562 ], [ 53.963592509140184, -1.023274286007055 ], [ 53.963396754591194, -1.023629447335278 ], [ 53.963346974613437, -1.023697679033174 ], [ 53.963316016896016, -1.023759373622517 ], [ 53.963294020968696, -1.023817810161031 ], [ 53.963280974455024, -1.023871464703933 ], [ 53.963264803741822, -1.023983114707193 ], [ 53.963187538623288, -1.024430007660221 ], [ 53.96304703976196, -1.024727472307984 ], [ 53.962830945569728, -1.025124251779024 ], [ 53.96277988671018, -1.025256529449704 ], [ 53.962748940543925, -1.025319746020078 ], [ 53.962695639124021, -1.025397202306806 ], [ 53.962599915250436, -1.025452784167848 ], [ 53.962498135583147, -1.025537467738744 ], [ 53.962344307767992, -1.025632510234848 ], [ 53.962280123360564, -1.025698025235792 ], [ 53.962094017811872, -1.025802964687756 ], [ 53.962040580150841, -1.025863655760834 ], [ 53.961901223359433, -1.026191565237488 ], [ 53.961851231920079, -1.026233884514177 ], [ 53.961807333466048, -1.026251674118562 ], [ 53.961753426243597, -1.026254454744216 ], [ 53.961723696371003, -1.02624600233077 ], [ 53.960856174911662, -1.024897500000809 ], [ 53.959640047601688, -1.023125867304043 ], [ 53.958976154813868, -1.022173572440094 ], [ 53.95893174844705, -1.0221288880826 ], [ 53.958875671901794, -1.022086001065597 ], [ 53.958796267422329, -1.022048232493609 ], [ 53.958629990718386, -1.022049075944062 ], [ 53.958591398000685, -1.022056075618756 ], [ 53.958565473333181, -1.022073447529081 ], [ 53.9585432053155, -1.022098354360411 ], [ 53.958529794171845, -1.02221754832688 ], [ 53.958514220127022, -1.022402329261851 ], [ 53.958502928446535, -1.022782095040651 ], [ 53.958471121638198, -1.023070894108417 ], [ 53.958301235798672, -1.023512281401872 ], [ 53.958189050313052, -1.023754185419711 ], [ 53.958042133429117, -1.023925267339015 ], [ 53.957946179947868, -1.024063152062252 ], [ 53.95786295605572, -1.024219027830211 ], [ 53.957722729623782, -1.024549978328269 ], [ 53.957657218507869, -1.02467343335449 ], [ 53.957564021971962, -1.024818871069261 ], [ 53.957290367199384, -1.025322100413175 ], [ 53.95714057023114, -1.02558163529806 ], [ 53.957072473269378, -1.025718863706444 ], [ 53.956864478609248, -1.026228171269635 ], [ 53.956777054918547, -1.026420713428175 ], [ 53.956624083025901, -1.026843386692009 ], [ 53.956506611892571, -1.027210365394763 ], [ 53.956443018682627, -1.027349008230959 ], [ 53.956356023127924, -1.027483623203747 ], [ 53.95628083333721, -1.027633203109636 ], [ 53.955992615427249, -1.028115400877758 ], [ 53.955966099344401, -1.028170881910029 ], [ 53.955903699441023, -1.028346069893759 ], [ 53.955843502389321, -1.028460245940728 ], [ 53.95567426057724, -1.028761360363011 ], [ 53.955523372654078, -1.028998038176475 ], [ 53.955483868100636, -1.0288922766663 ], [ 53.955469489521242, -1.028892610798649 ], [ 53.955437297832411, -1.028913170745925 ], [ 53.955406091013515, -1.028944375698313 ], [ 53.955382110422875, -1.02897998465836 ], [ 53.955347813845819, -1.029073744769834 ], [ 53.955326307774129, -1.029193115346027 ], [ 53.95535848734486, -1.029282283029328 ], [ 53.955355939100031, -1.029300630066895 ], [ 53.955316373404862, -1.029409752090515 ], [ 53.955280119149769, -1.029483745365622 ], [ 53.95518870168825, -1.029627598656045 ], [ 53.955111822603996, -1.029790925492752 ], [ 53.955044237482412, -1.029992135379396 ], [ 53.95501752303673, -1.030134485102385 ], [ 53.954958198317939, -1.030245587929406 ], [ 53.954913202889223, -1.030350262077782 ], [ 53.954869278182599, -1.030476246726452 ], [ 53.954754344290663, -1.030824853202062 ], [ 53.954646658386189, -1.031292158669351 ], [ 53.954552587837306, -1.031664660891727 ], [ 53.954315379966964, -1.031563480794298 ], [ 53.954268674102927, -1.031567611015235 ], [ 53.954225390929786, -1.031550326674736 ], [ 53.954183104679409, -1.031545210818845 ], [ 53.954140904408384, -1.031550760577512 ], [ 53.954112233199211, -1.031562092577331 ], [ 53.954044389319407, -1.031620050470513 ], [ 53.953972567889068, -1.031742105659063 ], [ 53.953960971242154, -1.031753041889463 ], [ 53.953891219426282, -1.031797328060085 ], [ 53.953850016038047, -1.031815045881135 ], [ 53.953770170170124, -1.031833658873083 ], [ 53.953856260692319, -1.032701829623217 ], [ 53.954097891998124, -1.034694122985176 ], [ 53.954122801500418, -1.035109583605096 ], [ 53.954130548282663, -1.035290753792957 ], [ 53.954116917389754, -1.036056086836293 ], [ 53.95414178801083, -1.037027788049769 ], [ 53.954138164161492, -1.037472862490942 ], [ 53.954143931473176, -1.037743991288495 ], [ 53.954113609366487, -1.038110435201211 ], [ 53.955492819876397, -1.038947364136175 ], [ 53.955721427880697, -1.037750339325852 ], [ 53.956281076378154, -1.038046828400985 ], [ 53.956048858660971, -1.03924242660749 ], [ 53.957389175113995, -1.040049843079252 ], [ 53.957145353370329, -1.041370700121819 ], [ 53.957843606862632, -1.041804283637708 ], [ 53.957633964592738, -1.04290489611151 ], [ 53.957591447286838, -1.043096378296275 ], [ 53.957544399946919, -1.043283391609537 ], [ 53.957299650909484, -1.044153134971686 ], [ 53.958331348871518, -1.04515067731826 ], [ 53.958375686227427, -1.045187766519022 ], [ 53.958385595764149, -1.04519058827064 ], [ 53.958396648641532, -1.045111082723575 ], [ 53.958410663930358, -1.045065039549238 ], [ 53.958430107529281, -1.045023444572464 ], [ 53.958479996705186, -1.04496743681365 ], [ 53.958615065199531, -1.044885096278606 ], [ 53.958628399800425, -1.044866502223502 ], [ 53.958645924846714, -1.044809709743262 ], [ 53.958648330068819, -1.044773076239 ], [ 53.958642489782953, -1.044716817873418 ], [ 53.958657100650754, -1.04463265804177 ], [ 53.958667666510394, -1.044604982558324 ], [ 53.958715588493618, -1.044527681452547 ], [ 53.958745912835944, -1.044498029969625 ], [ 53.958808504266194, -1.044456971776345 ], [ 53.95882176607892, -1.044429234493098 ], [ 53.958826041237124, -1.044401702715366 ], [ 53.958824013614581, -1.044372790968038 ], [ 53.958813825274284, -1.044334921201952 ], [ 53.958842511441787, -1.04421233613224 ], [ 53.958871646075217, -1.044146132824431 ], [ 53.958869935076123, -1.044044056379123 ], [ 53.958874890550248, -1.04398907492269 ], [ 53.958903539980845, -1.043861917929239 ], [ 53.960027374218534, -1.045029614249356 ], [ 53.960396606374751, -1.045458611492929 ] 
        ]),
        fulford: L.polygon([
            [ 53.916799598952181, -1.032418152060146 ], [ 53.916641142608654, -1.033390174181726 ], [ 53.916262246755821, -1.035789348323452 ], [ 53.916092512500576, -1.036927563030661 ], [ 53.915942432937435, -1.037827798793287 ], [ 53.915543435605095, -1.040309569559603 ], [ 53.915447210461842, -1.040753310322978 ], [ 53.915356826053284, -1.04136591586331 ], [ 53.915265576192184, -1.041870439260666 ], [ 53.915227989976287, -1.042003759299146 ], [ 53.915045037301113, -1.042280477675476 ], [ 53.914581721634278, -1.042791982405115 ], [ 53.91411682193953, -1.043556244101858 ], [ 53.914028925249319, -1.044144407436459 ], [ 53.913970122217464, -1.044774533596224 ], [ 53.913907267415368, -1.045121569995819 ], [ 53.913825457994299, -1.045345717390172 ], [ 53.913742963817697, -1.045709946670326 ], [ 53.913656055920555, -1.046197594829993 ], [ 53.913627261919153, -1.046533193259305 ], [ 53.913625467921115, -1.046760081360774 ], [ 53.913578848606647, -1.047001692277286 ], [ 53.913424607455092, -1.047500002887475 ], [ 53.913305007663467, -1.047833096952542 ], [ 53.91324067181624, -1.047994417861821 ], [ 53.913067922129947, -1.048199309774767 ], [ 53.91278438765012, -1.048715772790035 ], [ 53.912605127837075, -1.049120245349388 ], [ 53.912439652820595, -1.049676643500437 ], [ 53.912329691467477, -1.04997905630519 ], [ 53.912174169628877, -1.050203335890431 ], [ 53.912497736572384, -1.050428924185907 ], [ 53.912678590610497, -1.050566407115731 ], [ 53.912833346862115, -1.050699915829169 ], [ 53.91310318495637, -1.050951088894262 ], [ 53.913199322516206, -1.051060047725398 ], [ 53.913289277513186, -1.051182849277271 ], [ 53.913635198320371, -1.051735274228092 ], [ 53.913940688305715, -1.052290146225882 ], [ 53.914292069907084, -1.052965786759965 ], [ 53.916078332205281, -1.055740565752171 ], [ 53.917130451196321, -1.057403856795312 ], [ 53.917964642536511, -1.058903120101334 ], [ 53.919215921499017, -1.06109807193599 ], [ 53.919413956710592, -1.061480387524709 ], [ 53.919565254339069, -1.061748030955524 ], [ 53.919745511132632, -1.062040912811714 ], [ 53.919989185624495, -1.062397851922978 ], [ 53.920074588192598, -1.062514708682424 ], [ 53.92058107472883, -1.063147469724636 ], [ 53.920900246566404, -1.063504255313935 ], [ 53.921230898370609, -1.063834902899887 ], [ 53.921492407515387, -1.064058986967745 ], [ 53.921666021048139, -1.064192151405282 ], [ 53.921849460551833, -1.064317483397097 ], [ 53.922404945024972, -1.06466443756756 ], [ 53.922272194845007, -1.064930845559582 ], [ 53.922150522406547, -1.065119342960462 ], [ 53.921982237023343, -1.065324108211297 ], [ 53.921752665278362, -1.065623128778918 ], [ 53.921593199961094, -1.065806374579861 ], [ 53.921469574823682, -1.065975114208446 ], [ 53.921375428162705, -1.066120353753694 ], [ 53.92131423639087, -1.066226788686115 ], [ 53.921238133958887, -1.066380760930845 ], [ 53.921143620644898, -1.066594530028114 ], [ 53.921017783796714, -1.066941474335329 ], [ 53.920634888062217, -1.067752484348612 ], [ 53.920304784336942, -1.068533372883975 ], [ 53.920183576852452, -1.068898473705414 ], [ 53.920137209899188, -1.069062434202482 ], [ 53.92005709218833, -1.069394641601185 ], [ 53.920022466333549, -1.069565953442125 ], [ 53.919976888584834, -1.069831915419676 ], [ 53.919779097328437, -1.070754491452154 ], [ 53.919611230212219, -1.071595692820116 ], [ 53.919557437710075, -1.071962328817377 ], [ 53.919487246717402, -1.071951704116699 ], [ 53.91951536899856, -1.072450517993901 ], [ 53.919471225569232, -1.073252422940489 ], [ 53.91944638456912, -1.073877268970044 ], [ 53.919432445370767, -1.074051162117139 ], [ 53.919393111117408, -1.074545377852643 ], [ 53.919293493482719, -1.075382002584733 ], [ 53.919206021258987, -1.076279261698067 ], [ 53.919274695584228, -1.076326471058263 ], [ 53.919275482916341, -1.076545717621207 ], [ 53.919275429690053, -1.076772596064626 ], [ 53.919250383210354, -1.077373078776335 ], [ 53.919212480332924, -1.077704332526442 ], [ 53.918982266417913, -1.077689612005267 ], [ 53.918721963432716, -1.077619216918515 ], [ 53.91884158031349, -1.078682435470063 ], [ 53.918938266121813, -1.079217803491107 ], [ 53.91905568484065, -1.080465321856864 ], [ 53.919233833165677, -1.082486550374011 ], [ 53.919252661919884, -1.083186563245695 ], [ 53.919124603850641, -1.083248752661364 ], [ 53.919038806983885, -1.083313061215409 ], [ 53.918957654547675, -1.083397062267635 ], [ 53.918883807686569, -1.083496129494431 ], [ 53.918829720103126, -1.083593241003532 ], [ 53.918799710959405, -1.083665462643569 ], [ 53.918758611299118, -1.083815581988133 ], [ 53.918742233213422, -1.083907299324676 ], [ 53.918731103231579, -1.084097873664328 ], [ 53.918734704890248, -1.084216561188818 ], [ 53.918601432133109, -1.085009728290241 ], [ 53.918571787594139, -1.085247908245734 ], [ 53.918544542784296, -1.085565212616034 ], [ 53.918536395958071, -1.085793786365975 ], [ 53.91853275369084, -1.08602378427563 ], [ 53.918535767558005, -1.086183595448513 ], [ 53.918560405196693, -1.086586556749358 ], [ 53.918592659183723, -1.087045690018013 ], [ 53.919643464324317, -1.086818725241123 ], [ 53.920232883627136, -1.086790635104318 ], [ 53.920664760105126, -1.086848209118337 ], [ 53.920929910087679, -1.086965763401961 ], [ 53.921077633594571, -1.087125472141405 ], [ 53.921193764184267, -1.08726759832441 ], [ 53.92127006337676, -1.087372525586107 ], [ 53.92131010285641, -1.087437130052446 ], [ 53.921357586254409, -1.087535072597297 ], [ 53.921495808538708, -1.087864016875482 ], [ 53.921495820102571, -1.087865539368979 ], [ 53.921542566346574, -1.087984817358439 ], [ 53.921600246941253, -1.088123653052445 ], [ 53.921641600840751, -1.088243049126349 ], [ 53.921690617919921, -1.088424711327881 ], [ 53.92183511700155, -1.088752001668658 ], [ 53.922037687113416, -1.08926989840409 ], [ 53.922151224740965, -1.08954457109748 ], [ 53.922268379550204, -1.089822212132568 ], [ 53.922595482882279, -1.09052471442961 ], [ 53.922748721043838, -1.090819850508303 ], [ 53.923102030493496, -1.091304038632238 ], [ 53.923158290230148, -1.09137438861416 ], [ 53.923321331583715, -1.091539879921305 ], [ 53.923512980837671, -1.09168495481031 ], [ 53.923827046428293, -1.09185326188718 ], [ 53.924056705454397, -1.091913758913787 ], [ 53.924270833575193, -1.091941091051007 ], [ 53.924447920005235, -1.091943338906931 ], [ 53.924680356306318, -1.09189565388106 ], [ 53.924755649871678, -1.091868130895018 ], [ 53.925149169510192, -1.091727098502748 ], [ 53.925261908252622, -1.091659166991749 ], [ 53.925351258189465, -1.09158869719283 ], [ 53.925480588025344, -1.091456443306193 ], [ 53.925853425565556, -1.090957971349213 ], [ 53.925917162451036, -1.090828662289499 ], [ 53.926193317188215, -1.090026175594426 ], [ 53.92625183266837, -1.08980103377578 ], [ 53.926284528362814, -1.089608434536666 ], [ 53.926412776037537, -1.088978198797836 ], [ 53.926471206119352, -1.0886236074085 ], [ 53.926617403950829, -1.087753874128613 ], [ 53.926617392384806, -1.087752351448793 ], [ 53.926704738597756, -1.087418446865134 ], [ 53.926758682224722, -1.087065471614937 ], [ 53.926809940347994, -1.086714077010189 ], [ 53.926912767418337, -1.085816341685274 ], [ 53.926991527255687, -1.08529986482931 ], [ 53.927025334768878, -1.085136170267573 ], [ 53.927056782448282, -1.085016692558771 ], [ 53.927093656894478, -1.084901664807849 ], [ 53.927148237937558, -1.084751221584127 ], [ 53.927244580878053, -1.084537422958664 ], [ 53.927418599617425, -1.083901585681168 ], [ 53.927649212167069, -1.083144188206443 ], [ 53.927864411488599, -1.082487636970623 ], [ 53.928051152123601, -1.081871301179594 ], [ 53.928183897158867, -1.081364278026697 ], [ 53.928266803463863, -1.080922312414502 ], [ 53.928444315164334, -1.080392977479607 ], [ 53.928532492790602, -1.080052932393733 ], [ 53.928589939095033, -1.079807988257626 ], [ 53.928641957815778, -1.079558593849252 ], [ 53.928699846509929, -1.079254241294849 ], [ 53.928841751474508, -1.07841955204592 ], [ 53.92896495380387, -1.077608114767408 ], [ 53.929010696203306, -1.077127354647233 ], [ 53.929071122575024, -1.076803140673296 ], [ 53.929126928774565, -1.076579547397266 ], [ 53.929184766123647, -1.07638636920977 ], [ 53.929245521734288, -1.076222063589994 ], [ 53.929297641775229, -1.076103639166865 ], [ 53.929389768688083, -1.075927978422851 ], [ 53.92955140621342, -1.075674629001766 ], [ 53.929635014571652, -1.075560076248469 ], [ 53.929731192575588, -1.075443722159426 ], [ 53.929792720659627, -1.075379917175613 ], [ 53.929899018424159, -1.075293799567277 ], [ 53.930279225012193, -1.075177256552527 ], [ 53.930789696994353, -1.075169016053159 ], [ 53.931146288325102, -1.075254040556172 ], [ 53.931424100833631, -1.075380408860799 ], [ 53.93167502322801, -1.075516511884749 ], [ 53.932255317243872, -1.076055061730773 ], [ 53.93286568944221, -1.076765079524252 ], [ 53.933512706356815, -1.07756570066742 ], [ 53.934165530717834, -1.078421053925584 ], [ 53.934750095920464, -1.079166740728553 ], [ 53.935331610479984, -1.079866817839462 ], [ 53.935935565517248, -1.080446082402466 ], [ 53.93755002397392, -1.081994845410161 ], [ 53.938333643194483, -1.082679911089391 ], [ 53.938374755453367, -1.082413944408124 ], [ 53.938622946613378, -1.081605682199022 ], [ 53.938711466652038, -1.081192427232225 ], [ 53.938805807329132, -1.080952707504347 ], [ 53.939071684763306, -1.081164708082452 ], [ 53.939404741284854, -1.081346290898882 ], [ 53.939697871371834, -1.081478481079967 ], [ 53.939838956974071, -1.081121949711431 ], [ 53.939840208006601, -1.080933018820211 ], [ 53.939441770024658, -1.080664517586866 ], [ 53.939249359873834, -1.08065656077139 ], [ 53.939222949418621, -1.080494138483059 ], [ 53.938971531291301, -1.080292487051178 ], [ 53.9390569067154, -1.080056007787976 ], [ 53.939195058571016, -1.079434471568418 ], [ 53.939308227215541, -1.078368650120893 ], [ 53.939463081043982, -1.076997222699179 ], [ 53.939695130143491, -1.075147251087942 ], [ 53.939847920497613, -1.07386267905145 ], [ 53.939361343898803, -1.073705882369673 ], [ 53.939557065709799, -1.07181404747647 ], [ 53.939506539829658, -1.071789271183443 ], [ 53.939509338079489, -1.071569838936536 ], [ 53.937771201596092, -1.071014327237268 ], [ 53.937882622861522, -1.069616468293253 ], [ 53.938105849970484, -1.066298208797819 ], [ 53.938132498284162, -1.065910681795676 ], [ 53.938149674660586, -1.065576683381261 ], [ 53.938178369042838, -1.065336875283586 ], [ 53.938267731662705, -1.064923570856631 ], [ 53.938387113907567, -1.064441041688568 ], [ 53.93850903067257, -1.064168677823097 ], [ 53.938559258152928, -1.064039590648273 ], [ 53.93869470980664, -1.063658761804497 ], [ 53.938768856516624, -1.063484959798422 ], [ 53.938875897521733, -1.06326471886386 ], [ 53.939245969575587, -1.062541956099762 ], [ 53.939744589382862, -1.061706610436633 ], [ 53.940300045849682, -1.060898913393631 ], [ 53.940513249688934, -1.060577249009798 ], [ 53.940821669025752, -1.06013308852557 ], [ 53.940930956511345, -1.060200710935736 ], [ 53.941025903344091, -1.059928924319227 ], [ 53.941203062259547, -1.059595872291924 ], [ 53.941318724861056, -1.059329710329961 ], [ 53.941368911266544, -1.059196039075861 ], [ 53.941413669698179, -1.059057919227967 ], [ 53.941465191241946, -1.058750540949671 ], [ 53.941704901607224, -1.058141844321856 ], [ 53.941838345771451, -1.0577366367901 ], [ 53.941976528417364, -1.05759183754249 ], [ 53.941856412031626, -1.057289846749745 ], [ 53.941793843833565, -1.057105391847204 ], [ 53.941634143496039, -1.057142509954524 ], [ 53.941476431774099, -1.057203958564908 ], [ 53.941354427747136, -1.057234132131776 ], [ 53.941189373216737, -1.057161680446912 ], [ 53.940584480632964, -1.056591841005408 ], [ 53.940095308412396, -1.056222021209581 ], [ 53.939799767426699, -1.056015413613103 ], [ 53.939577545199498, -1.05587418327893 ], [ 53.939399405563009, -1.05573805254495 ], [ 53.939131051407514, -1.05555978211874 ], [ 53.938917072385223, -1.055438174201274 ], [ 53.938799550469867, -1.055352472865713 ], [ 53.938738884334782, -1.05529595501855 ], [ 53.93865639849286, -1.055207939449754 ], [ 53.938566459623544, -1.055086578463515 ], [ 53.938442538792941, -1.054873060598869 ], [ 53.938355307585581, -1.054753163101606 ], [ 53.937886595273291, -1.054357024591025 ], [ 53.937371126796293, -1.053958905999125 ], [ 53.937157350102595, -1.053863203134258 ], [ 53.937084341836318, -1.053837435245662 ], [ 53.936897230184158, -1.054274289066502 ], [ 53.936132620326774, -1.053398936649602 ], [ 53.934935132304062, -1.05200028923024 ], [ 53.931386757568042, -1.047936330947381 ], [ 53.930495833350527, -1.046893500957069 ], [ 53.928376830580298, -1.044460812613905 ], [ 53.927985965666302, -1.04402502857045 ], [ 53.926567200124232, -1.042394403839636 ], [ 53.924884187450772, -1.040430346454787 ], [ 53.922904172810618, -1.038197644063859 ], [ 53.922194619233828, -1.037365767714411 ], [ 53.921861333759132, -1.037052132060637 ], [ 53.921388204308471, -1.036673197105416 ], [ 53.921263235415701, -1.036557300237209 ], [ 53.920283397671696, -1.035647963561062 ], [ 53.919614970692251, -1.035014704820295 ], [ 53.918946748488132, -1.034407346637447 ], [ 53.918049261415383, -1.033569293934359 ], [ 53.916799598952181, -1.032418152060146 ]
        ]), 
    };

    function show(placeName) {
        $('.entry-content .active').removeClass('active'); // deactivate list and content
        $('#places-list a[href="#' + placeName + '"]').addClass('active'); // activate list
        $('#' + placeName).addClass('active'); // activate content
    }

    $('#places-list a').each(function () {
        var placeName = this.href.split('#')[1],
            place     = places[placeName],
            title     = $(this).text();

        if (place) {
            title = place.name || title;
            place.marker = L.marker(place.location).addTo(map).bindPopup(title);

            place.marker.on('click', function () {
                show(placeName);
            });
        } else if (areas[placeName]) {
            areas[placeName].addTo(map).bindPopup(title);
            areas[placeName].on('click', function () {
                show(placeName);
            });
        }

    });

    function moveTo(placeName) {
        if (places[placeName]) {
            map.setView(places[placeName].location, 16, {animate: true});
            places[placeName].marker.openPopup();
        } else if (areas[placeName]) {
            map.fitBounds(areas[placeName].getBounds());
            areas[placeName].openPopup();
        }
    }

    $('#places-list a').click(function (e) {
        var placeName = this.href.split('#')[1];

        e.preventDefault();

        show(placeName);
        moveTo(placeName);
    });

    moveTo($('#places-list a')[0].href.split('#')[1]);

    function repositionSidebar() {
        var pc = $('#places-content'),
            pl = $('#places-list');

        if (document.documentElement.clientWidth >= 768) {

            var viewportTop   = $(window).scrollTop(),
                elementTop    = pc.offset().top,
                elementBottom = elementTop + pc.height();

            if (viewportTop < elementTop) {
                // top
                pc.removeClass('alpha offset-by-four');
                pl.css({
                    'position':  'static',
                    'margin-top': '16px',
                });
            } else if (viewportTop + pl.height() + 16 < elementBottom) {
                // middle
                pc.addClass('alpha offset-by-four');
                pl.css({
                    'position':  'fixed',
                    'top':       0,
                    'bottom':    'auto',
                    'margin-top': '16px',
                });
            } else {
                // bottom
                pc.removeClass('alpha offset-by-four');
                pl.css({
                    'position':   'static',
                    'margin-top': pc.height() - pl.height() - 16 + 'px',
                });
            }

        } else { // restore (in case the window has just been resized)
            pc.removeClass('alpha offset-by-four');
            pl.css({
                'position':   'static',
                'margin-top': '16px',
            });
        }
    }
    $(document).scroll($.throttle(50, repositionSidebar));
    $(window).resize($.throttle(50, repositionSidebar));
    $('#places-list a').click(repositionSidebar);

});
