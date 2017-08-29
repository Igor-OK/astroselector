//==================== MODEL =========================================

var ModelH = {


days : {},  // ephemerides will be here


// ----------------------- Native features---------
native_name : 'Игорь',
native_sex : 'М',
native_date : '26.04.1986',
native_time : '01.40',
native_country: 'Belarus',
native_city :'Minsk',
exact_time : 'true',
known_place: 'true', // in first time only for nat/cur gmt
native_gmt : 4,
current_gmt : 3,
//for NY current_gmt :-5,
user_string : null,

// coordinates of birth place
native_star_time: null,
native_lattitude: 53.9, //think about (and CHECK) situation of birth, when beyong polar round (murmansk for example)
native_longitude: 27.57,


//current coordinates if replacement (for future development of project)
current_lattitude: 54.37,
current_longitudes: 27.57,

//link https://ru.wikipedia.org/wiki/Время_в_Белоруссии

// for achiving native planet's longitude
native_uni_gmt : [],
arr_natal : [],
native_houses:[], //longitudes of native houses cuspids





// -------------------- Current date and time--------
current_uni_gmt : [],  // current time in right format
current_uni_gmt_up : [],   // next point of time in right format
current_uni_gmt_down : [],  // previous point of time in right format
selector: 'day',
arr_current : [], //current longitudes


//   ORBS for future dependesies (cosmic status, powers, ect)

nat_sun_orb : 5,
nat_moo_orb : 4,
nat_mer_orb : 2.5,
nat_ven_orb : 3,
nat_mar_orb : 3,
nat_upi_orb : 3,
nat_sat_orb : 3,
nat_ura_orb : 1.5,
nat_nep_orb : 1.5,
nat_plu_orb : 1.5,
nat_rah_orb : 1.5,
nat_ket_orb : 1.5,
nat_lil_orb : 1.5,
nat_sel_orb : 1.5,

cur_sun_orb : 5,
cur_moo_orb : 4,
cur_mer_orb : 2.5,
cur_ven_orb : 3,
cur_mar_orb : 3,
cur_upi_orb : 3,
cur_sat_orb : 3,
cur_ura_orb : 1.5,
cur_nep_orb : 1.5,
cur_plu_orb : 1.5,
cur_rah_orb : 1.5,
cur_ket_orb : 1.5,
cur_lil_orb : 1.5,
cur_sel_orb : 1.5,






// JSON -  AJAX  ----------------------------


TestLoadData : function(){
    $.ajax("files/natal.json",
      { 
      type:'GET', 
      dataType:'json', 
      cache:true,  // HERE SHOULD BE TRUE FOR QUICK FUTURE LOAD (FROM CASH)
      success:this.DataLoaded, 
      complete:ViewH.Complete,
      error:this.ErrorHandler,
      xhrFields: { onprogress: ViewH.Progress } 
      });
},

DataLoaded : function (data){
 // debugger;
    console.log('загруженные через AJAX данные:');
    ModelH.days = data;
    //console.log(ModelH.days);
       ModelH.Nat_to_uni_GMT();
       console.log (ModelH.native_uni_gmt);
       ModelH.Natal_request();
       console.log(ModelH.arr_natal);
       ModelH.Store(); //to local storage
       ModelH.Current();
       ModelH.Current_update(); // time under up&down buttons
       console.log(ModelH.Current_date_string());
       ViewH.Time_text = ModelH.Current_date_string();
       ViewH.User_text = ModelH.user_string;
     ModelH.Analyse_venus();
     ModelH.Analyse_angle();
       ViewH.ViewReady();
       ModelH.Model_prepare(); // changing icons for women
      // Analyse_and_show
},

ErrorHandler : function (jqXHR,StatusStr,ErrorStr){
    alert('Что-то пошло не так, базу не удалось загрузить');
    alert(StatusStr+' '+ErrorStr);
},


//---------------Time-zones in Belarus------set natal_gmt and current_gmt depending on date to date

Belarus_gmt : function(){ 
    var native_gmt =[];
    var nat_min_arr = this.native_time.split('.');
    var MIN =  Number(nat_min_arr[0])*60+Number(nat_min_arr[1]);
    var nat_date_arr = this.native_date.split('.');
    native_gmt[0] = Number(nat_date_arr[0]);  //day
    native_gmt[1] = Number(nat_date_arr[1]);   //month 
    native_gmt[2] = Number(nat_date_arr[2]);    //year
    native_gmt[3] = MIN;
console.log(native_gmt);
console.log(MIN);
//debugger;
    if(native_gmt[2]<1981) this.native_gmt=3;
    if((native_gmt[2]==1981)&&(native_gmt[1]<4)) this.native_gmt=3;  //to 01.04.1981 00:00 gmt+3

    if((native_gmt[2]==1981)&&(native_gmt[1]>=4)&&(native_gmt[1]<10)) this.native_gmt=4; //01.04-10.1981 00:00 gmt+4
   
    if((native_gmt[2]==1981)&&(native_gmt[1]>=10)) this.native_gmt=3;
    if((native_gmt[2]==1982)&&(native_gmt[1]<4)) this.native_gmt=3;  //01.10.81-01.04.82 gmt+3

    if((native_gmt[2]==1982)&&(native_gmt[1]>=4)&&(native_gmt[1]<10)) this.native_gmt=4; //01.04-10.1982 00:00 gmt+4

    if((native_gmt[2]==1982)&&(native_gmt[1]>=10)) this.native_gmt=3;
    if((native_gmt[2]==1983)&&(native_gmt[1]<4)) this.native_gmt=3;  //01.10.82-01.04.83 gmt+3

    if((native_gmt[2]==1983)&&(native_gmt[1]>=4)&&(native_gmt[1]<10)) this.native_gmt=4; //01.04-10.1983 00:00 gmt+4

    if((native_gmt[2]==1983)&&(native_gmt[1]>=10)) this.native_gmt=3;
    if((native_gmt[2]==1984)&&(native_gmt[1]<4)) this.native_gmt=3;  //01.10.83-01.04.84 gmt+3

    if((native_gmt[2]==1984)&&(native_gmt[1]>=4)&&( (native_gmt[1]<9) || ((native_gmt[1]==9)&&(native_gmt[0]<30)) || ((native_gmt[1]==9)&&(native_gmt[0]==30)&&(native_gmt[3]<180))) ) this.native_gmt=4; //01.04.84-30.09.1984 03:00 gmt+4

    if((native_gmt[2]==1984)&&((native_gmt[1]>9) || ((native_gmt[1]==9)&&(native_gmt[0]==30)&&(native_gmt[3]>=180)))) this.native_gmt=3;
    if((native_gmt[2]==1985)&&( (native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<31)) || ((native_gmt[1]==3)&&(native_gmt[0]==31)&&(native_gmt[3]<120)))) this.native_gmt=3;  //30.09.84-31.03.85 02:00 gmt+3

    if((native_gmt[2]==1985)&&((native_gmt[1]>3) ||  ((native_gmt[1]==3)&&(native_gmt[0]==31)&&(native_gmt[3]>=120)))&&( (native_gmt[1]<9) || ((native_gmt[1]==9)&&(native_gmt[0]<29)) || ((native_gmt[1]==9)&&(native_gmt[0]==29)&&(native_gmt[3]<180))) ) this.native_gmt=4; //01.04.85 02:00-29.09.1985 03:00 gmt+4

    if((native_gmt[2]==1985)&&((native_gmt[1]>9) || ((native_gmt[1]==9)&&(native_gmt[0]==29)&&(native_gmt[3]>=180)) || ((native_gmt[1]==9)&&(native_gmt[0]>29)))) this.native_gmt=3;
    if((native_gmt[2]==1986)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<30)) || ((native_gmt[1]==3)&&(native_gmt[0]==30)&&(native_gmt[3]<120)))) this.native_gmt=3;  //29.09.85 03:00-30.03.86 02:00 gmt+3


//---------summer time CUSTOM-EXAMPLE
    if((native_gmt[2]==1986)&&((native_gmt[1]>3) || ((native_gmt[1]==3)&&(native_gmt[0]==30)&&(native_gmt[3]>=120)) || ((native_gmt[1]==3)&&(native_gmt[0]>30)))   &&   ( (native_gmt[1]<9) || ((native_gmt[1]==9)&&(native_gmt[0]<28)) || ((native_gmt[1]==9)&&(native_gmt[0]==28)&&(native_gmt[3]<180))) ) 
    {this.native_gmt=4;

    } //30.03.86 02:00-28.09.1986 03:00 gmt+4

