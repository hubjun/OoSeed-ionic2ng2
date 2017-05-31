/**
 * Created by baoww on 2017/4/6.
 * Modifyed by allenou on 2017/4/7
 */
import { Component, Input, Output, ElementRef, Renderer, ViewChild } from '@angular/core';
import { LocalService } from '../../local.service';
import { EventEmitter } from '@angular/common/src/facade/async';
import { Events } from 'ionic-angular';
import { Subscription } from "rxjs";
import { LocalPage } from '../../local';
import { ToolsService } from '../../../../providers/ToolsService';
import { StorageService } from '../../../../providers/StorageService';
@Component({
    selector: 'local-filter',
    templateUrl: 'local-filter.component.html'
})

export class LocalFilterComponent {
    private subscription: Subscription = new Subscription();
    private open: boolean = false;
    private currentFilter: string;


    private filterType = {
        sportType: [],
        rangType: [],
        sortType: []
    }

    private filterResult = {
        sportType: {
            text: '',
            index: 0
        },
        rangType: {
            text: '',
            index: 0
        },
        sortType: {
            text: '',
            index: 0
        }
    }
    private cacheFilterType = {
        sportType: [],
        userType: []
    }
    private cacheFilterResult = {
        sportType: {
            id: 0,
            index: 0,
            text: '',
        },
        rangType: {
            id: 0,
            index: 0,
            text: '',
        },
        userType: {
            id: 0,
            index: 0,
            text: '',
        }
    }
    public currentCityName: string;
    public currentCityObj: any;

    // @ViewChild('filter') filterElement: ElementRef;
    @Output() onChangeAreaText = new EventEmitter<string>();
    @Output() onUseCacheFilterResult = new EventEmitter<string>();

    private initInfo = {
        headerHeight: 0,
        filterHeight: 0,
        filterOffsetTop: 0
    }
    //默认排序规则

    public finalFilterResult = {
        sportType: 1,
        rangType: 1,

        sortType: 1,
        longitude: this.localService.coor.long,
        latitude: this.localService.coor.lat,
        areaId: this.localService.parentId
    }
    constructor(
        public localService: LocalService,
        private toolsService: ToolsService,
        private renderer: Renderer,
        public events: Events,
        private storageService: StorageService
    ) {
        this.initFilter();
        //自动定位
        this.localService.currentCityAreaAdCode.subscribe((postcode: number) => {
            this.getAllAreaByParentPostcode(postcode);
        })
    }

