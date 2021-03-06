import { message } from 'antd';


let token = 'online_id'; //请求用户唯一识别存储

export const tokenSet = (value) => {
  token = value
}

export const tokenGet = () => {
  return token
}


export const json = (response) => response.json();


export const status = (response) => {
  console.log(response)
  if (response.status >= 200 && response.status < 300) {
    return response
  }

  const err = {
    type: 0, //0表示需要中断程序的异常，1表示可修复异常发出一个action
    action: '', //表示要执行的action
    payload: null, //action带的参数,
    msg: '您的网络有异常！', //异常原因，提示语
  }
  throw new Error(JSON.stringify(err))
  //throw new Error(response.statusText)
}
/*
 * 不需要登陆即可请求的接口
 */
export const analy = (response) => Promise.resolve(response).then(status).then(json).then(resultAny)


/*
 * 解析返回code,纯数组或对象
 */
export const resultAny = (datas) => {

  console.log(JSON.stringify(datas)) //数据打印
  datas.result = datas.result ? datas.result : {}
  if (datas.code === 200) {
    if (Object.getOwnPropertyNames(datas.result).length === 1 && datas.result.list && Array.isArray(datas.result.list)) {
      //返回数据里面仅有一个属性，属性名为list，且对应值类型为Array时返回该list
      return datas.result.list
    } else {
      return Object.assign({}, {msg: datas.message}, datas.result )
    }
  } else {
    if (datas.message) {
      message.error(datas.message, )
    }
    return undefined
  }
}

/*
 * 根据接口需要判断是否登陆状态
 */
export const onanaly = (response) => Promise.resolve(response).then(status).then(json).then(
  (dp) => {
    console.log('登录状态失效')
    if (!dp.status) {
      const err = {
        type: 1, //0表示需要中断程序的异常，1表示可修复异常发出一个action
        action: 'main/offLine', //表示要执行的action
        payload: null, //action带的参数,
        msg: '', //异常原因，提示语
      }

      throw new Error(JSON.stringify(err))
      return undefined
    } else{
      return dp;
    }
  }
).then(resultAny);


/**
 * post method  带token
 * Requests  params, returning a common request config.
 *
 * @param  {object} params  the method wangt to post
 *
 */
export const postModel = ( params = {} ) => {
  return {
    method: 'post',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      Object.assign( {}, { token }, {datas: params})
    )
  }
}

/**
 * post method  不带token
 * Requests  params, returning a common request config.
 *
 * @param  {object} params  the method wangt to post
 *
 */
export const postModelTwo = ( params ) => {

  console.log('net model data:')
  console.log(data.state.total)

  return {
    method: 'post',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(
      Object.assign(params)
    )
  }
}

/*
 * get method 不带token
 */
export const getModel = () =>{
  return{
    method: 'get',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
}

/*
 * put method
 */
export const putModel = ( params ) => {
  return {
    method: 'put',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(
      Object.assign(params)
    )
  }
}

/*
 * delete method
 */
export const deleteModel = ( params ) => {
  return {
    method: 'delete',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(
      Object.assign(params)
    )
  }
}

/*
 * patch method
 */
export const patchModel = ( params ) => {
  return {
    method: 'PATCH',
    credentials: 'include',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(
      Object.assign(params)
    )
  }
}

/*
 * restful url 拼接
 */
export const restful = (url, obj) => {
  Object.keys(obj).forEach(function (key) {
    url = url.replace(new RegExp('{'+key+'}', 'g'), obj[key]);
  });
  return url;
}
