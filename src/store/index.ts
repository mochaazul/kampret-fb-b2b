import authAction from './auth/auth.action';
import authReducers from './auth/auth.reducer';

import miscAction from './misc/misc.action';
import miscReducers from './misc/misc.reducer';

import contactAction from './contact/contact.action';
import contactReducers from './contact/contact.reducer';

const Actions = {
	authAction,
	miscAction,
	contactAction,
};

const Reducers = {
	authReducers,
	miscReducers,
	contactReducers,
};

export {
	Actions,
	Reducers,
};
