'use strict';

/**
 * 内置路由：获取接口字段列表
 * Created by yinfxs on 2017/4/19.
 */

const serve = require('../index');

module.exports = async (ctx) => {
    const _query = ctx.query;
    const _cookies = ctx.cookies;
    const _body = ctx.request.body;
    const _reponse = { data: {}, errmsg: null, errcode: null };

    const userid = _cookies.get('IBIRD_USERID') || _cookies.get('IBIRD_UNIONID') || _query.userid || _body.userid;
    const unionid = userid || _query.unionid || _body.unionid;
    const key = _query.key || _body.key;

    Object.assign(_reponse, { data: serve.get(key, unionid) });

    ctx.body = _reponse;
};