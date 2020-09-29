/* eslint-disable */
var bridge = {
  default: this, // for typescript
  call: function(method, args, cb) {
      var ret = '';
      if (typeof args == 'function') {
          cb = args;
          args = {};
      }
      var arg = { data: args === undefined ? null : args }
      if (typeof cb == 'function') {
          var cbName = 'dscb' + window.dscb++;
          window[cbName] = cb;
          arg['_dscbstub'] = cbName;
      }
      arg = JSON.stringify(arg)

      //if in webview that dsBridge provided, call!
      if (window._dsbridge) {
          ret = _dsbridge.call(method, arg)
      } else if (window._dswk || navigator.userAgent.indexOf("_dsbridge") != -1) {
          ret = prompt("_dsbridge=" + method, arg);
      }

      return JSON.parse(ret || '{}').data
  },
  register: function(name, fun, asyn) {
      var q = asyn ? window._dsaf : window._dsf
      if (!window._dsInit) {
          window._dsInit = true;
          //notify native that js apis register successfully on next event loop
          setTimeout(function() {
              bridge.call("_dsb.dsinit");
          }, 0)
      }
      if (typeof fun == "object") {
          q._obs[name] = fun;
      } else {
          q[name] = fun
      }
  },
  registerAsyn: function(name, fun) {
      this.register(name, fun, true);
  },
  hasNativeMethod: function(name, type) {
      return this.call("_dsb.hasNativeMethod", { name: name, type: type || "all" });
  },
  disableJavascriptDialogBlock: function(disable) {
      this.call("_dsb.disableJavascriptDialogBlock", {
          disable: disable !== false
      })
  }
};


