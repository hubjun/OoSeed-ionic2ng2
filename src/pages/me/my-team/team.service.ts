/**
 * Created by allenou on 2017/4/8.
 */
import { Injectable, EventEmitter } from '@angular/core';
import { HttpService } from '../../../providers/HttpService';
import { ToolsService } from '../../../providers/ToolsService';



@Injectable()
export class TeamService {
    private TEAM_TYPE_URL = '/dict/organization/type';
    private TEAM_BASIC_INFO_URL = '/team/ball';
    private TEAM_PLAYER_URL = '/team/players'
    private Match_Url = '/matchs/ball'
    private Match_Result_Url = '/general/match/sum'
    private PLAYER_DETAIL_URL = '/team/player'
    private USER_INFO_URL = '/user/_guest/userInfo'
    private FOLLOW_URL = '/user/_guest/findFollow'
    private FANS_URL = '/user/_guest/findFans'
    private MATCH_DETAIL_URL = '/team/match'
    private EXPENSE_TYPE_URL = '/dict/expense/type'
    private MATCH_FORMAT_URL = '/dict/match/formart'
    private TEAM_CLOTHER_COLOR_URL = '/dict/jersey/color/football'


    public filterTypes: EventEmitter<any>;
    public filterResults: EventEmitter<any>;
    constructor(
        private httpservice: HttpService,
        private toolsService: ToolsService
    ) {

    }
    //获取球队类型
    getTeamType() {
        let url = this.TEAM_TYPE_URL;
        return this.httpservice.get(url).map(res => res.json());
    }
    //获取球队基本信息
    getTeamBasicInfo(obj) {
        let url = this.TEAM_BASIC_INFO_URL;
        let uri = this.toolsService.param(obj);
        return this.httpservice.get(`${url}?${uri}`).map(res => res.json());
    }
    //获取球队赛程
    getTeamMatch(obj) {
        let url = this.Match_Url;
        let uri = this.toolsService.params(obj);
        return this.httpservice.get(`${url}?${uri}`).map(res => res.json());
    }
    //获取球队战绩
    getTeamMatchResult(obj) {
        let url = this.Match_Result_Url;
        let uri = this.toolsService.param(obj);
        return this.httpservice.get(`${url}?${uri}`).map(res => res.json());
    }
    //获取球队球员列表
    getTeamPlayer(obj) {
        let url = this.TEAM_PLAYER_URL;
        let uri = this.toolsService.param(obj);
        return this.httpservice.get(`${url}?${uri}`).map(res => res.json());
    }
    //获取球队球员详情
    getTeamPlayerDetail(obj) {
        let url = this.PLAYER_DETAIL_URL;
        let uri = this.toolsService.param(obj);
        return this.httpservice.get(`${url}?${uri}`).map(res => res.json());
    }
    //获取用户信息
    getUserInfo(obj) {
        let url = this.USER_INFO_URL;
        let uri = this.toolsService.param(obj);
        return this.httpservice.get(`${url}?${uri}`).map(res => res.json());
    }
    // //获取球队关注信息
    // getFollow(obj) {
    //     let url = this.FOLLOW_URL;
    //     let uri = this.toolsService.param(obj);
    //     return this.httpservice.get(`${url}?${uri}`).map(res => res.json());
    // }
    // //获取用户粉丝信息
    // getFans(obj) {
    //     let url = this.FANS_URL;
    //     let uri = this.toolsService.param(obj);
    //     return this.httpservice.get(`${url}?${uri}`).map(res => res.json());
    // }
    //获取球队比赛详情
    getMatchDetail(obj) {
        let url = this.MATCH_DETAIL_URL;
        let uri = this.toolsService.param(obj);
        return this.httpservice.get(`${url}?${uri}`).map(res => res.json());
    }
    //获取费用类型
    getExpenseType(obj) {
        let url = this.EXPENSE_TYPE_URL;
        let uri = this.toolsService.param(obj);
        return this.httpservice.get(`${url}?${uri}`).map(res => res.json());
    }
    //获取赛制类型
    getMatchFormat(obj) {
        let url = this.MATCH_FORMAT_URL;
        let uri = this.toolsService.param(obj);
        return this.httpservice.get(`${url}?${uri}`).map(res => res.json());
    }
    //获取球衣颜色类型
    getClotherColor(obj) {
        let url = this.TEAM_CLOTHER_COLOR_URL;
        let uri = this.toolsService.param(obj);
        return this.httpservice.get(`${url}?${uri}`).map(res => res.json());
    }
}