//---------winter time CUSTOM-EXAMPLE
    if((native_gmt[2]==1986)&&((native_gmt[1]>9) || ((native_gmt[1]==9)&&(native_gmt[0]==28)&&(native_gmt[3]>=180)) || ((native_gmt[1]==9)&&(native_gmt[0]>28)))) this.native_gmt=3;
    if((native_gmt[2]==1987)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<29)) || ((native_gmt[1]==3)&&(native_gmt[0]==29)&&(native_gmt[3]<120)))) this.native_gmt=3;  //28.09.86 03:00-29.03.87 02:00 gmt+3

    if((native_gmt[2]==1987)&&((native_gmt[1]>3) || ((native_gmt[1]==3)&&(native_gmt[0]==29)&&(native_gmt[3]>=120)) || ((native_gmt[1]==3)&&(native_gmt[0]>29)))   &&   ( (native_gmt[1]<9) || ((native_gmt[1]==9)&&(native_gmt[0]<27)) || ((native_gmt[1]==9)&&(native_gmt[0]==27)&&(native_gmt[3]<180))) ) this.native_gmt=4; //29.03.87 02:00-27.09.1987 03:00 gmt+4

    if((native_gmt[2]==1987)&&((native_gmt[1]>9) || ((native_gmt[1]==9)&&(native_gmt[0]==27)&&(native_gmt[3]>=180)) || ((native_gmt[1]==9)&&(native_gmt[0]>27)))) this.native_gmt=3;
    if((native_gmt[2]==1988)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<27)) || ((native_gmt[1]==3)&&(native_gmt[0]==27)&&(native_gmt[3]<120)))) this.native_gmt=3;  //27.09.87 03:00-27.03.88 02:00 gmt+3

    if((native_gmt[2]==1988)&&((native_gmt[1]>3) || ((native_gmt[1]==3)&&(native_gmt[0]==27)&&(native_gmt[3]>=120)) || ((native_gmt[1]==3)&&(native_gmt[0]>27)))   &&   ( (native_gmt[1]<9) || ((native_gmt[1]==9)&&(native_gmt[0]<25)) || ((native_gmt[1]==9)&&(native_gmt[0]==25)&&(native_gmt[3]<180))) ) this.native_gmt=4; //27.03.88 02:00-25.09.1988 03:00 gmt+4

    if((native_gmt[2]==1988)&&((native_gmt[1]>9) || ((native_gmt[1]==9)&&(native_gmt[0]==25)&&(native_gmt[3]>=180)) || ((native_gmt[1]==9)&&(native_gmt[0]>25)))) this.native_gmt=3;
    if((native_gmt[2]==1989)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<26)) || ((native_gmt[1]==3)&&(native_gmt[0]==26)&&(native_gmt[3]<120)))) this.native_gmt=3;  //25.09.88 03:00-26.03.89 02:00 gmt+3

    if((native_gmt[2]==1989)&&((native_gmt[1]>3) || ((native_gmt[1]==3)&&(native_gmt[0]==26)&&(native_gmt[3]>=120)) || ((native_gmt[1]==3)&&(native_gmt[0]>26)))   &&   ( (native_gmt[1]<9) || ((native_gmt[1]==9)&&(native_gmt[0]<24)) || ((native_gmt[1]==9)&&(native_gmt[0]==24)&&(native_gmt[3]<180))) ) this.native_gmt=4; //26.03.89 02:00-24.09.1989 03:00 gmt+4

    if((native_gmt[2]==1989)&&((native_gmt[1]>9) || ((native_gmt[1]==9)&&(native_gmt[0]==24)&&(native_gmt[3]>=180)) || ((native_gmt[1]==9)&&(native_gmt[0]>24)))) this.native_gmt=3;
    if((native_gmt[2]==1990)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<25)) || ((native_gmt[1]==3)&&(native_gmt[0]==25)&&(native_gmt[3]<120)))) this.native_gmt=3;  //24.09.89 03:00-25.03.90 02:00 gmt+3

    if((native_gmt[2]==1990)&&((native_gmt[1]>3) || ((native_gmt[1]==3)&&(native_gmt[0]==25)&&(native_gmt[3]>=120)) || ((native_gmt[1]==3)&&(native_gmt[0]>25)))   &&   ( (native_gmt[1]<9) || ((native_gmt[1]==9)&&(native_gmt[0]<30)) || ((native_gmt[1]==9)&&(native_gmt[0]==30)&&(native_gmt[3]<180))) ) this.native_gmt=4; //25.03.90 02:00-30.09.1990 03:00 gmt+4

    if((native_gmt[2]==1990)&&((native_gmt[1]>9) || ((native_gmt[1]==9)&&(native_gmt[0]==30)&&(native_gmt[3]>=180)) )) this.native_gmt=3;
    if((native_gmt[2]==1991)&&((native_gmt[1]<9) || ((native_gmt[1]==9)&&(native_gmt[0]<29)) || ((native_gmt[1]==9)&&(native_gmt[0]==29)&&(native_gmt[3]<120)))) this.native_gmt=3;  //30.09.90 03:00-29.09.91 02:00 gmt+3 

//-------Similarities with MOSKOW ENDs HERE

