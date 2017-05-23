'use strict';

/**
 * 主模块
 * Created by yinfxs on 2017/4/7.
 */

const raml = require('ibird-raml');
const fieldsRoute = require('./route/fields');
const app = {};

module.exports = app;

const cache = { services: {}, users: {} };

/**
 * 接口初始化配置
 * @param obj 配置对象
 */
app.config = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    cache.services = obj;
};
/**
 * 用户接口初始化配置
 * @param obj 配置对象
 */
app.users = (obj) => {
    if (!obj || typeof obj !== 'object') return;
    Object.assign(cache.users, obj);
};

/**
 * 获取接口列表
 * @param key 接口编码
 * @param unionid
 */
app.get = (key, unionid) => {
    let api = null;
    if (unionid) {
        if (typeof cache.users !== 'object') return {};
        if (typeof cache.users[unionid] !== 'object') return {};
        api = cache.users[unionid][key];
    } else {
        if (typeof cache.services !== 'object') return {};
        api = cache.services[key];
    }
    if (typeof api !== 'object') return [];
    const query = api.queryParameters || [];
    const body = api.body || [];
    return query.concat(body);
};


/**
 * 根据ibird的配置对象生成的服务接口列表
 * @param config
 */
app.services = (config) => {
    const apis = {};
    raml.modelApis(apis, config);
    raml.routeApis(apis, config);

    const result = {};
    for (const uri in apis) {
        const obj = apis[uri];
        if (!uri || typeof obj !== 'object') continue;
        Object.assign(result, methods(config, uri, obj));
    }
    return result;
};

/**
 * 遍历每一个服务接口的不同请求方式
 * @param config
 * @param uri
 * @param obj
 * @returns {Array}
 */
const methods = (config, uri, obj) => {
    const types = raml.modelTypes(config);
    const result = {};

    for (const method in obj) {
        if (!method) continue;
        const conf = obj[method];
        const code = `${uri}|${method.toUpperCase()}`;
        const object = {
            code: code,
            uri: uri,
            method: method.toUpperCase(),
            displayName: conf.displayName,
            description: conf.description
        };
        const query = conf.queryParameters;
        const body = conf.body;
        if (query) {
            let properties = null;
            if (query.type) {
                properties = query.properties ? query.properties : (types[query.type] ? types[query.type].properties : properties);
            } else {
                properties = query;
            }
            object.queryParameters = app.fields(properties);
        }
        if (conf.body) {
            let properties = null;
            if (body.type) {
                properties = body.properties ? body.properties : (types[body.type] ? types[body.type].properties : properties);
            } else {
                properties = body;
            }
            object.body = app.fields(properties);
        }
        result[code] = object;
    }
    return result;
};

/**
 * 根据RAML的字段列表转换成服务接口的字段列表
 * @param fields
 * @returns {Array}
 */
app.fields = (fields) => {
    const result = [];
    if (!fields) return result;
    for (const key in fields) {
        const field = fields[key];
        field.code = key;
        result.push(field);
    }
    return result;
};

/**
 * 导出内置路由
 * @param app
 */
app.route = (router) => {
    router.get('/service/fields', fieldsRoute);
};