;
(function(w, doc) {
  //insert dsbridge
  if (window._dsf) {

  } else {
      var ob = {
          _dsf: {
              _obs: {}
          },
          _dsaf: {
              _obs: {}
          },
          dscb: 0,
          dsBridge: bridge,
          close: function() {
              bridge.call("_dsb.closePage")
          },
          _dshandleMessageFromNative: function(info) {
              var arg = JSON.parse(info.data);
              var ret = {
                  id: info.callbackId,
                  complete: true
              }
              var f = this._dsf[info.method];
              var af = this._dsaf[info.method]
              var callSyn = function(f, ob) {
                  ret.data = f.apply(ob, arg)
                  bridge.call("_dsb.returnValue", ret)
              }
              var callAsyn = function(f, ob) {
                  arg.push(function(data, complete) {
                      ret.data = data;
                      ret.complete = complete !== false;
                      bridge.call("_dsb.returnValue", ret)
                  })
                  f.apply(ob, arg)
              }
              if (f) {
                  callSyn(f, this._dsf);
              } else if (af) {
                  callAsyn(af, this._dsaf);
              } else {
                  //with namespace
                  var name = info.method.split('.');
                  if (name.length < 2) return;
                  var method = name.pop();
                  var namespace = name.join('.')
                  var obs = this._dsf._obs;
                  var ob = obs[namespace] || {};
                  var m = ob[method];
                  if (m && typeof m == "function") {
                      callSyn(m, ob);
                      return;
                  }
                  obs = this._dsaf._obs;
                  ob = obs[namespace] || {};
                  m = ob[method];
                  if (m && typeof m == "function") {
                      callAsyn(m, ob);
                      return;
                  }
              }
          }
      }
      for (var attr in ob) {
          window[attr] = ob[attr];
      }
      bridge.register("_hasJavascriptMethod", function(method, tag) {
          var name = method.split('.')
          if (name.length < 2) {
              return !!(_dsf[name] || _dsaf[name])
          } else {
              // with namespace
              var method = name.pop()
              var namespace = name.join('.')
              var ob = _dsf._obs[namespace] || _dsaf._obs[namespace]
              return ob && !!ob[method]
          }
      });
  }



  if (w.JSBridge) return;

  // PRIVATE VARIABLES
  //!!! WARNING - Should be in SYNC with Native Code defines - Begin
  var JSBRIDGE_URL_SCHEME = 'jsbridgeurlscheme';
  var JSBRIDGE_URL_MESSAGE = '__JSB_URL_MESSAGE__';
  var JSBRIDGE_URL_EVENT = '__JSB_URL_EVENT__';
  var JSBRIDGE_URL_API = '__JSB_URL_API__';

  //!!! WARNING - Should be in SYNC with Native Code defines - End

  var ua = navigator.userAgent;
  var isIOSDevice = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
  var isAndroidDevice = /Android/g.test(ua);
  var sendMessageQueue = [];
  var receiveMessageQueue = [];
  var messageHandlers = {};
  var responseCallbacks = {};
  var apiData = null;
  var uniqueId = 1;
  var messagingIframe;

  // PRIVATE METHODS

  function JSBridgeLog() {
      if (typeof console != 'undefined') {
          console.log("JSBridge:JS: LOG: ", arguments);
      }
  }

  function JSBridgeLogException(e, m) {
      if (typeof console != 'undefined') {
          console.error("JSBridge:JS: EXCEPTION: ", arguments);
      }
  }

  function getIFrameSrc(param) {
      return JSBRIDGE_URL_SCHEME + '://' + JSBRIDGE_URL_MESSAGE + '/' + param;
  }

  function callObjCAPI(name, data) {
      // Should not called triggerNativeCall as iFrame needs to be deleted in order to get the retvalue.
      var iframe = document.createElement("IFRAME");
      apiData = { api: name };
      if (data) apiData["data"] = data;
      iframe.setAttribute("src", getIFrameSrc(JSBRIDGE_URL_API));
      document.documentElement.appendChild(iframe);
      iframe.parentNode.removeChild(iframe);
      iframe = null;

      var ret = JSBridge.nativeReturnValue;
      JSBridge.nativeReturnValue = undefined;
      // alert(ret);
      if (isObject(ret)) {
          return JSON.stringify(ret);
      }
      if (ret) return ret;
  }

  function isObject(obj) {
      var type = typeof obj;
      return type === 'function' || type === 'object' && !!obj;
  };

  // function triggerNativeCall() {
  //     if (isIOSDevice) {
  //         messagingIframe.src = getIFrameSrc(JSBRIDGE_URL_EVENT);
  //     } else {
  //         var apiName = ((isAndroidDevice) ? ("AndroidAPI.ProcessJSEventQueue") : ("WebAppAPI.ProcessJSEventQueue"));
  //         try {
  //             var api = eval(apiName);
  //             if (api) api(_fetchJSEventQueue());
  //         } catch (e) {}
  //     }
  // }

  function triggerNativeCall() {
      if(isIOSDevice) {
          messagingIframe.src = getIFrameSrc(JSBRIDGE_URL_EVENT);
      } else {
          if(window.AndroidAPI){
               try {
                   AndroidAPI.ProcessJSEventQueue(_fetchJSEventQueue())
               } catch(e) {}
          } else {
               JSBridgeLogException("Unsupported API:",name);
          }
      }
  }

  function doSend(message, responseCallback) {
      if (responseCallback) {
          var callbackId = 'cb_' + (uniqueId++) + '_' + new Date().getTime();
          responseCallbacks[callbackId] = responseCallback;
          message['callbackId'] = callbackId;
      }
      sendMessageQueue.push(message);
      triggerNativeCall();
  }

  function dispatchMessageFromNative(messageJSON) {
      setTimeout(function _timeoutDispatchMessageFromObjC() {
          var message = JSON.parse(messageJSON);
          var messageHandler;
          var responseCallback;

          if (message.responseId) {
              responseCallback = responseCallbacks[message.responseId];
              if (!responseCallback) { return; }
              responseCallback(message.responseData);
              delete responseCallbacks[message.responseId];
          } else {
              if (message.callbackId) {
                  var callbackResponseId = message.callbackId;
                  responseCallback = function(responseData) {
                      doSend({ responseId: callbackResponseId, responseData: responseData });
                  }
              }

              try {
                  var handler = ((message.eventName) ? (messageHandlers[message.eventName]) : (JSBridge.bridgeHandler));
                  if (handler) {
                      handler(message.data, responseCallback);
                  }
              } catch (e) {
                  JSBridgeLogException(e, "dispatchMessageFromNative");
              }
          }
      });
  }

  function getReturnObject(apiName, status, dataJson) {
      var outJson = { status: status };
      if (apiName) outJson["apiName"] = apiName;
      if (dataJson) outJson["data"] = dataJson;
      return outJson;
  }


  // PUBLIC METHODS
  function init(bridgeHandler) {
      if (JSBridge.bridgeHandler) { JSBridgeLogException(e, "init"); }
      JSBridge.bridgeHandler = bridgeHandler;
      var receivedMessages = receiveMessageQueue;
      receiveMessageQueue = null;
      for (var i = 0; i < receivedMessages.length; i++) {
          dispatchMessageFromNative(receivedMessages[i]);
      }
  }

  function send(eventName, data, responseCallback) {
      var dataToSend = {};
      if (eventName) dataToSend["eventName"] = eventName;
      dataToSend["data"] = { status: "true" };
      if (data) dataToSend["data"]["data"] = data;
      doSend(dataToSend, responseCallback);
  }

  function registerEvent(eventName, handler) {
      if (isIOSDevice) {
          dsBridge.register(eventName, handler);
      } else {
          messageHandlers[eventName] = handler;
      }
  }

  function deRegisterEvent(eventName, handler) {
      if (messageHandlers[eventName]) {
          delete messageHandlers[eventName];
      }
  }

  function callAPI(name, data, responseCallback) {
      if (isIOSDevice) { //ios use javascript core
          if (!data) {
              data = {};
              data.es_method = "sync";
          } else {
              data.es_method = "sync";
          }
          if (responseCallback) {
              data.es_method = "async";
              dsBridge.call(name, data, function(v) {
                  var ret = v;
                  if (isObject(v)) {
                      ret = JSON.stringify(v);
                  }
                  responseCallback(ret);
              });
          } else {
              var ret = dsBridge.call(name, data);
              if (isObject(ret)) {
                  return JSON.stringify(ret);
              }
              return ret;
          }
      } else {
          try {
              if (!data) {
                  data = { "key": "value" };
              }
              if (data) {
                  if (responseCallback) {
                      var cbID = "cbID" + (+new Date);
                      responseCallbacks[cbID] = responseCallback;
                      data["callbackID"] = cbID;
                  }
                  try { data = JSON.stringify(data); } catch (e) {}
              }

              if (isIOSDevice) {
                  if (data) name += ":";
                  return callObjCAPI(name, data);
              } else {
                  // var api = eval((isAndroidDevice) ? ("AndroidAPI.ProcessJSAPIRequest") : ("WebAppAPI.ProcessJSAPIRequest"));
                  // if (api) {
                  //     if (data) return api(name, data);
                  //     return api(name, null);
                  // } else {
                  //     JSBridgeLogException("Unsupported API:", name);
                  // }

                  if(window.AndroidAPI){
                      if(data) return AndroidAPI.ProcessJSAPIRequest(name, data)

                      return AndroidAPI.ProcessJSAPIRequest(name, null)
                  } else {
                      JSBridgeLogException("Unsupported API:",name);
                  }
              }
          } catch (e) {
              JSBridgeLogException(e, "Invalid API:" + name);
          }
      }
  }

  function callAPICallback(apiCallback, outJson, status) {
      if (apiCallback) {
          apiCallback(getReturnObject(null, ((status) ? (status) : ("true")), outJson));
      }
  }

  function callEventCallback(responseCallback, outJson, inJson) {
      if (responseCallback) {
          responseCallback(getReturnObject(((inJson) ? (inJson["eventName"]) : (null)), "true", outJson));
      }
  }

  function _fetchJSEventQueue() {
      try {
          var messageQueueString = JSON.stringify(sendMessageQueue);
          sendMessageQueue = [];
          return messageQueueString;
      } catch (e) {
          JSBridgeLogException(e, "_fetchJSEventQueue");
      }
      return [];
  }

  function _handleMessageFromNative(messageJSON) {
      if (receiveMessageQueue) {
          receiveMessageQueue.push(messageJSON);
      } else {
          dispatchMessageFromNative(messageJSON);
      }
  }

  function _getAPIData() { return JSON.stringify(apiData); }

  function _invokeJSCallback(cbID, removeAfterExecute, config) {
      if (cbID) {
          var cb = responseCallbacks[cbID];
          if (cb) {
              if (removeAfterExecute) delete(responseCallbacks[cbID]);
              var data = config;
              if (isAndroidDevice) {
                  try { data = JSON.parse(config); } catch (e) {}
              }
              if (isObject(data)) {
                  data = JSON.stringify(data);
              }
              if (data.callbackID) delete(data.callbackID);
              cb.call(null, data);
          }
      }
  };

  w.JSBridge = {
      init: init.bind(this),
      send: send.bind(this),
      callAPI: callAPI.bind(this),

      registerEvent: registerEvent.bind(this),
      deRegisterEvent: deRegisterEvent.bind(this),

      callAPICallback: callAPICallback.bind(this),
      callEventCallback: callEventCallback.bind(this),

      _fetchJSEventQueue: _fetchJSEventQueue.bind(this),
      _handleMessageFromNative: _handleMessageFromNative.bind(this),
      _getAPIData: _getAPIData.bind(this),
      _invokeJSCallback: _invokeJSCallback.bind(this),
  }

  messagingIframe = doc.createElement('iframe');
  messagingIframe.style.display = 'none';
  triggerNativeCall();
  doc.documentElement.appendChild(messagingIframe);

  var readyEvent = doc.createEvent('Events');
  readyEvent.initEvent('JSBridgeReady');
  readyEvent.bridge = JSBridge;
  doc.dispatchEvent(readyEvent);

})(window, document);

export default {
    init () {
        console.log(123456)
    }
}