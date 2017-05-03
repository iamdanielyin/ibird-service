'use strict';

/**
 * 主模块
 * Created by yinfxs on 2017/4/7.
 */

const raml = require('ibird-raml');
const app = {};

module.exports = app;

/**
 * 根据ibird的配置对象生成的服务接口列表
 * @param config
 */
app.services = (config) => {
    const apis = {};
    raml.modelApis(apis, config);
    raml.routeApis(apis, config);

    let result = [];
    for (const uri in apis) {
        const obj = apis[uri];
        if (!uri || typeof obj !== 'object') continue;
        result = result.concat(methods(config, uri, obj));
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
    const result = [];

    for (const method in obj) {
        if (!method) continue;
        const conf = obj[method];
        const _id = `${uri}|${method.toUpperCase()}`;
        const object = {
            _id: _id,
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
        result.push(object);
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