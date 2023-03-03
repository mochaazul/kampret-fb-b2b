/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Toast from 'react-native-toast-message';
import Config from "react-native-config";
import * as Sentry from '@sentry/react-native';

import { Dispatches } from '@constant';
import { store } from '../config/reduxConfig';
import { MiscInterface } from '@interfaces';
import * as NavigationHelper from './navigationHelper';

let baseUrl = Config.RN_baseUrl;

if (Config.RN_status === 'staging') {
	baseUrl = Config.RN_baseUrlStaging;
} else if (Config.RN_status === 'production') {
	baseUrl = Config.RN_baseUrlProduction;
}

const axiosAPI = axios.create({
	baseURL: baseUrl,
});

const getHeaders = (headers?: Record<string, string>) => {
	const state = store.getState();
	return {
		'Authorization': state.authReducers.user ? state.authReducers.user.token : '',
		'Accept': '*/*',
		'Content-Type': 'applications/json',
		'Connection': 'keep-alive',
		'Accept-Encoding': 'gzip, deflate,br',
		...headers,
	};
};

const apiRequest = (method: any, url: string, request?: object, headers?: Record<string, string>) => {
	// store.dispatch({
	// 	type: Dispatches.API_LOADING_START,
	// 	payload: '',
	// });
	return axiosAPI({
		headers: getHeaders(headers),
		method,
		url,
		data: request ?? undefined
	})
		.then(res => {
			return Promise.resolve(res.data);
		})
		.catch((err: AxiosError) => {
			const data: MiscInterface.BE<any> | null = parseErrData(err.response?.data);

			if (data) {
				switch (data?.stat_code) {
					case 'ERR:AUTHENTICATION':
					case 'ERR:AUTHORIZED':
						if (data?.stat_msg) {
							Toast.show({
								type: 'error',
								text1: 'Terjadi Kesalahan',
								text2: data?.stat_msg,
							});
						}

						store.dispatch({
							type: Dispatches.CLEAR_DELIVERY_LIST,
							payload: '',
						});

						store.dispatch({
							type: Dispatches.LOGOUT,
							payload: '',
						});

						NavigationHelper.reset('Login');
						break;

					case 'ERR:NOT_FOUND':
						// to do redirect to page NOT_FOUND
						break;
					case 'ERR:VALIDATION':
						Toast.show({
							type: 'error',
							text1: 'Error',
							text2: data.stat_msg ? data.stat_msg : 'Error validation',
						});
						break;
					case 'ERR:BAD_REQUEST':
					case 'ERR:EMPTY_DATA':
						Toast.show({
							type: 'error',
							text1: 'Error',
							text2: data?.stat_msg,
							position: 'top'
						});
						return Promise.reject(err);
						break;
					default:
						Toast.show({
							type: 'error',
							text1: 'Error',
							text2: 'Oops, sorry, we are experiencing some problem',
						});
						Sentry.captureException(JSON.stringify(url), {
							tags: {
								"error_api": 'line100' + method
							}
						});
						return Promise.reject(err);
				}
			} else
				return Promise.reject(err);
			// Sentry.captureException(JSON.stringify(url), {
			// 	tags: {
			// 		"error_api": 'line109' + method
			// 	}
			// });
		})
		.finally(() => {
			// store.dispatch({
			// 	type: Dispatches.API_LOADING_END,
			// 	payload: '',
			// });
		});
};

const parseErrData = (data: any | null) => {
	try {
		return data as MiscInterface.BE<any>;
	} catch (e) {
		return null;
	}
};

// function to execute the http get request
const queryString = (params: any) => {
	return Object.keys(params).map(key => key + '=' + params[key])
		.join('&');
};

const get = <T>(url: string, params?: object, headers?: Record<string, string>): Promise<T> => apiRequest('get', params ? url + '?' + queryString(params) : url, headers, headers);

// function to execute the http delete request
const deleteRequest = <T>(url: string, headers?: object) => apiRequest('delete', url, headers);

// function to execute the http post request
const post = <T>(url: string, request: object | Array<any>, headers?: Record<string, string>) => apiRequest('post', url, request, headers);

// function to execute the http post multipart request
const upload = <T>(url: string, request: FormData, headers?: Record<string, string>) => apiRequest(
	'post',
	url,
	request,
	{
		...headers,
		'Content-Type': 'multipart/form-data',
	}
);

// function to execute the http post image
const postImage = (url: string, request: {
	imageKey: string,
	image: {
		uri: string,
		name: string,
		type: string,
	},
	properties: { [key: string]: string; };
}, headers?: Record<string, string>) => {
	const state = store.getState();
	const form = new FormData();
	form.append(request.imageKey, request.image as any);

	const keys = Object.keys(request.properties);
	keys.forEach((key) => {
		form.append(key, request.properties[key]);
	});

	const config: AxiosRequestConfig = {
		method: "post",
		url,
		responseType: "json",
		headers: {
			...headers,
			'Content-Type': 'multipart/form-data',
			'Authorization': state.authReducers.user ? state.authReducers.user.token : '',
		},

		data: form,
	};
	return axiosAPI(config);
};

// function to execute the http put request
const put = (url: string, request: object | Array<any>, headers?: Record<string, string>) => apiRequest('put', url, request, headers);

// function to execute the http path request
const patch = <T>(url: string, request?: object | Array<any>, headers?: Record<string, string>) =>
	apiRequest('patch', url, request, headers);

const API = {
	get,
	delete: deleteRequest,
	post,
	put,
	patch,
	postImage,
	upload,
};
export default API;