//here could be one important date, when decret time was returned in Russia 19.01.1992 - before +2 after+3 sinse this moment there was time lag 1 hour between Moskow and Minsk
 


    if((native_gmt[2]==1991)&&((native_gmt[1]>9) || ((native_gmt[1]==9)&&(native_gmt[0]==29)&&(native_gmt[3]>=180)) || ((native_gmt[1]==9)&&(native_gmt[0]>29)))) this.native_gmt=2;
    if((native_gmt[2]==1992)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<29)) || ((native_gmt[1]==3)&&(native_gmt[0]==29)&&(native_gmt[3]<120)))) this.native_gmt=2;  //29.09.91 03:00-29.03.92 02:00 gmt+2

    if((native_gmt[2]==1992)&&((native_gmt[1]>3) || ((native_gmt[1]==3)&&(native_gmt[0]==29)&&(native_gmt[3]>=120)) || ((native_gmt[1]==3)&&(native_gmt[0]>29)))   &&   ( (native_gmt[1]<9) || ((native_gmt[1]==9)&&(native_gmt[0]<27)) || ((native_gmt[1]==9)&&(native_gmt[0]==27)&&(native_gmt[3]<180))) ) this.native_gmt=3; //29.03.92 02:00-27.09.1992 03:00 gmt+3

    if((native_gmt[2]==1992)&&((native_gmt[1]>9) || ((native_gmt[1]==9)&&(native_gmt[0]==27)&&(native_gmt[3]>=180)) || ((native_gmt[1]==9)&&(native_gmt[0]>27)))) this.native_gmt=2;
    if((native_gmt[2]==1993)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<28)) || ((native_gmt[1]==3)&&(native_gmt[0]==28)&&(native_gmt[3]<120)))) this.native_gmt=2;  //27.09.92 03:00-28.03.93 02:00 gmt+2

    if((native_gmt[2]==1993)&&((native_gmt[1]>3) || ((native_gmt[1]==3)&&(native_gmt[0]==28)&&(native_gmt[3]>=120)) || ((native_gmt[1]==3)&&(native_gmt[0]>28)))   &&   ( (native_gmt[1]<9) || ((native_gmt[1]==9)&&(native_gmt[0]<26)) || ((native_gmt[1]==9)&&(native_gmt[0]==26)&&(native_gmt[3]<180))) ) this.native_gmt=3; //28.03.93 02:00-26.09.1993 03:00 gmt+3    

    if((native_gmt[2]==1993)&&((native_gmt[1]>9) || ((native_gmt[1]==9)&&(native_gmt[0]==26)&&(native_gmt[3]>=180)) || ((native_gmt[1]==9)&&(native_gmt[0]>26)))) this.native_gmt=2;
    if((native_gmt[2]==1994)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<27)) || ((native_gmt[1]==3)&&(native_gmt[0]==27)&&(native_gmt[3]<120)))) this.native_gmt=2;  //26.09.93 03:00-27.03.94 02:00 gmt+2

    if((native_gmt[2]==1994)&&((native_gmt[1]>3) || ((native_gmt[1]==3)&&(native_gmt[0]==27)&&(native_gmt[3]>=120)) || ((native_gmt[1]==3)&&(native_gmt[0]>27)))   &&   ( (native_gmt[1]<9) || ((native_gmt[1]==9)&&(native_gmt[0]<25)) || ((native_gmt[1]==9)&&(native_gmt[0]==25)&&(native_gmt[3]<180))) ) this.native_gmt=3; //27.03.94 02:00-25.09.1994 03:00 gmt+3     

    if((native_gmt[2]==1994)&&((native_gmt[1]>9) || ((native_gmt[1]==9)&&(native_gmt[0]==25)&&(native_gmt[3]>=180)) || ((native_gmt[1]==9)&&(native_gmt[0]>25)))) this.native_gmt=2;
    if((native_gmt[2]==1995)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<26)) || ((native_gmt[1]==3)&&(native_gmt[0]==26)&&(native_gmt[3]<120)))) this.native_gmt=2;  //25.09.94 03:00-26.03.95 02:00 gmt+2

    if((native_gmt[2]==1995)&&((native_gmt[1]>3) || ((native_gmt[1]==3)&&(native_gmt[0]==26)&&(native_gmt[3]>=120)) || ((native_gmt[1]==3)&&(native_gmt[0]>26)))   &&   ( (native_gmt[1]<9) || ((native_gmt[1]==9)&&(native_gmt[0]<24)) || ((native_gmt[1]==9)&&(native_gmt[0]==24)&&(native_gmt[3]<180))) ) this.native_gmt=3; //26.03.95 02:00-24.09.1995 03:00 gmt+3     

    if((native_gmt[2]==1995)&&((native_gmt[1]>9) || ((native_gmt[1]==9)&&(native_gmt[0]==24)&&(native_gmt[3]>=180)) || ((native_gmt[1]==9)&&(native_gmt[0]>24)))) this.native_gmt=2;
    if((native_gmt[2]==1996)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<31)) || ((native_gmt[1]==3)&&(native_gmt[0]==31)&&(native_gmt[3]<120)))) this.native_gmt=2;  //24.09.95 03:00-31.03.96 02:00 gmt+2

    if((native_gmt[2]==1996)&&((native_gmt[1]>3) || ((native_gmt[1]==3)&&(native_gmt[0]==31)&&(native_gmt[3]>=120)))   &&   ( (native_gmt[1]<9) || ((native_gmt[1]==10)&&(native_gmt[0]<27)) || ((native_gmt[1]==10)&&(native_gmt[0]==27)&&(native_gmt[3]<180))) ) this.native_gmt=3; //31.03.96 02:00-27.10.1996 03:00 gmt+3 

    if((native_gmt[2]==1996)&&((native_gmt[1]>10) || ((native_gmt[1]==10)&&(native_gmt[0]==27)&&(native_gmt[3]>=180)) || ((native_gmt[1]==10)&&(native_gmt[0]>27)))) this.native_gmt=2;
    if((native_gmt[2]==1997)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<30)) || ((native_gmt[1]==3)&&(native_gmt[0]==30)&&(native_gmt[3]<120)))) this.native_gmt=2;  //27.10.96 03:00-30.03.97 02:00 gmt+2

    if((native_gmt[2]==1997)&&((native_gmt[1]>3) || ((native_gmt[1]==3)&&(native_gmt[0]==30)&&(native_gmt[3]>=120)) || ((native_gmt[1]==3)&&(native_gmt[0]>30)))   &&   ( (native_gmt[1]<10) || ((native_gmt[1]==10)&&(native_gmt[0]<26)) || ((native_gmt[1]==10)&&(native_gmt[0]==26)&&(native_gmt[3]<180))) ) this.native_gmt=3; //30.03.97 02:00-26.10.1997 03:00 gmt+3 

    if((native_gmt[2]==1997)&&((native_gmt[1]>10) || ((native_gmt[1]==10)&&(native_gmt[0]==26)&&(native_gmt[3]>=180)) || ((native_gmt[1]==10)&&(native_gmt[0]>26)))) this.native_gmt=2;
    if((native_gmt[2]==1998)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<29)) || ((native_gmt[1]==3)&&(native_gmt[0]==29)&&(native_gmt[3]<120)))) this.native_gmt=2;  //26.10.97 03:00-29.03.98 02:00 gmt+2

    if((native_gmt[2]==1998)&&((native_gmt[1]>3) || ((native_gmt[1]==3)&&(native_gmt[0]==29)&&(native_gmt[3]>=120)) || ((native_gmt[1]==3)&&(native_gmt[0]>29)))   &&   ( (native_gmt[1]<10) || ((native_gmt[1]==10)&&(native_gmt[0]<25)) || ((native_gmt[1]==10)&&(native_gmt[0]==25)&&(native_gmt[3]<180))) ) this.native_gmt=3; //29.03.98 02:00-25.10.1998 03:00 gmt+3 

    if((native_gmt[2]==1998)&&((native_gmt[1]>10) || ((native_gmt[1]==10)&&(native_gmt[0]==25)&&(native_gmt[3]>=180)) || ((native_gmt[1]==10)&&(native_gmt[0]>25)))) this.native_gmt=2;
    if((native_gmt[2]==1999)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<28)) || ((native_gmt[1]==3)&&(native_gmt[0]==28)&&(native_gmt[3]<120)))) this.native_gmt=2;  //25.10.98 03:00-28.03.99 02:00 gmt+2

    if((native_gmt[2]==1999)&&((native_gmt[1]>3) || ((native_gmt[1]==3)&&(native_gmt[0]==28)&&(native_gmt[3]>=120)) || ((native_gmt[1]==3)&&(native_gmt[0]>28)))   &&   ( (native_gmt[1]<10) || ((native_gmt[1]==10)&&(native_gmt[0]<31)) || ((native_gmt[1]==10)&&(native_gmt[0]==31)&&(native_gmt[3]<180))) ) this.native_gmt=3; //28.03.99 02:00-31.10.1999 03:00 gmt+3     

    if((native_gmt[2]==1999)&&((native_gmt[1]>10) || ((native_gmt[1]==10)&&(native_gmt[0]==31)&&(native_gmt[3]>=180)))) this.native_gmt=2;
    if((native_gmt[2]==2000)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<26)) || ((native_gmt[1]==3)&&(native_gmt[0]==26)&&(native_gmt[3]<120)))) this.native_gmt=2;  //31.10.99 03:00-26.03.00 02:00 gmt+2

    if((native_gmt[2]==2000)&&((native_gmt[1]>3) || ((native_gmt[1]==3)&&(native_gmt[0]==26)&&(native_gmt[3]>=120)) || ((native_gmt[1]==3)&&(native_gmt[0]>26)))   &&   ( (native_gmt[1]<10) || ((native_gmt[1]==10)&&(native_gmt[0]<29)) || ((native_gmt[1]==10)&&(native_gmt[0]==29)&&(native_gmt[3]<180))) ) this.native_gmt=3; //26.03.00 02:00-29.10.00 03:00 gmt+3 

    if((native_gmt[2]==2000)&&((native_gmt[1]>10) || ((native_gmt[1]==10)&&(native_gmt[0]==29)&&(native_gmt[3]>=180)) || ((native_gmt[1]==10)&&(native_gmt[0]>29)))) this.native_gmt=2;
    if((native_gmt[2]==2001)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<25)) || ((native_gmt[1]==3)&&(native_gmt[0]==25)&&(native_gmt[3]<120)))) this.native_gmt=2;  //29.10.00 03:00-25.03.01 02:00 gmt+2

    if((native_gmt[2]==2001)&&((native_gmt[1]>3) || ((native_gmt[1]==3)&&(native_gmt[0]==25)&&(native_gmt[3]>=120)) || ((native_gmt[1]==3)&&(native_gmt[0]>25)))   &&   ( (native_gmt[1]<10) || ((native_gmt[1]==10)&&(native_gmt[0]<28)) || ((native_gmt[1]==10)&&(native_gmt[0]==28)&&(native_gmt[3]<180))) ) this.native_gmt=3; //25.03.01 02:00-28.10.01 03:00 gmt+3 

    if((native_gmt[2]==2001)&&((native_gmt[1]>10) || ((native_gmt[1]==10)&&(native_gmt[0]==28)&&(native_gmt[3]>=180)) || ((native_gmt[1]==10)&&(native_gmt[0]>28)))) this.native_gmt=2;
    if((native_gmt[2]==2002)&&((native_gmt[1]<3) || ((native_gmt[1]==3)&&(native_gmt[0]<31)) || ((native_gmt[1]==3)&&(native_gmt[0]==31)&&(native_gmt[3]<120)))) this.native_gmt=2;  //28.10.01 03:00-31.03.02 02:00 gmt+2


// after this point time was sincronised with moskow time (all years after not acceptable yet because of age)


// YOU SHOULD WRITE MORE CODE FOR BELARUS, GLOBA p86-87 (2002-now)

console.log (this.native_gmt);

this.current_gmt=3;


},







//--------- save in Local storage------------------
Store: function(){
    window.localStorage.setItem('is_saved',true);
    window.localStorage.setItem('native_name',this.native_name);
    window.localStorage.setItem('native_sex',this.native_sex);
    window.localStorage.setItem('native_date',this.native_date);
    window.localStorage.setItem('native_time',this.native_time);
    window.localStorage.setItem('native_country',this.native_country);
    window.localStorage.setItem('native_city',this.native_city);
    window.localStorage.setItem('native_gmt',this.native_gmt);
    window.localStorage.setItem('current_gmt',this.current_gmt);
    window.localStorage.setItem('exact_time',this.exact_time);

},  // end of Store---------------------------------



//--------- load from Local storage------------------
Store_up : function(){

this.native_name=window.localStorage.getItem('native_name');
this.native_sex=window.localStorage.getItem('native_sex');
this.native_date=window.localStorage.getItem('native_date');
this.native_time=window.localStorage.getItem('native_time');
this.native_country=window.localStorage.getItem('native_country');
this.native_city=window.localStorage.getItem('native_city');
//this.native_gmt=window.localStorage.getItem('native_gmt');   //return in string from here
this.current_gmt=window.localStorage.getItem('current_gmt');
this.exact_time=window.localStorage.getItem('exact_time');

//var StoredUser=window.localStorage.getItem('is_saved');
//if ( StoredUser )
},