    ngOnInit() {
        this.getSportType();
        this.getInitInfo();
        this.getUserType();
        // this.listenScroll();
     
    }
    ngOnDestroy() {
        //取消订阅
        this.subscription.unsubscribe();
    }
    //初始化相应栏目排序规则
    initFilter() {
        this.localService.filterTypes.subscribe((filterTypes: any) => {
            let sportTypeResult, rangTypeResult, sortTypeResult;
            sportTypeResult = this.filterResult.sportType;
            rangTypeResult = this.filterResult.rangType;
            sortTypeResult = this.filterResult.sortType;
            //缓存排序结果
            let cacheSportTypeResult, cacheUserTypeResult, cacheRangTypeResult;
            cacheSportTypeResult = this.cacheFilterResult.sportType;
            cacheRangTypeResult = this.cacheFilterResult.rangType;
            cacheUserTypeResult = this.cacheFilterResult.userType;
            if (filterTypes.userType) {  //推荐个人IP栏目
                this.filterType.sportType = this.cacheFilterType.userType;
                if (cacheUserTypeResult.id === 0) {//未缓存
                    sportTypeResult.text = '全部';
                    sportTypeResult.index = 0;

                }

                else {//已缓存
                    sportTypeResult.text = cacheUserTypeResult.text;
                    sportTypeResult.index = cacheUserTypeResult.index;
                }

            } else {   //其它栏目
                this.filterType.sportType = this.cacheFilterType.sportType;
                // console.log(this.cacheFilterResult.sportType)
                if (cacheSportTypeResult.id === 0) {
                    sportTypeResult.text = '全部';
                    sportTypeResult.index = 0;
                }

                else {

                    sportTypeResult.text = cacheSportTypeResult.text;
                    sportTypeResult.index = cacheSportTypeResult.index;
                }

            }
            if (cacheRangTypeResult.id === 0) {
                rangTypeResult.text = '全城';
                rangTypeResult.index = 0;
            }

            else {
                rangTypeResult.text = cacheRangTypeResult.text;
                rangTypeResult.index = cacheRangTypeResult.index;
            }

            this.filterType.sortType = filterTypes.sortType;
            sortTypeResult.text = filterTypes.sortType[0].title;
            sortTypeResult.index = 0;
            // this.onChangeAreaText.emit(this.currentCityName);
        })
    }
    //根据 areaId 查询所在城市的所有区县（手动定位）
    getAreaByParentId(locateArr) {
        let parentId: number, areaId: number;

        let cityTitle: string = locateArr[4];//区县名
        let area = {
            "areaId": locateArr[2],
            "title": cityTitle
        }
        this.currentCityName = locateArr[5];
        if (locateArr[4] === undefined) {
            //顶级市区
            parentId = locateArr[2]

            Object.assign(area, {

                "id": 1,
                "title": '全城',
                "areaId": parentId
            })
        }
        else {
            //非顶级市区

            parentId = locateArr[3]
        }

        let params = {
            parentId: parentId
        }
        this.localService.getAreaByParentId(params).subscribe((res) => {

            if (res.result === '0') {

                let types: Array<any> = res.data;
                let all: Array<any> = []
                //非当前城市
                if (this.currentCityObj.areaId !== types[0].parentId) {
                    all = [{
                        "id": 1,
                        "title": "全城",
                        "areaId": parentId
                    }]
                }
                else {//当前城市
                    all = [{
                        "id": 2,
                        "title": "附近",
                        "areaId": parentId
                    }, {
                        "id": 1,
                        "title": "全城",
                        "areaId": parentId
                    }]
                }

                for (let type of all) {
                    types.unshift(type);
                }

                // console.log(types)
                let currentAreaIndex: number = 0;
                //选中区县高亮
                for (let i = 0; i < types.length; i++) {
                    if (locateArr[2] === types[i].areaId) {//区域id
                        currentAreaIndex = i;
                        break;
                    }

                }

                this.filterType.rangType = types;
                this.orderByRangType(area, currentAreaIndex);
            }
        })
    }
    //根据邮编查询所在城市的所有区县（自动定位）
    getAllAreaByParentPostcode(postcode: number) {
        let params = {
            parentPostCode: postcode
        }
        this.localService.getAreaByParentPostCode(params).subscribe((res) => {
            if (res.result === '0') {
                let types = res.data;
                //按areaId排序
                let sortAfterTypes = types.sort((before, after) => {
                    return before.areaId - after.areaId
                });
                let currentCity = sortAfterTypes[0];//地级市
                this.currentCityName = currentCity.title;
                this.onChangeAreaText.emit(currentCity.title);
                this.currentCityObj = currentCity;
                this.localService.currentCity = currentCity;//地级市
                this.localService.parentId = sortAfterTypes[0].areaId;
                this.finalFilterResult.areaId=sortAfterTypes[0].areaId
                this.localService.cacheOtherChannelFilterResult = this.finalFilterResult;
                this.localService.loadDataByParentId.emit(currentCity);
                // console.log( this.localService.currentCity )
                // this.storageService.setItem('LAST_POSITION', sortAfterTypes[0]);//存储位置，定位中时先加载上一次的位置的数据


                sortAfterTypes.shift() //删除地级市留下地级市下区域
                // console.log(sortAfterTypes[0])
                let all = [{
                    "id": 2,
                    "title": "附近",
                    "areaId": sortAfterTypes[0].parentId
                }, {
                    "id": 1,
                    "title": "全城",
                    "areaId": sortAfterTypes[0].parentId
                }]
                for (let defaultType of all) {
                    sortAfterTypes.unshift(defaultType);
                }

                this.filterType.rangType = sortAfterTypes;
            }
        })
    }
    //按运动类型排序
    orderBySportType(type: any, index: number) {
        this.hideFilter();

        let sportTypeResult = this.filterResult.sportType;
        let cacheUserTypeResult = this.cacheFilterResult.userType;
        let cacheSportTypeResult = this.cacheFilterResult.sportType;
        let filterResult = this.finalFilterResult;
        sportTypeResult.index = index;
        // console.log(type)
        if (type.ipCateId) {//按专业

            sportTypeResult.text = type.cateName;
            //缓存排序选项
            cacheUserTypeResult.id = type.ipCateId;
            cacheUserTypeResult.index = index;
            cacheUserTypeResult.text = type.cateName;

            Object.assign(filterResult, {
                "userTypeId": type.ipCateId
            })

            this.localService.cacheOtherChannelFilterResult = filterResult;
        }
        else {  //按球类

            filterResult.sportType = type.id
            sportTypeResult.text = type.title;
            cacheSportTypeResult.id = type.id;
            cacheSportTypeResult.index = index;
            cacheSportTypeResult.text = type.title;
            // console.log(filterResult)
            this.localService.cacheOtherChannelFilterResult = filterResult;
        }

        this.localService.filterResults.emit(filterResult);
    }
    //按区域排序
    orderByRangType(type: any, index: number) {
        let rangTypeResult = this.filterResult.rangType;
        let cacheRangTypeResult = this.cacheFilterResult.rangType
        let filterResult = this.finalFilterResult;
        let currentCityName = this.currentCityName;
        filterResult.areaId = type.areaId;

        rangTypeResult.index = index;
        rangTypeResult.text = type.title;
        if (type.id === 1) {
            filterResult.rangType = 1;
            cacheRangTypeResult.text = '全城';
            this.onChangeAreaText.emit(currentCityName);

        }
        else if (type.id === 2) {
            filterResult.rangType = 2;
            filterResult.areaId = null;
            cacheRangTypeResult.text = '附近';
            this.onChangeAreaText.emit(currentCityName);

        }
        else {
            filterResult.rangType = 3;
            this.onChangeAreaText.emit(type.title);

            cacheRangTypeResult.text = type.title;
        }
        if (this.open) {
            this.hideFilter();
        }

        cacheRangTypeResult.id = type.areaId;
        cacheRangTypeResult.index = index;
        this.localService.filterResults.emit(filterResult);

        this.localService.cacheOtherChannelFilterResult = filterResult;
        // console.log(filterResult)
    }
    //按运动类型排序
    orderBySortType(type: any, index: number) {
        this.hideFilter();

        let sortTypeResult = this.filterResult.sortType;
        sortTypeResult.index = index;
        sortTypeResult.text = type.title;
        this.finalFilterResult.sortType = type.id
        this.localService.filterResults.emit(this.finalFilterResult);
        this.localService.cacheOtherChannelFilterResult = this.finalFilterResult;
    }
    //查询所有球类
    getSportType() {
        let params = {
            lang: 'zh_cn'
        }
        this.subscription.add(
            this.localService.getSportType(params).subscribe((res) => {
                if (res.result === '0') {
                    let types = res.data.dicts;
                    let all = {
                        "id": 1,
                        "title": "全部"
                    }
                    types.unshift(all);

                    this.filterType.sportType = types;
                    this.cacheFilterType.sportType = types;
                }
            })
        )
    }
    //查询个人IP排序1规则
    getUserType() {
        this.subscription.add(
            this.localService.getauthCate().subscribe((res) => {
                let types = res.data;
                let all = {
                    "ipCateId": 1,
                    "cateName": "全部"
                }
                types.unshift(all);

                this.cacheFilterType.userType = types;
            })
        )
    }
    //打开过滤器
    openFilter(e) {
        this.currentFilter = e.target.getAttribute('data-type');
        this.open = true;
        this.createBottomMask();
        this.stopScroll();
        this.moveSroll();
    }

