import React, { useEffect } from 'react';
import { FlatList } from 'react-native';

import { Container } from '@components';
import { useAppDispatch, useAppSelector } from '@helpers';
import { Actions } from '@store';
import { ContactInterface } from '@interfaces';
import { Card } from './Component';

const Contact = () => {

	const getContactDispatch = useAppDispatch(Actions.contactAction.getContact);
	const contactState = useAppSelector(state => state.contactReducers);

	useEffect(() => {
		getContactDispatch();
	}, [getContactDispatch]);

	return (
		<Container
			noPaddingVertical
			noScroll>
			<FlatList
				nestedScrollEnabled
				onRefresh={ () => getContactDispatch() }
				refreshing={ contactState.loading }
				showsVerticalScrollIndicator={ false }
				keyExtractor={ (item: ContactInterface.Contact) => item.email }
				data={ contactState.contact }
				renderItem={ data => <Card data={ data.item } /> }
			/>
		</Container>
	);
};

export default Contact;