//---------------- FOR PROVIDING REAL DATE after math operations----------------------------
True_date_arr: function (_arr,_gmt){ 
  var min = _arr[3];
    if ((min -_gmt*60) < 0){
    _arr[3] = min -_gmt*60 + 1440;
    _arr[0]--; 
    }
    if (((min -_gmt*60) >= 0) && ((min -_gmt*60)<1440)){
    _arr[3]= min - _gmt*60;
    }
    if ((min - _gmt*60) >= 1440){
    _arr[3] = min - _gmt*60 - (((min - _gmt*60) >= 1440) ? 1440 : 0); 
    _arr[0]++; 
    }

    //--order of day-month
    if ((_arr[2] % 4 == 0) && (_arr[1] == 2) && (_arr[0] > 29)) {
    _arr[0] = _arr[0] - 29;
    _arr[1]++;
    }
    if ((_arr[2] % 4 != 0) && (_arr[1] == 2) && (_arr[0] > 28)) {
    _arr[0] = _arr[0] - 28;
    _arr[1]++;
    }
    if (((_arr[1] == 4) || (_arr[1] == 6) || (_arr[1] == 9) || (_arr[1] == 11)) && (_arr[0] >30)){
    _arr[0] = _arr[0] - 30;
    _arr[1]++;
    }
    if (((_arr[1] == 1) || (_arr[1] == 3) || (_arr[1] == 5) || (_arr[1] == 7) || (_arr[1] == 8) || (_arr[1] == 10) || (_arr[1] == 12)) && (_arr[0] >31)){
    _arr[0] = _arr[0] - 31;
    _arr[1]++;
    }
    if (_arr[0] <= 0){
      if ((_arr[1] == 3) && (_arr[2] % 4 == 0))  // march of special year
        _arr[0] = 29 + _arr[0];
      if ((_arr[1] == 3) && (_arr[2] % 4 != 0))  // march of usual year
        _arr[0] = 28 + _arr[0];
      if ((_arr[1] == 5) || (_arr[1] == 7) || (_arr[1] == 10)|| (_arr[1] == 12)) 
        _arr[0] = 30 + _arr[0];
      if ((_arr[1] == 1) || (_arr[1] == 2) || (_arr[1] == 4) || (_arr[1] == 6) || (_arr[1] == 8) || (_arr[1] == 9) || (_arr[1] == 11)) 
        _arr[0] = 31 + _arr[0];
    _arr[1] -- ;  
    }

    //--order of month - year
    if (_arr[1] == 0){
    _arr[2]--;
    _arr[1] = 12;
    }
    if (_arr[1] == 13){
    _arr[2]++;
    _arr[1] = 1;
    }
    return _arr;
},   //======================end of True_date_arr =====================





// --------------natal date-time--> universal GMT time -----------------
Nat_to_uni_GMT : function(){ 
    var nat_min_arr = this.native_time.split('.');
    var MIN =  Number(nat_min_arr[0])*60+Number(nat_min_arr[1]);
    var nat_date_arr = this.native_date.split('.');
    this.native_uni_gmt[0] = Number(nat_date_arr[0]);  //day
    this.native_uni_gmt[1] = Number(nat_date_arr[1]);   //month 
    this.native_uni_gmt[2] = Number(nat_date_arr[2]);    //year
    this.native_uni_gmt[3] = MIN;
this.True_date_arr(this.native_uni_gmt,this.native_gmt);
},//=========end of Nat_to_uni_GMT=======================================





//--------creating double-request string for DateBase (Universal)------
GMT_uni_to_Request: function(_arr){
  var _arr_start = [];
  var _arr_end = [];
  var _start='';
  var _end='';

for(var i = 0; i < 3; i++)
  _arr_start[i] = _arr[i];

  _arr_end[0]=_arr_start[0]+1;
  _arr_end[1]=_arr_start[1];
  _arr_end[2]=_arr_start[2];
  _arr_end[3]=0;

this.True_date_arr(_arr_end,0);

  for(var i = 0; i < 3; i++){
    if (_arr_start[i].toString().length == 1)
      _arr_start[i]='0'+_arr_start[i].toString();
    else _arr_start[i]=_arr_start[i].toString();
  }
  _start = _arr_start[0]+'.'+_arr_start[1]+'.'+_arr_start[2];

  for(var i = 0; i < 3; i++){
    if (_arr_end[i].toString().length == 1)
      _arr_end[i]='0'+_arr_end[i].toString();
    else _arr_end[i]=_arr_end[i].toString();
  }
  _end = _arr_end[0]+'.'+_arr_end[1]+'.'+_arr_end[2];
    return [_start,_end];
}, //=================== end of GMT_uni_to_Request=====================





//======= creating of array of longitudes, depending on exact time =======  // 360-0 TROUBLE WAS HERE
Custom_arr : function(_min,_start,_end){
    var natal_arr=[];
    var start = [];
    var end = [];
    var min = _min;
    for (i=1; i< _start.length;i++)  // CHANGING 0 TO 1 FOR INVOLVING STARTIME - Pos 0 in days-object
      start[i - 1] = _start[i];      // i-1 for it too
    for (i=1; i< _end.length;i++)  // here too
      end[i - 1] = _end[i];        // i-1 for it too

        for(var i = 0; i<start.length; i++){
          if(Math.abs(end[i]-start[i])<333)
            natal_arr[i] = (end[i]-start[i])*min/1440+start[i];   //should think about planet turned during the day 21 of march =)))
          else{

            if(end[i]<start[i])
              end[i]+=360;
            else start[i]+=360;
            natal_arr[i] = (end[i]-start[i])*min/1440+start[i];     // else is for cases of intersect of 0 deg
            if(natal_arr[i] >= 360)
              natal_arr[i]-=360;

          } //end of else
        }                                                                        // retro, if you wish, here // 1440 minutes in a day
    return (natal_arr);
},//====================-end of custom_arr ==============================



//===========Calculating native star time of birth=====================
Star_time : function(_start){   //_start - array from "days", where _start[0]-ST for grinvich midnight
var t0 = this.native_uni_gmt[3]; //  To  -  this native GMT time value is in MINUTES!!!!!
var st = _start[0] * 60; //So, getting in hous, transformin minutes
var lambda_T = this.native_longitude * 4; // one degree of longitude = 4min, result in minutes
var C = t0 * 9.856 / 3600; //long popravka in minutes, hours multipty to 9.856 resulting in seconds
var delta_T; // universal popravka to eph time (valuein seconds divided to 60 for gettin minutes)
if (this.native_uni_gmt[2] == 1961) delta_T = 34 /60;
if (this.native_uni_gmt[2] == 1962) delta_T = 34 /60;
if (this.native_uni_gmt[2] == 1963) delta_T = 35 /60;
if (this.native_uni_gmt[2] == 1964) delta_T = 35 /60;
if (this.native_uni_gmt[2] == 1965) delta_T = 36 /60;
if (this.native_uni_gmt[2] == 1966) delta_T = 37 /60;
if (this.native_uni_gmt[2] == 1967) delta_T = 38 /60;
if (this.native_uni_gmt[2] == 1968) delta_T = 39 /60;
if (this.native_uni_gmt[2] == 1969) delta_T = 40 /60;
if (this.native_uni_gmt[2] == 1970) delta_T = 41 /60;
if (this.native_uni_gmt[2] == 1971) delta_T = 42 /60;
if (this.native_uni_gmt[2] == 1972) delta_T = 43 /60;
if (this.native_uni_gmt[2] == 1973) delta_T = 44 /60;
if (this.native_uni_gmt[2] == 1974) delta_T = 45 /60;
if (this.native_uni_gmt[2] == 1975) delta_T = 46 /60;
if (this.native_uni_gmt[2] == 1976) delta_T = 47 /60;
if (this.native_uni_gmt[2] == 1977) delta_T = 48 /60;
if (this.native_uni_gmt[2] == 1978) delta_T = 49 /60;
if (this.native_uni_gmt[2] == 1979) delta_T = 50 /60;
if (this.native_uni_gmt[2] == 1980) delta_T = 51 /60;
if (this.native_uni_gmt[2] == 1981) delta_T = 52 /60;
if (this.native_uni_gmt[2] == 1982) delta_T = 53 /60;
if (this.native_uni_gmt[2] == 1983) delta_T = 53 /60;
if (this.native_uni_gmt[2] == 1984) delta_T = 54 /60;
if (this.native_uni_gmt[2] == 1985) delta_T = 55 /60;
if (this.native_uni_gmt[2] == 1986) delta_T = 55 /60;
if (this.native_uni_gmt[2] == 1987) delta_T = 56 /60;
if (this.native_uni_gmt[2] == 1988) delta_T = 56 /60;
if (this.native_uni_gmt[2] == 1989) delta_T = 56 /60;
if (this.native_uni_gmt[2] == 1990) delta_T = 57 /60;
if (this.native_uni_gmt[2] == 1991) delta_T = 57 /60;
//above data from placidus table, below - interpolated data from wiki every 5 years-control point
if (this.native_uni_gmt[2] == 1992) delta_T = 58 /60;
if (this.native_uni_gmt[2] == 1993) delta_T = 59 /60;
if (this.native_uni_gmt[2] == 1994) delta_T = 60 /60;
if (this.native_uni_gmt[2] == 1995) delta_T = 61 /60;
if (this.native_uni_gmt[2] == 1996) delta_T = 61 /60;
if (this.native_uni_gmt[2] == 1997) delta_T = 62 /60;
if (this.native_uni_gmt[2] == 1998) delta_T = 62 /60;
if (this.native_uni_gmt[2] == 1999) delta_T = 63 /60;
if (this.native_uni_gmt[2] == 2000) delta_T = 64 /60;
if (this.native_uni_gmt[2] == 2001) delta_T = 64 /60;
if (this.native_uni_gmt[2] == 2002) delta_T = 64 /60;
if (this.native_uni_gmt[2] == 2003) delta_T = 64 /60;
if (this.native_uni_gmt[2] == 2004) delta_T = 65 /60;
if (this.native_uni_gmt[2] == 2005) delta_T = 65 /60;
if (this.native_uni_gmt[2] == 2006) delta_T = 65 /60;
if (this.native_uni_gmt[2] == 2007) delta_T = 65 /60;
if (this.native_uni_gmt[2] == 2008) delta_T = 66 /60;
if (this.native_uni_gmt[2] == 2009) delta_T = 66 /60;
if (this.native_uni_gmt[2] == 2010) delta_T = 66 /60;

var LST = t0 + st + lambda_T + C + delta_T;
if (LST >= 1440) LST-=1440;
console.log('!!!Local Siderial Time of birth!!!'+LST);
return LST;
},
//======= end of Star_time function