    //隐藏过滤器
    hideFilter() {
        this.open = false;
        this.currentFilter = '';
        let filter = document.getElementById('local-filter');
        let channels = document.getElementById('channels');
        let scrollContent = document.querySelector('.scroll-content');
        let bottomMask = document.querySelector('.bottom-mask');
        filter.style.marginTop = 0 + 'px';
        channels.style.marginTop = 0 + 'px';
        scrollContent.scrollTop = 0;
        bottomMask.setAttribute('style', 'height:0');
        this.canScroll();
        // filter.classList.remove('fixed-filter');
        // this.renderer.setElementStyle(this.filterElement.nativeElement, 'marginTop', '0');
    }
    //活动滚动条使得filter置顶
    moveSroll() {
        let filter = document.getElementById('local-filter');
        let scrollContent = document.querySelector('.scroll-content');
        let channels = document.getElementById('channels');
        let initInfo = this.initInfo;
        if (initInfo.filterOffsetTop !== initInfo.headerHeight) {
            // filter.style.marginTop = initInfo.headerHeight + 'px';
            scrollContent.scrollTop = initInfo.filterOffsetTop;
            channels.style.marginTop = initInfo.filterHeight + 'px';
        }
    }
    //获取初始化数据
    getInitInfo() {
        let initInfo = this.initInfo;
        let filter = document.getElementById('local-filter');
        initInfo.headerHeight = document.querySelector('#sportIp-header').clientHeight;
        initInfo.filterHeight = filter.clientHeight;
        initInfo.filterOffsetTop = filter.offsetTop;
    }
    //禁止滚动
    stopScroll() {
        let scrollContent = document.querySelector('.scroll-content');
        scrollContent.classList.add('stop-scroll');
    }
    //允许滚动
    canScroll() {
        let scrollContent = document.querySelector('.scroll-content');
        scrollContent.classList.remove('stop-scroll');
    }
    //监听滚动事件
    listenScroll() {
        let filter = document.getElementById('local-filter');
        let scrollContent = document.querySelector('.scroll-content');
        let channels = document.getElementById('channels');
        let headerHeight = document.querySelector('#sportIp-header').clientHeight;
        let relativePosition, movePosition;
        let filterHeight = filter.clientHeight;
        scrollContent.addEventListener('scroll', () => {
            movePosition = scrollContent.scrollTop;
            if (movePosition > relativePosition && movePosition >= filter.offsetTop) {//向下滑动
                if (!filter.className) {
                    filter.classList.add('fixed-filter');
                    filter.style.marginTop = headerHeight + 'px';
                    channels.style.marginTop = filterHeight + 'px';
                }
            }
            else {//向上滑动
                filter.classList.remove('fixed-filter');
                // filter.style.marginTop = 0 + 'px';
                channels.style.marginTop = 0 + 'px';
            }
            relativePosition = movePosition;
        });
    }
    //创建 mask
    createBottomMask() {
        let tabbar = document.querySelector('.tabbar');
        let tabbarHeight = tabbar.clientHeight;
        let haveBottomMask = document.querySelector('.bottom-mask');
        if (!haveBottomMask) {
            let bottomMask = document.createElement('div');
            bottomMask.classList.add('bottom-mask');
            tabbar.appendChild(bottomMask);
            bottomMask.setAttribute('style', `height:${tabbarHeight}px`);
            bottomMask.addEventListener('click', () => {
                this.hideFilter();
            })
        }
        else {
            haveBottomMask.setAttribute('style', `height:${tabbarHeight}px`);
            haveBottomMask.addEventListener('click', () => {
                this.hideFilter();
            })
        }
    }
}
