<template>
    <button type="button" @click="pdfBtn"
    class="inline-block px-6 py-3 mt-2 mb-2 font-bold text-center text-white rounded-lg text-xs bg-red-400">
    匯出PDF
</button>

<div id ="pdfDom" v-if="showDiv">
    <div class="px-3 flex text-x1">
        <p class = "pr-5">頭痛日誌3</p>
    </div>
    <div class ="p-3 flex">
        <table class="table-fixed border-separate w-full">
            <tr class="">
                <th class="bg-gray-500 text-white p-3">日期</th>
                <td class="border border-slate-300 bg-red-50" v-for="(item,key,index) in tableData" :key="key" :index="index">{{item.date}}</td>
            </tr>
            <tr class="1">
                <th class ="bg-gray-500 text-white p-3">月事</th>
                <td class ="border border-slate-300" v-for="(item,key,index) in tableData" :key="key" :index="index">{{item.q1}}</td>
            </tr>
            <tr class="">
                <th class ="bg-gray-500 text-white p-3">頭痛程度</th>
                <td class="border border-slate-300 bg-red-50" v-for="(item,key,index) in tableData" :key="key" :index="index">{{item.q2}}</td>
            </tr>
            <tr class="">
                <th class = "bg-gray-500 text-white p-3">頭痛持續時間/hr</th>
                <td class="border border-slate-300 bg-red-50" v-for="(item,key,index) in tableData" :key="key" :index="index">{{item.q3}}</td>
            </tr>
        </table>
    </div>
    </div>

    <div class="flex justify-center">
        <el-pagination
            :current-page="currentPage"
            :page-size="pageSize"
            :page-sizes="[100,200,300,400]"
            background
            layout=" prev , pager , next , totalm ,jumper"
            :total="totalData"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
        />
    </div>
</template>

<script>
import axiosInstance from '@/apis/axios';
import moment from 'moment';
import htmlToPdf from '@/utils/htmlToPdf';