// =====Calculating of cuspids of houses in Placidus system
Placidus_houses : function(star_time, lattitude){

//var sin_e = 0.3976284;
//var cos_e = 0.9175466;  // assuming that e = 23deg26min   or  23.43deg

var sin_e = 0.3977068;
var cos_e = 0.9175125;  // assuming that e = 23deg26min   or  23.4349deg


//SHOULD BE ORIGINAL FORMULA, whet obliquity (e) depends on year(part of century)  e = 23.27 NOW



var RAMC = star_time * 15 / 60 ; // star time are put in minutes
console.log('RAMC = '+RAMC);

var MC = Math.atan((Math.tan(RAMC*Math.PI/180))/cos_e);
MC = MC*180/Math.PI; //result to degrees
console.log('первичный MC'+ MC);

if (MC < 0)
  MC = MC + 180;  // Тут и ниже логика из  - Хэнд Р. Асцендент, МС и Вертекс в экстремальных широтах. // Российская астрология, 1996, №8, стр. 18.
if (Math.cos(RAMC*Math.PI/180) < 0)
  MC = MC + 180;
console.log('MC = '+MC);
//console.log();


var Asc = Math.atan(Math.cos(RAMC/180*Math.PI)/(-((Math.tan(lattitude*Math.PI/180)*sin_e) + (Math.sin(RAMC*Math.PI/180)*cos_e))));
//ASC = arctg (cos RAMC / -[ (tg f · sin e) + (sin RAMC · cos e)] )
Asc = Asc*180/Math.PI; //result to degrees

if(Asc < 0)
  Asc = Asc + 180;

if (Math.cos(RAMC*Math.PI/180) < 0)
  Asc = Asc + 180;
console.log('Asc = '+Asc);



// 2 intervals of cuspids
var H11 = RAMC + 30;
var H12 = RAMC + 60;
var H2 = RAMC + 120;
var H3 = RAMC + 150;

// 3 proportion ofa semi-arcs
var F11 = 1/3;
var F12 = 2/3;
var F2 = 2/3;
var F3 = 1/3;
debugger;
// 4 Cuspal declination
var D11 = (Math.asin(sin_e * Math.sin(H11/180*Math.PI)))*180/Math.PI; //!!! value in degrees
var D12 = (Math.asin(sin_e * Math.sin(H12/180*Math.PI)))*180/Math.PI; //!!! value in degrees
var D2 = (Math.asin(sin_e * Math.sin(H2/180*Math.PI)))*180/Math.PI; //!!! value in degrees
var D3 = (Math.asin(sin_e * Math.sin(H3/180*Math.PI)))*180/Math.PI; //!!! value in degrees


function Placidus_iteration(D11, D12, D2, D3){
// 5 First Intermediate values
var A11 =  (F11 * Math.asin(Math.tan(lattitude*Math.PI/180) * Math.tan(D11*Math.PI/180)))*180/Math.PI; //!!! value in degrees
var A12 =  (F12 * Math.asin(Math.tan(lattitude*Math.PI/180) * Math.tan(D12*Math.PI/180)))*180/Math.PI; // !!! value in degrees
var A2 =  (F2 * Math.asin(Math.tan(lattitude*Math.PI/180) * Math.tan(D2*Math.PI/180)))*180/Math.PI; //!!! value in degrees
var A3 =  (F3 * Math.asin(Math.tan(lattitude*Math.PI/180) * Math.tan(D3*Math.PI/180)))*180/Math.PI; //!!! value in degrees

// 6 House cusp positions
var M11 = (Math.atan(Math.sin(A11/180*Math.PI) / (Math.cos(H11 * Math.PI/180) * Math.tan(D11 * Math.PI/180))))*180/Math.PI; //!!! value in degrees
var M12 = (Math.atan(Math.sin(A12/180*Math.PI) / (Math.cos(H12 * Math.PI/180) * Math.tan(D12 * Math.PI/180))))*180/Math.PI; //!!! value in degrees
var M2 = (Math.atan(Math.sin(A2/180*Math.PI) / (Math.cos(H2 * Math.PI/180) * Math.tan(D2 * Math.PI/180))))*180/Math.PI; //!!! value in degrees
var M3 = (Math.atan(Math.sin(A3/180*Math.PI) / (Math.cos(H3 * Math.PI/180) * Math.tan(D3 * Math.PI/180))))*180/Math.PI; //!!! value in degrees

// 7 Intermediate house cusps
var R11 = (Math.atan((Math.tan(H11/180*Math.PI) * Math.cos(M11/180*Math.PI)) / Math.cos((M11+23.4349)/180*Math.PI)))*180/Math.PI;//Eo = 23.4349
var R12 = (Math.atan((Math.tan(H12/180*Math.PI) * Math.cos(M12/180*Math.PI)) / Math.cos((M12+23.4349)/180*Math.PI)))*180/Math.PI;//Eo = 23.4349
var R2 = (Math.atan((Math.tan(H2/180*Math.PI) * Math.cos(M2/180*Math.PI)) / Math.cos((M2+23.4349)/180*Math.PI)))*180/Math.PI;//Eo = 23.4349
var R3 = (Math.atan((Math.tan(H3/180*Math.PI) * Math.cos(M3/180*Math.PI)) / Math.cos((M3+23.4349)/180*Math.PI)))*180/Math.PI;//Eo = 23.4349



if(R11<0) R11+=180;
if(R12<0) R12+=180;
if(R2<0) R2+=180;
if(R3<0) R3+=180;

if (Math.cos(RAMC*Math.PI/180) < 0){
  R11 +=180;
  R12 +=180;
  R2 += 180;
  R3 += 180;
}

console.log('11- '+R11);
console.log('12- '+R12);
console.log('2- '+R2);
console.log('3- '+R3);


return [R11, R12, R2, R3]
}// end of Placidus_iteration

var R_iter_1 = Placidus_iteration(D11, D12, D2, D3);
D11 = R_iter_1[0];
D12 = R_iter_1[1]; 
D2 = R_iter_1[2]; 
D3 = R_iter_1[3]; 

var R_iter_2 = Placidus_iteration(D11, D12, D2, D3);
D11 = R_iter_2[0];
D12 = R_iter_2[1]; 
D2 = R_iter_2[2]; 
D3 = R_iter_2[3]; 

var R_iter_3 = Placidus_iteration(D11, D12, D2, D3);
console.log(' 11 дом - '+R_iter_3[0]+' градусов от куспида десятого'); 
console.log(' 12 дом - '+R_iter_3[1]+' градусов от куспида одиннадцатого'); 
console.log(' 2 дом - '+R_iter_3[2]+' градусов от асцендента'); 
console.log(' 3 дом - '+R_iter_3[3]+' градусов от второго'); 

},
//====end of Placidus_houses







//================== Achiving of array of NATAL longitudes ==============
Natal_request : function(){
    //making of request to "days"
    var req = this.GMT_uni_to_Request(this.native_uni_gmt);

    //achiving of array of longitudes of planet in current time
    this.arr_natal = this.Custom_arr(this.native_uni_gmt[3],this.days[req[0]],this.days[req[1]]);

    //achiving of local native_star_time (just loading up the function, which calculate and assign 'native_star_time' to value of local native star time)
    this.native_star_time = this.Star_time(this.days[req[0]]);

    //achiving of houses cuspids for birth place (PLACIDUS SYSTEM)
    this.native_houses = this.Placidus_houses(this.native_star_time, this.native_lattitude);

    // forming user-string(about native)
    this.user_string = this.native_name+' -'+this.native_sex+'- '+this.native_date+' '+this.native_time+' UTC+'+this.native_gmt+' '+this.native_city+' '+this.native_country;

},//===================== end of Natal_request============================




// defining all signs, depending on native sex (maybe some logic about exacttime should be here)

Model_prepare : function(){
if (this.native_sex == 'Ж'){
  ViewH.Red5.setAttribute("src", "img/sprites2.svg#Red5f");
  ViewH.Green4.setAttribute("src", "img/sprites2.svg#Green4f");
}
},







// ==================== coordination of system with current time ========
Current : function(){
var Now = new Date();
this.current_uni_gmt[0] = Now.getUTCDate();
this.current_uni_gmt[1] = Now.getUTCMonth()+1;
this.current_uni_gmt[2] = Now.getUTCFullYear();
this.current_uni_gmt[3] = Now.getUTCHours()*60 + Now.getUTCMinutes();
console.log(this.current_uni_gmt);
var now_request = this.GMT_uni_to_Request(this.current_uni_gmt);

//debugger;

this.arr_current = this.Custom_arr(this.current_uni_gmt[3],this.days[now_request[0]],this.days[now_request[1]]);
console.log(this.arr_current);

this.current_uni_gmt_up[0] = Now.getUTCDate()+1;
this.current_uni_gmt_up[1] = Now.getUTCMonth()+1;
this.current_uni_gmt_up[2] = Now.getUTCFullYear();
this.current_uni_gmt_up[3] = Now.getUTCHours()*60 + Now.getUTCMinutes();
this.current_uni_gmt_up = this.True_date_arr(this.current_uni_gmt_up,0);
console.log(this.current_uni_gmt_up);

this.current_uni_gmt_down[0] = Now.getUTCDate()-1;
this.current_uni_gmt_down[1] = Now.getUTCMonth()+1;
this.current_uni_gmt_down[2] = Now.getUTCFullYear();
this.current_uni_gmt_down[3] = Now.getUTCHours()*60 + Now.getUTCMinutes();
this.current_uni_gmt_down = this.True_date_arr(this.current_uni_gmt_down,0);
console.log(this.current_uni_gmt_down);
}, // ==================  end of current ====================================




