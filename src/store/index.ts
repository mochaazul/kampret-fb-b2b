import authAction from './auth/auth.action';
import authReducers from './auth/auth.reducer';

import miscAction from './misc/misc.action';
import miscReducers from './misc/misc.reducer';

import contactAction from './contact/contact.action';
import contactReducers from './contact/contact.reducer';

import deliveryAction from './delivery/delivery.action';
import deliveryReducers from './delivery/delivery.reducer';

const Actions = {
	authAction,
	miscAction,
	contactAction,
	deliveryAction,
};

const Reducers = {
	authReducers,
	miscReducers,
	contactReducers,
	deliveryReducers,
};

export {
	Actions,
	Reducers,
};
