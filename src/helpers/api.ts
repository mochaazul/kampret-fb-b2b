/* eslint-disable @typescript-eslint/no-explicit-any */
import axios from 'axios';
import Toast from 'react-native-toast-message';

import { Dispatches } from '@constant';
import env from '../../env';
import { store } from '../config/reduxConfig';

let baseUrl = env.baseUrl;

if (env.status === 'staging') {
	baseUrl = env.baseUrlStaging;
} else if (env.status === 'production') {
	baseUrl = env.baseUrlProduction;
}

const axiosAPI = axios.create({
	baseURL: baseUrl,
});

const getHeaders = (headers?: Record<string, string>) => {
	const state = store.getState();
	return {
		'token': state.authReducers.token ?? '',
		'Accept': 'application/json',
		'Content-Type': 'applications/json',
		...headers,
	};
};

const apiRequest = (method: any, url: string, request?: object, headers?: Record<string, string>) => {
	store.dispatch({
		type: Dispatches.API_LOADING_START,
		payload: '',
	});
	return axiosAPI({
		headers: getHeaders(headers),
		method,
		url,
		data: request ?? undefined,
	})
		.then(res => {
			return Promise.resolve(res.data);
		})
		.catch(err => {
			store.dispatch({
				type: Dispatches.API_LOADING_END,
				payload: '',
			});
			switch (err.response.data.stat_code) {
				case 'ERR:AUTHENTICATION':
				case 'ERR:AUTHORIZED':
					// to do redirec to login
					break;
				case 'ERR:NOT_FOUND':
					// to do redirect to page NOT_FOUND
					break;
				case 'ERR:BAD_REQUEST':
				case 'ERR:EMPTY_DATA':
					Toast.show({
						type: 'error',
						text1: 'Error',
						text2: err.response.data.stat_msg,
					});
					break;
				default:
					Toast.show({
						type: 'error',
						text1: 'Error',
						text2: 'Oops, sorry, we are experiencing some problem',
					});
					return Promise.reject(err);
			}
			// return Promise.reject(err)
		})
		.finally(() => {
			store.dispatch({
				type: Dispatches.API_LOADING_END,
				payload: '',
			});
		});
};

// function to execute the http get request
const queryString = (params: any) => {
	return Object.keys(params).map(key => key + '=' + params[key])
		.join('&');
};

const get = <T>(url: string, params?: object, headers?: Record<string, string>): Promise<T> => apiRequest('get', params ? url + '?' + queryString(params) : url, headers, headers);

// function to execute the http delete request
const deleteRequest = (url: string, headers?: object) => apiRequest('delete', url, headers);

// function to execute the http post request
const post = (url: string, request: object | Array<any>, headers?: Record<string, string>) => apiRequest('post', url, request, headers);

// function to execute the http post image
const postImage = (url: string, request: {
  uri: string,
  name: string,
  type: string,
}, headers?: Record<string, string>) => {
	const form = new FormData();
	form.append('image', JSON.stringify(request));
	apiRequest('post', url, request, headers = { 'Content-Type': 'multipart/form-data', ...headers });
};

// function to execute the http put request
const put = (url: string, request: object | Array<any>, headers?: Record<string, string>) => apiRequest('put', url, request, headers);

// function to execute the http path request
const patch = (url: string, request: object | Array<any>, headers?: Record<string, string>) =>
	apiRequest('patch', url, request, headers);

const API = {
	get,
	delete: deleteRequest,
	post,
	put,
	patch,
	postImage,
};
export default API;