//=================== update of model from 'select' manipulation ===============
Current_update : function(){
if(this.selector == 'hour'){

  this.current_uni_gmt_up[0] = this.current_uni_gmt[0];
  this.current_uni_gmt_up[1] = this.current_uni_gmt[1];
  this.current_uni_gmt_up[2] = this.current_uni_gmt[2];
  this.current_uni_gmt_up[3] = this.current_uni_gmt[3] + 60;
  this.current_uni_gmt_up = this.True_date_arr(this.current_uni_gmt_up,0);
  //console.log(this.current_uni_gmt_up);

  this.current_uni_gmt_down[0] = this.current_uni_gmt[0];
  this.current_uni_gmt_down[1] = this.current_uni_gmt[1];
  this.current_uni_gmt_down[2] = this.current_uni_gmt[2];
  this.current_uni_gmt_down[3] = this.current_uni_gmt[3] - 60;
  this.current_uni_gmt_down = this.True_date_arr(this.current_uni_gmt_down,0);
  //console.log(this.current_uni_gmt_down);
}

if(this.selector == 'day'){
  this.current_uni_gmt_up[0] = this.current_uni_gmt[0]+1;
  this.current_uni_gmt_up[1] = this.current_uni_gmt[1];
  this.current_uni_gmt_up[2] = this.current_uni_gmt[2];
  this.current_uni_gmt_up[3] = this.current_uni_gmt[3];
  this.current_uni_gmt_up = this.True_date_arr(this.current_uni_gmt_up,0);
  //console.log(this.current_uni_gmt_up);

  this.current_uni_gmt_down[0] = this.current_uni_gmt[0]-1;
  this.current_uni_gmt_down[1] = this.current_uni_gmt[1];
  this.current_uni_gmt_down[2] = this.current_uni_gmt[2];
  this.current_uni_gmt_down[3] = this.current_uni_gmt[3];
  this.current_uni_gmt_down = this.True_date_arr(this.current_uni_gmt_down,0);
  //console.log(this.current_uni_gmt_down);
}

if(this.selector == 'week'){
  this.current_uni_gmt_up[0] = this.current_uni_gmt[0]+7;
  this.current_uni_gmt_up[1] = this.current_uni_gmt[1];
  this.current_uni_gmt_up[2] = this.current_uni_gmt[2];
  this.current_uni_gmt_up[3] = this.current_uni_gmt[3];
  this.current_uni_gmt_up = this.True_date_arr(this.current_uni_gmt_up,0);
  //console.log(this.current_uni_gmt_up);

  this.current_uni_gmt_down[0] = this.current_uni_gmt[0]-7;
  this.current_uni_gmt_down[1] = this.current_uni_gmt[1];
  this.current_uni_gmt_down[2] = this.current_uni_gmt[2];
  this.current_uni_gmt_down[3] = this.current_uni_gmt[3];
  this.current_uni_gmt_down = this.True_date_arr(this.current_uni_gmt_down,0);
  //console.log(this.current_uni_gmt_down);
}

if(this.selector == 'month'){
  this.current_uni_gmt_up[0] = this.current_uni_gmt[0];
  this.current_uni_gmt_up[1] = this.current_uni_gmt[1]+1;
  this.current_uni_gmt_up[2] = this.current_uni_gmt[2];
  this.current_uni_gmt_up[3] = this.current_uni_gmt[3];
  this.current_uni_gmt_up = this.True_date_arr(this.current_uni_gmt_up,0);
  //console.log(this.current_uni_gmt_up);

  this.current_uni_gmt_down[0] = this.current_uni_gmt[0];
  this.current_uni_gmt_down[1] = this.current_uni_gmt[1]-1;
  this.current_uni_gmt_down[2] = this.current_uni_gmt[2];
  this.current_uni_gmt_down[3] = this.current_uni_gmt[3];
  this.current_uni_gmt_down = this.True_date_arr(this.current_uni_gmt_down,0);
  //console.log(this.current_uni_gmt_down);
}

},//======================== end of Current_update ========================







//---------------- FOR PROVIDING REAL DATE-STRING from current GMT, for span-time-section------------
Current_date_string: function (){ 
    var arr = [];
    arr[0] = this.current_uni_gmt[0];
    arr[1] = this.current_uni_gmt[1];
    arr[2] = this.current_uni_gmt[2];
    arr[3] = this.current_uni_gmt[3];
  var min = arr[3];
    if ((min + this.current_gmt *60) < 0){
    arr[3] = min + this.current_gmt *60 + 1440;
    arr[0]--; 
    }
    if (((min + this.current_gmt *60) >= 0) && ((min - this.current_gmt *60)<1440)){
    arr[3]= min +  this.current_gmt *60;
    }
    if ((min +  this.current_gmt *60) >= 1440){
    arr[3] = min +  this.current_gmt *60 - (((min +  this.current_gmt *60) >= 1440) ? 1440 : 0); 
    arr[0]++; 
    }

    //--order of day-month
    if ((arr[2] % 4 == 0) && (arr[1] == 2) && (arr[0] > 29)) {
    arr[0] = arr[0] - 29;
    arr[1]++;
    }
    if ((arr[2] % 4 != 0) && (arr[1] == 2) && (arr[0] > 28)) {
    arr[0] = arr[0] - 28;
    arr[1]++;
    }
    if (((arr[1] == 4) || (arr[1] == 6) || (arr[1] == 9) || (arr[1] == 11)) && (arr[0] >30)){
    arr[0] = arr[0] - 30;
    arr[1]++;
    }
    if (((arr[1] == 1) || (arr[1] == 3) || (arr[1] == 5) || (arr[1] == 7) || (arr[1] == 8) || (arr[1] == 10) || (arr[1] == 12)) && (arr[0] >31)){
    arr[0] = arr[0] - 31;
    arr[1]++;
    }
    if (arr[0] <= 0){
      if ((arr[1] == 3) && (arr[2] % 4 == 0))  // march of special year
        arr[0] = 29 - arr[0];
      if ((arr[1] == 3) && (arr[2] % 4 != 0))  // march of usual year
        arr[0] = 28 - arr[0];
      if ((arr[1] == 5) || (arr[1] == 7) || (arr[1] == 10)|| (arr[1] == 12)) 
        arr[0] = 30 - arr[0];
      if ((arr[1] == 1) || (arr[1] == 2) || (arr[1] == 4) || (arr[1] == 6) || (arr[1] == 8) || (arr[1] == 9) || (arr[1] == 11)) 
        arr[0] = 31 - arr[0];
    arr[1] -- ;  
    }

    //--order of month - year
    if (arr[1] == 0){
    arr[2]--;
    arr[1] = 12;
    }
    if (arr[1] == 13){
    arr[2]++;
    arr[1] = 1;
    }

    var hour_min = Math.floor(arr[3]/60);
    function Plus_zero(a){
if (a.length == 1)
  a = '0'+a;
return a;
    }

    var stringer = 'Дата:   '+Plus_zero(String(arr[0]))+'.'+Plus_zero(String(arr[1]))+'.'+String(arr[2])+'   Время: '+Plus_zero(String(hour_min))+':'+Plus_zero(String(arr[3]-hour_min*60))+' UTC+'+this.current_gmt;
    return stringer;
},   //======================end of Current_date_string =====================




// updating system depending on select value
Selector_check : function(){
this.selector = Sel.value;
this.Current_update();
},



//======================== press 'up' button ===============================
Go_up : function (){
  if (ViewH.Left_Right == 0){
    for (var i=0; i<=3; i++)
      this.current_uni_gmt[i]=this.current_uni_gmt_up[i]; //define current like next
    this.Current_update(); //refresh under-buttons time
    var now_request = this.GMT_uni_to_Request(this.current_uni_gmt);  // make request
    this.arr_current = this.Custom_arr(this.current_uni_gmt[3],this.days[now_request[0]],this.days[now_request[1]]); //'curent' time longitudes
    console.log(this.arr_current);
    console.log(this.current_uni_gmt);
console.log(this.GMT_uni_to_Request(this.current_uni_gmt));
ViewH.Text_to_zero (); // current(in fact-previous) text of btns to zero
this.Analyse_venus();
this.Analyse_angle();
    ViewH.Time_text = ModelH.Current_date_string();
    ViewH.Left_Right = 1;
    ViewH.ViewUpdate();
 }
}, //========================= end of Go_up ====================================




//======================== press 'down' button ===============================
Go_down : function (){
  if (ViewH.Left_Right == 0){
    for (var i=0; i<=3; i++)
      this.current_uni_gmt[i]=this.current_uni_gmt_down[i]; //define current like next
    this.Current_update(); //refresh under-buttons time
    var now_request = this.GMT_uni_to_Request(this.current_uni_gmt);  // make request
    this.arr_current = this.Custom_arr(this.current_uni_gmt[3],this.days[now_request[0]],this.days[now_request[1]]); //'curent' time longitudes
    console.log(this.arr_current);
    console.log(this.current_uni_gmt);
console.log(this.GMT_uni_to_Request(this.current_uni_gmt));
ViewH.Text_to_zero (); // current(in fact-previous) text of btns to zero
this.Analyse_venus();
this.Analyse_angle();
    ViewH.Time_text = ModelH.Current_date_string();
    ViewH.Left_Right = -1;
    ViewH.ViewUpdate();
 }
}, //========================= end of Go_up ====================================