export default ({
    components:{        
    },
    props:{},
    data(){
        return{
            showDiv: true,
            showDive: false,
            q11:"",
            q11start:"",
            q11end:"",
            q11totalMinute:"",
            q11totalDuration:"",
            q11totalHours:"",
            q12:"",
            q13:"",
            q14:"",
            q15:"",
            q16:"",
            q17:"",
            q18:"",
            q19:"",

            q21:"",
            q21start:"",
            q21end:"",
            q21totalMinute:"",
            q21totalDuration:"",
            q21totalHours:"",
            q22:"",
            q23:"",
            q24:"",
            q25:"",
            q26:"",
            q27:"",
            q28:"",
            q29:"",

            q31:"",
            q31start:"",
            q31end:"",
            q31totalMinute:"",
            q31totalDuration:"",
            q31totalHours:"",
            q32:"",
            q33:"",
            q34:"",
            q35:"",
            q36:"",
            q37:"",
            q38:"",
            q39:"",

            manyevents:[],
            tableData:[],
            totalData:0,
            currentPage:1,
            pageSize:10,
        };
    },

    methods:{
        //分頁
        handleCurrentChange(page){
            this.currentPage=page;
            //獲取當前頁
            let index = this.pageSize * (page-1);    
            //獲取數據總數
            let nums = this.pageSize * page;
            //容器
            let tables= [];
            for(let i = index; i < nums; i++){
                if(this.manyevents[i]){
                    tables.push(this.manyevents[i]);
                }
                this.tableData = tables;
            }
            console.log('page= ' + page);
            console.log('num ' +  nums);
            console.log('index='+index);
            console.log('tables= ');
            console.log(this.tableData);
        },
        //可選擇頁面數
        handleSizeChange(page_size){
            this.currentPage=1;
            this.pageSize=page_size;
            this.tableData = this.manyevents.filter((item, index)=>{
                return index < page_size;
            });
            console.log('page_size= '+ page_size);
        },
        //分鐘轉換小時
        minutes_to_hhmm(numberOfMinutes){
            let duration = moment.duration(numberOfMinutes , 'minutes');
            var hh = (duration.years()*(365*24))+(duration.months()*(30*24)) + (duration.days()*24)+(duration.hours());
            var mm = duration.minutes();
            return hh + ':' + mm;
        },

        //匯出PDF檔案
        pdfBtn(){
            htmlToPdf.getPdf('某個患者的頭痛日記');
        },
    },
    mounted(){
        const b ={};

        axiosInstance
            .get("/data")
            .then((res)=>{
                console.log(res);

                res.data.forEach(function (item, index, array){
                    b[item.diary_date] || (b[item.diary_date] =[]);
                    b[item.diary_date] && b[item.diary_date].push(item);
                    //console.log(item);
                });

                Object.entries(b).forEach(([key, value], index, array)=>{
                    console.log("-----")
                    console.log(key, value);
                    //跑3次 因為有3筆日記記錄
                    //依序將每筆日記記錄都用Object'oneevent'包起來

                    value.forEach((item, index, array)=>{
                        //console.log(item);
                        if(index < 9){
                            switch (item.question_id) {
                                case "1":
                                    this.q11 = item.ans_choice_text;
                                    const splittime = this.q11.split(",");
                                    this.q11start = splittime[0];
                                    this.q11end = splittime[1];
                                    this.q11totalMinute = moment(this.q11end,"HH:mm").diff(moment(this.q11start, 'HH:mm'));
                                    this.q11totalDuration = moment.duration(this.q11totalMinute) / (1000*60);
                                    this.q11totalHour = this.minutes_to_hhmm(this.q11totalDuration);

                                    break;
                                case "2":
                                    this.q12 = item.ans_choice_text;
                                    break;
                                case "3":
                                    this.q13 = item.ans_choice_text;
                                    break;
                                case "4":
                                    this.q14 = item.ans_choice_text;
                                    break;
                                case "5":
                                    this.q15 = item.ans_choice_text;
                                    break;
                                case "6":
                                    this.q16 = item.ans_choice_text;
                                    break;
                                case "7":
                                    this.q17 = item.ans_choice_text;
                                    break;
                                case "8":
                                    this.q18 = item.ans_choice_text;
                                    break;
                                case "9":
                                    this.q19 = item.ans_choice_text;
                                    break;
                            }
                        }else if(index > 8 && index <18 ){
                            switch (item.question_id){ 
                                case '1':
                                    this.q21 = item.ans_choice_text;
                                    const splittime = this.q21.split(',');
                                    this.q21start = splittime[0];
                                    this.q21end = splittime[1];
                                    this.q21totalMinute = moment(this.q21end,'HH:mm').diff(moment(this.q21start,'HH:mm'));
                                    this.q21totalDuration = moment.duration(this.q21totalMinute)/(1000*60);
                                    this.q21totalHours = this.minutes_to_hhmm(this.q21totalDuration);
                                    break; 
                                case '2':
                                    this.q22 = item.ans_choice_text;
                                    break;
                                case '3':
                                    this.q23 = item.ans_choice_text;
                                    break;
                                case '4':
                                    this.q24 = item.ans_choice_text;
                                    break;
                                case '5':
                                    this.q25 = item.ans_choice_text;
                                    break;
                                case '6':
                                    this.q26 = item.ans_choice_text;
                                    break;
                                case '7':
                                    this.q27 = item.ans_choice_text;
                                    break;
                                case '8':
                                    this.q28 = item.ans_choice_text;
                                    break;
                                case '9':
                                    this.q29 = item.ans_choice_text;
                                    break;
                            }
                        }
                        else if(index > 17 && index < 27){
                            switch(item.question_id){
                                case '1':
                                    this.q31 = item.ans_choice_text;
                                    const splittime = this.q31.split(',');
                                    this.q31start = splittime[0];
                                    this.q31end = splittime[1];
                                    this.q31totalMinute = moment(this.q31end,"HH:mm").diff(moment(this.q31start, 'HH:mm'));
                                    this.q31totalDuration = moment.duration(this.q31totalMinute)/(1000*60);
                                    this.q31totalHours = this.minutes_to_hhmm(this.q31totalDuration);
                                    break;
                                case '2':
                                    this.q32 = item.ans_choice_text;
                                    break;
                                case '3':
                                    this.q33 = item.ans_choice_text
                                    break;
                                case '4':
                                    this.q34 = item.ans_choice_text
                                    break;
                                case '5':
                                    this.q35 = item.ans_choice_text
                                    break;
                                case '6':
                                    this.q36 = item.ans_choice_text
                                    break;
                                case '7':
                                    this.q37 = item.ans_choice_text
                                    break;
                                case '8':
                                    this.q38 = item.ans_choice_text
                                    break;
                                case '9':
                                    this.q39 = item.ans_choice_text
                                    break;
                            }
                        }
                    });
                    const oneevent ={
                        date: key,
                        q1: this.q11start !="" ? this.q11totalHour : "",
                        q2: this.q12,
                        q3: this.q13,
                        q4: this.q14,
                        q5: this.q15,
                        q6: this.q16,
                        q7: this.q17,
                        q8: this.q18,
                        q9: this.q19,                        
                    };

                    const twoevent ={
                        date: key,
                        q1: this.q21start !="" ? this.q21totalHours : "",
                        q2: this.q22,
                        q3: this.q23,
                        q4: this.q24,
                        q5: this.q25,
                        q6: this.q26,
                        q7: this.q27,
                        q8: this.q28,
                        q9: this.q29,      
                    };

                    const threeevent ={
                        data: key,
                        q1: this.q31start !="" ? this.q31totalHours :"",
                        q2: this.q32,
                        q3: this.q33,
                        q4: this.q34,
                        q5: this.q35,
                        q6: this.q36,
                        q7: this.q37,
                        q8: this.q38,
                        q9: this.q39,
                    };

                    this.manyevents.push(oneevent);
                    if(twoevent.q2 !== ''){
                        this.manyevents.push(twoevent);
                    }
                    if(threeevent.q2 !== ''){
                        this.manyevents.push(threeevent);
                    }
                    this.manyevents.sort(function(a,b){
                        return a.date > b.date ? 1 : -1
                    });
                    console.log(this.manyevents);
                    this.totalData = this.manyevents.length;

                    this.q11 ='';
                    this.q12 ='';
                    this.q13 ='';
                    this.q14 ='';
                    this.q15 ='';
                    this.q16 ='';
                    this.q17 ='';
                    this.q18 ='';
                    this.q19 ='';
                    this.q11start ='';
                    this.q11end ='';

                    this.q21 ='';
                    this.q22 ='';
                    this.q23 ='';
                    this.q24 ='';
                    this.q25 ='';
                    this.q26 ='';
                    this.q27 ='';
                    this.q28 ='';
                    this.q29 ='';
                    this.q21start ='';
                    this.q21end ='';

                    this.q31 ='';
                    this.q32 ='';
                    this.q33 ='';
                    this.q34 ='';
                    this.q35 ='';
                    this.q36 ='';
                    this.q37 ='';
                    this.q38 ='';
                    this.q39 ='';
                    this.q31start ='';
                    this.q31end ='';

                    //初始化頁面
                    this.totalData = this.manyevents.length;
                    this.currentPage =1;
                    this.pageSize=10;
                    this.tableData = this.manyevents.filter((item, index) =>{
                        return index < this.pageSize;
                    });
                });
            })
            .catch((err)=>{
                console.log(err.response);
            });
    },
})
</script>

<style>

</style>