// ===================================LOGIC FOR SIGNS=============================================
// ===============================================================================================
Analyse_venus : function(){


//======== comments for signs =========
var txt_red_1 = '';
var txt_red_2 = '';
var txt_red_3 = '';
var txt_red_4 = '';
var txt_red_5 = ''; //
var txt_red_6 = '';
var txt_white_1 = '';
var txt_white_2 = '';
var txt_white_3 = '';
var txt_green_1 = '';
var txt_green_2 = '';
var txt_green_3 = '';
var txt_green_4 = '';  //
var txt_green_5 = '';
var txt_green_6 = '';


//======== values for signs (proportional to opacity) =========
var tr1 = 0; var tr2 = 0; var tr3 = 0; var tr4 = 0; var tr5 = 0; var tr6 = 0;
var tw1 = 0; var tw2 = 0; var tw3 = 0;
var tg1 = 0; var tg2 = 0; var tg3 = 0; var tg4 = 0; var tg5 = 0; var tg6 = 0;



// current longitudes for planets
var sun = this.arr_current[0];
var moo = this.arr_current[1];
var mer = this.arr_current[2];
var ven = this.arr_current[3];
var mar = this.arr_current[4];
var upi = this.arr_current[5];
var sat = this.arr_current[6];
var ura = this.arr_current[7];
var nep = this.arr_current[8];
var plu = this.arr_current[9];
var rah = this.arr_current[10];
var ket = this.arr_current[11];
var lil = this.arr_current[12];
var sel = this.arr_current[13];


//sex considered by changing max value in functions below

//venus-venus-good
var ve_ve_g = conj (this.nat_ven_orb, this.cur_ven_orb, this.arr_natal[3], ven, 5) + trin (this.nat_ven_orb-1, this.cur_ven_orb-1, this.arr_natal[3], ven, 5) + sixt (this.nat_ven_orb-1.5, this.cur_ven_orb-1.5, this.arr_natal[3], ven, 5);
if (ve_ve_g != 0){

  if (this.native_sex == 'М'){
  txt_green_4 += 'Отличное время для романтических свиданий. Успешный интим. Хороший день для зачатия.\n';
  tg4 += ve_ve_g;
  }

  if (this.native_sex == 'Ж'){
  txt_green_4 += 'Вы женственны и желанны. Отличное время для романтических свиданий. Успешный интим. Хороший день для зачатия.\n';
  tg4 += ve_ve_g;
  }

  txt_green_1 += 'Время, когда Вы ощущаете счастье и успех. Обаяние и привлекательность - это про Вас.\n'
  tg1 += ve_ve_g;
  txt_green_3 += 'Отличное время для завязывания новых любовных контактов, романтических знакомств.\n'
  tg3 += ve_ve_g;
  txt_green_6 += 'Подходящее время для торжеств, помолвки, объяснения, бракосочетания. \n'
  tg6 += ve_ve_g;
}//end of ve_ve_g

//venus-venus-bad
var ve_ve_b = oppo(this.nat_ven_orb, this.cur_ven_orb, this.arr_natal[3], ven, 5) + quadro(this.nat_ven_orb-1, this.cur_ven_orb-1, this.arr_natal[3], ven, 5);
if (ve_ve_b != 0){
  debugger;
  if (this.native_sex == 'М'){
  txt_red_5 += 'Романтические свидания лучше отложить. Неудачный интим. \n';
  tr5 += ve_ve_b;
  }
  if (this.native_sex == 'Ж'){
  txt_red_5 += 'Вы выглядите неважно. Романтические свидания лучше отложить. Неудачный интим. Время не благоприятно для зачатия.\n';
  tr5 += ve_ve_b;
  }
  txt_red_3 += 'Разбалансировка чувственной сферы, напрасные переживания.\n'
  tr3 += ve_ve_b;
  txt_red_6 += 'НЕподходящее время для торжеств, помолвки, объяснения, бракосочетания. \n'
  tr6 += ve_ve_b;
}//end of ve_ve_b




//nat_sun-cur_ven    - conjuction
var su_ve_c = conj (this.nat_sun_orb, this.cur_ven_orb, this.arr_natal[0], ven, 4);
if (su_ve_c != 0){
  txt_green_4 += 'Период благоприятен для общения с противоположным полом. Хорошее время для зачатия. \n';
  tg4 += su_ve_c;
  txt_green_3 += 'Возможна внезапная привязанность.\n';
  tg3 += su_ve_c*0.7;
  txt_green_1 += 'Подъем настроения, прилив жизненных сил, физическая привлекательность.\n';
  tg1 += su_ve_c;
  txt_white_1 += 'Повышение душевной и физической энергии.\n';
  tw1 += su_ve_c;
  txt_white_3 += 'Опасайтесь чрезмерной экстравагантности. Возможен перерасход бюджета, венерические заболевания.\n';
  tw3 += su_ve_c*0.5;  
}

//nat_sun-cur_ven    - sixt n trin
var su_ve_g = trin (this.nat_sun_orb-1, this.cur_ven_orb-1, this.arr_natal[0], ven, 4) + sixt (this.nat_sun_orb-2, this.cur_ven_orb-1.5, this.arr_natal[0], ven, 4);
if (su_ve_g != 0){
  txt_green_6 += 'Хорошее время для помолвки, объяснения, признания, бракосочетания, если нет противопоказаний. \n'
  tg6 += ve_ve_g;
  txt_green_4 += 'Успех у противоположного пола. Используйте это время для гармонизации отношений. Хороший период для зачатия. \n';
  tg4 += su_ve_g;
  txt_green_2 += 'Это время можно использовать для анализа своих привязанностей и чувств, Вы правильно оцениваете партнера и его к Вам отношение.\n';
  tg2 += su_ve_g;
  txt_green_1 += 'Воодушевление, обаяние и привлекательность.\n';
  tg1 += su_ve_g;
  txt_white_3 += 'Избегайте переедания и чрезмерных трат. Любовный авантюризм - склонность к измене.\n';
  tw3 += su_ve_g*0.7; 
}

//nat_sun-cur_ven    quadro
var su_ve_q =  quadro(this.nat_sun_orb-1, this.cur_ven_orb-1, this.arr_natal[0], ven, 4);
if (su_ve_q != 0){
  if (this.native_sex == 'М'){
  txt_red_5 += 'Возможны сексуальные неудачи и разочарования. Эгоизм. \n';
  tr5 += su_ve_q;
  }
  if (this.native_sex == 'Ж'){
  txt_red_5 += 'Интим не приносит удовлетворения. Период очень неблагоприятен для зачатия.\n';
  tr5 += su_ve_q;
  }
  txt_red_2 += 'Уменьшение внешней привлекательности, деспотизм, плохое настроение.\n'
  tr2 += su_ve_q;
  txt_red_1 += 'Ваши текущие взаимоотношения могут серьезно пострадать, из-за Вашего эгоизма и погони за удовольствиями. \n'
  tr1 += su_ve_q;
  txt_white_3 += 'Вы склонны незаслуженно требовать внимание и восхищение.\n';
  tw3 += su_ve_q*0.7; 
}

//nat_sun-cur_ven    oppo
var su_ve_o = oppo(this.nat_sun_orb, this.cur_ven_orb, this.arr_natal[0], ven, 4);
if (su_ve_o != 0){
  debugger;
  if (this.native_sex == 'М'){
  txt_red_5 += 'Вы не ощущаете уверенности в себе. Возможны сексуальные неудачи. \n';
  tr5 += su_ve_o;
  }
  if (this.native_sex == 'Ж'){
  txt_red_5 += 'Интим не приносит удовлетворения. Возможна нежелательная беременность.\n';
  tr5 += su_ve_o;
  }
  txt_red_3 += 'Перепады настроения.\n'
  tr3 += su_ve_o;
  txt_red_1 += 'Ваши текущие взаимоотношения могут серьезно пострадать, из-за Вашего эгоизма. \n'
  tr1 += su_ve_o;
  txt_red_4 += 'Возможны серьезные разногласия с партнером, скандалы.\n'
  tr4 += su_ve_o;
  txt_white_2 += 'Связи, возникающие в это время, как правило, неглубоки и быстротечны.\n';
  tw2 += su_ve_o*0.7; 
}









// assign of comments  //------------------//here could be logic in case of opposite meanings or values
ViewH.Red1_txt[1] = txt_red_1;
ViewH.Red2_txt[1] = txt_red_2;
ViewH.Red3_txt[1] = txt_red_3;
ViewH.Red4_txt[1] = txt_red_4;
ViewH.Red5_txt[1] = txt_red_5;
ViewH.Red6_txt[1] = txt_red_6;
ViewH.White1_txt[1] = txt_white_1;
ViewH.White2_txt[1] = txt_white_2;
ViewH.White3_txt[1] = txt_white_3;
ViewH.Green1_txt[1] = txt_green_1;
ViewH.Green2_txt[1] = txt_green_2;
ViewH.Green3_txt[1] = txt_green_3;
ViewH.Green4_txt[1] = txt_green_4;
ViewH.Green5_txt[1] = txt_green_5;
ViewH.Green6_txt[1] = txt_green_6;
//------------------//here could be logic in case of opposite meanings or values
ViewH.Red1_txt[0] = tr1;
ViewH.Red2_txt[0] = tr2;
ViewH.Red3_txt[0] = tr3;
ViewH.Red4_txt[0] = tr4;
ViewH.Red5_txt[0] = tr5;
ViewH.Red6_txt[0] = tr6;
ViewH.White1_txt[0] = tw1;
ViewH.White2_txt[0] = tw2;
ViewH.White3_txt[0] = tw3;
ViewH.Green1_txt[0] = tg1;
ViewH.Green2_txt[0] = tg2;
ViewH.Green3_txt[0] = tg3;
ViewH.Green4_txt[0] = tg4;
ViewH.Green5_txt[0] = tg5;
ViewH.Green6_txt[0] = tg6;



ViewH.Opacity_update();





function conj (nat_orb, cur_orb, nat_lon, cur_lon, max){  // max can have negative value in some cases
  var def = Math.abs(nat_lon - cur_lon);
  var orb = nat_orb + cur_orb; // orb of 2 planet, all orb.
  var res;
  if(0 <= def && def<= orb) {   
    res = max * (1-(def-0)/orb);
    return res;
  }// end of IF
  if((360 - orb) <= def && def <= 360){
    res = max * (1-(360-def)/orb);
    return res;
  }//end of IF
  else return 0;
} // end of conj


function trin (nat_orb, cur_orb, nat_lon, cur_lon, max){  //orb=original-1 - for trin
  var def = Math.abs(nat_lon - cur_lon);
  var orb = nat_orb + cur_orb; // orb of 2 planet, all orb.
  var res;
  if(120 <= def && def<= (120 + orb)) {   
    res = max * (1-(def-120)/orb);
    return res;
  }// end of IF
  if((120 - orb) <= def && def < 120){
    res = max * (1-(120-def)/orb);
    return res;
  }//end of IF
  if(240 <= def && def<= (240 + orb)) {   
    res = max * (1-(def-240)/orb);
    return res;
  }// end of IF
  if((240 - orb) <= def && def < 240){
    res = max * (1-(240-def)/orb);
    return res;
  }//end of IF
  else return 0;
} //end of trin


function sixt (nat_orb, cur_orb, nat_lon, cur_lon, max){  //orb=original-2(1.5) - for sixteele
  var def = Math.abs(nat_lon - cur_lon);
  var orb = nat_orb + cur_orb; // orb of 2 planet, all orb.
  var res;
  if(60 <= def && def<= (60 + orb)) {   
    res = max * (1-(def-60)/orb);
    return res;
  }// end of IF
  if((60 - orb) <= def && def < 60){
    res = max * (1-(60-def)/orb);
    return res;
  }//end of IF
  if(300 <= def && def<= (300 + orb)) {   
    res = max * (1-(def-300)/orb);
    return res;
  }// end of IF
  if((300 - orb) <= def && def < 300){
    res = max * (1-(300-def)/orb);
    return res;
  }//end of IF
  else return 0;
} //end of sixt


function oppo (nat_orb, cur_orb, nat_lon, cur_lon, max){ //orb = original
  var def = Math.abs(nat_lon - cur_lon);
  var orb = nat_orb + cur_orb; // orb of 2 planet, all orb.
  var res;
  if(180 <= def && def<= (180 + orb)) {   
    res = max * (1-(def-180)/orb);
    return res;
  }// end of IF
  if((180 - orb) <= def && def < 180){
    res = max * (1-(180-def)/orb);
    return res;
  }//end of IF
  else return 0;
} //end of oppo


function quadro (nat_orb, cur_orb, nat_lon, cur_lon, max){  //orb = original-1
  var def = Math.abs(nat_lon - cur_lon);
  var orb = nat_orb + cur_orb; // orb of 2 planet, all orb.
  var res;
  if(90 <= def && def<= (90 + orb)) {   
    res = max * (1-(def-90)/orb);
    return res;
  }// end of IF
  if((90 - orb) <= def && def < 90){
    res = max * (1-(90-def)/orb);
    return res;
  }//end of IF
  if(270 <= def && def<= (270 + orb)) {   
    res = max * (1-(def-270)/orb);
    return res;
  }// end of IF
  if((270 - orb) <= def && def < 270){
    res = max * (1-(270-def)/orb);
    return res;
  }//end of IF
  else return 0;
} //end of quadro






//Analyse_and_show
//arr_current : [], //current longitudes
//arr_natal : [], //current longitudes

        //CONTINUED.......

}, //============================================== end of Analyse_venus











Analyse_angle : function () {

var arr_nat = this.arr_natal;     //i
var arr_cur = this.arr_current;   //j
var result = 0;

var pl; // koef to plus
var mi; // koef to min



function plus (nat,cur){
 // debugger;
var def = Math.abs(nat - cur);
if( (0 <= def && def<= 1.5) || (59 <= def && def<= 61) ||  ( 119  <= def && def<= 121 ) || (239<= def && def<= 241 ) || ( 299<= def && def<=301) || (358.5 <= def && def<= 360) ) 
  return 1.5;   // super orb 1.5-1deg
if( (1.5 < def && def<= 3) || (58 <= def && def< 59) || (61 < def && def<=62) ||  ( 117.5 <= def && def< 119 ) || ( 121 < def && def <= 122.5 ) || (237.5<= def && def< 239 ) || ( 241< def && def<=242.5) || ( 298<= def && def<299) || ( 301< def && def<=302) || (357 <= def && def< 358.5) )
  return 1;   // midle orb to 3-2 deg
if( (3 < def && def<= 4) || (57 <= def && def< 58) || (62 < def && def<=63) ||  ( 116.5 <= def && def< 117.5 ) || ( 122.5 < def && def <= 123.5 ) || (236.5<= def && def< 237.5 ) || ( 242.5< def && def<=243.5) || ( 297<= def && def<298) || ( 302< def && def<=303) || (356 <= def && def< 357) )
  return 0.5; 
else return 0;
}  // end of function plus

//maibe it is good idea to consider conjumption as anoter groop with it's own logic!+++!+++!+++!+++!+++!

function minus (na,cu){
var de = Math.abs(na - cu);
if( (89.5 <= de && de<= 90.5) || (179.5 <= de && de<= 180.5) || ( 269.5  <= de && de<= 270.5 )) 
  return -2.2; //-super mega orb
if( (88.5 <= de && de< 89.5) || (90.5 < de && de<= 91.5) || ( 178.5  <= de && de < 179.5 ) || ( 180.5  < de && de<= 181.5 ) || ( 268.5  <= de && de< 269.5 ) || ( 270.5  < de && de<= 271.5 )) 
  return -1.7; //-super orb
if( (87.5 <= de && de< 88.5) || (91.5 < de && de<= 92.5) || ( 177.5  <= de && de < 178.5 ) || ( 181.5  < de && de<= 182.5 ) || ( 267.5  <= de && de< 268.5 ) || ( 271.5  < de && de<= 272.5 )) 
  return -1.2; // orb
if( (86.5 <= de && de< 87.5) || (92.5 < de && de<= 93.5) || ( 176.5  <= de && de < 177.5 ) || ( 182.5  < de && de<= 183.5 ) || ( 266.5  <= de && de< 267.5 ) || ( 272.5  < de && de<= 273.5 )) 
  return -0.7; // mini-orb
else return 0;
} // end of function minus








for (var i = 0; i<arr_nat.length; i++){
  for (var j = 0; j<arr_nat.length; j++){
    pl=1; mi=1;

    if ((i==3) || (j==3)){  //venus
      pl+=9; mi+=9;
    }  


    if (((i==0) || (j==0)) && (this.native_sex == 'М')){  // sun
      pl+=3; mi+=5;
    } 
    if (((i==0) || (j==0)) && (this.native_sex == 'Ж')){  // sun
      pl+=4; mi+=5;
    } 


    if (((i==4) || (j==4)) && (this.native_sex == 'М')){  // mars
      pl+=3; mi+=5;
    } 
    if (((i==4) || (j==4)) && (this.native_sex == 'Ж')){  // mars
      pl+=4; mi+=5;
    } 



    if (((i==1) || (j==1)) && (this.native_sex == 'Ж')){
      pl+=3; mi+=3;
    } 
    if (((i==1) || (j==1)) && (this.native_sex == 'М')){   //moon
      pl+=4; mi+=3;
    } 
    if ((i==2) || (j==2)){  //mer
      pl+=3; mi+=4;
    }  
    if ((i==5) || (j==5)){  //upi
      pl+=4; mi+=4;
    }  
    if ((i==6) || (j==6)){ //sat
      pl+=3; mi+=5;
    }  
    if ((i==7) || (j==7)){ //ur
      pl+=2; mi+=4;
    }  
    if ((i==8) || (j==8)){ //nep
      pl+=3; mi+=3;
    } 
    if ((i==9) || (j==9)){ //plu
      pl+=2; mi+=3;
    } 
    if ((i==10) || (j==10)){ //rah
      pl+=2; mi+=2;
    } 
    if ((i==12) || (j==12)){ //lil
      pl+=0; mi+=2;
    } 
    if ((i==12) || (j==12)){ //sel
      pl+=2; mi+=0;
    } 



    result += pl * plus(arr_nat[i],arr_cur[j]) + mi * minus(arr_nat[i],arr_cur[j]);



  }    //j-for

}    //i-for

console.log(result);

if (result >= 90){
ViewH.Arrow_angle = 90;
console.log(1);
}

if (result <= -90){
ViewH.Arrow_angle = -90;
console.log(2);
}

if ((-90 < result) && (result< 90)){
ViewH.Arrow_angle = result;
console.log(3);
}
},




} // ============================================================== end of ModelH